# Đợt 13: DOC-15 — AI/LLM Personalization Specification

## Nội dung bàn giao chính

Đã hoàn thành **đợt 13: DOC-15 — AI/LLM Personalization Specification**, gồm phạm vi sử dụng AI, hợp đồng dữ liệu, prompt, kiểm soát đầu ra, xử lý lỗi và kế hoạch đánh giá.

**AI vẫn là phần có điều kiện, mặc định tắt; không phải điều kiện bắt buộc để xây MVP.**

**[Tải toàn bộ đợt 13 — ZIP tích lũy DOC-00 đến DOC-15 và các file bổ trợ](sandbox:/mnt/data/Vaga_DISC_Tai_lieu_Dot_13_DOC15_v0.1.0.zip)**

## 1. Các tài liệu Markdown

| Tài liệu | Nội dung đã viết | Link tải |
|---|---|---|
| **DOC-15 — Tài liệu chính** | **22 phần** về mục tiêu, lựa chọn dùng/không dùng AI, kiến trúc, nhiệm vụ, dữ liệu, quyền, kiểm soát đầu ra, vận hành và điều kiện phát hành. | **[Tải DOC-15](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_AI_LLM_PERSONALIZATION.md)** |
| **Nhiệm vụ và ranh giới dữ liệu** | **Năm nhiệm vụ** có điều kiện bắt đầu, luồng xử lý, đầu vào–đầu ra, bước duyệt, phương án thay thế và những việc bị cấm. | **[Tải đặc tả nhiệm vụ](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_TASKS_AND_DATA_BOUNDARIES.md)** |
| **Danh mục prompt** | **Năm mẫu prompt nguyên bản**, cùng chỉ dẫn chung; phân biệt chỉ dẫn hệ thống với dữ liệu nguồn, giới hạn tác vụ, cấu trúc đầu ra và quản trị phiên bản. | **[Tải danh mục prompt](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_PROMPT_CATALOG.md)** |
| **Hợp đồng dữ liệu và kiểm tra** | **11 định nghĩa JSON Schema**, từ điển trường, ràng buộc liên đối tượng, mã tham chiếu nguồn và **15 quy tắc kiểm tra**. Nêu rõ những gì kiểm tự động được và những gì cần người duyệt. | **[Tải hợp đồng dữ liệu](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_CONTRACTS_AND_VALIDATION.md)** |
| **Trạng thái và phương án khi lỗi** | Luồng xử lý, hết thời gian chờ, chưa biết nhà cung cấp đã xử lý hay chưa, gửi lặp, hạn mức, thu hồi quyền và sử dụng nội dung gốc còn được phép. | **[Tải đặc tả vận hành](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_RUNTIME_AND_FALLBACK.md)** |
| **Nhà cung cấp, bảo mật và vòng đời dữ liệu** | **20 mục thẩm định nhà cung cấp và 20 tình huống rủi ro**; bảo vệ dữ liệu gửi đi, khóa truy cập, nhật ký, lưu giữ, xóa và cơ chế dừng khẩn cấp. | **[Tải đặc tả bảo mật AI](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_PROVIDER_SECURITY_LIFECYCLE.md)** |
| **Đánh giá và cổng phát hành** | **32 kịch bản đánh giá mô hình/con người, 32 kịch bản kiểm thử tích hợp**; tiêu chí chấm, phương án đối chứng không AI, chỉ số và **bảy cổng quyết định**. | **[Tải kế hoạch đánh giá](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_EVALUATION_AND_RELEASE_PLAN.md)** |
| **Ma trận truy vết** | **32 yêu cầu AIR15**, liên kết với **27 chức năng, 27 User Stories và 135 tiêu chí chấp nhận nguồn** có liên quan; chỉ rõ các API/dữ liệu cần đánh giá tác động, không tự sửa hợp đồng cũ. | **[Tải ma trận truy vết](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_TRACEABILITY.md)** |
| **Quyết định và nguồn tham chiếu** | **16 đề xuất DEC-181–196, sáu yêu cầu thay đổi CR15-01–06 và tám nguồn chính thức**, có trách nhiệm, điều kiện áp dụng và giới hạn kiểm chứng. | **[Tải sổ quyết định và nguồn](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_DECISIONS_AND_REFERENCES.md)** |
| **Báo cáo kiểm tra** | Kết quả thực chạy, giới hạn của bộ kiểm cục bộ, bảo toàn nguồn và những hoạt động chưa được thực hiện. | **[Tải báo cáo kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_VALIDATION_REPORT.md)** |

