from pathlib import Path
import json, hashlib, re, textwrap
P=Path('/mnt/data/vaga_disc_docs_dot_19')
DATE='2026-10-15'
def dump(name,obj):
 p=P/name; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def md(name,title,body,docid=None):
 p=P/name;p.parent.mkdir(parents=True,exist_ok=True)
 h=f'''---
document_id: {docid or Path(name).stem}
title: "{title}"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: {DATE}
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# {title}

'''
 p.write_text(h+textwrap.dedent(body).strip()+'\n',encoding='utf-8')
def load(name):return json.loads((P/name).read_text(encoding='utf-8'))
def digest(path):return hashlib.sha256((P/path).read_bytes()).hexdigest()
R=load('DOC-20_ROADMAP_REGISTRY.json'); W={w['id']:w for w in R['work_packages']}
F={f['id']:f for f in load('DOC-05_FUNCTIONS.json')['functions']}
S={s['id']:s for s in load('DOC-04_BACKLOG.json')['stories']}
A=load('DOC-13_API_REGISTRY.json')['operations']; U=load('DOC-07_UI_REGISTRY.json')['screens']
SM=load('DOC-21_SOURCE_MANIFEST.json')
# Đặc tả bổ sung riêng từng variant, không thay nội dung nguồn WP20.
# Các trường: phạm vi được nhận | ca không thuận lợi bắt buộc | giới hạn không xây trong card.
RAW='''scope_baseline|Lập baseline ứng viên R20-00 và danh sách delta R20-01, tách nguồn tham khảo khỏi file có thể sửa. Ghi rõ bảy CR nền, phần OIDC có điều kiện và các nhánh OFF.|Một nguồn đổi hash; một CR chưa có người quyết định; một nhiệm vụ manual bị kéo theo AI. Cả ba phải có xử lý riêng, không mặc định bản mới hơn đúng.|Không ký baseline, chọn nhà cung cấp, sửa DOC00–20 hoặc tạo lịch cam kết.
architecture|Lập ADR ứng viên cho runtime, DB, identity, hosting và miền nhất quán quyền; mô tả chứng cứ cần thử cho R trước I. Chưa có lựa chọn thực thì bàn giao ma trận capability và kế hoạch spike.|Hai cấu hình dùng DB khác nhau nhưng cùng giả định fencing; proxy đã nhận byte trước lúc kiểm quyền; replica quyền bị trễ. Ghi boundary nào chưa chứng minh.|Không lấy stack dự án khác, dựng tài khoản cloud hoặc gọi dữ liệu doanh nghiệp.
test_foundation|Tạo vòng kiểm contract và fixture synthetic sau ADR; pin toolchain, validator OpenAPI độc lập, source digests, namespace reset và positive-control observers.|Schema mẫu hợp lệ nhưng OpenAPI sai; observer không thu được positive marker; fixture key lọt bundle frontend. Test phải fail hoặc inconclusive đúng lớp.|Không tạo auth bypass trong bản phát hành, không gán PASS cho server chưa chạy.
identity_core|Liên kết issuer/subject, membership và generation; tách phiên MEMBER/RIGHTS/BOOTSTRAP/WORKLOAD; kiểm role theo target và scope.|Email đổi, email tái cấp, hai subject cùng display name, callback phiên trước sau account switch, role bị rút giữa request.|Không sync HRIS/SCIM; không domain allowlist thành membership tự động.
core_privacy|Dựng privacy center cho manual và thông báo phạm vi dữ liệu; giữ đường không làm assessment, không chia sẻ và yêu cầu dữ liệu.|Không có purpose assessment nhưng vẫn viết manual; notice thay khi đang đọc; chọn dừng manual không xóa account hoặc bật pair.|Không thêm AI/analytics consent, không coi checkbox UI là căn cứ pháp lý đã ký.
assessment_purpose|Bổ sung ASSESSMENT_SELF theo phiên bản notice và trạng thái xử lý; dùng consent/policy authority từ baseline đã chọn.|Rút mục đích khi bài đang lưu hoặc worker đang chấm; notice version không còn hợp lệ; đăng xuất không bị nhầm thành rút consent.|Không chia sẻ kết quả với manager hoặc cấp PAIR_DISC cùng thao tác.
pair_purposes|Tách PAIR_DISC và PAIR_PREFERENCE; ràng buộc grant tới đúng snapshot hoặc nguồn sở thích, kiểm riêng hai phía.|A chưa publish nhưng có quyền làm viewer; B không còn target; R2 mới không thay grant R1; rút một mục đích giữ nguyên mục đích khác.|Không scope FUTURE_ALL_SNAPSHOTS hoặc latest tự động, không suy consent từ publication.
manual_draft|Làm editor bảy tình huống với plain text, giới hạn Unicode và trạng thái lưu theo ACK; nháp song song bản công bố.|Hai tab ghi cùng revision; ACK cũ đến sau sửa mới; mất mạng sau commit; bỏ local text không undo bản đã lưu.|Không publish từ autosave, không lưu notes/raw offline bền hoặc suy preference code từ free text.
manual_publication|Kết nối preview chính xác, confirmation, publish, danh bạ và revoke; cùng renderer public projection, wrapper owner tách riêng.|Audience hoặc identity projection đổi sau preview; publish lặp; B mất quyền trước issuance; Back không flash snapshot cũ.|Không public Internet, không filter directory theo DISC, không đưa draft/private fields vào payload.
rights_core|Tạo case quyền dữ liệu và xác minh tách khỏi membership; phân biệt requested scope, approved scope, clocks và operator assignment.|Người đã nghỉ mở kênh RIGHTS; request kind nguồn thiếu nhánh được policy yêu cầu; xác minh kéo dài không tự đặt lại mốc nhận.|Không tự đặt hạn pháp luật hoặc gộp RIGHTS vào phiên nội bộ; chưa xử lý CR14-02 thì chặn phạm vi chịu ảnh hưởng.
rights_manual|Thực hiện xuất/sửa/xóa identity/manual/support theo scope được duyệt, phân loại dữ liệu bên thứ ba và evidence giao dữ liệu.|Package READY nhưng chưa được cấp; truyền dở; scope thu hẹp trước download; complaint chứa dữ liệu người khác; yêu cầu hủy sau xóa không khôi phục.|Không lấy toàn hàng DB làm export, không đánh FULFILLED chỉ vì tạo ZIP xong.
rights_assessment|Mở rộng quyền dữ liệu tới response/submission/result/action và bản dẫn xuất, giữ lineage của kết quả còn được phép.|CLEAR không phục dựng từ log; xóa đáp án làm mất khả năng tính lại; request đổi type không sửa raw; reference dữ liệu đã xóa không tái sinh.|Không xóa question bank của tổ chức theo việc xóa người dùng; không giấu phần chưa đáp ứng.
rights_extensions|Tính đủ phạm vi connector/AI/analytics/research thực bật trong kế hoạch quyền dữ liệu, theo processor và copy thực tế.|Đã rút scope nhưng buffer còn; dataset frozen chứa người đã rút; vendor receipt chưa xác minh; aggregate correction có nguy cơ differencing.|Không hứa xóa byte ngoài quyền kiểm soát; không coi fake acknowledgement là vendor evidence.
support_core|Tạo requester/operator projections, preview metadata đính kèm và phân tuyến phản ánh độc lập; cập nhật trạng thái có căn cứ.|Người bị phản ánh ở tuyến mặc định; assignee bị offboard; caller đổi target ref để mở Self người khác; duplicate submit.|Không attachments tự động, không gửi complaint cho manager hoặc lấy support role làm quyền đọc raw.
lifecycle_core|Thực thi revoke/generation và sự kiện offboarding tại authority; deny có hiệu lực trước tác vụ phụ, không phụ thuộc log sink ngoài.|R trước I; R ghi ở authority nhưng cache cũ; enqueue thành công nhưng deny thất bại; tài khoản quay lại và stale event từ đợt cũ.|Không coi một epoch field là chứng minh linearizability; không trì hoãn deny đến TTL.
lifecycle_domain_adapters|Lập fan-out theo tất cả store của scope đang chọn: primary DB, object, search, queue, cache, exports và restore ledger.|Job cũ thức dậy sau xóa; một store purge lỗi; backup cũ restore; tombstone mất khi restore; nội dung owner tự viết còn căn cứ riêng.|Không xóa mọi domain optional chưa chọn hoặc gán đã xóa khi chỉ đặt soft-delete.
general_catalog|Nhập mẫu manual và nội dung chung như draft, review theo audience và provenance, release riêng sau người duyệt thật.|Editor tự khai approved; reviewer tự duyệt bản mình soạn; block SELF bị đổi audience; body đổi nhưng bundle hash giữ cũ.|Không import 72 thẻ thành RELEASED hoặc tạo evidence efficacy giả.
conditional_catalog|Chuẩn bị thẻ theo điểm/nhãn/pair với claim dependencies, selector và bundle closure; serving giữ tắt khi chưa đủ gate.|Feature policy null, claim scope sai form, block withdrawn, nguồn current khác grant. Mọi nhánh không đủ điều kiện phải abstain/fallback đúng quyền.|Không D>=70 hoặc top-two tự tạo D_FOCUS; không bật classifier để đủ báo cáo.
operations_core|Ràng buộc build/deploy/config/secrets/audit tới scope; triển khai giám sát tối thiểu không chứa hồ sơ riêng.|Thiếu effective config; log sink lỗi; private canary trong APM; secret test trong artifact; rollout dùng manifest đo lường thay deployment manifest.|Không deploy production hoặc dùng cloud account suy đoán từ profile người dùng.
scope_rehearsal|Diễn tập deploy/rollback/restore synthetic trên topology thật đã chọn; bảo toàn current deny/deletion/generation.|Restore DB thành công nhưng ledger trễ; worker lease cũ; key đã revoke trong backup; smoke happy path đạt nhưng private projection rò.|Không gọi Python boolean fixture là restore test; không mở traffic trước các kiểm deny.
core_ux|Hiện thực shell, truy cập, riêng tư, quyền dữ liệu và hỗ trợ theo nguồn; phản hồi trạng thái đúng và thao tác bằng bàn phím.|Focus lạc khi dialog đóng; hết phiên giữa thao tác; zoom/reflow; ready package nhầm fulfilled; lỗi quyền không được lộ tồn tại tài nguyên.|Không buộc xây màn hình assessment/pair để nghiệm thu trang chung.
manual_ux|Nối editor, preview, publish, colleague và rights/support vào luồng manual hoàn chỉnh; kiểm responsive và công nghệ hỗ trợ.|Focus error summary, save ACK qua screen reader, hai tab xung đột, nội dung dài 320px, revoke khi trang cũ đang mở.|Không lấy atlas HTML cũ làm bằng chứng E2E hoặc full WCAG.
assessment_ux|Hiện thực scale/item/review/result/history theo exact form, không tự rewrite câu hoặc chọn sẵn mức giữa.|Bỏ chọn khác mức3; item keyboard không tự chuyển câu; missing=null không vẽ0; retest không autopublish; RAW và LINEAR đúng đơn vị.|Không thêm timer đánh giá trung thực, confidence hoặc nhóm mặc định.
extension_ux|Xây chỉ màn hình pair/analytics/AI/connector thuộc capability đã chọn và các state không đủ nguồn/quyền.|B_ONLY không so hai người; analytics OFF không thành0%; AI draft chưa duyệt không auto-public; connector failure không mở quyền.|Không dùng cùng DTO cho employee/operator/research, không bật nhánh chỉ để demo.
manual_rollout|Chuẩn bị hồ sơ go/no-go cho manual sau bằng chứng kỹ thuật, nội dung, pháp lý và vận hành; người phụ trách quyết định mời.|Thiếu người tiếp nhận quyền dữ liệu; lỗi critical vẫn còn dù pass-rate cao; optional backend vẫn phục vụ khi nút ẩn; rollback hồi sinh share.|Codex không mời nhân viên, ký duyệt hoặc kích hoạt sản phẩm từ một checklist.
measurement_route|Lập hồ sơ tự xây/cấp phép với phạm vi đo, IP, quyền tích hợp, lifecycle và chi phí cần xác minh.|License không cho truy xuất hoặc xóa theo scope; vendor evidence không khớp locale; tự xây chưa có mẫu; thiếu báo giá được ghi unknown.|Không chép ngân hàng thương mại hoặc gán độ tin cậy vendor cho Vaga.
qualitative_evidence|Chuẩn bị review item/scale/context theo DOC08/10, phiếu phỏng vấn và quản trị revision; chuyên gia/người thật tạo kết quả sau nghiên cứu.|Mức3 bị hiểu hai nghĩa; L-D07 lẫn thẩm quyền; ghi paraphrase thành quote; đã sửa wording nhưng giữ form revision.|Không tạo người tham gia, chữ ký, quote hay kết luận thẩm định bằng agent.
assessment_synthetic|Hiện thực save–resume–submit–score/stop trên exact manifest và dữ liệu tổng hợp, port công thức theo golden độc lập.|3.00000000000000000000001 bị làm tròn thành3; reverse hai lần; một miền thiếu; hai worker; purpose rút trước commit; plan mismatch.|Không thay khóa giả thuyết, chuyển weight null thành1 ở source hoặc mở bài cho nhân viên.
measurement_release|Tạo workflow review/release manifest, golden oracle, retirement và corrective run có provenance.|Phê duyệt sai hash; cùng người maker/checker; lỗi formula bị disguised retry; source WITHDRAWN còn cache; old-result sửa tại chỗ.|Không phê duyệt đo lường bằng migration DB hoặc software unit test.
research_governance|Chuẩn bị stage protocol, recruitment permissions, vault contact, scope rút dữ liệu và trách nhiệm custodian.|Consent app bị tái dùng cho nghiên cứu; planned_n điền actual_n; khảo sát nhân viên dưới áp lực quản lý; reviewer chưa có.|Không tuyển người hoặc thu dữ liệu nghiên cứu từ task lập trình này.
study_infrastructure|Tách source, workspace phân tích, evidence và release; gắn exact dataset/plan/run, holdout custody và rights.|Dev/confirm có cùng người; synthetic bị gắn EMPIRICAL; dataset frozen sau restriction; evidence ref ngoài scope; null/0 nhầm.|Không chạy thống kê lên dữ liệu người thật hoặc tạo alpha/omega giả.
self_limited|Hiện thực owner result, phản hồi, hành động riêng và lịch sử/retake; lấy source metadata đúng snapshot được yêu cầu.|R1 khi R2 tồn tại; manager đọc URL Self; toàn điểm hòa vẫn classification=null; corrective result không thay original; action note lộ log.|Không claim personality đúng, stress, năng lực hoặc published profile theo điểm.
generic_actions|Xây hành động do owner tự viết/chọn từ nội dung chung, không bắt assessment; trigger, self-check, date-only và timezone riêng.|Ngày đổi bởi timezone thiết bị; xóa action không còn reminder; partial save; note chứa thông tin thứ ba cần cảnh báo/rights.|Không bật nhắc ngoài app hoặc biến completion thành KPI quản lý.
pilot_rollout|Chuẩn bị phạm vi pilot đúng form/protocol, trạng thái kết quả giới hạn và kênh hỗ trợ; người có thẩm quyền mới mở nghiên cứu.|Scale/context chưa duyệt; known issue chưa xử lý; software pass bị dùng thay IP; thay form giữa cohort mà không amendment.|Không lấy user Continue làm đồng ý nghiên cứu hoặc tự gửi lời mời.
empirical_claims|Tổ chức gói evidence theo claim/form/population/purpose và phương pháp; người nghiên cứu thực hiện, reviewer xét kết quả bất lợi.|Model không hội tụ; zero variance; holdout leakage; reliability cao nhưng coverage kém; effect chưa ước lượng không điền0.|Không gán validated=true chung hoặc sửa dữ liệu để có bốn nhân tố.
score_content_synthetic|Xây port interpreter chỉ nhận feature envelope có policy/claim binding; mô phỏng token bằng fixture riêng không tác động nguồn.|Scorer không trả feature mà frontend tự suy; policy null; claim bị rút sau selection; không eligible block phải bỏ gợi ý.|Không dùng high score tự tạo cutoff hoặc đọc raw cho content selection.
reviewed_self_content|Chuẩn bị và kiểm gói nội dung Self đúng audience, source level, context và reviews; người phụ trách duyệt ý nghĩa và quyền sử dụng.|Block đẹp nhưng vượt claim; biến ngôn ngữ điều kiện thành khẳng định; owner không đồng ý bị coi trả lời sai; nội dung bị thu hồi.|Không biến approval tài liệu thành review 72 thẻ hoặc tự mở serving.
self_score_rollout|Chuẩn bị gói phát hành theo đúng phần claim đã được phép; giữ phần chưa đủ evidence OFF và dự phòng general.|Chỉ claim điểm từng miền nhưng mở so sánh giữa miền; source token sai revision; feature bất ngờ bật sau rollback; không thể withdraw.|Không kéo theo classifier/norm hoặc DISC pair khi chỉ duyệt Self content.
literal_pair|Làm A→B từ manual/literal/general theo PAIR_PREFERENCE và target gate; không đọc vector hoặc suy A ở B_ONLY.|B target mất; A không publish; text B không grant; thiếu đủ ba lời khuyên; same A/B; revoke giữa tạo và cấp.|Không NLP text thành trait/preference atom hoặc phần trăm hợp nhau.
semantic_pair|Xây extension binding sau CR: owner chọn code, xác nhận exact field hash/context/publication và applicability.|Text đổi làm hash stale; hai sở thích mâu thuẫn trong context; client gửi hash_matches=true; source publication cũ; revoke purpose.|Không migrate manual cũ bằng NLP hoặc nâng bản template thành owner-confirmed.
preference_rollout|Chuẩn bị acceptance cho literal hoặc semantic đúng variant, kiểm source labels và hiểu của người đọc.|B_ONLY dùng lời so cặp; người nhận tưởng hệ thống đã đánh giá năng lực; nhánh fallback vẫn đọc điểm; thiếu operator xử lý phản ánh.|Không gọi preference advice là DISC pair đã kiểm định.
disc_pair_synthetic|Hiện thực pipeline hai grant SINGLE_SNAPSHOT, version compatibility và direction, dùng fixture có quyền giả định trong sandbox.|Grant R1 nhưng đọc latestR2; A spoof; B vector xuất qua tooltip; R trước I; compatibility UNKNOWN; classifier disabled.|Không tạo all-pairs matrix, không phần trăm hợp nhau hoặc code labels từ raw score.
disc_pair_rollout|Chuẩn bị gói bằng chứng pair theo operation/direction, cả hai nguồn đủ quyền và số hành động đúng giới hạn.|Có consent nhưng không claim; nguồn B bị xóa; riêng A/B được duyệt nhưng pair efficacy chưa rõ; version sau release không tương thích.|Không dùng rollout pair để quyết định tuyển dụng hoặc quan hệ nhân sự.
enterprise_integration|Chọn đúng CAP18 và adapter: trust, SCIM/HRIS hoặc notification; xác định writer/identity/crosswalk và source event lanes.|Email tái cấp; event tương lai bị cập nhật chức danh ghi đè; scan thiếu trang; active=true sau local deny; provider cutover replay.|Không tự kết nối tenant thật hoặc cho source groups viết role/consent/publication.
ai_task_release|Chọn một AIT15, chuẩn bị adapter tối thiểu, egress/source validation, variants hoặc human-reviewed draft, quota và kill.|R trước provider E; AI-only revoke khác source revoke; JSON hợp lệ nhưng đảo nghĩa; timeout unknown provider spend; injection trong text.|Không gửi raw/notes/keys; không auto-publish, chấm điểm hoặc gọi provider để hoàn thành hồ sơ.
analytics_release|Chọn event/metric/view nhỏ nhất, authority capture, cohort maturity, dedup, disclosure family và lifecycle.|Collector OFF có network; view signal không chứng minh đọc; cohort cuối tháng; missing denominator; tổng làm lộ ô bị ẩn; xóa làm differencing.|Không graph A→B, private notes, raw scores, session replay hoặc KPI từ chối test.
operation_review|Chuẩn bị chu kỳ xem xét theo rủi ro/sự kiện, duty roster, SLO thực, capacity, patch và retirement procedure.|Không ai nhận alarm; workload ngoài thử tải; backup chưa drill; processor đổi retention; ngừng app làm mất kênh quyền dữ liệu.|Không đặt lịch cam kết, chi phí hoặc on-call người thật chưa được xác nhận.
reminder_release|Thiết kế task nhắc có lựa chọn riêng, date-only/timezone, quiet window được duyệt, kênh tối thiểu và hủy trước gửi.|Action xóa sau enqueue; same reminder lặp; đổi timezone; opt-out khi send pending; email chứa nội dung note riêng.|Không bật mặc định hoặc coi consent assessment là consent notification.
classification_extension|Chuẩn bị hợp đồng classifier riêng theo bằng chứng; taxonomy, abstention, tie/uncertainty và version link.|Top2 không phân biệt; hai miền không kề; score semantics chưa tương đương; frontend tự gán Balanced; thay classifier sửa lịch sử.|Không đưa threshold0.40SD của nghiên cứu thành runtime khi chưa được review.
norm_extension|Chuẩn bị norm dataset/representativeness/method, population scope, uncertainty và version linking riêng.|Norm vendor bị mượn; SD0; nhóm nhỏ; cùng0–100 bị gọi percentile; new-form dùng norm old-form; null norm bị fallback.|Không chuẩn hóa từ vài nhân viên rồi tuyên bố áp dụng cho mọi người Việt.'''
SPECIAL={}
for line in RAW.splitlines():
 k,focus,tests,no=line.split('|'); SPECIAL[k]={'focus':focus,'negative_probe':tests,'out_of_scope':no}
