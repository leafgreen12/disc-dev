---
title: "Sổ 28 phát hiện và đề xuất sau review"
prepared_on: 2026-10-15
status: OPEN_RECOMMENDATIONS_NOT_APPLIED
---

# Sổ phát hiện và đề xuất

P0 chặn phạm vi liên quan trước build có mâu thuẫn hoặc trước dữ liệu thật. P1 cần sửa trước dùng module tương ứng. P2 là nâng cấp duy trì hoặc nhánh có điều kiện. Không phải mọi mục đều là lỗi code; không mục nào là lỗ hổng production đã được xác nhận.

| Mã | Mức | Vấn đề | Người chịu trách nhiệm đề xuất |
|---|---|---|---|
| RV-001 | P0 | Chưa có một baseline thực thi đã hợp nhất | Product Owner / BA / Tech / Privacy |
| RV-002 | P0 | Quyền dữ liệu và offboarding chưa thành hợp đồng đồng bộ | Privacy / Legal / HR / Tech |
| RV-003 | P0 | Mốc thu hồi–cấp đầu ra chưa được chứng minh trên topology | Tech Lead / Security / QA / Ops |
| RV-004 | P0 | Chưa có căn cứ mở nhận xét theo điểm/nhãn | Psychometric Lead / Research / Content |
| RV-005 | P1 | MetricEstimate thiếu kiểm miền theo đơn vị | API / Data / QA |
| RV-006 | P1 | Bốn snapshot ref null vẫn cho local pair allowed | Security / Backend / QA |
| RV-007 | P2 | Giá trị hiển thị và precision chưa khóa cùng nghĩa | API / Frontend / QA |
| RV-008 | P1 | OpenAPI chưa qua validator độc lập đầy đủ | API Architect / QA |
| RV-009 | P1 | Mức giữa và bối cảnh trả lời chưa đủ rõ | Psychometric / UX / Content |
| RV-010 | P1 | Câu hỏi lẫn quyền hạn/năng lực với xu hướng | Psychometric / Research |
| RV-011 | P1 | Missing policy có thể làm giảm kết quả đủ miền | Psychometric / UX / Data |
| RV-012 | P1 | 44/72 thẻ dùng cả bảy context | Content / UX / QA |
| RV-013 | P1 | Private actions bị phụ thuộc assessment không cần thiết | Product / BA / Backend / UX |
| RV-014 | P1 | Chưa kiểm ba tác vụ thực với người dùng mục tiêu | UX / Product / QA |
| RV-015 | P1 | Dễ hiện thực toàn inventory thay vì lát cắt hữu dụng | Tech Lead / Product |
| RV-016 | P1 | Nhiều biểu diễn cùng quy tắc thiếu nguồn sinh duy nhất | Tech / API / QA |
| RV-017 | P1 | Nhiều kiểm tra hình thức hơn kiểm tra phản ví dụ độc lập | QA / Reviewer độc lập |
| RV-018 | P2 | 50 liên kết hỏng ở README lịch sử | Documentation / Tooling |
| RV-019 | P2 | Boilerplate và lịch sử làm context bị loãng | BA / Tech Writer / Tech |
| RV-020 | P1 | Schema draft không phải schema có thẩm quyền runtime | Security / API / Release |
| RV-021 | P1 | 290 quyết định chưa được phân nhóm để chốt scope đầu | Sponsor / Product / Tech / Domain owners |
| RV-022 | P2 | AI, HRIS và analytics rộng hơn nhu cầu đã chứng minh | Product / Tech / Finance / Privacy |
| RV-023 | P1 | Bốn điểm liên tục chưa tự tạo 12 kiểu hợp lệ | Psychometric / Product |
| RV-024 | P1 | Nội dung mới soạn chưa được thẩm định nghĩa hoặc quyền | Content / IP-Legal / Psychometric khi cần |
| RV-025 | P2 | Nhóm nhỏ và UNSURE cần cách báo cáo minh bạch | Analytics / Product / Privacy |
| RV-026 | P0 | Xóa và chống hồi sinh dữ liệu chưa diễn tập thực | Ops / Security / Privacy / QA |
| RV-027 | P1 | Lệnh sản phẩm chưa bind và agent chưa chạy task thật | Tech Lead / QA |
| RV-028 | P1 | Hướng tự xây hoặc cấp phép assessment cần quyết định thực | Product / Psychometric / Legal / Finance |

## RV-001 — Chưa có một baseline thực thi đã hợp nhất

**Mức:** P0. **Loại:** `BASELINE_GAP`. **Phạm vi:** Trước build phần có mâu thuẫn; trước mọi scope người thật.

**Bằng chứng:** DOC21 vẫn giữ baseline ứng viên R20-00, approved_baseline_ref/stack_decision_ref null; bảy CR nền được liệt kê nhưng chưa hợp nhất vào hợp đồng đích.

