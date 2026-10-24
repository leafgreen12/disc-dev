---
title: "Phương án nâng cấp Vaga DISC v0.2"
version: 1.0.0
prepared_on: 2026-10-15
status: PROPOSAL_NOT_APPLIED
source_files_modified: false
production_authorized: false
---

# Kế hoạch nâng cấp: từ đặc tả rộng sang lát cắt thực thi

## 1. Mục tiêu và phạm vi

Mục tiêu không phải tăng điểm tài liệu bằng cách thêm nhiều file. Mục tiêu là giúp đội kỹ thuật xây một vòng giá trị có thể kiểm chứng, không phải tự đoán chính sách và không phải chờ hoàn tất nghiên cứu DISC mới có chức năng phát triển cá nhân.

**Phạm vi đề xuất cho bản đầu:** manual cộng tác do chủ hồ sơ xác nhận; tìm và đọc manual theo quyền; hành động riêng tư do cá nhân tự chọn; danh tính, quyền dữ liệu, hỗ trợ, audit tối thiểu và vận hành tương ứng.

**Tiếp tục tắt:** assessment cho người thật khi chưa đủ điều kiện; phân loại 12 kiểu; chuẩn tham chiếu; nội dung và pair theo điểm; AI; product analytics; đồng bộ HRIS/SCIM và nhắc ngoài ứng dụng. Đăng nhập an toàn vẫn bắt buộc, không được coi là tùy chọn chỉ vì đồng bộ doanh nghiệp có thể hoãn.

Đây là phương án để Vaga xem xét theo nguồn lực thực. Không có ngày cam kết, ngân sách, người duyệt đã được bổ nhiệm hoặc quyền triển khai được tự tạo trong kế hoạch.

## 2. Tổ chức nguồn có hiệu lực

Giữ nguyên bộ 22 tài liệu trong kho tham khảo. Tạo tập active cho đúng phạm vi đang xây. Tên đường dẫn dưới đây là đề xuất cho repository tương lai, không phải ứng dụng đã được tạo.

| Nguồn active | Trách nhiệm duy nhất | Kế thừa từ |
|---|---|---|
| `baseline/scope.yaml` | Chức năng trong/ngoài phạm vi, giả định, quyết định và điều kiện người thật | DOC20/21 |
| `baseline/authority-map.yaml` | Nguồn có thẩm quyền cho từng hành vi, trạng thái, trường dữ liệu | DOC05/12/13/14/20/21 |
| `contracts/api.openapi.yaml` | Request, response, status và lỗi của API đang xây | DOC13 và các delta đã duyệt |
| `domain/policies/` | Quyền, ownership, generation, purpose và thu hồi | DOC05/14, ràng buộc vận hành DOC17 |
| `domain/state-transitions/` | Điều kiện chuyển trạng thái và tác động phụ | DOC05/12 |
| `database/migrations/` | Schema vật lý, khóa và ràng buộc đã chọn | DOC12 và các thay đổi vòng đời |
| `ui/task-flows/` | Ba hành trình người dùng và các trạng thái giao diện | DOC06/07 và variant hành động riêng |
| `content/approved-general/` | Chỉ nội dung chung/mẫu được duyệt đúng phạm vi | DOC11 |
| `tests/acceptance/`, `tests/oracles/` | Assertions thực thi và kết quả kỳ vọng độc lập | DOC04/09/16 và phản ví dụ review |
| `operations/`, `AGENTS.md` | Lệnh thật, cấu hình, runbook và ranh giới agent | DOC17/21 |

Không duy trì ba bản khác nhau của cùng một constraint phải sửa bằng tay. Có thể sinh tài liệu và kiểu client từ hợp đồng chuẩn; permission và semantic checks vẫn phải thực thi ở server. Kết quả kỳ vọng quan trọng không được sinh từ chính hàm đang cần kiểm.

```text
reference/v0.1.0/         # nguồn lịch sử bất biến
baseline/v0.2-candidate/  # phạm vi, CR disposition và nguồn được chọn
app/                     # giao diện/server theo ADR
contracts/               # request/response có hiệu lực
schema/                  # dữ liệu và tài sản đúng phạm vi
content/                 # authoring tách nội dung được phép cấp
research/                # protocol; không chứa raw người thật trong Git
reference-tools/         # scorer/selector/helper cũ có nhãn tham chiếu
quality/                 # tests, oracle và bằng chứng không nhạy cảm
operations/              # runbook và cấu hình không chứa secret
```

Không đưa khóa chấm, toàn bộ ngân hàng nghiên cứu, raw responses hoặc bằng chứng riêng vào public frontend assets. Kho tham khảo không phải webroot.