Các phụ lục trên thuộc **cùng DOC-15**, không tính thành những tài liệu lõi riêng.

## 2. Những quyết định thiết kế quan trọng

**Tách hai cách sử dụng AI.** Với nội dung đưa vào trải nghiệm người dùng, phương án đề xuất là AI chỉ **chọn mã của cách diễn đạt đã được duyệt sẵn**; máy chủ lấy câu chữ từ kho nội dung, giữ nguyên hành động, giới hạn và nguồn. Với nội dung AI viết mới, kết quả chỉ là **bản nháp cần biên tập viên hoặc chủ hồ sơ xem lại**, không tự được công bố.

**AI không chấm điểm hoặc suy tính cách.** Không gửi đáp án, khóa điểm, điểm riêng, ghi chú phát triển, phản ánh nội bộ hoặc kho liên hệ nghiên cứu cho mô hình. AI không tạo nhóm DISC, mức căng thẳng, độ tin cậy, điểm hợp nhau hay nhận định năng lực nhân sự.

**Kiểm quyền ở cả hai đường gửi dữ liệu.** Phải kiểm trước khi gửi nội dung sang nhà cung cấp và trước khi trả kết quả cho người dùng. Nếu chỉ quyền AI bị rút, có thể dùng nội dung gốc còn quyền; nếu quyền đối với nguồn đã bị rút, phải chặn cả kết quả AI lẫn bản thay thế lấy từ nguồn đó.

**Sửa manual vẫn do chủ hồ sơ kiểm soát.** Chỉ xử lý đoạn người dùng chủ động chọn; có bước xem dữ liệu gửi đi, so sánh bản gốc–bản sửa và kiểm phiên bản trước khi lưu. Chấp nhận bản sửa không đồng nghĩa công bố manual hoặc cho phép hệ thống tự suy ra mã sở thích.

## 3. File máy đọc và kiểm tra đã thực hiện

Gói có **[Task Registry](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_TASK_REGISTRY.json)**, **[Prompt Registry](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_PROMPT_REGISTRY.json)**, **[JSON Schema](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_CONTRACTS.schema.json)** và **[cấu hình đề xuất — toàn bộ AI đang tắt](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_CONFIG_PROPOSAL.json)**.

Công cụ đi kèm gồm **[mã tham chiếu kiểm đầu ra](sandbox:/mnt/data/vaga_disc_docs_dot_13/ai_doc15_reference.py)**, **[44 trường hợp luồng giả lập](sandbox:/mnt/data/vaga_disc_docs_dot_13/DOC-15_LOCAL_FIXTURES.json)** và **[bộ chạy kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_13/verify_doc15.py)**.

Đã chạy đạt **139/139 kiểm tra cục bộ**: **25 kiểm tra tài liệu và truy vết, 70 kiểm tra hợp đồng dữ liệu, 44 trường hợp luồng giả lập**. Đã giữ nguyên nội dung **282 file nguồn** của đợt trước; ZIP đã được kiểm tra tính toàn vẹn và đối chiếu từng file.

**Giới hạn cần giữ rõ:** chưa gọi nhà cung cấp AI, chưa đánh giá mô hình thực, chưa có người duyệt nội dung và chưa kiểm thử trên ứng dụng. Bộ kiểm còn minh họa trường hợp **câu đúng cấu trúc nhưng bị đảo nghĩa**: kết quả vẫn phải chờ chủ hồ sơ xem lại, không được coi là đã duyệt. Các phép kiểm cục bộ không chứng minh khả năng chống mọi chỉ dẫn độc hại hoặc bảo đảm nội dung luôn chính xác.

## 4. Trạng thái và điểm tiếp tục

**Hiện có 16/22 tài liệu lõi đã soạn đầy đủ: DOC-00 đến DOC-15**, ở mức `0.1.0 / REVIEW_DRAFT`, chưa được phê duyệt.

**[README hướng dẫn bàn giao đợt 13](sandbox:/mnt/data/vaga_disc_docs_dot_13/README.md)** · **[Checkpoint DOC-16](sandbox:/mnt/data/vaga_disc_docs_dot_13/CHECKPOINT_DOC-16.md)**

