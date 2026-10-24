/**
 * BỘ MÁY CHẤM ĐIỂM, KIỂM ĐỊNH CHẤT LƯỢNG, PHÂN LOẠI 12+1 NHÓM & SO SÁNH CẶP 1-1 VAGA DISC (v0.2)
 * Tương thích cả Browser (window.DISCEngine) và Node.js (module.exports)
 */
(function (root) {
  let questionsModule = {};
  let profilesModule = {};

  if (typeof require === 'function' && typeof window === 'undefined') {
    try {
      questionsModule = require('./questions-data.js');
      profilesModule = require('./disc-profiles.js');
    } catch (_) {}
  }

  function getQuestionsData() {
    return {
      VAGA_LIKERT_40: root.VAGA_LIKERT_40 || questionsModule.VAGA_LIKERT_40 || [],
      VAGA_ADAPTIVE_8: root.VAGA_ADAPTIVE_8 || questionsModule.VAGA_ADAPTIVE_8 || [],
      DISC_QUESTIONS: root.DISC_QUESTIONS || questionsModule.DISC_QUESTIONS || [],
      VAGA_CONTENT_BANK_72: root.VAGA_CONTENT_BANK_72 || questionsModule.VAGA_CONTENT_BANK_72 || [],
      VAGA_WORKPLACE_CONTEXTS: root.VAGA_WORKPLACE_CONTEXTS || questionsModule.VAGA_WORKPLACE_CONTEXTS || [],
      VAGA_WORKSTYLE_SLIDERS: root.VAGA_WORKSTYLE_SLIDERS || questionsModule.VAGA_WORKSTYLE_SLIDERS || []
    };
  }

  function getProfilesData() {
    return {
      DISC_PROFILES: root.DISC_PROFILES || profilesModule.DISC_PROFILES || {},
      DISC_DIMENSIONS: root.DISC_DIMENSIONS || profilesModule.DISC_DIMENSIONS || {}
    };
  }

  /**
   * Làm tròn hiển thị đúng 1 chữ số thập phân theo chuẩn DOC-09 / RV-006
   */
  function roundDisplay1(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    return Math.round((num + Number.EPSILON) * 10) / 10;
  }

  /**
   * Kiểm tra hợp đồng giá trị số học (DOC-09 / RV-005 / RV-006)
   * @param {'COUNT'|'RAW_MEAN_1_5'|'LINEAR_0_100'} metricType
   * @param {any} value
   */
  function validateMetricValue(metricType, value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return { valid: false, code: 'ERR_NOT_FINITE_NUMBER', message: `${metricType} phải là số hữu hạn.` };
    }
    if (metricType === 'COUNT') {
      if (!Number.isInteger(value) || value < 0) {
        return { valid: false, code: 'ERR_INVALID_COUNT', message: 'COUNT phải là số nguyên không âm.' };
      }
      return { valid: true, value };
    }
    if (metricType === 'RAW_MEAN_1_5') {
      if (value < 1 || value > 5) {
        return { valid: false, code: 'ERR_OUT_OF_RANGE_1_5', message: 'RAW_MEAN_1_5 phải nằm trong đoạn [1, 5].' };
      }
      return { valid: true, value: roundDisplay1(value) };
    }
    if (metricType === 'LINEAR_0_100') {
      if (value < 0 || value > 100) {
        return { valid: false, code: 'ERR_OUT_OF_RANGE_0_100', message: 'LINEAR_0_100 phải nằm trong đoạn [0, 100].' };
      }
      return { valid: true, value: roundDisplay1(value) };
    }
    return { valid: false, code: 'ERR_UNKNOWN_METRIC', message: 'Loại metric không xác định.' };
  }

  /**
   * Phân loại 12 nhóm pha trộn Vaga DISC + BALANCED từ thang điểm 0-100
   * Hỗ trợ: D, DI, ID, I, IS, SI, S, SC, CS, C, CD, DC và BALANCED
   */
  function classifyDISCProfile(linearScores) {
    const { DISC_PROFILES } = getProfilesData();
    const dims = ['D', 'I', 'S', 'C'];
    for (const d of dims) {
      if (linearScores[d] === null || linearScores[d] === undefined || !Number.isFinite(Number(linearScores[d]))) {
        return {
          primary_type: null,
          secondary_type: null,
          profile_code: null,
          is_balanced: false,
          confidence_band: 'INCOMPLETE_DATA'
        };
      }
    }

    const priorityOrder = { D: 4, I: 3, S: 2, C: 1 };
    const sorted = dims
      .map((d) => ({ key: d, val: Number(linearScores[d]) }))
      .sort((a, b) => {
        if (Math.abs(b.val - a.val) > 0.001) return b.val - a.val;
        return priorityOrder[b.key] - priorityOrder[a.key];
      });

    const first = sorted[0];
    const second = sorted[1];
    const fourth = sorted[3];
    const spread = first.val - fourth.val;
    const topGap = first.val - second.val;

    // Nếu độ trải giữa điểm cao nhất và thấp nhất < 10 điểm trên thang 0-100 -> Hồ sơ Cân bằng (BALANCED)
    if (spread < 10) {
      return {
        primary_type: first.key,
        secondary_type: second.key,
        profile_code: 'BALANCED',
        is_balanced: true,
        confidence_band: 'BALANCED_PROFILE'
      };
    }

    const candidateBlend = `${first.key}${second.key}`;
    // Kiểm tra xem nhóm thứ 2 có đủ cao (> trung vị 50) và tạo thành tổ hợp 2 chữ cái (12 blends)
    if (second.val >= 52 && topGap <= 28 && DISC_PROFILES[candidateBlend]) {
      return {
        primary_type: first.key,
        secondary_type: second.key,
        profile_code: candidateBlend,
        is_balanced: false,
        confidence_band: topGap <= 8 ? 'CLOSE_BLEND' : 'CLEAR_BLEND'
      };
    }

    return {
      primary_type: first.key,
      secondary_type: second.val >= 50 ? second.key : null,
      profile_code: first.key,
      is_balanced: false,
      confidence_band: topGap >= 15 ? 'HIGH_CONFIDENCE_SINGLE' : 'MODERATE_SINGLE'
    };
  }

  /**
   * Kiểm tra xem sau 40 câu Likert có cần kích hoạt thêm 8 câu Adaptive (A-D01..A-C02) không
   */
  function shouldTriggerAdaptive(likertAnswers40) {
    const partial = calculateLikertResult(likertAnswers40, 240, { allowPartialAdaptiveCheck: true });
    if (!partial || !partial.linear_scores) {
      return { trigger: false, reason: '' };
    }
    const vals = ['D', 'I', 'S', 'C']
      .map((k) => ({ key: k, v: Number(partial.linear_scores[k] || 0) }))
      .sort((a, b) => b.v - a.v);

    const topDiff = vals[0].v - vals[1].v;
    if (topDiff <= 8.5) {
      return {
        trigger: true,
        reason: `Khoảng cách giữa 2 miền dẫn đầu (${vals[0].key}: ${vals[0].v} và ${vals[1].key}: ${vals[1].v}) khá sát nhau (${roundDisplay1(topDiff)} điểm). Hệ thống mở thêm 8 câu Adaptive để phân giải chính xác hơn.`
      };
    }
    if (partial.response_quality && partial.response_quality.inconsistent_pairs > 0) {
      return {
        trigger: true,
        reason: 'Phát hiện một số câu thuận - nghịch có độ lệch phản hồi. Hệ thống mở thêm 8 câu Adaptive để củng cố độ tin cậy.'
      };
    }
    return { trigger: false, reason: '' };
  }

  /**
   * Đánh giá chất lượng phản hồi (Response Quality Check - DOC-08 / DOC-09 / DR-03)
   * Kiểm tra: (1) Thời gian làm bài, (2) Straightlining (chọn 1 mức lặp lại), (3) Cặp câu thuận-nghịch
   */
  function evaluateResponseQuality(answers, durationSeconds = 180, mode = 'likert') {
    const notes = [];
    let score = 100;
    const dur = Number(durationSeconds) || 0;

    if (mode === 'likert') {
      const validValues = (answers || [])
        .map((a) => Number(a.value ?? a.raw_value))
        .filter((v) => Number.isFinite(v) && v >= 1 && v <= 5);

      const totalCount = validValues.length || 1;
      // 1. Kiểm tra tốc độ làm bài (< 55s cho 40 câu)
      if (dur > 0 && dur < 55) {
        score -= 25;
        notes.push('Thời gian hoàn thành rất nhanh so với độ dài bài khảo sát; kết quả có thể phản ánh phản xạ lướt nhanh.');
      }

      // 2. Kiểm tra Straightlining (tỷ lệ chọn cùng 1 mức đáp án)
      const freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      validValues.forEach((v) => {
        freq[v] = (freq[v] || 0) + 1;
      });
      const maxSameRatio = Math.max(...Object.values(freq)) / totalCount;
      if (maxSameRatio >= 0.78) {
        score -= 35;
        notes.push(`Có tới ${Math.round(maxSameRatio * 100)}% câu trả lời cùng chọn một mức điểm giống nhau (dấu hiệu trả lời đồng loạt).`);
      }

      // 3. Kiểm tra 4 cặp câu thuận - nghịch (PAIR_D1, PAIR_I1, PAIR_S1, PAIR_C1)
      const answerMap = {};
      (answers || []).forEach((a) => {
        if (a.item_id) answerMap[a.item_id] = Number(a.value ?? a.raw_value);
      });
      const pairs = [
        ['L-D01', 'L-D06'],
        ['L-I01', 'L-I07'],
        ['L-S02', 'L-S07'],
        ['L-C02', 'L-C07']
      ];
      let inconsistentPairs = 0;
      pairs.forEach(([fId, rId]) => {
        const fVal = answerMap[fId];
        const rVal = answerMap[rId];
        if (Number.isFinite(fVal) && Number.isFinite(rVal)) {
          const keyedR = 6 - rVal;
          if (Math.abs(fVal - keyedR) >= 3) {
            inconsistentPairs += 1;
          }
        }
      });

      if (inconsistentPairs >= 2) {
        score -= inconsistentPairs * 12;
        notes.push(`Có ${inconsistentPairs}/4 cặp câu đối chứng thuận - nghịch chênh lệch đáng kể; bạn có thể đang hành xử rất khác nhau tùy tình huống cụ thể.`);
      }

      score = Math.max(20, Math.min(100, score));
      const status = score >= 80 ? 'HIGH_RELIABILITY' : score >= 55 ? 'CAUTION_REVIEW' : 'LOW_RELIABILITY';
      const label =
        status === 'HIGH_RELIABILITY'
          ? 'Độ nhất quán phản hồi cao'
          : status === 'CAUTION_REVIEW'
          ? 'Độ nhất quán trung bình (Nên đọc kèm ngữ cảnh)'
          : 'Cần lưu ý: Phản hồi có dấu hiệu trả lời quá nhanh hoặc chưa đồng nhất';

      return {
        quality_score: score,
        status,
        label,
        inconsistent_pairs: inconsistentPairs,
        max_same_ratio: roundDisplay1(maxSameRatio * 100),
        duration_seconds: dur,
        notes: notes.length ? notes : ['Các phản hồi thuận - nghịch và thời gian làm bài đạt độ tin cậy tốt.']
      };
    }

    // Chế độ Forced-choice 24 câu
    if (dur > 0 && dur < 35) {
      score -= 25;
      notes.push('Thời gian hoàn thành 24 câu rất nhanh (< 35 giây); nên kiểm tra lại mức độ sát thực tế.');
    }
    const status = score >= 80 ? 'HIGH_RELIABILITY' : 'CAUTION_REVIEW';
    return {
      quality_score: score,
      status,
      label: status === 'HIGH_RELIABILITY' ? 'Độ nhất quán phản hồi cao' : 'Cần đọc kèm ngữ cảnh thực tế',
      inconsistent_pairs: 0,
      duration_seconds: dur,
      notes: notes.length ? notes : ['Hoàn thành đầy đủ 24 cụm câu hỏi Most/Least hợp lệ.']
    };
  }

  /**
   * Chấm điểm bài đánh giá Vaga Likert 1-5 (40 câu chuẩn L40 hoặc 48 câu có Adaptive L48)
   * Tuân thủ DOC-09:
   * - Câu Reverse: keyed = 6 - raw
   * - Raw Mean [1, 5]
   * - Linear Score [0, 100] = 25 * (Raw Mean - 1)
   * - Không tự điền dữ liệu thiếu (nếu thiếu câu trong miền -> trả null cho miền đó)
   */
  function calculateLikertResult(likertAnswers = [], durationSeconds = 240, options = {}) {
    const { VAGA_LIKERT_40, VAGA_ADAPTIVE_8 } = getQuestionsData();
    const allCatalog = [...VAGA_LIKERT_40, ...VAGA_ADAPTIVE_8];
    const itemMap = {};
    allCatalog.forEach((it) => {
      itemMap[it.id] = it;
    });

    const ansById = {};
    (likertAnswers || []).forEach((ans) => {
      const id = ans.item_id || ans.id;
      const val = Number(ans.value ?? ans.raw_value);
      if (id && Number.isFinite(val) && val >= 1 && val <= 5 && Number.isInteger(val)) {
        ansById[id] = val;
      }
    });

    const hasAdaptive = VAGA_ADAPTIVE_8.some((it) => ansById[it.id] !== undefined);
    const activeItems = hasAdaptive ? [...VAGA_LIKERT_40, ...VAGA_ADAPTIVE_8] : [...VAGA_LIKERT_40];

    const buckets = { D: [], I: [], S: [], C: [] };
    const missingByDim = { D: 0, I: 0, S: 0, C: 0 };

    activeItems.forEach((item) => {
      const rawVal = ansById[item.id];
      if (rawVal === undefined) {
        missingByDim[item.dimension] += 1;
      } else {
        const keyedVal = item.keying === 'reverse' ? 6 - rawVal : rawVal;
        buckets[item.dimension].push(keyedVal);
      }
    });

    const raw_mean_scores = { D: null, I: null, S: null, C: null };
    const linear_scores = { D: null, I: null, S: null, C: null };

    ['D', 'I', 'S', 'C'].forEach((dim) => {
      if (missingByDim[dim] === 0 && buckets[dim].length > 0) {
        const sum = buckets[dim].reduce((acc, v) => acc + v, 0);
        const exactMean = sum / buckets[dim].length;
        const exactLinear = 25 * (exactMean - 1);
        raw_mean_scores[dim] = roundDisplay1(exactMean);
        linear_scores[dim] = roundDisplay1(exactLinear);
      }
    });

    const allComplete = ['D', 'I', 'S', 'C'].every((d) => linear_scores[d] !== null);
    if (!allComplete && !options.allowIncomplete) {
      return {
        incomplete: true,
        missing_by_dimension: missingByDim,
        raw_mean_scores,
        linear_scores,
        primary_type: null,
        profile_code: null
      };
    }

    // Tính tỷ trọng tương đối (percentage_scores) và điểm quy đổi tương đương cho biểu đồ
    const safeLinear = {
      D: Number(linear_scores.D ?? 50),
      I: Number(linear_scores.I ?? 50),
      S: Number(linear_scores.S ?? 50),
      C: Number(linear_scores.C ?? 50)
    };
    const totalLinear = safeLinear.D + safeLinear.I + safeLinear.S + safeLinear.C || 1;

    const percentage_scores = {
      D: Math.round((safeLinear.D / totalLinear) * 100),
      I: Math.round((safeLinear.I / totalLinear) * 100),
      S: Math.round((safeLinear.S / totalLinear) * 100),
      C: 0
    };
    percentage_scores.C = Math.max(0, 100 - (percentage_scores.D + percentage_scores.I + percentage_scores.S));

    // Điểm tương đương Most/Least để giữ khả năng vẽ biểu đồ kép và lưu DB đồng nhất
    const most_scores = {
      D: Math.round((safeLinear.D / 100) * 14),
      I: Math.round((safeLinear.I / 100) * 14),
      S: Math.round((safeLinear.S / 100) * 14),
      C: Math.round((safeLinear.C / 100) * 14)
    };
    const least_scores = {
      D: Math.round(((100 - safeLinear.D) / 100) * 12),
      I: Math.round(((100 - safeLinear.I) / 100) * 12),
      S: Math.round(((100 - safeLinear.S) / 100) * 12),
      C: Math.round(((100 - safeLinear.C) / 100) * 12)
    };
    const diff_scores = {
      D: most_scores.D - least_scores.D,
      I: most_scores.I - least_scores.I,
      S: most_scores.S - least_scores.S,
      C: most_scores.C - least_scores.C
    };

    const classification = classifyDISCProfile(safeLinear);
    const response_quality = evaluateResponseQuality(likertAnswers, durationSeconds, 'likert');

    return {
      assessment_mode: hasAdaptive ? 'likert48_adaptive' : 'likert40',
      adaptive_used: hasAdaptive,
      raw_mean_scores,
      linear_scores: safeLinear,
      most_scores,
      least_scores,
      diff_scores,
      percentage_scores,
      radar_scores: {
        adapted: { ...safeLinear },
        natural: { ...safeLinear }
      },
      primary_type: classification.primary_type || 'D',
      secondary_type: classification.secondary_type,
      profile_code: classification.profile_code || 'D',
      is_balanced: classification.is_balanced,
      confidence_band: classification.confidence_band,
      response_quality
    };
  }

  /**
   * Tính điểm từ mảng 24 câu trả lời Forced-Choice (Most / Least)
   */
  function calculateResult(answers, totalQuestions = 24, durationSeconds = 180) {
    const most = { D: 0, I: 0, S: 0, C: 0 };
    const least = { D: 0, I: 0, S: 0, C: 0 };

    for (const ans of answers || []) {
      if (ans.most_choice && most[ans.most_choice] !== undefined) {
        most[ans.most_choice] += 1;
      }
      if (ans.least_choice && least[ans.least_choice] !== undefined) {
        least[ans.least_choice] += 1;
      }
    }

    const diff = {
      D: most.D - least.D,
      I: most.I - least.I,
      S: most.S - least.S,
      C: most.C - least.C
    };

    // Quy đổi sang thang điểm chuẩn 0 - 100 cho mỗi miền D, I, S, C
    const linear_scores = {
      D: roundDisplay1(Math.min(100, Math.max(0, ((diff.D + totalQuestions) / (2 * totalQuestions)) * 100))),
      I: roundDisplay1(Math.min(100, Math.max(0, ((diff.I + totalQuestions) / (2 * totalQuestions)) * 100))),
      S: roundDisplay1(Math.min(100, Math.max(0, ((diff.S + totalQuestions) / (2 * totalQuestions)) * 100))),
      C: roundDisplay1(Math.min(100, Math.max(0, ((diff.C + totalQuestions) / (2 * totalQuestions)) * 100)))
    };

    const raw_mean_scores = {
      D: roundDisplay1(1 + linear_scores.D / 25),
      I: roundDisplay1(1 + linear_scores.I / 25),
      S: roundDisplay1(1 + linear_scores.S / 25),
      C: roundDisplay1(1 + linear_scores.C / 25)
    };

    const rawStrength = {
      D: Math.max(1, most.D * 2 + (totalQuestions - least.D)),
      I: Math.max(1, most.I * 2 + (totalQuestions - least.I)),
      S: Math.max(1, most.S * 2 + (totalQuestions - least.S)),
      C: Math.max(1, most.C * 2 + (totalQuestions - least.C))
    };

    const sumStrength = rawStrength.D + rawStrength.I + rawStrength.S + rawStrength.C;

    const percentage = {
      D: Math.round((rawStrength.D / sumStrength) * 100),
      I: Math.round((rawStrength.I / sumStrength) * 100),
      S: Math.round((rawStrength.S / sumStrength) * 100),
      C: 0
    };
    percentage.C = Math.max(0, 100 - (percentage.D + percentage.I + percentage.S));

    const radarScores = {
      adapted: {
        D: Math.min(100, Math.round((most.D / 16) * 100)),
        I: Math.min(100, Math.round((most.I / 16) * 100)),
        S: Math.min(100, Math.round((most.S / 16) * 100)),
        C: Math.min(100, Math.round((most.C / 16) * 100))
      },
      natural: {
        D: Math.min(100, Math.round(((16 - least.D) / 16) * 100)),
        I: Math.min(100, Math.round(((16 - least.I) / 16) * 100)),
        S: Math.min(100, Math.round(((16 - least.S) / 16) * 100)),
        C: Math.min(100, Math.round(((16 - least.C) / 16) * 100))
      }
    };

    const classification = classifyDISCProfile(linear_scores);
    const response_quality = evaluateResponseQuality(answers, durationSeconds, 'forced24');

    return {
      assessment_mode: 'forced24',
      adaptive_used: false,
      raw_mean_scores,
      linear_scores,
      most_scores: most,
      least_scores: least,
      diff_scores: diff,
      percentage_scores: percentage,
      radar_scores: radarScores,
      primary_type: classification.primary_type || 'D',
      secondary_type: classification.secondary_type,
      profile_code: classification.profile_code || 'D',
      is_balanced: classification.is_balanced,
      confidence_band: classification.confidence_band,
      response_quality
    };
  }

  /**
   * Lấy thông tin hồ sơ chi tiết từ mã profile_code (Hỗ trợ cả 12 nhóm + BALANCED)
   */
  function getProfileDetails(profileCode, primaryType) {
    const { DISC_PROFILES, DISC_DIMENSIONS } = getProfilesData();
    const profile =
      DISC_PROFILES[profileCode] ||
      DISC_PROFILES[primaryType] ||
      DISC_PROFILES.D;

    const primaryDimension =
      DISC_DIMENSIONS[profileCode === 'BALANCED' ? 'BALANCED' : primaryType] ||
      DISC_DIMENSIONS[profile.primary] ||
      DISC_DIMENSIONS.D;

    return {
      profile,
      primaryDimension
    };
  }

  /**
   * Kiểm tra hợp lệ ngữ cảnh của Thẻ hành động trong Content Bank 72 thẻ (RV-008)
   */
  function validateActionCardContext(cardId, targetContext) {
    if (!cardId) return { valid: true };
    const { VAGA_CONTENT_BANK_72 } = getQuestionsData();
    const card = VAGA_CONTENT_BANK_72.find((c) => c.card_id === cardId);
    if (!card) {
      return { valid: false, code: 'ERR_UNKNOWN_CARD_ID', message: `Không tìm thấy thẻ nội dung ${cardId}.` };
    }
    if (!targetContext) return { valid: true, card };
    if ((card.excluded_contexts || []).includes(targetContext)) {
      return {
        valid: false,
        code: 'ERR_CONTEXT_EXCLUDED',
        message: `Thẻ ${cardId} bị loại trừ khỏi ngữ cảnh "${targetContext}". Ngữ cảnh hợp lệ: ${[card.primary_context, ...(card.secondary_contexts || [])].join(', ')}.`
      };
    }
    const allowed = [card.primary_context, ...(card.secondary_contexts || [])];
    if (!allowed.includes(targetContext)) {
      return {
        valid: false,
        code: 'ERR_CONTEXT_MISMATCH',
        message: `Thẻ ${cardId} chỉ được phép dùng cho ngữ cảnh: ${allowed.join(', ')} (không khớp với "${targetContext}").`
      };
    }
    return { valid: true, card };
  }

  /**
   * Bộ máy So sánh Cặp 1-1 Có Hướng (A -> B) theo chuẩn DOC-07 / DOC-11 / RV-007
   * - Kiểm tra nghiêm ngặt snapshot hợp lệ và trạng thái PUBLISHED
   * - Không sử dụng "% hợp nhau"
   * - Trả về tối đa 3 hành động gợi ý có hướng từ A sang B
   */
  function comparePairProfiles(viewerManual, targetManual, contextFilter = 'all') {
    if (!viewerManual || !targetManual) {
      return {
        valid: false,
        error_code: 'PAIR_PROFILE_MISSING',
        message: 'Cần chọn đầy đủ 2 hồ sơ cộng tác để thực hiện so sánh cặp 1-1.'
      };
    }

    if (viewerManual.status === 'REVOKED' || targetManual.status === 'REVOKED') {
      return {
        valid: false,
        error_code: 'TARGET_MANUAL_REVOKED',
        message: 'Một trong hai hồ sơ đã thu hồi quyền chia sẻ (REVOKED) nên không thể so sánh cặp.'
      };
    }

    if (targetManual.status !== 'PUBLISHED') {
      return {
        valid: false,
        error_code: 'TARGET_MANUAL_NOT_PUBLISHED',
        message: 'Hồ sơ của đồng nghiệp chưa được xuất bản công khai (PUBLISHED).'
      };
    }

    const vScores = viewerManual.linear_scores || viewerManual.percentage_scores;
    const tScores = targetManual.linear_scores || targetManual.percentage_scores;

    if (
      !vScores ||
      !tScores ||
      ['D', 'I', 'S', 'C'].some((k) => !Number.isFinite(Number(vScores[k])) || !Number.isFinite(Number(tScores[k])))
    ) {
      return {
        valid: false,
        error_code: 'PAIR_SNAPSHOT_UNAVAILABLE',
        message: 'Một trong hai hồ sơ chưa có dữ liệu điểm đánh giá hợp lệ (Snapshot null/thiếu) để tính độ lệch hành vi.'
      };
    }

    const { VAGA_CONTENT_BANK_72, VAGA_WORKPLACE_CONTEXTS, VAGA_WORKSTYLE_SLIDERS } = getQuestionsData();
    const { DISC_PROFILES } = getProfilesData();

    const deltas = {
      D: roundDisplay1(Number(vScores.D) - Number(tScores.D)),
      I: roundDisplay1(Number(vScores.I) - Number(tScores.I)),
      S: roundDisplay1(Number(vScores.S) - Number(tScores.S)),
      C: roundDisplay1(Number(vScores.C) - Number(tScores.C))
    };

    const vPrimary = viewerManual.primary_type || 'D';
    const tPrimary = targetManual.primary_type || 'D';
    const pairKey = `${vPrimary}->${tPrimary}`;

    const vSliders = viewerManual.workstyle_sliders || DISC_PROFILES[viewerManual.profile_code || vPrimary]?.manual_defaults?.sliders || { pace: 3, decision_mode: 3, communication_channel: 3, detail_need: 3, change_attitude: 3 };
    const tSliders = targetManual.workstyle_sliders || DISC_PROFILES[targetManual.profile_code || tPrimary]?.manual_defaults?.sliders || { pace: 3, decision_mode: 3, communication_channel: 3, detail_need: 3, change_attitude: 3 };

    const sliderComparisons = VAGA_WORKSTYLE_SLIDERS.map((s) => {
      const aVal = Number(vSliders[s.id] ?? 3);
      const bVal = Number(tSliders[s.id] ?? 3);
      const diff = Math.abs(aVal - bVal);
      return {
        id: s.id,
        label: s.label,
        leftLabel: s.leftLabel,
        rightLabel: s.rightLabel,
        viewer_val: aVal,
        target_val: bVal,
        diff,
        alignment: diff === 0 ? 'Đồng điệu hoàn toàn' : diff === 1 ? 'Khá tương đồng' : 'Khác biệt cần lưu ý điều chỉnh'
      };
    });

    // 1. Điểm tương đồng (Similarities)
    const similarities = [];
    ['D', 'I', 'S', 'C'].forEach((dim) => {
      if (Math.abs(deltas[dim]) <= 12 && Number(vScores[dim]) >= 55 && Number(tScores[dim]) >= 55) {
        const mapSim = {
          D: 'Cả hai đều có tính chủ động cao, hướng thẳng vào mục tiêu đầu ra và thích giải quyết việc nhanh gọn.',
          I: 'Cả hai đều cởi mở, giàu năng lượng giao tiếp, dễ dàng bắt nhịp và khích lệ nhau trong các cuộc thảo luận.',
          S: 'Cả hai đều coi trọng sự tin cậy, phối hợp nhịp nhàng, lắng nghe nhau và giữ cam kết ổn định.',
          C: 'Cả hai đều đề cao tính logic, dữ liệu chuẩn xác và tôn trọng các tiêu chuẩn chất lượng rõ ràng.'
        };
        similarities.push(mapSim[dim]);
      }
    });

    sliderComparisons.forEach((sc) => {
      if (sc.diff <= 1 && similarities.length < 4) {
        similarities.push(`Tương đồng về "${sc.label}": giúp hai bên dễ bắt nhịp tự nhiên khi phối hợp hàng ngày.`);
      }
    });

    if (similarities.length === 0) {
      similarities.push('Hai bạn có xu hướng hành vi bổ trợ góc nhìn cho nhau: một người giúp mở rộng tốc độ/ý tưởng, người kia giúp củng cố độ chắc chắn và chi tiết.');
      similarities.push('Khi thống nhất rõ mục tiêu đầu ra và vai trò của từng người ngay từ đầu, sự khác biệt này tạo nên mảnh ghép đội nhóm toàn diện.');
    }

    // 2. Điểm dễ lệch nhịp (Potential Frictions - ngôn ngữ trung tính, không phán xét)
    const potential_frictions = [];
    if (Math.abs(deltas.D) >= 18) {
      potential_frictions.push(
        deltas.D > 0
          ? `Chênh lệch nhịp quyết định (D: +${deltas.D}): ${viewerManual.full_name} muốn chốt nhanh và đi thẳng vào kết quả, trong khi ${targetManual.full_name} cần thêm thời gian cân nhắc sự đồng thuận hoặc dữ liệu.`
          : `Chênh lệch nhịp quyết định (D: ${deltas.D}): ${targetManual.full_name} có xu hướng đẩy tốc độ rất nhanh và nói thẳng, đôi khi khiến ${viewerManual.full_name} cảm thấy bị thúc ép.`
      );
    }
    if (Math.abs(deltas.I) >= 18) {
      potential_frictions.push(
        deltas.I > 0
          ? `Khác biệt về phong cách trao đổi (I: +${deltas.I}): ${viewerManual.full_name} thích thảo luận mở giàu cảm hứng, còn ${targetManual.full_name} ưu tiên đi vào văn bản hoặc dữ kiện cụ thể.`
          : `Khác biệt về phong cách trao đổi (I: ${deltas.I}): ${targetManual.full_name} thích trao đổi trực tiếp sôi nổi, trong khi ${viewerManual.full_name} thích sự súc tích hoặc chuẩn bị trước.`
      );
    }
    if (Math.abs(deltas.S) >= 18) {
      potential_frictions.push(
        deltas.S > 0
          ? `Khác biệt về nhịp thay đổi (S: +${deltas.S}): ${viewerManual.full_name} ưu tiên lộ trình ổn định từng bước, còn ${targetManual.full_name} sẵn sàng xoay trục mục tiêu đột ngột.`
          : `Khác biệt về nhịp thay đổi (S: ${deltas.S}): ${targetManual.full_name} cần thông báo trước khi thay đổi kế hoạch để tránh bị xáo trộn đột xuất.`
      );
    }
    if (Math.abs(deltas.C) >= 18) {
      potential_frictions.push(
        deltas.C > 0
          ? `Khác biệt về mức độ chi tiết (C: +${deltas.C}): ${viewerManual.full_name} đòi hỏi số liệu và tiêu chuẩn kỹ lưỡng, còn ${targetManual.full_name} ưu tiên bức tranh lớn và tốc độ thực thi.`
          : `Khác biệt về mức độ chi tiết (C: ${deltas.C}): ${targetManual.full_name} rất coi trọng bằng chứng logic và độ chính xác, dễ băn khoăn nếu đề xuất thiếu số liệu.`
      );
    }

    if (potential_frictions.length === 0) {
      if (vPrimary === tPrimary) {
        const sameMap = {
          D: 'Khi cả hai cùng quyết đoán (D-D), dễ xảy ra tranh luận căng thẳng nếu chưa phân định rõ phạm vi tự quyết của mỗi người.',
          I: 'Khi cả hai cùng hào hứng (I-I), buổi thảo luận rất vui nhưng dễ quên chốt lại văn bản ai làm việc gì và thời hạn cụ thể.',
          S: 'Khi cả hai cùng ưu tiên hòa khí (S-S), đôi khi cả hai cùng nhường nhịn làm chậm việc đưa ra các quyết định gai góc.',
          C: 'Khi cả hai cùng cầu toàn chi tiết (C-C), dễ mất nhiều thời gian phân tích qua lại trước khi bắt tay vào triển khai.'
        };
        potential_frictions.push(sameMap[vPrimary]);
      } else {
        potential_frictions.push('Trong các giai đoạn áp lực deadline cao, mỗi người có thể quay về phản xạ tự nhiên riêng nên cần làm rõ kỳ vọng bằng văn bản.');
      }
    }

    // 3. Tối đa 3 Gợi ý hành động có hướng từ A (Viewer) -> B (Target) theo chuẩn DOC-11
    const action_tips_a_to_b = [];
    const pairCard = VAGA_CONTENT_BANK_72.find((c) => c.category === 'PAIR_MATRIX_4X4' && c.dimension === pairKey);
    if (pairCard) {
      action_tips_a_to_b.push({
        source: 'PAIR_MATRIX_RULE',
        card_id: pairCard.card_id,
        context: pairCard.primary_context,
        title: pairCard.title,
        action: pairCard.action_behavior,
        watchout: pairCard.overuse_warning
      });
    }

    // Ưu tiên trích xuất từ Cẩm nang đã xác nhận của B (Owner-Confirmed Manual of Target)
    const targetContexts = targetManual.context_cards || {};
    if (contextFilter && contextFilter !== 'all' && targetContexts[contextFilter]) {
      const ctxObj = VAGA_WORKPLACE_CONTEXTS.find((c) => c.id === contextFilter);
      action_tips_a_to_b.push({
        source: 'OWNER_CONFIRMED_MANUAL',
        card_id: `MANUAL-${contextFilter.toUpperCase()}`,
        context: contextFilter,
        title: `Theo Cẩm nang của ${targetManual.full_name} khi ${ctxObj ? ctxObj.label : contextFilter}`,
        action: targetContexts[contextFilter],
        watchout: 'Sở thích đã được chính chủ hồ sơ xác nhận và xuất bản.'
      });
    } else if (targetManual.dos_list && targetManual.dos_list.length > 0) {
      action_tips_a_to_b.push({
        source: 'OWNER_CONFIRMED_DO',
        card_id: 'MANUAL-DO-TOP1',
        context: 'direct_conversation',
        title: `Điều ${targetManual.full_name} mong muốn nhất khi phối hợp`,
        action: targetManual.dos_list[0],
        watchout: targetManual.donts_list?.[0] ? `Lưu ý tránh: ${targetManual.donts_list[0]}` : ''
      });
    }

    // Gợi ý thứ 3 dựa trên độ lệch Slider lớn nhất giữa A và B
    const topSliderDiff = [...sliderComparisons].sort((a, b) => b.diff - a.diff)[0];
    if (topSliderDiff && action_tips_a_to_b.length < 3) {
      const tipText =
        topSliderDiff.diff >= 2
          ? `Điều chỉnh về "${topSliderDiff.label}": Bạn đang ở mức ${topSliderDiff.viewer_val}/5 còn ${targetManual.full_name} ở mức ${topSliderDiff.target_val}/5 (${topSliderDiff.target_val >= 4 ? topSliderDiff.rightLabel : topSliderDiff.leftLabel}). Hãy chủ động dịch chuyển 1 nhịp về phía phong cách của họ.`
          : `Duy trì nhịp "${topSliderDiff.label}" đồng điệu hiện tại và thống nhất rõ kết quả đầu ra ở mỗi chặng.`;
      action_tips_a_to_b.push({
        source: 'WORKSTYLE_DELTA_RULE',
        card_id: `SLIDER-${topSliderDiff.id.toUpperCase()}`,
        context: 'delegation',
        title: `Cân chỉnh nhịp "${topSliderDiff.label}" từ ${viewerManual.full_name} → ${targetManual.full_name}`,
        action: tipText,
        watchout: 'Không ép đối phương phải thay đổi hoàn toàn bản sắc tự nhiên của họ.'
      });
    }

    // 4. Bảng đối chiếu 7 ngữ cảnh làm việc giữa A và B
    const vCtx = viewerManual.context_cards || {};
    const tCtx = targetManual.context_cards || {};
    const context_cheatsheet = VAGA_WORKPLACE_CONTEXTS.map((ctx) => ({
      context_id: ctx.id,
      label: ctx.label,
      icon: ctx.icon,
      viewer_preference: vCtx[ctx.id] || DISC_PROFILES[viewerManual.profile_code || vPrimary]?.manual_defaults?.contexts?.[ctx.id] || '',
      target_preference: tCtx[ctx.id] || DISC_PROFILES[targetManual.profile_code || tPrimary]?.manual_defaults?.contexts?.[ctx.id] || ''
    }));

    return {
      valid: true,
      direction: `${viewerManual.full_name} (A) → ${targetManual.full_name} (B)`,
      pair_code: pairKey,
      viewer: {
        id: viewerManual.id,
        full_name: viewerManual.full_name,
        department: viewerManual.department,
        position: viewerManual.position,
        primary_type: vPrimary,
        profile_code: viewerManual.profile_code || vPrimary,
        linear_scores: vScores
      },
      target: {
        id: targetManual.id,
        full_name: targetManual.full_name,
        department: targetManual.department,
        position: targetManual.position,
        primary_type: tPrimary,
        profile_code: targetManual.profile_code || tPrimary,
        linear_scores: tScores
      },
      dimension_deltas: deltas,
      slider_comparisons: sliderComparisons,
      similarities: similarities.slice(0, 4),
      potential_frictions: potential_frictions.slice(0, 4),
      action_tips_a_to_b: action_tips_a_to_b.slice(0, 3),
      context_cheatsheet,
      disclaimer:
        'Gợi ý phối hợp dựa trên xu hướng hành vi công việc và Cẩm nang đã xác nhận của đồng nghiệp. Không có điểm "% hợp nhau" cố định; mọi phong cách đều có thể cộng tác xuất sắc khi hiểu rõ kỳ vọng của nhau.'
    };
  }

  const exported = {
    roundDisplay1,
    validateMetricValue,
    classifyDISCProfile,
    shouldTriggerAdaptive,
    evaluateResponseQuality,
    calculateLikertResult,
    calculateResult,
    getProfileDetails,
    validateActionCardContext,
    comparePairProfiles
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
  root.DISCEngine = exported;
})(typeof window !== 'undefined' ? window : globalThis);