## 3. Các gói nâng cấp

### UP-01 — Hợp nhất phạm vi và hợp đồng nền

**Mục tiêu:** xử lý RV-001; xác định phạm vi áp dụng của RV-002, RV-003, RV-026 và RV-027.

**Đầu vào:** ZIP nguồn đã kiểm hash; bảng hòa giải DOC20; ma trận thẩm quyền DOC21; các CR về quyền dữ liệu, review target, vòng đời và vận hành.

**Người chịu trách nhiệm:** Product Owner và BA; Tech, QA, Privacy/Legal duyệt đúng phần chuyên môn.

**Các bước:**

1. Chọn phạm vi manual, hành động tự chọn và nền an toàn; ghi rõ assessment, AI, analytics và đồng bộ chưa được bật.
2. Xác định nguồn điều khiển từng behavior: ai được đọc, ai được ghi, bản nào có hiệu lực, điều kiện thu hồi, điều kiện xóa.
3. Tạo delta ứng viên cho bảy CR nền; thêm phần xác thực liên quan nếu lựa chọn OIDC.
4. Chỉ rõ field, state, API, UI, migration và test bị ảnh hưởng; không chỉ ghi “cần tăng bảo mật”.
5. Phân nhóm quyết định phải chốt, giả định kỹ thuật có thể thử và nhánh có thể hoãn. Gắn người chịu trách nhiệm, không ký thay người.

**Đầu ra:** scope manifest, authority map, delta contracts, issue log và danh sách chức năng không được cấp.

**Nghiệm thu:** một người mới tìm được câu trả lời duy nhất cho quyền xem, bản manual đang công bố và vòng đời sau nghỉ việc. Hai thứ tự pair khác nhau không cùng có hiệu lực. Candidate không chứa phê duyệt giả.

**Điểm dừng:** mâu thuẫn về quyền hoặc nghĩa vụ dữ liệu chưa có người quyết định. Công việc soạn thảo hoặc thử bằng dữ liệu tổng hợp thuộc phạm vi khác vẫn có thể tiếp tục.

### UP-02 — Sửa validation bằng các phản ví dụ đã có

**Mục tiêu:** xử lý RV-005 đến RV-008, cùng phần nhất quán của RV-016/017.

Tạo phiên bản mới của helper và hợp đồng, giữ nguyên v0.1. Phân biệt các đơn vị COUNT, PROPORTION, CORRELATION, RAW_MEAN_1_5 và LINEAR_0_100. COUNT quan sát là số nguyên không âm. Khi cần weighted hoặc noisy estimate, định nghĩa đơn vị và phương pháp riêng; không dùng sự linh hoạt này để hợp thức mọi số sai.

Tách dữ liệu diagnostic trong nghiên cứu khỏi estimate được phép cấp báo cáo. Một ước lượng bất thường có thể cần được giữ để điều tra phương pháp, nhưng không tự trở thành kết quả hợp lệ.

Với pair, typed/non-null chỉ là bước đầu. Service phải phân giải đúng bản kết quả, chủ thể, thế hệ, grant và phương pháp trước khi so selected với granted. Hai giá trị bằng nhau không chứng minh tài nguyên tồn tại hoặc được phép dùng.

Chọn rõ SafeDimension.value là số hiển thị đã làm tròn hay số chính xác. Nếu cần cả hai, dùng trường riêng. Không đưa số đã làm tròn trở lại engine.

**Bộ kiểm cần bổ sung:** PR01–06; đối chứng COUNT=0 và PROPORTION=2; đổi unit nhưng giữ value; null, chuỗi rỗng, reference không tồn tại, sai chủ thể và sai thế hệ; giá trị tại biên 1/5/0/100; text không khớp precision. Kiểm ở schema, helper và adapter HTTP khi có implementation.

**Nghiệm thu:** phản ví dụ có kết quả kỳ vọng rõ, test đỏ trước sửa và xanh sau sửa. Chạy validator OpenAPI độc lập, ghi phiên bản và kết quả; chưa chạy được thì giữ gap mở. Không chuyển test hợp đồng thành bằng chứng khoa học.

### UP-03 — Chuẩn hóa nội dung theo tình huống

**Mục tiêu:** xử lý RV-012/024 và hỗ trợ RV-014.

Rà 44 thẻ đang có đủ bảy contexts. Chủ nội dung phải giải thích vì sao từng context cần được giữ. Mỗi thẻ có tình huống chính, tình huống phụ được hỗ trợ, điều kiện không nên chọn và hành động cụ thể. Thẻ nói về giao việc không tự phù hợp với ghi nhận.