**Tác động:** Agent có thể chọn sai giữa nguồn gốc và refinement mới, hoặc tiếp tục tạo kế hoạch thay vì xây phần dùng được.

**Đề xuất:** Tạo baseline v0.2 theo scope đầu, có diff và trạng thái ứng viên/được duyệt tách biệt; hợp nhất các CR tác động hành vi, không cần đóng mọi nhánh optional.

**Nghiệm thu lại:** Một behavior chỉ có một contract có hiệu lực; policy/API/test đồng nghĩa; reviewer xác nhận scope phù hợp.

**Người chịu trách nhiệm đề xuất:** Product Owner / BA / Tech / Privacy.

**Nguồn trong corpus gốc:**
- `DOC-21_BASELINE_AUTHORITY.md`; dòng khớp: 39. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_BASELINE_CANDIDATE.json`; dòng khớp: 8. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-002 — Quyền dữ liệu và offboarding chưa thành hợp đồng đồng bộ

**Mức:** P0. **Loại:** `SCOPE_LEGAL_GAP`. **Phạm vi:** Mọi dữ liệu nhân viên thật.

**Bằng chứng:** CR14-01/02 còn yêu cầu hòa giải xử lý dữ liệu sau nghỉ việc, request kinds và clocks. DOC20/21 thừa nhận các thay đổi này chưa áp vào nguồn.

**Tác động:** Chỉ khóa tài khoản hoặc dùng TTL chung có thể không thực hiện đầy đủ phương án quyền dữ liệu được yêu cầu.

**Đề xuất:** Chốt dataflow, người phụ trách, loại yêu cầu, mốc và ngoại lệ theo review pháp lý; cập nhật mới API/data/tests và kế hoạch xóa từng store.

**Nghiệm thu lại:** Case ngoài phiên được xử lý đúng scope; offboard deny và xóa/giữ có căn cứ; bằng chứng store-by-store.

**Người chịu trách nhiệm đề xuất:** Privacy / Legal / HR / Tech.

**Nguồn trong corpus gốc:**
- `DOC-20_BASELINE_RECONCILIATION.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-14_RETENTION_DELETION_RESTORE.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-003 — Mốc thu hồi–cấp đầu ra chưa được chứng minh trên topology

**Mức:** P0. **Loại:** `ARCHITECTURE_EVIDENCE_GAP`. **Phạm vi:** Các response hoặc egress có dữ liệu được bảo vệ.

**Bằng chứng:** DOC14 nêu hai lần check không loại được khoảng race; DOC17 vẫn cần authority/egress binding và observer.

**Tác động:** Có thể thực hiện sai cam kết nếu coi epoch field hoặc event xóa cache là hàng rào nguyên tử.

**Đề xuất:** Thực hiện spike trên stack chọn: xác định mốc quyết định/handoff; thử lịch reader/writer bằng barrier và quan sát bytes. Nếu topology không đạt, sửa thiết kế có review, không đổi nghĩa âm thầm.

**Nghiệm thu lại:** Các lịch revoke trước request, sau compute trước handoff, và giữa stream có outcome/giới hạn quan sát được; không hứa thu hồi bytes đã ra ngoài.

**Người chịu trách nhiệm đề xuất:** Tech Lead / Security / QA / Ops.

**Nguồn trong corpus gốc:**
- `DOC-14_REVOCATION_CONSISTENCY.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-17_MIGRATION_JOBS_CONSISTENCY.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-004 — Chưa có căn cứ mở nhận xét theo điểm/nhãn

**Mức:** P0. **Loại:** `SCIENTIFIC_EVIDENCE_GAP`. **Phạm vi:** Assessment người thật và các claim phụ thuộc theo stage.

**Bằng chứng:** Bank là candidate; scorer không tạo classification/norm/uncertainty; protocol tốt nhưng chưa có dữ liệu/thẩm định thực địa.

**Tác động:** Giao diện hoặc marketing có thể tạo ấn tượng công cụ đã biết tính cách nếu bật tính năng sớm.

**Đề xuất:** Giữ no-score/no-label cho bản tự chọn; khóa từng claim theo evidence. Nghiên cứu độc lập với build kỹ thuật, cho phép kết luận không phân loại hoặc thay mô hình.

**Nghiệm thu lại:** Review exact form/context/key; scope nghiên cứu được phép; chỉ nội dung đủ bằng chứng và quyền mới được cấp.

**Người chịu trách nhiệm đề xuất:** Psychometric Lead / Research / Content.

**Nguồn trong corpus gốc:**
- `DOC-09_CLASSIFICATION_EVIDENCE.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-10_PSYCHOMETRIC_VALIDATION_PROTOCOL.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-005 — MetricEstimate thiếu kiểm miền theo đơn vị

**Mức:** P1. **Loại:** `REPRODUCED_LOCAL_VALIDATION_GAP`. **Phạm vi:** Trước tái sử dụng helper/contract trong ứng dụng.

