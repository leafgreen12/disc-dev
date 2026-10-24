---
title: "Review tổng thể bộ tài liệu Vaga DISC — DOC-00 đến DOC-21"
version: 1.0.0
prepared_on: 2026-10-15
status: REVIEW_RECOMMENDATIONS
source_baseline: "Vaga_DISC_Tai_lieu_Dot_19_DOC21_v0.1.0.zip"
original_files_modified: false
application_test_status: NOT_RUN
scientific_validation_status: NOT_ESTABLISHED
---

# Review, chấm điểm và phản biện tổng thể Vaga DISC

## 1. Kết luận điều hành

**Bộ tài liệu tốt hơn ở chiều sâu phân tích, quản trị rủi ro và bảo vệ dữ liệu so với mức sẵn sàng giao thẳng để lập trình.** Không nên bỏ bộ tài liệu; cũng không nên yêu cầu Codex hiện thực toàn bộ 519 tệp như một đặc tả cùng có hiệu lực.

Điểm đánh giá có trọng số của tôi là **73,5/100, làm tròn 74/100 cho chất lượng bộ đặc tả**. Mức sẵn sàng *giao thẳng để triển khai với ít quyết định nền bổ sung* là **45/100**. Đây là điểm đánh giá chuyên môn theo rubric công khai bên dưới, không phải độ chính xác khoa học, chứng nhận tiêu chuẩn hoặc phần trăm ứng dụng đã hoàn thành.

**Khuyến nghị chính:** tạo một bản thiết kế hợp nhất v0.2 cho phạm vi hẹp: **manual cộng tác + hành động phát triển tự chọn, riêng tư + nền danh tính/quyền/vòng đời an toàn**. Phần nghiên cứu DISC tiếp tục song song. Chưa cần bật nhãn tính cách, chuẩn tham chiếu, lời khuyên theo điểm, AI, SCIM/HRIS hoặc product analytics.

Lý do chọn phương án này không phải phủ nhận DISC hoặc rút mục tiêu thành một danh bạ. Nó đưa **cả hai luồng giá trị** đến người dùng sớm mà không phải suy luận những đặc điểm chưa có bằng chứng. Sau khi instrument đủ điều kiện, assessment trở thành một nguồn đầu vào bổ sung, không là điều kiện để toàn bộ sản phẩm có ích.

## 2. Phạm vi review và mức bằng chứng

### 2.1. Đã thực hiện

Review dùng gói ZIP đợt 19 làm nguồn khóa; không sửa nguyên bản. Đã kiểm kê và kiểm toàn vẹn toàn gói, rà 22 nhóm tài liệu lõi, đối chiếu các hợp đồng và mâu thuẫn có tác động lớn, đọc sâu ngân hàng câu hỏi, scoring, nội dung, data/API, security, QA và handoff. Đã xem hình nguyên mẫu để phân biệt atlas thử nghiệm với giao diện sản phẩm.

Đã chạy lại checker DOC21 trên bản làm việc riêng; thực hiện kiểm số học mới bằng dữ liệu tổng hợp; thử phản ví dụ ở helper; kiểm tham chiếu OpenAPI, JSON và liên kết Markdown. Phương pháp bổ sung không lấy output của scorer làm expected cho chính scorer.

### 2.2. Chưa thực hiện

Không có ứng dụng để kiểm thử API/DB/SSO/egress thật. Chưa pentest, đánh giá WCAG toàn ứng dụng, phỏng vấn nhân viên, kiểm định tâm lý đo lường hoặc xác nhận quyền sở hữu trí tuệ. Không độc lập xác minh từng câu chữ trong toàn bộ 519 tệp hay mọi URL trong thư viện nghiên cứu. Các kiểm tự động về liên kết không chứng minh đúng nội dung của tài liệu đích.

Nguồn bên ngoài chỉ được đối chiếu ở các điểm cần thiết: phát triển thang đo, OpenAPI, AGENTS.md và nguyên tắc xử lý dữ liệu người lao động. Không gọi phần đối chiếu pháp lý là legal opinion hoặc bằng chứng ứng dụng tuân thủ.

### 2.3. Bằng chứng thực chạy

