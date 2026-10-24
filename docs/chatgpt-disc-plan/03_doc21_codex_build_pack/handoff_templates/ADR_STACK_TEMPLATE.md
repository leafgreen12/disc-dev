---
document_id: ADR_STACK_TEMPLATE
title: "Mẫu ADR — Lựa chọn kỹ thuật theo capability"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Mẫu ADR — Lựa chọn kỹ thuật theo capability

## Context
Recipe/variant, workload đã xác nhận và phần chưa biết, nhân sự/vận hành, constraints dữ liệu/identity/region.

## Alternatives
Với mỗi phương án: runtime/DB/identity/hosting đề xuất; ai vận hành; khả năng CAS/transactions/fencing/R-I, snapshot/precision, storage/erasure/backup, artifact exclusions và testing. Giá/phiên bản phải có nguồn khi thực sự chọn, không điền latest.

## Proof plan
R trước I qua topology/proxy nào, multiple worker/fence, restore không hồi sinh rights, parser precision, role/tenant denied-before-read; dữ liệu synthetic; observer; exit/cleanup.

## Decision
PROPOSED_NOT_APPROVED. Người chốt, phạm vi và evidence còn trống. Chỉ ghi lựa chọn sau khi có authority; spike fail cần lưu counterexample.

## Consequences
Contract delta, migration/dependency, commands cần bind, known risks, rollback và điều kiện review lại.
