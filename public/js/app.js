/**
 * Ứng dụng Frontend chính cho Hệ thống Vaga D.I.S.C v0.2
 * (Assessment Likert 40/48 & Forced-Choice 24 • Private Self View • Collaboration Manual • Pair Comparison A->B • Private Actions & Data Rights)
 */
(function () {
  const likert40 = window.VAGA_LIKERT_40 || [];
  const adaptive8 = window.VAGA_ADAPTIVE_8 || [];
  const forced24 = window.DISC_QUESTIONS || [];
  const workplaceContexts = window.VAGA_WORKPLACE_CONTEXTS || [];
  const workstyleSliders = window.VAGA_WORKSTYLE_SLIDERS || [];
  const contentBank72 = window.VAGA_CONTENT_BANK_72 || [];

  // Trạng thái phiên làm việc hiện tại
  const state = {
    activeTab: 'assessment',
    userInfo: {
      full_name: '',
      email: '',
      phone: '',
      department: '',
      position: ''
    },
    assessmentMode: 'likert40', // 'likert40' | 'forced24'
    adaptiveUnlocked: false,
    adaptiveReason: '',
    currentIndex: 0,
    likertAnswers: [], // [{ item_id, index, dimension, keying, value }]
    forcedAnswers: [], // [{ question_index, most_choice, least_choice }]
    elapsedSeconds: 0,
    timerInterval: null,
    currentSubmission: null,
    allSubmissions: [],
    publishedManuals: [],
    selectedManualId: null
  };

  const screens = {
    welcome: document.getElementById('screen-welcome'),
    userInfo: document.getElementById('screen-user-info'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result'),
    manuals: document.getElementById('screen-manuals'),
    pairCompare: document.getElementById('screen-pair-compare'),
    growthPrivacy: document.getElementById('screen-growth-privacy')
  };

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatTime(sec) {
    const mins = Math.floor((sec || 0) / 60);
    const rem = (sec || 0) % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  }

  // ============================================================================
  // ĐIỀU HƯỚNG MÀN HÌNH & 5 PHÂN HỆ TAB
  // ============================================================================
  function showScreen(screenKey) {
    Object.values(screens).forEach((el) => el && el.classList.remove('active'));
    if (screens[screenKey]) {
      screens[screenKey].classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setActiveWorkspaceTab(tabKey) {
    state.activeTab = tabKey;
    document.querySelectorAll('#workspace-tabs .ws-tab').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });

    if (tabKey === 'assessment') {
      showScreen('welcome');
    } else if (tabKey === 'self-report') {
      showScreen('result');
      if (!state.currentSubmission) {
        loadLatestSubmissionForReport();
      }
    } else if (tabKey === 'manuals') {
      showScreen('manuals');
      loadPublishedManualsDirectory();
    } else if (tabKey === 'pair-compare') {
      showScreen('pairCompare');
      initPairComparisonTab();
    } else if (tabKey === 'growth-privacy') {
      showScreen('growthPrivacy');
      populateContentBankPicker();
      loadOwnerPrivateActions();
    }
  }

  // ============================================================================
  // PHÂN HỆ 1: LÀM BÀI ĐÁNH GIÁ (LIKERT 40/48 HOẶC FORCED-CHOICE 24)
  // ============================================================================
  function getActiveQuizItems() {
    if (state.assessmentMode === 'forced24') {
      return forced24;
    }
    return state.adaptiveUnlocked ? [...likert40, ...adaptive8] : likert40;
  }

  function initQuizState(mode) {
    state.assessmentMode = mode || 'likert40';
    state.adaptiveUnlocked = false;
    state.adaptiveReason = '';
    state.currentIndex = 0;

    const allLikert = [...likert40, ...adaptive8];
    state.likertAnswers = allLikert.map((it) => ({
      question_index: it.index,
      item_id: it.id,
      dimension: it.dimension,
      keying: it.keying,
      value: null
    }));

    state.forcedAnswers = forced24.map((q, idx) => ({
      question_index: idx + 1,
      most_choice: null,
      least_choice: null
    }));

    document.getElementById('adaptive-banner')?.classList.add('hidden');
  }

  function startTimer() {
    stopTimer();
    state.elapsedSeconds = 0;
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) timerEl.textContent = '00:00';
    state.timerInterval = setInterval(() => {
      state.elapsedSeconds += 1;
      if (timerEl) timerEl.textContent = formatTime(state.elapsedSeconds);
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function isQuestionAnswered(idx) {
    if (state.assessmentMode === 'forced24') {
      const a = state.forcedAnswers[idx];
      return Boolean(a && a.most_choice && a.least_choice && a.most_choice !== a.least_choice);
    }
    const a = state.likertAnswers[idx];
    return Boolean(a && Number.isInteger(a.value) && a.value >= 1 && a.value <= 5);
  }

  function countCompletedQuestions() {
    const items = getActiveQuizItems();
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      if (isQuestionAnswered(i)) count += 1;
    }
    return count;
  }

  function hideQuizAlert() {
    const box = document.getElementById('quiz-validation-alert');
    if (box) {
      box.classList.add('hidden');
      box.textContent = '';
    }
  }

  function showQuizAlert(msg) {
    const box = document.getElementById('quiz-validation-alert');
    if (box) {
      box.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  function renderNavigatorGrid() {
    const grid = document.getElementById('question-nav-grid');
    if (!grid) return;
    const items = getActiveQuizItems();
    const titleEl = document.getElementById('nav-card-title');
    if (titleEl) {
      titleEl.textContent = `Danh sách ${items.length} câu hỏi`;
    }

    grid.innerHTML = items
      .map((_, idx) => {
        const done = isQuestionAnswered(idx);
        const isCurrent = idx === state.currentIndex;
        const classes = ['q-nav-btn'];
        if (done) classes.push('answered');
        if (isCurrent) classes.push('current');
        return `<button type="button" class="${classes.join(' ')}" data-qindex="${idx}">${idx + 1}</button>`;
      })
      .join('');
  }

  function updateProgressUI() {
    const items = getActiveQuizItems();
    const total = items.length;
    const done = countCompletedQuestions();
    const pct = Math.round((done / total) * 100);

    document.getElementById('quiz-progress-text').textContent = `Đã hoàn thành: ${done} / ${total} câu`;
    document.getElementById('quiz-progress-percent').textContent = `${pct}%`;
    document.getElementById('quiz-progress-fill').style.width = `${pct}%`;

    const modePill = document.getElementById('quiz-mode-pill');
    if (modePill) {
      modePill.textContent =
        state.assessmentMode === 'forced24'
          ? 'Forced-Choice 24 câu'
          : state.adaptiveUnlocked
          ? 'Likert 48 câu (Có Adaptive)'
          : 'Likert 40 câu chuẩn';
    }

    const btnSubmitMain = document.getElementById('btn-submit-quiz');
    const btnNext = document.getElementById('btn-next-question');
    if (done === total) {
      btnSubmitMain?.classList.remove('hidden');
    } else {
      btnSubmitMain?.classList.add('hidden');
    }

    if (state.currentIndex === total - 1) {
      btnNext?.classList.add('hidden');
      btnSubmitMain?.classList.remove('hidden');
    } else {
      btnNext?.classList.remove('hidden');
    }
  }

  function renderCurrentQuestion() {
    const items = getActiveQuizItems();
    const q = items[state.currentIndex];
    if (!q) return;

    const total = items.length;
    document.getElementById('question-number-badge').textContent = `Câu ${state.currentIndex + 1} / ${total}`;

    const statusTag = document.getElementById('question-status-tag');
    const done = isQuestionAnswered(state.currentIndex);
    const forcedHead = document.getElementById('forced-choice-table-head');
    const instructionEl = document.getElementById('question-instruction-text');
    const optionsListEl = document.getElementById('question-options-list');

    if (state.assessmentMode === 'forced24') {
      forcedHead?.classList.remove('hidden');
      document.getElementById('question-context-title').textContent = q.context;
      instructionEl.innerHTML =
        'Hãy chọn <strong>1 đặc điểm Giống bạn nhất (MOST)</strong> và <strong>1 đặc điểm Ít giống bạn nhất (LEAST)</strong> trong 4 mô tả dưới đây:';

      const ans = state.forcedAnswers[state.currentIndex];
      if (done) {
        statusTag.textContent = `✓ Đã chọn (Most: ${ans.most_choice} • Least: ${ans.least_choice})`;
        statusTag.classList.add('done');
      } else {
        statusTag.textContent = 'Chưa chọn đủ Most & Least';
        statusTag.classList.remove('done');
      }

      optionsListEl.innerHTML = q.options
        .map((opt) => {
          const isMost = ans.most_choice === opt.type;
          const isLeast = ans.least_choice === opt.type;
          return `
            <div class="option-row ${isMost ? 'selected-most' : ''} ${isLeast ? 'selected-least' : ''}">
              <div class="option-text">${escapeHtml(opt.text)}</div>
              <div class="choice-actions-pair">
                <div class="choice-cell">
                  <button
                    type="button"
                    class="choice-btn most-btn ${isMost ? 'active' : ''}"
                    data-role="most"
                    data-type="${opt.type}"
                  >
                    <span class="choice-short">${isMost ? '✓' : 'M'}</span>
                    <span class="choice-mobile-label">👍 Giống nhất</span>
                  </button>
                </div>
                <div class="choice-cell">
                  <button
                    type="button"
                    class="choice-btn least-btn ${isLeast ? 'active' : ''}"
                    data-role="least"
                    data-type="${opt.type}"
                  >
                    <span class="choice-short">${isLeast ? '✓' : 'L'}</span>
                    <span class="choice-mobile-label">👎 Ít giống nhất</span>
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    } else {
      // Chế độ Chuẩn Vaga Likert 5 Mức
      forcedHead?.classList.add('hidden');
      const ctxObj = workplaceContexts.find((c) => c.id === q.context);
      const ctxBadge = ctxObj ? `${ctxObj.icon} Ngữ cảnh: ${ctxObj.label}` : 'Ngữ cảnh công việc';
      const adaptiveTag = q.id.startsWith('A-') ? ' • Adaptive phân giải cao' : '';

      document.getElementById('question-context-title').innerHTML = `
        <span class="q-meta-pill">${escapeHtml(q.id)} • ${escapeHtml(ctxBadge)}${escapeHtml(adaptiveTag)}</span>
        <span class="q-main-statement">“${escapeHtml(q.text)}”</span>
      `;
      instructionEl.innerHTML =
        'Chọn mức độ phản ánh sát nhất thói quen hành xử thực tế của bạn tại nơi làm việc (Thang 1 → 5):';

      const ans = state.likertAnswers[state.currentIndex];
      if (done) {
        statusTag.textContent = `✓ Đã chọn mức ${ans.value} / 5`;
        statusTag.classList.add('done');
      } else {
        statusTag.textContent = 'Chưa chọn mức điểm (1–5)';
        statusTag.classList.remove('done');
      }

      const likertLevels = [
        { val: 1, title: '1 – Rất không giống tôi', desc: 'Hiếm khi hoặc hầu như không bao giờ hành xử như vậy' },
        { val: 2, title: '2 – Ít giống tôi', desc: 'Chỉ thỉnh thoảng trong một vài trường hợp bắt buộc' },
        { val: 3, title: '3 – Trung lập / Tùy lúc', desc: 'Phụ thuộc vào từng tình huống cụ thể (Mức cân bằng)' },
        { val: 4, title: '4 – Khá giống tôi', desc: 'Thường xuyên thể hiện xu hướng này trong công việc' },
        { val: 5, title: '5 – Rất giống tôi', desc: 'Phản xạ tự nhiên và đặc trưng rõ nét nhất của tôi' }
      ];

      optionsListEl.innerHTML = `
        <div class="likert-scale-list">
          ${likertLevels
            .map((lv) => {
              const selected = ans && ans.value === lv.val;
              return `
                <button
                  type="button"
                  class="likert-option-btn ${selected ? 'active' : ''}"
                  data-likert-val="${lv.val}"
                >
                  <span class="likert-num-circle">${lv.val}</span>
                  <div class="likert-label-col">
                    <strong>${escapeHtml(lv.title)}</strong>
                    <span>${escapeHtml(lv.desc)}</span>
                  </div>
                  <span class="likert-check">${selected ? '✓ Đã chọn' : 'Chọn'}</span>
                </button>
              `;
            })
            .join('')}
        </div>
      `;
    }

    document.getElementById('btn-prev-question').disabled = state.currentIndex === 0;
    hideQuizAlert();
    renderNavigatorGrid();
    updateProgressUI();
  }

  function checkAndUnlockAdaptiveIfNeeded() {
    if (state.assessmentMode !== 'likert40' || state.adaptiveUnlocked) return false;
    // Kiểm tra xem 40 câu đầu đã trả lời đủ chưa
    const first40Done = state.likertAnswers.slice(0, 40).every((a) => Number.isInteger(a.value) && a.value >= 1 && a.value <= 5);
    if (!first40Done) return false;

    const check = window.DISCEngine.shouldTriggerAdaptive(state.likertAnswers.slice(0, 40));
    if (check.trigger) {
      state.adaptiveUnlocked = true;
      state.adaptiveReason = check.reason;
      const banner = document.getElementById('adaptive-banner');
      const reasonEl = document.getElementById('adaptive-reason-text');
      if (banner && reasonEl) {
        reasonEl.textContent = check.reason;
        banner.classList.remove('hidden');
      }
      return true;
    }
    return false;
  }

  function handleLikertSelect(val) {
    const numVal = Number(val);
    const ans = state.likertAnswers[state.currentIndex];
    if (!ans) return;
    ans.value = numVal;
    hideQuizAlert();

    // Nếu vừa hoàn thành câu 40, kiểm tra xem có kích hoạt 8 câu Adaptive không
    const unlockedNow = checkAndUnlockAdaptiveIfNeeded();
    renderCurrentQuestion();

    const items = getActiveQuizItems();
    const autoNext = document.getElementById('chk-auto-next')?.checked;
    if (unlockedNow && state.currentIndex === 39) {
      setTimeout(() => {
        state.currentIndex = 40;
        renderCurrentQuestion();
      }, 280);
      return;
    }

    if (autoNext && state.currentIndex < items.length - 1) {
      setTimeout(() => {
        state.currentIndex += 1;
        renderCurrentQuestion();
      }, 220);
    }
  }

  function handleForcedChoiceClick(role, type) {
    const currentAns = state.forcedAnswers[state.currentIndex];
    if (!currentAns) return;

    if (role === 'most') {
      if (currentAns.least_choice === type) {
        showQuizAlert('Không thể chọn cùng 1 mô tả cho cả MOST và LEAST. Vui lòng chọn dòng khác.');
        return;
      }
      currentAns.most_choice = type;
    } else if (role === 'least') {
      if (currentAns.most_choice === type) {
        showQuizAlert('Không thể chọn cùng 1 mô tả cho cả MOST và LEAST. Vui lòng chọn dòng khác.');
        return;
      }
      currentAns.least_choice = type;
    }

    hideQuizAlert();
    renderCurrentQuestion();

    const autoNext = document.getElementById('chk-auto-next')?.checked;
    if (autoNext && isQuestionAnswered(state.currentIndex) && state.currentIndex < forced24.length - 1) {
      setTimeout(() => {
        state.currentIndex += 1;
        renderCurrentQuestion();
      }, 240);
    }
  }

  /**
   * Điền nhanh dữ liệu mẫu (Demo Fill) theo đúng kiểu hồ sơ người dùng chọn
   */
  function handleDemoFill() {
    const archetype = document.getElementById('demo-archetype-select')?.value || 'DI';
    const targetMeansMap = {
      D: { D: 4.6, I: 2.8, S: 2.1, C: 2.9 },
      DI: { D: 4.5, I: 4.2, S: 2.2, C: 2.6 },
      I: { D: 2.8, I: 4.6, S: 3.1, C: 2.2 },
      IS: { D: 2.3, I: 4.4, S: 4.1, C: 2.6 },
      S: { D: 2.1, I: 3.0, S: 4.6, C: 3.1 },
      SC: { D: 2.2, I: 2.4, S: 4.4, C: 4.2 },
      C: { D: 2.7, I: 2.1, S: 3.0, C: 4.7 },
      CD: { D: 4.1, I: 2.1, S: 2.5, C: 4.6 },
      BALANCED: { D: 3.5, I: 3.5, S: 3.6, C: 3.5 }
    };
    const targets = targetMeansMap[archetype] || targetMeansMap.DI;

    if (state.assessmentMode === 'forced24') {
      const dom = archetype === 'BALANCED' ? 'D' : archetype[0];
      const sec = archetype.length === 2 ? archetype[1] : 'I';
      const allTypes = ['D', 'I', 'S', 'C'];

      state.forcedAnswers = forced24.map((_, idx) => {
        let mostChoice = dom;
        if (archetype === 'BALANCED') {
          mostChoice = allTypes[idx % 4];
        } else if (idx % 3 === 1) {
          mostChoice = sec;
        } else if (idx % 7 === 0) {
          mostChoice = allTypes[(idx + 2) % 4];
        }
        const leastPool = allTypes.filter((t) => t !== mostChoice && (archetype === 'BALANCED' || t !== dom));
        const leastChoice = leastPool[idx % leastPool.length];
        return {
          question_index: idx + 1,
          most_choice: mostChoice,
          least_choice: leastChoice
        };
      });
      state.currentIndex = forced24.length - 1;
      renderCurrentQuestion();
      return;
    }

    // Chế độ Likert 40/48
    const allItems = [...likert40, ...adaptive8];
    state.likertAnswers = allItems.map((item, idx) => {
      const tMean = targets[item.dimension] || 3.2;
      const jitter = idx % 3 === 0 ? 0.3 : idx % 3 === 1 ? -0.3 : 0;
      const keyedVal = Math.min(5, Math.max(1, Math.round(tMean + jitter)));
      const rawVal = item.keying === 'reverse' ? 6 - keyedVal : keyedVal;
      return {
        question_index: item.index,
        item_id: item.id,
        dimension: item.dimension,
        keying: item.keying,
        value: rawVal
      };
    });

    checkAndUnlockAdaptiveIfNeeded();
    const activeItems = getActiveQuizItems();
    state.currentIndex = activeItems.length - 1;
    renderCurrentQuestion();
  }

  /**
   * Nộp bài khảo sát lên SQLite & Chuyển sang Hồ sơ Cá nhân
   */
  async function handleSubmitQuiz() {
    const items = getActiveQuizItems();
    const firstUnfinished = items.findIndex((_, idx) => !isQuestionAnswered(idx));
    if (firstUnfinished !== -1) {
      state.currentIndex = firstUnfinished;
      renderCurrentQuestion();
      showQuizAlert(`Bạn còn câu số ${firstUnfinished + 1} chưa hoàn thành. Vui lòng trả lời đầy đủ trước khi nộp bài!`);
      return;
    }

    stopTimer();
    const duration = Math.max(state.elapsedSeconds, 95);

    let payload;
    if (state.assessmentMode === 'forced24') {
      const calc = window.DISCEngine.calculateResult(state.forcedAnswers, forced24.length, duration);
      payload = {
        ...state.userInfo,
        ...calc,
        duration_seconds: duration,
        answers: state.forcedAnswers
      };
    } else {
      const activeAnswers = state.likertAnswers.slice(0, items.length).map((a) => ({
        ...a,
        raw_value: a.value,
        keyed_value: a.keying === 'reverse' ? 6 - a.value : a.value,
        most_choice: a.dimension,
        least_choice: a.keying
      }));
      const calc = window.DISCEngine.calculateLikertResult(activeAnswers, duration);
      payload = {
        ...state.userInfo,
        ...calc,
        duration_seconds: duration,
        answers: activeAnswers
      };
    }

    const bannerEl = document.getElementById('save-status-banner');
    const statusTextEl = document.getElementById('save-status-text');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Không thể lưu kết quả');
      }

      const savedRecord = await response.json();
      state.currentSubmission = savedRecord;

      if (statusTextEl) {
        statusTextEl.textContent = `Đã lưu Hồ sơ SQLite #${savedRecord.id} (Lần làm bài #${savedRecord.revision || 1}) và khởi tạo Bản nháp Cẩm nang Cộng tác!`;
      }
      if (bannerEl) bannerEl.style.background = '#ecfdf5';

      // Đồng bộ email sang các tab khác để tiện thao tác ngay
      syncActiveUserEmail(savedRecord.email, savedRecord.full_name);

      await loadSubmissionsSwitcher();
      renderReportScreen(savedRecord);
      setActiveWorkspaceTab('self-report');
    } catch (err) {
      if (statusTextEl) {
        statusTextEl.textContent = `Hiển thị kết quả trực tiếp (Cảnh báo lưu DB: ${err.message})`;
      }
      if (bannerEl) bannerEl.style.background = '#fef3c7';
      renderReportScreen({ id: 'LOCAL', created_at: new Date().toLocaleString('vi-VN'), ...payload });
      setActiveWorkspaceTab('self-report');
    }
  }

  function syncActiveUserEmail(email, fullName) {
    if (!email) return;
    const lookupEl = document.getElementById('editor-lookup-email');
    if (lookupEl) lookupEl.value = email;
    const actEmailEl = document.getElementById('action-owner-email');
    if (actEmailEl) actEmailEl.value = email;
    const actNameEl = document.getElementById('action-owner-name');
    if (actNameEl && fullName) actNameEl.value = fullName;
    const rightsEmailEl = document.getElementById('rights-email-input');
    if (rightsEmailEl) rightsEmailEl.value = email;
  }

  // ============================================================================
  // PHÂN HỆ 2: HIỂN THỊ BÁO CÁO HỒ SƠ CÁ NHÂN (PRIVATE SELF VIEW) & LỊCH SỬ RETEST
  // ============================================================================
  async function loadSubmissionsSwitcher() {
    try {
      const res = await fetch('/api/submissions');
      if (!res.ok) return;
      const data = await res.json();
      state.allSubmissions = data.items || [];

      const selectEl = document.getElementById('profile-switcher-select');
      if (!selectEl) return;
      selectEl.innerHTML = state.allSubmissions
        .map(
          (item) =>
            `<option value="${item.id}">#${item.id} • ${escapeHtml(item.full_name)} (${escapeHtml(item.profile_code)} - Lần #${item.revision || 1})</option>`
        )
        .join('');

      if (state.currentSubmission && state.currentSubmission.id) {
        selectEl.value = String(state.currentSubmission.id);
      }
    } catch (_) {}
  }

  async function loadLatestSubmissionForReport() {
    await loadSubmissionsSwitcher();
    if (state.allSubmissions.length > 0) {
      state.currentSubmission = state.allSubmissions[0];
      renderReportScreen(state.currentSubmission);
    }
  }

  async function renderReportScreen(record) {
    if (!record) return;
    state.currentSubmission = record;

    document.getElementById('report-submission-id').textContent = `#${record.id}`;
    document.getElementById('report-revision-badge').textContent = `Lần làm bài #${record.revision || 1}`;
    document.getElementById('report-user-name').textContent = record.full_name || '---';
    document.getElementById('report-user-email').textContent = record.email || '---';
    document.getElementById('report-user-phone').textContent = record.phone || 'Chưa cung cấp';
    document.getElementById('report-user-dept').textContent = record.department || 'Chưa cung cấp';
    document.getElementById('report-user-pos').textContent = record.position || 'Chưa cung cấp';

    const modeLabel =
      record.assessment_mode === 'likert48_adaptive'
        ? 'Likert 48 câu (Adaptive)'
        : record.assessment_mode === 'likert40'
        ? 'Likert 40 câu chuẩn'
        : 'Forced-Choice 24 câu';
    document.getElementById('report-user-date').textContent = `${record.created_at || 'Vừa xong'} (${formatTime(record.duration_seconds)} • ${modeLabel})`;

    // Banner Chất lượng phản hồi (Response Quality)
    const rq = record.response_quality || {
      quality_score: 95,
      status: 'HIGH_RELIABILITY',
      label: 'Độ nhất quán phản hồi cao',
      notes: ['Các câu trả lời có tính nhất quán tốt.']
    };
    const qBanner = document.getElementById('report-quality-banner');
    const qTitle = document.getElementById('report-quality-title');
    const qNotes = document.getElementById('report-quality-notes');
    const qBand = document.getElementById('report-confidence-band');

    if (qBanner) {
      qBanner.className = `quality-banner ${
        rq.status === 'HIGH_RELIABILITY' ? 'quality-high' : rq.status === 'CAUTION_REVIEW' ? 'quality-caution' : 'quality-low'
      }`;
    }
    if (qTitle) {
      const icon = rq.status === 'HIGH_RELIABILITY' ? '✅' : rq.status === 'CAUTION_REVIEW' ? 'ℹ️' : '⚠️';
      qTitle.textContent = `${icon} ${rq.label || 'Chỉ số chất lượng phản hồi'} (Điểm tin cậy: ${rq.quality_score ?? 95}/100)`;
    }
    if (qNotes) {
      qNotes.textContent = (rq.notes || []).join(' ');
    }
    if (qBand) {
      qBand.textContent = record.profile_code === 'BALANCED' ? 'BALANCED_PROFILE' : (record.confidence_band || modeLabel);
    }

    const { profile, primaryDimension } = window.DISCEngine.getProfileDetails(
      record.profile_code,
      record.primary_type
    );

    const badgeEl = document.getElementById('report-profile-code');
    badgeEl.textContent = record.profile_code;
    badgeEl.style.background = primaryDimension.color;

    const dimPill = document.getElementById('report-primary-dim-name');
    dimPill.textContent = `Nhóm định hướng: ${primaryDimension.name}`;
    dimPill.style.background = primaryDimension.lightBg;
    dimPill.style.color = primaryDimension.color;

    document.getElementById('report-profile-title').textContent = profile.title;
    document.getElementById('report-profile-subtitle').textContent = profile.subtitle;
    document.getElementById('report-profile-motto').textContent = profile.motto;

    document.getElementById('report-keywords-list').innerHTML = (profile.keywords || [])
      .map((kw) => `<span class="kw-chip">${escapeHtml(kw)}</span>`)
      .join('');

    // Điểm 4 miền D-I-S-C
    const linear = record.linear_scores || { D: 50, I: 50, S: 50, C: 50 };
    const rawMean = record.raw_mean_scores || { D: 3.0, I: 3.0, S: 3.0, C: 3.0 };
    ['D', 'I', 'S', 'C'].forEach((type) => {
      const pct = record.percentage_scores?.[type] ?? 25;
      const m = record.most_scores?.[type] ?? 0;
      const l = record.least_scores?.[type] ?? 0;
      const d = record.diff_scores?.[type] ?? 0;
      const linVal = linear[type] ?? 50;
      const meanVal = rawMean[type] ?? 3.0;

      document.getElementById(`score-pct-${type}`).textContent = `${pct}%`;
      document.getElementById(`score-linear-${type}`).textContent = `${linVal}/100`;
      document.getElementById(`score-mean-${type}`).textContent = `${meanVal}/5`;
      document.getElementById(`score-most-${type}`).textContent = m;
      document.getElementById(`score-least-${type}`).textContent = l;
      document.getElementById(`score-diff-${type}`).textContent = d >= 0 ? `+${d}` : `${d}`;

      const barEl = document.getElementById(`linear-bar-${type}`);
      if (barEl) barEl.style.width = `${Math.min(100, Math.max(4, Number(linVal)))}%`;
    });

    // Vẽ 2 biểu đồ Canvas
    window.DISCChartRenderer.renderRadarChart(
      document.getElementById('result-radar-canvas'),
      record
    );
    window.DISCChartRenderer.renderBarChart(
      document.getElementById('result-bar-canvas'),
      record
    );

    // Nội dung phân tích chuyên sâu
    document.getElementById('report-overview-text').textContent = profile.overview;

    document.getElementById('report-strengths-list').innerHTML = (profile.strengths || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    document.getElementById('report-overuse-list').innerHTML = (profile.overused_strengths || [
      'Khi sử dụng điểm mạnh ở cường độ quá cao trong lúc áp lực, có thể gây cảm giác cứng nhắc cho đồng nghiệp khác nhóm.'
    ])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    document.getElementById('report-blindspots-list').innerHTML = (profile.blindspots || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');

    // Bản đồ phản ứng dưới áp lực (Stress Pattern)
    const sp = profile.stress_pattern || {
      trigger: 'Áp lực tiến độ hoặc quy trình thiếu rõ ràng.',
      reaction: 'Tăng cường phản xạ tự nhiên ở mức cực đoan.',
      impact: 'Dễ gây lệch nhịp giao tiếp với các thành viên khác phong cách.',
      recovery: 'Tạm dừng ngắn để làm rõ ưu tiên và lắng nghe góc nhìn bổ trợ.'
    };
    const stressBox = document.getElementById('report-stress-box');
    if (stressBox) {
      stressBox.innerHTML = `
        <div class="stress-step"><strong>1. Tác nhân kích hoạt (Trigger):</strong> <span>${escapeHtml(sp.trigger)}</span></div>
        <div class="stress-step"><strong>2. Phản ứng thường gặp:</strong> <span>${escapeHtml(sp.reaction)}</span></div>
        <div class="stress-step"><strong>3. Tác động lên đội nhóm:</strong> <span>${escapeHtml(sp.impact)}</span></div>
        <div class="stress-step recovery-step"><strong>4. Bước phục hồi khuyến nghị (Recovery Move):</strong> <span>${escapeHtml(sp.recovery)}</span></div>
      `;
    }

    // Quick Wins 7 ngày & Thói quen 30 ngày + Nút lưu nhanh vào Kế hoạch riêng tư
    const qwBox = document.getElementById('report-quickwins-box');
    if (qwBox) {
      const qws = profile.quick_wins || profile.communication_tips || [];
      const habits = profile.habits_30d || [];
      qwBox.innerHTML = `
        <div class="qw-group">
          <h4>⚡ Hành động thử nghiệm ngay trong 7 ngày tới (Quick Wins):</h4>
          <ul class="qw-list">
            ${qws
              .map(
                (qText) => `
              <li>
                <span>${escapeHtml(qText)}</span>
                <button type="button" class="btn-Adopt-action no-print" data-adopt-text="${escapeHtml(qText)}">+ Lưu vào Kế hoạch của tôi</button>
              </li>`
              )
              .join('')}
          </ul>
        </div>
        <div class="qw-group" style="margin-top:12px;">
          <h4>🌱 Thói quen rèn luyện 30 ngày:</h4>
          <ul class="qw-list">
            ${habits.map((hText) => `<li><span>${escapeHtml(hText)}</span></li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Ma trận thích ứng với D / I / S / C
    const adaptBox = document.getElementById('report-adaptation-box');
    if (adaptBox && profile.adaptation_with) {
      adaptBox.innerHTML = ['D', 'I', 'S', 'C']
        .map(
          (k) => `
          <div class="adapt-mini-item adapt-${k.toLowerCase()}">
            <strong>Khi phối hợp với nhóm ${k}:</strong>
            <span>${escapeHtml(profile.adaptation_with[k] || '')}</span>
          </div>
        `
        )
        .join('');
    }

    document.getElementById('report-env-text').textContent = profile.ideal_environment;
    document.getElementById('report-careers-tags').innerHTML = (profile.suggested_careers || [])
      .map((job) => `<span class="career-tag">${escapeHtml(job)}</span>`)
      .join('');

    // Tải lịch sử các lần làm bài (Retest History) của cùng email
    if (record.email) {
      loadRetestHistoryUI(record.email, record.id);
    }
  }

  async function loadRetestHistoryUI(email, activeId) {
    const listEl = document.getElementById('report-history-list');
    if (!listEl) return;
    try {
      const res = await fetch(`/api/history?email=${encodeURIComponent(email)}`);
      if (!res.ok) return;
      const data = await res.json();
      const items = data.items || [];
      if (items.length === 0) {
        listEl.innerHTML = '<p style="color:#64748b">Chưa có lịch sử làm bài.</p>';
        return;
      }
      listEl.innerHTML = items
        .map((it) => {
          const isCurrent = Number(it.id) === Number(activeId);
          const lin = it.linear_scores || { D: 50, I: 50, S: 50, C: 50 };
          return `
            <div class="history-snap-card ${isCurrent ? 'active' : ''}" data-history-id="${it.id}">
              <div class="hsc-top">
                <strong>Lần #${it.revision || 1} (Mã #${it.id})</strong>
                <span class="type-pill type-${escapeHtml(it.primary_type)}">${escapeHtml(it.profile_code)}</span>
              </div>
              <div class="hsc-scores">
                D: ${lin.D} • I: ${lin.I} • S: ${lin.S} • C: ${lin.C}
              </div>
              <small>${escapeHtml(it.created_at)} • ${escapeHtml(it.assessment_mode || 'forced24')}</small>
            </div>
          `;
        })
        .join('');
    } catch (_) {}
  }

  // ============================================================================
  // PHÂN HỆ 3: CẨM NANG CỘNG TÁC ("HOW TO WORK WITH ME" DIRECTORY & EDITOR)
  // ============================================================================
  async function loadPublishedManualsDirectory() {
    const search = document.getElementById('manual-search-input')?.value.trim() || '';
    const type = document.getElementById('manual-type-filter')?.value || '';
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);

    const gridEl = document.getElementById('published-manuals-grid');
    if (!gridEl) return;

    try {
      const res = await fetch(`/api/manuals?${params.toString()}`);
      const data = await res.json();
      state.publishedManuals = data.items || [];

      if (state.publishedManuals.length === 0) {
        gridEl.innerHTML = `
          <div class="empty-state-box">
            Không tìm thấy Cẩm nang cộng tác nào đã xuất bản khớp bộ lọc.
          </div>
        `;
        return;
      }

      if (!state.selectedManualId || !state.publishedManuals.some((m) => m.id === state.selectedManualId)) {
        state.selectedManualId = state.publishedManuals[0].id;
      }

      renderColleagueCardsList();
      const activeManual = state.publishedManuals.find((m) => m.id === state.selectedManualId);
      if (activeManual) {
        renderManualCheatSheetPane(activeManual);
      }
    } catch (err) {
      gridEl.innerHTML = `<div class="empty-state-box">Lỗi tải danh bạ: ${escapeHtml(err.message)}</div>`;
    }
  }

  function renderColleagueCardsList() {
    const gridEl = document.getElementById('published-manuals-grid');
    if (!gridEl) return;

    gridEl.innerHTML = state.publishedManuals
      .map((m) => {
        const isSelected = m.id === state.selectedManualId;
        const { primaryDimension } = window.DISCEngine.getProfileDetails(m.profile_code, m.primary_type);
        return `
          <div class="colleague-item-card ${isSelected ? 'active' : ''}" data-manual-id="${m.id}">
            <div class="colleague-avatar" style="background:${primaryDimension.color}">
              ${escapeHtml(m.profile_code)}
            </div>
            <div class="colleague-meta">
              <strong>${escapeHtml(m.full_name)}</strong>
              <span>${escapeHtml(m.position || 'Thành viên')} • ${escapeHtml(m.department || 'Vaga')}</span>
              <small>Phiên bản v${m.revision || 1} • Đã xác nhận xuất bản</small>
            </div>
          </div>
        `;
      })
      .join('');
  }

  function renderManualCheatSheetPane(manual) {
    const pane = document.getElementById('manual-detail-pane');
    if (!pane || !manual) return;

    const { profile, primaryDimension } = window.DISCEngine.getProfileDetails(
      manual.profile_code,
      manual.primary_type
    );
    const sliders = manual.workstyle_sliders || { pace: 3, decision_mode: 3, communication_channel: 3, detail_need: 3, change_attitude: 3 };
    const contexts = manual.context_cards || {};
    const lin = manual.linear_scores || { D: 50, I: 50, S: 50, C: 50 };

    pane.innerHTML = `
      <div class="cs-header">
        <div class="cs-title-group">
          <div class="cs-badge" style="background:${primaryDimension.color}">${escapeHtml(manual.profile_code)}</div>
          <div>
            <h3>${escapeHtml(manual.full_name)}</h3>
            <p>${escapeHtml(manual.position || '---')} • ${escapeHtml(manual.department || '---')} (${escapeHtml(manual.owner_email)})</p>
            <span class="cs-style-tag" style="background:${primaryDimension.lightBg}; color:${primaryDimension.color}">
              ${escapeHtml(profile.title)} • Phiên bản Cẩm nang v${manual.revision || 1}
            </span>
          </div>
        </div>
        <div class="cs-header-actions">
          <button type="button" class="btn btn-primary btn-sm" data-compare-target="${manual.id}">
            ⚡ So sánh Cặp 1-1 với ${escapeHtml(manual.full_name.split(' ').pop())}
          </button>
          <button type="button" class="btn btn-outline btn-sm" data-edit-owner="${escapeHtml(manual.owner_email)}">
            ✏️ Sửa (Chủ hồ sơ)
          </button>
        </div>
      </div>

      <!-- Read Me in 60s -->
      <div class="cs-60s-box">
        <strong>⏱️ Cẩm nang Đọc Nhanh 60 Giây ("How to Work With Me"):</strong>
        <p>${escapeHtml(manual.best_read_in_60s || profile.manual_defaults?.best_read_in_60s || '')}</p>
        <div class="cs-mini-scores">
          <span>Điểm chuẩn xu hướng (0–100):</span>
          <b style="color:#e11d48">D: ${lin.D}</b> •
          <b style="color:#d97706">I: ${lin.I}</b> •
          <b style="color:#059669">S: ${lin.S}</b> •
          <b style="color:#2563eb">C: ${lin.C}</b>
        </div>
      </div>

      <!-- 5 Workstyle Sliders -->
      <div class="cs-sliders-section">
        <h4>🎚️ 5 Thước Đo Nhịp Làm Việc & Giao Tiếp</h4>
        <div class="cs-sliders-grid">
          ${workstyleSliders
            .map((s) => {
              const val = Number(sliders[s.id] ?? 3);
              const pct = ((val - 1) / 4) * 100;
              return `
                <div class="cs-slider-row">
                  <div class="cs-slider-top">
                    <strong>${escapeHtml(s.label)}</strong>
                    <span class="cs-slider-val">Mức ${val}/5</span>
                  </div>
                  <div class="cs-slider-track">
                    <div class="cs-slider-dot" style="left:${pct}%"></div>
                  </div>
                  <div class="cs-slider-poles">
                    <span>${escapeHtml(s.leftLabel)}</span>
                    <span>${escapeHtml(s.rightLabel)}</span>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Do's & Don'ts -->
      <div class="cs-dos-donts-grid">
        <div class="cs-do-box">
          <h4>✅ Điều NÊN LÀM khi phối hợp</h4>
          <ul>
            ${(manual.dos_list || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
          </ul>
        </div>
        <div class="cs-dont-box">
          <h4>🚫 Điều NÊN TRÁNH khi phối hợp</h4>
          <ul>
            ${(manual.donts_list || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- 7 Workplace Contexts -->
      <div class="cs-contexts-section">
        <h4>🗂️ Hướng Dẫn Chi Tiết Theo 7 Ngữ Cảnh Công Việc</h4>
        <div class="cs-contexts-grid">
          ${workplaceContexts
            .map(
              (ctx) => `
              <div class="cs-ctx-card">
                <strong>${ctx.icon} ${escapeHtml(ctx.label)}</strong>
                <p>${escapeHtml(contexts[ctx.id] || profile.manual_defaults?.contexts?.[ctx.id] || 'Trao đổi rõ ràng, tôn trọng mục tiêu chung.')}</p>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  /**
   * Khởi tạo các ô nhập trong Trình biên tập Cẩm nang của Tôi (My Manual Editor)
   */
  function initManualEditorFields() {
    const slidersContainer = document.getElementById('man-sliders-container');
    if (slidersContainer) {
      slidersContainer.innerHTML = workstyleSliders
        .map(
          (s) => `
          <div class="editor-slider-item">
            <div class="esi-head">
              <strong>${escapeHtml(s.label)}</strong>
              <span id="man-slider-val-${s.id}" class="esi-badge">3 / 5</span>
            </div>
            <input type="range" min="1" max="5" step="1" value="3" id="man-slider-${s.id}" data-slider-id="${s.id}" class="range-input" />
            <div class="esi-poles">
              <small>1: ${escapeHtml(s.leftLabel)}</small>
              <small>5: ${escapeHtml(s.rightLabel)}</small>
            </div>
          </div>
        `
        )
        .join('');

      slidersContainer.addEventListener('input', (e) => {
        const input = e.target.closest('input[data-slider-id]');
        if (!input) return;
        const sId = input.getAttribute('data-slider-id');
        const badge = document.getElementById(`man-slider-val-${sId}`);
        if (badge) badge.textContent = `${input.value} / 5`;
      });
    }

    const ctxContainer = document.getElementById('man-contexts-container');
    if (ctxContainer) {
      ctxContainer.innerHTML = workplaceContexts
        .map(
          (c) => `
          <div class="form-group">
            <label>${c.icon} ${escapeHtml(c.label)}</label>
            <textarea id="man-ctx-${c.id}" rows="2" class="form-textarea" placeholder="${escapeHtml(c.shortDesc)}"></textarea>
          </div>
        `
        )
        .join('');
    }
  }

  function applyProfileDefaultsToManualEditor(profileCode) {
    const profiles = window.DISC_PROFILES || {};
    const p = profiles[profileCode] || profiles.D;
    const def = p.manual_defaults || profiles.D.manual_defaults;

    document.getElementById('man-best-read').value = def.best_read_in_60s || '';
    document.getElementById('man-dos-text').value = (p.communication_dos || []).join('\n');
    document.getElementById('man-donts-text').value = (p.communication_donts || []).join('\n');

    workstyleSliders.forEach((s) => {
      const val = def.sliders?.[s.id] ?? 3;
      const el = document.getElementById(`man-slider-${s.id}`);
      const badge = document.getElementById(`man-slider-val-${s.id}`);
      if (el) el.value = val;
      if (badge) badge.textContent = `${val} / 5`;
    });

    workplaceContexts.forEach((c) => {
      const el = document.getElementById(`man-ctx-${c.id}`);
      if (el) el.value = def.contexts?.[c.id] || '';
    });
  }

  async function loadOwnerManualIntoEditor(email) {
    const emailNorm = (email || '').trim();
    if (!emailNorm) return;

    try {
      const res = await fetch(`/api/manuals/by-owner?email=${encodeURIComponent(emailNorm)}`);
      const data = await res.json();
      const item = data.item;

      if (!item) {
        document.getElementById('man-owner-email').value = emailNorm;
        applyProfileDefaultsToManualEditor(document.getElementById('man-profile-code').value || 'DI');
        updateEditorStatusBanner('DRAFT', 1);
        showManualEditorAlert('Chưa có Cẩm nang cho email này. Hệ thống đã nạp sẵn khung gợi ý để bạn chỉnh sửa và Xuất bản!', false);
        return;
      }

      document.getElementById('man-full-name').value = item.full_name || '';
      document.getElementById('man-owner-email').value = item.owner_email || '';
      document.getElementById('man-department').value = item.department || '';
      document.getElementById('man-position').value = item.position || '';
      document.getElementById('man-profile-code').value = item.profile_code || 'D';
      document.getElementById('man-best-read').value = item.best_read_in_60s || '';
      document.getElementById('man-dos-text').value = (item.dos_list || []).join('\n');
      document.getElementById('man-donts-text').value = (item.donts_list || []).join('\n');

      workstyleSliders.forEach((s) => {
        const val = item.workstyle_sliders?.[s.id] ?? 3;
        const el = document.getElementById(`man-slider-${s.id}`);
        const badge = document.getElementById(`man-slider-val-${s.id}`);
        if (el) el.value = val;
        if (badge) badge.textContent = `${val} / 5`;
      });

      workplaceContexts.forEach((c) => {
        const el = document.getElementById(`man-ctx-${c.id}`);
        if (el) el.value = item.context_cards?.[c.id] || '';
      });

      updateEditorStatusBanner(item.status, item.revision);
      showManualEditorAlert(`Đã tải Cẩm nang của ${item.full_name} (Trạng thái: ${item.status} • Phiên bản v${item.revision || 1}).`, false);
    } catch (err) {
      showManualEditorAlert('Lỗi khi tải Cẩm nang: ' + err.message, true);
    }
  }

  function updateEditorStatusBanner(status, revision) {
    const badge = document.getElementById('editor-status-badge');
    const desc = document.getElementById('editor-status-desc');
    if (!badge || !desc) return;

    if (status === 'PUBLISHED') {
      badge.className = 'status-pill status-published';
      badge.textContent = `PUBLISHED (Đang công bố • v${revision || 1})`;
      desc.textContent = 'Cẩm nang này đang hiển thị trong Danh bạ Đồng nghiệp và sẵn sàng cho So sánh cặp 1-1.';
    } else if (status === 'REVOKED') {
      badge.className = 'status-pill status-revoked';
      badge.textContent = `REVOKED (Đã thu hồi chia sẻ • v${revision || 1})`;
      desc.textContent = 'Bạn đã thu hồi quyền chia sẻ. Đồng nghiệp không thể xem hoặc so sánh cặp cho tới khi bạn Xuất bản lại.';
    } else {
      badge.className = 'status-pill status-draft';
      badge.textContent = `DRAFT (Bản nháp riêng tư • v${revision || 1})`;
      desc.textContent = 'Bản nháp này chỉ mình bạn nhìn thấy cho tới khi bạn nhấn Xuất bản.';
    }
  }

  function collectManualEditorPayload() {
    const profileCode = document.getElementById('man-profile-code').value || 'D';
    const primaryType = profileCode === 'BALANCED' ? 'D' : profileCode[0];
    const sliders = {};
    workstyleSliders.forEach((s) => {
      sliders[s.id] = Number(document.getElementById(`man-slider-${s.id}`)?.value || 3);
    });
    const contexts = {};
    workplaceContexts.forEach((c) => {
      contexts[c.id] = (document.getElementById(`man-ctx-${c.id}`)?.value || '').trim();
    });

    const dos = (document.getElementById('man-dos-text').value || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const donts = (document.getElementById('man-donts-text').value || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      full_name: document.getElementById('man-full-name').value.trim(),
      owner_email: document.getElementById('man-owner-email').value.trim(),
      department: document.getElementById('man-department').value.trim(),
      position: document.getElementById('man-position').value.trim(),
      profile_code: profileCode,
      primary_type: primaryType,
      best_read_in_60s: document.getElementById('man-best-read').value.trim(),
      workstyle_sliders: sliders,
      dos_list: dos,
      donts_list: donts,
      context_cards: contexts
    };
  }

  function showManualEditorAlert(msg, isError = false) {
    const box = document.getElementById('man-feedback-alert');
    if (!box) return;
    box.textContent = msg;
    box.style.background = isError ? '#fef2f2' : '#ecfdf5';
    box.style.borderColor = isError ? '#fecaca' : '#a7f3d0';
    box.style.color = isError ? '#b91c1c' : '#065f46';
    box.classList.remove('hidden');
  }

  // ============================================================================
  // PHÂN HỆ 4: SO SÁNH CẶP 1-1 CÓ HƯỚNG (A -> B PAIR COMPARISON)
  // ============================================================================
  async function initPairComparisonTab(preferredTargetId = null) {
    try {
      const res = await fetch('/api/manuals');
      const data = await res.json();
      state.publishedManuals = data.items || [];

      const viewerSelect = document.getElementById('pair-viewer-select');
      const targetSelect = document.getElementById('pair-target-select');
      if (!viewerSelect || !targetSelect) return;

      const optionsHtml = state.publishedManuals
        .map(
          (m) =>
            `<option value="${m.id}">${escapeHtml(m.full_name)} (${escapeHtml(m.profile_code)} • ${escapeHtml(m.department || 'Vaga')})</option>`
        )
        .join('');

      viewerSelect.innerHTML = optionsHtml;
      targetSelect.innerHTML = optionsHtml;

      if (state.publishedManuals.length >= 2) {
        viewerSelect.value = String(state.publishedManuals[0].id);
        if (preferredTargetId && state.publishedManuals.some((m) => m.id === Number(preferredTargetId))) {
          targetSelect.value = String(preferredTargetId);
          if (viewerSelect.value === targetSelect.value) {
            const alt = state.publishedManuals.find((m) => m.id !== Number(preferredTargetId));
            if (alt) viewerSelect.value = String(alt.id);
          }
        } else {
          targetSelect.value = String(state.publishedManuals[1].id);
        }
        await runPairComparison();
      }
    } catch (_) {}
  }

  async function runPairComparison() {
    const viewerId = document.getElementById('pair-viewer-select')?.value;
    const targetId = document.getElementById('pair-target-select')?.value;
    const context = document.getElementById('pair-context-select')?.value || 'all';
    const outEl = document.getElementById('pair-comparison-output');
    if (!outEl) return;

    try {
      const res = await fetch(
        `/api/pair-compare?viewerId=${encodeURIComponent(viewerId)}&targetId=${encodeURIComponent(targetId)}&context=${encodeURIComponent(context)}`
      );
      const data = await res.json();
      if (!res.ok || !data.valid) {
        outEl.innerHTML = `
          <div class="alert-box">
            ⚠️ <strong>Không thể so sánh cặp (${escapeHtml(data.error_code || 'ERROR')}):</strong> ${escapeHtml(data.message || data.error)}
          </div>
        `;
        return;
      }

      renderPairComparisonResult(data);
    } catch (err) {
      outEl.innerHTML = `<div class="alert-box">Lỗi kết nối: ${escapeHtml(err.message)}</div>`;
    }
  }

  function renderPairComparisonResult(data) {
    const outEl = document.getElementById('pair-comparison-output');
    if (!outEl) return;

    const deltas = data.dimension_deltas || { D: 0, I: 0, S: 0, C: 0 };

    outEl.innerHTML = `
      <div class="pair-banner">
        <div>
          <span class="pair-code-pill">${escapeHtml(data.pair_code)}</span>
          <strong>Hướng phân tích: ${escapeHtml(data.direction)}</strong>
        </div>
        <small>💡 Mẹo: Bấm "⇄ Đảo chiều (A ↔ B)" ở trên để xem lời khuyên chiều ngược lại dành cho đối phương.</small>
      </div>

      <div class="pair-top-grid">
        <!-- Biểu đồ Radar Chồng lớp A & B -->
        <div class="chart-box">
          <h3>Biểu Đồ Đối Chiếu Xu Hướng Hành Vi (A vs B)</h3>
          <p class="chart-sub">So sánh trực quan trên thang chuẩn 0–100 giữa hai hồ sơ</p>
          <div class="canvas-holder">
            <canvas id="pair-radar-canvas"></canvas>
          </div>
          <div class="delta-chips-row">
            ${['D', 'I', 'S', 'C']
              .map((k) => {
                const v = deltas[k];
                const sign = v > 0 ? `+${v}` : `${v}`;
                return `<span class="delta-chip">Δ${k} (A - B): <strong>${sign}</strong></span>`;
              })
              .join('')}
          </div>
        </div>

        <!-- Đối chiếu 5 Thanh trượt phong cách làm việc -->
        <div class="chart-box">
          <h3>Đối Chiếu 5 Thước Đo Nhịp Làm Việc (1–5)</h3>
          <p class="chart-sub">Khoảng cách giữa sở thích làm việc của (A) ${escapeHtml(data.viewer.full_name)} và (B) ${escapeHtml(data.target.full_name)}</p>
          <div class="pair-sliders-list">
            ${(data.slider_comparisons || [])
              .map(
                (sc) => `
                <div class="pair-slider-item">
                  <div class="psi-head">
                    <strong>${escapeHtml(sc.label)}</strong>
                    <span class="psi-badge ${sc.diff >= 2 ? 'diff-high' : 'diff-low'}">
                      A: ${sc.viewer_val}/5 • B: ${sc.target_val}/5 (${escapeHtml(sc.alignment)})
                    </span>
                  </div>
                  <div class="psi-poles">
                    <small>${escapeHtml(sc.leftLabel)}</small>
                    <small>${escapeHtml(sc.rightLabel)}</small>
                  </div>
                </div>
              `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- Điểm tương đồng & Điểm dễ lệch nhịp -->
      <div class="analysis-details-grid" style="margin-top:20px;">
        <div class="analysis-card strength-card">
          <h3>🤝 Điểm Đồng Điệu & Bổ Trợ Tự Nhiên</h3>
          <ul>
            ${(data.similarities || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>

        <div class="analysis-card blindspot-card">
          <h3>⚡ Điểm Dễ Lệch Nhịp Cần Lưu Ý (Potential Friction)</h3>
          <ul>
            ${(data.potential_frictions || []).map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Tối đa 3 Gợi ý hành động có hướng từ A -> B (Chuẩn DOC-11) -->
      <div class="pair-actions-section">
        <h3>🎯 3 Gợi Ý Hành Động Thực Chiến Dành Cho ${escapeHtml(data.viewer.full_name)} (A) Khi Làm Việc Với ${escapeHtml(data.target.full_name)} (B)</h3>
        <div class="pair-tips-grid">
          ${(data.action_tips_a_to_b || [])
            .map(
              (tip, idx) => `
              <div class="pair-tip-card">
                <div class="ptc-top">
                  <span class="ptc-num">Hành động #${idx + 1}</span>
                  <span class="ptc-source">${escapeHtml(tip.card_id)}</span>
                </div>
                <h4>${escapeHtml(tip.title)}</h4>
                <p>${escapeHtml(tip.action)}</p>
                ${tip.watchout ? `<small class="ptc-watchout">⚠️ Lưu ý: ${escapeHtml(tip.watchout)}</small>` : ''}
              </div>
            `
            )
            .join('')}
        </div>
      </div>

      <!-- Bảng đối chiếu 7 Ngữ cảnh công việc giữa A và B -->
      <div class="pair-context-table-wrap">
        <h3>🗂️ Bảng Đối Chiếu Cẩm Nang 7 Ngữ Cảnh Giữa Hai Bên</h3>
        <div class="table-responsive">
          <table class="pair-ctx-table">
            <thead>
              <tr>
                <th style="width:20%">Ngữ cảnh</th>
                <th style="width:40%">👤 Phong cách của (A) ${escapeHtml(data.viewer.full_name)}</th>
                <th style="width:40%">🤝 Phong cách của (B) ${escapeHtml(data.target.full_name)}</th>
              </tr>
            </thead>
            <tbody>
              ${(data.context_cheatsheet || [])
                .map(
                  (row) => `
                  <tr>
                    <td><strong>${row.icon} ${escapeHtml(row.label)}</strong></td>
                    <td>${escapeHtml(row.viewer_preference)}</td>
                    <td>${escapeHtml(row.target_preference)}</td>
                  </tr>
                `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <p class="pair-disclaimer">${escapeHtml(data.disclaimer)}</p>
    `;

    window.DISCChartRenderer.renderPairComparisonChart(
      document.getElementById('pair-radar-canvas'),
      data.viewer.linear_scores,
      data.target.linear_scores,
      data.viewer.full_name,
      data.target.full_name
    );
  }

  // ============================================================================
  // PHÂN HỆ 5: KẾ HOẠCH HÀNH ĐỘNG RIÊNG TƯ & TRUNG TÂM QUYỀN DỮ LIỆU
  // ============================================================================
  function populateContentBankPicker() {
    const filterCtx = document.getElementById('bank-context-filter')?.value || '';
    const selectEl = document.getElementById('bank-card-select');
    if (!selectEl) return;

    const filtered = contentBank72.filter((card) => {
      if (!filterCtx) return true;
      const allowed = [card.primary_context, ...(card.secondary_contexts || [])];
      return allowed.includes(filterCtx) && !(card.excluded_contexts || []).includes(filterCtx);
    });

    selectEl.innerHTML = filtered
      .map(
        (c) =>
          `<option value="${c.card_id}">[${c.card_id}] (${c.primary_context}) ${escapeHtml(c.title)}</option>`
      )
      .join('');
  }

  function applySelectedBankCardToForm() {
    const cardId = document.getElementById('bank-card-select')?.value;
    const card = contentBank72.find((c) => c.card_id === cardId);
    if (!card) return;

    document.getElementById('act-card-id').value = card.card_id;
    document.getElementById('act-title').value = `${card.title} (${card.card_id})`;
    document.getElementById('act-context').value = card.primary_context;
    document.getElementById('act-trigger').value = card.trigger_situation || '';
    document.getElementById('act-behavior').value = card.action_behavior || '';
    document.getElementById('act-signal').value = card.success_signal || '';
  }

  async function loadOwnerPrivateActions() {
    const email = document.getElementById('action-owner-email')?.value.trim() || '';
    const listEl = document.getElementById('private-actions-list');
    const badgeEl = document.getElementById('actions-count-badge');
    if (!email || !listEl) return;

    try {
      const res = await fetch(`/api/actions?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      const items = data.items || [];
      if (badgeEl) badgeEl.textContent = items.length;

      if (items.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state-box">
            Chưa có cam kết hành động riêng tư nào cho <strong>${escapeHtml(email)}</strong>. Bạn có thể chọn từ Ngân hàng 72 thẻ ở trên hoặc tự tạo mới ngay cả khi chưa làm bài test DISC!
          </div>
        `;
        return;
      }

      listEl.innerHTML = items
        .map((act) => {
          const ctxObj = workplaceContexts.find((c) => c.id === act.context);
          const isDone = act.status === 'COMPLETED';
          return `
            <div class="private-action-card ${isDone ? 'completed' : ''}">
              <div class="pac-head">
                <div>
                  <span class="pac-ctx-tag">${ctxObj ? `${ctxObj.icon} ${escapeHtml(ctxObj.label)}` : escapeHtml(act.context)}</span>
                  ${act.card_id ? `<span class="pac-card-id">${escapeHtml(act.card_id)}</span>` : ''}
                </div>
                <span class="pac-status ${isDone ? 'done' : 'active'}">${isDone ? '✓ Đã hoàn thành' : '⏳ Đang thực hiện'}</span>
              </div>
              <h4>${escapeHtml(act.title)}</h4>
              <div class="pac-body">
                <div><strong>⚡ Tình huống kích hoạt:</strong> ${escapeHtml(act.trigger_situation)}</div>
                <div><strong>🎯 Hành vi thực hiện:</strong> ${escapeHtml(act.action_behavior)}</div>
                ${act.success_signal ? `<div><strong>🌟 Dấu hiệu thành công:</strong> ${escapeHtml(act.success_signal)}</div>` : ''}
                ${act.private_notes ? `<div class="pac-private-note"><strong>🔒 Ghi chú riêng tư:</strong> ${escapeHtml(act.private_notes)}</div>` : ''}
              </div>
              <div class="pac-foot">
                <small>📅 Ngày tự rà soát: ${escapeHtml(act.review_date || 'Chưa đặt')} • Cập nhật: ${escapeHtml(act.updated_at)}</small>
                <div class="pac-btns">
                  <button type="button" class="btn btn-outline btn-sm" data-act-toggle="${act.id}" data-act-status="${isDone ? 'ACTIVE' : 'COMPLETED'}">
                    ${isDone ? '↩ Mở lại' : '✓ Đánh dấu Hoàn thành'}
                  </button>
                  <button type="button" class="btn btn-danger-outline btn-sm" data-act-delete="${act.id}">
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    } catch (err) {
      listEl.innerHTML = `<div class="empty-state-box">Lỗi tải danh sách: ${escapeHtml(err.message)}</div>`;
    }
  }

  function showActionFormAlert(msg, isError = false) {
    const box = document.getElementById('action-form-alert');
    if (!box) return;
    box.textContent = msg;
    box.style.background = isError ? '#fef2f2' : '#ecfdf5';
    box.style.borderColor = isError ? '#fecaca' : '#a7f3d0';
    box.style.color = isError ? '#b91c1c' : '#065f46';
    box.classList.remove('hidden');
  }

  async function executeRightRequest(requestType) {
    const email = document.getElementById('rights-email-input')?.value.trim() || '';
    const reason = document.getElementById('rights-reason-input')?.value.trim() || '';
    const banner = document.getElementById('rights-result-banner');
    if (!email) {
      alert('Vui lòng nhập email của bạn để thực hiện quyền dữ liệu.');
      return;
    }

    if (requestType === 'EXPORT_DATA') {
      await fetch('/api/data-rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requester_email: email, request_type: 'EXPORT_DATA', reason })
      });
      window.location.href = `/api/export/json?email=${encodeURIComponent(email)}`;
      if (banner) {
        banner.textContent = `✅ Đã trích xuất và tải xuống gói dữ liệu cá nhân JSON cho ${email}.`;
        banner.classList.remove('hidden');
      }
      return;
    }

    if (
      (requestType === 'DELETE_ASSESSMENTS' || requestType === 'FULL_ERASURE') &&
      !confirm(`Bạn có chắc chắn muốn thực hiện lệnh "${requestType}" cho email ${email} không?`)
    ) {
      return;
    }

    const res = await fetch('/api/data-rights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requester_email: email,
        request_type: requestType,
        reason
      })
    });
    const data = await res.json();
    if (banner) {
      banner.textContent = `✅ ${data.resolution_note || 'Đã thực thi yêu cầu quyền dữ liệu thành công.'}`;
      banner.style.background = '#ecfdf5';
      banner.style.color = '#065f46';
      banner.classList.remove('hidden');
    }

    loadOwnerPrivateActions();
    loadPublishedManualsDirectory();
  }

  // ============================================================================
  // KHỞI TẠO SỰ KIỆN DOM
  // ============================================================================
  document.addEventListener('DOMContentLoaded', async () => {
    initManualEditorFields();
    populateContentBankPicker();

    // Kiểm tra URL ?id=123&print=1 để mở trực tiếp báo cáo từ trang Admin
    const params = new URLSearchParams(window.location.search);
    const viewId = params.get('id');
    const autoPrint = params.get('print');

    if (viewId) {
      try {
        const res = await fetch(`/api/submissions/${encodeURIComponent(viewId)}`);
        if (res.ok) {
          const record = await res.json();
          await loadSubmissionsSwitcher();
          await renderReportScreen(record);
          setActiveWorkspaceTab('self-report');
          if (autoPrint === '1') {
            setTimeout(() => window.print(), 450);
          }
        }
      } catch (_) {}
    }

    // Chuyển 5 Tab trên thanh Header
    document.getElementById('workspace-tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tab]');
      if (!btn) return;
      setActiveWorkspaceTab(btn.getAttribute('data-tab'));
    });

    // Các nút trên màn hình Welcome
    document.getElementById('btn-start-assessment')?.addEventListener('click', () => {
      showScreen('userInfo');
    });
    document.getElementById('btn-jump-manuals')?.addEventListener('click', () => {
      setActiveWorkspaceTab('manuals');
    });
    document.getElementById('btn-jump-actions')?.addEventListener('click', () => {
      setActiveWorkspaceTab('growth-privacy');
    });
    document.getElementById('btn-back-welcome')?.addEventListener('click', () => {
      showScreen('welcome');
    });

    // Chọn chế độ khảo sát (Likert 40 vs Forced-Choice 24)
    document.querySelectorAll('input[name="assessment_mode"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        document.getElementById('mode-card-likert')?.classList.toggle('active', radio.value === 'likert40' && radio.checked);
        document.getElementById('mode-card-forced')?.classList.toggle('active', radio.value === 'forced24' && radio.checked);
      });
    });

    // Submit form thông tin cá nhân -> vào màn làm bài
    document.getElementById('user-info-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      state.userInfo = {
        full_name: document.getElementById('input-fullname').value.trim(),
        email: document.getElementById('input-email').value.trim(),
        phone: document.getElementById('input-phone').value.trim(),
        department: document.getElementById('input-department').value.trim(),
        position: document.getElementById('input-position').value.trim()
      };
      const selectedMode = document.querySelector('input[name="assessment_mode"]:checked')?.value || 'likert40';
      document.getElementById('quiz-display-name').textContent = state.userInfo.full_name;
      initQuizState(selectedMode);
      startTimer();
      renderCurrentQuestion();
      showScreen('quiz');
    });

    // Sự kiện chọn đáp án trong màn Quiz
    document.getElementById('question-options-list')?.addEventListener('click', (e) => {
      const likertBtn = e.target.closest('.likert-option-btn');
      if (likertBtn) {
        handleLikertSelect(likertBtn.getAttribute('data-likert-val'));
        return;
      }
      const fcBtn = e.target.closest('.choice-btn');
      if (fcBtn) {
        handleForcedChoiceClick(fcBtn.getAttribute('data-role'), fcBtn.getAttribute('data-type'));
      }
    });

    document.getElementById('btn-prev-question')?.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        renderCurrentQuestion();
      }
    });

    document.getElementById('btn-next-question')?.addEventListener('click', () => {
      const items = getActiveQuizItems();
      if (state.currentIndex < items.length - 1) {
        state.currentIndex += 1;
        renderCurrentQuestion();
      }
    });

    document.getElementById('question-nav-grid')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.q-nav-btn');
      if (!btn) return;
      state.currentIndex = Number(btn.getAttribute('data-qindex'));
      renderCurrentQuestion();
    });

    document.getElementById('btn-demo-fill')?.addEventListener('click', handleDemoFill);
    document.getElementById('btn-submit-quiz')?.addEventListener('click', handleSubmitQuiz);
    document.getElementById('btn-submit-sidebar')?.addEventListener('click', handleSubmitQuiz);

    // Các nút trên màn Báo cáo Hồ sơ cá nhân
    document.getElementById('btn-print-pdf')?.addEventListener('click', () => window.print());
    document.getElementById('btn-retake-quiz')?.addEventListener('click', () => {
      showScreen('userInfo');
    });
    document.getElementById('profile-switcher-select')?.addEventListener('change', async (e) => {
      const id = e.target.value;
      if (!id) return;
      const res = await fetch(`/api/submissions/${encodeURIComponent(id)}`);
      if (res.ok) {
        const record = await res.json();
        syncActiveUserEmail(record.email, record.full_name);
        renderReportScreen(record);
      }
    });

    document.getElementById('report-history-list')?.addEventListener('click', async (e) => {
      const card = e.target.closest('[data-history-id]');
      if (!card) return;
      const id = card.getAttribute('data-history-id');
      const res = await fetch(`/api/submissions/${encodeURIComponent(id)}`);
      if (res.ok) {
        const record = await res.json();
        renderReportScreen(record);
      }
    });

    document.getElementById('btn-open-manual-from-report')?.addEventListener('click', () => {
      setActiveWorkspaceTab('manuals');
      document.getElementById('manuals-directory-view')?.classList.add('hidden');
      document.getElementById('manuals-editor-view')?.classList.remove('hidden');
      const email = state.currentSubmission?.email || 'quan.tran@vaga.vn';
      document.getElementById('editor-lookup-email').value = email;
      loadOwnerManualIntoEditor(email);
    });

    // Lưu nhanh Quick Win từ báo cáo vào Kế hoạch hành động riêng tư
    document.getElementById('printable-report')?.addEventListener('click', (e) => {
      const adoptBtn = e.target.closest('button[data-adopt-text]');
      if (!adoptBtn) return;
      const text = adoptBtn.getAttribute('data-adopt-text');
      const email = state.currentSubmission?.email || 'quan.tran@vaga.vn';
      const name = state.currentSubmission?.full_name || 'Trần Minh Quân';
      syncActiveUserEmail(email, name);
      setActiveWorkspaceTab('growth-privacy');
      document.getElementById('act-card-id').value = '';
      document.getElementById('act-title').value = text.slice(0, 75);
      document.getElementById('act-behavior').value = text;
      document.getElementById('act-trigger').value = 'Trong tình huống phối hợp công việc hàng ngày tuần này';
      document.getElementById('act-signal').value = 'Áp dụng thành công ít nhất 3 lần trong tuần';
    });

    // Sự kiện Phân hệ 3: Cẩm nang Cộng tác
    document.getElementById('btn-subtab-directory')?.addEventListener('click', () => {
      document.getElementById('manuals-directory-view')?.classList.remove('hidden');
      document.getElementById('manuals-editor-view')?.classList.add('hidden');
      document.getElementById('btn-subtab-directory')?.classList.replace('btn-outline', 'btn-primary');
      document.getElementById('btn-subtab-editor')?.classList.replace('btn-primary', 'btn-outline');
      loadPublishedManualsDirectory();
    });

    document.getElementById('btn-subtab-editor')?.addEventListener('click', () => {
      document.getElementById('manuals-directory-view')?.classList.add('hidden');
      document.getElementById('manuals-editor-view')?.classList.remove('hidden');
      document.getElementById('btn-subtab-editor')?.classList.replace('btn-outline', 'btn-primary');
      document.getElementById('btn-subtab-directory')?.classList.replace('btn-primary', 'btn-outline');
      const email = document.getElementById('editor-lookup-email')?.value || state.currentSubmission?.email || 'quan.tran@vaga.vn';
      document.getElementById('editor-lookup-email').value = email;
      loadOwnerManualIntoEditor(email);
    });

    document.getElementById('manual-search-input')?.addEventListener('input', loadPublishedManualsDirectory);
    document.getElementById('manual-type-filter')?.addEventListener('change', loadPublishedManualsDirectory);
    document.getElementById('btn-refresh-manuals')?.addEventListener('click', loadPublishedManualsDirectory);

    document.getElementById('published-manuals-grid')?.addEventListener('click', (e) => {
      const card = e.target.closest('[data-manual-id]');
      if (!card) return;
      state.selectedManualId = Number(card.getAttribute('data-manual-id'));
      renderColleagueCardsList();
      const found = state.publishedManuals.find((m) => m.id === state.selectedManualId);
      if (found) {
        renderManualCheatSheetPane(found);
        if (window.innerWidth <= 1024) {
          document.getElementById('manual-detail-pane')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    document.getElementById('manual-detail-pane')?.addEventListener('click', (e) => {
      const cmpBtn = e.target.closest('button[data-compare-target]');
      if (cmpBtn) {
        const targetId = Number(cmpBtn.getAttribute('data-compare-target'));
        setActiveWorkspaceTab('pair-compare');
        initPairComparisonTab(targetId);
        return;
      }
      const editBtn = e.target.closest('button[data-edit-owner]');
      if (editBtn) {
        const ownerEmail = editBtn.getAttribute('data-edit-owner');
        document.getElementById('manuals-directory-view')?.classList.add('hidden');
        document.getElementById('manuals-editor-view')?.classList.remove('hidden');
        document.getElementById('editor-lookup-email').value = ownerEmail;
        loadOwnerManualIntoEditor(ownerEmail);
      }
    });

    document.getElementById('btn-load-owner-manual')?.addEventListener('click', () => {
      const email = document.getElementById('editor-lookup-email')?.value.trim();
      loadOwnerManualIntoEditor(email);
    });

    document.getElementById('btn-autofill-manual-template')?.addEventListener('click', () => {
      const code = document.getElementById('man-profile-code')?.value || 'D';
      applyProfileDefaultsToManualEditor(code);
      showManualEditorAlert(`Đã nạp mẫu gợi ý chuẩn cho phong cách ${code}. Bạn có thể chỉnh sửa thêm trước khi lưu!`, false);
    });

    document.getElementById('btn-save-manual-draft')?.addEventListener('click', async () => {
      try {
        const payload = collectManualEditorPayload();
        const res = await fetch('/api/manuals/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Lỗi lưu nháp');
        updateEditorStatusBanner(data.status, data.revision);
        showManualEditorAlert(`✅ Đã lưu Bản nháp Cẩm nang riêng tư (DRAFT) cho ${data.full_name}.`, false);
      } catch (err) {
        showManualEditorAlert(err.message, true);
      }
    });

    document.getElementById('btn-publish-manual')?.addEventListener('click', async () => {
      try {
        const payload = collectManualEditorPayload();
        const res = await fetch('/api/manuals/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Lỗi xuất bản');
        updateEditorStatusBanner(data.status, data.revision);
        showManualEditorAlert(`🌐 Đã Xuất bản công khai Cẩm nang của ${data.full_name} (Phiên bản v${data.revision})!`, false);
      } catch (err) {
        showManualEditorAlert(err.message, true);
      }
    });

    document.getElementById('btn-revoke-manual')?.addEventListener('click', async () => {
      const email = document.getElementById('man-owner-email')?.value.trim();
      if (!email) return;
      try {
        const res = await fetch('/api/manuals/revoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ owner_email: email, reason: 'Chủ hồ sơ thu hồi trực tiếp trên Trình biên tập' })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Lỗi thu hồi');
        updateEditorStatusBanner(data.status, data.revision);
        showManualEditorAlert(`🛑 Đã Thu hồi quyền chia sẻ Cẩm nang của ${data.full_name}. Đồng nghiệp không còn truy cập được nữa.`, false);
      } catch (err) {
        showManualEditorAlert(err.message, true);
      }
    });

    // Sự kiện Phân hệ 4: So sánh Cặp 1-1 (A -> B)
    document.getElementById('btn-run-pair-compare')?.addEventListener('click', runPairComparison);
    document.getElementById('pair-viewer-select')?.addEventListener('change', runPairComparison);
    document.getElementById('pair-target-select')?.addEventListener('change', runPairComparison);
    document.getElementById('pair-context-select')?.addEventListener('change', runPairComparison);

    document.getElementById('btn-swap-pair')?.addEventListener('click', () => {
      const vSel = document.getElementById('pair-viewer-select');
      const tSel = document.getElementById('pair-target-select');
      if (!vSel || !tSel) return;
      const tmp = vSel.value;
      vSel.value = tSel.value;
      tSel.value = tmp;
      runPairComparison();
    });

    // Sự kiện Phân hệ 5: Kế hoạch Hành động Riêng tư & Quyền Dữ liệu
    document.getElementById('bank-context-filter')?.addEventListener('change', populateContentBankPicker);
    document.getElementById('btn-apply-bank-card')?.addEventListener('click', applySelectedBankCardToForm);
    document.getElementById('btn-load-actions')?.addEventListener('click', loadOwnerPrivateActions);

    document.getElementById('private-action-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const owner_email = document.getElementById('action-owner-email').value.trim();
      const owner_name = document.getElementById('action-owner-name').value.trim();
      const payload = {
        owner_email,
        owner_name,
        card_id: document.getElementById('act-card-id').value.trim(),
        title: document.getElementById('act-title').value.trim(),
        context: document.getElementById('act-context').value,
        trigger_situation: document.getElementById('act-trigger').value.trim(),
        action_behavior: document.getElementById('act-behavior').value.trim(),
        success_signal: document.getElementById('act-signal').value.trim(),
        review_date: document.getElementById('act-review-date').value,
        private_notes: document.getElementById('act-private-notes').value.trim()
      };

      try {
        const res = await fetch('/api/actions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Không thể lưu hành động');
        }
        showActionFormAlert(`✅ Đã lưu cam kết hành động riêng tư #${data.id} cho ${owner_email}!`, false);
        document.getElementById('act-card-id').value = '';
        document.getElementById('act-title').value = '';
        document.getElementById('act-trigger').value = '';
        document.getElementById('act-behavior').value = '';
        document.getElementById('act-signal').value = '';
        document.getElementById('act-private-notes').value = '';
        await loadOwnerPrivateActions();
      } catch (err) {
        showActionFormAlert(`⚠️ ${err.message}`, true);
      }
    });

    document.getElementById('private-actions-list')?.addEventListener('click', async (e) => {
      const email = document.getElementById('action-owner-email')?.value.trim() || '';
      const toggleBtn = e.target.closest('button[data-act-toggle]');
      if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-act-toggle');
        const nextStatus = toggleBtn.getAttribute('data-act-status');
        await fetch(`/api/actions/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ owner_email: email, status: nextStatus })
        });
        loadOwnerPrivateActions();
        return;
      }
      const delBtn = e.target.closest('button[data-act-delete]');
      if (delBtn) {
        const id = delBtn.getAttribute('data-act-delete');
        await fetch(`/api/actions/${encodeURIComponent(id)}?email=${encodeURIComponent(email)}`, {
          method: 'DELETE'
        });
        loadOwnerPrivateActions();
      }
    });

    // Các nút thực thi Quyền Dữ liệu Cá nhân
    document.getElementById('btn-right-export-json')?.addEventListener('click', () => executeRightRequest('EXPORT_DATA'));
    document.getElementById('btn-right-revoke-manual')?.addEventListener('click', () => executeRightRequest('REVOKE_MANUAL'));
    document.getElementById('btn-right-delete-assessments')?.addEventListener('click', () => executeRightRequest('DELETE_ASSESSMENTS'));
    document.getElementById('btn-right-full-erasure')?.addEventListener('click', () => executeRightRequest('FULL_ERASURE'));
  });
})();
