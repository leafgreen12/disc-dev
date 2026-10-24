# Kết luận review

**Nên giữ bộ tài liệu này, nhưng phải hợp nhất và thu gọn phạm vi thực thi trước khi giao Codex lập trình. Không nên viết lại từ đầu, cũng không nên yêu cầu Codex xây nguyên toàn bộ 519 tệp như một bản thiết kế cùng có hiệu lực.**

Bộ tài liệu mạnh về **phân tích ngoại lệ, bảo vệ dữ liệu, quản trị phiên bản và giới hạn diễn giải DISC**. Điểm yếu lớn nhất là **nhiều quyết định nền vẫn chưa được chốt, các thay đổi chưa được hợp nhất vào hợp đồng đích, và phần kiểm thử còn chủ yếu ở mức tệp hoặc mô hình cục bộ**. Chính gói bàn giao cuối cũng xác nhận chưa có baseline kỹ thuật được duyệt, lệnh build sản phẩm hoặc kiểm thử ứng dụng thực. fileciteturn27file1L115-L153 fileciteturn27file2L240-L265

## Bộ báo cáo review đã tạo

**[Tải toàn bộ báo cáo, kế hoạch nâng cấp và bằng chứng kiểm tra — ZIP](sandbox:/mnt/data/Vaga_DISC_Review_va_Ke_hoach_Nang_cap_2026-10-15.zip)**

| Tài liệu | Nội dung | Link tải |
|---|---|---|
| **Báo cáo review tổng thể** | Chấm điểm, kết quả kiểm thực chạy, phản biện sản phẩm–khoa học–kỹ thuật và kết luận nâng cấp. | **[Tải Markdown](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/01_BAO_CAO_REVIEW_TONG_THE.md)** |
| **Đánh giá chi tiết 22 tài liệu** | Mỗi DOC có điểm, phần nên giữ, vấn đề, đề xuất sửa và điều kiện kiểm lại. | **[Tải Markdown](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/02_DANH_GIA_CHI_TIET_22_TAI_LIEU.md)** |
| **Kế hoạch nâng cấp v0.2** | Chín gói công việc, thứ tự thực hiện, trách nhiệm và tiêu chí nghiệm thu. | **[Tải Markdown](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/03_KE_HOACH_NANG_CAP_V0_2.md)** |
| **Sổ 28 phát hiện và khuyến nghị** | Mức ưu tiên, bằng chứng, tác động, người phụ trách và cách kiểm tra sau sửa. | **[Tải Markdown](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/04_SO_PHAT_HIEN_VA_KHUYEN_NGHI.md)** |

**Tệp nguồn được giữ nguyên.** Đợt này tạo báo cáo và đề xuất, chưa sửa bộ đặc tả gốc hoặc triển khai ứng dụng.

---

# 1. Chấm điểm tổng thể

| Khía cạnh | Điểm/Trạng thái | Ý nghĩa |
|---|---:|---|
| **Chất lượng bộ đặc tả** | **74/100** | Phân tích khá sâu, nhưng cần cải thiện tính nhất quán, tính tập trung và khả năng thực thi. |
| **Mức sẵn sàng giao thẳng để lập trình** | **45/100** | Còn nhiều quyết định và công việc nối hợp đồng trước khi kỹ thuật có thể triển khai mà không tự đoán. |
| **Bằng chứng kiểm định bộ DISC Vaga** | **Chưa được thiết lập** | Không có cơ sở để gán phần trăm độ chính xác. |
| **Mức sẵn sàng sử dụng với nhân viên thật** | **Chưa đủ bằng chứng kết luận** | Cần nghiệm thu kỹ thuật, nội dung, quyền dữ liệu và khoa học theo phạm vi được mở. |

Điểm trên là **nhận định theo rubric công khai**, không phải xác suất đúng hay phần trăm tiến độ ứng dụng. Điểm đặc tả tính chính xác là **73,5/100**, làm tròn thành 74; cách tính nằm trong [bảng điểm có cấu trúc](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/review_scores.json).

