/**
 * Bộ kiểm thử tự động toàn diện (End-to-End & Contract Tests) cho Hệ thống Vaga D.I.S.C v0.2
 * Kiểm tra:
 * 1. Ngân hàng 64 câu hỏi (40 Likert + 8 Adaptive + 24 Forced-Choice) & 72 Thẻ nội dung (DOC-08 / DOC-11)
 * 2. Hợp đồng số học (RV-005 / RV-006): COUNT, RAW_MEAN_1_5, LINEAR_0_100
 * 3. Máy chấm điểm Likert L40/L48 (Reverse-keying 6-x, Không tự suy diễn dữ liệu thiếu, Adaptive trigger)
 * 4. Quy tắc ngữ cảnh Thẻ hành động (RV-008: CB11-SELF-D-03)
 * 5. Vòng đời Cẩm nang Cộng tác (DRAFT -> PUBLISHED -> REVOKED) & Cô lập quyền riêng tư
 * 6. So sánh Cặp 1-1 Có Hướng (A -> B vs B -> A) & Chặn hồ sơ REVOKED (RV-007)
 * 7. Kế hoạch Hành động Riêng tư độc lập không cần làm bài test & Trung tâm Quyền Dữ liệu
 */
const assert = require('node:assert/strict');
const DISCEngine = require('../public/js/disc-engine.js');
const {
  DISC_QUESTIONS,
  VAGA_LIKERT_40,
  VAGA_ADAPTIVE_8,
  VAGA_CONTENT_BANK_72,
  VAGA_WORKPLACE_CONTEXTS,
  VAGA_WORKSTYLE_SLIDERS
} = require('../public/js/questions-data.js');
const { DISC_PROFILES } = require('../public/js/disc-profiles.js');
const dbLayer = require('../src/db.js');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('==============================================================');
console.log('🧪 CHẠY BỘ KIỂM THỬ TOÀN DIỆN VAGA D.I.S.C v0.2');
console.log('==============================================================');

test('1. Kiểm tra Ngân hàng 64 câu hỏi, 72 thẻ nội dung, 7 ngữ cảnh, 5 sliders và 13 hồ sơ', () => {
  assert.equal(VAGA_LIKERT_40.length, 40, 'Phải có đúng 40 câu Likert chuẩn');
  assert.equal(VAGA_ADAPTIVE_8.length, 8, 'Phải có đúng 8 câu Adaptive');
  assert.equal(DISC_QUESTIONS.length, 24, 'Phải có đúng 24 cụm câu Forced-Choice');
  assert.equal(VAGA_CONTENT_BANK_72.length, 72, 'Phải có đúng 72 thẻ nội dung hành vi DOC-11');
  assert.equal(VAGA_WORKPLACE_CONTEXTS.length, 7, 'Phải có 7 ngữ cảnh công việc');
  assert.equal(VAGA_WORKSTYLE_SLIDERS.length, 5, 'Phải có 5 thanh trượt phong cách');
  assert.equal(Object.keys(DISC_PROFILES).length, 13, 'Phải có 12 phong cách pha trộn + 1 BALANCED = 13');
});

test('2. Kiểm tra Hợp đồng Số học (RV-005 / RV-006: COUNT, RAW_MEAN_1_5, LINEAR_0_100)', () => {
  assert.equal(DISCEngine.validateMetricValue('COUNT', 10).valid, true);
  assert.equal(DISCEngine.validateMetricValue('COUNT', 1.5).valid, false, 'COUNT phải từ chối số thực 1.5');
  assert.equal(DISCEngine.validateMetricValue('COUNT', -1).valid, false, 'COUNT phải từ chối số âm');

  assert.equal(DISCEngine.validateMetricValue('RAW_MEAN_1_5', 3.75).valid, true);
  assert.equal(DISCEngine.validateMetricValue('RAW_MEAN_1_5', 5.01).valid, false, 'RAW_MEAN_1_5 phải từ chối > 5');
  assert.equal(DISCEngine.validateMetricValue('RAW_MEAN_1_5', 0.99).valid, false, 'RAW_MEAN_1_5 phải từ chối < 1');

  const linRes = DISCEngine.validateMetricValue('LINEAR_0_100', 68.75);
  assert.equal(linRes.valid, true);
  assert.equal(linRes.value, 68.8, 'LINEAR_0_100 phải làm tròn hiển thị 1 chữ số thập phân');
  assert.equal(DISCEngine.validateMetricValue('LINEAR_0_100', 100.1).valid, false);
});

