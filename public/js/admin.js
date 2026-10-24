/**
 * Logic quản trị & kiểm toán dữ liệu Vaga D.I.S.C v0.2 trên SQLite (public/js/admin.js)
 */
(function () {
  const searchInput = document.getElementById('admin-search-input');
  const typeFilter = document.getElementById('admin-type-filter');
  const modeFilter = document.getElementById('admin-mode-filter');
  const tbody = document.getElementById('submissions-tbody');
  const auditTbody = document.getElementById('audit-logs-tbody');
  const btnRefresh = document.getElementById('btn-refresh-list');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const btnSeedSample = document.getElementById('btn-seed-sample');

  const modalBackdrop = document.getElementById('detail-modal-backdrop');
  const btnCloseModal = document.getElementById('btn-close-modal');

  let searchDebounce = null;

  function formatDuration(sec) {
    const mins = Math.floor((sec || 0) / 60);
    const rem = (sec || 0) % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function loadStats() {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) return;
      const stats = await res.json();

      document.getElementById('stat-total-count').textContent = stats.total_submissions;
      document.getElementById('stat-avg-duration').textContent =
        `Thời gian TB: ${formatDuration(stats.avg_duration_seconds)}`;

      ['D', 'I', 'S', 'C'].forEach((t) => {
        const count = stats.counts_by_type?.[t] ?? 0;
        const pct = stats.percentages_by_type?.[t] ?? 0;

        document.getElementById(`stat-count-${t}`).textContent = count;
        document.getElementById(`stat-pct-${t}`).textContent = `${pct}% tổng số`;

        const seg = document.getElementById(`dist-seg-${t}`);
        if (seg) {
          seg.style.width = stats.total_submissions > 0 ? `${pct}%` : '25%';
          seg.title = `Nhóm ${t}: ${count} người (${pct}%)`;
        }
      });

      const distSummary = document.getElementById('dist-summary-text');
      if (distSummary) {
        distSummary.textContent =
          stats.total_submissions > 0
            ? `D: ${stats.percentages_by_type.D}% • I: ${stats.percentages_by_type.I}% • S: ${stats.percentages_by_type.S}% • C: ${stats.percentages_by_type.C}%`
            : 'Chưa có bài khảo sát nào';
      }

      const govEl = document.getElementById('v02-governance-metrics');
      if (govEl) {
        const man = stats.manuals_by_status || { PUBLISHED: 0, DRAFT: 0, REVOKED: 0 };
        govEl.innerHTML = `
          <span>🌐 <strong>Cẩm nang đang PUBLISHED:</strong> ${man.PUBLISHED || 0}</span>
          <span>📝 <strong>Cẩm nang DRAFT:</strong> ${man.DRAFT || 0}</span>
          <span>🛑 <strong>Cẩm nang đã REVOKE:</strong> ${man.REVOKED || 0}</span>
          <span>🌱 <strong>Hành động cá nhân riêng tư:</strong> ${stats.total_private_actions || 0}</span>
          <span>🛡️ <strong>Yêu cầu quyền dữ liệu đã xử lý:</strong> ${stats.total_data_rights_requests || 0}</span>
        `;
      }
    } catch (err) {
      console.error('Lỗi tải thống kê:', err);
    }
  }

  async function loadSubmissions() {
    const search = searchInput?.value.trim() || '';
    const type = typeFilter?.value || '';
    const mode = modeFilter?.value || '';

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    if (mode) params.set('mode', mode);

    try {
      const res = await fetch(`/api/submissions?${params.toString()}`);
      const data = await res.json();
      renderTable(data.items || []);
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="8" class="empty-cell">Không thể tải dữ liệu: ${escapeHtml(err.message)}</td></tr>`;
    }
  }

  function renderTable(items) {
    if (!items || items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-cell">
            Chưa có dữ liệu khảo sát nào khớp với bộ lọc.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = items
      .map((item) => {
        const lin = item.linear_scores || item.percentage_scores || { D: 0, I: 0, S: 0, C: 0 };
        const rq = item.response_quality || { status: 'HIGH_RELIABILITY', quality_score: 95 };
        const modeLabel =
          item.assessment_mode === 'likert48_adaptive'
            ? 'Likert 48 (Adaptive)'
            : item.assessment_mode === 'likert40'
            ? 'Likert 40 câu'
            : 'Forced-Choice 24';

        return `
          <tr>
            <td>
              <strong>#${item.id}</strong>
              <div><small style="color:#6366f1;font-weight:700;">Lần #${item.revision || 1}</small></div>
            </td>
            <td>
              <span class="user-cell-name">${escapeHtml(item.full_name)}</span>
              <span class="user-cell-email">${escapeHtml(item.email)}</span>
            </td>
            <td>
              <div>${escapeHtml(item.department || '---')}</div>
              <small style="color:#64748b">${escapeHtml(item.position || '---')} • ${escapeHtml(item.phone || '---')}</small>
            </td>
            <td>
              <span class="type-pill type-${escapeHtml(item.primary_type)}">
                ${escapeHtml(item.profile_code)} (Nhóm ${escapeHtml(item.primary_type)})
              </span>
            </td>
            <td>
              <div class="mini-pct-bars">
                <span class="mini-pct-tag tag-d">D: ${lin.D}</span>
                <span class="mini-pct-tag tag-i">I: ${lin.I}</span>
                <span class="mini-pct-tag tag-s">S: ${lin.S}</span>
                <span class="mini-pct-tag tag-c">C: ${lin.C}</span>
              </div>
            </td>
            <td>
              <div style="font-size:12px;">
                <strong>${escapeHtml(modeLabel)}</strong><br/>
                <span style="color:${rq.status === 'HIGH_RELIABILITY' ? '#059669' : '#d97706'}">
                  Tin cậy: ${rq.quality_score ?? 95}/100 (${escapeHtml(rq.status || 'HIGH')})
                </span>
              </div>
            </td>
            <td>
              <div>${escapeHtml(item.created_at)}</div>
              <small style="color:#64748b">⏱️ ${formatDuration(item.duration_seconds)}</small>
            </td>
            <td>
              <div class="row-actions">
                <button type="button" class="btn btn-outline btn-sm" data-action="view" data-id="${item.id}">
                  👁️ Chi tiết
                </button>
                <a href="/?id=${item.id}&print=1" target="_blank" class="btn btn-secondary btn-sm" title="Mở trang báo cáo chuẩn A4 để In hoặc Xuất PDF">
                  🖨️ PDF
                </a>
                <button type="button" class="btn btn-danger-ghost btn-sm" data-action="delete" data-id="${item.id}">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  async function loadAuditLogs() {
    if (!auditTbody) return;
    try {
      const res = await fetch('/api/audit-logs');
      if (!res.ok) return;
      const data = await res.json();
      const items = data.items || [];
      if (items.length === 0) {
        auditTbody.innerHTML = `<tr><td colspan="6" class="empty-cell">Chưa có sự kiện kiểm toán nào.</td></tr>`;
        return;
      }
      auditTbody.innerHTML = items
        .slice(0, 40)
        .map(
          (log) => `
          <tr>
            <td><strong>#${log.id}</strong></td>
            <td><small>${escapeHtml(log.created_at)}</small></td>
            <td><code>${escapeHtml(log.actor_email)}</code></td>
            <td><span class="pac-card-id" style="margin:0">${escapeHtml(log.action_type)}</span></td>
            <td><small>${escapeHtml(log.target_type)} #${escapeHtml(log.target_id)}</small></td>
            <td>${escapeHtml(log.summary)}</td>
          </tr>
        `
        )
        .join('');
    } catch (_) {}
  }

  async function openSubmissionModal(id) {
    try {
      const res = await fetch(`/api/submissions/${id}`);
      if (!res.ok) return;
      const record = await res.json();

      document.getElementById('modal-record-id').textContent = `Hồ sơ SQLite #${record.id} (Lần #${record.revision || 1})`;
      document.getElementById('modal-user-name').textContent = record.full_name;
      document.getElementById('modal-user-meta').textContent = `${record.email} • SĐT: ${record.phone || '---'} • ${record.department || '---'} (${record.position || '---'})`;

      const printLink = document.getElementById('modal-print-link');
      if (printLink) {
        printLink.href = `/?id=${record.id}`;
      }

      const { profile, primaryDimension } = window.DISCEngine.getProfileDetails(
        record.profile_code,
        record.primary_type
      );

      const badge = document.getElementById('modal-profile-code');
      badge.textContent = record.profile_code;
      badge.style.backgroundColor = primaryDimension.color;

      document.getElementById('modal-profile-title').textContent = profile.title;
      document.getElementById('modal-profile-overview').textContent = profile.overview;

      window.DISCChartRenderer.renderRadarChart(
        document.getElementById('modal-radar-canvas'),
        record
      );
      window.DISCChartRenderer.renderBarChart(
        document.getElementById('modal-bar-canvas'),
        record
      );

      const answersGrid = document.getElementById('modal-answers-grid');
      const answers = record.answers || [];
      const heading = document.getElementById('modal-answers-heading');
      if (heading) {
        heading.textContent = `Chi tiết ${answers.length} câu trả lời (${record.assessment_mode || 'forced24'})`;
      }

      if (answers.length === 0) {
        answersGrid.innerHTML = '<p style="color:#64748b">Không có dữ liệu chi tiết từng câu.</p>';
      } else if (record.assessment_mode && record.assessment_mode.startsWith('likert')) {
        answersGrid.innerHTML = answers
          .map(
            (a) => `
            <div class="ans-chip-card">
              <strong>${escapeHtml(a.item_id || `Câu ${a.question_index}`)} (${escapeHtml(a.most_choice)})</strong>
              <div>Mức chọn: <b style="color:#4f46e5">${a.raw_value ?? '---'} / 5</b></div>
              <div>Điểm quy đổi (${a.least_choice === 'reverse' ? 'Đảo ngược' : 'Thuận'}): <b style="color:#059669">${a.keyed_value ?? '---'}</b></div>
            </div>
          `
          )
          .join('');
      } else {
        answersGrid.innerHTML = answers
          .map(
            (a) => `
            <div class="ans-chip-card">
              <strong>Câu ${a.question_index}</strong>
              <div>👍 Most: <b style="color:#4f46e5">Nhóm ${escapeHtml(a.most_choice)}</b></div>
              <div>👎 Least: <b style="color:#d97706">Nhóm ${escapeHtml(a.least_choice)}</b></div>
            </div>
          `
          )
          .join('');
      }

      modalBackdrop.classList.remove('hidden');
    } catch (err) {
      alert('Không thể tải chi tiết hồ sơ: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm(`Bạn có chắc chắn muốn xóa hồ sơ #${id} khỏi SQLite không?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await Promise.all([loadStats(), loadSubmissions(), loadAuditLogs()]);
      }
    } catch (err) {
      alert('Lỗi khi xóa bản ghi: ' + err.message);
    }
  }

  async function seedSampleProfiles() {
    btnSeedSample.disabled = true;
    btnSeedSample.textContent = 'Đang tạo dữ liệu mẫu...';

    const sampleCandidates = [
      {
        full_name: 'Trần Minh Quân',
        email: 'quan.tran@vaga.vn',
        phone: '0912345678',
        department: 'Khối Sản Phẩm & Tăng Trưởng',
        position: 'Product Lead',
        dominant: 'D',
        secondary: 'I',
        duration_seconds: 265
      },
      {
        full_name: 'Lê Hoàng Bảo Ngọc',
        email: 'ngoc.le@vaga.vn',
        phone: '0987654321',
        department: 'Phòng Truyền Thông & Thương Hiệu',
        position: 'Brand & Community Manager',
        dominant: 'I',
        secondary: 'S',
        duration_seconds: 240
      },
      {
        full_name: 'Nguyễn Thu Hà',
        email: 'ha.nguyen@vaga.vn',
        phone: '0905112233',
        department: 'Phòng Nhân Sự & Văn Hóa',
        position: 'HR Business Partner',
        dominant: 'S',
        secondary: 'C',
        duration_seconds: 310
      },
      {
        full_name: 'Phạm Đức Anh',
        email: 'anh.pham@vaga.vn',
        phone: '0933445566',
        department: 'Khối Công Nghệ & Dữ Liệu',
        position: 'Principal System Architect',
        dominant: 'C',
        secondary: 'D',
        duration_seconds: 295
      }
    ];

    try {
      const questions = window.DISC_QUESTIONS || [];
      for (const cand of sampleCandidates) {
        const answers = questions.map((_, idx) => {
          const allTypes = ['D', 'I', 'S', 'C'];
          let mostChoice = cand.dominant;
          if (idx % 3 === 1) mostChoice = cand.secondary;
          else if (idx % 7 === 0) mostChoice = allTypes[(idx + 2) % 4];

          const leastCandidates = allTypes.filter(
            (t) => t !== mostChoice && t !== cand.dominant
          );
          const leastChoice = leastCandidates[idx % leastCandidates.length];

          return {
            question_index: idx + 1,
            most_choice: mostChoice,
            least_choice: leastChoice
          };
        });

        const calc = window.DISCEngine.calculateResult(answers, questions.length, cand.duration_seconds);

        await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: cand.full_name,
            email: cand.email,
            phone: cand.phone,
            department: cand.department,
            position: cand.position,
            ...calc,
            duration_seconds: cand.duration_seconds,
            answers
          })
        });
      }

      await Promise.all([loadStats(), loadSubmissions(), loadAuditLogs()]);
    } catch (err) {
      alert('Lỗi khi tạo hồ sơ mẫu: ' + err.message);
    } finally {
      btnSeedSample.disabled = false;
      btnSeedSample.textContent = '✨ Tạo thêm 4 hồ sơ khảo sát mẫu';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadSubmissions();
    loadAuditLogs();

    searchInput?.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(loadSubmissions, 250);
    });

    typeFilter?.addEventListener('change', loadSubmissions);
    modeFilter?.addEventListener('change', loadSubmissions);

    btnRefresh?.addEventListener('click', () => {
      loadStats();
      loadSubmissions();
      loadAuditLogs();
    });

    btnExportCsv?.addEventListener('click', () => {
      const search = searchInput?.value.trim() || '';
      const type = typeFilter?.value || '';
      const mode = modeFilter?.value || '';
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (type) params.set('type', type);
      if (mode) params.set('mode', mode);
      window.location.href = `/api/export/csv?${params.toString()}`;
    });

    btnSeedSample?.addEventListener('click', seedSampleProfiles);

    tbody?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      if (action === 'view') openSubmissionModal(id);
      if (action === 'delete') handleDelete(id);
    });

    btnCloseModal?.addEventListener('click', () => {
      modalBackdrop.classList.add('hidden');
    });

    modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.add('hidden');
      }
    });
  });
})();
