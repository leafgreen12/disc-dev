---
document_id: DOC-21_CONTEXT_CONTRACT_MAP
title: "DOC-21 — Bản đồ tài liệu, contract và context theo nhiệm vụ"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Bản đồ tài liệu, contract và context theo nhiệm vụ

## 1. Tổ chức nguồn

Corpus có 475 tệp lịch sử; task sử dụng 384 selector để đọc đúng WBS/FR/US/API/UI và ràng buộc chung. Selector là điểm bắt đầu, không lời khẳng định đã đủ context cho mọi thay đổi. Specialist sources tiếp tục nằm trong mỗi card với SHA-256. Khóa/chấm điểm/source nội bộ không được đưa vào frontend chỉ vì có trong corpus.

## 2. Bản đồ 22 tài liệu lõi

| ID | Trách nhiệm | Tệp |
|---|---|---|
| DOC-00 | Mã nguồn yêu cầu và quản trị | [DOC-00_DOCUMENTATION_MAP.md](DOC-00_DOCUMENTATION_MAP.md) |
| DOC-01 | Nhu cầu người dùng | [DOC-01_URD.md](DOC-01_URD.md) |
| DOC-02 | Nghiệp vụ và giới hạn | [DOC-02_BRD.md](DOC-02_BRD.md) |
| DOC-03 | Use Cases/ngoại lệ | [DOC-03_USE_CASES.md](DOC-03_USE_CASES.md) |
| DOC-04 | Stories/AC | [DOC-04_USER_STORIES.md](DOC-04_USER_STORIES.md) |
| DOC-05 | Function/field/state | [DOC-05_FRD.md](DOC-05_FRD.md) |
| DOC-06 | IA/flows | [DOC-06_IA_UX_FLOWS.md](DOC-06_IA_UX_FLOWS.md) |
| DOC-07 | Screen/component/copy | [DOC-07_UI_UX_SPECIFICATION.md](DOC-07_UI_UX_SPECIFICATION.md) |
| DOC-08 | Item/form/scale/provenance | [DOC-08_QUESTION_BANK_METADATA.md](DOC-08_QUESTION_BANK_METADATA.md) |
| DOC-09 | Numerical scoring/abstention | [DOC-09_SCORING_CLASSIFICATION.md](DOC-09_SCORING_CLASSIFICATION.md) |
| DOC-10 | Validation/evidence protocol | [DOC-10_PSYCHOMETRIC_VALIDATION_PROTOCOL.md](DOC-10_PSYCHOMETRIC_VALIDATION_PROTOCOL.md) |
| DOC-11 | Content/rule/source | [DOC-11_MODULAR_BEHAVIORAL_CONTENT.md](DOC-11_MODULAR_BEHAVIORAL_CONTENT.md) |
| DOC-12 | Data/transaction/lifecycle | [DOC-12_DATA_MODEL.md](DOC-12_DATA_MODEL.md) |
| DOC-13 | API/DTO/transport | [DOC-13_API_SPECIFICATION.md](DOC-13_API_SPECIFICATION.md) |
| DOC-14 | Security/privacy | [DOC-14_SECURITY_PRIVACY_SPECIFICATION.md](DOC-14_SECURITY_PRIVACY_SPECIFICATION.md) |
| DOC-15 | AI có điều kiện | [DOC-15_AI_LLM_PERSONALIZATION.md](DOC-15_AI_LLM_PERSONALIZATION.md) |
| DOC-16 | Test/evidence/release quality | [DOC-16_MASTER_TEST_QUALITY_PLAN.md](DOC-16_MASTER_TEST_QUALITY_PLAN.md) |
| DOC-17 | Deploy/restore/operations | [DOC-17_DEPLOYMENT_DEVOPS_OPERATIONS.md](DOC-17_DEPLOYMENT_DEVOPS_OPERATIONS.md) |
| DOC-18 | Enterprise integration có điều kiện | [DOC-18_ENTERPRISE_INTEGRATION.md](DOC-18_ENTERPRISE_INTEGRATION.md) |
| DOC-19 | Analytics có điều kiện | [DOC-19_PRODUCT_ANALYTICS_MEASUREMENT.md](DOC-19_PRODUCT_ANALYTICS_MEASUREMENT.md) |
| DOC-20 | Roadmap/scope/WBS | [DOC-20_PRODUCT_ROADMAP_RELEASE_PLAN.md](DOC-20_PRODUCT_ROADMAP_RELEASE_PLAN.md) |
| DOC-21 | Task/context/agent handoff | [DOC-21_CODEX_BUILD_PACK.md](DOC-21_CODEX_BUILD_PACK.md) |
## 3. Routing 50 phần công việc