| Hạng mục | Kết quả mới | Giới hạn |
|---|---:|---|
| Kiểm kê gói | 519 tệp; 224 Markdown, 242 JSON, 34 Python và các định dạng khác | Bao gồm phụ lục, lịch sử và công cụ; không phải 519 tài liệu nghiệp vụ độc lập |
| Đối chiếu manifest | 518/518 mục khớp size và SHA-256 | Manifest không tự chứa hash của chính nó; checksum không chứng minh đúng nội dung hay có phê duyệt |
| Chạy lại checker DOC21 | 114/114 đạt | Chỉ kiểm gói bàn giao và helper, không kiểm ứng dụng |
| Bộ đáp án tổng hợp mới | 60/60 phép đối chiếu linear-score đúng | 30 L40 + 30 L48; không chứng minh validity, fairness hoặc nhãn DISC |
| Kiểm OpenAPI tĩnh bổ sung | 123 operations, 3.034 tham chiếu nội bộ; không lỗi trong các kiểm đã chạy | Không phải validator OpenAPI độc lập đầy đủ |
| Phân tích JSON toàn gói | 242 tệp đọc được | Không tương đương semantic validation mọi object |
| Kiểm local Markdown links | 12.957 lượt; 50 liên kết hỏng | 28 trong README lịch sử batch09, 22 trong batch08; không phải 50 lỗi tại START HERE hiện hành |
| Phản ví dụ helper | 6 trường hợp cần sửa hoặc làm rõ; 2 kiểm đối chứng | Không phải sáu lỗ hổng production |
| Metadata nội dung | 44/72 thẻ gắn đủ bảy context | Tín hiệu cần review độ chọn lọc; không tự chứng minh mọi lời khuyên sai |

Bằng chứng: [kiểm cấu trúc](structural_audit.json), [checker chạy lại](DOC21_independent_rerun.json), [số học mới](independent_arithmetic_tests.json), [OpenAPI tĩnh](openapi_static_audit.json), [JSON/liên kết](corpus_links_and_json_audit.json), [phản ví dụ](adversarial_probe_results.json), [nội dung/sản phẩm](content_and_product_audit.json).

## 3. Cách chấm điểm

### 3.1. Chất lượng bộ đặc tả

| Tiêu chí | Trọng số | Điểm /10 | Nhận định |
|---|---:|---:|---|
| Giá trị sản phẩm và mức tập trung | 10% | 8,0 | Hai luồng giá trị rõ; thứ tự giao giá trị Self còn có thể cải thiện |
| Yêu cầu người dùng/nghiệp vụ | 10% | 8,0 | Có phạm vi, ngoại lệ và khả năng truy vết |
| UX và ứng dụng hằng ngày | 10% | 7,5 | Có mẫu/luồng; chưa có bằng chứng tác vụ người dùng |
| Thiết kế đo lường và giới hạn diễn giải | 15% | 7,0 | Protocol thận trọng; câu hỏi và mô hình chưa hoàn thiện thực nghiệm |
| Dữ liệu/API và nhất quán hợp đồng | 15% | 7,0 | Rất nhiều chi tiết; có semantic gaps và CR chưa hợp nhất |
| Thiết kế bảo mật/quyền riêng tư | 15% | 8,5 | Ranh giới tốt; còn cần topology và quyết định áp dụng thật |
| QA và chất lượng bằng chứng | 10% | 7,0 | Phân tầng tốt; kiểm thử còn thiên về artifact và mô phỏng |
| Tính khả thi triển khai, ưu tiên | 10% | 6,0 | Phạm vi lớn, nhiều lựa chọn chưa khóa |
| Khả năng duy trì nguồn có hiệu lực | 5% | 6,5 | Hash/lịch sử tốt; còn lặp và thiếu active baseline |
| **Tổng** | **100%** | **73,5/100** | **Làm tròn 74/100** |

Công thức: tổng của `trọng số × điểm/10`. Điểm không phải số đo thống kê; thay đổi vài điểm theo người review không làm thay đổi kết luận: nên giữ nền phân tích nhưng hợp nhất và giảm phạm vi thực thi trước.

### 3.2. Mức giao thẳng cho kỹ thuật

Năm tiêu chí, mỗi tiêu chí 20%: phạm vi/baseline khóa 4/10; công nghệ/runtime/lệnh 2/10; hợp đồng nhất quán 6/10; gắn công việc với test/harness 3/10; truy vết/handoff 7,5/10. Tổng **45/100**.

Điểm này không nói 55% tài liệu “sai”. Nó phản ánh lượng quyết định và công việc nối hợp đồng còn lại trước khi một nhóm khác có thể triển khai mà không tự đoán. Các task chuẩn bị vẫn có thể bắt đầu ngay bằng dữ liệu tổng hợp.

**Tình trạng khoa học:** chưa có căn cứ để cho một điểm “độ chính xác DISC”. Nói 0% hoặc 95% đều không có dữ liệu hỗ trợ. Tình trạng đúng là **chưa thiết lập được bằng chứng kiểm định cho instrument của Vaga trong phạm vi sử dụng dự kiến**.

Chi tiết từng DOC và lý do cho điểm nằm ở [báo cáo 22 tài liệu](02_DANH_GIA_CHI_TIET_22_TAI_LIEU.md); dữ liệu tính điểm ở [review_scores.json](review_scores.json).

## 4. Những phần thực sự tốt và cần giữ

### 4.1. Không biến DISC thành công cụ quyết định giá trị con người

Tài liệu nhiều lần tách xu hướng tự báo cáo khỏi năng lực, đạo đức, sức khỏe và thành tích. Kết quả có thể không phân loại. Pair không có phần trăm hợp nhau và không tạo bản đồ xếp hạng nhân viên. Đây không phải các phần nên cắt khi tinh gọn.

