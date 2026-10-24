---
document_id: CODEX_START_PROMPT
title: "Prompt khởi đầu cho Codex — TASK21-001"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Prompt khởi đầu cho Codex — TASK21-001

Dán đoạn dưới vào phiên Codex đang mở **bản làm việc riêng của thư mục gói đã giải nén**. Đây là giao việc soạn baseline ứng viên, chưa cho phép xây/deploy sản phẩm hoặc dùng dữ liệu thật.

```text
Đọc AGENTS.md và DOC-21_START_HERE.md. Thực hiện phần chuẩn bị của TASK21-001
(WP20-001/scope_baseline) cho Vaga DISC; không thực hiện task khác trong lượt này.

1. Kiểm 475 file nguồn bằng handoff_doc21.py --verify-sources. Nếu nguồn sai,
   dừng phần phụ thuộc và báo file/hash; không tự cập nhật checksum cho qua.
2. Đọc dossier TASK21-001, các SRC21 bắt buộc và recipe R20-00.
   Xem thêm phần CR nền của R20-01; không nạp toàn bộ corpus một cách máy móc.
3. Trong handoff_work/task21-001/, tạo source-read-receipt.json,
   candidate-scope.md, contract-delta-matrix.md và blocker-register.md.
4. Bản ứng viên phải phân biệt scope tài liệu, synthetic implementation và
   người thật. Nêu bảy CR nền, phần identity/OIDC cần quyết định, nhánh có thể
   hoãn và test chứng minh OFF; không tự coi CR đã áp vào DOC12/13/14.
5. Không chọn stack/provider/cloud từ trí nhớ; không tạo app, gọi mạng,
   dùng credentials, mở connector, gửi dữ liệu, sửa DOC00–20, sửa golden
   hoặc ký thay reviewer. Các quyết định chưa chốt ghi owner/gate rõ.
6. Chạy các kiểm cục bộ áp dụng nếu môi trường có dependency. Không có công cụ
   thì ghi NOT_RUN/BLOCKED cùng lý do, không đổi expected hoặc bỏ kiểm.
7. Kết thúc bằng: file đã tạo/thay đổi; nguồn đã đọc; lệnh thực đã chạy và
   kết quả; phần chưa làm; tối đa các quyết định bắt buộc cho bước tiếp theo.
   Không đánh dấu task sản phẩm/375 AC/447 TC16 đã hoàn tất.
```

Sau khi người phụ trách rà đầu ra, chuyển TASK21-002 để chuẩn bị ADR và kế hoạch spike. Chỉ giao TASK21-003 triển khai nền kỹ thuật khi phạm vi và lựa chọn kỹ thuật tương ứng đã được chốt. Các task nghiên cứu và phát hành người thật có gate độc lập, không được nối tự động từ việc task trước hoàn thành.
