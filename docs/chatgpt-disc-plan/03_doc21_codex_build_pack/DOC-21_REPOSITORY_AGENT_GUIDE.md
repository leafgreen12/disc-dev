---
document_id: DOC-21_REPOSITORY_AGENT_GUIDE
title: "DOC-21 — Repository, chỉ dẫn agent và vùng sửa"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Repository, chỉ dẫn agent và vùng sửa

## 1. Hai cấu trúc không được nhập làm một

**Gói hiện tại** là archive tài liệu có root AGENTS.md, checker và các template; không phải repository ứng dụng đã tạo. **Cây đề xuất dưới đây** chỉ được thực hiện ở repo làm việc sau quyết định kỹ thuật, giữ corpus nguyên trạng trong một thư mục con.

```text
<application-repository>/
  AGENTS.md                       # Chỉ dẫn đã review cho repo thực
  docs/reference/vaga-disc-v0.1/   # Toàn corpus nguyên byte, không làm frontend assets
  baseline/candidates/            # Delta chưa ký
  baseline/approved/              # Revisions đã được người có thẩm quyền chốt
  architecture/adr/               # Stack/data/auth/egress decisions
  contracts/                     # Candidate/approved DTO, schema, adapters
  apps/web/                      # UI; chỉ projection cho actor
  modules/                       # Domain theo ownership/invariants
  adapters/                      # Storage, auth, queue, export, optional providers
  restricted_assets/             # Item/keys/rules dùng phía server, có quyền
  tests/unit/ tests/contracts/ tests/integration/ tests/e2e/
  tests/harness/ tests/fixtures/  # Synthetic, không production dump
  tooling/                       # Commands và context tools đã review
  operations/ deployment/        # Config/deploy/restore/runbooks
  handoff_work/                  # Kết quả task/PR/decision nháp
  evidence/                      # Chỉ metadata an toàn; actual evidence nhạy cảm ở kho riêng
```

Tên thư mục là ranh giới logic; monorepo/multirepo/ngôn ngữ chưa chọn. Không tạo 65 bảng vì có 65 DATA, hoặc một microservice cho mỗi domain vì có tên adapter. Thiết kế cần thỏa transaction/authority/privacy, không tối ưu theo số module.

## 2. Quy tắc nhập nguồn

Import một lần vào nhánh riêng, kiểm hashes trước và sau copy. Không đổi line ending nguồn để hợp convention repo; dùng thuộc tính Git phù hợp sau ADR để tránh checkout đổi bytes, hoặc ghi rõ representation mới và giữ bản gốc. Không tự reserialize JSON source theo formatter. Không import các metadata `APPROVED` giả từ fixtures làm runtime trust store.

Giữ mapping original path → retained path → repository path. Các links tương đối trong corpus vẫn đúng khi cả thư mục cùng di chuyển. Sau copy, context helper cần source-root rõ; không dùng absolute path từ máy người soạn làm mặc định của mọi developer.

## 3. Vùng code và khả năng phụ thuộc

| Vùng | Được biết | Không được nhập trực tiếp |
|---|---|---|
| Frontend | Actor projection, request DTO, source labels an toàn | Full item bank/key, raw/private entities, reviewer tokens, internal rule predicates |
| Pure domain | Value objects, explicit plan/version, business invariants | Provider credentials, request auth tự khai, network I/O ẩn |
| Application service | Authority hiện hành và transaction orchestration | Bypass hardcoded bằng test flags |
| Adapter | Transport/storage protocol và allowlisted config | Quyết định scientific claim hoặc từ text tự suy sở thích |
| Test harness | Synthetic factories, barrier/observer theo namespace | Production credentials/dump hoặc authority mọi người |
| Operations | Effective configuration, metadata cần xử lý | Full Self để debug hoặc grant mọi quyền cho operator |

Kiểm import/bundle bằng pipeline của stack được chọn. `restricted_assets` chỉ là tên thư mục nếu không có build packaging/access tests; không xem tên thư mục như enforcement.

## 4. AGENTS theo lớp

Tệp [AGENTS.md](AGENTS.md) hiện áp cho việc đọc gói. Các mẫu [frontend](agent_templates/frontend/AGENTS.md), [domain](agent_templates/domain/AGENTS.md), [tests](agent_templates/tests/AGENTS.md), [operations](agent_templates/operations/AGENTS.md) phải được rà trước khi đặt vào code thực. Không tự ghi file toàn cục `~/.codex/AGENTS.md` hoặc `.codex/config.toml` của người dùng.