### 4.2. Hai lớp dữ liệu riêng và dữ liệu chia sẻ được phân biệt đúng

Self không tự trở thành public. Manual do chủ hồ sơ viết, xem trước và xác nhận; bản nháp và bản công bố cùng tồn tại. Quyền pair được tách khỏi quyền nhìn thấy manual. Làm lại bài không tự đổi nguồn điểm đã cấp quyền.

### 4.3. Phiên bản và nguồn được quản trị có thực chất

Item revision, form, key hypothesis, scoring plan, content và publication có danh tính riêng. Bộ chấm không đoán chiều khóa bằng tên câu hay từ phủ định. Phân biệt JSON parse được, code đúng, reviewer ký và dữ liệu đã kiểm định là điểm mạnh cần bảo toàn.

### 4.4. Số học tham chiếu đủ tốt để tiếp tục phát triển

Review mới không tìm sai khác ở 60 bộ đáp án thử đối với giá trị linear-score chính xác. Đây là nền phù hợp để port có kiểm thử; không cần viết lại bộ chấm từ đầu chỉ vì toàn sản phẩm còn chưa build. Việc thiếu câu trả null thay vì 0 và giữ classification tắt hiện là lựa chọn trung thực.

### 4.5. DOC10 không mắc lỗi đơn giản hóa kiểm định thành một hệ số

Nguồn phân biệt omega của composite quan sát, alpha bổ trợ, sai số, ICC agreement và mục tiêu từng claim. Không nên phản biện sai rằng tài liệu “chỉ có Cronbach alpha”. Vấn đề còn lại là tổ chức thực hiện, thẩm định câu hỏi và dữ liệu thực; không phải thiếu hoàn toàn phương pháp. Nguồn: `DOC-10_SAMPLING_ANALYSIS_PLAN.md §8` và `DOC-10_PSYCHOMETRIC_VALIDATION_PROTOCOL.md §13`.

## 5. Phản biện trọng tâm: tài liệu quá nhiều hay quyết định chưa đủ?

**Vấn đề chính không phải số trang.** Người dùng yêu cầu tài liệu chi tiết nên độ sâu là hợp lý. Vấn đề là nhiều biểu diễn của cùng một quy tắc, nhiều trạng thái chưa chốt và nhiều lớp mô tả “cần làm rõ ở tài liệu sau” còn tồn tại đến cuối chuỗi.

Bộ cuối có 290 mã DEC. Có 24 CR nguồn trước DOC20, ba CR20 và hai CR21; không nên suy rằng tất cả đều phải được đóng trước một thử nghiệm nhỏ. Nhưng các thay đổi ảnh hưởng trực tiếp tới quyền, dữ liệu và hành vi của scope được chọn phải có **bản đích thống nhất**, không chỉ một dòng “đã nhận diện”.

Ví dụ: FRD nguồn ưu tiên nhánh điểm trước; DOC11 đề xuất preference-first. Hai hướng có thể đều có lý do, nhưng engine chỉ được chạy theo một thứ tự đã chọn. Chỉ lưu cả hai rồi giao Codex đọc là chưa kết thúc công việc thiết kế. Tương tự, request kinds của quyền dữ liệu và guard review target đã có yêu cầu sửa nhưng chưa được hợp nhất vào API/schema mới.

### Phương án thay thế

Giữ nguyên `reference/v0.1.0/` để tra cứu. Dựng `active/v0.2/` với phạm vi chọn, OpenAPI, schema dữ liệu, policy, state transitions, UX và acceptance instances cùng hiệu lực. Các nội dung sinh từ một nguồn chuẩn phải được đánh dấu generated. Những mô tả giải thích dài vẫn hữu ích nhưng không được trở thành nguồn quyết định thứ hai.

Một approval cho nội dung không phải approval khoa học; một phê duyệt scope không phải bằng chứng test. Tuy nhiên, không cần xây hệ thống workflow phê duyệt tổng quát phức tạp ngay từ ngày đầu. Có thể quản trị baseline bằng quy trình review có người chịu trách nhiệm và lưu chứng cứ phù hợp, miễn không bỏ quyền và khả năng truy vết bắt buộc.

## 6. Các phản ví dụ kỹ thuật đã tái hiện

### 6.1. Kiểm miền giá trị còn thiếu ở MetricEstimate

Với object tổng hợp đúng các trường còn lại, `contract_doc13.py` chấp nhận:

| Mã | Đầu vào | Kết quả thực | Đánh giá |
|---|---|---|---|
| PR01 | `COUNT=-3` | ACCEPT | Không hợp lệ với số đếm quan sát |
| PR02 | `COUNT=2.5` | ACCEPT | COUNT chưa phân biệt số đếm nguyên với weighted/noisy estimate |
| PR03 | `RAW_MEAN_1_5=7` | ACCEPT | Ngoài miền của trung bình thang 1–5 |
| PR04 | `LINEAR_0_100=107` | ACCEPT | Ngoài miền thang đã khai báo |
| PC01 | `COUNT=0` | ACCEPT | Đối chứng hợp lệ, phải tiếp tục nhận |
| PC02 | `PROPORTION=2` | REJECT | Đối chứng: phần kiểm tỷ lệ đang hoạt động |