**Bằng chứng:** PR01–PR04: COUNT=-3, COUNT=2.5, RAW_MEAN_1_5=7, LINEAR_0_100=107 được helper chấp nhận. COUNT phân số cần định nghĩa riêng nếu chủ đích là weighted estimate.

**Tác động:** Dữ liệu sai đơn vị có thể đi tiếp tới evidence hoặc dashboard nếu adapter thật cũng thiếu kiểm.

**Đề xuất:** Phân nhánh schema/validator theo unit; count quan sát là số nguyên không âm; weighted/noisy estimate có unit riêng. Tách diagnostic bất thường khỏi estimate có thể dùng diễn giải.

**Nghiệm thu lại:** Từ chối raw mean 7, score=107, negative count; giữ COUNT=0 hợp lệ. Negative tests chạy schema lẫn service.

**Người chịu trách nhiệm đề xuất:** API / Data / QA.

**Nguồn trong corpus gốc:**
- `contract_doc13.py`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-13_DTO_SCHEMAS.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-006 — Bốn snapshot ref null vẫn cho local pair allowed

**Mức:** P1. **Loại:** `REPRODUCED_LOCAL_PRECONDITION_GAP`. **Phạm vi:** Chỉ helper mô phỏng; cần chặn trước port authorization.

**Bằng chứng:** PR06 gọi evaluate với selected/granted của A/B đều null: allowed=true, runtime_authorization=false. Hàm chỉ so bằng nhau, chưa xác minh sự tồn tại nguồn.

**Tác động:** Phản ví dụ làm rõ thiếu precondition; không chứng minh có lỗ hổng đang chạy vì chưa có server và authoritative resolver.

**Đề xuất:** Đặt typed non-null references; xác minh exact result/grant/owner/generation/method và quyền ở service trước so bằng nhau. Helper hoặc adapter phải từ chối input không đạt precondition.

**Nghiệm thu lại:** Null, empty, unknown, wrong-owner và wrong-generation đều deny; thêm case compatible scope và current state.

**Người chịu trách nhiệm đề xuất:** Security / Backend / QA.

**Nguồn trong corpus gốc:**
- `policy_doc14_reference.py`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-14_AUTHORIZATION_MATRIX.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-007 — Giá trị hiển thị và precision chưa khóa cùng nghĩa

**Mức:** P2. **Loại:** `REPRODUCED_LOCAL_CONTRACT_AMBIGUITY`. **Phạm vi:** Self result transport.

**Bằng chứng:** PR05: value=75.04 và text=75,0 cùng được nhận dù hợp đồng chấm nguồn định một chữ số thập phân ở presentation.

**Tác động:** Consumer có thể tính lại hoặc hiển thị khác; chưa có bằng chứng sai số học core.

**Đề xuất:** Chọn value là display-rounded hoặc exact (tách field riêng); kiểm text và decimal_places cùng contract. Không double-rounding.

**Nghiệm thu lại:** Test rõ 75.04/75.0, biên làm tròn và serialization qua ngôn ngữ đích.

**Người chịu trách nhiệm đề xuất:** API / Frontend / QA.

**Nguồn trong corpus gốc:**
- `contract_doc13.py`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-09_SCORING_CONTRACTS.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-008 — OpenAPI chưa qua validator độc lập đầy đủ

**Mức:** P1. **Loại:** `TOOLCHAIN_GAP`. **Phạm vi:** Contract toolchain trước integration.

**Bằng chứng:** Kiểm tĩnh review mới resolve 3.034 $ref và 123 operations không lỗi cấu trúc được kiểm; cài validator độc lập không thành công do DNS. Không đồng nghĩa OpenAPI đã đầy đủ conformant.

**Tác động:** Lỗi chuẩn hoặc khác biệt dialect có thể chỉ lộ lúc codegen/framework xử lý.

**Đề xuất:** Cài và pin validator trong môi trường có mạng được phép; chạy trên baseline mới và source để ghi chênh lệch; bổ sung tests request/response với service thật.

**Nghiệm thu lại:** Report tool/version/errors; không đóng GAP16-03 chỉ bằng checker tự viết.

**Người chịu trách nhiệm đề xuất:** API Architect / QA.

**Nguồn trong corpus gốc:**
- `DOC-21_VALIDATION_REPORT.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-009 — Mức giữa và bối cảnh trả lời chưa đủ rõ

**Mức:** P1. **Loại:** `QUESTION_CONTENT_GAP`. **Phạm vi:** Trước pilot câu hỏi.

**Bằng chứng:** Mức 3 là Tùy tình huống / ở mức trung bình; context USUAL_WORK chưa có reference_period/novice_guidance được duyệt.

**Tác động:** Cùng đáp án3 có thể mang nhiều nghĩa; người thiếu cơ hội trải nghiệm dễ chọn giữa như phương án né câu hỏi.

**Đề xuất:** Thử cách diễn đạt thang và hướng dẫn bằng phỏng vấn nhận thức; chọn revision mới. Nếu cần N/A, thiết kế trạng thái riêng với policy, không dùng số 0 hoặc 3.

**Nghiệm thu lại:** Người thử mô tả được cùng nhiệm vụ trả lời; bảo toàn nguồn cũ; không sửa label tại runtime.

**Người chịu trách nhiệm đề xuất:** Psychometric / UX / Content.

**Nguồn trong corpus gốc:**
- `DOC-08_QUESTION_BANK_METADATA.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-08_QUESTION_BANK_METADATA.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-010 — Câu hỏi lẫn quyền hạn/năng lực với xu hướng

