# Đợt 12: DOC-14 — Security & Privacy Specification

## Nội dung bàn giao chính

Đã hoàn thành **đợt 12: DOC-14 — Security & Privacy Specification**, gồm đặc tả bảo mật, phân quyền, bảo vệ dữ liệu nhân sự, xử lý yêu cầu dữ liệu và ứng phó sự cố.

**[Tải toàn bộ đợt 12 — ZIP tích lũy DOC-00 đến DOC-14 và các file bổ trợ](sandbox:/mnt/data/Vaga_DISC_Tai_lieu_Dot_12_DOC14_v0.1.0.zip)**

## 1. Các tài liệu Markdown

| Tài liệu | Nội dung đã viết | Link tải |
|---|---|---|
| **DOC-14 — Tài liệu chính** | **20 phần** về phạm vi bảo vệ, trách nhiệm, xác thực, phân quyền, mục đích xử lý, bảo vệ dữ liệu, thu hồi, nghiên cứu và điều kiện phát hành. | **[Tải DOC-14](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_SECURITY_PRIVACY_SPECIFICATION.md)** |
| **Mô hình đe dọa** | Sơ đồ luồng dữ liệu, **12 ranh giới tin cậy và 32 tình huống rủi ro**; có tác hại, biện pháp kiểm soát và rủi ro còn lại cần kiểm chứng. | **[Tải mô hình đe dọa](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_THREAT_MODEL.md)** |
| **Xác thực và bảo mật API** | Bốn loại phiên; xác minh tăng cường; cookie, CSRF, kiểm nguồn yêu cầu; xử lý dữ liệu đầu vào, hạn mức, nhập tệp, mã hóa, khóa và nhật ký. Các thông số kỹ thuật được ghi rõ là đề xuất. | **[Tải đặc tả xác thực/API](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_AUTHENTICATION_API_HARDENING.md)** |
| **Ma trận phân quyền** | **123 chính sách theo thao tác API**, gắn với loại phiên, quyền tác vụ, chủ sở hữu, phạm vi tổ chức, mục đích và nguồn dữ liệu. Đối chiếu lớp bảo vệ của **905 trường dữ liệu nguồn**. | **[Tải ma trận quyền](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_AUTHORIZATION_MATRIX.md)** |
| **Đối chiếu pháp lý và quyền dữ liệu** | **24 mục đối chiếu có nguồn**, **12 hoạt động xử lý**, thời hạn phản hồi–thực hiện–gia hạn, căn cứ xử lý, biểu mẫu thông báo và các điểm cần người phụ trách pháp lý quyết định. | **[Tải đối chiếu pháp lý](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_PRIVACY_LEGAL_MAPPING.md)** |
| **Lưu giữ, xóa và phục hồi** | **20 nhóm vòng đời dữ liệu**, có thời hạn/điều kiện đề xuất, ngoại lệ giữ lại, cách xóa dữ liệu dẫn xuất và ngăn dữ liệu đã xóa xuất hiện lại sau phục hồi. | **[Tải đặc tả vòng đời](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_RETENTION_DELETION_RESTORE.md)** |
| **Thu hồi quyền và cấp đầu ra** | Phân biệt mốc thu hồi quyền, quyết định cấp nội dung và thực sự truyền dữ liệu; đặc tả xử lý đồng thời, tác vụ đang chạy, gửi lại lệnh và truyền file một phần. | **[Tải đặc tả thu hồi](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_REVOCATION_CONSISTENCY.md)** |
| **Quy trình ứng phó sự cố** | Phân mức, tiếp nhận, cô lập, bảo toàn chứng cứ, đánh giá nghĩa vụ thông báo, khắc phục, phục hồi và truy cập khẩn cấp có kiểm soát. | **[Tải quy trình sự cố](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_INCIDENT_RESPONSE_RUNBOOK.md)** |
| **Kiểm soát và kế hoạch kiểm thử** | **42 yêu cầu kiểm soát SEC14 và 42 kịch bản kiểm thử SIT14**, có điều kiện, thao tác, kết quả kỳ vọng, trách nhiệm và bằng chứng cần thu. | **[Tải kế hoạch kiểm thử](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_CONTROL_TEST_CATALOG.md)** |
| **Ma trận truy vết** | Liên kết **75 chức năng, 123 API, 65 thực thể và 905 trường** với các kiểm soát, tình huống rủi ro và kiểm thử liên quan. | **[Tải ma trận truy vết](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_TRACEABILITY.md)** |
| **Quyết định và nguồn tham chiếu** | **20 đề xuất DEC-161–180**, **bốn yêu cầu thay đổi CR14-01–04** và **14 nguồn chính thức**, ghi rõ phần đã đọc và giới hạn áp dụng. | **[Tải sổ quyết định và nguồn](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_DECISIONS_AND_REFERENCES.md)** |
| **Báo cáo kiểm tra** | Kết quả thực chạy, các điểm đã sửa, kiểm tra bảo toàn nguồn và những phần chưa được triển khai hoặc thẩm định. | **[Tải báo cáo kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_VALIDATION_REPORT.md)** |