Hàm hiện kiểm CORRELATION và PROPORTION nhưng chưa kiểm đủ các đơn vị khác. Đây là **khoảng trống validation tại helper/schema được review**, không kết luận server thật sẽ chấp nhận vì chưa có server.

Nâng cấp: dùng hợp đồng phân nhánh theo unit. COUNT quan sát phải nguyên không âm; nếu cần ước lượng phân số, đặt đơn vị/estimator riêng. RAW_MEAN_1_5 trong [1,5], LINEAR_0_100 trong [0,100]. Nếu nghiên cứu cần giữ estimate bất thường để chẩn đoán, lưu ở khu diagnostic riêng, không cho nó trở thành estimate đủ điều kiện cấp báo cáo hoặc claim. Kiểm thêm interval, unit, sample size và quan hệ với point estimate theo method phù hợp.

### 6.2. Snapshot rỗng nhưng mô hình quyền trả allowed

Trong PR06, bốn trường selected/granted của A và B đều null, nên phép so “selected bằng granted” vẫn đúng. Các điều kiện giả khác thỏa, helper trả `allowed=true` và vẫn giữ `runtime_authorization=false`.

Sửa đúng không chỉ là thêm một if ở cuối. Cần hợp đồng đầu vào typed/non-null, resolver xác minh bản kết quả tồn tại, cùng chủ thể, đúng thế hệ, đúng phạm vi grant và tương thích phương pháp. Sau đó mới so exact reference. Nếu helper chỉ được gọi sau các điều kiện này, chúng phải được ghi rõ và adapter phải kiểm thật; hiện phản ví dụ cho thấy hàm đơn lẻ không bảo đảm điều đó.

### 6.3. Precision hiển thị cần thống nhất

`SafeDimension` nhận value=75.04 trong khi text là “75,0”. Đây chưa chứng minh tính sai điểm: helper đang so chuỗi sau làm tròn. Nhưng contract nguồn chọn một chữ số lẻ ở presentation nên cần quyết định rõ value là giá trị hiển thị đã làm tròn hay giá trị chính xác. Không dùng một field cho cả hai nghĩa.

### 6.4. Không đánh tráo kết quả review

Sáu phản ví dụ không phải sáu lỗi nghiêm trọng ngang nhau: PR03/04 là thiếu validation miền rõ ràng; PR02 là thiếu định nghĩa phân loại số đếm; PR05 là cần thống nhất representation; PR06 là thiếu precondition trong mô hình cục bộ. Không có bằng chứng về truy cập trái phép trên ứng dụng đã triển khai.

Dữ liệu đầy đủ: [adversarial_probe_results.json](adversarial_probe_results.json). Kế hoạch tái chạy: [reproduce_review.py](reproduce_review.py). Không chỉnh helper gốc trong đợt review.

## 7. Review khoa học và bộ câu hỏi

### 7.1. Điều cần ưu tiên là nội dung, không phải thêm câu cho đủ số

64 phát biểu ứng viên được quản trị tốt về nguồn không có nghĩa chúng đã đo đúng. Quá trình xây thang cần phân biệt định nghĩa miền, phát triển câu, xem xét nội dung, thử cách hiểu và đánh giá thang. Bài phương pháp của Boateng và cộng sự hữu ích để đối chiếu chuỗi này; không cung cấp chứng nhận cho Vaga. [S1]

| Câu/nhóm | Vấn đề cần kiểm | Hướng nâng cấp để thử, chưa phải câu đã kiểm định |
|---|---|---|
| L-D07: cần phạm vi quyết định rõ | Đúng thẩm quyền có thể bị chấm thành D thấp | Cố định hoàn cảnh “trong phạm vi quyền đã được giao”, rồi hỏi mức chủ động đề xuất/chốt; reviewer đánh giá lại key |
| A-D02: tránh tự quyết khi quyền chưa rõ | Có thể đo trách nhiệm thay vì xu hướng thấp D | Không dùng như cực nghịch mặc định; sửa hoặc loại sau review |
| L-C04: thấy lỗi người khác bỏ qua | So sánh năng lực tự nhận, dễ tự nâng hình ảnh | Hỏi hành vi kiểm tra chi tiết thực tế, không so giỏi hơn người khác |
| L-S01: có thể duy trì nhịp | Pha trộn khả năng, điều kiện công việc và sở thích | Hỏi lựa chọn nhịp làm việc trong điều kiện có quyền chọn |
| L-I04: thích thuyết phục bằng câu chuyện | Kỹ năng/đào tạo sales có thể chi phối | Kiểm nhân viên ngoài sales; tránh dùng kỹ thuật được học làm đại diện toàn miền I |
| L-C01 và L-C10 | Cùng kiểm cuối công việc, có thể trùng nội dung | Kiểm tương quan và độ phủ; giữ câu tốt hơn hoặc dùng một câu đo khía cạnh C khác |
| L-D06, L-S09 | Đồng thuận/lắng nghe có thể thành đáp án “tốt” | Làm rõ nhịp quyết định trong tình huống, không biến lễ phép thành low/high score |
| Mức trả lời 3 | Hai ý “tùy tình huống” và “ở mức trung bình” | Thử các cách diễn đạt khác ở revision mới; không sửa thang âm thầm |