Tôi không trừ điểm chỉ vì tài liệu chưa chứa ứng dụng đã xây. Tuy nhiên, khi đánh giá lời hứa **“đủ để bàn giao Codex build”**, việc chưa có bản thiết kế hợp nhất, lựa chọn công nghệ và lệnh kiểm sản phẩm là những khoảng trống phải tính riêng.

## Các kiểm tra bổ sung đã thực hiện

| Hạng mục | Kết quả |
|---|---|
| Kiểm kê gói cuối | **519 tệp**. |
| Đối chiếu manifest | **518/518 mục khớp kích thước và checksum**; manifest không tự chứa hash của chính nó. |
| Chạy lại checker DOC-21 | **114/114 đạt**, đúng phạm vi kiểm gói bàn giao. |
| Kiểm số học bằng đáp án tổng hợp mới | **60/60 phép đối chiếu đúng**, gồm L40 và L48. |
| Kiểm OpenAPI tĩnh bổ sung | **123 thao tác, 3.034 tham chiếu nội bộ**; không lỗi trong các phép kiểm đã chạy. |
| Kiểm liên kết Markdown | **50 liên kết hỏng**, đều ở hai README lịch sử, không phải điểm bắt đầu hiện hành. |
| Thử phản ví dụ helper | **Sáu trường hợp cần sửa hoặc làm rõ**, kèm hai đối chứng. |

[Bằng chứng và hướng dẫn tái hiện](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/README.md) được đóng gói để đội kỹ thuật kiểm lại.

**Giới hạn review:** đã kiểm toàn vẹn/cấu trúc toàn gói, rà từng nhóm tài liệu lõi và đọc sâu các hợp đồng có rủi ro. Đây không phải xác minh độc lập từng dòng của 519 tệp, mọi URL, mọi điều luật hoặc kiểm thử ứng dụng thật.

---

# 2. Đánh giá từng tài liệu

Điểm dưới đây áp dụng cho **tài liệu cùng các phụ lục/tài sản được bàn giao**, không phải điểm chất lượng của một ứng dụng đã triển khai.

| DOC | Nội dung | Điểm /10 | Phản biện và nâng cấp ưu tiên |
|---|---|---:|---|
| **00** | Bản đồ tài liệu | **7,0** | Quản trị nguồn tốt; cần chỉ mục **nguồn đang có hiệu lực**, không chỉ danh mục lịch sử. |
| **01** | URD | **7,5** | Nhu cầu rõ nhưng còn là giả thuyết; cần quan sát tác vụ thực của nhân viên. |
| **02** | BRD | **7,5** | Giới hạn nghiệp vụ tốt; cần chốt phạm vi bản đầu, trách nhiệm và định nghĩa chỉ số thống nhất. |
| **03** | Use Cases | **8,0** | Bao phủ ngoại lệ tốt; cần gắn các luồng quan trọng với giao dịch và điểm quan sát cụ thể. |
| **04** | User Stories/AC | **7,0** | Truy vết tốt; năm AC mỗi story không bảo đảm đủ rủi ro. Cần xác định tiêu chí áp dụng cho từng phần việc. |
| **05** | FRD | **7,5** | Chi tiết trạng thái và authority; cần hợp nhất các thay đổi từ DOC11/14 trở đi. |
| **06** | IA/UX Flows | **7,5** | Luồng khá đầy đủ; tránh biến 49 đích logic thành quá nhiều mục điều hướng. |
| **07** | UI/UX | **7,0** | Có nguyên mẫu và thành phần; cần thử ba hành trình người dùng hoàn chỉnh, không chỉ atlas. |
| **08** | Ngân hàng câu hỏi | **6,5** | Metadata tốt hơn mức hoàn thiện nội dung; cần xử lý câu nhiễu, mức giữa và bối cảnh trả lời. |
| **09** | Scoring | **8,0** | Số học minh bạch và kiểm mới cho kết quả đúng; cần đánh giá tác động của chính sách thiếu câu. |
| **10** | Kiểm định tâm lý đo lường | **8,0** | Phương pháp thận trọng; cần thu hẹp nghiên cứu theo loại kết luận thực sự muốn cho phép. |
| **11** | Thư viện nội dung | **7,0** | Mô-đun hóa tốt; nhiều thẻ gắn context quá rộng, làm giảm tính phù hợp tình huống. |
| **12** | Data Model | **7,0** | Ranh giới dữ liệu tốt; cần thiết kế vật lý cho scope đầu, không sao chép thành 65 bảng/CRUD. |
| **13** | API | **6,5** | Hợp đồng khá đầy đủ; có khoảng trống validation đơn vị và chưa qua validator OpenAPI độc lập đầy đủ. |
| **14** | Security/Privacy | **8,0** | Thiết kế bảo vệ mạnh; cần kiểm precondition, topology và áp dụng pháp lý vào dataflow thực. |
| **15** | AI/LLM | **7,0** | Ranh giới an toàn tốt; chưa có lý do đủ mạnh để đầu tư ngay ở MVP. |
| **16** | Master Test Plan | **7,0** | Phân tầng bằng chứng đúng; cần giảm lặp, tăng phản ví dụ và gắn test thực thi. |
| **17** | DevOps/Operations | **7,5** | Runbook và vòng đời tốt; cần bind vào hạ tầng, lệnh và diễn tập thực. |
| **18** | Enterprise Integration | **7,5** | Xử lý danh tính sâu; nên chọn đăng nhập tối thiểu trước, hoãn đồng bộ chưa có nhu cầu. |
| **19** | Analytics | **7,5** | Quan tâm quyền riêng tư; cần ít chỉ số hơn, mẫu số rõ và phương án khi nhóm quá nhỏ. |
| **20** | Roadmap | **7,0** | Có nhiều track; cần tách hành động tự chọn khỏi phụ thuộc assessment. |
| **21** | Codex Handoff | **7,0** | Tổ chức giao việc tốt; vẫn thiên về chuẩn bị hơn là gói thực thi ít cần quyết định bổ sung. |

