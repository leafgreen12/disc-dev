---
document_id: DOC-21_TEST_CI_ENGINEERING_HANDOFF
title: "DOC-21 — Test harness, CI và bằng chứng kỹ thuật"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Test harness, CI và bằng chứng kỹ thuật

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