Ví dụ ứng viên mới để review, không thay nguyên văn nguồn: “Trong phạm vi quyền đã được giao, tôi thường tự đề xuất bước tiếp theo khi công việc bị chững.” Câu này vẫn có rủi ro đáp án đẹp; cần chuyên gia và người đi làm đánh giá, không tự coi sửa câu là xong validation.

DOC08 đã nhận diện nhiều concerns trên. Đóng góp của review là **đưa chúng lên thành việc cần giải quyết trước sử dụng**, không giả đây là phát hiện chưa từng được tài liệu nhắc tới.

### 7.2. Missing policy: bảo thủ nhưng cần đo chi phí

Nếu giả định mỗi câu có xác suất bỏ trống 2%, độc lập, thì xác suất đủ 10 câu của một miền là `0,98^10≈81,7%`; đủ toàn bộ 40 câu là `0,98^40≈44,6%`. Đây chỉ là mô hình minh họa, không phải số liệu nhân viên Vaga. Thiếu một miền vẫn có thể nhận số ở miền khác theo chính sách hiện tại.

Ví dụ cho thấy cần nghiên cứu độ nhạy chứ không đủ để chốt ngưỡng mới. Không nên tùy tiện đổi sang “trả lời 80% là chấm” hoặc tự điền3. Hãy so phương án đầy đủ với phương án do chuyên gia đề xuất, kiểm sai số, mức đổi kết luận và khác biệt nhóm. Khi chưa đủ dữ liệu, giữ kết quả giới hạn và ngôn ngữ không phán xét.

### 7.3. Chưa cần 12 nhãn để có giá trị

Cùng có bốn thang 1–5 không tự tạo đơn vị tâm lý so sánh chung; norm từng miền cũng không tự chứng minh cấu trúc vòng tròn. DOC09 đã nói đúng điều này. Không nên hoàn thiện “tính năng thiếu” bằng top-two hoặc ngưỡng0,40 SD lấy từ giả thuyết cũ.

Nâng cấp tốt là giảm lời tuyên bố đến mức có bằng chứng: nội dung tự chọn, sở thích được xác nhận, phản tư theo hoàn cảnh. Nếu dữ liệu sau này không ủng hộ taxonomy12, sản phẩm vẫn có thể giữ thang đa chiều hoặc đổi mô hình mà không đánh mất giá trị cộng tác.

### 7.4. Tự xây hay cấp phép

Ba phương án nên được quyết định riêng: dùng manual/sở thích tự khai không điểm; tự phát triển instrument DISC-inspired; cấp phép công cụ đã có bằng chứng cho phạm vi tương ứng. Cấp phép không tự giải quyết quyền API, bản dịch, dữ liệu nhân viên, retention hoặc quyền tạo report. Tự xây không chỉ tốn chi phí code mà còn review, nghiên cứu, vận hành và giới hạn tuyên bố. Chưa có quote/contract thực nên review này không đưa bảng giá giả.

## 8. Review thư viện nội dung: cá nhân hóa cần đúng tình huống

44/72 thẻ hiện có đủ cả bảy contexts: 16 CORE_SELF, 12 STYLE_REFLECTION và 16 DIRECTIONAL_BRIDGE. Một thẻ có thể dùng nhiều tình huống, nhưng gắn tất cả như mặc định làm mất giá trị lọc.

`CB11-SELF-D-03` có mục tiêu tách yêu cầu bắt buộc và phần thương lượng, áp dụng khi giao việc hoặc xin chốt phương án. Nó cũng được gắn recognition. Cần chứng minh cách dùng trong ghi nhận thực sự có ích hoặc loại context đó. Không nên coi việc selector trả được một thẻ là bằng chứng thẻ đúng hoàn cảnh.

Đề xuất kiểm bốn lớp: nguồn đủ quyền; ý nghĩa đủ bằng chứng; tình huống phù hợp; hành động làm được. Mỗi thẻ nên có context chính, những context phụ có lý do, counterexample và giới hạn chọn. Nguồn sở thích B đúng context được ưu tiên nhưng không vượt quy trình/an toàn. Khi không có thẻ, trả nguyên văn chỉ dẫn được phép hoặc hướng dẫn chung có nhãn; không lấp đủ ba bằng AI.