**Mức:** P1. **Loại:** `QUESTION_CONSTRUCT_GAP`. **Phạm vi:** Trước diễn giải điểm.

**Bằng chứng:** L-D07 reverse D hỏi về phạm vi quyết định; L-C04 so khả năng thấy lỗi với người khác; L-S01 hỏi có thể duy trì nhịp. DOC08 đã ghi các concerns liên quan.

**Tác động:** Điểm có thể phản ánh nghề, thẩm quyền, self-enhancement hoặc cơ hội thực hiện; đây là giả thuyết nhiễu chưa có bằng chứng thống kê kết luận.

**Đề xuất:** Rewrite thành hành vi/sở thích trong điều kiện rõ; expert review polarity; phân tích role dependence/cross-loading sau thu dữ liệu có quyền.

**Nghiệm thu lại:** Mỗi item rủi ro có disposition giữ/sửa/loại và bằng chứng; không giữ câu nghịch chỉ để đủ quota.

**Người chịu trách nhiệm đề xuất:** Psychometric / Research.

**Nguồn trong corpus gốc:**
- `DOC-08_SOURCE_INVENTORY.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-08_SOURCE_INVENTORY.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-011 — Missing policy có thể làm giảm kết quả đủ miền

**Mức:** P1. **Loại:** `DESIGN_TRADEOFF`. **Phạm vi:** Assessment UX và chất lượng mẫu.

**Bằng chứng:** REQUIRE_ALL_ITEMS mỗi miền; minh họa giả định độc lập missing 2% cho .98^10=81,7% đủ miền, .98^40=44,6% đủ cả bài. Không phải tỷ lệ Vaga.

**Tác động:** Quy tắc bảo thủ có thể gây nhiều kết quả giới hạn; người bị thiếu dữ liệu không nhất thiết thiếu hợp tác.

**Đề xuất:** Đánh giá chính sách cần đủ 100% câu và các phương án chuyên gia đề xuất bằng dữ liệu nghiên cứu; báo thiếu dữ liệu và thiên lệch; không tự điền đáp án hoặc hạ ngưỡng chưa review.

**Nghiệm thu lại:** Báo coverage, sai số và khác biệt nhóm theo từng phương án; quyết định được version hóa.

**Người chịu trách nhiệm đề xuất:** Psychometric / UX / Data.

**Nguồn trong corpus gốc:**
- `DOC-09_SCORING_CONTRACTS.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-012 — 44/72 thẻ dùng cả bảy context

**Mức:** P1. **Loại:** `CONTENT_TAGGING_GAP`. **Phạm vi:** Bộ chọn nội dung theo tình huống.

**Bằng chứng:** Đếm trong ngân hàng có 44 thẻ gắn đủ bảy contexts; CB11-SELF-D-03 nói về giao việc/chốt phương án nhưng cũng cho phép context recognition.

**Tác động:** Giảm tính chọn lọc; không chứng minh mọi output đang sai, nhưng chưa đủ đảm bảo cá nhân hóa theo nhiệm vụ.

**Đề xuất:** Giới hạn context chính/phụ và điều kiện loại trừ theo thẻ; viết kiểm thử không nên chọn trong một số tình huống; chấp nhận không có thẻ thay vì ép đủ ba.

**Nghiệm thu lại:** Mỗi thẻ có context rationale và ít nhất một counterexample; review đầu ra theo tình huống, không chỉ theo D/I/S/C.

**Người chịu trách nhiệm đề xuất:** Content / UX / QA.

**Nguồn trong corpus gốc:**
- `DOC-11_CONTENT_BANK.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-013 — Private actions bị phụ thuộc assessment không cần thiết

**Mức:** P1. **Loại:** `PRODUCT_OPPORTUNITY`. **Phạm vi:** MVP hai luồng giá trị.

**Bằng chứng:** WP20-019 phụ thuộc WP017; ActionInput hiện có title/trigger/behavior/success_signal/date/timezone và không yêu cầu result.

**Tác động:** Giá trị phát triển cá nhân bị trì hoãn vì chờ khoa học dù hành động tự chọn không cần suy DISC.

**Đề xuất:** Tạo variant self_chosen_actions_no_assessment; cho người dùng tự chọn mục tiêu/thử hành vi/ghi nhận riêng; không suy tính cách, không tự share.

**Nghiệm thu lại:** Người chưa có bài đánh giá vẫn tạo/sửa/xóa hành động; owner-only; xóa/offboard/restore đúng scope.

**Người chịu trách nhiệm đề xuất:** Product / BA / Backend / UX.

**Nguồn trong corpus gốc:**
- `DOC-20_WORK_PACKAGES_DEPENDENCIES.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-13_DTO_SCHEMAS.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-014 — Chưa kiểm ba tác vụ thực với người dùng mục tiêu

