---
document_id: README
title: "Vaga DISC — Đợt 19: DOC-21 và bộ 22 tài liệu lõi"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# Vaga DISC — Đợt 19: DOC-21 và bộ 22 tài liệu lõi

## 1. Bắt đầu tại đây

**22/22 tài liệu lõi DOC-00 đến DOC-21 đã soạn bản thảo.** Tất cả còn REVIEW_DRAFT / NOT_APPROVED. Đây là gói tài liệu và công cụ cục bộ, không source sản phẩm đã triển khai.

**Đọc trước:** [DOC-21_START_HERE.md](DOC-21_START_HERE.md). **Prompt giao việc đầu tiên:** [CODEX_START_PROMPT.md](CODEX_START_PROMPT.md). **Danh mục toàn bộ 22 tài liệu:** [context/contract map](DOC-21_CONTEXT_CONTRACT_MAP.md) và [document index JSON](DOC-21_DOCUMENT_INDEX.json).

Không đưa tất cả hàng trăm tệp vào một prompt “build toàn bộ”. Chọn TASK21, variant và nguồn chính xác. TASK21-001 chuẩn bị baseline; TASK21-002 chuẩn bị ADR; TASK21-003 chỉ triển khai nền kỹ thuật sau lựa chọn tương ứng.

## 2. Bộ Markdown DOC21

| Tài liệu | Nội dung |
|---|---|
| [DOC21 chính](DOC-21_CODEX_BUILD_PACK.md) | Hướng dẫn bàn giao kỹ thuật, 20 phần và trạng thái từng lớp |
| [Bắt đầu](DOC-21_START_HERE.md) | Thao tác kiểm gói, mở task và đầu ra đầu tiên |
| [Context và contract](DOC-21_CONTEXT_CONTRACT_MAP.md) | 22 tài liệu, 50 lộ trình task, cách đọc từng nguồn |
| [Baseline và thẩm quyền](DOC-21_BASELINE_AUTHORITY.md) | Xử lý mâu thuẫn, bản ứng viên, approval và CR theo scope |
| [Repo và coding agent](DOC-21_REPOSITORY_AGENT_GUIDE.md) | Cấu trúc đề xuất, AGENTS, ranh giới source/private/test/evidence |
| [50 thẻ nhiệm vụ](DOC-21_TASK_CARDS.md) | Đúng WP/variant, nguồn, phạm vi, ca lỗi, quan sát, đầu ra và điểm dừng |
| [Bootstrap và lệnh](DOC-21_BOOTSTRAP_COMMANDS.md) | Bảy lệnh cục bộ; 15 chỗ gắn lệnh sản phẩm còn UNBOUND |
| [Kiểm thử/CI](DOC-21_TEST_CI_ENGINEERING_HANDOFF.md) | Applicability AC, fixture, observer, race và bằng chứng theo tầng |
| [PR/review/nghiệm thu](DOC-21_REVIEW_RELEASE_ACCEPTANCE.md) | Ready/Done, người duyệt, quyền, release và rollback |
| [Truy vết](DOC-21_TRACEABILITY.md) | 75 FR/75 US/375 AC nguồn đến task/variant |
| [Quyết định và nguồn](DOC-21_DECISIONS_AND_REFERENCES.md) | DEC-277–290, CR21-01–02 và tám nguồn chính thức |
| [Hợp đồng công cụ](DOC-21_LOCAL_TOOL_CONTRACTS.md) | Selector, path/hash, CLI, schema và giới hạn |
| [Báo cáo kiểm tra](DOC-21_VALIDATION_REPORT.md) | Kết quả thực chạy và phần chưa kiểm |
| [Điểm bắt đầu build](CHECKPOINT_BUILD_START.md) | Sau DOC21 không có DOC22; bước tiếp là TASK21-001 |

Phụ lục không tăng số tài liệu lõi. 50 task là dossier, chưa dispatch hoặc thực hiện. Bản README lịch sử giữ nguyên trạng thái tại thời điểm cũ, không ghi đè hiện trạng.

## 3. Agent, schema và công cụ

