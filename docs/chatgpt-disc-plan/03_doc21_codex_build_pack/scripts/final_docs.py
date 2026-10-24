from pathlib import Path
import json
exec(open('/mnt/data/_doc21_build/write_docs.py',encoding='utf-8').read().split("md('DOC-21_CODEX_BUILD_PACK.md'")[0])
md('CHECKPOINT_BUILD_START.md','Checkpoint — Sau DOC-21: bắt đầu bằng TASK21-001',r'''
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
''')
md('README.md','Vaga DISC — Đợt 19: DOC-21 và bộ 22 tài liệu lõi',r'''
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
''')
# Report scaffold is intentionally replaced after actual successful local verification.
md('DOC-21_VALIDATION_REPORT.md','DOC-21 — Báo cáo kiểm tra và giới hạn bằng chứng',r'''
## 1. Phạm vi

Báo cáo này sẽ ghi kết quả từ [DOC-21_CHECK_RESULTS.json](DOC-21_CHECK_RESULTS.json) sau lần kiểm kết thúc. Công cụ chỉ kiểm gói tài liệu và helper cục bộ; không runtime, Codex hoặc nhà cung cấp.

## 2. Giới hạn

Chưa build ứng dụng, chưa kiểm OpenAPI độc lập, chưa phê duyệt pháp lý/khoa học/nội dung và chưa gọi Codex. Corpus nguồn không sửa byte. Trạng thái ứng dụng và tiêu chí nghiệm thu nguồn vẫn NOT_RUN.
''')
