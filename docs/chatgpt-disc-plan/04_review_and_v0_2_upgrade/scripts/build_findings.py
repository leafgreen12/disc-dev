from pathlib import Path
import json,hashlib,collections
O=Path('/mnt/data/Vaga_DISC_Review_2026-10-15');S=Path('/mnt/data/vaga_disc_review/source/vaga_disc_docs_dot_19')
f=[]
def add(priority,kind,title,scope,evidence,impact,action,owner,accept,source_files):
 i=f'RV-{len(f)+1:03d}'; src=[]
 for name,pattern in source_files:
  p=S/name;t=p.read_text() if p.exists() else ''; lines=t.splitlines(); hits=[k+1 for k,l in enumerate(lines) if pattern.lower() in l.lower()] if pattern else []
  src.append({'path':name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else None,'locator_text':pattern,'matching_lines':hits[:8]})
 f.append({'id':i,'priority':priority,'kind':kind,'title':title,'blocking_scope':scope,'evidence':evidence,'impact':impact,'recommended_change':action,'owner_role':owner,'retest_acceptance':accept,'sources':src,'status':'OPEN_RECOMMENDATION_NOT_APPLIED','production_vulnerability_confirmed':False})
add('P0','BASELINE_GAP','Chưa có một baseline thực thi đã hợp nhất','Trước build phần có mâu thuẫn; trước mọi scope người thật',
'DOC21 vẫn giữ baseline ứng viên R20-00, approved_baseline_ref/stack_decision_ref null; bảy CR nền được liệt kê nhưng chưa hợp nhất vào hợp đồng đích.',
'Agent có thể chọn sai giữa nguồn gốc và refinement mới, hoặc tiếp tục tạo kế hoạch thay vì xây phần dùng được.',
'Tạo baseline v0.2 theo scope đầu, có diff và trạng thái ứng viên/được duyệt tách biệt; hợp nhất các CR tác động hành vi, không cần đóng mọi nhánh optional.',
'Product Owner / BA / Tech / Privacy','Một behavior chỉ có một contract có hiệu lực; policy/API/test đồng nghĩa; reviewer xác nhận scope phù hợp.',
[('DOC-21_BASELINE_AUTHORITY.md','Bảy thay đổi nền'),('DOC-21_BASELINE_CANDIDATE.json','approved_baseline_ref')])
add('P0','SCOPE_LEGAL_GAP','Quyền dữ liệu và offboarding chưa thành hợp đồng đồng bộ','Mọi dữ liệu nhân viên thật',
'CR14-01/02 còn yêu cầu hòa giải xử lý dữ liệu sau nghỉ việc, request kinds và clocks. DOC20/21 thừa nhận các thay đổi này chưa áp vào nguồn.',
'Chỉ khóa tài khoản hoặc dùng TTL chung có thể không thực hiện đầy đủ phương án quyền dữ liệu được yêu cầu.',
'Chốt dataflow, người phụ trách, loại yêu cầu, mốc và ngoại lệ theo review pháp lý; cập nhật mới API/data/tests và kế hoạch xóa từng store.',
'Privacy / Legal / HR / Tech','Case ngoài phiên được xử lý đúng scope; offboard deny và xóa/giữ có căn cứ; bằng chứng store-by-store.',
[('DOC-20_BASELINE_RECONCILIATION.md','CR14-01'),('DOC-14_RETENTION_DELETION_RESTORE.md','Mốc chấm dứt')])
add('P0','ARCHITECTURE_EVIDENCE_GAP','Mốc thu hồi–cấp đầu ra chưa được chứng minh trên topology','Các response hoặc egress có dữ liệu được bảo vệ',
'DOC14 nêu hai lần check không loại được khoảng race; DOC17 vẫn cần authority/egress binding và observer.',
'Có thể thực hiện sai cam kết nếu coi epoch field hoặc event xóa cache là hàng rào nguyên tử.',
'Thực hiện spike trên stack chọn: xác định mốc quyết định/handoff; thử lịch reader/writer bằng barrier và quan sát bytes. Nếu topology không đạt, sửa thiết kế có review, không đổi nghĩa âm thầm.',
'Tech Lead / Security / QA / Ops','Các lịch revoke trước request, sau compute trước handoff, và giữa stream có outcome/giới hạn quan sát được; không hứa thu hồi bytes đã ra ngoài.',
[('DOC-14_REVOCATION_CONSISTENCY.md','TOCTOU'),('DOC-17_MIGRATION_JOBS_CONSISTENCY.md','authority')])
add('P0','SCIENTIFIC_EVIDENCE_GAP','Chưa có căn cứ mở nhận xét theo điểm/nhãn','Assessment người thật và các claim phụ thuộc theo stage',
'Bank là candidate; scorer không tạo classification/norm/uncertainty; protocol tốt nhưng chưa có dữ liệu/thẩm định thực địa.',
'Giao diện hoặc marketing có thể tạo ấn tượng công cụ đã biết tính cách nếu bật tính năng sớm.',
'Giữ no-score/no-label cho bản tự chọn; khóa từng claim theo evidence. Nghiên cứu độc lập với build kỹ thuật, cho phép kết luận không phân loại hoặc thay mô hình.',
'Psychometric Lead / Research / Content','Review exact form/context/key; scope nghiên cứu được phép; chỉ nội dung đủ bằng chứng và quyền mới được cấp.',
[('DOC-09_CLASSIFICATION_EVIDENCE.md','classification=null'),('DOC-10_PSYCHOMETRIC_VALIDATION_PROTOCOL.md','0,70')])
add('P1','REPRODUCED_LOCAL_VALIDATION_GAP','MetricEstimate thiếu kiểm miền theo đơn vị','Trước tái sử dụng helper/contract trong ứng dụng',
'PR01–04: COUNT=-3, COUNT=2.5, RAW_MEAN_1_5=7, LINEAR_0_100=107 được helper chấp nhận. COUNT phân số cần định nghĩa riêng nếu chủ đích là weighted estimate.',
'Dữ liệu sai đơn vị có thể đi tiếp tới evidence hoặc dashboard nếu adapter thật cũng thiếu kiểm.',
'Phân nhánh schema/validator theo unit; count quan sát là số nguyên không âm; weighted/noisy estimate có unit riêng. Tách diagnostic bất thường khỏi estimate có thể dùng diễn giải.',
'API / Data / QA','Từ chối raw mean 7, score107, negative count; giữ count0 hợp lệ. Negative tests chạy schema lẫn service.',
[('contract_doc13.py',"if name == 'MetricEstimate'"),('DOC-13_DTO_SCHEMAS.json','RAW_MEAN_1_5')])
add('P1','REPRODUCED_LOCAL_PRECONDITION_GAP','Bốn snapshot ref null vẫn cho local pair allowed','Chỉ helper mô phỏng; cần chặn trước port authorization',
'PR06 gọi evaluate với selected/granted của A/B đều null: allowed=true, runtime_authorization=false. Hàm chỉ so bằng nhau, chưa xác minh sự tồn tại nguồn.',
'Phản ví dụ làm rõ thiếu precondition; không chứng minh có lỗ hổng đang chạy vì chưa có server và authoritative resolver.',
'Đặt typed non-null references; xác minh exact result/grant/owner/generation/method và quyền ở service trước so bằng nhau. Helper hoặc adapter phải từ chối input không đạt precondition.',
'Security / Backend / QA','Null, empty, unknown, wrong-owner và wrong-generation đều deny; thêm case compatible scope và current state.',
[('policy_doc14_reference.py',"snapshot_selected_a"),('DOC-14_AUTHORIZATION_MATRIX.md','SINGLE_SNAPSHOT')])
add('P2','REPRODUCED_LOCAL_CONTRACT_AMBIGUITY','Giá trị hiển thị và precision chưa khóa cùng nghĩa','Self result transport',
'PR05: value75.04 và text75,0 cùng được nhận dù hợp đồng chấm nguồn định một chữ số thập phân ở presentation.',
'Consumer có thể tính lại hoặc hiển thị khác; chưa có bằng chứng sai số học core.',
'Chọn value là display-rounded hoặc exact (tách field riêng); kiểm text và decimal_places cùng contract. Không double-rounding.',
'API / Frontend / QA','Test rõ 75.04/75.0, biên làm tròn và serialization qua ngôn ngữ đích.',
[('contract_doc13.py',"if name == 'SafeDimension'"),('DOC-09_SCORING_CONTRACTS.md','decimal_places')])
add('P1','TOOLCHAIN_GAP','OpenAPI chưa qua validator độc lập đầy đủ','Contract toolchain trước integration',
'Kiểm tĩnh review mới resolve 3.034 $ref,123ops không lỗi cấu trúc được kiểm; cài validator độc lập không thành công do DNS. Không đồng nghĩa OpenAPI đã đầy đủ conformant.',
'Lỗi chuẩn hoặc khác biệt dialect có thể chỉ lộ lúc codegen/framework xử lý.',
'Cài và pin validator trong môi trường có mạng được phép; chạy trên baseline mới và source để ghi chênh lệch; bổ sung tests request/response với service thật.',
'API Architect / QA','Report tool/version/errors; không đóng GAP16-03 chỉ bằng checker tự viết.',
[('DOC-21_VALIDATION_REPORT.md','Validator OpenAPI độc lập')])
add('P1','QUESTION_CONTENT_GAP','Mức giữa và bối cảnh trả lời chưa đủ rõ','Trước pilot câu hỏi',
'Mức3 là Tùy tình huống / ở mức trung bình; context USUAL_WORK chưa có reference_period/novice_guidance được duyệt.',
'Cùng đáp án3 có thể mang nhiều nghĩa; người thiếu cơ hội trải nghiệm dễ chọn giữa như phương án né câu hỏi.',
'Thử wording của thang và hướng dẫn bằng cognitive interview; chọn revision mới; N/A nếu cần là trạng thái riêng có policy chứ không số0/3.',
'Psychometric / UX / Content','Người thử mô tả được cùng nhiệm vụ trả lời; bảo toàn nguồn cũ; không sửa label tại runtime.',
[('DOC-08_QUESTION_BANK_METADATA.md','Tùy tình huống'),('DOC-08_QUESTION_BANK_METADATA.md','novice_guidance')])
add('P1','QUESTION_CONSTRUCT_GAP','Câu hỏi lẫn quyền hạn/năng lực với xu hướng','Trước diễn giải điểm',
'L-D07 reverseD hỏi về phạm vi quyết định; L-C04 so khả năng thấy lỗi với người khác; L-S01 hỏi có thể duy trì nhịp. DOC08 đã ghi các concerns liên quan.',
'Điểm có thể phản ánh nghề, thẩm quyền, self-enhancement hoặc cơ hội thực hiện; đây là giả thuyết nhiễu chưa có bằng chứng thống kê kết luận.',
'Rewrite thành hành vi/sở thích trong điều kiện rõ; expert review polarity; phân tích role dependence/cross-loading sau thu dữ liệu có quyền.',
'Psychometric / Research','Mỗi item rủi ro có disposition giữ/sửa/loại và bằng chứng; không giữ câu nghịch chỉ để đủ quota.',
[('DOC-08_SOURCE_INVENTORY.md','L-D07'),('DOC-08_SOURCE_INVENTORY.md','L-C04')])
add('P1','DESIGN_TRADEOFF','Missing policy có thể làm giảm kết quả đủ miền','Assessment UX và chất lượng mẫu',
'REQUIRE_ALL_ITEMS mỗi miền; minh họa giả định độc lập missing2% cho .98^10=81,7% đủ miền, .98^40=44,6% đủ cả bài. Không phải tỷ lệ Vaga.',
'Quy tắc bảo thủ có thể gây nhiều kết quả giới hạn; người bị thiếu dữ liệu không nhất thiết thiếu hợp tác.',
'Đánh giá policy100% và các phương án được chuyên gia đề xuất bằng dữ liệu nghiên cứu; báo thiếu và bias; không tự impute hoặc hạ ngưỡng chưa review.',
'Psychometric / UX / Data','Báo coverage, sai số và khác biệt nhóm theo từng phương án; quyết định được version hóa.',
[('DOC-09_SCORING_CONTRACTS.md','REQUIRE_ALL_ITEMS')])
add('P1','CONTENT_TAGGING_GAP','44/72 thẻ dùng cả bảy context','Bộ chọn nội dung theo tình huống',
'Kiểm bank đếm44thẻ gắn7contexts; CB11-SELF-D-03 nói giao việc/chốt phương án nhưng có recognition trong eligibility.',
'Giảm tính chọn lọc; không chứng minh mọi output đang sai, nhưng chưa đủ đảm bảo cá nhân hóa theo nhiệm vụ.',
'Giới hạn context chính/phụ và exclusion theo thẻ; viết negative suitability cases; chấp nhận không có thẻ thay vì ép đủ3.',
'Content / UX / QA','Mỗi thẻ có context rationale và ít nhất một counterexample; review đầu ra theo tình huống, không chỉ theo D/I/S/C.',
[('DOC-11_CONTENT_BANK.json','CB11-SELF-D-03')])
add('P1','PRODUCT_OPPORTUNITY','Private actions bị phụ thuộc assessment không cần thiết','MVP hai luồng giá trị',
'WP20-019 phụ thuộc WP017; ActionInput hiện có title/trigger/behavior/success_signal/date/timezone và không yêu cầu result.',
'Giá trị phát triển cá nhân bị trì hoãn vì chờ khoa học dù hành động tự chọn không cần suy DISC.',
'Tạo variant self_chosen_actions_no_assessment; cho người dùng tự chọn mục tiêu/thử hành vi/ghi nhận riêng; không suy tính cách, không tự share.',
'Product / BA / Backend / UX','Người chưa có bài đánh giá vẫn tạo/sửa/xóa hành động; owner-only; xóa/offboard/restore đúng scope.',
[('DOC-20_WORK_PACKAGES_DEPENDENCIES.md','Self, hành động riêng'),('DOC-13_DTO_SCHEMAS.json','"ActionInput"')])
add('P1','USER_EVIDENCE_GAP','Chưa kiểm ba tác vụ thực với người dùng mục tiêu','Phê duyệt UX theo scope',
'Có prototype atlas và kiểm trình duyệt trước; UAT/nghiên cứu thực giữ NOT_RUN trong tài liệu.',
'Ngôn ngữ hoặc số bước có thể đúng về mặt hợp đồng nhưng gây bỏ cuộc.',
'Tạo bản thử không fixture controls ở chế độ người dùng; thử soạnmanual,đọccheatsheet,tựchọnaction bằng hồ sơ giả và protocol phù hợp.',
'UX / Product / QA','Ghi thời gian, lỗi, trợ giúp cần và vấn đề quan sát; không suy khả năng tiếp cận toàn bộ từ ảnh chụp.',
[('DOC-07_PROTOTYPE_AND_REVIEW.md','người dùng'),('DOC-16_ENVIRONMENTS_AND_TEST_DATA.md','ENV16-UX-SYN')])
add('P1','SCOPE_COMPLEXITY','Dễ hiện thực toàn inventory thay vì lát cắt hữu dụng','Chi phí và thời gian build',
'123API,65thực thể,43mẫuUI là phạm vi thiết kế tổng; chưa phải nhu cầu bắt buộc của bản đầu.',
'Có thể dành phần lớn công sức dựng framework quản trị trước khi kiểm được manual và hành động.',
'Chọn operation/entities theo end-to-end slice, dùng modular monolith đề xuất; giữ invariants thiết yếu và hoãn extension bằng OFF enforcement.',
'Tech Lead / Product','Danh mục IN/OUT của scope; không có đường backend phụ ngoài phạm vi; không tính % hoàn tất theo số bảng/endpoint.',
[('DOC-20_CAPABILITY_RELEASE_MATRIX.md','R20-01'),('DOC-12_DATA_MODEL.md','logic')])
add('P1','CONTRACT_DRIFT_RISK','Nhiều biểu diễn cùng quy tắc thiếu nguồn sinh duy nhất','Duy trì schema/API/validation/policy',
'Các module có Markdown, JSON schema, registry, helper và fixture độc lập; PR01–05 cho thấy bảngngữnghĩa và checker có thể lệch nhau.',
'Mỗi thay đổi có thể cần sửa nhiều nơi; kiểm số ID không phát hiện mọi drift ý nghĩa.',
'Chọn canonical runtime contract và sinh docs/client/basicvalidators; giữ oracle độc lập và semanticrules viết rõ. Không sinh expected từ chính hàm cần kiểm.',
'Tech / API / QA','Thay một field cập nhật projections/testsimpacted có diff; CI chặn generatedfilesdrift.',
[('DOC-13_DATA_CONTRACTS.md','MetricEstimate'),('DOC-21_CONTEXT_CONTRACT_MAP.md','contract')])
add('P1','QUALITY_COVERAGE_GAP','Nhiều kiểm tra hình thức hơn kiểm tra phản ví dụ độc lập','QA trước tái sử dụng helpers',
'114checker cuối đạt nhưng review tạo6phảnví dụ cần xử lý; nhiều đoạn setup chung lặp375lần trong catalog.',
'Số PASS có thể tạo cảm giác bao phủ lớn hơn thực tế nếu được đọc không đúng phạm vi.',
'Giữ các kiểm hiện có; thêm đơn vịđúng/sai,mutation/propertytests,negativeauth và independentobserver. Chọn assertions theo rủi ro chứ không quota.',
'QA / Reviewer độc lập','Test làm hỏng guard thực phải fail; actualartifactđúngtầng; không tăng sốtestbằng tách vòng lặp tùy ý.',
[('DOC-16_ACCEPTANCE_TEST_CATALOG.md','Đặt lại namespace'),('DOC-21_VALIDATION_REPORT.md','114/114')])
add('P2','CONFIRMED_DOCUMENT_LINK_DEFECT','50 liên kết hỏng ở README lịch sử','Khả năng tra cứu archive',
'Scan12.957localMDlinks thấy28ở history/batch09/README và22ở history/batch08/README. Điểm bắt đầu current không bị phát hiện lỗi này.',
'Người truy lịch sử dễ đi vào tài liệu không còn ở đường dẫn cũ.',
'Không sửa bản nguồn bất biến; tạo archive navigation overlay/crosswalk path hoặc view sửa link có nhãn generated, kiểmlinktoànarchive.',
'Documentation / Tooling','Toàn bộ link current và archiveviewresolve; filegốcvẫngiữhash.',
[('history/batch09/README.md','DOC-11'),('history/batch08/README.md','DOC-10')])
add('P2','MAINTAINABILITY_RISK','Boilerplate và lịch sử làm context bị loãng','Đọc tài liệu và sử dụng agent',
'9.414lượt lặp trong33.700dòngMarkdown>100ký tự; có lịch sử và bảnghợp lệ nên không thể gọi27,9%tài liệu là thừa.',
'Người đọc cần lọc nhiều chữ chung để tìm quyết định của thao tác hiện tại.',
'Dùng sharedpolicyreferences và generateddetailview; agent nhậnactivecontract+đúngtask+negativetests, archivekhôngtựnạp.',
'BA / Tech Writer / Tech','Đo truyxuất theo task vàkhả năng tìmngoạilệ; không cắt bớt requirementđể giảm byte.',
[('DOC-16_ACCEPTANCE_TEST_CATALOG.md','Đặt lại namespace'),('DOC-21_CONTEXT_SOURCES.json','selectors')])
add('P1','DRAFT_RUNTIME_BOUNDARY','Schema draft không phải schema có thẩm quyền runtime','Importer, release và cấu hình',
'Nhiều packet cố ý constfalse/NOT_APPROVED; helper mô phỏng nhậnbooleancase. Tài liệu đã nêu không dùng những giá trị đó làm authorization.',
'Developer có thể bỏ constđể mở hệ thống mà không xây workflowtrust.',
'Tách inputtácgiả,đối tượngtrusted vàprojection; authorityfieldsdo serviceghi; testphỏngduyệt bám identityđược xácminh.',
'Security / API / Release','Upload tự khaiAPPROVEDkhông cấpquyền; reviewer target/scope/hashđúng; draft khôngship làmprodseed.',
[('DOC-08_QUESTION_BANK_METADATA.md','APPROVED'),('DOC-11_CONTENT_CONTRACTS.md','authoring')])
add('P1','DECISION_GOVERNANCE','290 quyết định chưa được phân nhóm để chốt scope đầu','Khởi động build',
'DEC-001–290đãđược cấp; trạngtháiởbảnbàn giao vẫn đề xuất. Không cần đónghết nhưng cần danh sách vài quyếtđịnhtácđộngscope.',
'Phêduyệt trở thành nghẽn nếu mọi việc đều bị coi cùngmứccấp thiết.',
'Chia quyếtđịnh REVERSIBLE_TECH, PRODUCT_SCOPE, SENSITIVE_AUTHORITY, SCIENTIFIC. Bổnhiệmowner thật; ưu tiên8quyếtđịnhscopeđầu, hoãnoptional cótrigger.',
'Sponsor / Product / Tech / Domain owners','Không blocker vô chủ; scope buildcó approvedtargethoặcsynthassumption rõ; khôngkýgiảđểqua gate.',
[('DOC-21_DECISIONS_AND_REFERENCES.md','DEC-290'),('DOC-21_BASELINE_AUTHORITY.md','Mục đích không phải đóng hết')])
add('P2','OPTIONAL_INVESTMENT','AI, HRIS và analytics rộng hơn nhu cầu đã chứng minh','Các nhánh tùy chọn',
'Từng nhánh có đặc tả sâu nhưng provider/nhucầu/nănglực chưađược chọn; configđềutắt.',
'Xây đồngthời làmloãngMVP vàtăngrủirolưu dữliệubênngoài.',
'Giữtắt; ưu tiênrule/literalgeneralvàquytrìnhtàikhoảnantoàntốithiểu. Chọnmột nhánh chỉsaukhi lợiíchvượtchiphí/rủirođượcthử.',
'Product / Tech / Finance / Privacy','Có decisionNO_BUILDhoặcmục tiêuđotăngthêm; khôngépoptional thànhđiềukiệnmanual.',
[('DOC-15_CONFIG_PROPOSAL.json','false'),('DOC-18_CONFIG_PROPOSAL.json','false'),('DOC-19_CONFIG_PROPOSAL.json','false')])
add('P1','SCIENCE_MODEL_DECISION','Bốn điểm liên tục chưa tự tạo 12 kiểu hợp lệ','Classifier/norm/so sánh',
'DOC09đãphânbiệtcác thangcó thểkhác mức dễđồngý vàchưachứngminhđơnvịtâm lýchung. Taxonomy12chỉdựkiến.',
'Top2rawhoặcngưỡngcứngcóthểgánnhãn tùytiện; chuẩnhoákhôngtựchứngminh circumplex.',
'Giữđiểmmô tảtheoscope; kiểm4factortươngquanvàgiảthuyếttrục/vòngkhiphùhợp. Chỉmởtaxonomyvìgiátrịcầnthiết vàevidence.',
'Psychometric / Product','Không tựgánD/I/S/Ctừmax; classifiercóabstention,holdout/stability vàgiới hạn đượcduyệt.',
[('DOC-09_CLASSIFICATION_EVIDENCE.md','Một norm cùng quần thể'),('DOC-09_CLASSIFICATION_EVIDENCE.md','Taxonomy')])
add('P1','CONTENT_IP_REVIEW_GAP','Nội dung mới soạn chưa được thẩm định nghĩa hoặc quyền','Trước serving người thật',
'Bankcâuhỏivànộidungđềunêuauthorclaim/reviewchưacó. Metadataoriginalkhôngchứngminhkhônggiốngtài sảnđượcbảohộ.',
'Cóthểtriểnkhaimộttuyênbốhoặc câuvănbấtlợimàkhôngai chịu tráchnhiệm.',
'Reviewtheotargetrevision/hash,phạmvisửdụng,quyềntácgiả vàmeaning. Ưutiênthẻcủascopeđầu thayduyệttoànthưviện.',
'Content / IP-Legal / Psychometric khi cần','Chỉassetđủreviewmớiđượcchọn; bỏcitationvendorđểhợp thứchóanộidungkhôngphùhợp.',
[('DOC-11_CONTENT_BANK.json','rights_review'),('DOC-08_QUESTION_BANK_METADATA.md','REPORT_CLAIMS_NEWLY_AUTHORED')])
add('P2','ANALYTICS_INTERPRETATION_RISK','Nhóm nhỏ và UNSURE cần cách báo cáo minh bạch','Analytics/khảo sát có điều kiện',
'Ngưỡng20người/5mỗiphía chỉproposal; metricYES/(YES+NO)khôngtínhUNSUREtrongmẫusốchính.',
'Dashboardcóthểkhôngcósốhoặctạoấn tượnghữuíchcaonếukhônghiểnthịđầyđủtrảlời.',
'Báo3nhómtrảlờivàresponserate; thiếucohortdùngqualitative/taskstudy; khônghạprivacyđểcósố.',
'Analytics / Product / Privacy','Ngườixemnắmrõmẫusốvàchưachắc; suppressedkhôngròcountquaexport/tooltip.',
[('DOC-19_METRIC_DICTIONARY.md','UNSURE'),('DOC-19_CONFIG_PROPOSAL.json','20')])
add('P0','LIFECYCLE_EVIDENCE_GAP','Xóa và chống hồi sinh dữ liệu chưa diễn tập thực','Mọi scope có dữ liệu người thật',
'Runbook/ledger/restoređãđặctảnhưng chưaDB/objectstore/backuprehearsal; trạngtháisourcechưaruntime.',
'Cóthểxóarowchínhnhưngcònpayloadtrongexport,queue,log,backuphoặcđãkhôi phục.',
'Lậpdatamapstore-by-store,mỗimụccóowner/lịch/căncứ. Diễn tậpxóasynthetic,restorequarantine,replaydeny,xácminhtrướcmởtraffic.',
'Ops / Security / Privacy / QA','Khôngđọclạidữliệuđãxóatừrestore; phần giữtốithiểucóscope/căn cứ; khônggọi pseudonym/hashlàẩn danh.',
[('DOC-17_BACKUP_RESTORE.md','restore'),('DOC-20_BASELINE_RECONCILIATION.md','GAP20-11')])
add('P1','HANDOFF_EXECUTABILITY_GAP','Lệnh sản phẩm chưa bind và agent chưa chạy task thật','Từ chuẩn bị sang build',
'DOC21 có15vịtrílệnhchưaargv/cwd;114checks làhelper. KhôngrepoapphoặcCodexexecution.',
'Góiđược hiểulànhậplệnhlàchạyapptrongkhichỉđọctài liệu.',
'SauADR tạo repo,vòngbuild/testtốithiểu vàmộttaskđầu-cuốicónegativecases; AGENTSthựctếnêunguồnvàlệnhđúng,khôngnhéttấtcảcorpus.',
'Tech Lead / QA','Checkout sạchchạylệnhđãghi vàtestmột slice; outputcófiles/commands/actuals; khôngclaimproduction.',
[('DOC-21_BOOTSTRAP_COMMANDS.md','UNBOUND'),('DOC-21_VALIDATION_REPORT.md','15 binding')])
add('P1','INVESTMENT_DECISION_GAP','Hướng tự xây hoặc cấp phép assessment cần quyết định thực','Track đo lường',
'WP20-015 làgóichọnhướngnhưngchưacóquyếtđịnh/quyềntíchhợphoặcnguồnlựckiểm định.',
'Dùngtiềnvàthờigiancodeđểđánhgiáthayvìtổngchiphíkiểm định,IP,UI/API,vòngđờidữliệu.',
'So3phươngán:workstyletựchọnkhôngđiểm;DISC-inspiredtựkiểmđịnh;licenseinstrumentcóquyềntíchhợp. Lấyquote/contractthựckhicânnhắc,khôngbáogiágỉa.',
'Product / Psychometric / Legal / Finance','Cóquyếtđịnhlýdo,căncứquyền,phạmviđượctuyênbố,TCOvàexit; khôngcầndừngmanualkhinghiêncứu.',
[('DOC-20_WORK_PACKAGES_DEPENDENCIES.md','WP20-015'),('DOC-20_DECISIONS_AND_REFERENCES.md','DEC-267')])
(O/'review_findings.json').write_text(json.dumps({'review_date':'2026-10-15','scope_note':'Các mục là lỗi tệp/hợp đồng, khoảng trống bằng chứng hoặc đề xuất thiết kế. P0 là chặn phạm vi liên quan, không tuyên bố đang có lỗ hổng production.','findings':f},ensure_ascii=False,indent=2))
print(len(f),dict(collections.Counter(x['priority'] for x in f)))