Chi tiết lý do và điều kiện nghiệm thu lại từng DOC nằm trong [báo cáo 22 tài liệu](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/02_DANH_GIA_CHI_TIET_22_TAI_LIEU.md).

---

# 3. Phản biện quan trọng nhất: nhiều đặc tả nhưng chưa có một bản thiết kế thống nhất để chạy

## 3.1. Vấn đề không nằm ở việc tài liệu dài

Chị yêu cầu tài liệu đầy đủ, nên viết sâu là đúng. **Điểm cần sửa là sự lặp lại và việc chưa kết thúc các quyết định thiết kế**, không phải đơn thuần giảm số trang.

Ví dụ, gói cuối vẫn yêu cầu làm rõ bảy thay đổi nền về xử lý nghỉ việc, quyền dữ liệu, thẩm quyền duyệt, cấu hình phiên, thu hồi quyền, hồ sơ triển khai và công cụ vận hành. Các thay đổi này đã được mô tả nhưng chưa được hợp nhất vào hợp đồng đích. fileciteturn27file1L115-L153

Nếu giao toàn bộ cho Codex, agent có thể gặp tình huống:

> FRD nói một cách, tài liệu nội dung tinh chỉnh cách khác, tài liệu bảo mật bổ sung điều kiện, nhưng chưa có bản nào được chọn làm hợp đồng thực thi.

**Đề xuất:** giữ nguyên kho tham khảo v0.1, nhưng tạo **baseline v0.2 cho đúng phạm vi đầu tiên**. Mỗi hành vi chỉ có một nguồn có hiệu lực về dữ liệu, quyền, trạng thái và điều kiện nghiệm thu.

Không cần đóng cả 290 quyết định trước khi viết mã thử. Cần đóng **những quyết định ảnh hưởng trực tiếp tới phần đang xây**.

## 3.2. Không nên hiện thực toàn bộ inventory

123 API, 65 thực thể logic và 43 mẫu UI là phạm vi thiết kế tổng. Chúng không đồng nghĩa bản đầu cần đủ từng ấy thành phần.

Tôi đề xuất một ứng dụng mô-đun, cơ sở dữ liệu quan hệ và nguồn quyết định quyền nhất quán để xem xét trong ADR. Đây là **phương án khởi đầu**, chưa phải lựa chọn công nghệ đã được Vaga duyệt.

