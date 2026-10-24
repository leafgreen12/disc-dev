---
document_id: DOC-21_REVIEW_RELEASE_ACCEPTANCE
title: "DOC-21 — Review, nghiệm thu và bàn giao vận hành"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Review, nghiệm thu và bàn giao vận hành

## 1. Definition of Ready

Trước một task code: recipe/variant được chọn; các source hashes kiểm; contract delta ảnh hưởng có disposition; allowed paths được ràng buộc repo; stack/runtime/commands cần thiết có; actor/fixtures/observer được mô tả; privacy/secret/network scope rõ. Chưa đủ cho code thì nhận phần chuẩn bị, không giả READY đầy đủ.

Trước dữ liệu thật: thêm notice/căn cứ/lifecycle/IP/claims theo capability, reviewer thực, security/runtime evidence, hỗ trợ và khả năng xóa/restore. Không tất cả task đều cần nghiên cứu DISC, nhưng assessment/score-content/DISC pair phải đúng stage và claim.

## 2. Definition of Done theo mức

| Mức | Điều kiện để nói hoàn tất |
|---|---|
| Draft task | Có output file cụ thể, source trace, phương án và blocker |
| Code change | Diff đúng phạm vi, contract giữ nghĩa, tests actual theo tầng |
| Variant accepted | AC applicability được review; mọi critical assertion áp dụng đạt; phần chưa làm có nơi chịu trách nhiệm |
| People-ready | Ngoài kỹ thuật có gates pháp lý/nội dung/khoa học/HR phù hợp |
| Operations-ready | Runtime manifest, effective configuration, on-call, incident/rollback/restore được kiểm |

“22 tài liệu đã soạn” không là mức Code change. Một synthetic gate không được nói People-ready. Một local unit outcome không cho phép sửa trạng thái nguyên bản trong 375 AC.

## 3. PR và review

Dùng [PR template](handoff_templates/PULL_REQUEST_TEMPLATE.md). Reviewer đọc diff và kiểm source/target, không chỉ summary. Những biến đổi cần đặc biệt chú ý: thêm read path cho manager; DTO dư raw/key; normalization/rounding; fallback thành fake auth; audience change; TTL lấn quyền xóa; đổi classifier/feature; restoration của current rights.

Coder có thể nhờ agent rà code, nhưng automated review không thay maker–checker con người ở quyền/nguồn tài sản/claim/release. Reviewer có thể yêu cầu thu hẹp PR; không yêu cầu sửa expected cho khớp bug.

## 4. Quản lý blocker

Blocker phải có issue, source digests, variant, điều gì không xác định, tại sao ảnh hưởng, owner cần quyết định, phương án có tradeoff, việc vẫn làm được và bằng chứng đóng. Không dừng toàn project khi chỉ AI vendor chưa chọn; không tiếp tục protected payload khi authority chưa được thiết kế.

[BLOCKER_TEMPLATE](handoff_templates/BLOCKER_TEMPLATE.md) phân loại SOURCE_DRIFT, CONTRACT_CONFLICT, STACK_UNBOUND, TOOLING_MISSING, AUTHORITY_REQUIRED, EVIDENCE_MISSING, SCOPE_CHANGE, ENVIRONMENT_FAILURE. Owner chưa có ghi chưa bổ nhiệm, không ghi tên Trang như đã nhận việc.

## 5. Handoff giữa các phiên hoặc kỹ sư

Bàn giao current task/variant, base commit, changed files, commands đã chạy và actual outcomes, uncommitted work, source đã đọc, blocker và next command hợp lệ. Không chép private chain-of-thought; chỉ rationale cần thiết và bằng chứng công việc. Không hứa công việc chạy nền sau khi phiên đóng.

Người nhận phải kiểm git state, source revisions, hướng dẫn agent hiện hành và secrets scope trước tiếp tục. Không resume mù một phiên có assumptions cũ sau baseline đổi. Session history không thay source-of-truth contract.

## 6. Manifest và release

Release chuẩn bị bằng DOC20/17: capability thật bật, code/artifact/config, API/data schemas, authority/source policies, content/measurement bundles, claims, test inventory, failures/waivers, privacy/human review, stop/rollback/recovery. Không release từ `TASK_RESULT.status=COMPLETE` một mình.

Các nhánh chưa chọn phải có OFF evidence. Tiến trình xóa, support hoặc offboarding không được hoãn vì muốn release nhanh. Không có ngoại lệ chấp nhận leakage chỉ vì nội bộ ít người. Mọi waiver chỉ đúng rủi ro thấp/đường thay thế có bằng chứng và không vượt nghĩa vụ/claim scope.

## 7. Rollback, ngừng và xử lý hậu quả

Rollback mã không được hồi sinh rights/deletion/validity cũ. Khi source scoring/content sai, rút đúng source/claim và xử lý artifacts dẫn xuất; không viết lại raw input hoặc mạo danh owner sửa manual. Khi ngừng dịch vụ, phải giữ kênh quyền dữ liệu/case theo policy, xử lý keys/exports/buffers/backup trong scope.

Thông báo incident không đưa complaint/score/danh tính người liên quan cho toàn công ty. Đầu mối Security/Privacy quyết thông báo và evidence theo DOC14/17, không do agent tự gửi email hoặc mở ticket đối ngoại.

## 8. Checklist cuối bàn giao engineering

- [ ] Recipe/variant và baseline đích có chủ sở hữu thực.
- [ ] Các CR áp dụng được giải quyết bằng contract nhất quán, không chọn ngầm file mới nhất.
- [ ] Toolchain và build/test bindings đã chạy trên repo thực; missing không biến thành PASS.
- [ ] Secret/test-hook/private-bank exclusions được kiểm bằng artifact thực.
- [ ] Source/golden/AC không bị thay để ép code qua kiểm.
- [ ] Review quyền, dữ liệu, scoring/content và migration có evidence đúng tầng.
- [ ] Nguồn câu hỏi/thẻ/claims được phép đúng scope, AI/analytics/integration không tự bật.
- [ ] Runtime tests, a11y, restore, data rights, support và offboarding đủ phần áp dụng.
- [ ] Người nhận vận hành, incident và quyền dữ liệu được bổ nhiệm.
- [ ] Known gaps, residual risks và các bước còn lại được ghi đúng trạng thái.

Checklist hiện chưa được tick như evidence ứng dụng. Report DOC21 chỉ nói những gì đã kiểm trên artifact được giao.
