exec(open('/mnt/data/_doc21_build/write_docs.py',encoding='utf-8').read().split("md('DOC-21_CODEX_BUILD_PACK.md'")[0])
# use helpers only (no rewrites of primary docs)
md('DOC-21_BOOTSTRAP_COMMANDS.md','DOC-21 — Bootstrap, dependency và lệnh thực thi',r'''
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
''')

md('DOC-21_TEST_CI_ENGINEERING_HANDOFF.md','DOC-21 — Test harness, CI và bằng chứng kỹ thuật',r'''
## 1. Mục tiêu nghiệm thu của một task

Một task được nghiệm thu theo behavior và variant, không theo số file hoặc thời gian agent chạy. 375 AC nguồn có 447 đơn vị thiết kế kiểm DOC16; không được gắn tất cả thành đạt vì có một script tổng trả0. Handoff phải chỉ ra từng assertion nào chạy ở tầng nào và còn thiếu gì.

| Tầng | Có thể chứng minh | Không thể suy ra |
|---|---|---|
| Package/document | Mã, link, hash, schema, routing khớp | App hoạt động hoặc policy đã được duyệt |
| Unit/pure domain | Công thức, selection và invariants với inputs được đưa vào | Auth/store đã cung cấp inputs có thẩm quyền |
| Component/UI | Render, events, trạng thái/focus với props | Server bảo vệ payload hoặc data persisted |
| Service integration | Handler qua auth/DB/queue thật của sandbox | Production topology tương đương nếu chưa đối chiếu |
| E2E/operations | Luồng user/transport/restore/cấu hình cụ thể | Scientific validity hoặc legal compliance |
| Human/research | Hiểu/cảm nhận/đo lường theo nghiên cứu thực | Tự động chứng minh mọi use case hoặc nhân quả |

## 2. Applicability theo AC và variant

Task registry chứa `source_ac_pool`, cố ý không đặt mọi AC là IN_SCOPE. Trước code/test, tạo một bảng đủ pool: AC ID, assertion, variant, disposition, lý do, test implementation, execution layer, fixture, observer, reviewer. Với AC ngoài phạm vi hiện tại, nêu nó được giữ ở variant nào; không xóa nghĩa vụ nguồn hoặc sửa AC cho code hiện tại.

Dispositions đề xuất: `IN_SCOPE`, `PARTIAL_WITH_REMAINDER`, `DEFERRED_TO_OTHER_VARIANT`, `NEEDS_REVIEW`. Partial phải ghi rõ phần đã kiểm và phần còn lại. Một story rights đa miền không được đánh Done toàn bộ chỉ vì manual export hoạt động. Khi scope tăng, mở lại bảng này; evidence cũ vẫn gắn exact build/config/source.

## 3. Test harness cần có

| Interface logic | Đầu vào | Quan sát/đầu ra | Ranh giới |
|---|---|---|---|
| reset namespace | Runner-owned namespace/lease | Stores rỗng theo danh mục | Không nhận production namespace |
| seed fixture | Source spec, generation, IDs tổng hợp | Receipt với tài nguyên thật của test | Không giả approval con người |
| arm/release barrier | Hook allowlist và causal ordering | Đã tới điểm thực kiểm | Không arbitrary code endpoint |
| inspect state | Resource allowlist | Revision/state/outbox/fence | Không mở raw toàn hệ thống |
| observe protected reads | Repo/service category | Count/time minimal | Phải đặt trước boundary cần chứng minh |
| observe egress | Sink/transport và canary | First/partial handoff thực | Không tự khẳng định từ response status |
| cleanup independently | Namespace manifest | Từng store được dọn/khóa | Tách khỏi hàm xóa đang được thử |

Hooks ở sandbox phải vắng trong artifact production hoặc có cơ chế cách ly được Security duyệt và chứng minh. Một biến `test=true` trong request không được làm bypass. Namespace cùng testcase hai actor chỉ dùng khi có chủ đích kiểm race; mặc định không chia sẻ dữ liệu giữa run.

## 4. Oracle chấm điểm và content

DOC09 golden có nguồn, exact form/plan và phân số. Port phải so kết quả kỳ vọng đã viết độc lập với implementation cần kiểm. Bao phủ FORWARD/REVERSE, min/max/midpoint, mixed, missing, giá trị sai kiểu, precision JSON, duplicate, unknown revision, rounding và classification null. Không giảm precision ở parser rồi hy vọng core phát hiện được chuỗi gốc.

DOC11 selection fixture có expected refs riêng. Khi đổi audience, source level, claims, priority hoặc rule, test regression cần lại; không tự tính expected bằng chính selector. Phương pháp arithmetic/selection đúng trên synthetic không là expert review. Với sentence mới, schema đúng có thể vẫn đảo nghĩa; human content review theo DOC10/11/15 tách biệt.

## 5. Các lịch đồng thời trọng tâm

| Tình huống | Lịch thử bắt buộc | Quan sát |
|---|---|---|
| Autosave | Tab1 và Tab2 có cùng revision, một commit trước | Tab sau conflict, không lost update; UI không nhận ACK cũ làm bản mới |
| Submit | Timeout sau commit, retry cùng key; retry key khác cùng submission | Một logical submission/result, current auth vẫn kiểm |
| Worker | Lease1 mất, lease2 nhận; worker1 ghi muộn | Fence cũ bị chặn, không sửa snapshot |
| Publication | PreviewP1, source/audience đổi, confirmP1 | Stale preview chặn; không publish nội dung chưa xem |
| Revoke | Compute → R → I | Protected payload không đi qua egress cũ |
| Export | I → gửi phần đầu → R | Dừng phần còn kiểm soát, ghi partial/unknown, không chèn JSON vào binary |
| Delete/restore | Erasure/generation mới → restore snapshot cũ | Không hồi sinh account/grant/publication/source input |
| Optional OFF | API/worker/schedule bị gọi khi capability không chọn | Không đọc nguồn/gửi provider/thu event |

Sleep ngẫu nhiên chỉ hỗ trợ tìm lỗi, không thay test thứ tự causal. Test không tới barrier hoặc observer mất positive signal phải INCONCLUSIVE/BLOCKED, không PASS. Revoke ACK chỉ hợp lệ nếu deny tại authority đã commit; log sink ngoài hỏng không tự cản revoke khi nguồn control còn hoạt động theo policy.

## 6. CI proposal theo scope

Pipeline đề xuất: source/diff guard → static/lint/type → unit → contract/OAS → build artifact exclusions → integration sandbox → E2E/a11y → NFR/restore theo tác động → evidence packaging → review. Thứ tự final được DOC17/ADR cụ thể hóa; gói DOC21 không tạo workflow CI có credentials.

Protected branch review cần code owner cho contracts, privacy/lifecycle, scoring và release. Thay tệp AGENTS, tests, golden, policy hoặc CI là thay đổi cần review riêng, không coi test code luôn đáng tin. PR từ nguồn không tin cậy không được có quyền production hoặc credentials đọc toàn môi trường. Automation chỉ tạo patch/evidence, không tự ký gates chuyên môn.

CI fail-closed với source hash drift, unknown DTO fields, missing version, prohibited data trong artifact, critical authorization regression. Không dùng overall pass-rate để bù privacy leak. Flaky test không được tắt vĩnh viễn; quarantine có owner/issue/expiry và không miễn critical invariant của release đang chọn.

## 7. Evidence capsule

Một capsule cho run gồm task/variant/recipe, baseline/source/config hashes, code commit, environment topology, schema migration, fixture generation, command argv/cwd/tool versions, exit code, start/end thực, assertions actual, artifacts/digests, defects và cleanup. Không ghi tên người thật hoặc raw payload vào capsule công khai.

Evidence của local helper dùng `DOC_LOCAL`; capsule runtime cần observer đúng boundary và reviewer thật. Chữ ký/hash trong capsule không chứng minh ai kiểm nếu không có workflow xác minh; source authority và privacy phải xử lý ngoài schema. Result mà không có observed artifact nên để NOT_RUN/INCONCLUSIVE theo lý do, không phát minh metrics.

## 8. Ví dụ một PR manual hoàn chỉnh

PR cho `manual_draft` nêu FR-MAN-001/003/007, API-MAN tương ứng, UI-MAN và data revisions. Happy path: owner viết text, server ACK, reload còn bản đúng. Negative: B gọi owner endpoint; unknown field; source policy đổi. Race: hai tab CAS; response ACK đến lệch thứ tự; timeout sau commit. Artifact: command output, DB revision before-after, E2E trace synthetic đã loại token, observer logs với canary positive control. Chưa chạy mobile screen reader thì ghi NOT_RUN, không nói full accessibility.

PR không được sửa publication hoặc thêm NLP sở thích ngoài scope. Source corpus không đổi; nếu phát hiện contract thiếu, tạo delta riêng và báo blocker, không tự thêm field vào mọi DTO cho thuận code.

## 9. Phần còn mở

OpenAPI validator độc lập chưa có trong môi trường tài liệu và chưa được chạy; đây là việc cần làm trong TASK21-003 trên toolchain đã chọn. Runtime auth/DB/queue/proxy, full a11y/AT, nghiên cứu và provider tests đều chưa chạy. DOC21 kiểm hợp đồng handoff, không chuyển trạng thái của 447 TC16 hoặc các IT/SIT nguồn.
''')