Không nên khởi đầu bằng nhiều dịch vụ, hệ thống tích hợp rộng hoặc kho analytics riêng khi chưa có nhu cầu và năng lực vận hành được xác nhận. Nhưng tinh gọn phải giảm **phạm vi tính năng**, không giảm kiểm quyền hoặc nghĩa vụ dữ liệu. Nguyên tắc từ chối mặc định và kiểm quyền trên từng request vẫn cần được giữ. citeturn269861search0

---

# 4. Các vấn đề kỹ thuật đã tái hiện, không chỉ nhận xét lý thuyết

## 4.1. Helper API chấp nhận số ngoài miền đã khai báo

Tôi đưa các dữ liệu tổng hợp sau qua helper `contract_doc13.py`:

| Đầu vào | Kết quả thực | Điều cần sửa |
|---|---|---|
| `COUNT = -3` | Được chấp nhận | Số đếm quan sát không được âm. |
| `RAW_MEAN_1_5 = 7` | Được chấp nhận | Trung bình của thang 1–5 không thể bằng 7. |
| `LINEAR_0_100 = 107` | Được chấp nhận | Ngoài miền thang đã khai báo. |
| `COUNT = 2.5` | Được chấp nhận | Cần phân biệt số đếm nguyên với ước lượng có trọng số. |

Trong mã hiện tại, kiểm riêng theo đơn vị mới có cho `CORRELATION` và `PROPORTION`; các đơn vị khác chưa được kiểm tương đương. fileciteturn30file0L70-L76

**Đề xuất:** bổ sung schema phân nhánh theo đơn vị và semantic validation. Khi cần giữ ước lượng bất thường để nghiên cứu, phải tách nó khỏi dữ liệu đủ điều kiện cấp báo cáo.

Đây là **khoảng trống trong helper/hợp đồng đang được review**, không phải khẳng định API production có lỗi, vì chưa có API production.

## 4.2. Snapshot rỗng vẫn có thể cho kết quả “allowed” trong mô hình quyền

Ở nhánh pair dùng DISC, helper kiểm snapshot được chọn có bằng snapshot được cấp quyền không. Khi cả hai phía đều là `null`, phép so vẫn đúng. fileciteturn30file1L118-L125

Phản ví dụ thực chạy trả:

```text
allowed = true
runtime_authorization = false
```

**Cần sửa:** kiểm reference không rỗng, tồn tại, đúng chủ thể, thế hệ và phạm vi grant trước khi so bằng nhau. Trong ứng dụng thật, các dữ kiện này phải do service phân giải, không nhận từ boolean của client.

Đây là thiếu precondition trong **mô hình cục bộ**, chưa phải bằng chứng truy cập trái phép trên hệ thống thật.

## 4.3. Kiểm số học có kết quả tốt, nhưng không thể suy rộng

60 bộ đáp án tổng hợp mới cho kết quả linear-score đúng khi đối chiếu bằng phép tính độc lập. Điều này ủng hộ việc **giữ core số học** và tiếp tục phát triển có kiểm thử.

Tuy nhiên, nó không chứng minh câu hỏi đo đúng D/I/S/C. Tài liệu nguồn cũng phân biệt rõ phép tính đúng với khả năng diễn giải một vector điểm. fileciteturn30file2L187-L199

## 4.4. OpenAPI vẫn còn một cổng chưa đóng

Kiểm tĩnh bổ sung không tìm thấy lỗi trong các tham chiếu, khai báo path parameter và security reference đã kiểm. Nhưng validator OpenAPI độc lập đầy đủ chưa chạy được do môi trường không cài được công cụ.

Không nên đánh dấu cổng này đạt bằng checker tự viết. Hơn nữa, ngay cả các từ khóa `readOnly`/`writeOnly` của schema cũng không tự thay thế kiểm quyền tại server. citeturn665974view2

Toàn bộ dữ liệu phản ví dụ nằm trong [gói bằng chứng](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/adversarial_probe_results.json); có [script tái hiện](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/reproduce_review.py).

---

# 5. Review bộ câu hỏi: cần giải quyết nội dung trước khi mở rộng số lượng

## 5.1. Một số câu có thể đo nhầm đối tượng

