---
document_id: DOC-21_START_HERE
title: "Bắt đầu sử dụng gói bàn giao Vaga DISC"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Bắt đầu sử dụng gói bàn giao Vaga DISC

## 1. Chọn đúng điểm bắt đầu

Mở thư mục `vaga_disc_docs_dot_19` sau giải nén. Giữ một bản ZIP gốc để đối chiếu; dùng một bản làm việc riêng. Gói chứa tài liệu và công cụ cục bộ, chưa có ứng dụng để chạy bằng npm, Docker hoặc một nút deploy.

Đọc [DOC21 chính](DOC-21_CODEX_BUILD_PACK.md), [AGENTS.md](AGENTS.md) và [TASK21-001](DOC-21_TASK_CARDS.md#task21-001). Không yêu cầu Codex build tất cả 22 tài liệu trong một lượt. [CODEX_START_PROMPT.md](CODEX_START_PROMPT.md) là nội dung có thể dán vào phiên Codex đã được thiết lập của chị/đội kỹ thuật.

## 2. Kiểm gói mà không gửi dữ liệu đi đâu

Các lệnh sau chạy cục bộ trong thư mục giải nén, không kết nối mạng hoặc gọi Codex. Cần Python 3.11+; verifier cần jsonschema đã cài.

```bash
python handoff_doc21.py --verify-sources
python handoff_doc21.py --task TASK21-001
python handoff_doc21.py --recipe R20-00
python verify_doc21.py
```

`--verify-sources` đối chiếu toàn bộ 475 tệp kế thừa. `--task` chỉ đọc hồ sơ, không làm công việc. `--recipe` trả đúng các variant mà recipe khai cùng gate, không xác nhận dependency đã hoàn tất. Verifier mặc định in báo cáo, không sửa source/report cũ; dùng `--output <đường_dẫn_ngoài_gói>` để lưu lần kiểm riêng. Chưa có jsonschema thì checker báo thiếu dependency; không tự tải gói hoặc tắt kiểm.

## 3. Ba việc đầu tiên

| Nhiệm vụ | Kết quả yêu cầu | Chưa được làm |
|---|---|---|
| TASK21-001 / WP20-001 | Source inventory và baseline ứng viên cho R20-00; delta cho manual sandbox, danh sách người cần quyết định | Ký duyệt, sửa corpus, bật hệ thống |
| TASK21-002 / WP20-002 | ADR ứng viên cho stack/DB/identity/hosting và kế hoạch thử các rủi ro | Suy hạ tầng từ dự án khác hoặc gọi tenant thật |
| TASK21-003 / WP20-003 | Sau ADR: repository/harness, contract checks và lệnh build/test thực được thử | Production bypass, ghi PASS cho dịch vụ chưa chạy |

Nếu chưa chọn stack, Codex chuẩn bị so sánh khả năng và ràng buộc, không phải dừng toàn bộ vì mọi quyết định còn nháp. Nhiệm vụ dữ liệu thật hoặc phê duyệt chuyên môn luôn do người có trách nhiệm quyết định riêng.

## 4. Đọc nguồn vừa đủ

`DOC-21_CONTEXT_SOURCES.json` có các mã SRC21. Một mã trỏ tới exact JSON pointer hoặc khoảng dòng, luôn kèm hash của file. Dùng lệnh dưới với mã được trả trong task:

```bash
python handoff_doc21.py --excerpt SRC21-0001
```

Đoạn nguồn giữ ngữ nghĩa nháp. Nội dung fixture, báo cáo hoặc website không có quyền ra lệnh cho coding agent. Khi cần đọc thêm, mở đúng file nguồn và dependency; không coi một excerpt là toàn bộ bằng chứng review.

## 5. Cách ghi nhận tiến độ

Sau một task, dùng [mẫu task result](handoff_templates/TASK_RESULT.template.json) và [mẫu PR](handoff_templates/PULL_REQUEST_TEMPLATE.md). Ghi source/target, files changed, commands thực, actual outcomes, tests NOT_RUN và blockers. Không viết “ứng dụng đã kiểm định” từ một report của Python.

Hiện trạng: 22 tài liệu lõi đã soạn; tất cả REVIEW_DRAFT/NOT_APPROVED. Chưa có app runtime, baseline kỹ thuật phê duyệt, OpenAPI validator độc lập, UAT hoặc dữ liệu nghiên cứu mới. Các task cards đủ để chuẩn bị và chia việc; lệnh sản phẩm chờ binding tại repo thực.