Các phụ lục trên thuộc **cùng DOC-14**, không tính thành những tài liệu lõi riêng.

## 2. Những điểm quan trọng đã được làm rõ

**Quyền quản trị không đồng nghĩa quyền đọc hồ sơ riêng.** Đã tách quyền quản lý danh tính, biên tập, duyệt nội dung, phát hành, xử lý yêu cầu dữ liệu và hỗ trợ. Người có quyền duyệt nội dung không tự được duyệt nâng quyền hoặc đọc câu trả lời của nhân viên.

**Nghỉ việc không chỉ là khóa tài khoản.** Đặc tả đã bổ sung yêu cầu xử lý dữ liệu theo Điều 25 khoản 2 điểm c: xóa, hủy dữ liệu cá nhân của người lao động ngay khi chấm dứt hợp đồng, trừ trường hợp theo thỏa thuận hoặc pháp luật có quy định khác. Vì vậy, thời hạn lưu đề xuất trong ứng dụng không được tự động dùng làm căn cứ giữ mọi hồ sơ sau nghỉ việc. citeturn492933view0

**Thời hạn xử lý quyền dữ liệu được tách theo loại yêu cầu.** Tài liệu phân biệt hạn phản hồi **hai ngày làm việc**, hạn thực hiện, trường hợp cần bên xử lý/bên thứ ba và điều kiện gia hạn. Không dùng một hạn chung cho mọi yêu cầu hoặc đặt lại đồng hồ tùy tiện trong quá trình xác minh. citeturn492933view1turn492933view2

**Thu hồi quyền phải có hiệu lực trên đường cấp dữ liệu.** Đã đặc tả trường hợp nội dung được tính trước khi thu hồi nhưng chưa gửi, tác vụ chấm đang chạy, bản xuất đang truyền và cache chưa cập nhật. Đồng thời giữ rõ giới hạn: ứng dụng không thể hứa thu hồi những dữ liệu đã được giao và lưu bên ngoài hệ thống.

## 3. File máy đọc và kiểm tra đã thực hiện

Có **[registry phân quyền](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_AUTHORIZATION_REGISTRY.json)**, **[JSON Schema](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_AUTHORIZATION_REGISTRY.schema.json)**, **[registry bảo vệ trường dữ liệu](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_FIELD_PROTECTION_REGISTRY.json)**, **[cấu hình bảo mật đề xuất](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_SECURITY_CONFIG_PROPOSAL.json)** và **[lịch lưu giữ đề xuất](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_RETENTION_PROPOSALS.json)**.

Bộ công cụ gồm **[mô hình kiểm quyền cục bộ](sandbox:/mnt/data/vaga_disc_docs_dot_12/policy_doc14_reference.py)**, **[53 trường hợp dữ liệu giả](sandbox:/mnt/data/vaga_disc_docs_dot_12/DOC-14_POLICY_FIXTURES.json)** và **[bộ chạy kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_12/verify_doc14.py)**.

Đã chạy đạt **24/24 kiểm tra metadata, tài liệu và truy vết**, cùng **53/53 trường hợp quyết định trong mô hình cục bộ**. Đã giữ nguyên nội dung **251 file nguồn** của đợt trước; ZIP được kiểm tra tính toàn vẹn và đối chiếu hash từng file.

**Các kết quả này chưa chứng minh ứng dụng đã an toàn hoặc tuân thủ pháp luật.** Chưa chạy kiểm thử trên máy chủ, cơ sở dữ liệu, hệ thống xác thực, đường truyền hoặc backup thật. **42 kịch bản SIT14, 30 kịch bản IT13 và 375 tiêu chí chấp nhận nguồn vẫn chưa được thực thi trên ứng dụng.**

## 4. Trạng thái và điểm tiếp tục