[AGENTS.md](AGENTS.md) thực sự có trong root, áp cho bản làm việc gói này. Bốn mẫu hướng dẫn riêng frontend/domain/tests/operations ở `agent_templates/`; chỉ phát huy phạm vi mong muốn sau khi được chép đúng vị trí repository tương lai. Không tự thay global config hoặc `.codex/config.toml` đang dùng. Tệp [config.toml.example](.codex/config.toml.example) là ví dụ không hoạt động.

[Task Registry](DOC-21_TASK_REGISTRY.json), [Context Sources](DOC-21_CONTEXT_SOURCES.json), [Variant Routing](DOC-21_VARIANT_ROUTING.json), [Command Registry](DOC-21_COMMAND_REGISTRY.json), [Baseline Candidate](DOC-21_BASELINE_CANDIDATE.json) và [JSON Schema](DOC-21_HANDOFF_CONTRACTS.schema.json) là metadata handoff.

[Helper đọc nguồn](handoff_doc21.py) dùng thư viện chuẩn Python; [verifier](verify_doc21.py) dùng thêm jsonschema đã cài. Yêu cầu Python3.11+ cho verifier. Các [fixture tổng hợp](DOC-21_LOCAL_FIXTURES.json) kiểm parser/selector/path/hash, không chứa hồ sơ nhân viên.

```bash
python handoff_doc21.py --verify-sources
python handoff_doc21.py --task TASK21-001
python handoff_doc21.py --recipe R20-00
python handoff_doc21.py --excerpt SRC21-0001
python handoff_doc21.py --check-gates
python verify_doc21.py
```

Lệnh check-gates có exit3 là kết quả chặn theo thiết kế, không lỗi cần “sửa cho pass”. Verifier mặc định chỉ in báo cáo; `--output` chỉ nhận tệp mới bên ngoài thư mục gói. Không có lệnh cài gói/mạng/Codex/provider/deploy được thực thi. Các ví dụ `codex exec` trong tài liệu là lệnh mẫu chưa chạy, cần đối chiếu bản cài và quyền trước sử dụng.

## 4. Bảo toàn và kiểm chứng

[Source manifest](DOC-21_SOURCE_MANIFEST.json) ghi 475 file từ ZIP đợt18; bytes không thay. Hai tệp dành tên cho bản hiện hành được lưu tại [README_DOT_18.md](README_DOT_18.md) và [PACKAGE_MANIFEST_DOT_18.json](PACKAGE_MANIFEST_DOT_18.json). [Package manifest](PACKAGE_MANIFEST.json) khóa hash/size toàn gói trừ chính manifest.

Báo cáo [CHECK_RESULTS](DOC-21_CHECK_RESULTS.json) là kết quả helper/verifier thực chạy trong đợt DOC21, không tổng các PASS cũ. Phạm vi kiểm ZIP/bytes khi đóng gói được ghi riêng. Không tái chạy các checker nguồn có thể ghi lại báo cáo lịch sử.

## 5. Những phần vẫn chưa thực hiện

Repository ứng dụng, build/test commands thật, lựa chọn framework/DB/hosting/auth, source sản phẩm, migrations, server, runtime tests, người dùng thật, nghiên cứu đo lường, thẩm định chuyên gia/pháp lý/IP và các approvals vẫn chưa có. 375 AC/447 TC16 không đổi thành PASS. Validator OpenAPI độc lập chưa chạy. AGENTS và mẫu config chưa được nạp/kiểm trong một phiên Codex thực.

Không bật AI/analytics/HRIS/SCIM/reminders/classifier/norm để “hoàn thiện”. Những nhánh không cần có thể chưa xây; quyền dữ liệu, hỗ trợ, offboarding, xử lý xóa và restore an toàn vẫn bắt buộc trước người thật theo phạm vi.

**Điểm tiếp tục là TASK21-001**, không một tài liệu lõi mới và không lệnh tự động xây toàn bộ ứng dụng. Dùng prompt khởi đầu, đọc nguồn đã khóa và tạo baseline ứng viên để người chịu trách nhiệm rà soát.
