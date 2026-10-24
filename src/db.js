const path = require('node:path');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');
const DISCEngine = require('../public/js/disc-engine.js');
const { DISC_PROFILES } = require('../public/js/disc-profiles.js');
const { VAGA_LIKERT_40, DISC_QUESTIONS } = require('../public/js/questions-data.js');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'disc.db');
const db = new DatabaseSync(dbPath);

db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// 1. Khởi tạo bảng cơ sở & nâng cấp schema an toàn (Backward-compatible migration)
db.exec(`
  CREATE TABLE IF NOT EXISTS users_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    department TEXT DEFAULT '',
    position TEXT DEFAULT '',
    most_scores TEXT NOT NULL,
    least_scores TEXT NOT NULL,
    diff_scores TEXT NOT NULL,
    percentage_scores TEXT NOT NULL,
    primary_type TEXT NOT NULL,
    profile_code TEXT NOT NULL,
    duration_seconds INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS submission_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id INTEGER NOT NULL,
    question_index INTEGER NOT NULL,
    most_choice TEXT NOT NULL,
    least_choice TEXT NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES users_submissions(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_submissions_primary_type ON users_submissions(primary_type);
  CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON users_submissions(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_answers_submission_id ON submission_answers(submission_id);
`);

function ensureColumn(tableName, columnName, columnDef) {
  const cols = db.prepare(`PRAGMA table_info(${tableName})`).all();
  if (!cols.some((c) => c.name === columnName)) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`);
  }
}

// Bổ sung các cột chuẩn Vaga DISC v0.2 vào users_submissions và submission_answers
ensureColumn('users_submissions', 'assessment_mode', "TEXT DEFAULT 'forced24'");
ensureColumn('users_submissions', 'raw_mean_scores', "TEXT DEFAULT '{}'");
ensureColumn('users_submissions', 'linear_scores', "TEXT DEFAULT '{}'");
ensureColumn('users_submissions', 'adaptive_used', 'INTEGER DEFAULT 0');
ensureColumn('users_submissions', 'response_quality', "TEXT DEFAULT '{}'");
ensureColumn('users_submissions', 'consent_version', "TEXT DEFAULT 'VAGA-CONSENT-v0.2'");
ensureColumn('users_submissions', 'revision', 'INTEGER DEFAULT 1');

ensureColumn('submission_answers', 'item_id', "TEXT DEFAULT ''");
ensureColumn('submission_answers', 'raw_value', 'INTEGER DEFAULT NULL');
ensureColumn('submission_answers', 'keyed_value', 'INTEGER DEFAULT NULL');

// 2. Tạo các bảng nghiệp vụ Vaga DISC v0.2
db.exec(`
  CREATE TABLE IF NOT EXISTS collaboration_manuals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT DEFAULT '',
    department TEXT DEFAULT '',
    position TEXT DEFAULT '',
    submission_id INTEGER DEFAULT NULL,
    primary_type TEXT DEFAULT 'D',
    profile_code TEXT DEFAULT 'D',
    linear_scores TEXT DEFAULT '{}',
    workstyle_sliders TEXT DEFAULT '{}',
    best_read_in_60s TEXT DEFAULT '',
    dos_list TEXT DEFAULT '[]',
    donts_list TEXT DEFAULT '[]',
    context_cards TEXT DEFAULT '{}',
    custom_overrides TEXT DEFAULT '{}',
    status TEXT DEFAULT 'DRAFT',
    revision INTEGER DEFAULT 1,
    published_at TEXT DEFAULT NULL,
    revoked_at TEXT DEFAULT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS private_growth_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_email TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    department TEXT DEFAULT '',
    submission_id INTEGER DEFAULT NULL,
    card_id TEXT DEFAULT '',
    context TEXT NOT NULL,
    title TEXT NOT NULL,
    trigger_situation TEXT NOT NULL,
    action_behavior TEXT NOT NULL,
    success_signal TEXT DEFAULT '',
    review_date TEXT DEFAULT '',
    private_notes TEXT DEFAULT '',
    status TEXT DEFAULT 'ACTIVE',
    self_check_log TEXT DEFAULT '[]',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS data_rights_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_email TEXT NOT NULL,
    requester_name TEXT NOT NULL,
    request_type TEXT NOT NULL,
    reason TEXT DEFAULT '',
    status TEXT DEFAULT 'COMPLETED',
    resolution_note TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    resolved_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_email TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT DEFAULT '',
    summary TEXT NOT NULL,
    metadata_json TEXT DEFAULT '{}',
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE INDEX IF NOT EXISTS idx_manuals_status ON collaboration_manuals(status);
  CREATE INDEX IF NOT EXISTS idx_manuals_owner ON collaboration_manuals(owner_email);
  CREATE INDEX IF NOT EXISTS idx_actions_owner ON private_growth_actions(owner_email);
  CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
`);

function safeJsonParse(str, fallback) {
  if (!str) return fallback;
  if (typeof str === 'object') return str;
  try {
    const parsed = JSON.parse(str);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Ghi nhận Audit Log bất biến
 */
function logAudit({ actor_email, action_type, target_type, target_id = '', summary, metadata = {} }) {
  const stmt = db.prepare(`
    INSERT INTO audit_logs (actor_email, action_type, target_type, target_id, summary, metadata_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    (actor_email || 'system@vaga.vn').trim().toLowerCase(),
    action_type,
    target_type,
    String(target_id),
    summary,
    JSON.stringify(metadata || {})
  );
}

/**
 * Chuẩn hóa dòng dữ liệu Submission từ SQLite
 */