**Hiện có 15/22 tài liệu lõi đã soạn đầy đủ: DOC-00 đến DOC-14**, ở mức `0.1.0 / REVIEW_DRAFT`, chưa được phê duyệt.

**[README hướng dẫn bàn giao đợt 12](sandbox:/mnt/data/vaga_disc_docs_dot_12/README.md)** · **[Checkpoint DOC-15](sandbox:/mnt/data/vaga_disc_docs_dot_12/CHECKPOINT_DOC-15.md)**

**Điểm tiếp tục: DOC-15 — AI/LLM Personalization Specification**, đặc tả nhiệm vụ AI được phép và bị cấm, dữ liệu đầu vào tối thiểu, hợp đồng đầu ra, chống chỉ dẫn độc hại, đánh giá chất lượng và phương án thay thế khi lỗi. **AI vẫn là phần có điều kiện, chưa được bật trong MVP.**

---

## Nhật ký lập kế hoạch & xử lý chi tiết (Reasoning Log)



**Tiếp tục viết tài liệu**

Tiếp tục viết tài liệu DOC14 với Markdown, chú ý tới phân tích container, luật pháp, và điều chỉnh metadata. Đảm bảo sự tổng quan, rõ ràng, và chi tiết.

**Điều chỉnh yêu cầu**

Đang chuẩn bị các yêu cầu từ khóa, giới hạn nghiên cứu từ khóa tỷ lệ thuận với ngân sách. Hành động này giúp tối ưu chi tiết và nắm bắt nhu cầu nghiên cứu từ khóa hiệu quả.

**Phân chia nguồn tài liệu**

Tôi đang phân chia tài liệu pháp lý, chủ yếu từ những nguồn hợp pháp và công cộng, để kiểm soát số lượng từ và đảm bảo sự phụ thuộc đáng tin cậy.

**Xuất phát với bản tóm tắt lạ**

Chúng ta đang xử lý một số tệp PDF luật pháp, nhưng cần tăng tốc để hoàn thành mục tiêu chính. Thời gian xử lý tối đa 15 phút cho mỗi lần.

**Vị trí ngân sách**

Đang xác định khả năng lập ngân sách 30k với các công cụ pháp lý và tài liệu chính thức từ liên kết chính phủ.

**Cung cấp thông tin**

Chúng tôi đang có token thực tế và không cần lo lắng. Đảm bảo thời gian phản hồi tối đa là 60. Hãy chia sẻ cho người dùng những cập nhật quan trọng, không cần mọi thứ. Hiện tại, có khoảng 15 cuộc gọi web và mất khoảng 10 phút. Đang xử lý PDF.

**Chuyển đổi dữ liệu**

Đang sử dụng hình ảnh và tài liệu PDF để chuyển đổi dữ liệu thành tài liệu DOCX, tránh sử dụng OCR.

**Có thể cắt giảm dữ liệu**

Có ý định tải xuống chương trình docx, và giảm 71 ảnh chụp màn hình xuống chỉ cần 15 trang. Họ sẽ quét và đánh giá các trang chính xác cần thiết vậy ni.

**Thu thập tài liệu**

Tôi đang thu thập thông tin từ PDF và nghiên cứu các trang cần thiết.

**Điều tra nhu cầu**

Đang xem xét yêu cầu ND22 cụ thể, cần phân trang và luật pháp liên quan từ trang 17-23 và luật 20, đồng thời xác định 16 nguồn luật pháp liên quan.

**Ghi nhớ nguồn tài liệu**

Tôi đang nhớ lại các tài liệu gốc khi viết tóm tắt. Điều này đảm bảo tính chính xác và cập nhật.

**Cung cấp hướng dẫn**

Đề xuất cung cấp tài liệu với cấu trúc rõ ràng, cập nhật định kỳ và tuân thủ chính sách.

**Xây dựng chính sách**

Tôi đang phát triển chính sách quản lý với JSON schema để biểu diễn thuộc tính và quyền hạn.

**Đưa ra quyết định chính***

OK, tôi đang phân tích các chính sách và quyết định cần thiết để đảm bảo tính hợp pháp và hiệu quả.

**Xây dựng phần mềm**  
Tạo các hàm đo độ phức tạp và tối ưu hóa hiệu suất máy tính.

**Xây dựng bản đồ pháp lý**

Đang xây dựng bản đồ pháp lý, đơn giản và thân thiện, tuân thủ pháp luật và quy định. Đang lập danh sách mục tiêu cùng chứng cứ và luật liên quan.

