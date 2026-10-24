# Vaga DISC — Gói review bổ sung, ngày 15/10/2026

## Đọc theo thứ tự

1. [Báo cáo review tổng thể](01_BAO_CAO_REVIEW_TONG_THE.md): kết luận, rubric, kiểm tra thực chạy, phản biện và hướng nâng cấp.
2. [Đánh giá chi tiết 22 tài liệu](02_DANH_GIA_CHI_TIET_22_TAI_LIEU.md): điểm từng DOC, phần nên giữ, vấn đề, nâng cấp và điều kiện kiểm lại.
3. [Kế hoạch nâng cấp v0.2](03_KE_HOACH_NANG_CAP_V0_2.md): chín gói công việc, phạm vi bản đầu và tiêu chí nghiệm thu.
4. [Sổ 28 phát hiện và khuyến nghị](04_SO_PHAT_HIEN_VA_KHUYEN_NGHI.md): ưu tiên, bằng chứng, tác động, người chịu trách nhiệm và kiểm tra lại.

Điểm đặc tả có trọng số: **73,5/100, làm tròn 74/100**. Điểm mức giao thẳng để lập trình ít cần quyết định bổ sung: **45/100**. Cả hai là nhận định theo rubric, không phải xác suất đúng hay tiến độ ứng dụng. Instrument Vaga chưa có bằng chứng kiểm định trong gói; không gán phần trăm độ chính xác.

Đây là review bổ sung của trợ lý trên chính corpus đã bàn giao, có các kiểm đối chiếu và phản ví dụ mới. Không phải chứng nhận hay thẩm định bởi một nhóm chuyên gia độc lập bên ngoài. “Oracle độc lập” trong kiểm số học chỉ nghĩa phép tính kỳ vọng không được sinh bằng chính hàm chấm đang kiểm.

## Nguồn và giới hạn

Nguồn khóa: `Vaga_DISC_Tai_lieu_Dot_19_DOC21_v0.1.0.zip`, thư mục giải nén `vaga_disc_docs_dot_19`. Gói nguồn có 519 tệp. Gói review **không thay thế hoặc chứa lại toàn bộ source ZIP**; các đường dẫn nguồn trong báo cáo/sổ phát hiện là đường dẫn bên trong ZIP gốc đã được giao ở đợt trước.

Đã kiểm toàn vẹn/cấu trúc toàn gói, rà 22 nhóm tài liệu lõi và đọc sâu các phần có rủi ro. Không tuyên bố đã kiểm độc lập từng dòng của 519 tệp, mọi URL, mọi điều luật hoặc mọi test design. Chưa có ứng dụng để pentest, thử database/SSO/egress, hay nghiên cứu trên nhân viên.

Không sửa tệp gốc, không triển khai hệ thống, không thay quyền hoặc gọi nhà cung cấp. Các P0 chặn phạm vi liên quan trước build có mâu thuẫn hoặc trước dữ liệu thật, không có nghĩa đang tồn tại lỗ hổng production.

## Bằng chứng có cấu trúc

| File | Phạm vi |
|---|---|
| [review_scores.json](review_scores.json) | Rubric, công thức và 22 đánh giá |
| [review_findings.json](review_findings.json) | 28 phát hiện với source path, hash và locator |
| [source_inventory.json](source_inventory.json) | Danh mục 519 file nguồn đã khóa |
| [structural_audit.json](structural_audit.json) | Kiểm manifest, loại file và lặp nguyên văn |
| [DOC21_independent_rerun.json](DOC21_independent_rerun.json) | Checker nguồn chạy lại, 114/114 |
| [independent_arithmetic_tests.json](independent_arithmetic_tests.json) | 60 bộ đáp án tổng hợp, đối chiếu số học mới |
| [adversarial_probe_results.json](adversarial_probe_results.json) | Sáu phản ví dụ và hai đối chứng |
| [openapi_static_audit.json](openapi_static_audit.json) | Kiểm tham chiếu, path parameters và security references; không full OAS validator |
| [corpus_links_and_json_audit.json](corpus_links_and_json_audit.json) | 242 JSON và 12.957 local links; 50 link lịch sử hỏng |
| [content_and_product_audit.json](content_and_product_audit.json) | Độ phủ context nội dung và cấu trúc ActionInput |
| [reproduction_verification.json](reproduction_verification.json) | Kết quả thực chạy script tái hiện: 8/8 quan sát, 60/60 số học |

## Chạy lại các kiểm cục bộ

Dùng Python 3.11+ và `jsonschema` đã cài. Script không tự cài thư viện hoặc truy cập mạng. Cần giữ nguyên source giải nén từ ZIP đã review.

```bash
python reproduce_review.py --source "/duong-dan/vaga_disc_docs_dot_19" --output "/thu-muc-ket-qua/lan-kiem-moi.json"
```

Trên Windows, thay đường dẫn bằng vị trí giải nén thực tế. `--output` phải là tệp mới, nằm ngoài thư mục source và ngoài gói review; thư mục cha phải có sẵn. Script kiểm hash trước khi import các helper đã được rà và kiểm lại hash sau khi chạy. Không chạy với source không tin cậy hoặc source đã bị đổi mà chưa được review.

Kết quả mong đợi với đúng source: tái hiện tám quan sát helper, gồm những trường hợp thiếu validation, và đối chiếu đúng 60 phép tính. **Tái hiện một lỗi không phải sửa lỗi.** Script không chạy toàn bộ checker lịch sử, không kiểm authorization runtime và không kiểm định tâm lý.

## Điểm tiếp tục

Ưu tiên `UPG-V02-BASELINE-001` trong kế hoạch nâng cấp: phạm vi manual + hành động tự chọn, hợp nhất các hợp đồng nền, sau đó sửa các phản ví dụ và dựng một lát cắt synthetic. Không tạo DOC22 chỉ để mô tả lại khoảng trống; không biến khuyến nghị review thành phê duyệt dữ liệu thật.