| WP/variant | Task | Recipe nhắc trực tiếp | Loại nhiệm vụ |
|---|---|---|---|
| WP20-001 / `scope_baseline` | [TASK21-001](DOC-21_TASK_CARDS.md#task21-001) | R20-00 | PREPARATION_ONLY |
| WP20-001 / `architecture` | [TASK21-002](DOC-21_TASK_CARDS.md#task21-002) | R20-00 | PREPARATION_ONLY |
| WP20-002 / `test_foundation` | [TASK21-003](DOC-21_TASK_CARDS.md#task21-003) | R20-00 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-002 / `identity_core` | [TASK21-004](DOC-21_TASK_CARDS.md#task21-004) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-003 / `core_privacy` | [TASK21-005](DOC-21_TASK_CARDS.md#task21-005) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-003 / `assessment_purpose` | [TASK21-006](DOC-21_TASK_CARDS.md#task21-006) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-004 / `pair_purposes` | [TASK21-007](DOC-21_TASK_CARDS.md#task21-007) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-004 / `manual_draft` | [TASK21-008](DOC-21_TASK_CARDS.md#task21-008) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-005 / `manual_publication` | [TASK21-009](DOC-21_TASK_CARDS.md#task21-009) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-005 / `rights_core` | [TASK21-010](DOC-21_TASK_CARDS.md#task21-010) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-006 / `rights_manual` | [TASK21-011](DOC-21_TASK_CARDS.md#task21-011) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-006 / `rights_assessment` | [TASK21-012](DOC-21_TASK_CARDS.md#task21-012) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-007 / `rights_extensions` | [TASK21-013](DOC-21_TASK_CARDS.md#task21-013) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-007 / `support_core` | [TASK21-014](DOC-21_TASK_CARDS.md#task21-014) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-008 / `lifecycle_core` | [TASK21-015](DOC-21_TASK_CARDS.md#task21-015) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-008 / `lifecycle_domain_adapters` | [TASK21-016](DOC-21_TASK_CARDS.md#task21-016) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-009 / `general_catalog` | [TASK21-017](DOC-21_TASK_CARDS.md#task21-017) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-009 / `conditional_catalog` | [TASK21-018](DOC-21_TASK_CARDS.md#task21-018) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-010 / `operations_core` | [TASK21-019](DOC-21_TASK_CARDS.md#task21-019) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-010 / `scope_rehearsal` | [TASK21-020](DOC-21_TASK_CARDS.md#task21-020) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-011 / `core_ux` | [TASK21-021](DOC-21_TASK_CARDS.md#task21-021) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-011 / `manual_ux` | [TASK21-022](DOC-21_TASK_CARDS.md#task21-022) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-012 / `assessment_ux` | [TASK21-023](DOC-21_TASK_CARDS.md#task21-023) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-012 / `extension_ux` | [TASK21-024](DOC-21_TASK_CARDS.md#task21-024) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-013 / `manual_rollout` | [TASK21-025](DOC-21_TASK_CARDS.md#task21-025) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-013 / `measurement_route` | [TASK21-026](DOC-21_TASK_CARDS.md#task21-026) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-014 / `qualitative_evidence` | [TASK21-027](DOC-21_TASK_CARDS.md#task21-027) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-014 / `assessment_synthetic` | [TASK21-028](DOC-21_TASK_CARDS.md#task21-028) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-015 / `measurement_release` | [TASK21-029](DOC-21_TASK_CARDS.md#task21-029) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-015 / `research_governance` | [TASK21-030](DOC-21_TASK_CARDS.md#task21-030) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-016 / `study_infrastructure` | [TASK21-031](DOC-21_TASK_CARDS.md#task21-031) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-016 / `self_limited` | [TASK21-032](DOC-21_TASK_CARDS.md#task21-032) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-017 / `generic_actions` | [TASK21-033](DOC-21_TASK_CARDS.md#task21-033) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-017 / `pilot_rollout` | [TASK21-034](DOC-21_TASK_CARDS.md#task21-034) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-018 / `empirical_claims` | [TASK21-035](DOC-21_TASK_CARDS.md#task21-035) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-018 / `score_content_synthetic` | [TASK21-036](DOC-21_TASK_CARDS.md#task21-036) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-019 / `reviewed_self_content` | [TASK21-037](DOC-21_TASK_CARDS.md#task21-037) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-019 / `self_score_rollout` | [TASK21-038](DOC-21_TASK_CARDS.md#task21-038) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-020 / `literal_pair` | [TASK21-039](DOC-21_TASK_CARDS.md#task21-039) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-020 / `semantic_pair` | [TASK21-040](DOC-21_TASK_CARDS.md#task21-040) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-021 / `preference_rollout` | [TASK21-041](DOC-21_TASK_CARDS.md#task21-041) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-021 / `disc_pair_synthetic` | [TASK21-042](DOC-21_TASK_CARDS.md#task21-042) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-022 / `disc_pair_rollout` | [TASK21-043](DOC-21_TASK_CARDS.md#task21-043) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-022 / `enterprise_integration` | [TASK21-044](DOC-21_TASK_CARDS.md#task21-044) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-023 / `ai_task_release` | [TASK21-045](DOC-21_TASK_CARDS.md#task21-045) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-023 / `analytics_release` | [TASK21-046](DOC-21_TASK_CARDS.md#task21-046) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-024 / `operation_review` | [TASK21-047](DOC-21_TASK_CARDS.md#task21-047) | R20-01 | HUMAN_OWNED_AGENT_PREPARES |
| WP20-024 / `reminder_release` | [TASK21-048](DOC-21_TASK_CARDS.md#task21-048) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-025 / `classification_extension` | [TASK21-049](DOC-21_TASK_CARDS.md#task21-049) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
| WP20-025 / `norm_extension` | [TASK21-050](DOC-21_TASK_CARDS.md#task21-050) | R20-01 | IMPLEMENTATION_AFTER_BASELINE |
## 4. Cách lấy context

`--task` trả card và source IDs, `--excerpt` trả đúng object hoặc đoạn dòng. Mọi source phải qua hash check; file drift thì dừng, không lấy đoạn cùng số dòng ở version mới. JSON pointers không thực thi mã, không tự fetch `$ref` hoặc URL trong dữ liệu. Các `$ref` của API/schema được giải quyết bởi toolchain hợp đồng riêng sau review.

Bắt đầu với WBS/variant và CR chung, sau đó chỉ đọc các FR/US liên quan rồi DTO/UI. Khi sửa một shared field, mở đầy đủ usages từ API/DATA/UX và negative tests, không giới hạn cứng vào phần brief. Tiết kiệm context không được cắt điều kiện quyền, exception hoặc khác biệt phiên bản.

## 5. Những gì không thể suy từ nguồn

Scorer Python không quyết định backend phải là Python. OpenAPI không tạo máy chủ. Screen inventory không tạo frontend. File `approved` trong example không là authority. Tệp `DOC-09_PLAN_L40.json` không phải form nhân viên được phát hành. Hiểu đúng những phân biệt này là precondition của task, không công việc có thể bỏ vì đã parse JSON.

Sau khi có baseline đích, tạo context registry mới trỏ source và candidate/approved separately. Không sửa hashes của registry nguồn để mạo nhận các điều khoản mới đã có từ đầu. Nguồn bên ngoài chỉ dùng khi cần xác minh công nghệ hiện hành, ưu tiên tài liệu chính thức; không đưa API keys hoặc dữ liệu nhân viên vào query.