**Mức:** P1. **Loại:** `USER_EVIDENCE_GAP`. **Phạm vi:** Phê duyệt UX theo scope.

**Bằng chứng:** Có prototype atlas và kiểm trình duyệt trước; UAT/nghiên cứu thực giữ NOT_RUN trong tài liệu.

**Tác động:** Ngôn ngữ hoặc số bước có thể đúng về mặt hợp đồng nhưng gây bỏ cuộc.

**Đề xuất:** Tạo bản thử không có bảng điều khiển fixture trong chế độ người dùng. Thử soạn manual, đọc hướng dẫn nhanh và tự chọn hành động bằng hồ sơ giả, theo protocol phù hợp.

**Nghiệm thu lại:** Ghi thời gian, lỗi, trợ giúp cần và vấn đề quan sát; không suy khả năng tiếp cận toàn bộ từ ảnh chụp.

**Người chịu trách nhiệm đề xuất:** UX / Product / QA.

**Nguồn trong corpus gốc:**
- `DOC-07_PROTOTYPE_AND_REVIEW.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-16_ENVIRONMENTS_AND_TEST_DATA.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-015 — Dễ hiện thực toàn inventory thay vì lát cắt hữu dụng

**Mức:** P1. **Loại:** `SCOPE_COMPLEXITY`. **Phạm vi:** Chi phí và thời gian build.

**Bằng chứng:** 123 API, 65 thực thể và 43 mẫu UI là phạm vi thiết kế tổng; chưa phải những phần bắt buộc của bản đầu.

**Tác động:** Có thể dành phần lớn công sức dựng framework quản trị trước khi kiểm được manual và hành động.

**Đề xuất:** Chọn operation/entities theo end-to-end slice, dùng modular monolith đề xuất; giữ invariants thiết yếu và hoãn extension bằng OFF enforcement.

**Nghiệm thu lại:** Danh mục IN/OUT của scope; không có đường backend phụ ngoài phạm vi; không tính % hoàn tất theo số bảng/endpoint.

**Người chịu trách nhiệm đề xuất:** Tech Lead / Product.

**Nguồn trong corpus gốc:**
- `DOC-20_CAPABILITY_RELEASE_MATRIX.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-12_DATA_MODEL.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-016 — Nhiều biểu diễn cùng quy tắc thiếu nguồn sinh duy nhất

**Mức:** P1. **Loại:** `CONTRACT_DRIFT_RISK`. **Phạm vi:** Duy trì schema/API/validation/policy.

**Bằng chứng:** Các module có Markdown, JSON Schema, registry, helper và fixture riêng. PR01–PR05 cho thấy bảng ngữ nghĩa và checker có thể chưa khớp nhau.

**Tác động:** Mỗi thay đổi có thể cần sửa nhiều nơi; kiểm số ID không phát hiện mọi drift ý nghĩa.

**Đề xuất:** Chọn hợp đồng runtime chuẩn để sinh tài liệu, kiểu client và validation cơ bản. Giữ oracle độc lập, ghi rõ các kiểm tra ngữ nghĩa; không sinh expected từ chính hàm cần kiểm.

**Nghiệm thu lại:** Thay một field cập nhật projections/tests bị ảnh hưởng có diff; CI chặn drift của file được sinh.

**Người chịu trách nhiệm đề xuất:** Tech / API / QA.

**Nguồn trong corpus gốc:**
- `DOC-13_DATA_CONTRACTS.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_CONTEXT_CONTRACT_MAP.md`; dòng khớp: 2, 3, 14. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-017 — Nhiều kiểm tra hình thức hơn kiểm tra phản ví dụ độc lập

**Mức:** P1. **Loại:** `QUALITY_COVERAGE_GAP`. **Phạm vi:** QA trước tái sử dụng helpers.

**Bằng chứng:** Checker cuối đạt 114 kiểm tra nhưng review bổ sung có sáu phản ví dụ cần xử lý hoặc làm rõ. Một số bước setup chung lặp 375 lần trong catalog.

**Tác động:** Số PASS có thể tạo cảm giác bao phủ lớn hơn thực tế nếu được đọc không đúng phạm vi.

**Đề xuất:** Giữ các kiểm hiện có; thêm kiểm giá trị đúng/sai theo đơn vị, mutation/property tests, các trường hợp từ chối quyền và bộ quan sát độc lập. Chọn assertions theo rủi ro, không theo quota.

