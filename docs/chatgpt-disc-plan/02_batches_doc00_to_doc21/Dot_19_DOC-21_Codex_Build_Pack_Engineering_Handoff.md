# Đợt 19: DOC-21 — Codex Build Pack & Engineering Handoff

## Nội dung bàn giao chính

Đã hoàn thành **đợt 19: DOC-21 — Codex Build Pack & Engineering Handoff**, tài liệu cuối trong danh mục. **Bộ DOC-00 đến DOC-21 hiện đã đủ 22/22 tài liệu lõi ở mức bản thảo**, kèm nguồn nghiên cứu, hợp đồng dữ liệu, công cụ tham chiếu và hướng dẫn bàn giao.

**[Tải bộ tài liệu đầy đủ — ZIP tích lũy DOC-00 đến DOC-21](sandbox:/mnt/data/Vaga_DISC_Tai_lieu_Dot_19_DOC21_v0.1.0.zip)**

**Điểm bắt đầu sử dụng:** [Hướng dẫn START HERE](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_START_HERE.md) · **[Prompt giao nhiệm vụ đầu tiên cho Codex](sandbox:/mnt/data/vaga_disc_docs_dot_19/CODEX_START_PROMPT.md)**

## 1. Các tài liệu Markdown của DOC-21

| Tài liệu | Nội dung đã viết | Link tải |
|---|---|---|
| **DOC-21 — Tài liệu chính** | **20 phần** về tổ chức bàn giao, nguồn cần đọc, lựa chọn bản thiết kế để lập trình, cấu trúc repository, nhiệm vụ, hợp đồng, kiểm thử, review và điều kiện phát hành. | **[Tải DOC-21](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_CODEX_BUILD_PACK.md)** |
| **Bản đồ nguồn và hợp đồng** | Chỉ mục **22 tài liệu lõi**, lộ trình đọc cho **50 phần công việc** và **384 tham chiếu tới đúng đối tượng JSON hoặc khoảng dòng**. Không yêu cầu Codex đọc toàn bộ hàng trăm file cho mỗi nhiệm vụ. | **[Tải bản đồ nguồn](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_CONTEXT_CONTRACT_MAP.md)** |
| **Baseline và thẩm quyền quyết định** | Phân biệt tài liệu tham khảo, bản thiết kế ứng viên và bản đã được duyệt; xử lý các mâu thuẫn, bảy yêu cầu thay đổi nền tảng và những nhánh có thể hoãn. | **[Tải hướng dẫn baseline](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_BASELINE_AUTHORITY.md)** |
| **Repository và chỉ dẫn coding agent** | Cấu trúc thư mục đề xuất; ranh giới mã giao diện, nghiệp vụ, adapter, tài sản hạn chế, kiểm thử và bằng chứng; cách bố trí AGENTS.md và phối hợp nhiều nhiệm vụ. | **[Tải hướng dẫn repository](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_REPOSITORY_AGENT_GUIDE.md)** |
| **Thẻ giao việc chi tiết** | **50 hồ sơ nhiệm vụ**, tương ứng 50 phần đầu ra của 33 gói WP20. Mỗi hồ sơ có mục tiêu, nguồn, phạm vi được sửa, điều kiện trước, bước thực hiện, dữ liệu, phân quyền, ca lỗi, bằng chứng và điểm dừng. | **[Tải 50 thẻ giao việc](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_TASK_CARDS.md)** |
| **Bootstrap và lệnh thực thi** | Phân biệt **bảy lệnh kiểm gói cục bộ** với **15 vị trí chờ gắn lệnh build/test sản phẩm** sau khi chọn công nghệ. Có cách ghi phiên bản, tác động, kết quả và điều kiện chạy. | **[Tải hướng dẫn lệnh](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_BOOTSTRAP_COMMANDS.md)** |
| **Bàn giao kiểm thử và CI** | Cách xác định tiêu chí áp dụng cho từng phần việc; dữ liệu thử, bộ quan sát, kiểm thao tác đồng thời, chuyển bộ chấm sang ngôn ngữ khác và thu bằng chứng đúng tầng. | **[Tải hướng dẫn kiểm thử](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_TEST_CI_ENGINEERING_HANDOFF.md)** |
| **Review, PR và nghiệm thu** | Điều kiện nhận việc và hoàn thành; mẫu bàn giao thay đổi; trách nhiệm người duyệt; xử lý phần bị chặn, phát hành và rollback không khôi phục quyền đã rút. | **[Tải quy trình nghiệm thu](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_REVIEW_RELEASE_ACCEPTANCE.md)** |
| **Ma trận truy vết** | Liên kết **75 chức năng, 75 User Stories và 375 tiêu chí chấp nhận nguồn** với nhiệm vụ và biến thể công việc. Phân biệt liên kết thiết kế với bằng chứng đã kiểm thử. | **[Tải ma trận truy vết](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_TRACEABILITY.md)** |
| **Quyết định và nguồn tham chiếu** | **14 đề xuất DEC-277–290, hai yêu cầu thay đổi CR21 và tám nguồn chính thức**, có trách nhiệm, giới hạn và điều kiện áp dụng. | **[Tải sổ quyết định và nguồn](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_DECISIONS_AND_REFERENCES.md)** |
| **Hợp đồng công cụ cục bộ** | Định dạng registry, cách chọn đoạn nguồn, kiểm đường dẫn và checksum, JSON Schema, mã lỗi, giới hạn đầu ra và cách chạy verifier. | **[Tải đặc tả công cụ](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_LOCAL_TOOL_CONTRACTS.md)** |
| **Báo cáo kiểm tra** | Kết quả thực chạy, các lỗi phát hiện và đã sửa, phạm vi bảo toàn nguồn cùng những phần chưa được triển khai hoặc kiểm chứng. | **[Tải báo cáo kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_VALIDATION_REPORT.md)** |