Không giải quyết bằng cách nhân hàng chục bản gần giống nhau. Có thể dùng mô-đun hành động chung, nhưng rule chọn phải có nghĩa. Context không phải nhãn trang trí.

Bản đầu chỉ cần review những mẫu và hướng dẫn chung cho manual, hành động tự chọn. Nội dung theo điểm/nhãn tiếp tục tắt. Người dùng được tự viết; chọn một mẫu không tự tạo mã sở thích đã xác nhận.

**Nghiệm thu:** mỗi thẻ có ít nhất một ca phù hợp và một phản ví dụ về tình huống. Không có thẻ phù hợp thì trả ít hơn hoặc hướng dẫn chung có nhãn. Reviewer đọc đầu ra trong tác vụ cụ thể, không chỉ so ID. Nội dung dùng với người thật có review nghĩa và quyền sử dụng đúng revision.

### UP-04 — Tách hành động riêng tư khỏi assessment

**Mục tiêu:** xử lý RV-013; đưa cả hai luồng giá trị vào bản đầu.

Tạo variant `self_chosen_actions_no_assessment`, tách khỏi các phần result/history/retest của WP20-019. Tái sử dụng ý nghĩa ActionInput: title, trigger, behavior, success_signal, review_date và timezone.

Phải rà cả precondition của service và quan hệ dữ liệu để bảo đảm không còn phụ thuộc assessment ngầm. Chỉ nhìn request DTO không có result là chưa đủ để kết luận implementation không cần result.

**Luồng đề xuất:** chọn tình huống muốn cải thiện → viết hành động nhỏ → xác định dấu hiệu tự kiểm → chọn ngày tự xem lại → ghi chú riêng → sửa, hoàn thành, bỏ hoặc xóa. Chưa cần nhắc ngoài app; không công bố tiến độ cho quản lý.

Ví dụ: “Khi nhận yêu cầu mới, tôi sẽ hỏi rõ đầu ra và thời điểm cần chốt. Tôi tự kiểm xem mình đã thống nhất được hai thông tin đó chưa.” Đây là lựa chọn hành động, không phải nhận xét rằng người dùng thuộc nhóm tính cách nào.

**Nghiệm thu:** người chưa làm bài vẫn sử dụng được. Người khác biết ID không đọc được. Hai tab không ghi đè dữ liệu đã xác nhận. Xóa, nghỉ việc và phục hồi giữ đúng quyền. Không tự sửa manual đang công bố hoặc suy nhãn DISC.

### UP-05 — Chọn kiến trúc và dựng lát cắt đầu-cuối

**Mục tiêu:** xử lý RV-015/021/027; vẫn dùng dữ liệu tổng hợp.

ADR cần dựa trên năng lực đội, môi trường hiện có, tải đồng thời, nguồn danh tính và trách nhiệm vận hành. Phương án ban đầu nên xem xét là một ứng dụng mô-đun và cơ sở dữ liệu quan hệ. Framework/cloud phải được chọn sau khi đối chiếu khả năng đáp ứng, không theo mặc định của dự án khác.

Lát cắt phải đi qua giao diện, server, database và quyền thật trong sandbox. Danh tính và hồ sơ đều tổng hợp. Không mock chính nguồn quyền đang cần chứng minh. Hook thử nghiệm không được trở thành đường bỏ qua bảo mật trong artifact production.

**Hành trình kiểm:** A đăng nhập → A tạo hành động riêng và manual nháp → nhận xác nhận lưu → xem trước đúng revision → công bố manual → B đọc phần được phép → A rút chia sẻ → B không nhận payload mới → A xóa hành động → thử phục hồi không làm sống lại quyền hoặc dữ liệu ngoài phương án cho phép.

**Nghiệm thu:** checkout sạch chạy được lệnh README; build, migration, contract, unit, integration và E2E có kết quả theo phạm vi. API và projection thực đúng hợp đồng. Không yêu cầu xây mọi operation mới được gọi là lát cắt hoàn thành.

### UP-06 — Hoàn thiện privacy, vòng đời và vận hành

**Mục tiêu:** xử lý RV-002/003/026.

Lập bản đồ đúng các nơi lưu sẽ được dùng: DB, cache, queue, export, log, backup và processor bên ngoài nếu có. Mỗi nhóm có owner, căn cứ xử lý, thời hạn, điều kiện xóa, ngoại lệ giữ và cách kiểm.