**Nghiệm thu lại:** Thay đổi làm hỏng guard phải khiến test thất bại. Bằng chứng ở đúng tầng; không tăng số test chỉ bằng cách chia vòng lặp.

**Người chịu trách nhiệm đề xuất:** QA / Reviewer độc lập.

**Nguồn trong corpus gốc:**
- `DOC-16_ACCEPTANCE_TEST_CATALOG.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_VALIDATION_REPORT.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-018 — 50 liên kết hỏng ở README lịch sử

**Mức:** P2. **Loại:** `CONFIRMED_DOCUMENT_LINK_DEFECT`. **Phạm vi:** Khả năng tra cứu archive.

**Bằng chứng:** Kiểm 12.957 liên kết Markdown cục bộ, thấy 28 liên kết hỏng trong history/batch09/README.md và 22 trong history/batch08/README.md. Điểm bắt đầu hiện hành không bị phát hiện lỗi này.

**Tác động:** Người truy lịch sử dễ đi vào tài liệu không còn ở đường dẫn cũ.

**Đề xuất:** Không sửa bản nguồn bất biến. Tạo lớp điều hướng hoặc bản tra cứu đường dẫn cho archive, hoặc bản sửa link được đánh dấu generated; kiểm liên kết toàn phạm vi được cung cấp.

**Nghiệm thu lại:** Các liên kết của bản current và archive view mở đúng đích; file gốc vẫn giữ nguyên hash.

**Người chịu trách nhiệm đề xuất:** Documentation / Tooling.

**Nguồn trong corpus gốc:**
- `history/batch09/README.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `history/batch08/README.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-019 — Boilerplate và lịch sử làm context bị loãng

**Mức:** P2. **Loại:** `MAINTAINABILITY_RISK`. **Phạm vi:** Đọc tài liệu và sử dụng agent.

**Bằng chứng:** Trong 33.700 dòng Markdown dài hơn 100 ký tự, có 9.414 lượt lặp nguyên văn. Số này gồm bảng dùng chung và tài liệu lịch sử, nên không thể gọi 27,9% nội dung là thừa.

**Tác động:** Người đọc cần lọc nhiều chữ chung để tìm quyết định của thao tác hiện tại.

**Đề xuất:** Dùng tham chiếu chính sách chung và các bản chi tiết được sinh có kiểm soát. Agent nhận hợp đồng active, task và các kiểm thử ngoại lệ; không tự nạp archive.

**Nghiệm thu lại:** Đánh giá khả năng tìm nguồn và ngoại lệ theo task; không cắt bớt yêu cầu chỉ để giảm dung lượng.

**Người chịu trách nhiệm đề xuất:** BA / Tech Writer / Tech.

**Nguồn trong corpus gốc:**
- `DOC-16_ACCEPTANCE_TEST_CATALOG.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_CONTEXT_SOURCES.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-020 — Schema draft không phải schema có thẩm quyền runtime

**Mức:** P1. **Loại:** `DRAFT_RUNTIME_BOUNDARY`. **Phạm vi:** Importer, release và cấu hình.

**Bằng chứng:** Nhiều gói tác giả cố ý khóa false/NOT_APPROVED. Helper mô phỏng nhận các giả định dạng boolean; tài liệu đã nói không dùng những giả định này làm authorization.

**Tác động:** Developer có thể bỏ các hằng khóa để mở hệ thống mà không xây workflow có nguồn thẩm quyền.

**Đề xuất:** Tách đầu vào tác giả, đối tượng do dịch vụ có thẩm quyền quản lý và projection. Trường authority do service ghi; kiểm duyệt giả phải bị chặn theo danh tính thực.

**Nghiệm thu lại:** Upload tự khai APPROVED không cấp quyền. Reviewer phải đúng target, scope và hash; draft không được đưa vào production như tài sản đã duyệt.

**Người chịu trách nhiệm đề xuất:** Security / API / Release.

**Nguồn trong corpus gốc:**
- `DOC-08_QUESTION_BANK_METADATA.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-11_CONTENT_CONTRACTS.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-021 — 290 quyết định chưa được phân nhóm để chốt scope đầu

**Mức:** P1. **Loại:** `DECISION_GOVERNANCE`. **Phạm vi:** Khởi động build.

**Bằng chứng:** Đã có mã DEC-001 đến DEC-290; trạng thái trong gói bàn giao vẫn là đề xuất. Không cần đóng hết, nhưng cần chọn những quyết định ảnh hưởng scope đầu.

**Tác động:** Phê duyệt trở thành điểm nghẽn nếu mọi lựa chọn đều bị coi cùng mức cấp thiết.

**Đề xuất:** Chia thành quyết định kỹ thuật có thể đảo ngược, phạm vi sản phẩm, authority nhạy cảm và khoa học. Bổ nhiệm owner thật; ưu tiên tám quyết định scope đầu, hoãn nhánh khác với điều kiện mở lại.

**Nghiệm thu lại:** Không có blocker vô chủ. Scope build có baseline được duyệt hoặc giả định synthetic rõ; không ký giả để vượt gate.

**Người chịu trách nhiệm đề xuất:** Sponsor / Product / Tech / Domain owners.

**Nguồn trong corpus gốc:**
- `DOC-21_DECISIONS_AND_REFERENCES.md`; dòng khớp: 141, 142. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_BASELINE_AUTHORITY.md`; dòng khớp: 20. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-022 — AI, HRIS và analytics rộng hơn nhu cầu đã chứng minh