| Câu hỏi | Vấn đề cần thẩm định |
|---|---|
| **L-D07:** muốn biết rõ phạm vi quyết định trước khi thay đổi công việc | Người tuân thủ đúng thẩm quyền có thể bị chấm thành D thấp. |
| **L-C04:** nhận ra sai lệch nhỏ người khác bỏ qua | Có thể đo năng lực tự nhận hoặc so sánh mình với người khác, không chỉ xu hướng hành vi. |
| **L-S01:** có thể duy trì nhịp làm việc ổn định | Pha trộn khả năng, điều kiện công việc và sở thích. |
| **L-I04:** thích thuyết phục bằng câu chuyện | Có thể chịu ảnh hưởng của đào tạo bán hàng hoặc nghề nghiệp. |
| **L-C01 và L-C10:** kiểm tra trước khi hoàn tất/gửi sản phẩm | Có nguy cơ trùng nội dung, làm độ nhất quán tăng mà không tăng độ phủ. |

Các ví dụ trên có trong ngân hàng nguồn. Đây là **giả thuyết về nhiễu cần kiểm**, không phải kết luận thống kê rằng các câu chắc chắn sai. fileciteturn29file0L5-L23 fileciteturn29file1L29-L38

DOC08 đã nhận diện nhiều vấn đề tương tự. Điểm cần nâng cấp là **chuyển từ “đã ghi concern” sang quyết định giữ, sửa hoặc loại có bằng chứng**.

Một hướng viết lại để thử với câu về chủ động là:

> “Trong phạm vi quyền đã được giao, tôi thường tự đề xuất bước tiếp theo khi công việc bị chững.”

Câu mới vẫn cần được thẩm định; không được coi là đã hợp lệ chỉ vì nghe hợp lý hơn.

## 5.2. Mức giữa đang mang hai nghĩa

Nhãn **“Tùy tình huống / ở mức trung bình”** trộn sự thay đổi theo bối cảnh với mức độ giống bản thân. Hai người cùng chọn 3 có thể đang trả lời hai ý khác nhau.

Cách xử lý đúng là thử cách hiểu, chọn thang mới có revision và cập nhật form tương ứng; không sửa nhãn trực tiếp trên giao diện.

Phát triển thang đo cần phân biệt việc xác định miền, phát triển câu, xem xét nội dung, thử cách hiểu và đánh giá thang. Một danh sách câu hỏi hoặc một công thức chấm không thay được các bước đó. citeturn705303view0

## 5.3. Chính sách thiếu câu bảo thủ nhưng có chi phí

Giả sử — **chỉ để minh họa** — mỗi câu có xác suất bỏ trống 2%, độc lập:

- Đủ 10 câu của một miền: `0,98^10 ≈ 81,7%`.
- Đủ cả 40 câu: `0,98^40 ≈ 44,6%`.

Đây không phải tỷ lệ Vaga. Ví dụ cho thấy chính sách yêu cầu đủ mọi câu có thể tạo nhiều kết quả giới hạn. Miền đủ dữ liệu vẫn được tính theo thiết kế hiện tại.

**Không nên tự hạ ngưỡng xuống 80% hoặc điền đáp án giữa.** Cần nghiên cứu các phương án, đánh giá sai số và khác biệt nhóm, rồi chốt policy có phiên bản.

## 5.4. Không cần ép ra 12 nhóm

DOC09 hiện trả `classification=null`, và việc này là đúng với mức bằng chứng hiện có. Nguồn cũng đã nói rõ các miền có thể khác mức dễ đồng ý, nên không thể đơn giản lấy hai điểm raw cao nhất để phân nhóm. fileciteturn30file2L193-L240

**Nâng cấp không có nghĩa bật thêm classifier cho đủ tính năng.** Có thể tạo giá trị bằng sở thích được xác nhận và hành động tự chọn trước; nhãn chỉ được mở khi có lý do sản phẩm và bằng chứng phù hợp.

---

# 6. Review nội dung: cá nhân hóa chưa đủ chọn lọc theo tình huống

Tôi đếm được **44/72 thẻ gắn đủ cả bảy tình huống**. Đây không tự động là lỗi, nhưng làm bộ lọc context ít có khả năng chọn lọc.

