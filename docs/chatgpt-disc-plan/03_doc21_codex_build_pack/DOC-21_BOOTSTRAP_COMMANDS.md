---
document_id: DOC-21_BOOTSTRAP_COMMANDS
title: "DOC-21 — Bootstrap, dependency và lệnh thực thi"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Bootstrap, dependency và lệnh thực thi

## 1. Phân loại lệnh

| Nhóm | Ý nghĩa | Hiện trạng |
|---|---|---|
| LOCAL_PACK | Đọc/kiểm corpus và dossier, dùng tệp tổng hợp | Đã có mã; kết quả thực chạy ở báo cáo DOC21 |
| CODEX_CLIENT_EXAMPLE | Cách gọi Codex sau khi môi trường có CLI và quyền phù hợp | Chỉ đối chiếu tài liệu chính thức; chưa chạy Codex trong đợt này |
| PRODUCT_BINDING | Build/lint/test/migrate/run ứng dụng | Chưa có stack/repo, argv=null, UNBOUND |
| REAL_ENVIRONMENT_OPERATION | Deploy, provider, xóa, gửi, invite, release | Không được thực hiện bởi gói này |

Không biến `UNBOUND` thành `echo done`, `true`, bước skip vẫn xanh hoặc một script không kiểm gì. Một job thiếu executable phải BLOCKED, không PASS. Không tự chọn package manager hoặc SDK chỉ để điền cột command.

## 2. Cách kiểm gói hiện tại

Môi trường đề xuất cho **công cụ tài liệu** là Python3.11+ và jsonschema đã cài. Điều này không chọn backend Python cho ứng dụng. Dependency thực đã dùng ở lần kiểm được ghi trong `DOC-21_CHECK_RESULTS.json`; không có lệnh tự cài thư viện trong helper.

```bash
python handoff_doc21.py --verify-sources
python handoff_doc21.py --list-tasks
python handoff_doc21.py --task TASK21-001
python handoff_doc21.py --recipe R20-00
python handoff_doc21.py --excerpt SRC21-0001
python handoff_doc21.py --check-gates
python verify_doc21.py
```

Lệnh `--check-gates` chủ đích trả `production_authorized=false` và exit3 vì chưa có quyền triển khai. Exit3 không phải lỗi công thức hoặc bằng chứng task không có giá trị. `--task` và `--recipe` chỉ in JSON; không đọc/ghi hệ thống bên ngoài và không tự chạy code của source checkers.

Verifier mặc định không ghi tệp. Chạy lại với `--output` phải chọn đường dẫn ngoài thư mục gói và chưa tồn tại; nếu muốn lưu lịch sử, tạo tên lần chạy mới. Không ghi lại báo cáo nguồn hay cập nhật manifest để làm biến mất source drift.

## 3. Chuẩn bị phiên Codex

Trước giao việc, người phụ trách kiểm vị trí làm việc, project trust, settings toàn cục/managed, quyền mạng/ghi và các MCP/connector đang bật. Chỉ thêm folder chứa gói và repo cần thiết; không gắn toàn bộ thư mục tài khoản, email hoặc Drive của nhân viên cho coding task.

Hai lệnh dưới chỉ kiểm phiên bản/help của **CLI đã có trên máy**, chưa được chạy trong đợt này:

```bash
codex --version
codex exec --help
```

Không cung cấp lệnh cài mới, yêu cầu đăng nhập hoặc token trong gói. Sau khi người phụ trách xác nhận CLI và phạm vi, có thể bắt đầu bằng prompt ở [CODEX_START_PROMPT.md](CODEX_START_PROMPT.md). Chế độ read-only phù hợp cho rà soát, workspace-write có giới hạn phù hợp với việc soạn đầu ra trong vùng cho phép; exact behavior phụ thuộc cấu hình hiệu lực. Tham khảo [S21-02/03](DOC-21_DECISIONS_AND_REFERENCES.md).

