from pathlib import Path
import json
O=Path('/mnt/data/Vaga_DISC_Review_2026-10-15')
p=O/'review_findings.json';d=json.loads(p.read_text());fs=d['findings']
clean={
18:{'evidence':'Trong 33.700 dòng Markdown dài hơn 100 ký tự, có 9.414 lượt lặp nguyên văn. Số này gồm bảng dùng chung và tài liệu lịch sử, nên không thể gọi 27,9% nội dung là thừa.', 'recommended_change':'Dùng tham chiếu chính sách chung và các bản chi tiết được sinh có kiểm soát. Agent nhận hợp đồng active, task và các kiểm thử ngoại lệ; không tự nạp archive.','retest_acceptance':'Đánh giá khả năng tìm nguồn và ngoại lệ theo task; không cắt bớt yêu cầu chỉ để giảm dung lượng.'},
19:{'evidence':'Nhiều gói tác giả cố ý khóa false/NOT_APPROVED. Helper mô phỏng nhận các giả định dạng boolean; tài liệu đã nói không dùng những giả định này làm authorization.','impact':'Developer có thể bỏ các hằng khóa để mở hệ thống mà không xây workflow có nguồn thẩm quyền.','recommended_change':'Tách đầu vào tác giả, đối tượng do dịch vụ có thẩm quyền quản lý và projection. Trường authority do service ghi; kiểm duyệt giả phải bị chặn theo danh tính thực.','retest_acceptance':'Upload tự khai APPROVED không cấp quyền. Reviewer phải đúng target, scope và hash; draft không được đưa vào production như tài sản đã duyệt.'},
20:{'evidence':'Đã có mã DEC-001 đến DEC-290; trạng thái trong gói bàn giao vẫn là đề xuất. Không cần đóng hết, nhưng cần chọn những quyết định ảnh hưởng scope đầu.','impact':'Phê duyệt trở thành điểm nghẽn nếu mọi lựa chọn đều bị coi cùng mức cấp thiết.','recommended_change':'Chia thành quyết định kỹ thuật có thể đảo ngược, phạm vi sản phẩm, authority nhạy cảm và khoa học. Bổ nhiệm owner thật; ưu tiên tám quyết định scope đầu, hoãn nhánh khác với điều kiện mở lại.','retest_acceptance':'Không có blocker vô chủ. Scope build có baseline được duyệt hoặc giả định synthetic rõ; không ký giả để vượt gate.'},
21:{'evidence':'AI, tích hợp và analytics đều có đặc tả sâu, nhưng nhu cầu, nhà cung cấp và năng lực chưa được chọn; cấu hình đang tắt.','impact':'Xây đồng thời làm loãng MVP và tăng rủi ro gửi/lưu dữ liệu ngoài ứng dụng.','recommended_change':'Giữ tắt; ưu tiên quy tắc, hướng dẫn nguyên văn hoặc chung, cùng quy trình tài khoản an toàn tối thiểu. Chỉ chọn nhánh mới khi giá trị tăng thêm được đối chiếu với chi phí và rủi ro.','retest_acceptance':'Có quyết định không xây hoặc mục tiêu đánh giá cụ thể; không biến nhánh tùy chọn thành điều kiện phát hành manual.'},
22:{'evidence':'DOC09 đã phân biệt các thang có thể khác mức dễ đồng ý và chưa chứng minh một đơn vị tâm lý chung. Taxonomy 12 nhãn chỉ là dự kiến.','impact':'Lấy hai điểm raw cao nhất hoặc ngưỡng cứng có thể gán nhãn tùy tiện. Chuẩn hóa không tự chứng minh cấu trúc vòng tròn.','recommended_change':'Giữ điểm mô tả theo phạm vi; kiểm mô hình bốn nhân tố tương quan và giả thuyết trục/vòng khi phù hợp. Chỉ mở taxonomy vì mục đích cần thiết và bằng chứng hỗ trợ.','retest_acceptance':'Không tự gán nhãn từ max. Classifier cần khả năng không phân loại, kiểm độ ổn định và giới hạn được duyệt.'},
23:{'evidence':'Ngân hàng câu hỏi và nội dung đều giữ trạng thái chưa có review thực. Lời khai mới soạn không chứng minh không giống tài sản được bảo hộ.','impact':'Nội dung chưa được người chịu trách nhiệm xem xét có thể được cấp cho nhân viên quá sớm.','recommended_change':'Review theo revision/hash, phạm vi sử dụng, quyền tác giả và ý nghĩa. Ưu tiên tài sản của scope đầu, không cần duyệt đồng thời toàn bộ thư viện.','retest_acceptance':'Chỉ tài sản đủ review mới được chọn. Một citation vendor không thay bằng chứng quyền sử dụng hoặc tính phù hợp nội dung.'},
24:{'evidence':'Ngưỡng 20 người và 5 người mỗi phía chỉ là đề xuất. Công thức YES/(YES+NO) không đưa UNSURE vào mẫu số chính.','impact':'Dashboard có thể không đủ số để công bố hoặc tạo ấn tượng hữu ích cao nếu không trình bày các câu trả lời chưa chắc.','recommended_change':'Báo ba nhóm trả lời và tỷ lệ phản hồi. Khi nhóm không đủ điều kiện, dùng nghiên cứu tác vụ/định tính có quyền; không hạ bảo vệ chỉ để có số.','retest_acceptance':'Người xem hiểu mẫu số và phần chưa chắc. Ô bị ẩn không lộ count qua export hoặc tooltip.'},
25:{'evidence':'Runbook và cơ chế ledger/restore đã được mô tả, nhưng chưa có diễn tập trên DB, object store và backup thực.','impact':'Có thể xóa bản ghi chính nhưng còn payload trong bản xuất, queue, log, backup hoặc dữ liệu đã phục hồi.','recommended_change':'Lập bản đồ từng store với owner, lịch và căn cứ. Diễn tập xóa dữ liệu tổng hợp, phục hồi trong cách ly, áp lại deny và xác minh trước mở traffic.','retest_acceptance':'Không đọc lại dữ liệu đã xóa qua đường phục hồi ngoài phương án cho phép. Phần giữ tối thiểu có căn cứ; không gọi pseudonym/hash là ẩn danh.'},
26:{'evidence':'DOC21 có 15 vị trí chờ lệnh sản phẩm, chưa có argv/cwd thực. Bộ 114 kiểm tra là helper; chưa có repository ứng dụng hay lần thực hiện Codex.','impact':'Gói có thể bị hiểu là chỉ cần chạy lệnh sẽ có ứng dụng, trong khi các lệnh hiện chỉ đọc và kiểm tài liệu.','recommended_change':'Sau ADR, tạo repository, vòng build/test tối thiểu và một task đầu-cuối có negative cases. AGENTS thực tế nêu nguồn và lệnh đúng, không yêu cầu nạp toàn corpus.','retest_acceptance':'Checkout sạch chạy được lệnh đã ghi và kiểm một lát cắt. Output có files, commands, actual results; không gọi đó là phê duyệt production.'},
27:{'evidence':'WP20-015 là gói chọn hướng assessment, nhưng chưa có quyết định, quyền tích hợp hoặc nguồn lực kiểm định được xác nhận.','impact':'Có thể chỉ tính chi phí code mà bỏ qua nghiên cứu, IP, bản dịch, API, vòng đời dữ liệu và vận hành.','recommended_change':'So ba phương án: workstyle tự chọn không điểm; DISC-inspired tự kiểm định; cấp phép instrument có quyền tích hợp. Thu báo giá/contract thực khi cân nhắc, không tự đưa giá giả.','retest_acceptance':'Quyết định có lý do, quyền sử dụng, phạm vi tuyên bố, tổng chi phí và phương án thoát. Việc lựa chọn instrument không buộc dừng manual.'}}
for i,v in clean.items():fs[i].update(v)
# Explicit text fixes for the earlier entries; technical identifiers remain unchanged.
repl={
'RAW_MEAN_1_5=7':'RAW_MEAN_1_5=7','count0':'COUNT=0','score107':'score=107','value75.04':'value=75.04','text75,0':'text=75,0',
'44thẻ':'44 thẻ','7contexts':'7 contexts','3.034 $ref,123ops':'3.034 $ref và 123 operations','PR01–04':'PR01–PR04','PR01–05':'PR01–PR05',
'COUNT0':'COUNT=0','PROPORTION2':'PROPORTION=2','sourceXML':'source XML','Mức3':'Mức 3','reverseD':'reverse D',
'RATE2':'RATE=2','missing2%':'missing 2%','12.957localMDlinks':'12.957 liên kết Markdown cục bộ','28ở':'28 ở ','22ở':'22 ở ',
'đượcselected':'được selected','L40/L48':'L40/L48','testhồiquy':'test hồi quy','beforeporting':'trước khi chuyển mã',
'scopebuild':'scope build','Đủmetadata':'Đủ metadata','PR06':'PR06','Kếtquả':'Kết quả','tronghàm':'trong hàm',
'Content/UX':'Content/UX','basicvalidators':'basic validators','generatedfilesdrift':'drift của file được sinh',
'testsimpacted':'tests bị ảnh hưởng','datatype':'data type','suppliedsource':'supplied source',
'context–thẻ':'context–thẻ','counterexample':'counterexample','previewreceipt':'preview receipt',
'parentfields':'parent fields'}
def walk(o):
 if isinstance(o,str):
  for a,b in repl.items():o=o.replace(a,b)
  return o
 if isinstance(o,list):return [walk(x) for x in o]
 if isinstance(o,dict):return {k:walk(v) for k,v in o.items()}
 return o