function hydrateSubmissionRow(row) {
  if (!row) return null;
  const most_scores = safeJsonParse(row.most_scores, { D: 0, I: 0, S: 0, C: 0 });
  const least_scores = safeJsonParse(row.least_scores, { D: 0, I: 0, S: 0, C: 0 });
  const diff_scores = safeJsonParse(row.diff_scores, { D: 0, I: 0, S: 0, C: 0 });
  const percentage_scores = safeJsonParse(row.percentage_scores, { D: 25, I: 25, S: 25, C: 25 });
  let linear_scores = safeJsonParse(row.linear_scores, null);

  if (!linear_scores || linear_scores.D === undefined) {
    linear_scores = {
      D: DISCEngine.roundDisplay1(Math.min(100, Math.max(0, ((diff_scores.D + 24) / 48) * 100))),
      I: DISCEngine.roundDisplay1(Math.min(100, Math.max(0, ((diff_scores.I + 24) / 48) * 100))),
      S: DISCEngine.roundDisplay1(Math.min(100, Math.max(0, ((diff_scores.S + 24) / 48) * 100))),
      C: DISCEngine.roundDisplay1(Math.min(100, Math.max(0, ((diff_scores.C + 24) / 48) * 100)))
    };
  }

  let raw_mean_scores = safeJsonParse(row.raw_mean_scores, null);
  if (!raw_mean_scores || raw_mean_scores.D === undefined) {
    raw_mean_scores = {
      D: DISCEngine.roundDisplay1(1 + linear_scores.D / 25),
      I: DISCEngine.roundDisplay1(1 + linear_scores.I / 25),
      S: DISCEngine.roundDisplay1(1 + linear_scores.S / 25),
      C: DISCEngine.roundDisplay1(1 + linear_scores.C / 25)
    };
  }

  const response_quality = safeJsonParse(row.response_quality, {
    quality_score: 95,
    status: 'HIGH_RELIABILITY',
    label: 'Độ nhất quán phản hồi cao',
    notes: ['Bản nộp hợp lệ.']
  });

  return {
    ...row,
    adaptive_used: Boolean(row.adaptive_used),
    most_scores,
    least_scores,
    diff_scores,
    percentage_scores,
    linear_scores,
    raw_mean_scores,
    response_quality
  };
}

/**
 * Tạo mới một bản ghi kết quả làm bài khảo sát (Hỗ trợ cả Likert 40/48 và Forced-Choice 24)
 * Không ghi đè bản nộp cũ của cùng email -> bảo toàn lịch sử Retest (Non-destructive History)
 */