Biên bản không chỉ ghi “xóa thành công”. Phải nêu phần đã xóa, phần chưa xử lý, cách quản lý backup, chứng cứ tối thiểu còn giữ và giới hạn đối với bytes đã giao ra ngoài. Không gọi hash hoặc mã giả danh là dữ liệu ẩn danh chỉ vì bỏ tên.

Chốt phương án dữ liệu khi nghỉ việc theo review pháp lý của dataflow thực. Không để developer tự chọn TTL. Người đã nghỉ vẫn có kênh thực hiện quyền dữ liệu mà không được mở lại tài khoản nội bộ.

**Nghiệm thu:** một kiểm thu hồi giữa luồng, một kiểm xóa, một diễn tập phục hồi và một tình huống nghỉ việc–tái gia nhập chạy trên hạ tầng sandbox thật. Có observer, mốc và giới hạn rõ. Phê duyệt pháp lý và nghiệm thu kỹ thuật không được ký thay nhau.

### UP-07 — Thử UX và nội dung bằng tác vụ

**Mục tiêu:** xử lý RV-014 và phần thực địa của RV-024.

Không bắt người thử làm DISC để đánh giá manual. Chuẩn bị hồ sơ giả và kế hoạch thử phù hợp quyền. Ba tác vụ: viết hướng dẫn cho đồng nghiệp, tìm thông tin cần khi giao việc, tự chọn hành động phát triển.

Ghi đường đi, điểm mắc, yêu cầu trợ giúp và cách người dùng hiểu quyền. Bảng điều khiển fixture vẫn có thể tồn tại cho QA nhưng không hiện trong chế độ người thử. Dùng phân lớp giải thích để bớt cảnh báo lặp mà không giấu hậu quả quan trọng.

**Nghiệm thu:** vấn đề nghiêm trọng đã xử lý; người thử không nhầm private/public; đường thu hồi và xóa tìm được; bàn phím và trình đọc màn hình có kiểm theo phạm vi. Không tuyên bố toàn ứng dụng đạt WCAG từ vài ảnh hoặc tiêu chí đã thử.

### UP-08 — Nghiên cứu instrument theo track riêng

**Mục tiêu:** xử lý RV-004/009/010/011/023/028.

Chọn tự xây hay cấp phép. Nếu tự xây, bắt đầu từ review construct và câu hỏi; không tăng số câu chỉ để đạt quota 80–96. Xem lại L-D07/A-D02, L-C04 và các câu lẫn năng lực hoặc cơ hội thực hiện. Mọi thay đổi thang/bối cảnh có revision.

Thực hiện cognitive interview trước nghiên cứu định lượng lớn. Chốt lấy mẫu, mô hình và tiêu chí theo claim muốn mở. Dùng mẫu xác nhận độc lập khi thiết kế đòi hỏi; không coi vài chục người thích báo cáo là bằng chứng đủ cho mọi diễn giải.

So sánh missing policies trong nghiên cứu; dữ liệu được ước lượng không ghi ngược vào raw responses. Nếu chưa có bằng chứng cho taxonomy, tiếp tục không phân nhãn. Muốn mở thẻ theo điểm phải có feature policy, review nội dung, quyền và claim đúng phạm vi.

**Nghiệm thu:** mỗi claim có quyết định riêng, dataset/method/phạm vi và các phát hiện bất lợi. Không mượn norm của vendor hoặc dùng lượt xem làm bằng chứng validity.

### UP-09 — Giảm chi phí duy trì nguồn và giao việc cho agent

**Mục tiêu:** xử lý RV-016/018/019/020/022/025.

Tạo navigation overlay cho các README lịch sử có link hỏng, giữ file gốc. Chọn schema chuẩn để sinh bảng/kiểu cơ bản; CI phải phát hiện drift giữa nguồn sinh và file sinh. Chuyển setup chung lặp lại thành fixture contract có version; hồ sơ test giữ phần riêng cần quan sát.

AGENTS nêu active contract, lệnh thực và giới hạn. Task chưa đủ authority chỉ được soạn delta hoặc spike an toàn, không ký thay. Agent không được lấy toàn bank/keys làm frontend data để tiết kiệm thời gian; cũng không cài analytics SDK chỉ để tiện đo.

**Nghiệm thu:** thay đổi hợp đồng có diff đầy đủ cho consumers; kiểm archive tìm được link hỏng; context của task đủ ngoại lệ nhưng không đòi đọc mọi tệp. Tinh gọn không làm mất AC nguồn.

## 4. Trình tự và phụ thuộc

