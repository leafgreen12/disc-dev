---
document_id: DOC-21_TRACEABILITY
title: "DOC-21 — Truy vết nhiệm vụ và nguồn yêu cầu"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Truy vết nhiệm vụ và nguồn yêu cầu

## 1. Cách đọc

Một story có primary WP nguồn và một hoặc nhiều variant task tương ứng. Bảng không nói mỗi task phải thực hiện mọi AC trong pool hoặc mọi API liên quan. Trước triển khai phải chọn assertion/applicability theo phạm vi, giữ phần còn lại và người chịu trách nhiệm. SOURCE_POOL_ROUTING không phải test coverage.

## 2. Truy vết 75 story

| US / FR | WP đầu mối | Tasks / variants | AC nguồn | Trạng thái |
|---|---|---|---|---|
## 3. Truy vết ngược và các phần chuyên môn

Mỗi task có source_fr_ids/source_story_ids/source_ac_pool trong registry. Những WP nghiên cứu/quyết định không có story đầu mối vẫn có WBS, protocol và gate riêng; không tạo US giả để làm bảng đủ. API/UI trong context sources là nguồn contract liên quan, không phải mọi operation đều nằm trong scope của variant.

375 source AC và 447 TC16 vẫn giữ trạng thái chưa chạy ứng dụng. Việc DOC21 kiểm selector/hashes không tạo runtime evidence cho các hàng trên. New CR/DEC chỉ là đề xuất; chỉ baseline đích có disposition/approval thật mới được bind vào source code sản phẩm.

## 4. Kiểm đóng gói

Verifier đối chiếu đúng tập WP+variant, task unique, source refs tồn tại, bản ghi US/FR/AC khớp DOC20/04/05 và file hashes. Thay đổi task routing phải version registry; không dùng ID thứ tự như một thứ tự lịch triển khai. Review semantic field-level và runtime coverage vẫn thuộc các task triển khai/QA.