**Điểm tiếp tục: DOC-16 — Master Test & Quality Plan**, tổng hợp chiến lược kiểm thử toàn ứng dụng, ma trận yêu cầu–kiểm thử, dữ liệu thử, môi trường, quản lý lỗi, bằng chứng nghiệm thu và điều kiện phát hành theo từng nhóm chức năng.

---

## Nhật ký lập kế hoạch & xử lý chi tiết (Reasoning Log)



**Lập kế hoạch chi tiết**  
Các yêu cầu phức tạp, tải tệp sang zip. Cung cấp nguồn tiên chính xác. Xem xét quyền riêng tư dữ liệu.

**Kiểm tra công cụ**

Kiểm tra danh sách tệp hiện tại trước khi tải.если список нынешний достаточно.

**Cập nhật sau 3 cuộc gọi**

Hãy xem xét việc nâng cấp sau ba cuộc gọi.

**Đặt lại token lạ**

Cần tuân thủ bộ lọc miền bắt buộc của OpenAI, tập trung vào nguồn chính thức.

**Đang nghiên cứu nhu cầu**

Tôi đang rà soát các tài liệu để tìm kiếm thông tin chi tiết hiện tại và nguồn tài nguyên cần thiết. Hãy để tôi thấy rằng việc quản lý ngân sách và hiệu suất là ưu tiên.

**Đưa ra ý tưởng**

Quản lý đầu ra ~30k thông qua script, kiểm tra dữ liệu từ DOC14 và container. Xem xét tài liệu hiện có và danh sách chức năng mới.

**Tập trung vào nội dung**

Cung cấp 6 nguồn chính thức, mỗi nguồn ít nhất 200 từ. Mag. Đức cần tái chú ý tránh nghiên cứu quá mức.

**Đánh giá kế hoạch**

Push các tác vụ thiết kế, kiểm tra nội dung, tạo tài liệu, và bảo vệ tài liệu. Dự đoán tài liệu thành công.

**Xem xét kỹ lập trường vấn đề**

Đang kiểm tra chính sách Khuyến mãi, chiết khấu hoặc cung cấp hạn chế quyền truy cập.

**Chỉnh sửa API**

Đang chỉnh sửa API 123, tập trung vào các mô hình dữ liệu và các yêu cầu cụ thể của từng loại dịch vụ.

**Điểm lại yêu cầu**  
Xem xét các yêu cầu chính thức, sắp xếp đăng ký nguồn tài liệu, và kiểm tra lỗi phát sinh.

**Tạo tài liệu**

Tôi đang xem xét việc tạo tài liệu DOC-15 với các phần như cá nhân hóa, ranh giới nhiệm vụ, hợp đồng, kế hoạch đánh giá, và nhiều nội dung khác.

**Kiểm tả cấu trúc**

Xem xét một gói tin và xác nhận tính hợp lệ bằng cách sử dụng JSON Schema và xác nhận bối cảnh. Ở đây, tôi đang chú ý đến các trường hợp không có sẵn.

**Tạo danh sách**

Tôi đang xây dựng danh sách mã hóa và yêu cầu chi tiết cho mỗi tác vụ để đảm bảo hiểu rõ và không bỏ lỡ bất kỳ yêu cầu nào.

**Đánh giá cấu hình**

Đang xem xét các giá trị cấu hình, chẳng hạn như `maxinputtokens` và `maxoutputtokens`, đồng thời phân tích các tính năng cơ bản khác như tạm dừng và số điểm.

**Xây dựng mục tiêu**

Đang tạo bộ đơn hàng có ý nghĩa, giới hạn khoảng 1 giờ và tối ưu hóa tài nguyên.

**Kiểm tra giới hạn**

Tôi đang chú ý đến việc kiểm tra giới hạn JSON schema bằng cách sử dụng `jsonschema.Decoder()` và xử lý số học với `jsonschema.RangeValidator()`.

**Đang xem xét**

Đang đánh giá và chỉnh sửa các tính năng trong bản nháp, loại bỏ hoặc thêm bớt thông tin.

**Xây dựng tài liệu chi tiết**

Tôi đang tạo tài liệu kỹ thuật với 10 câu hỏi, 10 dạng văn bản, và 5 chuyên mục. Các câu hỏi được phân chia đều các dạng văn bản, dưới dạng MCQ.

**Kiểm tra hồ sơ**

Đang rà soát hồ sơ để đảm bảo tính chính xác, không có sai sót nào xuất hiện.

**Xem xét thời gian chờ**  
Người dùng đang đợi 25 phút.