assert len(SPECIAL)==50, len(SPECIAL)
# Đường dẫn này chỉ là đề xuất repo tương lai, không khẳng định có source ứng dụng.
AREAS={1:['baseline/candidates/','handoff_work/'],2:['architecture/adr/','spikes/'],3:['tooling/','tests/harness/','contracts/candidates/'],4:['modules/identity/','adapters/auth/','tests/identity/'],5:['modules/privacy/','apps/web/privacy/','tests/privacy/'],6:['modules/manual/','apps/web/manual/','tests/manual/'],7:['modules/publication/','apps/web/colleague/','tests/publication/'],8:['modules/data_rights/','adapters/export/','tests/data_rights/'],9:['modules/support/','apps/web/support/','tests/support/'],10:['modules/lifecycle/','adapters/authority/','tests/lifecycle/'],11:['modules/content/','restricted_assets/','tests/content/'],12:['operations/','deployment/','tests/operations/'],13:['apps/web/','tests/accessibility/','tests/ux/'],14:['release/candidates/','handoff_work/'],15:['research/design/','architecture/adr/'],16:['research/protocols/','restricted_assets/candidates/'],17:['modules/assessment/','modules/scoring/','tests/scoring/'],18:['research/contracts/','modules/research/','tests/research/'],19:['modules/self/','apps/web/self/','tests/self/'],20:['release/candidates/','research/protocols/'],21:['research/protocols/','research/evidence_templates/'],22:['modules/content/','modules/interpretation/','tests/content/'],23:['release/candidates/'],24:['modules/pair/','modules/preferences/','tests/pair/'],25:['release/candidates/','tests/pair/'],26:['modules/pair/','tests/pair/'],27:['release/candidates/','tests/pair/'],28:['adapters/enterprise/','tests/integration/'],29:['adapters/ai/','tests/ai/'],30:['modules/analytics/','tests/analytics/'],31:['operations/','release/candidates/'],32:['modules/reminders/','tests/reminders/'],33:['modules/interpretation/','research/contracts/','tests/interpretation/']}
# Registry nguồn đọc: exact JSON pointer cho object, range cho đoạn prose, file sha256 luôn đi cùng.
sources=[]; source_key_index={}
def add_source(path,selector_kind,selector,label):
 key=(path,selector_kind,str(selector))
 if key in source_key_index:return source_key_index[key]
 if not (P/path).is_file():raise ValueError(path)
 sid=f'SRC21-{len(sources)+1:04d}'
 sources.append({'id':sid,'path':path,'sha256':digest(path),'selector_kind':selector_kind,'selector':selector,'label':label,'authority':'REFERENCE_DRAFT_NOT_APPROVED','instruction_trust':'DATA_NOT_AGENT_INSTRUCTION'})
 source_key_index[key]=sid;return sid