## 9. Product/UX: nâng cấp quan trọng nhất

### 9.1. Bản đầu nên có Self không phụ thuộc điểm

Roadmap gộp Self/action/history/retest vào WP20-019 phụ thuộc WP20-017 assessment. Nhưng `ActionInput` đã mô tả người dùng tự viết và không bắt buộc result. Đây là cơ hội tái sử dụng thiết kế chứ không phát minh module xa mục tiêu.

Tách variant **private_self_chosen_actions**: người dùng chọn một tình huống muốn cải thiện, viết hành vi sẽ thử, xác định dấu hiệu đã làm và ngày tự xem lại. Có thể dùng gợi ý chung đã duyệt; không nói “vì bạn là D nên phải…”. Mọi ghi chú riêng vẫn owner-only, xóa được, không thành dashboard quản lý.

Ví dụ: “Trong cuộc họp tuần này, trước khi chốt phương án, tôi sẽ hỏi một ý kiến khác. Dấu hiệu tự kiểm: đã nghe ít nhất một ràng buộc mình chưa nghĩ tới.” Đây là hành động do người dùng tự chọn, không là phép đo tính cách hay cam kết tăng hiệu suất.

### 9.2. Manual một phút cần ưu tiên ba điều quan trọng

Không ép người dùng hoàn thành cả bảy section trước khi thấy giá trị. Bắt đầu bằng ba điều: cách trao đổi, thông tin cần khi giao việc, cách nhận phản hồi. Những tình huống khác mở rộng sau. Trên hồ sơ đồng nghiệp, ưu tiên câu chữ đã được chủ hồ sơ xác nhận và cập nhật gần đây, không mở bằng bài giảng DISC.

### 9.3. Prototype cần đúng fidelity để đánh giá

Atlas hiện tại hữu ích cho QA; controls mô phỏng không phải lỗi UI cuối. Để nghiệm thu người dùng, cần một chế độ sạch với ba hành trình, không có bộ chọn giả định/quyền test. Kiểm cả thông báo chưa lưu, thu hồi, xung đột, quay lại và tương tác bằng bàn phím; không chỉ happy path.

## 10. Kiến trúc và quyền: tinh gọn nhưng không nới bảo vệ

### 10.1. Phương án khuyến nghị có điều kiện

Với phạm vi nội bộ và quy mô chưa xác nhận, tôi ưu tiên **một ứng dụng mô-đun, một nguồn quyết định quyền nhất quán và cơ sở dữ liệu quan hệ**. Đây là đề xuất để ADR xem xét, không lựa chọn framework/cloud đã được Vaga phê duyệt.

Các mô-đun logic: Identity & Privacy; Manual & Directory; Private Actions; Assessment tắt theo gate; Content Rules; Rights/Support/Operations. Mô-đun không đồng nghĩa microservice. Không có lý do đã được chứng minh để khởi đầu bằng nhiều dịch vụ, hàng đợi phức tạp, Kubernetes hoặc kho analytics riêng.

Các invariant như owner, tenant, generation, publication pointer, unique command/result và quyền xử lý nên được thể hiện rõ. Tài sản nội dung có thể giữ payload versioned với schema, nhưng không đẩy toàn bộ permission vào JSON tùy ý cho linh hoạt.

### 10.2. Quyền quản trị phải có giới hạn thực

Giữ tách EDIT, REVIEW, RELEASE và operator dữ liệu. Review theo đúng target và assignment; maker không tự phê duyệt thay đổi nhạy cảm. Nhưng phải bind vào tổ chức thực: ai có thể làm, người duyệt dự phòng, thời điểm xem lại và nơi lưu chứng cứ. Một ma trận đẹp không thay hoạt động quản trị.

### 10.3. Nghỉ việc, giữ và xóa dữ liệu

Nguồn Chính phủ nêu yêu cầu xóa/hủy dữ liệu cá nhân người lao động khi chấm dứt hợp đồng, với ngoại lệ theo thỏa thuận hoặc pháp luật. [S4] Vì vậy, đề xuất thời hạn24 tháng cho kết quả không thể tự dùng làm căn cứ giữ mọi dữ liệu sau nghỉ việc.

Cần người phụ trách pháp lý xem từng loại dữ liệu, căn cứ, ngoại lệ và nơi lưu thực tế. Không hứa xóa mọi bản đã ra ngoài; không dùng khó khăn backup như ngoại lệ tự tạo. Thiết kế xóa, lưu chứng cứ tối thiểu, key access và restore phải được thử trong môi trường an toàn trước người thật.

## 11. QA và handoff: từ kiểm tệp sang kiểm hệ thống

### 11.1. Số lượng không thay coverage

Một story có năm AC, một API có nhiều trục REQUIRED hoặc một checker duyệt475sourcefiles vẫn có ý nghĩa, nhưng không phải bằng chứng độc lập cho từng hành vi runtime. Phần setup chung lặp 375 lần nên được chuyển thành fixture/harness có version và parameter rõ, không lặp thành văn bản dài.