Ví dụ, thẻ `CB11-SELF-D-03` nói về **giao việc hoặc xin chốt phương án**, với hành động tách yêu cầu bắt buộc và phần có thể thương lượng. fileciteturn31file0L7-L24 Trong metadata, thẻ này cũng được gắn context ghi nhận.

Cần hỏi:

> Khi người dùng đang muốn ghi nhận một đồng nghiệp, lời khuyên này có thực sự đúng tác vụ không, hay chỉ được chọn vì người đó có đặc trưng D?

**Đề xuất nâng cấp:** mỗi thẻ có tình huống chính, tình huống phụ được lý giải và trường hợp không nên chọn. Bộ kiểm phải có cả “chọn đúng thẻ” và “không chọn thẻ dù mã tính cách phù hợp”.

Thiếu thẻ phù hợp thì trả ít hơn hoặc hướng dẫn chung có nhãn. Không gọi AI để lấp đủ ba lời khuyên.

---

# 7. Đề xuất sản phẩm quan trọng nhất: đưa cả hai luồng giá trị vào bản đầu

## Không nên để toàn bộ Self chờ assessment

Roadmap hiện gộp **Self, hành động riêng, lịch sử và retest** trong WP20-019, rồi phụ thuộc WP20-017 — assessment. fileciteturn31file2L58-L65

Tôi đề xuất tách một phần:

### **Hành động tự phát triển do người dùng tự chọn — không cần điểm DISC**

Người dùng có thể chọn một tình huống muốn cải thiện, viết hành động nhỏ, dấu hiệu tự kiểm và ngày xem lại. Phần này không cần khẳng định người dùng thuộc nhóm nào.

Ví dụ:

> “Trong cuộc họp tuần này, trước khi chốt phương án, tôi sẽ hỏi thêm một ràng buộc mà người khác nhìn thấy. Tôi tự kiểm xem mình đã nghe được điều gì mới.”

Thiết kế dữ liệu hiện có đã hỗ trợ hướng người dùng tự viết qua `ActionInput`; cần rà tiếp precondition của service và quan hệ dữ liệu để tách phụ thuộc đầy đủ, không chỉ đổi giao diện. fileciteturn31file1L33-L53

## Phạm vi bản đầu tôi khuyến nghị

| Luồng | Giá trị giao sớm |
|---|---|
| **Cộng tác** | Viết manual → xem trước → chia sẻ → đồng nghiệp đọc → sửa/thu hồi. |
| **Cá nhân** | Chọn hành động → thực hiện → tự ghi nhận → xem lại/sửa/xóa. |
| **Nền bắt buộc** | Danh tính, quyền, lưu an toàn, hỗ trợ, quyền dữ liệu, nghỉ việc và phục hồi đúng. |
| **Chưa bật** | Nhãn DISC, norms, score-based pair, AI, analytics và đồng bộ doanh nghiệp chưa cần. |

Đây là cách giữ mục tiêu hai chiều mà không đánh đổi tính trung thực khoa học.

---

# 8. Bảo mật và pháp lý: giữ nguyên nguyên tắc, làm rõ cách thực thi

Phần này nên **tinh gọn cơ chế vận hành**, không nới quyền.

**Thứ nhất, review phải đúng loại đối tượng.** Người duyệt nội dung không tự được duyệt tăng quyền; manager không tự được xem Self. Những điều này phải xuất hiện trong policy và service, không chỉ trong bảng mô tả.

**Thứ hai, thu hồi quyền cần điểm thực thi rõ.** Hai lần đọc kiểm quyền hoặc một trường `epoch` chưa tự chứng minh không có khoảng race. Cần một thử nghiệm kỹ thuật trên kiến trúc được chọn, có mốc thu hồi, mốc cấp dữ liệu và quan sát đường truyền.

**Thứ ba, nghỉ việc không chỉ là khóa tài khoản.** Nguồn Chính phủ nêu yêu cầu xóa/hủy dữ liệu người lao động khi chấm dứt hợp đồng, với ngoại lệ theo thỏa thuận hoặc pháp luật. Cơ sở dữ liệu văn bản Bộ Công an hiện ghi Luật 91/2025/QH15 còn hiệu lực. citeturn665974view0turn269861search3