**Mức:** P2. **Loại:** `OPTIONAL_INVESTMENT`. **Phạm vi:** Các nhánh tùy chọn.

**Bằng chứng:** AI, tích hợp và analytics đều có đặc tả sâu, nhưng nhu cầu, nhà cung cấp và năng lực chưa được chọn; cấu hình đang tắt.

**Tác động:** Xây đồng thời làm loãng MVP và tăng rủi ro gửi/lưu dữ liệu ngoài ứng dụng.

**Đề xuất:** Giữ tắt; ưu tiên quy tắc, hướng dẫn nguyên văn hoặc chung, cùng quy trình tài khoản an toàn tối thiểu. Chỉ chọn nhánh mới khi giá trị tăng thêm được đối chiếu với chi phí và rủi ro.

**Nghiệm thu lại:** Có quyết định không xây hoặc mục tiêu đánh giá cụ thể; không biến nhánh tùy chọn thành điều kiện phát hành manual.

**Người chịu trách nhiệm đề xuất:** Product / Tech / Finance / Privacy.

**Nguồn trong corpus gốc:**
- `DOC-15_CONFIG_PROPOSAL.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-18_CONFIG_PROPOSAL.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-19_CONFIG_PROPOSAL.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-023 — Bốn điểm liên tục chưa tự tạo 12 kiểu hợp lệ

**Mức:** P1. **Loại:** `SCIENCE_MODEL_DECISION`. **Phạm vi:** Classifier/norm/so sánh.

**Bằng chứng:** DOC09 đã phân biệt các thang có thể khác mức dễ đồng ý và chưa chứng minh một đơn vị tâm lý chung. Taxonomy 12 nhãn chỉ là dự kiến.

**Tác động:** Lấy hai điểm raw cao nhất hoặc ngưỡng cứng có thể gán nhãn tùy tiện. Chuẩn hóa không tự chứng minh cấu trúc vòng tròn.

**Đề xuất:** Giữ điểm mô tả theo phạm vi; kiểm mô hình bốn nhân tố tương quan và giả thuyết trục/vòng khi phù hợp. Chỉ mở taxonomy vì mục đích cần thiết và bằng chứng hỗ trợ.

**Nghiệm thu lại:** Không tự gán nhãn từ max. Classifier cần khả năng không phân loại, kiểm độ ổn định và giới hạn được duyệt.

**Người chịu trách nhiệm đề xuất:** Psychometric / Product.

**Nguồn trong corpus gốc:**
- `DOC-09_CLASSIFICATION_EVIDENCE.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-09_CLASSIFICATION_EVIDENCE.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-024 — Nội dung mới soạn chưa được thẩm định nghĩa hoặc quyền

**Mức:** P1. **Loại:** `CONTENT_IP_REVIEW_GAP`. **Phạm vi:** Trước serving người thật.

**Bằng chứng:** Ngân hàng câu hỏi và nội dung đều giữ trạng thái chưa có review thực. Lời khai mới soạn không chứng minh không giống tài sản được bảo hộ.

**Tác động:** Nội dung chưa được người chịu trách nhiệm xem xét có thể được cấp cho nhân viên quá sớm.

**Đề xuất:** Review theo revision/hash, phạm vi sử dụng, quyền tác giả và ý nghĩa. Ưu tiên tài sản của scope đầu, không cần duyệt đồng thời toàn bộ thư viện.

**Nghiệm thu lại:** Chỉ tài sản đủ review mới được chọn. Một citation vendor không thay bằng chứng quyền sử dụng hoặc tính phù hợp nội dung.

**Người chịu trách nhiệm đề xuất:** Content / IP-Legal / Psychometric khi cần.