Mẫu non-interactive dưới đây là **EXAMPLE_NOT_RUN**, không workflow đang hoạt động. `--output-schema` yêu cầu cấu trúc kết quả cuối; `--json` là stream sự kiện, hai loại không thay nhau. Không đưa stream chưa rà soát vào kho công khai vì có thể chứa dữ liệu phiên làm việc. [S21-04](DOC-21_DECISIONS_AND_REFERENCES.md#s21-04).

```bash
codex exec --sandbox read-only \
  --output-schema handoff_templates/TASK_RESULT.schema.json \
  -o handoff_work/task-result.json \
  "Đọc AGENTS.md và TASK21-001; chỉ phân tích nguồn, không sửa file hoặc gọi dịch vụ."
```

Ví dụ yêu cầu wrapper `-o` ghi kết quả là hành vi CLI, không cho model quyền sửa corpus. Thư mục đầu ra phải do người vận hành chuẩn bị; kiểm help thực tế trước dùng. Không bật `--skip-git-repo-check` hoặc full access để né môi trường chưa sẵn sàng; nếu CLI yêu cầu Git repository thì tạo repository làm việc theo quy trình tổ chức đã chấp thuận, không giả gói tài liệu đã là repo.

## 4. Binding lệnh sản phẩm sau ADR

[Command Registry](DOC-21_COMMAND_REGISTRY.json) chứa các slot chưa ràng buộc. Mỗi binding mới phải có: command ID, cwd, argv array không shell tự do, runtime/package-manager version, lockfile/digest, required environment keys không chứa secret value, timeout đề xuất đã duyệt, output artifact, expected exit codes, side effects, cleanup và owner.

| Slot cần hiện thực | Bằng chứng phải có | Không chấp nhận |
|---|---|---|
| install_locked_dependencies | Môi trường sạch, lockfile và log package source | Cài latest hoặc hooks không review với secrets |
| lint/typecheck/unit | Actual files/suites và exit code | Stub trả0 hoặc ignore lỗi toàn cục |
| validate_openapi | Công cụ độc lập pin version, report trên baseline đích | Chỉ parse JSON rồi gọi OAS conformant |
| test_contracts | Request/response examples và negative DTO | Chỉ happy path mẫu |
| migrate_test_database | DB version/schema before-after/rollback plan | Migration đánh DRAFT thành approved seed |
| seed/reset_namespace | Synthetic generation/source/canary/cleanup | Production dump đã đổi tên |
| test_integration/e2e | Auth/store/gateway thật ở sandbox, observers | Mock chính boundary đang tuyên bố kiểm |
| test_accessibility | Process/page/keyboard/AT và thiết bị thật | Screenshot được coi full WCAG |
| build_release_candidate | Artifact digest, exclusions, config OFF checks | Test hooks/keys trong frontend bundle |
| restore_rehearsal | Snapshot, deny/deletion floor và thời gian thực | Kết quả planner boolean |

Một lệnh có thể bao nhiều suite nhưng report phải tách tầng và actual targets. Nếu cùng label command mà semantics đổi, tăng command manifest revision và chạy lại evidence. Không infer một project command từ docs mẫu của OpenAI, GitHub hoặc ngôn ngữ khác.

## 5. Dependency và môi trường

Pin dependency sau khi so phiên bản đang được dùng, lifecycle và security phù hợp stack. Lockfile là nguồn cài; SBOM/provenance và scan theo DOC17. Nếu cần mạng để install, đó là bước đã được cho phép trong môi trường cách ly; không cung cấp production token cho script có thể thực thi dependency hooks.

Môi trường cloud có cơ chế setup/agent phase riêng được tài liệu OpenAI mô tả; gói này không tạo cloud environment, setup script hoặc secret. [S21-05](DOC-21_DECISIONS_AND_REFERENCES.md#s21-05). Không giả rằng bỏ secrets khỏi agent phase sẽ xóa những gì script setup đã ghi vào file/cache.

## 6. Tránh chọn stack ngầm

Không có package.json, pyproject của sản phẩm, Dockerfile, SQL migration hoặc workflow deploy được tạo trong DOC21. Các `*.py` mới chỉ là tool nội bộ của gói. Phương án lựa chọn kiến trúc phải ghi tính khả thi identity, immutable snapshots, CAS, fencing, R/I, data rights và restore; không quyết định bằng mức phổ biến của framework.

Mỗi bước spike có scope, dữ liệu giả, tài nguyên được phép, phương thức quan sát và cleanup. Spike thành công ở máy cục bộ không tự chứng minh topology production với reverse proxy/replicas. Khi chưa đủ bằng chứng, báo giới hạn thay vì giảm guard cho nhanh.