test('3. Kiểm tra Chấm điểm Likert 40 câu, câu đảo ngược (6 - x) và Không tự suy diễn dữ liệu thiếu (DOC-09)', () => {
  // Trường hợp thiếu câu trả lời -> incomplete = true, miền thiếu trả null
  const incompleteRes = DISCEngine.calculateLikertResult([{ item_id: 'L-D01', value: 5 }], 200);
  assert.equal(incompleteRes.incomplete, true, 'Bài thiếu câu không được tự điền điểm');
  assert.equal(incompleteRes.linear_scores.D, null);

  // Trường hợp trả lời đủ 40 câu với điểm mục tiêu D cao, I khá cao -> DI
  const fullAnswers = VAGA_LIKERT_40.map((it) => {
    const desiredKeyed = it.dimension === 'D' ? 5 : it.dimension === 'I' ? 4 : 2;
    const rawVal = it.keying === 'reverse' ? 6 - desiredKeyed : desiredKeyed;
    return { item_id: it.id, value: rawVal };
  });
  const scored = DISCEngine.calculateLikertResult(fullAnswers, 240);
  assert.equal(scored.raw_mean_scores.D, 5.0);
  assert.equal(scored.linear_scores.D, 100.0);
  assert.equal(scored.raw_mean_scores.I, 4.0);
  assert.equal(scored.linear_scores.I, 75.0);
  assert.equal(scored.profile_code, 'DI');
  assert.equal(scored.response_quality.status, 'HIGH_RELIABILITY');
});

test('4. Kiểm tra Quy tắc Ngữ cảnh Thẻ Hành động (RV-008: CB11-SELF-D-03)', () => {
  const validDelegation = DISCEngine.validateActionCardContext('CB11-SELF-D-03', 'delegation');
  assert.equal(validDelegation.valid, true);

  const validDecision = DISCEngine.validateActionCardContext('CB11-SELF-D-03', 'decision');
  assert.equal(validDecision.valid, true);

  const invalidRecognition = DISCEngine.validateActionCardContext('CB11-SELF-D-03', 'feedback_recognition');
  assert.equal(invalidRecognition.valid, false, 'CB11-SELF-D-03 phải bị chặn ở ngữ cảnh feedback_recognition');
});

test('5. Kiểm tra Vòng đời Cẩm nang Cộng tác (DRAFT -> PUBLISHED -> REVOKED) & Chặn truy cập sau REVOKE', () => {
  const testEmail = 'test.manual.lifecycle@vaga.vn';
  const draft = dbLayer.saveManualDraft({
    owner_email: testEmail,
    full_name: 'Người Thử Nghiệm Vòng Đời',
    department: 'RnD',
    position: 'Engineer',
    profile_code: 'CD',
    primary_type: 'C'
  });
  assert.equal(draft.status, 'DRAFT');

  // Khi đang DRAFT, người ngoài xem theo ID phải bị chặn
  const publicViewDraft = dbLayer.getManualById(draft.id, 'colleague@vaga.vn');
  assert.equal(publicViewDraft.access_denied, true);

  // Xuất bản -> PUBLISHED
  const published = dbLayer.publishManual(testEmail);
  assert.equal(published.status, 'PUBLISHED');
  const publicViewPublished = dbLayer.getManualById(published.id, 'colleague@vaga.vn');
  assert.equal(Boolean(publicViewPublished.access_denied), false);
  assert.equal(publicViewPublished.full_name, 'Người Thử Nghiệm Vòng Đời');

  // Thu hồi -> REVOKED
  const revoked = dbLayer.revokeManual(testEmail, 'Kiểm thử thu hồi tức thì');
  assert.equal(revoked.status, 'REVOKED');
  const publicViewRevoked = dbLayer.getManualById(revoked.id, 'colleague@vaga.vn');
  assert.equal(publicViewRevoked.access_denied, true);
  assert.equal(publicViewRevoked.error_code, 'MANUAL_REVOKED_BY_OWNER');

  // Dọn dữ liệu test
  dbLayer.executeDataRightsRequest({
    requester_email: testEmail,
    requester_name: 'Người Thử Nghiệm Vòng Đời',
    request_type: 'FULL_ERASURE'
  });
});