**Nguồn trong corpus gốc:**
- `DOC-11_CONTENT_BANK.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-08_QUESTION_BANK_METADATA.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-025 — Nhóm nhỏ và UNSURE cần cách báo cáo minh bạch

**Mức:** P2. **Loại:** `ANALYTICS_INTERPRETATION_RISK`. **Phạm vi:** Analytics/khảo sát có điều kiện.

**Bằng chứng:** Ngưỡng 20 người và 5 người mỗi phía chỉ là đề xuất. Công thức YES/(YES+NO) không đưa UNSURE vào mẫu số chính.

**Tác động:** Dashboard có thể không đủ số để công bố hoặc tạo ấn tượng hữu ích cao nếu không trình bày các câu trả lời chưa chắc.

**Đề xuất:** Báo ba nhóm trả lời và tỷ lệ phản hồi. Khi nhóm không đủ điều kiện, dùng nghiên cứu tác vụ/định tính có quyền; không hạ bảo vệ chỉ để có số.

**Nghiệm thu lại:** Người xem hiểu mẫu số và phần chưa chắc. Ô bị ẩn không lộ count qua export hoặc tooltip.

**Người chịu trách nhiệm đề xuất:** Analytics / Product / Privacy.

**Nguồn trong corpus gốc:**
- `DOC-19_METRIC_DICTIONARY.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-19_CONFIG_PROPOSAL.json`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-026 — Xóa và chống hồi sinh dữ liệu chưa diễn tập thực

**Mức:** P0. **Loại:** `LIFECYCLE_EVIDENCE_GAP`. **Phạm vi:** Mọi scope có dữ liệu người thật.

**Bằng chứng:** Runbook và cơ chế ledger/restore đã được mô tả, nhưng chưa có diễn tập trên DB, object store và backup thực.

**Tác động:** Có thể xóa bản ghi chính nhưng còn payload trong bản xuất, queue, log, backup hoặc dữ liệu đã phục hồi.

**Đề xuất:** Lập bản đồ từng store với owner, lịch và căn cứ. Diễn tập xóa dữ liệu tổng hợp, phục hồi trong cách ly, áp lại deny và xác minh trước mở traffic.

**Nghiệm thu lại:** Không đọc lại dữ liệu đã xóa qua đường phục hồi ngoài phương án cho phép. Phần giữ tối thiểu có căn cứ; không gọi pseudonym/hash là ẩn danh.

**Người chịu trách nhiệm đề xuất:** Ops / Security / Privacy / QA.

**Nguồn trong corpus gốc:**
- `DOC-17_BACKUP_RESTORE.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-20_BASELINE_RECONCILIATION.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-027 — Lệnh sản phẩm chưa bind và agent chưa chạy task thật

**Mức:** P1. **Loại:** `HANDOFF_EXECUTABILITY_GAP`. **Phạm vi:** Từ chuẩn bị sang build.

**Bằng chứng:** DOC21 có 15 vị trí chờ lệnh sản phẩm, chưa có argv/cwd thực. Bộ 114 kiểm tra là helper; chưa có repository ứng dụng hay lần thực hiện Codex.

**Tác động:** Gói có thể bị hiểu là chỉ cần chạy lệnh sẽ có ứng dụng, trong khi các lệnh hiện chỉ đọc và kiểm tài liệu.

**Đề xuất:** Sau ADR, tạo repository, vòng build/test tối thiểu và một task đầu-cuối có negative cases. AGENTS thực tế nêu nguồn và lệnh đúng, không yêu cầu nạp toàn corpus.

**Nghiệm thu lại:** Checkout sạch chạy được lệnh đã ghi và kiểm một lát cắt. Output có files, commands, actual results; không gọi đó là phê duyệt production.

**Người chịu trách nhiệm đề xuất:** Tech Lead / QA.

**Nguồn trong corpus gốc:**
- `DOC-21_BOOTSTRAP_COMMANDS.md`; dòng khớp: 22, 25. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-21_VALIDATION_REPORT.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.

## RV-028 — Hướng tự xây hoặc cấp phép assessment cần quyết định thực

**Mức:** P1. **Loại:** `INVESTMENT_DECISION_GAP`. **Phạm vi:** Track đo lường.

**Bằng chứng:** WP20-015 là gói chọn hướng assessment, nhưng chưa có quyết định, quyền tích hợp hoặc nguồn lực kiểm định được xác nhận.

**Tác động:** Có thể chỉ tính chi phí code mà bỏ qua nghiên cứu, IP, bản dịch, API, vòng đời dữ liệu và vận hành.

**Đề xuất:** So ba phương án: workstyle tự chọn không điểm; DISC-inspired tự kiểm định; cấp phép instrument có quyền tích hợp. Thu báo giá/contract thực khi cân nhắc, không tự đưa giá giả.

**Nghiệm thu lại:** Quyết định có lý do, quyền sử dụng, phạm vi tuyên bố, tổng chi phí và phương án thoát. Việc lựa chọn instrument không buộc dừng manual.

**Người chịu trách nhiệm đề xuất:** Product / Psychometric / Legal / Finance.

**Nguồn trong corpus gốc:**
- `DOC-20_WORK_PACKAGES_DEPENDENCIES.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.
- `DOC-20_DECISIONS_AND_REFERENCES.md`; tham chiếu cấp file. SHA-256 đầy đủ trong `review_findings.json`.

**Trạng thái:** đề xuất còn mở, chưa áp thay đổi vào nguồn hoặc ứng dụng.
