---
document_id: PULL_REQUEST_TEMPLATE
title: "Mẫu PR — Vaga DISC"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Mẫu PR — Vaga DISC

## Task và phạm vi

Task/variant/recipe: CHƯA ĐIỀN. Baseline nguồn/đích và SHA: CHƯA ĐIỀN. Loại thay đổi: tài liệu / code / data / policy / tests / operation. Người review tương ứng: CHƯA BỔ NHIỆM.

## Thay đổi có chủ đích

Nêu hành vi trước/sau, trường/state/endpoint bị ảnh hưởng, file paths và lý do. Phần ngoài phạm vi giữ OFF. Không dùng “refactor nhỏ” để che thay đổi quyền hoặc scoring.

## Contract và quyền

Actor/object/purpose/source validity; DTO được phép; data lifecycle; CAS/idempotency; R/I; labels/null/missing; dependency version; migration/rollback. Ghi CR nào APPLIED thực và bằng chứng, CR nào chỉ đề xuất.

## Kiểm đã chạy

| AC/assertion | Test/tầng | Command/build/config | Actual | Artifact/hash | Giới hạn |
|---|---|---|---|---|---|

Bảng trống không phải PASS. Ghi riêng NOT_RUN/BLOCKED/INCONCLUSIVE và lý do.

## Dữ liệu và bảo mật

Không secrets/dữ liệu thật, private source keys hoặc test bypass trong artifact. Canary/negative/race/cleanup đã kiểm ở đâu, thiếu gì? Screenshots/traces synthetic đã rà redaction chưa?

## Review và bước tiếp

Known issues, residual risks, blockers/owner, next step. Author và reviewers thực ký ở workflow tổ chức sau review, không điền tên từ tài khoản chat.
