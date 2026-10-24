---
document_id: CHECKPOINT_BUILD_START
title: "Checkpoint — Sau DOC-21: bắt đầu bằng TASK21-001"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Checkpoint — Sau DOC-21: bắt đầu bằng TASK21-001

## 1. Điểm dừng thực tế

**DOC-00–DOC-21: 22/22 tài liệu lõi đã soạn bản thảo**, không còn DOC22 trong danh mục. Toàn bộ vẫn REVIEW_DRAFT / NOT_APPROVED. Hoàn thành tài liệu không là quyết định chấp nhận chính sách, chọn công nghệ, cấp quyền làm bài hoặc triển khai hệ thống.

DOC21 có 50 hồ sơ cho 50 variant WP20, nguồn đọc theo task, AGENTS và template, hợp đồng/gói hướng dẫn và helper cục bộ. Corpus 475 tệp đợt18 giữ nguyên byte. Chưa có source sản phẩm/repository, command bindings, database, auth provider, testing runtime, nghiên cứu người thật hoặc chữ ký phê duyệt. Không có tiến trình tự thực hiện bước tiếp theo.

## 2. Mở đúng điểm bắt đầu

Đọc [START_HERE](DOC-21_START_HERE.md), [AGENTS](AGENTS.md), [baseline authority](DOC-21_BASELINE_AUTHORITY.md), [task cards](DOC-21_TASK_CARDS.md#task21-001), [roadmap nguồn](DOC-20_PRODUCT_ROADMAP_RELEASE_PLAN.md) và [ma trận CR](DOC-20_BASELINE_RECONCILIATION.md). Dùng [prompt khởi đầu](CODEX_START_PROMPT.md) khi đã mở bản làm việc riêng trong Codex.

```bash
python handoff_doc21.py --verify-sources
python handoff_doc21.py --task TASK21-001
python handoff_doc21.py --recipe R20-00
python handoff_doc21.py --excerpt SRC21-0001
```

Những lệnh trên chỉ đọc/kiểm gói; không gọi Codex hoặc tạo ứng dụng. `--check-gates` trả exit3 có chủ đích vì quyền phát hành còn bị chặn. `verify_doc21.py` kiểm tệp và helper; cần jsonschema đã cài, không tự tải dependency.

## 3. Công việc cần giao ngay

**TASK21-001 / WP20-001 / scope_baseline:** soạn ứng viên R20-00 và delta R20-01 trong `handoff_work/task21-001/`. Bốn file đầu ra: source-read-receipt.json, candidate-scope.md, contract-delta-matrix.md, blocker-register.md. Phải ghi nguồn đã thực đọc; hồ sơ không có chữ ký hoặc trạng thái APPLIED giả.

**TASK21-002 / WP20-002 / architecture:** sau review phạm vi, chuẩn bị ADR và kế hoạch spike. Thông tin chưa có gồm đội kỹ thuật, quy mô/tải, điều kiện vận hành, nguồn danh tính và dữ liệu. Có thể lập phương án khi chưa có tất cả số; không tự dùng stack của dự án khác. Việc chọn phương án thuộc owner, không agent.

**TASK21-003 / WP20-003 / test_foundation:** sau lựa chọn kỹ thuật/contract phù hợp, tạo bản repository thực và gắn lệnh build/test. Phải kiểm OpenAPI độc lập, dựng positive-control observers và namespace synthetic. Đây là task kế tiếp có điều kiện, chưa được thực thi trong đợt DOC21.

## 4. Các điểm chưa được tự chốt

| Vấn đề | Người cần quyết định | Việc vẫn có thể làm |
|---|---|---|
| Phạm vi R20 và người chịu trách nhiệm | PO/HR | Soạn bản ứng viên và danh sách ảnh hưởng |
| Bảy CR nền + identity/OIDC phần chọn | BA/Tech/Security/Privacy | Lập diff hợp đồng, không sửa nguồn lịch sử |
| Stack/DB/auth/hosting/workload | Tech/Ops/PO | Ma trận khả năng và kế hoạch thử rủi ro |
| Thông báo, vòng đời, dữ liệu người lao động | Privacy/Legal/HR | Dataflow, inventory, test synthetic |
| Bộ câu hỏi/nội dung/claim | Psychometric/Content/IP | Review bản nháp và protocol riêng |
| Command bindings/repository/test runtime | Engineering/QA | Tool contract và các yêu cầu harness |

Không bắt đóng mọi DEC để chuẩn bị một task nhỏ; nhưng không bỏ guard đang áp dụng. Chưa chọn AI/analytics/HRIS/SCIM thì chúng giữ OFF, không chặn manual chuẩn bị. Xác thực, hỗ trợ, quyền dữ liệu, offboarding và restore không được hoãn quá mốc dùng người thật.

## 5. Những mã và khoảng trống giữ nguyên

Giữ UR/BR/BIZ/UC/US/AC/FR/UI/API/DATA/TC16, WP20/variants/R20. Quyết định DOC21: DEC-277–290; nếu cần quyết định mới sau này bắt đầu DEC-291, không đánh lại mã cũ. CR21-01–02 chỉ đề xuất tổ chức handoff, chưa APPLIED.

GAP20-16 đã có **phần tài liệu handoff**, nhưng repo/commands/runtime evidence chưa có nên không đóng toàn gap. GAP16-03/GAP20-05 về validator OpenAPI độc lập vẫn mở. Các gap về khoa học, nội dung, pháp lý, quyền, xóa/restore, usability và vận hành không đổi trạng thái từ kết quả checker.

## 6. Lệnh tiếp nối đúng phạm vi

> Bắt đầu TASK21-001 bằng gói DOC21. Kiểm nguồn, đọc đúng excerpt, soạn bốn file baseline ứng viên trong handoff_work/task21-001. Không tạo ứng dụng, chọn stack, sửa nguồn DOC00–20, gọi nhà cung cấp hoặc ký approval. Báo file thật, lệnh thật, kết quả thật và các quyết định tối thiểu cần cho TASK21-002.

Không yêu cầu tác vụ chạy nền. Không gọi việc kết thúc DOC21 là 100% dự án phần mềm hoàn thành.