md('DOC-21_REVIEW_RELEASE_ACCEPTANCE.md','DOC-21 — Review, nghiệm thu và bàn giao vận hành',r'''
## 1. Definition of Ready

Trước một task code: recipe/variant được chọn; các source hashes kiểm; contract delta ảnh hưởng có disposition; allowed paths được ràng buộc repo; stack/runtime/commands cần thiết có; actor/fixtures/observer được mô tả; privacy/secret/network scope rõ. Chưa đủ cho code thì nhận phần chuẩn bị, không giả READY đầy đủ.

Trước dữ liệu thật: thêm notice/căn cứ/lifecycle/IP/claims theo capability, reviewer thực, security/runtime evidence, hỗ trợ và khả năng xóa/restore. Không tất cả task đều cần nghiên cứu DISC, nhưng assessment/score-content/DISC pair phải đúng stage và claim.

## 2. Definition of Done theo mức

| Mức | Điều kiện để nói hoàn tất |
|---|---|
| Draft task | Có output file cụ thể, source trace, phương án và blocker |
| Code change | Diff đúng phạm vi, contract giữ nghĩa, tests actual theo tầng |
| Variant accepted | AC applicability được review; mọi critical assertion áp dụng đạt; phần chưa làm có nơi chịu trách nhiệm |
| People-ready | Ngoài kỹ thuật có gates pháp lý/nội dung/khoa học/HR phù hợp |
| Operations-ready | Runtime manifest, effective configuration, on-call, incident/rollback/restore được kiểm |

“22 tài liệu đã soạn” không là mức Code change. Một synthetic gate không được nói People-ready. Một local unit outcome không cho phép sửa trạng thái nguyên bản trong 375 AC.

## 3. PR và review

Dùng [PR template](handoff_templates/PULL_REQUEST_TEMPLATE.md). Reviewer đọc diff và kiểm source/target, không chỉ summary. Những biến đổi cần đặc biệt chú ý: thêm read path cho manager; DTO dư raw/key; normalization/rounding; fallback thành fake auth; audience change; TTL lấn quyền xóa; đổi classifier/feature; restoration của current rights.

Coder có thể nhờ agent rà code, nhưng automated review không thay maker–checker con người ở quyền/nguồn tài sản/claim/release. Reviewer có thể yêu cầu thu hẹp PR; không yêu cầu sửa expected cho khớp bug.

## 4. Quản lý blocker

Blocker phải có issue, source digests, variant, điều gì không xác định, tại sao ảnh hưởng, owner cần quyết định, phương án có tradeoff, việc vẫn làm được và bằng chứng đóng. Không dừng toàn project khi chỉ AI vendor chưa chọn; không tiếp tục protected payload khi authority chưa được thiết kế.

[BLOCKER_TEMPLATE](handoff_templates/BLOCKER_TEMPLATE.md) phân loại SOURCE_DRIFT, CONTRACT_CONFLICT, STACK_UNBOUND, TOOLING_MISSING, AUTHORITY_REQUIRED, EVIDENCE_MISSING, SCOPE_CHANGE, ENVIRONMENT_FAILURE. Owner chưa có ghi chưa bổ nhiệm, không ghi tên Trang như đã nhận việc.

## 5. Handoff giữa các phiên hoặc kỹ sư

Bàn giao current task/variant, base commit, changed files, commands đã chạy và actual outcomes, uncommitted work, source đã đọc, blocker và next command hợp lệ. Không chép private chain-of-thought; chỉ rationale cần thiết và bằng chứng công việc. Không hứa công việc chạy nền sau khi phiên đóng.

Người nhận phải kiểm git state, source revisions, hướng dẫn agent hiện hành và secrets scope trước tiếp tục. Không resume mù một phiên có assumptions cũ sau baseline đổi. Session history không thay source-of-truth contract.

## 6. Manifest và release

Release chuẩn bị bằng DOC20/17: capability thật bật, code/artifact/config, API/data schemas, authority/source policies, content/measurement bundles, claims, test inventory, failures/waivers, privacy/human review, stop/rollback/recovery. Không release từ `TASK_RESULT.status=COMPLETE` một mình.

Các nhánh chưa chọn phải có OFF evidence. Tiến trình xóa, support hoặc offboarding không được hoãn vì muốn release nhanh. Không có ngoại lệ chấp nhận leakage chỉ vì nội bộ ít người. Mọi waiver chỉ đúng rủi ro thấp/đường thay thế có bằng chứng và không vượt nghĩa vụ/claim scope.

## 7. Rollback, ngừng và xử lý hậu quả

Rollback mã không được hồi sinh rights/deletion/validity cũ. Khi source scoring/content sai, rút đúng source/claim và xử lý artifacts dẫn xuất; không viết lại raw input hoặc mạo danh owner sửa manual. Khi ngừng dịch vụ, phải giữ kênh quyền dữ liệu/case theo policy, xử lý keys/exports/buffers/backup trong scope.

Thông báo incident không đưa complaint/score/danh tính người liên quan cho toàn công ty. Đầu mối Security/Privacy quyết thông báo và evidence theo DOC14/17, không do agent tự gửi email hoặc mở ticket đối ngoại.

## 8. Checklist cuối bàn giao engineering

- [ ] Recipe/variant và baseline đích có chủ sở hữu thực.
- [ ] Các CR áp dụng được giải quyết bằng contract nhất quán, không chọn ngầm file mới nhất.
- [ ] Toolchain và build/test bindings đã chạy trên repo thực; missing không biến thành PASS.
- [ ] Secret/test-hook/private-bank exclusions được kiểm bằng artifact thực.
- [ ] Source/golden/AC không bị thay để ép code qua kiểm.
- [ ] Review quyền, dữ liệu, scoring/content và migration có evidence đúng tầng.
- [ ] Nguồn câu hỏi/thẻ/claims được phép đúng scope, AI/analytics/integration không tự bật.
- [ ] Runtime tests, a11y, restore, data rights, support và offboarding đủ phần áp dụng.
- [ ] Người nhận vận hành, incident và quyền dữ liệu được bổ nhiệm.
- [ ] Known gaps, residual risks và các bước còn lại được ghi đúng trạng thái.

Checklist hiện chưa được tick như evidence ứng dụng. Report DOC21 chỉ nói những gì đã kiểm trên artifact được giao.
''')