Giữ mọi AC nguồn; chọn applicability của scope đầu rồi triển khai assertions cụ thể. Bổ sung kiểm phá hoại có kiểm soát: đổi key/scaling, bỏ non-null, bỏ owner guard, đưa field thừa, làm lệch timestamp/revision. Test phải phát hiện được những thay đổi đó. Reviewer độc lập nên soạn phản ví dụ thay vì chỉ mở rộng fixture từ chính tư duy viết helper.

### 11.2. OpenAPI cần checker phù hợp và test runtime

OpenAPI phân biệt schema và hướng dùng dữ liệu; `readOnly`/`writeOnly` là annotations không tự biến thành quyền server. [S2] Gói hiện đã có nhiều DTO tách riêng, nên nên tiếp tục hướng đó. Kiểm chuẩn độc lập vẫn cần chạy; lỗi môi trường cài công cụ không được coi là đã đạt. Không cần đổi phiên bản OpenAPI chỉ vì xuất hiện bản mới nếu bản hiện tại đáp ứng và toolchain hỗ trợ.

### 11.3. Codex cần context có thẩm quyền, không thêm một prompt khổng lồ

AGENTS.md nên chỉ dẫn nguồn active, lệnh thực, ranh giới được sửa và những điều cấm. Tài liệu chính thức mô tả Codex ghép chỉ dẫn theo phạm vi và có giới hạn kích thước nạp mặc định; một tệp AGENTS không làm mọi tài liệu trong repository tự được đọc. [S3]

Handoff tốt nhất cho một task là contract đã chốt + dữ liệu thử + expected độc lập + danh sách file được sửa + lệnh kiểm + cách báo kết quả. Nếu stack chưa chọn, task đầu hợp lý là ADR/spike; không ghi lệnh giả như thể đã chạy. Sau khi chọn xong, phải thực sự có một vòng checkout–build–test, thay vì thêm một checklist mới về việc cần vòng này.

## 12. Các ưu tiên cần xử lý

[Registry 28 phát hiện](review_findings.json) gồm **5 mục P0, 18 mục P1 và 5 mục P2**. Đây là lỗi tệp/hợp đồng, khoảng trống bằng chứng và cơ hội thiết kế; không phải28 lỗ hổng.

| Mức | Ý nghĩa | Trọng tâm |
|---|---|---|
| P0 | Chặn scope liên quan trước build có mâu thuẫn hoặc trước dữ liệu thật | Baseline; quyền/offboarding; R/I; evidence khoa học khi mở claim; xóa/restore |
| P1 | Cần sửa trong đợt nâng cấp trước dùng module tương ứng | Validation; OAS; câu hỏi; context nội dung; private actions; UX; task/test bindings |
| P2 | Cải thiện tính rõ và chi phí duy trì, hoặc chỉ tác động nhánh tùy chọn | Precision cần làm rõ; link lịch sử; boilerplate; optional investment; cách báo analytics |

Không để lỗi link lịch sử chặn việc thử hành vi synthetic đã rõ. Ngược lại, không lấy hàng trăm kiểm file đạt để bỏ qua một lỗi quyền hoặc dữ liệu trước khi cho người thật dùng.

## 13. Kế hoạch nâng cấp được đề xuất

**A — Khóa phạm vi và hợp nhất:** giữ source v0.1; chốt manual + private actions + quyền/vòng đời; giải quyết các CR nền và xác định trách nhiệm. Chưa mở assessment hay provider.

**B — Sửa các hợp đồng đã có phản ví dụ:** PR01–06, context44thẻ, precision, active sources, linkarchiveview. Chạy lại regression và OAS checker độc lập khi môi trường cho phép.

**C — Tạo một lát cắt synthetic thực sự:** đăng nhập đúng người → tạo manual/action → xác nhận lưu → công bốmanual → đồng nghiệp xem → rút quyền/xóa → kiểm phục hồi. Privateaction không công bố.

**D — Rà thực địa và điều kiện dữ liệu thật:** usability, accessibility, nội dung scope đầu, dataflow pháp lý, backup/restore và runbook. Chỉ mở nội bộ có kiểm soát khi các điều kiện áp dụng được đáp ứng.

**E — Nghiên cứu instrument song song:** chọn tự xây/cấp phép; content/cognitive review; sampling/analysis theo claim. Chưa đủ khoa học không chặn manual/self-chosen, nhưng chặn nhận xét theo điểm.

**F — Đầu tư các nhánh sau khi có lý do:** preference pair, score content, classifier/norm, AI, tích hợp và analytics theo gates riêng. Không lấy số file hay lượt xem làm bằng chứng hiệu quả.

Chi tiết công việc, điều kiện nghiệm thu và ranh giới thực thi: [kế hoạch nâng cấp](03_KE_HOACH_NANG_CAP_V0_2.md).

## 14. Những việc không nên làm