Các phụ lục trên thuộc **cùng DOC-21**, không tính thành những tài liệu lõi riêng.

## 2. Những phần có thể dùng để giao việc cho Codex

**Đã tạo tệp [AGENTS.md](sandbox:/mnt/data/vaga_disc_docs_dot_19/AGENTS.md)** tại thư mục gói, cùng bốn mẫu chỉ dẫn riêng cho giao diện, nghiệp vụ, kiểm thử và vận hành. Nội dung giữ các ranh giới quan trọng: không sửa nguồn lịch sử, không tự ký phê duyệt, không đưa khóa chấm vào giao diện, không sửa kết quả kỳ vọng để test đạt và không tự gọi nhà cung cấp hoặc triển khai.

**Mỗi nhiệm vụ có nguồn đọc cụ thể.** Công cụ hỗ trợ lấy đúng đoạn tài liệu hoặc đối tượng JSON và kiểm checksum trước khi trả nội dung. Khi đoạn vượt giới hạn, công cụ báo lỗi thay vì cắt mất phần ngoại lệ rồi coi đã đọc đủ.

**Ba nhiệm vụ khởi đầu được tách rõ:**

| Nhiệm vụ | Đầu ra cần thực hiện |
|---|---|
| **TASK21-001 — Chuẩn bị baseline** | Bản phạm vi ứng viên, ma trận thay đổi hợp đồng, ghi nhận nguồn đã đọc và danh sách vấn đề cần quyết định. Chưa tạo ứng dụng. |
| **TASK21-002 — Chuẩn bị quyết định kiến trúc** | Phương án công nghệ, cơ sở dữ liệu, định danh, vận hành và kế hoạch thử các rủi ro kỹ thuật. Không tự chọn nhà cung cấp thay người phụ trách. |
| **TASK21-003 — Xây nền kỹ thuật và kiểm thử** | Chỉ bắt đầu sau khi phạm vi và lựa chọn kỹ thuật tương ứng đã được chốt; tạo repository, gắn lệnh thực, kiểm OpenAPI độc lập và dựng môi trường thử tổng hợp. |

Cách chia này cho phép bắt đầu công việc chuẩn bị mà **không phải chờ tất cả quyết định của AI, analytics hoặc tích hợp doanh nghiệp**, nhưng cũng không bỏ qua quyền dữ liệu và các điều kiện an toàn của phần đang xây.

## 3. File máy đọc và công cụ đã kiểm tra

Có **[Task Registry](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_TASK_REGISTRY.json)**, **[Context Sources](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_CONTEXT_SOURCES.json)**, **[Variant Routing](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_VARIANT_ROUTING.json)**, **[Command Registry](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_COMMAND_REGISTRY.json)** và **[JSON Schema](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_HANDOFF_CONTRACTS.schema.json)**.

Công cụ gồm **[helper đọc nguồn và nhiệm vụ](sandbox:/mnt/data/vaga_disc_docs_dot_19/handoff_doc21.py)**, **[58 tình huống tổng hợp](sandbox:/mnt/data/vaga_disc_docs_dot_19/DOC-21_LOCAL_FIXTURES.json)** và **[bộ chạy kiểm tra](sandbox:/mnt/data/vaga_disc_docs_dot_19/verify_doc21.py)**.

Đã chạy đạt **114/114 phép kiểm cục bộ**: 14 kiểm tra nguồn, tài liệu và truy vết; 30 kiểm tra hợp đồng và dữ liệu giả mạo; 58 tình huống fixture; 12 kiểm tra lệnh.

Đã giữ nguyên nội dung **475 file nguồn** của đợt trước. Gói ZIP được kiểm tra từng file, giải nén sang vị trí khác và chạy lại bộ kiểm; kết quả vẫn **114/114**, không làm thay đổi tệp trong gói. **[Xem kết quả kiểm đóng gói](sandbox:/mnt/data/Vaga_DISC_Dot_19_DOC21_Package_Verification.json)**.

## 4. Trạng thái cuối bộ tài liệu

**Đã hoàn tất việc soạn 22/22 tài liệu lõi. Chưa hoàn tất ứng dụng.**

Toàn bộ vẫn ở mức `0.1.0 / REVIEW_DRAFT`, chưa được phê duyệt. Chưa có repository sản phẩm, công nghệ được chọn, cơ sở dữ liệu, hệ thống xác thực hoặc lệnh build/test sản phẩm đã chạy. Chưa gọi Codex, chưa chạy validator OpenAPI độc lập, chưa thực hiện kiểm thử ứng dụng hoặc kiểm định DISC trên người thật. **375 tiêu chí chấp nhận và 447 đơn vị thiết kế kiểm thử DOC-16 không được chuyển thành “đạt” từ kết quả kiểm tệp.**

**[README tổng hợp và hướng dẫn sử dụng](sandbox:/mnt/data/vaga_disc_docs_dot_19/README.md)** · **[Checkpoint bắt đầu xây dựng](sandbox:/mnt/data/vaga_disc_docs_dot_19/CHECKPOINT_BUILD_START.md)**

**Điểm bắt đầu tiếp theo là TASK21-001**, dùng **[prompt khởi đầu cho Codex](sandbox:/mnt/data/vaga_disc_docs_dot_19/CODEX_START_PROMPT.md)** để chuẩn bị bản thiết kế ứng viên và các quyết định cần chốt trước khi lập trình.