md('DOC-21_LOCAL_TOOL_CONTRACTS.md','DOC-21 — Hợp đồng công cụ đọc nguồn và kiểm handoff',r'''
## 1. Phạm vi

`handoff_doc21.py` dùng thư viện chuẩn Python, chỉ đọc các tệp trong gói qua allowlist. Nó không cài dependency, tạo repository, gọi Codex, chạy source checkers, chấm DISC, gửi dữ liệu hoặc thực thi command từ task. `verify_doc21.py` dùng thêm jsonschema để kiểm cấu trúc và fixtures. Kết quả chỉ là kiểm tài liệu/công cụ cục bộ.

## 2. Các registry

| Registry | Dữ liệu chính | Quy tắc |
|---|---|---|
| SOURCE_MANIFEST | 475 path gốc/path giữ lại/hash/size | Corpus original byte giữ; README/manifest lịch sử đổi tên đã ghi |
| CONTEXT_SOURCES | SRC21 ID/path/hash/selector/label | Selector chỉ json_pointer hoặc line_range, không URL/script |
| TASK_REGISTRY | TASK21/WP20/variant/source pools/steps/tests/paths | 50 task, không dispatch hoặc authority thực |
| VARIANT_ROUTING | WP+variant → TASK21 | Unique, phủ đúng 50 source variants, không thêm giả |
| COMMAND_REGISTRY | Lệnh local/mẫu/unbound | Commands sản phẩm argv=null; tool không thực thi chúng |
| BASELINE_CANDIDATE | Recipe R20-00, OFF list và refs chưa chốt | Approvals rỗng; production_authorized=false |
| TRACEABILITY | 75 US/FR/375 AC → WP/variant/task | Chỉ routing; AC applicability phải review trước run |

## 3. Nguồn và selector

Mỗi source có ID ổn định trong registry, path tương đối, SHA-256 bytes, selector type và giá trị. `json_pointer` tuân theo escape `~0`/`~1`; resolve chỉ sau đọc strict JSON, không eval. `line_range` là inclusive 1-indexed, end không vượt file, phải là số nguyên thật không boolean. Cả hai trả nguyên nội dung được chọn, không sửa wording.

Path phải ở dưới root, không absolute/`..`/ký tự phân cách Windows để thoát, không symlink từng thành phần. Tệp thiếu, hash đổi, JSON duplicate, selector sai hoặc excerpt vượt giới hạn đều là lỗi. Hash ở registry không chữ ký; người sửa cùng cả source và manifest có thể làm checksums khớp, nên khi triển khai cần nguồn trust ngoài gói và kiểm commit/approval đúng quy trình.

## 4. CLI và kết quả

| Lệnh | Đầu ra | Exit |
|---|---|---|
| `--verify-sources` | count và mismatch metadata, không nội dung riêng | 0 khi khớp, 2 khi mismatch/lỗi |
| `--list-tasks` | task/WP/variant/kind | 0 |
| `--task TASK21-001` | Dossier và nguồn cần đọc | 0; unknown2 |
| `--recipe R20-00` | Exact required variants/tasks + gates/source note | 0; unknown2 |
| `--excerpt SRC21-0001` | Source metadata và nội dung selected | 0; quá giới hạn/sai hash2 |
| `--check-gates` | PLANNING_ONLY, các blocker, production_authorized=false | 3 có chủ đích |

Mặc định excerpt tối đa 65.536 UTF-8 bytes; đây là **giới hạn output của helper**, không giới hạn context/model hoặc cấu hình Codex. Người dùng có thể chọn `--max-bytes` trong khoảng 1–262.144; quá trần reject. Không truncate; chọn excerpt nhỏ hơn hoặc mở source trong phạm vi được duyệt. `--task` in metadata/steps không tự mở toàn bộ source text.

Mọi output lỗi có code an toàn; không echo arbitrary file contents. Helper không có `--approve`, `--deploy`, `--execute-command`, shell eval, endpoint URL hoặc token input. `--recipe` không tự cộng mọi variants của một WP và không sắp lịch/topological order; nó chuyển exact required_deliverables source thành task references để người nhận review.

## 5. Schema và giới hạn

[DOC-21_HANDOFF_CONTRACTS.schema.json](DOC-21_HANDOFF_CONTRACTS.schema.json) định nghĩa TaskRegistry, SourceRegistry, VariantRouting, CandidateBaseline và TaskResultTemplate. Required không nghĩa client được quyền cung cấp trong một runtime tương lai; đây là draft artifacts.

Additional fields bị chặn trong các object đã đặc tả. Status nháp/approval/null/product commands được khóa. Schema không chứng minh reviewer thật, source đúng ngữ nghĩa, code đã chạy hoặc dữ liệu truly synthetic. Cross-reference checks nằm verifier; semantic compatibility của contract phải do engineering/domain review.

Task-result template là khuôn để người làm ghi sau task; file đang có không chứa test outcome thực. Schema cho Codex final response là định dạng riêng tối giản, không source of authority. JSON đúng không đủ claim task complete hoặc merge/release.

## 6. Verifier và fixtures

Verifier đối chiếu source bytes, 50 variants/tasks, source pointers/ranges, ID uniqueness, 75 story/FR/375 AC trace, command binding null, zero approvals, config mẫu parse được, source links trong Markdown và code parse. Fixtures kiểm source traversal/symlink/hash drift, unknown ID, invalid pointer/range, duplicate JSON, vượt budget, task status injection và recipe không kéo optional.

Các negative fixtures tạo **thư mục tạm riêng**, không sửa corpus để thử. Mỗi expected outcome được ghi cụ thể trước run; một test thất bại giữ failure, không đổi case cho đạt. Kiểm CLI sử dụng Python helper, không chạy `codex` hoặc gọi API.

## 7. Báo cáo và tính lặp lại

Verifier in JSON summary hoặc ghi `--output` bên ngoài package, không overwrite existing file. Report có thời điểm/môi trường/library version và chi tiết từng check. Chạy lại không tự sửa manifest/source reports. Bản report đi kèm gói là actual output của lần chạy được ghi, không số PASS cộng dồn từ trước.

Không nhận đầu vào do người dùng tải lên ở một public service; resource/file trust phải được thiết kế khác nếu dùng tool làm server. Test path allowlist cục bộ không đủ chống TOCTOU trên filesystem có attacker đồng thời; môi trường chạy phải là bản corpus đã kiểm, read-only đối với actor khác. Windows native chưa kiểm; đường dẫn pathlib có thiết kế portable nhưng không tuyên bố đã chạy Windows.
''')
print('wrote engineering docs')