Không viết lại toàn bộ từ đầu; sẽ mất những ngoại lệ tốt đã có. Không giảm privacy chỉ để bản đầu nhanh. Không phát triển toàn bộ123API/65thực thể thành CRUD. Không mở classifier bằng cách đặt threshold cho xong. Không nhập draft thành approved seed. Không tự hợp thức booleans trong fixture thành evidence thật. Không tiếp tục tăng số tài liệu để thay bước ra quyết định và thử một lát cắt.

Cũng không nên cực đoan theo hướng ngược lại: bắt hoàn tất mọi nghiên cứu, mọi integration và mọi DEC trước khi thử manual hoặc hành động tự chọn bằng dữ liệu giả. Scope phù hợp và mức tuyên bố phù hợp là cách giảm rủi ro mà vẫn tiến lên.

## 15. Tám quyết định cần chốt đầu tiên

| Quyết định | Khuyến nghị ban đầu | Người chịu trách nhiệm |
|---|---|---|
| Phạm vi bản đầu | Manual + private self-chosen actions + nền an toàn | Product Owner |
| Mô hình vận hành | Một ứng dụng mô-đun; chưa cần nhiều dịch vụ | Tech/Ops, sau xác nhận workload |
| Định danh | Chọn theo hệ thống thực; không suy từ email/domain | Tech/Security/HR |
| Quyền dữ liệu/vòng đời | Chốt theo dataflow và nguồn pháp lý, không TTL nháp | Privacy/Legal/HR |
| Nguồn có hiệu lực | Một active baseline cho scope đầu | BA/Tech/QA |
| Hướng instrument | Tự xây có nghiên cứu hay cấp phép có quyền tích hợp | Product/Psychometric/Legal |
| Nội dung bản đầu | Chỉ general/template được review; owner xác nhận manual | Content/UX/Privacy |
| Nghiệm thu | Một vòng end-to-end có negative/race/delete/restore | QA/Tech/Ops |

Quy mô nhân sự, khả năng đầu tư và stack chưa có dữ liệu xác nhận nên không gán ngân sách hay ngày cam kết. Các quyết định có thể đảo ngược về kỹ thuật không cần cùng mức phê duyệt với pháp lý hoặc khoa học; nhưng mọi quyết định đều cần người thực chịu trách nhiệm.

## 16. Nguồn đối chiếu ngoài corpus

**[S1] Boateng et al., 2018.** Best Practices for Developing and Validating Scales for Health, Social, and Behavioral Research: A Primer. Đã đọc HTML về định nghĩa miền, phát triển item và chuỗi đánh giá. Không sử dụng số liệu của nguồn như dữ liệu Vaga. URL: https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2018.00149/full

**[S2] OpenAPI Initiative.** OpenAPI Specification 3.1.2, phần Schema Object/annotations và mô hình operation. Nguồn chuẩn được chọn, không là kết quả validator cho file Vaga. URL: https://spec.openapis.org/oas/v3.1.2.html

**[S3] OpenAI.** Custom instructions with AGENTS.md. Đối chiếu chuỗi chỉ dẫn theo thư mục và giới hạn nạp; chưa chạy phiên Codex. URL nguồn: https://developers.openai.com/codex/guides/agents-md ; đích khi đọc: https://learn.chatgpt.com/docs/agent-configuration/agents-md

**[S4] Báo điện tử Chính phủ.** Doanh nghiệp phải xóa dữ liệu cá nhân người lao động khi chấm dứt hợp đồng,30/07/2025; đối chiếu nguyên tắc và ngoại lệ. Không thay legal mapping cho dataflow thực, không xác nhận mọi văn bản áp dụng đã được rà hết. URL: https://xaydungchinhsach.chinhphu.vn/doanh-nghiep-phai-xoa-du-lieu-ca-nhan-nguoi-lao-dong-khi-cham-dut-hop-dong-119250728094419409.htm

Ngày đối chiếu các trang trên: **15/10/2026**. Tài liệu nguồn của Vaga được định danh trong `source_inventory.json`; findings ghi file, hash và locator cụ thể. Không đóng gói lại nội dung website, font hoặc ngân hàng thương mại.

## 17. Kết luận cuối

Bộ tài liệu không cần được “làm dày hơn”. Nó cần được **chuyển từ kho thiết kế rộng sang một bản hợp nhất có thể thực thi, sửa các semantic gaps và đưa một vòng giá trị hai chiều ra kiểm chứng**.

Giữ những phần tốt: quyền, nguồn, versioning, no-label khi chưa đủ bằng chứng, manual do owner kiểm soát và tính minh bạch của kiểm thử. Nâng cấp những phần còn yếu: quyết định scope, câu hỏi, context nội dung, hợp đồng thực thi, test độc lập và user evidence. Đó là hướng tôi đánh giá tốt nhất với thông tin hiện có; lựa chọn công nghệ, nhân lực và phạm vi khoa học cuối vẫn cần quyết định của Vaga theo điều kiện thực.