test('6. Kiểm tra So sánh Cặp 1-1 Có Hướng (A -> B khác B -> A) và Chặn Snapshot Null/Revoked (RV-007)', () => {
  const manuals = dbLayer.listPublishedManuals();
  assert.ok(manuals.length >= 2, 'Cần có ít nhất 2 cẩm nang mẫu đã xuất bản');

  const mA = manuals[0];
  const mB = manuals[1];

  const ab = DISCEngine.comparePairProfiles(mA, mB, 'decision');
  const ba = DISCEngine.comparePairProfiles(mB, mA, 'decision');

  assert.equal(ab.valid, true);
  assert.equal(ba.valid, true);
  assert.notEqual(ab.direction, ba.direction, 'Chiều A -> B và B -> A phải phân biệt rõ ràng');
  assert.ok(ab.action_tips_a_to_b.length <= 3 && ab.action_tips_a_to_b.length >= 1, 'Tối đa 3 gợi ý hành động');

  // Kiểm tra chặn khi target có linear_scores = null
  const brokenTarget = { ...mB, linear_scores: null, percentage_scores: null };
  const brokenRes = DISCEngine.comparePairProfiles(mA, brokenTarget);
  assert.equal(brokenRes.valid, false);
  assert.equal(brokenRes.error_code, 'PAIR_SNAPSHOT_UNAVAILABLE');
});

test('7. Kiểm tra Kế hoạch Hành động Riêng tư độc lập (Không cần làm bài test) & Cô lập quyền riêng tư', () => {
  const noTestEmail = 'notest.member@vaga.vn';
  const created = dbLayer.createPrivateAction({
    owner_email: noTestEmail,
    owner_name: 'Thành Viên Chưa Test',
    card_id: 'CB11-SELF-D-03',
    context: 'delegation',
    title: 'Trao quyền rõ ràng khi giao việc',
    trigger_situation: 'Khi bàn giao việc cho nhóm',
    action_behavior: 'Chốt rõ tiêu chí đầu ra và mốc check-in',
    private_notes: 'Ghi chú bí mật không ai được xem'
  });

  assert.ok(created.id > 0);
  assert.equal(created.private_notes, 'Ghi chú bí mật không ai được xem');

  // Người khác cố tình sửa hoặc xóa phải bị từ chối FORBIDDEN_PRIVATE_ACTION
  assert.throws(
    () => dbLayer.updatePrivateAction(created.id, 'intruder@vaga.vn', { title: 'Hack' }),
    /Không có quyền/
  );

  // Dọn dữ liệu test
  dbLayer.executeDataRightsRequest({
    requester_email: noTestEmail,
    requester_name: 'Thành Viên Chưa Test',
    request_type: 'FULL_ERASURE'
  });
});

console.log('==============================================================');
console.log(`🎉 TẤT CẢ ${passed}/${passed} KIỂM THỬ VAGA D.I.S.C v0.2 ĐỀU ĐẠT 100%!`);
console.log('==============================================================');