Vì vậy, không thể dùng thời hạn lưu nháp trong tài liệu làm căn cứ giữ mọi kết quả DISC sau nghỉ việc. Cần chốt theo từng loại dữ liệu, căn cứ, ngoại lệ, nơi lưu và khả năng phục hồi. Đây là việc phải rà theo dataflow thực, không thể hoàn tất bằng một chữ ký chung “đã đọc chính sách”.

---

# 9. Lộ trình nâng cấp nên thực hiện

Tôi đã phân loại **28 phát hiện: 5 P0, 18 P1, 5 P2**. P0 là chặn **phạm vi liên quan**, không phải khẳng định có năm lỗ hổng production.

| Thứ tự | Việc cần làm | Điều kiện hoàn thành |
|---|---|---|
| **1. Hợp nhất baseline v0.2** | Chọn manual + hành động tự chọn; xử lý CR nền và nguồn có hiệu lực. | Một hành vi chỉ có một contract áp dụng. |
| **2. Vá các phản ví dụ** | Miền MetricEstimate, snapshot null, precision và kiểm OpenAPI độc lập. | Có test thất bại trước sửa, đạt sau sửa, giữ đối chứng hợp lệ. |
| **3. Chuẩn hóa nội dung** | Rà 44 thẻ context rộng; chọn nội dung bản đầu. | Có ca phù hợp/không phù hợp và review đúng revision. |
| **4. Chọn công nghệ và dựng lát cắt** | Giao diện–server–DB–quyền trên sandbox bằng dữ liệu giả. | Checkout sạch chạy được build/test và một vòng đầu-cuối. |
| **5. Kiểm quyền, xóa, phục hồi** | Thử thu hồi giữa luồng, nghỉ việc–tái gia nhập, backup–restore. | Không hồi sinh quyền/dữ liệu ngoài phương án được phép. |
| **6. Thử tác vụ người dùng** | Soạn manual, tìm chỉ dẫn, chọn hành động riêng. | Người thử làm được và hiểu đúng quyền; có sửa lỗi quan sát. |
| **7. Nghiên cứu DISC song song** | Chọn tự xây/cấp phép; review câu, thang, bối cảnh và kiểm định. | Chỉ mở loại kết luận có bằng chứng tương ứng. |
| **8. Mở rộng có căn cứ** | AI, tích hợp, analytics hoặc nhãn/chuẩn tham chiếu. | Có giá trị tăng thêm, nguồn lực và gate riêng. |

Chưa nên gán ngày hoặc ngân sách khi chưa biết đội thực hiện, stack và phạm vi nghiên cứu. **Ưu tiên không phải thêm tài liệu, mà là hoàn thành một vòng “quyết định → hợp đồng → mã → kiểm thử → bằng chứng”.**

Đối với Codex, nên giữ AGENTS.md ngắn, chỉ rõ nguồn active, lệnh thật và ranh giới được sửa. Theo tài liệu chính thức, Codex nạp chỉ dẫn theo phạm vi thư mục; một tệp AGENTS không khiến mọi tài liệu trong repository tự động được đọc. citeturn665974view1

## Quyết định tôi khuyến nghị chốt

**Giữ bộ 22 tài liệu làm nền tham khảo. Nâng cấp thành baseline v0.2 có phạm vi nhỏ, bổ sung Self tự chọn, sửa các khoảng trống validation, rồi xây một lát cắt thật trên sandbox.**

Đó là phương án tôi đánh giá phù hợp nhất với thông tin hiện có: tận dụng phần phân tích đã làm, giảm chi phí triển khai không cần thiết, giữ hai luồng giá trị và không đánh đổi quyền riêng tư hoặc tính trung thực của kết quả DISC.

**Bước đầu tiên cụ thể là `UPG-V02-BASELINE-001` trong [kế hoạch nâng cấp v0.2](sandbox:/mnt/data/Vaga_DISC_Review_2026-10-15/03_KE_HOACH_NANG_CAP_V0_2.md), không phải viết thêm DOC-22.**