Tài liệu OpenAI mô tả chuỗi AGENTS được xác định từ project root tới current working directory; có ưu tiên override và giới hạn dung lượng nạp. Do đó agent làm từ root không được tự nhận đã nạp tất cả AGENTS của mọi subtree. Card phải nêu guidance cần đọc của vùng sửa; nếu đổi workspace/cwd thì kiểm lại instruction sources. [S21-01](DOC-21_DECISIONS_AND_REFERENCES.md#s21-01).

Giữ root instructions ngắn: ranh giới bất biến, source router, commands thật và output format. Không chép 50 card vào AGENTS để vượt context. Không dùng ngôn ngữ yêu cầu chain-of-thought; chỉ yêu cầu kết luận, source/evidence, kế hoạch và tradeoff cần review.

## 5. Sandbox và network

Chính sách đề xuất là workspace giới hạn, review khi ra ngoài quyền, network subprocess tắt cho công việc local không cần mạng. Tài liệu OpenAI tách sandbox khỏi approval policy; AGENTS không thay các kiểm soát đó. [S21-02](DOC-21_DECISIONS_AND_REFERENCES.md#s21-02).

Config mẫu chỉ tên `.example`, chưa có hiệu lực. Trước dùng, kiểm CLI/app đang cài, global/user/project/managed settings và instruction overrides. Hạn chế của tổ chức không được bị script trong repo sửa hoặc vô hiệu. Các connector về email/Drive/CRM/production không thuộc task coding mặc định. Source hiện tại không yêu cầu mở chúng.

Không có credentials sản phẩm trong environment. Khi cần auth cho Codex, quy trình tổ chức giữ secret ngoài repository/test scripts. Một source build hook hoặc package install có thể chạy mã không tin cậy; setup môi trường cũng cần ranh giới chứ không chỉ thời gian agent làm việc. Không in auth files hoặc token vào báo cáo.

## 6. Parallel work và quyền file

Một task có allowed write roots, path bindings và expected base commit. Trước sửa, đọc trạng thái Git và thay đổi có sẵn; không revert sửa của người khác. Branch/worktree chỉ tạo khi người phụ trách cho phép; không auto-push/merge/deploy. Task thẻ tên `candidate_write_roots` chưa là sự cho phép sửa toàn root.

Xung đột contract giữa hai task phải quay về owner contract, không giải bằng đổi mỗi consumer sang behavior khác nhau. Khi merge, rerun tests trên trạng thái hợp nhất và ghi actual baseline; chứng cứ của branch riêng không tự đủ. Task nghiên cứu/doc có thể song song code synthetic nhưng không nâng policy release.

## 7. Bảo vệ fixture, oracle và evidence

Fixtures phải có provenance; clone test-only dùng ID/generation riêng. Oracle numerical từ DOC09 không sửa vì port mới lệch; lệch phải phân tích thuật toán, precision, reverse, normalization hoặc source version. Golden mới cần người review và lý do, không regenerated từ SUT.

Evidence file thực có thể chứa token trong HAR/log/screenshot; thu bằng synthetic và redaction có kiểm. `.gitignore` chỉ hạn chế vô ý commit, không làm dữ liệu mất khả năng đọc hoặc xóa file đã tracked. Không đặt toàn trace/log vào PR hoặc prompt. Check cleanup độc lập khi chính chức năng deletion đang được thử.

## 8. Tính di động và rebind

Công cụ DOC21 dùng Python, không quyết định ngôn ngữ sản phẩm. Khi port tool sang ngôn ngữ khác, giữ tests kiểm hash, duplicate member, schema, bounds và source pointers. Tên runtime/package manager/DB/node image trong commands chỉ ghi khi đã chọn và thử; tránh nút `make test` làm mọi việc trả0 dù chưa có suite.

Chưa có remote repo, commit, CI project hoặc môi trường sản phẩm trong gói. Sau bootstrap thực, cập nhật baseline ứng viên/approved và command registry **mới**, không ghi đè báo cáo nguồn để làm như các lệnh đã tồn tại từ đầu.