d=walk(d)
for x in d['findings']:
 for s in x['sources']:
  s['locator_status']='LITERAL_MATCH' if s['matching_lines'] else 'SOURCE_FILE_ONLY_NO_LITERAL_MATCH'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2))
# Main report: polish combinations while preserving equations and IDs.
p=O/'01_BAO_CAO_REVIEW_TONG_THE.md';t=p.read_text()
rep={
'COUNT=0và':'COUNT=0 và','quyền/API':'quyền/API','sourcev0.1':'source v0.1','privateactions':'private actions','dataflowpháplý':'dataflow pháp lý',
'backup/restorevàrunbook':'backup/restore và runbook','scopeđầu':'scope đầu','gatesriêng':'gates riêng','lấysốfilehaylượtxem':'lấy số file hay lượt xem',
'bằngchứng hiệuquả':'bằng chứng hiệu quả','scorecontent':'score content','preferencepair':'preference pair','tíchhợpvàanalytics':'tích hợp và analytics',
'đồngnghiệpxem':'đồng nghiệp xem','rútquyền/xóa':'rút quyền/xóa','tựchọn':'tự chọn','no-score/no-label':'no-score/no-label',
'manual+privateactions':'manual + private actions','cósố':'có số','thốngkê':'thống kê','sourcev0.1':'source v0.1',
'24tháng':'24 tháng','30/07/2025;':'30/07/2025;','12kiểu':'12 kiểu','0,40SD':'0,40 SD','COUNT=2.5':'COUNT=2.5',
'value75.04':'value=75.04','toànbộ123API/65thực thể':'toàn bộ 123 API/65 thực thể','28lỗ hổng':'28 lỗ hổng',
'lặp375lần':'lặp 375 lần','manual+selfchosen':'manual + self-chosen','selfchosen':'self-chosen',
'formvà':'form và','OpenAPI Specification3.1.2':'OpenAPI Specification 3.1.2','fileVaga':'file Vaga',
'khôngcó':'không có','forced-choice':'forced-choice','giữscope':'giữ scope','bytesđã':'bytes đã'}
for a,b in rep.items():t=t.replace(a,b)
p.write_text(t)