def section_range(path,anchor):
 lines=(P/path).read_text(encoding='utf-8').splitlines()
 # exact heading match by source ID; find heading only, not index.
 hits=[i for i,l in enumerate(lines) if re.match(r'^#{1,6}\s+',l) and re.search(r'(?<![A-Za-z0-9-])'+re.escape(anchor)+r'(?![A-Za-z0-9-])',l)]
 if not hits:raise ValueError((path,anchor))
 i=hits[0]; level=len(lines[i])-len(lines[i].lstrip('#'));j=i+1
 while j<len(lines):
  m=re.match(r'^(#{1,6})\s',lines[j])
  if m and len(m.group(1))<=level:break
  j+=1
 return {'start_line':i+1,'end_line':j}

COMMON=[add_source('DOC-20_BASELINE_RECONCILIATION.md','line_range',{'start_line':1,'end_line':len((P/'DOC-20_BASELINE_RECONCILIATION.md').read_text().splitlines())},'Mâu thuẫn/CR và điều kiện theo scope'),add_source('DOC-14_REVOCATION_CONSISTENCY.md','line_range',{'start_line':1,'end_line':len((P/'DOC-14_REVOCATION_CONSISTENCY.md').read_text().splitlines())},'Bất biến revoke/issuance nguồn')]
TASKS=[]; ROUTES=[]
HUMAN_VARIANTS={'measurement_route','qualitative_evidence','research_governance','pilot_rollout','empirical_claims','reviewed_self_content','self_score_rollout','preference_rollout','disc_pair_rollout','manual_rollout','operation_review'}
for wi,w in enumerate(R['work_packages']):
 for v in w['variants']:
  n=len(TASKS)+1;tid=f'TASK21-{n:03d}';num=int(w['id'][-3:]);k=v['key'];ov=SPECIAL[k]
  refs=[add_source('DOC-20_ROADMAP_REGISTRY.json','json_pointer',f'/work_packages/{wi}','WP20 đầy đủ và các biến thể'),add_source('DOC-20_WORK_PACKAGES_DEPENDENCIES.md','line_range',section_range('DOC-20_WORK_PACKAGES_DEPENDENCIES.md',w['id']),w['id']+' nguyên văn')]
  frs=w['fr_refs'];stories=w['primary_story_refs']
  related_api=[a for a in A if set(a['source_fr_ids'])&set(frs)]
  related_ui=[u for u in U if set(u['source_fr_ids'])&set(frs)]
  for fid in frs:
   idx=list(F).index(fid);refs.append(add_source('DOC-05_FUNCTIONS.json','json_pointer',f'/functions/{idx}',fid+' contract đầy đủ'))
  for s in stories:
   refs.append(add_source('DOC-04_BACKLOG.json','json_pointer',f'/stories/{list(S).index(s)}',s+' và nguyên văn AC'))
  for a in related_api:
   refs.append(add_source('DOC-13_API_REGISTRY.json','json_pointer',f'/operations/{A.index(a)}',a['id']+' request/response/boundaries'))
  for u in related_ui:
   refs.append(add_source('DOC-07_UI_REGISTRY.json','json_pointer',f'/screens/{U.index(u)}',u['id']+' states/components'))
  # Files referenced for specialist reading, no deceptive full-read claim.
  docs=[]
  for d in w['source_documents']:
   if d not in docs:docs.append(d)
  if num>=28:docs += [f for f in ['DOC-15_AI_LLM_PERSONALIZATION.md' if num==29 else 'DOC-19_PRODUCT_ANALYTICS_MEASUREMENT.md' if num==30 else 'DOC-18_ENTERPRISE_INTEGRATION.md' if num==28 else 'DOC-17_DEPLOYMENT_DEVOPS_OPERATIONS.md'] if f not in docs]
  recipes=[r['id'] for r in R['release_recipes'] if {'work_package_ref':w['id'],'variant_key':k} in r['required_deliverables']]
  kind='PREPARATION_ONLY' if num<=2 else 'HUMAN_OWNED_AGENT_PREPARES' if k in HUMAN_VARIANTS else 'IMPLEMENTATION_AFTER_BASELINE'
  acs=list(dict.fromkeys(a for s in stories for a in [x['id'] for x in S[s]['acceptance_criteria']]))
  task={'id':tid,'work_package_ref':w['id'],'variant_key':k,'title':v['deliverable'],'kind':kind,'document_status':'REVIEW_DRAFT','dispatch_status':'NOT_DISPATCHED','application_execution_status':'NOT_STARTED','production_authorized':False,
  'goal':ov['focus'],'source_goal':w['goal'],'source_story_ids':stories,'source_fr_ids':frs,'source_ac_pool':acs,'ac_applicability_status':'REQUIRES_SCOPE_ASSERTION_REVIEW','source_dependency_work_packages':w['dependency_refs'],'selected_scope_dependencies':None,'recipe_refs':recipes,
  'required_context_source_ids':refs[:2]+COMMON,'contract_context_source_ids':refs[2:],'specialist_source_files':[{'path':d,'sha256':digest(d)} for d in docs],
  'candidate_write_roots':AREAS[num],'write_scope_status':'PROPOSED_UNBOUND_TO_APPLICATION_REPOSITORY','forbidden_actions':[ov['out_of_scope'],'Không sửa nguồn corpus, golden kỳ vọng hoặc quyền để ép test đạt.','Không secrets/dữ liệu nhân viên/provider calls/deploy trong gói bàn giao.'],
  'prerequisites':['Chọn recipe/variant cụ thể và xác định phần AC áp dụng; không tự mở rộng sang tất cả biến thể của WP.','Source fingerprints khớp; các CR ảnh hưởng được lập delta và reviewer cần có được chỉ rõ.','Trước code runtime: baseline và ADR phù hợp đã được người có thẩm quyền chốt; trước dữ liệu thật: gates DOC16/20 độc lập.'],
  'implementation_steps':w['implementation_steps'],'variant_instructions':[ov['focus'],'Kiểm exact fields/states/projection trong các nguồn có mã được chỉ định; resolve ràng buộc liên-field, không chỉ schema.','Tách adapter/authorization/pure domain; mọi I/O dùng authority/version đã chọn, không trust dữ liệu tự khai từ frontend.'] if kind=='IMPLEMENTATION_AFTER_BASELINE' else [ov['focus'],'Soạn phương án và bằng chứng cần thu; giữ ô actual/approval trống cho đến khi thực hiện đúng phạm vi.','Kết luận phần chưa quyết định bằng blocker có owner và đường tiếp tục độc lập; không ký thay người duyệt.'],
  'negative_test_design':ov['negative_probe'],'source_verification':w['verification'],'migration_notes':w['migration_notes'],'stop_conditions':w['stop_conditions']+[ov['out_of_scope']],
  'evidence_deliverables':['Diff/path list có task, scope, baseline/source digests; không chỉ câu trả lời mô tả.','Bảng từng AC/assertion: áp dụng/ngoài phạm vi cần duyệt, test_id, tầng thực chạy, actual outcome, evidence path/hash.','Phiếu blocker và đánh giá dữ liệu/migration/rollback; không nâng trạng thái source test khi chưa chạy.'],
  'accountable_role':w['accountable_role'],'technical_reviewer_role':'QA/Tech; bổ sung Security/Privacy/Psychometric theo phạm vi','assigned_person':None,'human_approvals':[],'product_command_bindings':None,'runtime_evidence_refs':[],
  'definition_of_done':'Chỉ hoàn tất đầu ra của variant đã chọn và có review/evidence đúng tầng. Không tự đóng toàn story/WP, không cấp quyền phát hành.'}
  TASKS.append(task);ROUTES.append({'work_package_ref':w['id'],'variant_key':k,'task_id':tid,'recipe_refs':recipes,'source_fr_ids':frs,'source_ac_pool':acs,'dispatch_status':'NOT_DISPATCHED'})
