---
document_id: DOC-21_TASK_CARDS
title: "DOC-21 — 50 dossier giao việc theo variant"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — 50 dossier giao việc theo variant

## 1. Cách giao việc

Mỗi TASK21 là một dossier cho đúng một variant của WP20. Có 50 dossier cho 50 phần đầu ra, không phải 50 phiên Codex đã chạy.

## 2. Chỉ mục 50 Dossier

| Task | WP / variant | Loại | Trọng tâm bàn giao |
|---|---|---|---|
| [TASK21-001](#task21-001) | `WP20-001` / `scope_baseline` | `PREPARATION_ONLY` | Lập baseline ứng viên R20-00 và danh sách delta R20-01, tách nguồn tham khảo khỏi file có thể sửa. Ghi rõ bảy CR nền, phần OIDC có điều kiện và các nhánh OFF. |
| [TASK21-002](#task21-002) | `WP20-001` / `architecture` | `PREPARATION_ONLY` | Lập ADR ứng viên cho runtime, DB, identity, hosting và miền nhất quán quyền; mô tả chứng cứ cần thử cho R trước I. Chưa có lựa chọn thực thì bàn giao ma trận capability và kế hoạch spike. |
| [TASK21-003](#task21-003) | `WP20-002` / `test_foundation` | `IMPLEMENTATION_AFTER_BASELINE` | Tạo vòng kiểm contract và fixture synthetic sau ADR; pin toolchain, validator OpenAPI độc lập, source digests, namespace reset và positive-control observers. |
| [TASK21-004](#task21-004) | `WP20-002` / `identity_core` | `IMPLEMENTATION_AFTER_BASELINE` | Liên kết issuer/subject, membership và generation; tách phiên MEMBER/RIGHTS/BOOTSTRAP/WORKLOAD; kiểm role theo target và scope. |
| [TASK21-005](#task21-005) | `WP20-003` / `core_privacy` | `IMPLEMENTATION_AFTER_BASELINE` | Dựng privacy center cho manual và thông báo phạm vi dữ liệu; giữ đường không làm assessment, không chia sẻ và yêu cầu dữ liệu. |
| [TASK21-006](#task21-006) | `WP20-003` / `assessment_purpose` | `IMPLEMENTATION_AFTER_BASELINE` | Bổ sung ASSESSMENT_SELF theo phiên bản notice và trạng thái xử lý; dùng consent/policy authority từ baseline đã chọn. |
| [TASK21-007](#task21-007) | `WP20-004` / `pair_purposes` | `IMPLEMENTATION_AFTER_BASELINE` | Tách PAIR_DISC và PAIR_PREFERENCE; ràng buộc grant tới đúng snapshot hoặc nguồn sở thích, kiểm riêng hai phía. |
| [TASK21-008](#task21-008) | `WP20-004` / `manual_draft` | `IMPLEMENTATION_AFTER_BASELINE` | Làm editor bảy tình huống với plain text, giới hạn Unicode và trạng thái lưu theo ACK; nháp song song bản công bố. |
| [TASK21-009](#task21-009) | `WP20-005` / `manual_publication` | `IMPLEMENTATION_AFTER_BASELINE` | Kết nối preview chính xác, confirmation, publish, danh bạ và revoke; cùng renderer public projection, wrapper owner tách riêng. |
| [TASK21-010](#task21-010) | `WP20-005` / `rights_core` | `IMPLEMENTATION_AFTER_BASELINE` | Tạo case quyền dữ liệu và xác minh tách khỏi membership; phân biệt requested scope, approved scope, clocks và operator assignment. |
| [TASK21-011](#task21-011) | `WP20-006` / `rights_manual` | `IMPLEMENTATION_AFTER_BASELINE` | Thực hiện xuất/sửa/xóa identity/manual/support theo scope được duyệt, phân loại dữ liệu bên thứ ba và evidence giao dữ liệu. |
| [TASK21-012](#task21-012) | `WP20-006` / `rights_assessment` | `IMPLEMENTATION_AFTER_BASELINE` | Mở rộng quyền dữ liệu tới response/submission/result/action và bản dẫn xuất, giữ lineage của kết quả còn được phép. |
| [TASK21-013](#task21-013) | `WP20-007` / `rights_extensions` | `IMPLEMENTATION_AFTER_BASELINE` | Tính đủ phạm vi connector/AI/analytics/research thực bật trong kế hoạch quyền dữ liệu, theo processor và copy thực tế. |
| [TASK21-014](#task21-014) | `WP20-007` / `support_core` | `IMPLEMENTATION_AFTER_BASELINE` | Tạo requester/operator projections, preview metadata đính kèm và phân tuyến phản ánh độc lập; cập nhật trạng thái có căn cứ. |
| [TASK21-015](#task21-015) | `WP20-008` / `lifecycle_core` | `IMPLEMENTATION_AFTER_BASELINE` | Thực thi revoke/generation và sự kiện offboarding tại authority; deny có hiệu lực trước tác vụ phụ, không phụ thuộc log sink ngoài. |
| [TASK21-016](#task21-016) | `WP20-008` / `lifecycle_domain_adapters` | `IMPLEMENTATION_AFTER_BASELINE` | Lập fan-out theo tất cả store của scope đang chọn: primary DB, object, search, queue, cache, exports và restore ledger. |
| [TASK21-017](#task21-017) | `WP20-009` / `general_catalog` | `IMPLEMENTATION_AFTER_BASELINE` | Nhập mẫu manual và nội dung chung như draft, review theo audience và provenance, release riêng sau người duyệt thật. |
| [TASK21-018](#task21-018) | `WP20-009` / `conditional_catalog` | `IMPLEMENTATION_AFTER_BASELINE` | Chuẩn bị thẻ theo điểm/nhãn/pair với claim dependencies, selector và bundle closure; serving giữ tắt khi chưa đủ gate. |
| [TASK21-019](#task21-019) | `WP20-010` / `operations_core` | `IMPLEMENTATION_AFTER_BASELINE` | Ràng buộc build/deploy/config/secrets/audit tới scope; triển khai giám sát tối thiểu không chứa hồ sơ riêng. |
| [TASK21-020](#task21-020) | `WP20-010` / `scope_rehearsal` | `IMPLEMENTATION_AFTER_BASELINE` | Diễn tập deploy/rollback/restore synthetic trên topology thật đã chọn; bảo toàn current deny/deletion/generation. |
| [TASK21-021](#task21-021) | `WP20-011` / `core_ux` | `IMPLEMENTATION_AFTER_BASELINE` | Hiện thực shell, truy cập, riêng tư, quyền dữ liệu và hỗ trợ theo nguồn; phản hồi trạng thái đúng và thao tác bằng bàn phím. |
| [TASK21-022](#task21-022) | `WP20-011` / `manual_ux` | `IMPLEMENTATION_AFTER_BASELINE` | Nối editor, preview, publish, colleague và rights/support vào luồng manual hoàn chỉnh; kiểm responsive và công nghệ hỗ trợ. |
| [TASK21-023](#task21-023) | `WP20-012` / `assessment_ux` | `IMPLEMENTATION_AFTER_BASELINE` | Hiện thực scale/item/review/result/history theo exact form, không tự rewrite câu hoặc chọn sẵn mức giữa. |
| [TASK21-024](#task21-024) | `WP20-012` / `extension_ux` | `IMPLEMENTATION_AFTER_BASELINE` | Xây chỉ màn hình pair/analytics/AI/connector thuộc capability đã chọn và các state không đủ nguồn/quyền. |
| [TASK21-025](#task21-025) | `WP20-013` / `manual_rollout` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị hồ sơ go/no-go cho manual sau bằng chứng kỹ thuật, nội dung, pháp lý và vận hành; người phụ trách quyết định mời. |
| [TASK21-026](#task21-026) | `WP20-013` / `measurement_route` | `HUMAN_OWNED_AGENT_PREPARES` | Lập hồ sơ tự xây/cấp phép với phạm vi đo, IP, quyền tích hợp, lifecycle và chi phí cần xác minh. |
| [TASK21-027](#task21-027) | `WP20-014` / `qualitative_evidence` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị review item/scale/context theo DOC08/10, phiếu phỏng vấn và quản trị revision; chuyên gia/người thật tạo kết quả sau nghiên cứu. |
| [TASK21-028](#task21-028) | `WP20-014` / `assessment_synthetic` | `IMPLEMENTATION_AFTER_BASELINE` | Hiện thực save–resume–submit–score/stop trên exact manifest và dữ liệu tổng hợp, port công thức theo golden độc lập. |
| [TASK21-029](#task21-029) | `WP20-015` / `measurement_release` | `IMPLEMENTATION_AFTER_BASELINE` | Tạo workflow review/release manifest, golden oracle, retirement và corrective run có provenance. |
| [TASK21-030](#task21-030) | `WP20-015` / `research_governance` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị stage protocol, recruitment permissions, vault contact, scope rút dữ liệu và trách nhiệm custodian. |
| [TASK21-031](#task21-031) | `WP20-016` / `study_infrastructure` | `IMPLEMENTATION_AFTER_BASELINE` | Tách source, workspace phân tích, evidence và release; gắn exact dataset/plan/run, holdout custody và rights. |
| [TASK21-032](#task21-032) | `WP20-016` / `self_limited` | `IMPLEMENTATION_AFTER_BASELINE` | Hiện thực owner result, phản hồi, hành động riêng và lịch sử/retake; lấy source metadata đúng snapshot được yêu cầu. |
| [TASK21-033](#task21-033) | `WP20-017` / `generic_actions` | `IMPLEMENTATION_AFTER_BASELINE` | Xây hành động do owner tự viết/chọn từ nội dung chung, không bắt assessment; trigger, self-check, date-only và timezone riêng. |
| [TASK21-034](#task21-034) | `WP20-017` / `pilot_rollout` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị phạm vi pilot đúng form/protocol, trạng thái kết quả giới hạn và kênh hỗ trợ; người có thẩm quyền mới mở nghiên cứu. |
| [TASK21-035](#task21-035) | `WP20-018` / `empirical_claims` | `HUMAN_OWNED_AGENT_PREPARES` | Tổ chức gói evidence theo claim/form/population/purpose và phương pháp; người nghiên cứu thực hiện, reviewer xét kết quả bất lợi. |
| [TASK21-036](#task21-036) | `WP20-018` / `score_content_synthetic` | `IMPLEMENTATION_AFTER_BASELINE` | Xây port interpreter chỉ nhận feature envelope có policy/claim binding; mô phỏng token bằng fixture riêng không tác động nguồn. |
| [TASK21-037](#task21-037) | `WP20-019` / `reviewed_self_content` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị và kiểm gói nội dung Self đúng audience, source level, context và reviews; người phụ trách duyệt ý nghĩa và quyền sử dụng. |
| [TASK21-038](#task21-038) | `WP20-019` / `self_score_rollout` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị gói phát hành theo đúng phần claim đã được phép; giữ phần chưa đủ evidence OFF và dự phòng general. |
| [TASK21-039](#task21-039) | `WP20-020` / `literal_pair` | `IMPLEMENTATION_AFTER_BASELINE` | Làm A→B từ manual/literal/general theo PAIR_PREFERENCE và target gate; không đọc vector hoặc suy A ở B_ONLY. |
| [TASK21-040](#task21-040) | `WP20-020` / `semantic_pair` | `IMPLEMENTATION_AFTER_BASELINE` | Xây extension binding sau CR: owner chọn code, xác nhận exact field hash/context/publication và applicability. |
| [TASK21-041](#task21-041) | `WP20-021` / `preference_rollout` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị acceptance cho literal hoặc semantic đúng variant, kiểm source labels và hiểu của người đọc. |
| [TASK21-042](#task21-042) | `WP20-021` / `disc_pair_synthetic` | `IMPLEMENTATION_AFTER_BASELINE` | Hiện thực pipeline hai grant SINGLE_SNAPSHOT, version compatibility và direction, dùng fixture có quyền giả định trong sandbox. |
| [TASK21-043](#task21-043) | `WP20-022` / `disc_pair_rollout` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị gói bằng chứng pair theo operation/direction, cả hai nguồn đủ quyền và số hành động đúng giới hạn. |
| [TASK21-044](#task21-044) | `WP20-022` / `enterprise_integration` | `IMPLEMENTATION_AFTER_BASELINE` | Chọn đúng CAP18 và adapter: trust, SCIM/HRIS hoặc notification; xác định writer/identity/crosswalk và source event lanes. |
| [TASK21-045](#task21-045) | `WP20-023` / `ai_task_release` | `IMPLEMENTATION_AFTER_BASELINE` | Chọn một AIT15, chuẩn bị adapter tối thiểu, egress/source validation, variants hoặc human-reviewed draft, quota và kill. |
| [TASK21-046](#task21-046) | `WP20-023` / `analytics_release` | `IMPLEMENTATION_AFTER_BASELINE` | Chọn event/metric/view nhỏ nhất, authority capture, cohort maturity, dedup, disclosure family và lifecycle. |
| [TASK21-047](#task21-047) | `WP20-024` / `operation_review` | `HUMAN_OWNED_AGENT_PREPARES` | Chuẩn bị chu kỳ xem xét theo rủi ro/sự kiện, duty roster, SLO thực, capacity, patch và retirement procedure. |
| [TASK21-048](#task21-048) | `WP20-024` / `reminder_release` | `IMPLEMENTATION_AFTER_BASELINE` | Thiết kế task nhắc có lựa chọn riêng, date-only/timezone, quiet window được duyệt, kênh tối thiểu và hủy trước gửi. |
| [TASK21-049](#task21-049) | `WP20-025` / `classification_extension` | `IMPLEMENTATION_AFTER_BASELINE` | Chuẩn bị hợp đồng classifier riêng theo bằng chứng; taxonomy, abstention, tie/uncertainty và version link. |
| [TASK21-050](#task21-050) | `WP20-025` / `norm_extension` | `IMPLEMENTATION_AFTER_BASELINE` | Chuẩn bị norm dataset/representativeness/method, population scope, uncertainty và version linking riêng. |

<a id="task21-001"></a>
## TASK21-001 — Variant `scope_baseline` (`WP20-001`)

- **Loại nhiệm vụ:** `PREPARATION_ONLY`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Lập baseline ứng viên R20-00 và danh sách delta R20-01, tách nguồn tham khảo khỏi file có thể sửa. Ghi rõ bảy CR nền, phần OIDC có điều kiện và các nhánh OFF.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Một nguồn đổi hash; một CR chưa có người quyết định; một nhiệm vụ manual bị kéo theo AI. Cả ba phải có xử lý riêng, không mặc định bản mới hơn đúng.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không ký baseline, chọn nhà cung cấp, sửa DOC00–20 hoặc tạo lịch cam kết.


<a id="task21-002"></a>
## TASK21-002 — Variant `architecture` (`WP20-001`)

- **Loại nhiệm vụ:** `PREPARATION_ONLY`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Lập ADR ứng viên cho runtime, DB, identity, hosting và miền nhất quán quyền; mô tả chứng cứ cần thử cho R trước I. Chưa có lựa chọn thực thì bàn giao ma trận capability và kế hoạch spike.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Hai cấu hình dùng DB khác nhau nhưng cùng giả định fencing; proxy đã nhận byte trước lúc kiểm quyền; replica quyền bị trễ. Ghi boundary nào chưa chứng minh.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không lấy stack dự án khác, dựng tài khoản cloud hoặc gọi dữ liệu doanh nghiệp.


<a id="task21-003"></a>
## TASK21-003 — Variant `test_foundation` (`WP20-002`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tạo vòng kiểm contract và fixture synthetic sau ADR; pin toolchain, validator OpenAPI độc lập, source digests, namespace reset và positive-control observers.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Schema mẫu hợp lệ nhưng OpenAPI sai; observer không thu được positive marker; fixture key lọt bundle frontend. Test phải fail hoặc inconclusive đúng lớp.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tạo auth bypass trong bản phát hành, không gán PASS cho server chưa chạy.


<a id="task21-004"></a>
## TASK21-004 — Variant `identity_core` (`WP20-002`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Liên kết issuer/subject, membership và generation; tách phiên MEMBER/RIGHTS/BOOTSTRAP/WORKLOAD; kiểm role theo target và scope.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Email đổi, email tái cấp, hai subject cùng display name, callback phiên trước sau account switch, role bị rút giữa request.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không sync HRIS/SCIM; không domain allowlist thành membership tự động.


<a id="task21-005"></a>
## TASK21-005 — Variant `core_privacy` (`WP20-003`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Dựng privacy center cho manual và thông báo phạm vi dữ liệu; giữ đường không làm assessment, không chia sẻ và yêu cầu dữ liệu.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Không có purpose assessment nhưng vẫn viết manual; notice thay khi đang đọc; chọn dừng manual không xóa account hoặc bật pair.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không thêm AI/analytics consent, không coi checkbox UI là căn cứ pháp lý đã ký.


<a id="task21-006"></a>
## TASK21-006 — Variant `assessment_purpose` (`WP20-003`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Bổ sung ASSESSMENT_SELF theo phiên bản notice và trạng thái xử lý; dùng consent/policy authority từ baseline đã chọn.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Rút mục đích khi bài đang lưu hoặc worker đang chấm; notice version không còn hợp lệ; đăng xuất không bị nhầm thành rút consent.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không chia sẻ kết quả với manager hoặc cấp PAIR_DISC cùng thao tác.


<a id="task21-007"></a>
## TASK21-007 — Variant `pair_purposes` (`WP20-004`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tách PAIR_DISC và PAIR_PREFERENCE; ràng buộc grant tới đúng snapshot hoặc nguồn sở thích, kiểm riêng hai phía.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** A chưa publish nhưng có quyền làm viewer; B không còn target; R2 mới không thay grant R1; rút một mục đích giữ nguyên mục đích khác.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không scope FUTURE_ALL_SNAPSHOTS hoặc latest tự động, không suy consent từ publication.


<a id="task21-008"></a>
## TASK21-008 — Variant `manual_draft` (`WP20-004`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Làm editor bảy tình huống với plain text, giới hạn Unicode và trạng thái lưu theo ACK; nháp song song bản công bố.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Hai tab ghi cùng revision; ACK cũ đến sau sửa mới; mất mạng sau commit; bỏ local text không undo bản đã lưu.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không publish từ autosave, không lưu notes/raw offline bền hoặc suy preference code từ free text.


<a id="task21-009"></a>
## TASK21-009 — Variant `manual_publication` (`WP20-005`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Kết nối preview chính xác, confirmation, publish, danh bạ và revoke; cùng renderer public projection, wrapper owner tách riêng.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Audience hoặc identity projection đổi sau preview; publish lặp; B mất quyền trước issuance; Back không flash snapshot cũ.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không public Internet, không filter directory theo DISC, không đưa draft/private fields vào payload.


<a id="task21-010"></a>
## TASK21-010 — Variant `rights_core` (`WP20-005`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tạo case quyền dữ liệu và xác minh tách khỏi membership; phân biệt requested scope, approved scope, clocks và operator assignment.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Người đã nghỉ mở kênh RIGHTS; request kind nguồn thiếu nhánh được policy yêu cầu; xác minh kéo dài không tự đặt lại mốc nhận.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tự đặt hạn pháp luật hoặc gộp RIGHTS vào phiên nội bộ; chưa xử lý CR14-02 thì chặn phạm vi chịu ảnh hưởng.


<a id="task21-011"></a>
## TASK21-011 — Variant `rights_manual` (`WP20-006`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Thực hiện xuất/sửa/xóa identity/manual/support theo scope được duyệt, phân loại dữ liệu bên thứ ba và evidence giao dữ liệu.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Package READY nhưng chưa được cấp; truyền dở; scope thu hẹp trước download; complaint chứa dữ liệu người khác; yêu cầu hủy sau xóa không khôi phục.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không lấy toàn hàng DB làm export, không đánh FULFILLED chỉ vì tạo ZIP xong.


<a id="task21-012"></a>
## TASK21-012 — Variant `rights_assessment` (`WP20-006`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Mở rộng quyền dữ liệu tới response/submission/result/action và bản dẫn xuất, giữ lineage của kết quả còn được phép.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** CLEAR không phục dựng từ log; xóa đáp án làm mất khả năng tính lại; request đổi type không sửa raw; reference dữ liệu đã xóa không tái sinh.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không xóa question bank của tổ chức theo việc xóa người dùng; không giấu phần chưa đáp ứng.


<a id="task21-013"></a>
## TASK21-013 — Variant `rights_extensions` (`WP20-007`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tính đủ phạm vi connector/AI/analytics/research thực bật trong kế hoạch quyền dữ liệu, theo processor và copy thực tế.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Đã rút scope nhưng buffer còn; dataset frozen chứa người đã rút; vendor receipt chưa xác minh; aggregate correction có nguy cơ differencing.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không hứa xóa byte ngoài quyền kiểm soát; không coi fake acknowledgement là vendor evidence.


<a id="task21-014"></a>
## TASK21-014 — Variant `support_core` (`WP20-007`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tạo requester/operator projections, preview metadata đính kèm và phân tuyến phản ánh độc lập; cập nhật trạng thái có căn cứ.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Người bị phản ánh ở tuyến mặc định; assignee bị offboard; caller đổi target ref để mở Self người khác; duplicate submit.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không attachments tự động, không gửi complaint cho manager hoặc lấy support role làm quyền đọc raw.


<a id="task21-015"></a>
## TASK21-015 — Variant `lifecycle_core` (`WP20-008`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Thực thi revoke/generation và sự kiện offboarding tại authority; deny có hiệu lực trước tác vụ phụ, không phụ thuộc log sink ngoài.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** R trước I; R ghi ở authority nhưng cache cũ; enqueue thành công nhưng deny thất bại; tài khoản quay lại và stale event từ đợt cũ.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không coi một epoch field là chứng minh linearizability; không trì hoãn deny đến TTL.


<a id="task21-016"></a>
## TASK21-016 — Variant `lifecycle_domain_adapters` (`WP20-008`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Lập fan-out theo tất cả store của scope đang chọn: primary DB, object, search, queue, cache, exports và restore ledger.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Job cũ thức dậy sau xóa; một store purge lỗi; backup cũ restore; tombstone mất khi restore; nội dung owner tự viết còn căn cứ riêng.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không xóa mọi domain optional chưa chọn hoặc gán đã xóa khi chỉ đặt soft-delete.


<a id="task21-017"></a>
## TASK21-017 — Variant `general_catalog` (`WP20-009`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Nhập mẫu manual và nội dung chung như draft, review theo audience và provenance, release riêng sau người duyệt thật.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Editor tự khai approved; reviewer tự duyệt bản mình soạn; block SELF bị đổi audience; body đổi nhưng bundle hash giữ cũ.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không import 72 thẻ thành RELEASED hoặc tạo evidence efficacy giả.


<a id="task21-018"></a>
## TASK21-018 — Variant `conditional_catalog` (`WP20-009`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị thẻ theo điểm/nhãn/pair với claim dependencies, selector và bundle closure; serving giữ tắt khi chưa đủ gate.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Feature policy null, claim scope sai form, block withdrawn, nguồn current khác grant. Mọi nhánh không đủ điều kiện phải abstain/fallback đúng quyền.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không D>=70 hoặc top-two tự tạo D_FOCUS; không bật classifier để đủ báo cáo.


<a id="task21-019"></a>
## TASK21-019 — Variant `operations_core` (`WP20-010`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Ràng buộc build/deploy/config/secrets/audit tới scope; triển khai giám sát tối thiểu không chứa hồ sơ riêng.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Thiếu effective config; log sink lỗi; private canary trong APM; secret test trong artifact; rollout dùng manifest đo lường thay deployment manifest.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không deploy production hoặc dùng cloud account suy đoán từ profile người dùng.


<a id="task21-020"></a>
## TASK21-020 — Variant `scope_rehearsal` (`WP20-010`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Diễn tập deploy/rollback/restore synthetic trên topology thật đã chọn; bảo toàn current deny/deletion/generation.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Restore DB thành công nhưng ledger trễ; worker lease cũ; key đã revoke trong backup; smoke happy path đạt nhưng private projection rò.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không gọi Python boolean fixture là restore test; không mở traffic trước các kiểm deny.


<a id="task21-021"></a>
## TASK21-021 — Variant `core_ux` (`WP20-011`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Hiện thực shell, truy cập, riêng tư, quyền dữ liệu và hỗ trợ theo nguồn; phản hồi trạng thái đúng và thao tác bằng bàn phím.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Focus lạc khi dialog đóng; hết phiên giữa thao tác; zoom/reflow; ready package nhầm fulfilled; lỗi quyền không được lộ tồn tại tài nguyên.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không buộc xây màn hình assessment/pair để nghiệm thu trang chung.


<a id="task21-022"></a>
## TASK21-022 — Variant `manual_ux` (`WP20-011`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Nối editor, preview, publish, colleague và rights/support vào luồng manual hoàn chỉnh; kiểm responsive và công nghệ hỗ trợ.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Focus error summary, save ACK qua screen reader, hai tab xung đột, nội dung dài 320px, revoke khi trang cũ đang mở.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không lấy atlas HTML cũ làm bằng chứng E2E hoặc full WCAG.


<a id="task21-023"></a>
## TASK21-023 — Variant `assessment_ux` (`WP20-012`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Hiện thực scale/item/review/result/history theo exact form, không tự rewrite câu hoặc chọn sẵn mức giữa.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Bỏ chọn khác mức3; item keyboard không tự chuyển câu; missing=null không vẽ0; retest không autopublish; RAW và LINEAR đúng đơn vị.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không thêm timer đánh giá trung thực, confidence hoặc nhóm mặc định.


<a id="task21-024"></a>
## TASK21-024 — Variant `extension_ux` (`WP20-012`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Xây chỉ màn hình pair/analytics/AI/connector thuộc capability đã chọn và các state không đủ nguồn/quyền.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** B_ONLY không so hai người; analytics OFF không thành0%; AI draft chưa duyệt không auto-public; connector failure không mở quyền.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không dùng cùng DTO cho employee/operator/research, không bật nhánh chỉ để demo.


<a id="task21-025"></a>
## TASK21-025 — Variant `manual_rollout` (`WP20-013`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị hồ sơ go/no-go cho manual sau bằng chứng kỹ thuật, nội dung, pháp lý và vận hành; người phụ trách quyết định mời.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Thiếu người tiếp nhận quyền dữ liệu; lỗi critical vẫn còn dù pass-rate cao; optional backend vẫn phục vụ khi nút ẩn; rollback hồi sinh share.
- **Giới hạn ngoài phạm vi (Out of Scope):** Codex không mời nhân viên, ký duyệt hoặc kích hoạt sản phẩm từ một checklist.


<a id="task21-026"></a>
## TASK21-026 — Variant `measurement_route` (`WP20-013`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Lập hồ sơ tự xây/cấp phép với phạm vi đo, IP, quyền tích hợp, lifecycle và chi phí cần xác minh.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** License không cho truy xuất hoặc xóa theo scope; vendor evidence không khớp locale; tự xây chưa có mẫu; thiếu báo giá được ghi unknown.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không chép ngân hàng thương mại hoặc gán độ tin cậy vendor cho Vaga.


<a id="task21-027"></a>
## TASK21-027 — Variant `qualitative_evidence` (`WP20-014`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị review item/scale/context theo DOC08/10, phiếu phỏng vấn và quản trị revision; chuyên gia/người thật tạo kết quả sau nghiên cứu.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Mức3 bị hiểu hai nghĩa; L-D07 lẫn thẩm quyền; ghi paraphrase thành quote; đã sửa wording nhưng giữ form revision.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tạo người tham gia, chữ ký, quote hay kết luận thẩm định bằng agent.


<a id="task21-028"></a>
## TASK21-028 — Variant `assessment_synthetic` (`WP20-014`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Hiện thực save–resume–submit–score/stop trên exact manifest và dữ liệu tổng hợp, port công thức theo golden độc lập.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** 3.00000000000000000000001 bị làm tròn thành3; reverse hai lần; một miền thiếu; hai worker; purpose rút trước commit; plan mismatch.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không thay khóa giả thuyết, chuyển weight null thành1 ở source hoặc mở bài cho nhân viên.


<a id="task21-029"></a>
## TASK21-029 — Variant `measurement_release` (`WP20-015`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tạo workflow review/release manifest, golden oracle, retirement và corrective run có provenance.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Phê duyệt sai hash; cùng người maker/checker; lỗi formula bị disguised retry; source WITHDRAWN còn cache; old-result sửa tại chỗ.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không phê duyệt đo lường bằng migration DB hoặc software unit test.


<a id="task21-030"></a>
## TASK21-030 — Variant `research_governance` (`WP20-015`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị stage protocol, recruitment permissions, vault contact, scope rút dữ liệu và trách nhiệm custodian.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Consent app bị tái dùng cho nghiên cứu; planned_n điền actual_n; khảo sát nhân viên dưới áp lực quản lý; reviewer chưa có.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tuyển người hoặc thu dữ liệu nghiên cứu từ task lập trình này.


<a id="task21-031"></a>
## TASK21-031 — Variant `study_infrastructure` (`WP20-016`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tách source, workspace phân tích, evidence và release; gắn exact dataset/plan/run, holdout custody và rights.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Dev/confirm có cùng người; synthetic bị gắn EMPIRICAL; dataset frozen sau restriction; evidence ref ngoài scope; null/0 nhầm.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không chạy thống kê lên dữ liệu người thật hoặc tạo alpha/omega giả.


<a id="task21-032"></a>
## TASK21-032 — Variant `self_limited` (`WP20-016`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Hiện thực owner result, phản hồi, hành động riêng và lịch sử/retake; lấy source metadata đúng snapshot được yêu cầu.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** R1 khi R2 tồn tại; manager đọc URL Self; toàn điểm hòa vẫn classification=null; corrective result không thay original; action note lộ log.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không claim personality đúng, stress, năng lực hoặc published profile theo điểm.


<a id="task21-033"></a>
## TASK21-033 — Variant `generic_actions` (`WP20-017`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Xây hành động do owner tự viết/chọn từ nội dung chung, không bắt assessment; trigger, self-check, date-only và timezone riêng.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Ngày đổi bởi timezone thiết bị; xóa action không còn reminder; partial save; note chứa thông tin thứ ba cần cảnh báo/rights.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không bật nhắc ngoài app hoặc biến completion thành KPI quản lý.


<a id="task21-034"></a>
## TASK21-034 — Variant `pilot_rollout` (`WP20-017`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị phạm vi pilot đúng form/protocol, trạng thái kết quả giới hạn và kênh hỗ trợ; người có thẩm quyền mới mở nghiên cứu.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Scale/context chưa duyệt; known issue chưa xử lý; software pass bị dùng thay IP; thay form giữa cohort mà không amendment.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không lấy user Continue làm đồng ý nghiên cứu hoặc tự gửi lời mời.


<a id="task21-035"></a>
## TASK21-035 — Variant `empirical_claims` (`WP20-018`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Tổ chức gói evidence theo claim/form/population/purpose và phương pháp; người nghiên cứu thực hiện, reviewer xét kết quả bất lợi.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Model không hội tụ; zero variance; holdout leakage; reliability cao nhưng coverage kém; effect chưa ước lượng không điền0.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không gán validated=true chung hoặc sửa dữ liệu để có bốn nhân tố.


<a id="task21-036"></a>
## TASK21-036 — Variant `score_content_synthetic` (`WP20-018`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Xây port interpreter chỉ nhận feature envelope có policy/claim binding; mô phỏng token bằng fixture riêng không tác động nguồn.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Scorer không trả feature mà frontend tự suy; policy null; claim bị rút sau selection; không eligible block phải bỏ gợi ý.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không dùng high score tự tạo cutoff hoặc đọc raw cho content selection.


<a id="task21-037"></a>
## TASK21-037 — Variant `reviewed_self_content` (`WP20-019`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị và kiểm gói nội dung Self đúng audience, source level, context và reviews; người phụ trách duyệt ý nghĩa và quyền sử dụng.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Block đẹp nhưng vượt claim; biến ngôn ngữ điều kiện thành khẳng định; owner không đồng ý bị coi trả lời sai; nội dung bị thu hồi.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không biến approval tài liệu thành review 72 thẻ hoặc tự mở serving.


<a id="task21-038"></a>
## TASK21-038 — Variant `self_score_rollout` (`WP20-019`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị gói phát hành theo đúng phần claim đã được phép; giữ phần chưa đủ evidence OFF và dự phòng general.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Chỉ claim điểm từng miền nhưng mở so sánh giữa miền; source token sai revision; feature bất ngờ bật sau rollback; không thể withdraw.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không kéo theo classifier/norm hoặc DISC pair khi chỉ duyệt Self content.


<a id="task21-039"></a>
## TASK21-039 — Variant `literal_pair` (`WP20-020`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Làm A→B từ manual/literal/general theo PAIR_PREFERENCE và target gate; không đọc vector hoặc suy A ở B_ONLY.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** B target mất; A không publish; text B không grant; thiếu đủ ba lời khuyên; same A/B; revoke giữa tạo và cấp.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không NLP text thành trait/preference atom hoặc phần trăm hợp nhau.


<a id="task21-040"></a>
## TASK21-040 — Variant `semantic_pair` (`WP20-020`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Xây extension binding sau CR: owner chọn code, xác nhận exact field hash/context/publication và applicability.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Text đổi làm hash stale; hai sở thích mâu thuẫn trong context; client gửi hash_matches=true; source publication cũ; revoke purpose.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không migrate manual cũ bằng NLP hoặc nâng bản template thành owner-confirmed.


<a id="task21-041"></a>
## TASK21-041 — Variant `preference_rollout` (`WP20-021`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị acceptance cho literal hoặc semantic đúng variant, kiểm source labels và hiểu của người đọc.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** B_ONLY dùng lời so cặp; người nhận tưởng hệ thống đã đánh giá năng lực; nhánh fallback vẫn đọc điểm; thiếu operator xử lý phản ánh.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không gọi preference advice là DISC pair đã kiểm định.


<a id="task21-042"></a>
## TASK21-042 — Variant `disc_pair_synthetic` (`WP20-021`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Hiện thực pipeline hai grant SINGLE_SNAPSHOT, version compatibility và direction, dùng fixture có quyền giả định trong sandbox.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Grant R1 nhưng đọc latestR2; A spoof; B vector xuất qua tooltip; R trước I; compatibility UNKNOWN; classifier disabled.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tạo all-pairs matrix, không phần trăm hợp nhau hoặc code labels từ raw score.


<a id="task21-043"></a>
## TASK21-043 — Variant `disc_pair_rollout` (`WP20-022`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị gói bằng chứng pair theo operation/direction, cả hai nguồn đủ quyền và số hành động đúng giới hạn.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Có consent nhưng không claim; nguồn B bị xóa; riêng A/B được duyệt nhưng pair efficacy chưa rõ; version sau release không tương thích.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không dùng rollout pair để quyết định tuyển dụng hoặc quan hệ nhân sự.


<a id="task21-044"></a>
## TASK21-044 — Variant `enterprise_integration` (`WP20-022`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chọn đúng CAP18 và adapter: trust, SCIM/HRIS hoặc notification; xác định writer/identity/crosswalk và source event lanes.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Email tái cấp; event tương lai bị cập nhật chức danh ghi đè; scan thiếu trang; active=true sau local deny; provider cutover replay.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không tự kết nối tenant thật hoặc cho source groups viết role/consent/publication.


<a id="task21-045"></a>
## TASK21-045 — Variant `ai_task_release` (`WP20-023`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chọn một AIT15, chuẩn bị adapter tối thiểu, egress/source validation, variants hoặc human-reviewed draft, quota và kill.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** R trước provider E; AI-only revoke khác source revoke; JSON hợp lệ nhưng đảo nghĩa; timeout unknown provider spend; injection trong text.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không gửi raw/notes/keys; không auto-publish, chấm điểm hoặc gọi provider để hoàn thành hồ sơ.


<a id="task21-046"></a>
## TASK21-046 — Variant `analytics_release` (`WP20-023`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chọn event/metric/view nhỏ nhất, authority capture, cohort maturity, dedup, disclosure family và lifecycle.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Collector OFF có network; view signal không chứng minh đọc; cohort cuối tháng; missing denominator; tổng làm lộ ô bị ẩn; xóa làm differencing.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không graph A→B, private notes, raw scores, session replay hoặc KPI từ chối test.


<a id="task21-047"></a>
## TASK21-047 — Variant `operation_review` (`WP20-024`)

- **Loại nhiệm vụ:** `HUMAN_OWNED_AGENT_PREPARES`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị chu kỳ xem xét theo rủi ro/sự kiện, duty roster, SLO thực, capacity, patch và retirement procedure.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Không ai nhận alarm; workload ngoài thử tải; backup chưa drill; processor đổi retention; ngừng app làm mất kênh quyền dữ liệu.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không đặt lịch cam kết, chi phí hoặc on-call người thật chưa được xác nhận.


<a id="task21-048"></a>
## TASK21-048 — Variant `reminder_release` (`WP20-024`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Thiết kế task nhắc có lựa chọn riêng, date-only/timezone, quiet window được duyệt, kênh tối thiểu và hủy trước gửi.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Action xóa sau enqueue; same reminder lặp; đổi timezone; opt-out khi send pending; email chứa nội dung note riêng.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không bật mặc định hoặc coi consent assessment là consent notification.


<a id="task21-049"></a>
## TASK21-049 — Variant `classification_extension` (`WP20-025`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị hợp đồng classifier riêng theo bằng chứng; taxonomy, abstention, tie/uncertainty và version link.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Top2 không phân biệt; hai miền không kề; score semantics chưa tương đương; frontend tự gán Balanced; thay classifier sửa lịch sử.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không đưa threshold0.40SD của nghiên cứu thành runtime khi chưa được review.


<a id="task21-050"></a>
## TASK21-050 — Variant `norm_extension` (`WP20-025`)

- **Loại nhiệm vụ:** `IMPLEMENTATION_AFTER_BASELINE`
- **Trạng thái:** `NOT_DISPATCHED` / `NOT_STARTED`
- **Mục tiêu & Phạm vi:** Chuẩn bị norm dataset/representativeness/method, population scope, uncertainty và version linking riêng.
- **Ca kiểm thử nghịch / Rủi ro bắt buộc (Negative Probe):** Norm vendor bị mượn; SD0; nhóm nhỏ; cùng0–100 bị gọi percentile; new-form dùng norm old-form; null norm bị fallback.
- **Giới hạn ngoài phạm vi (Out of Scope):** Không chuẩn hóa từ vài nhân viên rồi tuyên bố áp dụng cho mọi người Việt.
