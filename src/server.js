const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const {
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
  getDashboardStats
} = require('./db');

const DISCEngine = require('../public/js/disc-engine.js');
const {
  DISC_QUESTIONS,
  VAGA_LIKERT_40,
  VAGA_ADAPTIVE_8,
  VAGA_WORKPLACE_CONTEXTS,
  VAGA_WORKSTYLE_SLIDERS,
  VAGA_CONTENT_BANK_72
} = require('../public/js/questions-data.js');
const { DISC_DIMENSIONS, DISC_PROFILES } = require('../public/js/disc-profiles.js');

const PORT = process.env.PORT || 3456;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 2 * 1024 * 1024) {
        reject(new Error('Payload quá lớn'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Dữ liệu JSON không hợp lệ'));
      }
    });
    req.on('error', reject);
  });
}

function escapeCsvCell(val) {
  const str = String(val ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // =========================================================================
    // 1. API THỐNG KÊ TỔNG QUAN & CATALOG
    // =========================================================================
    if (pathname === '/api/stats' && req.method === 'GET') {
      const stats = getDashboardStats();
      return sendJson(res, 200, stats);
    }

    if (pathname === '/api/catalog' && req.method === 'GET') {
      return sendJson(res, 200, {
        version: '0.2.0',
        workplace_contexts: VAGA_WORKPLACE_CONTEXTS,
        workstyle_sliders: VAGA_WORKSTYLE_SLIDERS,
        likert_40_count: VAGA_LIKERT_40.length,
        adaptive_8_count: VAGA_ADAPTIVE_8.length,
        forced_24_count: DISC_QUESTIONS.length,
        content_bank_count: VAGA_CONTENT_BANK_72.length,
        dimensions: DISC_DIMENSIONS,
        profiles_count: Object.keys(DISC_PROFILES).length,
        content_bank: VAGA_CONTENT_BANK_72
      });
    }

    // =========================================================================
    // 2. API KIỂM ĐỊNH HỢP ĐỒNG SỐ HỌC & NGỮ CẢNH (DOC-09 / DOC-11 / RV-005..008)
    // =========================================================================
    if (pathname === '/api/contracts/validate' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (body.metric_type) {
        const resVal = DISCEngine.validateMetricValue(body.metric_type, body.value);
        return sendJson(res, resVal.valid ? 200 : 422, resVal);
      }
      if (body.card_id) {
        const resCard = DISCEngine.validateActionCardContext(body.card_id, body.context);
        return sendJson(res, resCard.valid ? 200 : 422, resCard);
      }
      return sendJson(res, 400, { valid: false, message: 'Thiếu metric_type hoặc card_id cần kiểm tra.' });
    }

    // =========================================================================
    // 3. API XUẤT DỮ LIỆU CSV & JSON (DATA PORTABILITY)
    // =========================================================================
    if (pathname === '/api/export/csv' && req.method === 'GET') {
      const search = parsedUrl.searchParams.get('search') || '';
      const primaryType = parsedUrl.searchParams.get('type') || '';
      const mode = parsedUrl.searchParams.get('mode') || '';
      const { items } = listSubmissions({ search, primaryType, mode, limit: 10000, offset: 0 });

      const headers = [
        'ID',
        'Họ và Tên',
        'Email',
        'Số Điện Thoại',
        'Phòng Ban',
        'Chức Vụ',
        'Chế Độ Test',
        'Nhóm Chủ Đạo',
        'Mã Hồ Sơ (12+1 Styles)',
        'Lần Làm Bài (Revision)',
        'Điểm Chuẩn 0-100 (D)',
        'Điểm Chuẩn 0-100 (I)',
        'Điểm Chuẩn 0-100 (S)',
        'Điểm Chuẩn 0-100 (C)',
        '% D',
        '% I',
        '% S',
        '% C',
        'Chất Lượng Phản Hồi',
        'Thời Gian Làm Bài (Giây)',
        'Ngày Nộp'
      ];

      const lines = [headers.map(escapeCsvCell).join(',')];
      for (const row of items) {
        lines.push(
          [
            row.id,
            row.full_name,
            row.email,
            row.phone,
            row.department,
            row.position,
            row.assessment_mode || 'forced24',
            row.primary_type,
            row.profile_code,
            row.revision || 1,
            row.linear_scores?.D ?? 0,
            row.linear_scores?.I ?? 0,
            row.linear_scores?.S ?? 0,
            row.linear_scores?.C ?? 0,
            row.percentage_scores?.D ?? 0,
            row.percentage_scores?.I ?? 0,
            row.percentage_scores?.S ?? 0,
            row.percentage_scores?.C ?? 0,
            row.response_quality?.status || 'HIGH_RELIABILITY',
            row.duration_seconds,
            row.created_at
          ]
            .map(escapeCsvCell)
            .join(',')
        );
      }

      const csvContent = '\uFEFF' + lines.join('\r\n');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="vaga-disc-submissions.csv"'
      });
      return res.end(csvContent);
    }

    if (pathname === '/api/export/json' && req.method === 'GET') {
      const email = parsedUrl.searchParams.get('email') || '';
      if (!email.trim()) {
        return sendJson(res, 400, { error: 'Vui lòng cung cấp tham số email để trích xuất gói dữ liệu cá nhân.' });
      }
      const bundle = getPersonalDataBundle(email);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="vaga-disc-personal-data-${encodeURIComponent(email.trim())}.json"`
      });
      return res.end(JSON.stringify(bundle, null, 2));
    }

    // =========================================================================
    // 4. API LỊCH SỬ LÀM BÀI (NON-DESTRUCTIVE RETEST HISTORY)
    // =========================================================================
    if (pathname === '/api/history' && req.method === 'GET') {
      const email = parsedUrl.searchParams.get('email') || '';
      const items = getHistoryByEmail(email);
      return sendJson(res, 200, { email: email.trim().toLowerCase(), total: items.length, items });
    }

    // =========================================================================
    // 5. API BÀI NỘP KHẢO SÁT (/api/submissions & /api/submissions/:id)
    // =========================================================================
    if (pathname === '/api/submissions' && req.method === 'GET') {
      const search = parsedUrl.searchParams.get('search') || '';
      const primaryType = parsedUrl.searchParams.get('type') || '';
      const mode = parsedUrl.searchParams.get('mode') || '';
      const result = listSubmissions({ search, primaryType, mode });
      return sendJson(res, 200, result);
    }

    if (pathname === '/api/submissions' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.full_name || !body.email) {
        return sendJson(res, 400, {
          error: 'Vui lòng nhập đầy đủ Họ tên và Email.'
        });
      }

      let computedPayload = { ...body };

      // Nếu gửi bài làm dạng Likert 40 / 48 câu mà chưa tính sẵn hoặc cần kiểm chứng server-side
      if (
        (body.assessment_mode === 'likert40' || body.assessment_mode === 'likert48_adaptive') &&
        Array.isArray(body.answers) &&
        body.answers.length > 0 &&
        body.answers[0].item_id
      ) {
        const calc = DISCEngine.calculateLikertResult(body.answers, body.duration_seconds);
        if (calc.incomplete) {
          return sendJson(res, 422, {
            error_code: 'INCOMPLETE_LIKERT_SUBMISSION',
            error: 'Bài khảo sát Likert còn thiếu câu trả lời ở một số miền. Hệ thống không tự suy diễn điểm thiếu theo chuẩn DOC-09.',
            missing_by_dimension: calc.missing_by_dimension
          });
        }
        computedPayload = {
          ...body,
          ...calc
        };
      } else if (!body.primary_type || !body.profile_code) {
        if (Array.isArray(body.answers) && body.answers.length > 0) {
          const calc = DISCEngine.calculateResult(body.answers, DISC_QUESTIONS.length, body.duration_seconds);
          computedPayload = {
            ...body,
            ...calc
          };
        } else {
          return sendJson(res, 400, {
            error: 'Dữ liệu bài khảo sát chưa đầy đủ.'
          });
        }
      }

      // Kiểm định hợp đồng số học trước khi ghi DB (RV-005 / RV-006)
      if (computedPayload.linear_scores) {
        for (const dim of ['D', 'I', 'S', 'C']) {
          if (computedPayload.linear_scores[dim] !== undefined && computedPayload.linear_scores[dim] !== null) {
            const check = DISCEngine.validateMetricValue('LINEAR_0_100', Number(computedPayload.linear_scores[dim]));
            if (!check.valid) {
              return sendJson(res, 422, { error_code: check.code, error: check.message });
            }
            computedPayload.linear_scores[dim] = check.value;
          }
        }
      }

      const created = createSubmission(computedPayload);
      return sendJson(res, 201, created);
    }

    const submissionMatch = pathname.match(/^\/api\/submissions\/(\d+)$/);
    if (submissionMatch) {
      const submissionId = Number(submissionMatch[1]);

      if (req.method === 'GET') {
        const record = getSubmissionById(submissionId);
        if (!record) {
          return sendJson(res, 404, { error: 'Không tìm thấy bản ghi khảo sát' });
        }
        return sendJson(res, 200, record);
      }

      if (req.method === 'DELETE') {
        const deleted = deleteSubmission(submissionId);
        if (!deleted) {
          return sendJson(res, 404, { error: 'Không tìm thấy bản ghi để xóa' });
        }
        return sendJson(res, 200, { success: true });
      }
    }

    // =========================================================================
    // 6. API CẨM NANG CỘNG TÁC ("HOW TO WORK WITH ME" - DOC-06 / DOC-11 / v0.2)
    // =========================================================================
    if (pathname === '/api/manuals' && req.method === 'GET') {
      const search = parsedUrl.searchParams.get('search') || '';
      const department = parsedUrl.searchParams.get('department') || '';
      const primaryType = parsedUrl.searchParams.get('type') || '';
      const items = listPublishedManuals({ search, department, primaryType });
      return sendJson(res, 200, { total: items.length, items });
    }

    if (pathname === '/api/manuals/by-owner' && req.method === 'GET') {
      const email = parsedUrl.searchParams.get('email') || '';
      if (!email.trim()) {
        return sendJson(res, 400, { error: 'Vui lòng cung cấp email chủ hồ sơ.' });
      }
      const manual = getManualByOwnerEmail(email);
      return sendJson(res, 200, { item: manual });
    }

    if (pathname === '/api/manuals/draft' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const saved = saveManualDraft(body);
      return sendJson(res, 200, saved);
    }

    if (pathname === '/api/manuals/publish' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.owner_email) {
        return sendJson(res, 400, { error: 'Thiếu owner_email để xuất bản Cẩm nang cộng tác.' });
      }
      const published = publishManual(body.owner_email, body);
      return sendJson(res, 200, published);
    }

    if (pathname === '/api/manuals/revoke' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.owner_email) {
        return sendJson(res, 400, { error: 'Thiếu owner_email để thu hồi quyền chia sẻ.' });
      }
      const revoked = revokeManual(body.owner_email, body.reason || '');
      return sendJson(res, 200, revoked);
    }

    const manualMatch = pathname.match(/^\/api\/manuals\/(\d+)$/);
    if (manualMatch && req.method === 'GET') {
      const manualId = Number(manualMatch[1]);
      const requesterEmail = parsedUrl.searchParams.get('requester_email') || '';
      const manual = getManualById(manualId, requesterEmail);
      if (!manual) {
        return sendJson(res, 404, { error: 'Không tìm thấy Cẩm nang cộng tác.' });
      }
      if (manual.access_denied) {
        return sendJson(res, 403, manual);
      }
      return sendJson(res, 200, manual);
    }

    // =========================================================================
    // 7. API SO SÁNH CẶP 1-1 CÓ HƯỚNG (A -> B) (/api/pair-compare)
    // =========================================================================
    if (pathname === '/api/pair-compare' && req.method === 'GET') {
      const viewerId = Number(parsedUrl.searchParams.get('viewerId'));
      const targetId = Number(parsedUrl.searchParams.get('targetId'));
      const contextFilter = parsedUrl.searchParams.get('context') || 'all';

      if (!viewerId || !targetId) {
        return sendJson(res, 400, {
          valid: false,
          error_code: 'MISSING_PAIR_IDS',
          message: 'Vui lòng chọn cả Hồ sơ của bạn (A) và Hồ sơ đồng nghiệp (B).'
        });
      }

      const viewerManual = getManualById(viewerId);
      const targetManual = getManualById(targetId);

      if (!viewerManual || viewerManual.access_denied) {
        return sendJson(res, 422, {
          valid: false,
          error_code: viewerManual?.error_code || 'VIEWER_MANUAL_UNAVAILABLE',
          message: viewerManual?.message || 'Hồ sơ người xem (A) chưa được xuất bản hoặc đã thu hồi.'
        });
      }

      if (!targetManual || targetManual.access_denied) {
        return sendJson(res, 422, {
          valid: false,
          error_code: targetManual?.error_code || 'TARGET_MANUAL_UNAVAILABLE',
          message: targetManual?.message || 'Hồ sơ đồng nghiệp (B) chưa được xuất bản hoặc đã thu hồi.'
        });
      }

      const comparison = DISCEngine.comparePairProfiles(viewerManual, targetManual, contextFilter);
      if (!comparison.valid) {
        return sendJson(res, 422, comparison);
      }
      return sendJson(res, 200, comparison);
    }

    // =========================================================================
    // 8. API KẾ HOẠCH PHÁT TRIỂN CÁ NHÂN RIÊNG TƯ (/api/actions)
    // Cô lập quyền truy cập theo owner_email; hoạt động độc lập cả khi chưa làm test
    // =========================================================================
    if (pathname === '/api/actions' && req.method === 'GET') {
      const email = parsedUrl.searchParams.get('email') || '';
      if (!email.trim()) {
        return sendJson(res, 400, { error: 'Vui lòng cung cấp email chủ sở hữu để tải kế hoạch hành động riêng tư.' });
      }
      const items = listPrivateActionsByOwner(email);
      return sendJson(res, 200, { owner_email: email.trim().toLowerCase(), total: items.length, items });
    }

    if (pathname === '/api/actions' && req.method === 'POST') {
      const body = await readJsonBody(req);
      try {
        const created = createPrivateAction(body);
        return sendJson(res, 201, created);
      } catch (err) {
        return sendJson(res, err.code ? 422 : 400, {
          error_code: err.code || 'INVALID_ACTION_PAYLOAD',
          error: err.message
        });
      }
    }

    const actionMatch = pathname.match(/^\/api\/actions\/(\d+)$/);
    if (actionMatch) {
      const actionId = Number(actionMatch[1]);

      if (req.method === 'PUT') {
        const body = await readJsonBody(req);
        const ownerEmail = body.owner_email || parsedUrl.searchParams.get('email') || '';
        try {
          const updated = updatePrivateAction(actionId, ownerEmail, body);
          if (!updated) return sendJson(res, 404, { error: 'Không tìm thấy cam kết hành động.' });
          return sendJson(res, 200, updated);
        } catch (err) {
          const status = err.code === 'FORBIDDEN_PRIVATE_ACTION' ? 403 : 422;
          return sendJson(res, status, { error_code: err.code, error: err.message });
        }
      }

      if (req.method === 'DELETE') {
        const ownerEmail = parsedUrl.searchParams.get('email') || '';
        try {
          const deleted = deletePrivateAction(actionId, ownerEmail);
          if (!deleted) return sendJson(res, 404, { error: 'Không tìm thấy cam kết hành động.' });
          return sendJson(res, 200, { success: true });
        } catch (err) {
          return sendJson(res, 403, { error_code: err.code, error: err.message });
        }
      }
    }

    // =========================================================================
    // 9. API QUYỀN DỮ LIỆU CÁ NHÂN & NHẬT KÝ KIỂM TOÁN (/api/data-rights & /api/audit-logs)
    // =========================================================================
    if (pathname === '/api/data-rights' && req.method === 'GET') {
      const items = listDataRightsRequests(100);
      return sendJson(res, 200, { total: items.length, items });
    }

    if (pathname === '/api/data-rights' && req.method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.requester_email || !body.request_type) {
        return sendJson(res, 400, { error: 'Vui lòng cung cấp email và loại yêu cầu quyền dữ liệu.' });
      }
      const record = executeDataRightsRequest(body);
      return sendJson(res, 200, record);
    }

    if (pathname === '/api/audit-logs' && req.method === 'GET') {
      const items = listAuditLogs(120);
      return sendJson(res, 200, { total: items.length, items });
    }

    // =========================================================================
    // 10. PHỤC VỤ FILE TĨNH (HTML / CSS / JS THUẦN)
    // =========================================================================
    let safePath = pathname === '/' ? '/index.html' : pathname;
    safePath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(PUBLIC_DIR, safePath);

    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      return fs.createReadStream(filePath).pipe(res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Không tìm thấy trang yêu cầu');
  } catch (err) {
    console.error('[Server Error]:', err);
    sendJson(res, 500, { error: err.message || 'Lỗi máy chủ nội bộ' });
  }
});

server.listen(PORT, () => {
  console.log('==============================================================');
  console.log(`🚀 Nền tảng Vaga D.I.S.C v0.2 (Workstyle & Collaboration) đã sẵn sàng!`);
  console.log(`👉 Không gian làm việc chính:  http://localhost:${PORT}`);
  console.log(`👉 Quản trị & Quản trị dữ liệu: http://localhost:${PORT}/admin.html`);
  console.log('==============================================================');
});