assert len(TASKS)==50
REG={'document_id':'DOC-21-TASK-REGISTRY','version':'0.1.0','prepared_on':DATE,'status':'REVIEW_DRAFT','approval_status':'NOT_APPROVED','production_authorized':False,'tasks':TASKS,'count':len(TASKS)}
dump('DOC-21_TASK_REGISTRY.json',REG)
dump('DOC-21_CONTEXT_SOURCES.json',{'document_id':'DOC-21-CONTEXT-SOURCES','version':'0.1.0','sources':sources,'all_sources_are_reference_drafts':True})
dump('DOC-21_VARIANT_ROUTING.json',{'document_id':'DOC-21-VARIANT-ROUTING','version':'0.1.0','routes':ROUTES,'meaning':'ONE_TASK_PER_VARIANT_NOT_APPROVAL_OR_TEST_COVERAGE'})
# Full per-task dossiers with exact source references, not one-line prompts.
parts=['''## 1. Cách giao việc

Mỗi TASK21 là một dossier cho đúng một variant của WP20. Có 50 dossier cho 50 phần đầu ra, không phải 50 phiên Codex đã chạy. Một dossier lớn phải được tách tiếp thành PR nhỏ sau khi có repository; `candidate_write_roots` chỉ là vùng đề xuất. Nguồn FR/US/AC là **pool để xác định phạm vi**, không có nghĩa mọi AC của story đã áp dụng cho mọi variant. Trước làm phải điền bảng applicability theo DOC21_TEST_CI_ENGINEERING_HANDOFF.

Ba dossier đầu cho phép chuẩn bị source/baseline/ADR/toolchain mà chưa phải phát hành người thật. Mọi task nghiên cứu hoặc release thuộc người có thẩm quyền; agent chuẩn bị hợp đồng, dữ liệu giả và biểu mẫu, không tạo kết quả nghiên cứu/chữ ký. Lệnh `python handoff_doc21.py --task TASK21-001` chỉ đọc dossier, không thực thi công việc.

## 2. Chỉ mục

| Task | WP / variant | Loại | Kết quả cần bàn giao |
|---|---|---|---|''']
for t in TASKS:parts.append(f"| [{t['id']}](#{t['id'].lower()}) | {t['work_package_ref']} / `{t['variant_key']}` | {t['kind']} | {t['title']} |")
for t in TASKS:
 body=[f"\n<a id=\"{t['id'].lower()}\"></a>\n## {t['id']} — {t['title']}",f"**WP/variant:** `{t['work_package_ref']}/{t['variant_key']}`. **Loại:** `{t['kind']}`. **Trạng thái:** NOT_DISPATCHED / NOT_STARTED. **Accountable:** {t['accountable_role']}; chưa chỉ định cá nhân.","### Mục tiêu và giới hạn",t['goal'],f"**Ngoài phạm vi:** {t['forbidden_actions'][0]}","### Điều kiện và ranh giới thay đổi"]
 body+=['- '+x for x in t['prerequisites']]
 body+=[f"Vùng file đề xuất: {', '.join('`'+x+'`' for x in t['candidate_write_roots'])}. Chưa có binding tới repo ứng dụng. Không sửa `DOC-00`–`DOC-20`, source banks, reports, hashes hoặc golden trong corpus. Đầu ra mới của bước chuẩn bị đặt trong `handoff_work/` hoặc baseline ứng viên tách riêng.","### Nguồn phải đọc và thứ tự",f"1. WBS/variant: {t['required_context_source_ids'][0]}, {t['required_context_source_ids'][1]}; sau đó ma trận CR và invariant: {', '.join(COMMON)}.",f"2. Contract theo mã: {', '.join(t['source_fr_ids']) or 'Không có FR riêng; đây là enablement, không cấp FR giả.'}",f"3. User Stories: {', '.join(t['source_story_ids']) or 'Không có story đầu mối độc lập.'}","4. Đọc các source excerpts/JSON pointers trong [context registry](DOC-21_CONTEXT_SOURCES.json); dùng `--excerpt <SRC21-ID>` để lấy nguyên đoạn có kiểm hash. Không tải mọi file vào prompt; khi context vượt giới hạn, chọn từng excerpt, không cắt mất exception.","Tài liệu chuyên môn mở khi cần: "+'; '.join(f"[{x['path']}]({x['path']})" for x in t['specialist_source_files'])+'.',"### Trình tự thực hiện"]
 body+=[f"{i+1}. {x}" for i,x in enumerate(t['implementation_steps'])]
 body+=["\n**Làm rõ riêng variant:** "+' '.join(t['variant_instructions'][1:]),"### Dữ liệu, trạng thái và phân quyền",t['migration_notes'],"Với code: lập bảng input/output write/read allowlist từ FR + DATA + DTO. Trường actor, owner, generation, timestamp authoritative, approval và current validity không nhận từ client. Các trạng thái nghiệp vụ không thay bằng enum tiện cho UI. Với hồ sơ nghiên cứu/phê duyệt: planned khác actual, ref tồn tại khác evidence đúng scope.","### Kiểm tra phải chứng minh",t['negative_test_design']]
 body+=['- '+x for x in t['source_verification']]
 body+=["**Observer/fixture:** fixture synthetic phiên bản riêng; dùng canary có positive control cho deny-before-read và egress. Trong code runtime, test qua store/gateway thật của sandbox đã chọn; trong task chuẩn bị, chỉ báo kiểm tệp/đồ thị và giữ integration NOT_RUN. Ghi trước/sau cho record, revision, outbox, generation và các sink liên quan; không chụp dữ liệu người thật.","**Pool AC nguồn:** "+(', '.join(t['source_ac_pool']) or 'Không tạo AC nguồn giả cho enablement.')+". Mỗi AC phải có disposition theo variant; loại scope cần lý do và người review, không xóa nghĩa vụ nguồn.","### Commands, kết quả và review",f"Đã có lệnh đọc dossier cục bộ: `python handoff_doc21.py --task {t['id']}`. Lệnh build/test sản phẩm: **UNBOUND**, được điền sau ADR và kiểm toolchain. Không đổi UNBOUND thành câu lệnh giả hoặc exit 0."]
 body+=['- '+x for x in t['evidence_deliverables']]
 body+=["**Dừng ở đâu:** "+'; '.join(t['stop_conditions'])+"\n\n**Done:** "+t['definition_of_done'],f"Phụ thuộc WP nguồn: {', '.join(t['source_dependency_work_packages']) or 'Không'}. Variant prerequisites phải lấy từ recipe được chọn; không tự kéo mọi variant của mỗi WP phụ thuộc. Recipe có nhắc variant này: {', '.join(t['recipe_refs']) or 'Chưa có trong required_deliverables trực tiếp; cần scope decision riêng.'}."]
 parts.append('\n\n'.join(body))
md('DOC-21_TASK_CARDS.md','DOC-21 — 50 dossier giao việc theo variant','\n'.join(parts))
print('generated task dossier, sources',len(TASKS),len(sources))