function createSubmission(payload) {
  const emailNorm = (payload.email || '').trim().toLowerCase();
  const prevCountRow = db
    .prepare(`SELECT COUNT(*) AS cnt FROM users_submissions WHERE lower(email) = ?`)
    .get(emailNorm);
  const revision = Number(prevCountRow?.cnt || 0) + 1;

  const insertSubmissionStmt = db.prepare(`
    INSERT INTO users_submissions (
      full_name, email, phone, department, position,
      assessment_mode, raw_mean_scores, linear_scores, adaptive_used, response_quality,
      most_scores, least_scores, diff_scores, percentage_scores,
      primary_type, profile_code, duration_seconds, consent_version, revision
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAnswerStmt = db.prepare(`
    INSERT INTO submission_answers (
      submission_id, question_index, most_choice, least_choice, item_id, raw_value, keyed_value
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec('BEGIN');
  try {
    const result = insertSubmissionStmt.run(
      payload.full_name.trim(),
      emailNorm,
      (payload.phone || '').trim(),
      (payload.department || '').trim(),
      (payload.position || '').trim(),
      payload.assessment_mode || 'forced24',
      JSON.stringify(payload.raw_mean_scores || {}),
      JSON.stringify(payload.linear_scores || {}),
      payload.adaptive_used ? 1 : 0,
      JSON.stringify(payload.response_quality || {}),
      JSON.stringify(payload.most_scores || { D: 0, I: 0, S: 0, C: 0 }),
      JSON.stringify(payload.least_scores || { D: 0, I: 0, S: 0, C: 0 }),
      JSON.stringify(payload.diff_scores || { D: 0, I: 0, S: 0, C: 0 }),
      JSON.stringify(payload.percentage_scores || { D: 25, I: 25, S: 25, C: 25 }),
      payload.primary_type,
      payload.profile_code,
      Number(payload.duration_seconds) || 0,
      payload.consent_version || 'VAGA-CONSENT-v0.2',
      revision
    );

    const submissionId = Number(result.lastInsertRowid);

    if (Array.isArray(payload.answers)) {
      for (const ans of payload.answers) {
        insertAnswerStmt.run(
          submissionId,
          Number(ans.question_index) || 1,
          ans.most_choice || ans.dimension || 'D',
          ans.least_choice || ans.keying || 'C',
          ans.item_id || '',
          ans.raw_value !== undefined ? Number(ans.raw_value) : null,
          ans.keyed_value !== undefined ? Number(ans.keyed_value) : null
        );
      }
    }

    // Tự động khởi tạo hoặc cập nhật bản nháp Collaboration Manual nếu user chưa PUBLISHED
    const existingManual = db
      .prepare(`SELECT * FROM collaboration_manuals WHERE lower(owner_email) = ?`)
      .get(emailNorm);

    const profileDef = DISC_PROFILES[payload.profile_code] || DISC_PROFILES[payload.primary_type] || DISC_PROFILES.D;
    const defaultManual = profileDef.manual_defaults || DISC_PROFILES.D.manual_defaults;

    if (!existingManual) {
      db.prepare(`
        INSERT INTO collaboration_manuals (
          owner_email, full_name, phone, department, position,
          submission_id, primary_type, profile_code, linear_scores,
          workstyle_sliders, best_read_in_60s, dos_list, donts_list, context_cards,
          custom_overrides, status, revision
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'DRAFT', 1)
      `).run(
        emailNorm,
        payload.full_name.trim(),
        (payload.phone || '').trim(),
        (payload.department || '').trim(),
        (payload.position || '').trim(),
        submissionId,
        payload.primary_type,
        payload.profile_code,
        JSON.stringify(payload.linear_scores || {}),
        JSON.stringify(defaultManual.sliders || {}),
        defaultManual.best_read_in_60s || '',
        JSON.stringify(profileDef.communication_dos || []),
        JSON.stringify(profileDef.communication_donts || []),
        JSON.stringify(defaultManual.contexts || {}),
        JSON.stringify({})
      );
    } else if (existingManual.status === 'DRAFT') {
      db.prepare(`
        UPDATE collaboration_manuals
        SET submission_id = ?, primary_type = ?, profile_code = ?, linear_scores = ?,
            full_name = ?, department = ?, position = ?, updated_at = datetime('now', 'localtime')
        WHERE id = ?
      `).run(
        submissionId,
        payload.primary_type,
        payload.profile_code,
        JSON.stringify(payload.linear_scores || {}),
        payload.full_name.trim(),
        (payload.department || existingManual.department || '').trim(),
        (payload.position || existingManual.position || '').trim(),
        existingManual.id
      );
    }

    logAudit({
      actor_email: emailNorm,
      action_type: 'ASSESSMENT_SUBMITTED',
      target_type: 'SUBMISSION',
      target_id: submissionId,
      summary: `${payload.full_name} hoàn thành bài đánh giá (${payload.assessment_mode || 'forced24'}) — Nhóm ${payload.profile_code} (Lần #${revision})`,
      metadata: {
        submission_id: submissionId,
        assessment_mode: payload.assessment_mode || 'forced24',
        profile_code: payload.profile_code,
        revision
      }
    });

    db.exec('COMMIT');
    return getSubmissionById(submissionId);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

/**
 * Lấy chi tiết 1 bài nộp theo ID
 */
function getSubmissionById(id) {
  const row = db.prepare(`SELECT * FROM users_submissions WHERE id = ?`).get(Number(id));
  if (!row) return null;

  const answers = db
    .prepare(
      `SELECT question_index, most_choice, least_choice, item_id, raw_value, keyed_value
       FROM submission_answers
       WHERE submission_id = ?
       ORDER BY question_index ASC`
    )
    .all(Number(id));

  const hydrated = hydrateSubmissionRow(row);
  hydrated.answers = answers;
  return hydrated;
}

/**
 * Lấy lịch sử làm bài (Retest History) của 1 email
 */
function getHistoryByEmail(email) {
  const emailNorm = (email || '').trim().toLowerCase();
  if (!emailNorm) return [];
  const rows = db
    .prepare(`SELECT * FROM users_submissions WHERE lower(email) = ? ORDER BY id DESC`)
    .all(emailNorm);
  return rows.map(hydrateSubmissionRow);
}

/**
 * Lấy danh sách kết quả kèm tìm kiếm & lọc
 */
function listSubmissions({ search = '', primaryType = '', mode = '', limit = 200, offset = 0 } = {}) {
  const conditions = [];
  const params = [];

  if (search && search.trim()) {
    const q = `%${search.trim()}%`;
    conditions.push(
      `(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR department LIKE ? OR position LIKE ? OR profile_code LIKE ?)`
    );
    params.push(q, q, q, q, q, q);
  }

  if (primaryType && ['D', 'I', 'S', 'C', 'BALANCED'].includes(primaryType.toUpperCase())) {
    if (primaryType.toUpperCase() === 'BALANCED') {
      conditions.push(`profile_code = 'BALANCED'`);
    } else {
      conditions.push(`primary_type = ?`);
      params.push(primaryType.toUpperCase());
    }
  }

  if (mode && mode.trim()) {
    conditions.push(`assessment_mode LIKE ?`);
    params.push(`${mode.trim()}%`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM users_submissions ${whereClause}`)
    .get(...params);

  const rows = db
    .prepare(
      `SELECT * FROM users_submissions
       ${whereClause}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`
    )
    .all(...params, Number(limit), Number(offset));

  return {
    total: countRow ? countRow.total : 0,
    items: rows.map(hydrateSubmissionRow)
  };
}

/**
 * Xóa 1 bản ghi theo ID
 */
function deleteSubmission(id, actorEmail = 'admin@vaga.vn') {
  const existing = getSubmissionById(id);
  const res = db.prepare(`DELETE FROM users_submissions WHERE id = ?`).run(Number(id));
  if (res.changes > 0 && existing) {
    logAudit({
      actor_email: actorEmail,
      action_type: 'ASSESSMENT_DELETED',
      target_type: 'SUBMISSION',
      target_id: id,
      summary: `Xóa bản ghi khảo sát #${id} của ${existing.full_name} (${existing.email})`
    });
  }
  return res.changes > 0;
}

// ============================================================================
// COLLABORATION MANUALS ("HOW TO WORK WITH ME" - DOC-06 / DOC-11 / VAGA v0.2)
// ============================================================================

function hydrateManualRow(row, isOwnerView = false) {
  if (!row) return null;
  const base = {
    id: row.id,
    owner_email: row.owner_email,
    full_name: row.full_name,
    department: row.department,
    position: row.position,
    submission_id: row.submission_id,
    primary_type: row.primary_type || 'D',
    profile_code: row.profile_code || 'D',
    linear_scores: safeJsonParse(row.linear_scores, { D: 50, I: 50, S: 50, C: 50 }),
    workstyle_sliders: safeJsonParse(row.workstyle_sliders, {
      pace: 3,
      decision_mode: 3,
      communication_channel: 3,
      detail_need: 3,
      change_attitude: 3
    }),
    best_read_in_60s: row.best_read_in_60s || '',
    dos_list: safeJsonParse(row.dos_list, []),
    donts_list: safeJsonParse(row.donts_list, []),
    context_cards: safeJsonParse(row.context_cards, {}),
    status: row.status,
    revision: row.revision,
    published_at: row.published_at,
    updated_at: row.updated_at
  };

  if (isOwnerView) {
    base.phone = row.phone || '';
    base.custom_overrides = safeJsonParse(row.custom_overrides, {});
    base.revoked_at = row.revoked_at;
    base.created_at = row.created_at;
  }
  return base;
}

/**
 * Danh bạ Cẩm nang Cộng tác công khai (Chỉ trả về các hồ sơ có status === 'PUBLISHED')
 * Tuyệt đối không lộ hồ sơ DRAFT hoặc REVOKED hoặc dữ liệu riêng tư (RV-008 / DOC-14)
 */
function listPublishedManuals({ search = '', department = '', primaryType = '' } = {}) {
  const conditions = [`status = 'PUBLISHED'`];
  const params = [];

  if (search && search.trim()) {
    const q = `%${search.trim()}%`;
    conditions.push(`(full_name LIKE ? OR owner_email LIKE ? OR department LIKE ? OR position LIKE ? OR profile_code LIKE ?)`);
    params.push(q, q, q, q, q);
  }
  if (department && department.trim()) {
    conditions.push(`department LIKE ?`);
    params.push(`%${department.trim()}%`);
  }
  if (primaryType && ['D', 'I', 'S', 'C', 'BALANCED'].includes(primaryType.toUpperCase())) {
    if (primaryType.toUpperCase() === 'BALANCED') {
      conditions.push(`profile_code = 'BALANCED'`);
    } else {
      conditions.push(`primary_type = ?`);
      params.push(primaryType.toUpperCase());
    }
  }

  const rows = db
    .prepare(`SELECT * FROM collaboration_manuals WHERE ${conditions.join(' AND ')} ORDER BY updated_at DESC, id DESC`)
    .all(...params);

  return rows.map((r) => hydrateManualRow(r, false));
}

/**
 * Lấy Cẩm nang Cộng tác theo ID (Kiểm tra chặt quyền Public vs Owner - RV-008)
 */
function getManualById(id, requesterEmail = '') {
  const row = db.prepare(`SELECT * FROM collaboration_manuals WHERE id = ?`).get(Number(id));
  if (!row) return null;

  const isOwner =
    requesterEmail &&
    requesterEmail.trim().toLowerCase() === (row.owner_email || '').trim().toLowerCase();

  if (row.status !== 'PUBLISHED' && !isOwner) {
    return {
      access_denied: true,
      status: row.status,
      error_code: row.status === 'REVOKED' ? 'MANUAL_REVOKED_BY_OWNER' : 'MANUAL_NOT_PUBLISHED',
      message:
        row.status === 'REVOKED'
          ? 'Chủ hồ sơ đã thu hồi quyền chia sẻ Cẩm nang cộng tác này.'
          : 'Cẩm nang cộng tác này đang ở chế độ Nháp riêng tư (DRAFT), chưa được công bố.'
    };
  }

  return hydrateManualRow(row, isOwner);
}

/**
 * Lấy Cẩm nang Cộng tác của chủ sở hữu theo email
 */
function getManualByOwnerEmail(email) {
  const emailNorm = (email || '').trim().toLowerCase();
  if (!emailNorm) return null;
  const row = db.prepare(`SELECT * FROM collaboration_manuals WHERE lower(owner_email) = ?`).get(emailNorm);
  return row ? hydrateManualRow(row, true) : null;
}

/**
 * Lưu bản nháp hoặc cập nhật Cẩm nang Cộng tác ("How to Work With Me")
 */
function saveManualDraft(payload) {
  const emailNorm = (payload.owner_email || '').trim().toLowerCase();
  if (!emailNorm || !payload.full_name) {
    throw new Error('Vui lòng nhập đầy đủ Họ tên và Email chủ hồ sơ.');
  }

  const existing = db.prepare(`SELECT * FROM collaboration_manuals WHERE lower(owner_email) = ?`).get(emailNorm);
  const profileCode = payload.profile_code || existing?.profile_code || 'D';
  const primaryType = payload.primary_type || existing?.primary_type || profileCode[0] || 'D';
  const profileDef = DISC_PROFILES[profileCode] || DISC_PROFILES[primaryType] || DISC_PROFILES.D;
  const defManual = profileDef.manual_defaults || DISC_PROFILES.D.manual_defaults;

  const linearScores = payload.linear_scores || safeJsonParse(existing?.linear_scores, { D: 55, I: 55, S: 55, C: 55 });
  const sliders = payload.workstyle_sliders || safeJsonParse(existing?.workstyle_sliders, defManual.sliders);
  const bestRead = payload.best_read_in_60s !== undefined ? payload.best_read_in_60s : (existing?.best_read_in_60s || defManual.best_read_in_60s);
  const dosList = Array.isArray(payload.dos_list) ? payload.dos_list : safeJsonParse(existing?.dos_list, profileDef.communication_dos);
  const dontsList = Array.isArray(payload.donts_list) ? payload.donts_list : safeJsonParse(existing?.donts_list, profileDef.communication_donts);
  const contextCards = payload.context_cards || safeJsonParse(existing?.context_cards, defManual.contexts);
  const customOverrides = payload.custom_overrides || safeJsonParse(existing?.custom_overrides, {});

  if (!existing) {
    const res = db.prepare(`
      INSERT INTO collaboration_manuals (
        owner_email, full_name, phone, department, position,
        submission_id, primary_type, profile_code, linear_scores,
        workstyle_sliders, best_read_in_60s, dos_list, donts_list,
        context_cards, custom_overrides, status, revision
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'DRAFT', 1)
    `).run(
      emailNorm,
      payload.full_name.trim(),
      (payload.phone || '').trim(),
      (payload.department || '').trim(),
      (payload.position || '').trim(),
      payload.submission_id || null,
      primaryType,
      profileCode,
      JSON.stringify(linearScores),
      JSON.stringify(sliders),
      bestRead,
      JSON.stringify(dosList),
      JSON.stringify(dontsList),
      JSON.stringify(contextCards),
      JSON.stringify(customOverrides)
    );

    logAudit({
      actor_email: emailNorm,
      action_type: 'MANUAL_DRAFT_CREATED',
      target_type: 'COLLABORATION_MANUAL',
      target_id: res.lastInsertRowid,
      summary: `Khởi tạo bản nháp Cẩm nang cộng tác cho ${payload.full_name}`
    });

    return getManualByOwnerEmail(emailNorm);
  }

  const nextStatus = payload.keep_published && existing.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
  db.prepare(`
    UPDATE collaboration_manuals
    SET full_name = ?, phone = ?, department = ?, position = ?,
        submission_id = COALESCE(?, submission_id),
        primary_type = ?, profile_code = ?, linear_scores = ?,
        workstyle_sliders = ?, best_read_in_60s = ?,
        dos_list = ?, donts_list = ?, context_cards = ?, custom_overrides = ?,
        status = ?, updated_at = datetime('now', 'localtime')
    WHERE id = ?
  `).run(
    payload.full_name.trim(),
    (payload.phone ?? existing.phone ?? '').trim(),
    (payload.department ?? existing.department ?? '').trim(),
    (payload.position ?? existing.position ?? '').trim(),
    payload.submission_id || null,
    primaryType,
    profileCode,
    JSON.stringify(linearScores),
    JSON.stringify(sliders),
    bestRead,
    JSON.stringify(dosList),
    JSON.stringify(dontsList),
    JSON.stringify(contextCards),
    JSON.stringify(customOverrides),
    nextStatus,
    existing.id
  );

  logAudit({
    actor_email: emailNorm,
    action_type: 'MANUAL_DRAFT_UPDATED',
    target_type: 'COLLABORATION_MANUAL',
    target_id: existing.id,
    summary: `Cập nhật Cẩm nang cộng tác của ${payload.full_name} (Trạng thái: ${nextStatus})`
  });

  return getManualByOwnerEmail(emailNorm);
}

/**
 * Xuất bản Cẩm nang Cộng tác (Publish Manual)
 */
function publishManual(ownerEmail, payload = {}) {
  const emailNorm = (ownerEmail || payload.owner_email || '').trim().toLowerCase();
  if (payload && payload.full_name) {
    saveManualDraft({ ...payload, owner_email: emailNorm });
  }
  const existing = db.prepare(`SELECT * FROM collaboration_manuals WHERE lower(owner_email) = ?`).get(emailNorm);
  if (!existing) {
    throw new Error('Không tìm thấy bản nháp Cẩm nang cộng tác để xuất bản.');
  }

  const nextRev = (Number(existing.revision) || 0) + 1;
  db.prepare(`
    UPDATE collaboration_manuals
    SET status = 'PUBLISHED',
        revision = ?,
        published_at = datetime('now', 'localtime'),
        revoked_at = NULL,
        updated_at = datetime('now', 'localtime')
    WHERE id = ?
  `).run(nextRev, existing.id);

  logAudit({
    actor_email: emailNorm,
    action_type: 'MANUAL_PUBLISHED',
    target_type: 'COLLABORATION_MANUAL',
    target_id: existing.id,
    summary: `${existing.full_name} đã xuất bản Cẩm nang cộng tác (Phiên bản v${nextRev})`
  });

  return getManualByOwnerEmail(emailNorm);
}

/**
 * Thu hồi quyền chia sẻ Cẩm nang Cộng tác ngay lập tức (Instant Revoke - DOC-14 / RV-008)
 */
function revokeManual(ownerEmail, reason = '') {
  const emailNorm = (ownerEmail || '').trim().toLowerCase();
  const existing = db.prepare(`SELECT * FROM collaboration_manuals WHERE lower(owner_email) = ?`).get(emailNorm);
  if (!existing) {
    throw new Error('Không tìm thấy Cẩm nang cộng tác của email này.');
  }

  db.prepare(`
    UPDATE collaboration_manuals
    SET status = 'REVOKED',
        revoked_at = datetime('now', 'localtime'),
        updated_at = datetime('now', 'localtime')
    WHERE id = ?
  `).run(existing.id);

  logAudit({
    actor_email: emailNorm,
    action_type: 'MANUAL_REVOKED',
    target_type: 'COLLABORATION_MANUAL',
    target_id: existing.id,
    summary: `${existing.full_name} đã thu hồi quyền chia sẻ Cẩm nang cộng tác. Lý do: ${reason || 'Theo yêu cầu chủ hồ sơ'}`
  });

  return getManualByOwnerEmail(emailNorm);
}

// ============================================================================
// PRIVATE GROWTH ACTIONS (KẾ HOẠCH HÀNH ĐỘNG CÁ NHÂN RIÊNG TƯ - KHÔNG CẦN TEST)
// ============================================================================

function hydrateActionRow(row) {
  if (!row) return null;
  return {
    ...row,
    self_check_log: safeJsonParse(row.self_check_log, [])
  };
}

function listPrivateActionsByOwner(ownerEmail) {
  const emailNorm = (ownerEmail || '').trim().toLowerCase();
  if (!emailNorm) return [];
  const rows = db
    .prepare(`SELECT * FROM private_growth_actions WHERE lower(owner_email) = ? ORDER BY id DESC`)
    .all(emailNorm);
  return rows.map(hydrateActionRow);
}

function createPrivateAction(payload) {
  const emailNorm = (payload.owner_email || '').trim().toLowerCase();
  if (!emailNorm) {
    throw new Error('Cần cung cấp email chủ sở hữu (owner_email) để lưu kế hoạch hành động riêng tư.');
  }
  if (!payload.title || !payload.context || !payload.trigger_situation || !payload.action_behavior) {
    throw new Error('Vui lòng nhập đầy đủ Tiêu đề, Ngữ cảnh, Tình huống kích hoạt và Hành vi thực hiện.');
  }

  // Kiểm tra quy tắc khớp ngữ cảnh của thẻ Content Bank (RV-008)
  if (payload.card_id) {
    const check = DISCEngine.validateActionCardContext(payload.card_id, payload.context);
    if (!check.valid) {
      const err = new Error(check.message);
      err.code = check.code;
      throw err;
    }
  }

  const res = db.prepare(`
    INSERT INTO private_growth_actions (
      owner_email, owner_name, department, submission_id, card_id,
      context, title, trigger_situation, action_behavior,
      success_signal, review_date, private_notes, status, self_check_log
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    emailNorm,
    (payload.owner_name || emailNorm.split('@')[0]).trim(),
    (payload.department || '').trim(),
    payload.submission_id || null,
    (payload.card_id || '').trim(),
    payload.context.trim(),
    payload.title.trim(),
    payload.trigger_situation.trim(),
    payload.action_behavior.trim(),
    (payload.success_signal || '').trim(),
    (payload.review_date || '').trim(),
    (payload.private_notes || '').trim(),
    payload.status || 'ACTIVE',
    JSON.stringify(Array.isArray(payload.self_check_log) ? payload.self_check_log : [])
  );

  const actionId = Number(res.lastInsertRowid);
  logAudit({
    actor_email: emailNorm,
    action_type: 'PRIVATE_ACTION_CREATED',
    target_type: 'PRIVATE_GROWTH_ACTION',
    target_id: actionId,
    summary: `Tạo cam kết hành động cá nhân riêng tư #${actionId} (${payload.context})`
  });

  const row = db.prepare(`SELECT * FROM private_growth_actions WHERE id = ?`).get(actionId);
  return hydrateActionRow(row);
}

function updatePrivateAction(id, ownerEmail, payload) {
  const emailNorm = (ownerEmail || payload.owner_email || '').trim().toLowerCase();
  const existing = db.prepare(`SELECT * FROM private_growth_actions WHERE id = ?`).get(Number(id));
  if (!existing) return null;

  if (existing.owner_email.toLowerCase() !== emailNorm) {
    const err = new Error('Không có quyền truy cập hoặc chỉnh sửa kế hoạch hành động riêng tư của người khác.');
    err.code = 'FORBIDDEN_PRIVATE_ACTION';
    throw err;
  }

  const nextContext = payload.context || existing.context;
  const nextCardId = payload.card_id !== undefined ? payload.card_id : existing.card_id;
  if (nextCardId) {
    const check = DISCEngine.validateActionCardContext(nextCardId, nextContext);
    if (!check.valid) {
      const err = new Error(check.message);
      err.code = check.code;
      throw err;
    }
  }

  const nextLog = Array.isArray(payload.self_check_log)
    ? payload.self_check_log
    : safeJsonParse(existing.self_check_log, []);

  db.prepare(`
    UPDATE private_growth_actions
    SET context = ?,
        title = ?,
        trigger_situation = ?,
        action_behavior = ?,
        success_signal = ?,
        review_date = ?,
        private_notes = ?,
        status = ?,
        self_check_log = ?,
        updated_at = datetime('now', 'localtime')
    WHERE id = ?
  `).run(
    nextContext,
    (payload.title ?? existing.title).trim(),
    (payload.trigger_situation ?? existing.trigger_situation).trim(),
    (payload.action_behavior ?? existing.action_behavior).trim(),
    (payload.success_signal ?? existing.success_signal).trim(),
    (payload.review_date ?? existing.review_date).trim(),
    (payload.private_notes ?? existing.private_notes).trim(),
    payload.status || existing.status,
    JSON.stringify(nextLog),
    Number(id)
  );

  const updated = db.prepare(`SELECT * FROM private_growth_actions WHERE id = ?`).get(Number(id));
  return hydrateActionRow(updated);
}

function deletePrivateAction(id, ownerEmail) {
  const emailNorm = (ownerEmail || '').trim().toLowerCase();
  const existing = db.prepare(`SELECT * FROM private_growth_actions WHERE id = ?`).get(Number(id));
  if (!existing) return false;
  if (existing.owner_email.toLowerCase() !== emailNorm) {
    const err = new Error('Không có quyền xóa kế hoạch hành động riêng tư của người khác.');
    err.code = 'FORBIDDEN_PRIVATE_ACTION';
    throw err;
  }
  const res = db.prepare(`DELETE FROM private_growth_actions WHERE id = ?`).run(Number(id));
  return res.changes > 0;
}

// ============================================================================
// DATA RIGHTS, PRIVACY LIFECYCLE & AUDIT LOGS (DOC-12 / DOC-14)
// ============================================================================

function executeDataRightsRequest({ requester_email, requester_name, request_type, reason = '' }) {
  const emailNorm = (requester_email || '').trim().toLowerCase();
  if (!emailNorm) throw new Error('Vui lòng cung cấp email hợp lệ để thực hiện quyền dữ liệu.');

  let resolutionNote = '';

  if (request_type === 'REVOKE_MANUAL') {
    const manual = getManualByOwnerEmail(emailNorm);
    if (manual) {
      revokeManual(emailNorm, reason || 'Thu hồi qua Trung tâm Quyền Dữ liệu');
      resolutionNote = `Đã thu hồi quyền công bố Cẩm nang cộng tác của ${emailNorm}.`;
    } else {
      resolutionNote = `Không tìm thấy Cẩm nang đang xuất bản của ${emailNorm}.`;
    }
  } else if (request_type === 'DELETE_ASSESSMENTS') {
    const del = db.prepare(`DELETE FROM users_submissions WHERE lower(email) = ?`).run(emailNorm);
    resolutionNote = `Đã xóa ${del.changes} bản ghi khảo sát DISC của ${emailNorm}.`;
  } else if (request_type === 'FULL_ERASURE') {
    const delSub = db.prepare(`DELETE FROM users_submissions WHERE lower(email) = ?`).run(emailNorm);
    const delMan = db.prepare(`DELETE FROM collaboration_manuals WHERE lower(owner_email) = ?`).run(emailNorm);
    const delAct = db.prepare(`DELETE FROM private_growth_actions WHERE lower(owner_email) = ?`).run(emailNorm);
    resolutionNote = `Đã xóa toàn bộ dữ liệu cá nhân của ${emailNorm}: ${delSub.changes} bài test, ${delMan.changes} cẩm nang, ${delAct.changes} hành động riêng tư.`;
  } else if (request_type === 'EXPORT_DATA') {
    resolutionNote = `Đã trích xuất gói dữ liệu cá nhân (JSON) cho ${emailNorm}.`;
  } else {
    resolutionNote = `Đã ghi nhận yêu cầu quyền dữ liệu (${request_type}) của ${emailNorm}.`;
  }

  const res = db.prepare(`
    INSERT INTO data_rights_requests (
      requester_email, requester_name, request_type, reason, status, resolution_note
    ) VALUES (?, ?, ?, ?, 'COMPLETED', ?)
  `).run(
    emailNorm,
    (requester_name || emailNorm.split('@')[0]).trim(),
    request_type,
    reason,
    resolutionNote
  );

  logAudit({
    actor_email: emailNorm,
    action_type: `DATA_RIGHTS_${request_type}`,
    target_type: 'USER_DATA',
    target_id: emailNorm,
    summary: resolutionNote
  });

  return db.prepare(`SELECT * FROM data_rights_requests WHERE id = ?`).get(Number(res.lastInsertRowid));
}

function getPersonalDataBundle(email) {
  const emailNorm = (email || '').trim().toLowerCase();
  return {
    exported_at: new Date().toISOString(),
    owner_email: emailNorm,
    compliance_standard: 'Luật BVDLCN 91/2025/QH15 & Nghị định 356/2025/NĐ-CP (Vaga DISC v0.2)',
    assessments_history: getHistoryByEmail(emailNorm),
    collaboration_manual: getManualByOwnerEmail(emailNorm),
    private_growth_actions: listPrivateActionsByOwner(emailNorm),
    data_rights_history: db
      .prepare(`SELECT * FROM data_rights_requests WHERE lower(requester_email) = ? ORDER BY id DESC`)
      .all(emailNorm)
  };
}

function listDataRightsRequests(limit = 50) {
  return db.prepare(`SELECT * FROM data_rights_requests ORDER BY id DESC LIMIT ?`).all(Number(limit));
}

function listAuditLogs(limit = 100) {
  const rows = db.prepare(`SELECT * FROM audit_logs ORDER BY id DESC LIMIT ?`).all(Number(limit));
  return rows.map((r) => ({
    ...r,
    metadata: safeJsonParse(r.metadata_json, {})
  }));
}

/**
 * Thống kê tổng quan toàn hệ thống cho Admin Dashboard & Analytics
 */
function getDashboardStats() {
  const totalRow = db.prepare(`SELECT COUNT(*) as total FROM users_submissions`).get();
  const total = totalRow ? totalRow.total : 0;

  const byTypeRows = db
    .prepare(`SELECT primary_type, COUNT(*) as count FROM users_submissions GROUP BY primary_type`)
    .all();

  const byProfileRows = db
    .prepare(`SELECT profile_code, COUNT(*) as count FROM users_submissions GROUP BY profile_code`)
    .all();

  const byModeRows = db
    .prepare(`SELECT assessment_mode, COUNT(*) as count FROM users_submissions GROUP BY assessment_mode`)
    .all();

  const avgDurationRow = db
    .prepare(`SELECT AVG(duration_seconds) as avg_duration FROM users_submissions WHERE duration_seconds > 0`)
    .get();

  const manualStats = db
    .prepare(`SELECT status, COUNT(*) as count FROM collaboration_manuals GROUP BY status`)
    .all();

  const actionCountRow = db.prepare(`SELECT COUNT(*) as count FROM private_growth_actions`).get();
  const rightsCountRow = db.prepare(`SELECT COUNT(*) as count FROM data_rights_requests`).get();

  const counts = { D: 0, I: 0, S: 0, C: 0 };
  for (const r of byTypeRows) {
    if (counts[r.primary_type] !== undefined) {
      counts[r.primary_type] = r.count;
    }
  }

  const profileCounts = {};
  for (const r of byProfileRows) {
    profileCounts[r.profile_code] = r.count;
  }

  const modeCounts = {};
  for (const r of byModeRows) {
    modeCounts[r.assessment_mode || 'forced24'] = r.count;
  }

  const manualsByStatus = { PUBLISHED: 0, DRAFT: 0, REVOKED: 0 };
  for (const r of manualStats) {
    manualsByStatus[r.status] = r.count;
  }

  return {
    total_submissions: total,
    counts_by_type: counts,
    percentages_by_type: {
      D: total ? Math.round((counts.D / total) * 100) : 0,
      I: total ? Math.round((counts.I / total) * 100) : 0,
      S: total ? Math.round((counts.S / total) * 100) : 0,
      C: total ? Math.round((counts.C / total) * 100) : 0
    },
    counts_by_profile_code: profileCounts,
    counts_by_mode: modeCounts,
    manuals_by_status: manualsByStatus,
    total_private_actions: actionCountRow ? actionCountRow.count : 0,
    total_data_rights_requests: rightsCountRow ? rightsCountRow.count : 0,
    avg_duration_seconds: avgDurationRow && avgDurationRow.avg_duration
      ? Math.round(avgDurationRow.avg_duration)
      : 0
  };
}

/**
 * Tự động khởi tạo dữ liệu mẫu chuẩn Vaga DISC v0.2 khi hệ thống chạy lần đầu
 */
function ensureSeedData() {
  const manualCount = db.prepare(`SELECT COUNT(*) AS cnt FROM collaboration_manuals`).get();
  if (manualCount && manualCount.cnt > 0) {
    return;
  }

  const demoMembers = [
    {
      full_name: 'Trần Minh Quân',
      email: 'quan.tran@vaga.vn',
      phone: '0912345678',
      department: 'Khối Sản Phẩm & Tăng Trưởng',
      position: 'Product Lead',
      target_scores: { D: 4.5, I: 4.1, S: 2.3, C: 2.8 },
      duration: 265,
      action: {
        card_id: 'CB11-SELF-D-01',
        context: 'meeting',
        title: 'Tạm dừng 10 giây trước khi chốt phương án trong cuộc họp',
        trigger_situation: 'Khi cuộc họp thảo luận chậm và tôi muốn chốt ngay lập tức.',
        action_behavior: 'Đặt câu hỏi mở lắng nghe trọn vẹn 2 ý kiến phản biện rủi ro từ nhóm S/C trước khi kết luận.',
        success_signal: 'Các thành viên kỹ thuật chủ động nêu rủi ro sớm ngay trong buổi họp.',
        review_date: '2026-11-15',
        private_notes: 'Ghi chú riêng tư của Quân: Cần chú ý lắng nghe Thu Hà (QA) và Đức Anh (Data) kỹ hơn trước khi chốt sprint.'
      }
    },
    {
      full_name: 'Lê Hoàng Bảo Ngọc',
      email: 'ngoc.le@vaga.vn',
      phone: '0987654321',
      department: 'Phòng Truyền Thông & Thương Hiệu',
      position: 'Brand & Community Manager',
      target_scores: { D: 2.7, I: 4.6, S: 3.9, C: 2.4 },
      duration: 240,
      action: {
        card_id: 'CB11-SELF-I-01',
        context: 'meeting',
        title: 'Chốt văn bản tóm tắt 3 gạch đầu dòng sau buổi thảo luận',
        trigger_situation: 'Sau buổi brainstorming chiến dịch truyền thông có nhiều ý tưởng mới.',
        action_behavior: 'Dành 5 phút cuối buổi ghi rõ: Việc cần làm - Người phụ trách - Deadline và gửi lên kênh chung.',
        success_signal: '100% sáng kiến sau họp có đầu mối theo dõi tiến độ.',
        review_date: '2026-11-10',
        private_notes: 'Ghi chú riêng tư của Ngọc: Tránh nhận thêm việc thiết kế phát sinh khi chưa chốt xong kế hoạch tuần.'
      }
    },
    {
      full_name: 'Nguyễn Thu Hà',
      email: 'ha.nguyen@vaga.vn',
      phone: '0905112233',
      department: 'Phòng Nhân Sự & Văn Hóa (People Ops)',
      position: 'HR Business Partner',
      target_scores: { D: 2.2, I: 3.0, S: 4.5, C: 4.0 },
      duration: 310,
      action: {
        card_id: 'CB11-SELF-S-01',
        context: 'meeting',
        title: 'Nêu quan điểm riêng ngay trong nửa đầu cuộc họp',
        trigger_situation: 'Khi họp liên phòng ban với các trưởng nhóm có nhịp độ nhanh.',
        action_behavior: 'Chuẩn bị trước 2 gạch đầu dòng về góc nhìn con người/vận hành và phát biểu trong 15 phút đầu.',
        success_signal: 'Đưa được lộ trình chuyển đổi êm thấm vào kế hoạch chung từ sớm.',
        review_date: '2026-11-20',
        private_notes: 'Ghi chú riêng tư của Hà: Tập nói thẳng khi khối lượng tuyển dụng vượt quá tải của nhóm.'
      }
    },
    {
      full_name: 'Phạm Đức Anh',
      email: 'anh.pham@vaga.vn',
      phone: '0933445566',
      department: 'Khối Công Nghệ & Dữ Liệu',
      position: 'Principal System Architect',
      target_scores: { D: 3.9, I: 2.1, S: 2.6, C: 4.7 },
      duration: 295,
      action: {
        card_id: 'CB11-SELF-C-02',
        context: 'chat_email',
        title: 'Mở đầu bằng kết luận (BLUF) trước khi đi vào chi tiết kỹ thuật',
        trigger_situation: 'Khi gửi báo cáo đánh giá kiến trúc hoặc cảnh báo rủi ro cho khối Sản phẩm.',
        action_behavior: 'Viết 3 dòng Tóm tắt điều hành (Kết luận - Tác động - Đề xuất) ngay đầu email, phần log kỹ thuật để ở phụ lục.',
        success_signal: 'Product Lead và các phòng ban nắm bắt ngay trọng tâm và duyệt phương án trong ngày.',
        review_date: '2026-11-18',
        private_notes: 'Ghi chú riêng tư của Đức Anh: Cần mềm hóa giọng điệu khi review code của các bạn fresher.'
      }
    },
    {
      full_name: 'Vũ Quốc Khánh',
      email: 'khanh.vu@vaga.vn',
      phone: '0977889900',
      department: 'Khối Kinh Doanh & Đối Tác',
      position: 'Head of Enterprise Sales',
      target_scores: { D: 4.7, I: 3.1, S: 2.0, C: 3.0 },
      duration: 215,
      action: {
        card_id: 'CB11-SELF-D-03',
        context: 'delegation',
        title: 'Trao quyền kèm khung tự chủ rõ ràng khi giao việc',
        trigger_situation: 'Khi bàn giao hợp đồng khách hàng lớn cho Chuyên viên Kinh doanh.',
        action_behavior: 'Thống nhất rõ tiêu chí đầu ra và mốc check-in giữa kỳ, không can thiệp làm thay.',
        success_signal: 'Đội ngũ chủ động chốt deal mà không phụ thuộc vào trưởng phòng.',
        review_date: '2026-11-25',
        private_notes: 'Ghi chú riêng tư của Khánh: Kiên nhẫn hơn trong các buổi coaching 1-1 thứ Sáu hàng tuần.'
      }
    },
    {
      full_name: 'Đặng Minh Châu',
      email: 'chau.dang@vaga.vn',
      phone: '0944556677',
      department: 'Ban Quản Trị Dự Án (PMO)',
      position: 'Agile Delivery Lead',
      target_scores: { D: 3.5, I: 3.4, S: 3.6, C: 3.5 },
      duration: 275,
      action: {
        card_id: 'CB11-MAN-PREF-13',
        context: 'meeting',
        title: 'Làm rõ chế độ ưu tiên ở đầu mỗi dự án liên phòng ban',
        trigger_situation: 'Khi điều phối cuộc họp giữa nhóm Công nghệ (C) và nhóm Kinh doanh (D/I).',
        action_behavior: 'Xác định rõ giai đoạn nào ưu tiên tốc độ thử nghiệm, giai đoạn nào ưu tiên chuẩn hóa chất lượng.',
        success_signal: 'Giảm xung đột phong cách giữa các bộ phận trong sprint.',
        review_date: '2026-11-30',
        private_notes: 'Ghi chú riêng tư của Châu: Giữ khung giờ Deep Work buổi chiều không mở lịch họp.'
      }
    }
  ];

  for (const member of demoMembers) {
    const likertAnswers = VAGA_LIKERT_40.map((item, idx) => {
      const targetMean = member.target_scores[item.dimension] || 3.0;
      const jitter = (idx % 3 === 0 ? 0.3 : idx % 3 === 1 ? -0.3 : 0);
      const desiredKeyed = Math.min(5, Math.max(1, Math.round(targetMean + jitter)));
      const rawValue = item.keying === 'reverse' ? 6 - desiredKeyed : desiredKeyed;
      return {
        question_index: item.index,
        item_id: item.id,
        dimension: item.dimension,
        keying: item.keying,
        raw_value: rawValue,
        keyed_value: desiredKeyed,
        value: rawValue,
        most_choice: item.dimension,
        least_choice: item.keying
      };
    });

    const calc = DISCEngine.calculateLikertResult(likertAnswers, member.duration);
    const createdSub = createSubmission({
      full_name: member.full_name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      position: member.position,
      assessment_mode: calc.assessment_mode,
      raw_mean_scores: calc.raw_mean_scores,
      linear_scores: calc.linear_scores,
      adaptive_used: calc.adaptive_used,
      response_quality: calc.response_quality,
      most_scores: calc.most_scores,
      least_scores: calc.least_scores,
      diff_scores: calc.diff_scores,
      percentage_scores: calc.percentage_scores,
      primary_type: calc.primary_type,
      profile_code: calc.profile_code,
      duration_seconds: member.duration,
      answers: likertAnswers
    });

    publishManual(member.email);

    if (member.action) {
      createPrivateAction({
        owner_email: member.email,
        owner_name: member.full_name,
        department: member.department,
        submission_id: createdSub.id,
        ...member.action
      });
    }
  }
}

ensureSeedData();

module.exports = {
  db,
  createSubmission,
  getSubmissionById,
  getHistoryByEmail,
  listSubmissions,
  deleteSubmission,
  listPublishedManuals,
  getManualById,
  getManualByOwnerEmail,
  saveManualDraft,
  publishManual,
  revokeManual,
  listPrivateActionsByOwner,
  createPrivateAction,
  updatePrivateAction,
  deletePrivateAction,
  executeDataRightsRequest,
  getPersonalDataBundle,
  listDataRightsRequests,
  listAuditLogs,
  getDashboardStats,
  ensureSeedData
};