**Theo dõi mã**

Đang kiểm tra cấu trúc file JSON và cú pháp Python.

**Cùng nhau hoàn thiện tài liệu**

Tôi hiện đang viết tài liệu về bảo mật và quyền riêng tư, đang nghiên cứu các chính sách liên quan và đang làm việc về việc kiểm tra tính bảo mật của hệ thống.

**Áp dụng kiến thức**

Đang nghiên cứu và áp dụng kiến thức có sẵn vào phương pháp mới để nâng cao hiệu quả.

**Kiểm tra chính sách**

Đang xem xét chính sách và ảnh chụp, phân tích sơ đồ tổ chức. đang đánh giá quyền truy cập và lưu trữ tài liệu

**Xử lý dãn đoạn và trích dẫn**

Tôi đang xử lý văn bản tiếng Việt, chia nhỏ đoạn văn và loại bỏ từ viết tắt. Việc này giúp tạo ra văn bản dễ đọc hơn và rõ ràng hơn.

**Tìm kiếm tài liệu**

Tôi đang tìm kiếm tài liệu hiện tại và thông tin liên quan đến dự án. Việc này có thể giúp tôi nắm bắt tiến trình và chuẩn bị cho bước tiếp theo.

**Kiểm tra bảo mật**

Đang tiến hành rà soát các điểm bảo mật và quyền truy cập API, đảm bảo mọi tiêu chuẩn đều được đáp ứng.

**Đánh giá polítiques**

Đang đối chiếu chính sách và tài nguyên chính xác.

**Phân tích yêu cầu**

Lưu ý kiểm tra công cụ và phương pháp mới, đảm bảo tính bảo mật và tổng thể hệ thống.

**Kiểm tra sự hiện diện**

Đang đảm bảo rằng tài liệu README/scrip/checkpoint hiện diện và có cấu trúc đầu vào/đầu ra tương thích. Hãy tiếp tục theo dõi để đảm bảo sự hiện diện của tài liệu này.

**Sửa lỗi cú pháp**

Đang dò lỗi không tương thích cú pháp và đóng dấu lệnh đôi cái mới, tôi nhận thấy vài bước đơn giản.

**Chuẩn hóa dữ liệu**  
Đang làm sạch định dạng tài liệu, ưu tiên chính tả chính xác và hạn chế viết tắt.

**Đẩy mạnh khả năng vận hành**

Công việc đang yêu cầu tối ưu hóa hoạt động xử lý tài liệu và dữ liệu, với chú trọng vào việc giữ gìn bản chất ban đầu và loại bỏ sự bất mãn.

**Xử lý văn bản**

Tôi đang chú ý tới việc thay thế từ ngữ liên quan đến thời gian và các thuật ngữ kỹ thuật như `full output` thành `full output`, `data flow` thành `data flow` trong tài liệu.

**Coworking và đánh giá**

Đang kiểm tra và đánh giá các yêu cầu cho báo cáo hiện tại, bảo đảm tính chính xác và chi tiết trong toàn bộ quá trình.

**Checking nguồn tài liệu**

Đang xem xét nguồn tài liệu và chắc chắn rằng mọi trích dẫn và yêu cầu đã được đáp ứng đầy đủ.

**Đánh giá chính sách và bảo mật**

Mình đang rà soát lại các chính sách bảo mật và quyền riêng tư từ OpenAI, đặc biệt là liên quan đến quyền truy cập và bảo vệ dữ liệu.

**Kiểm tra khả năng**

Đang xác minh tính hợp lệ của nguồn tài liệu và đảm bảo rằng cơ chế bảo mật được tuân thủ, không có quyền truy cập sai thực hiện hành động code.

**Đảm bảo tuân thủ**

Kiểm tra lại báo cáo cuối cùng với dữ liệu hiện tại và thông tin cắt giảm rủi ro, đảm bảo kế hoạch hoàn thành đúng hạn.

**Đánh giá nội dung Markdown**

Đang so sánh các luật pháp liên quan đến điều 19 của TikTok. Họ đang xử lý tài liệu lập trình và mã nguồn.

**Kiểm tra chính sách OpenAI**

**Kiểm tra lò điện suất**

Đang rà soát tài liệu final report để đảm bảo đúng yêu cầu và số liệu cụ thể.

**Hoàn thiện tài liệu**

Tôi đang hoàn thiện tài liệu pháp lý, đảm bảo các yếu tố kỹ thuật và pháp lý được đáp ứng.