| Mốc | Công việc chính | Có thể làm song song | Điều kiện kết thúc |
|---|---|---|---|
| A. Baseline ứng viên | UP01 và quyết định kiến trúc trong UP05 | UP02; chuẩn bị nội dung và nghiên cứu | Scope, authority và contract không mâu thuẫn trong lát cắt |
| B. Hợp đồng và nền thử | UP02, repository/harness trong UP05 | UP03, chuẩn bị UP06, UP09 | Có checker phù hợp và một vòng build/test bằng dữ liệu giả |
| C. Hai luồng giá trị | UP04 và manual đầu-cuối trong UP05 | UP06, chuẩn bị UP07 | Tác vụ và negative/race cases đủ phạm vi |
| D. Nội bộ có điều kiện | UP06/07 và review dữ liệu thật | UP08 tiếp tục độc lập | Phê duyệt đúng scope; hỗ trợ, rollback, restore có bằng chứng |
| E. Mở rộng có căn cứ | UP08; optional theo nhu cầu thực | Tối ưu theo lỗi quan sát | Không mở claim/provider trước gate tương ứng |

Bảng không có ngày cam kết. Chỉ lập ngày và ngân sách sau khi biết đội, stack, phạm vi dữ liệu và nghiên cứu. Đây không phải lịch công việc chạy nền.

## 5. Những bất biến phải giữ

Owner mới được xem ghi chú riêng; manager không tự thừa hưởng quyền. Draft khác publication. Nhận gợi ý không tự công bố. Không gán điểm/nhãn thiếu căn cứ. Pair B_ONLY không đọc dữ liệu riêng của A. Grant điểm không chuyển sang latest. Missing không thành 0 hoặc 3. Retry không đổi công thức hoặc cấp lại dữ liệu ngoài quyền. Rollback/restore không hồi sinh quyền đã rút hoặc dữ liệu đã xóa. Audit không biến thành kho nội dung thứ hai.

Giảm chữ và số màn hình không đồng nghĩa bỏ các bất biến này. Chúng phải được thực thi ở đúng nơi, không chỉ ghi trong giao diện hoặc AGENTS.md.

## 6. Thẻ giao việc đầu tiên sau review

**Mã đề xuất:** `UPG-V02-BASELINE-001`. **Loại:** chuẩn bị baseline ứng viên, chưa triển khai.

**Mục tiêu:** chọn scope manual và hành động tự chọn; hòa giải các CR nền; chỉ rõ một contract có hiệu lực cho mỗi behavior.

**Nguồn:** DOC20 baseline, DOC21 authority, báo cáo review; các finding RV-001/002/003/013/021/027.

**Được sửa:** thư mục baseline ứng viên mới, test specification mới và changelog. **Không được sửa:** corpus v0.1, approvals, expected của checker cũ, quyền nhân viên hay hệ thống nhà cung cấp.

**Đầu ra:** scope IN/OUT; authority map; diff đề xuất; AC applicability; tám quyết định cần owner; task UP02/UP05 có đầu vào và kết quả kỳ vọng.

**Kiểm:** source hash còn nguyên; hành động tự chọn không bắt assessment; các nhánh AI/analytics/sync không thể tự bật; quyền, xóa và nghỉ việc không bị đẩy ra khỏi bản đầu.

**Điểm dừng:** vấn đề cần quyết định pháp lý/khoa học chưa có người chịu trách nhiệm. Báo đúng phần bị chặn và phần vẫn có thể thử bằng dữ liệu tổng hợp, không dừng mọi việc vì một nhánh optional chưa chọn.

## 7. Định nghĩa hoàn thành nâng cấp

| Đối tượng | Cần chứng minh | Không được dùng thay |
|---|---|---|
| Tài liệu active | Scope, nguồn, delta và owner rõ | Số file hoặc trạng thái nháp chung |
| Hợp đồng | Phản ví dụ được xử lý; validator phù hợp; DTO đúng đơn vị | Chỉ parse JSON hoặc resolve `$ref` |
| UX | Người dùng làm được tác vụ và hiểu quyền | Ảnh đẹp hoặc atlas chạy được |
| Lát cắt kỹ thuật | Build/DB/API/auth/projection được kiểm trên sandbox | Boolean fixture tự khai hợp lệ |
| Dữ liệu thật | Căn cứ, nội dung và scope được duyệt; vòng đời đã kiểm | Test code đạt hoặc consent chung |
| Khoa học DISC | Bằng chứng đúng instrument, claim và phạm vi | Bốn điểm số, alpha đơn lẻ, validation của vendor |

**Mục tiêu kết thúc không phải “v0.2 đạt 90 điểm”.** Mục tiêu là một sản phẩm nhỏ có hai luồng giá trị rõ, quyết định nền được chốt và bằng chứng đúng cho những gì thực sự đưa vào sử dụng.