**Thiết kế tài liệu**

Tôi đang tối ưu hóa tài liệu của mình, đặc biệt là trong việc tạo cấu trúc tệp và thực hiện kiểm tra đối chứng.

**Nâng cấp hệ thống**

Đang làm việc với một công cụ hệ thống nâng cấp, phát triển API, bảo mật hợp đồng và đánh giá. Đang tạo bảng từ sơ đồ để giải thích các cột.

**Phân tích yêu cầu**

Điều này đang yêu cầu tôi đánh giá độ không phù hợp của nguồn dữ liệu cơ bản và xác định các chỉ số số học đánh giá độ tin cậy.

**Đang phân tích tình huống**

Tôi đang suy nghĩ về vấn đề trước mặt và cần cập nhật tài liệu quan trọng từ vài cuộc điện thoại gần đây.

**Kiểm tra yêu cầu**

Đang rà soát các yêu cầu về bảo mật và đánh giá, không cần dùng API mới, giới hạn dữ liệu nguồn và yêu cầu về bảo vệ thông tin cá nhân.

**Kiểm tra giá trị dự đoán**

Đang xem xét đánh giá hiệu suất mô hình LLM về sự giảm bớt thời gian hoàn thành việc chỉnh sửa văn bản, so với chi phí.

**Hãy phân tích thêm**

**Thu thập thông tin**

Lập danh sách thông tin hiện có: 282 tệp tin ZIP, 15 tài liệu nguồn, 10 bảng tóm tắt.

**Ít thông tin**

Tài liệu này dường như liên quan đến đánh giá bảo mật và xây dựng các tiêu chí quan trọng cho việc quyết định nhà cung cấp.

**Hoàn thành tài liệu**

Cần hoàn thành tài liệu hiệu quả, không vượt quá ngân sách, và kiểm tra chất lượng của tài liệu và nguồn tham khảo hiện tại.

**Đang xem xét**

Nghĩ về việc phân tích ID trong hai chiếc nhẫn. Đang tạo chi tiết kỹ thuật cho "Honeycomb" - mẫu số 1530.

**Xây dựng định nghĩa**

Đang hoàn thiện bản đồ dữ liệu chi tiết, chú ý đến việc kiểm tra định nghĩa so với bảng.

**Làm việc cùng tài liệu**

Model tạo tệp. Viết kịch bản cuối cùng với theo dõi và quyết định.

**Sắp xếp quy trình**

Tôi đang làm việc với một hệ thống khối lượng lớn, nhưng phải đảm bảo quá trình xếp hàng diễn ra nhanh chóng.

**Xem xét DLC**

Đang xem xét kỹ lưỡng**Checking OpenAI's policies**\n\n 사고 위험을 하고 있어 Независимо от того, 거기에 на большинстве 새롭게 필요한 한정된 견해를 필요사항을 보도하고 있어

**Nhận định chi tiết**

Đang xác minh tính chính xác của các đợt liên kết với bộ dữ liệu GitHub.

**Phối hợp và kiểm tra**

Tôi đang làm việc qua chuỗi task, đảm bảo phần thích hợp và chính xác. Mỗi bước đều đòi hỏi chú ý tỉ mỉ để hoàn thành hiệu quả.

**Rà soát lại các tiêu chuẩn**

Đang kiểm tra danh sách tệp và metadata, loại bỏ tệp không cần thiết và đảm bảo tuân thủ các tiêu chuẩn phân phối.

**Nhận đinh yêu cầu**

Đang phân tích yêu cầu lớn với 30k từ, chia thành 23-22 mục.

**Rà soát tài liệu**

Tôi đang cân nhắc khoảng cách chất lượng giữa các từ nguồn, loại bỏ những cụm từ khó hiểu và không cần thiết.

**Đảm bảo tính xác thực**

Rà soát nguồn gốc tài liệu, loại bỏ các tin nhắn không cần thiết, và kiểm tra các ký nhập liệu HTML để ngăn chặn các lỗ hổng XSS.

**Xem xét kỹ**

**Khám phá điều chỉnh**

Ý tưởng đằng sau yêu cầu này là cải thiện tính chính xác và báo cáo kết quả kiểm tra không phải là vấn đề.

**Excellent tối ưu hóa**

Tôi đang tối ưu hóa tài liệu, tập trung vào cấu trúc, nội dung, và cơ chế chính, với mục tiêu không có thông tin không cần thiết hoặc lặp lại.
