import json,shutil
from pathlib import Path
exec(open('/mnt/data/_doc21_build/write_docs.py',encoding='utf-8').read().split("md('DOC-21_CODEX_BUILD_PACK.md'")[0])
r=json.load(open('/mnt/data/_doc21_build/check_pre_final.json'))
shutil.copyfile('/mnt/data/_doc21_build/check_pre_final.json',P/'DOC-21_CHECK_RESULTS.json')
rows='\n'.join(f"| {k} | {v['total']} | {v['passed']} | {v['failed']} |" for k,v in r['groups'].items())
body=f'''
## 1. Kết luận trong phạm vi kiểm

Đã thực chạy **{r['passed']}/{r['total']} phép kiểm cục bộ đạt** trên gói handoff và helper. Phân loại: 14 kiểm nguồn/tài liệu/truy vết, 30 kiểm hợp đồng và dữ liệu giả mạo, 58 tình huống fixture, 12 kiểm CLI. Đây không phải số test ứng dụng đã hoàn thành.

Nguồn chi tiết: [DOC-21_CHECK_RESULTS.json](DOC-21_CHECK_RESULTS.json). Checker [verify_doc21.py](verify_doc21.py) không gọi Codex, không kết nối mạng, không cài gói và không chạy các checker nguồn. Mọi nhánh authorization thật/production giữ false hoặc chưa thực hiện.

## 2. Môi trường và cách tái hiện

Lần kiểm dùng Python **{r['environment']['python'].split()[0]}**, jsonschema **{r['environment']['jsonschema']}**, nền tảng **{r['environment']['platform']}**. Thời điểm UTC của từng lần chạy nằm CHECK_RESULTS. Có thể chạy lại bằng `python verify_doc21.py` để in kết quả hoặc dùng `--output` trỏ tới tệp mới bên ngoài gói.

Không khẳng định đã kiểm trên Windows/macOS, CLI Codex, runner CI, trình duyệt hay hệ điều hành triển khai. File TOML mẫu chỉ được parse cục bộ và đối chiếu các giá trị được đề xuất; chưa có phiên Codex đọc cấu hình đó.

## 3. Kết quả theo nhóm

| Nhóm | Đã chạy | Đạt | Không đạt |
|---|---:|---:|---:|
{rows}

Một kiểm nguồn đối chiếu 475 file; một kiểm context phân giải 384 selector; những con số là quy mô dữ liệu trong phép kiểm, **không cộng thành hàng trăm test runtime**. Toàn bộ 14 recipe R20 được đối chiếu exact required variant; R20-00 trả ba task khởi đầu. Không gọi đó là DAG đã được thực thi.

## 4. Các hiện vật được kiểm

**Nguồn:** 475 tệp từ ZIP đợt18 còn đúng size/SHA-256; README và manifest lịch sử đổi tên nhưng giữ nội dung. Corpus không được sửa để làm expected dễ đạt.

**Hồ sơ nhiệm vụ:** 50 dossier khớp 50 variant của 33 WP20; nguồn story đầu mối, story hỗ trợ, AC pool và dependency được giữ đúng. Mỗi task có nguồn chuyên môn; mỗi source trỏ đúng JSON pointer hoặc khoảng dòng đã khóa hash.

**Truy vết:** 75 story, 75 FR và 375 AC nguồn còn nguyên liên kết. AC pool theo WP không là applicability đã được phê duyệt cho mọi variant, và không tạo runtime evidence.

**Chỉ dẫn agent:** một AGENTS.md tại root và bốn template riêng; root { (P/'AGENTS.md').stat().st_size } bytes. Đã đo dung lượng, không chứng minh Codex đã nạp đúng chuỗi chỉ dẫn. Mẫu cấu hình không có provider/model/secret và không được kích hoạt.

**Hợp đồng:** năm định nghĩa chính trong JSON Schema, cùng schema kết quả cuối tối giản. Mọi trường runtime chưa có vẫn null, approvals rỗng, task chưa dispatch. Schema không kiểm tính thật của một chữ ký/evidence.

**CLI:** đã gọi chính Python helper cho đọc task, recipe, excerpt, hash và gate; kiểm ID không tồn tại, budget sai/quá nhỏ, tùy chọn approve không hỗ trợ. `--check-gates` trả exit3 và production=false theo thiết kế, không phải lỗi cần bỏ guard.

## 5. Tình huống lỗi đã thử

Fixture kiểm JSON trùng key, số không hữu hạn, UTF-8 lỗi, BOM, JSON sai; pointer escape `~0/~1`, index mảng sai, đường dẫn thiếu; range đảo chiều/vượt file/boolean; budget0 hoặc vượt trần; absolute path, traversal, Windows separator, symlink, tệp mất, hash thay; duplicate task/source IDs.

Các kiểm riêng sửa **bản sao trong bộ nhớ/thư mục tạm** để thử scope approval giả, production=true, command bindings giả, actual evidence giả; file claim authority không được công cụ gate dùng để cấp phép. Verifier cũng từ chối ghi đè report hoặc ghi report vào thư mục gói.

Đầu vào quá lớn bị báo lỗi, không cắt mất phần ngoại lệ rồi ghi nhận đã đọc đủ. Các helper không nhận arbitrary shell command, endpoint, API token hoặc dữ liệu nhân viên.

## 6. Những lỗi đã hiệu chỉnh trong quá trình soạn

Ở lần kiểm đầu, đối chiếu phát hiện **năm dossier thiếu pool AC hỗ trợ** của WP20 do chỉ lấy story đầu mối. Đã sửa bộ tạo dossier để giữ `ac_refs` nguồn đầy đủ, thêm danh sách story hỗ trợ và liên kết đọc chúng. Không sửa source WBS hoặc expected nguồn để làm test qua.

Kiểm liên kết cũng phát hiện checkpoint bàn giao chưa được tạo ở thời điểm bản nháp đầu. Đã tạo [CHECKPOINT_BUILD_START.md](CHECKPOINT_BUILD_START.md) với nội dung thực, không xóa liên kết hoặc để file rỗng. Sau hiệu chỉnh, bộ kiểm được chạy lại; báo cáo cuối chỉ kết luận phạm vi thực đạt, không giấu rằng đã có lần lỗi.

## 7. Phần chưa được kiểm chứng

| Nội dung | Trạng thái thực |
|---|---|
| Codex CLI/agent đọc AGENTS hoặc chạy nhiệm vụ | NOT_RUN; số lần gọi Codex bằng0 |
| Repository sản phẩm, framework, DB, SSO/hosting | Chưa được chọn/tạo trong gói |
| 15 binding lệnh build/test/deploy sản phẩm | UNBOUND; argv/cwd=null |
| Validator OpenAPI độc lập | NOT_RUN; GAP16-03/GAP20-05 còn mở |
| 375 AC/447 TC16 và các IT/SIT/OPT | Chưa chạy trên ứng dụng |
| Runtime RBAC/ABAC, R/I/E, xóa, offboard, restore | Chưa có enforcement/evidence thực |
| Phê duyệt item, content, pháp lý/IP, psychometric | Chưa được tạo bởi công việc DOC21 |
| Gọi nhà cung cấp AI/SSO/HRIS/analytics | Không thực hiện |
| Threat model đối với filesystem có attacker đồng thời | Chưa thử; helper chỉ dành corpus tin cậy, read-only đối với actor khác |
| Khả năng dữ liệu có nhãn synthetic thật sự không từ nhân viên | Tool không xác định nguồn gốc con số; chỉ dùng fixture đã giao |

Đúng hash không chứng minh nguồn là đúng, có bản quyền hoặc đã ký duyệt. Người có quyền sửa cả file và manifest có thể làm hash khớp; baseline thật phải có trust/commit/approval bên ngoài checker.

## 8. Đóng gói và tái chạy

[PACKAGE_MANIFEST.json](PACKAGE_MANIFEST.json) liệt kê file/hash/size, trừ chính manifest. Source corpus đối chiếu với [DOC-21_SOURCE_MANIFEST.json](DOC-21_SOURCE_MANIFEST.json). Kiểm ZIP và byte của từng entry là bước đóng gói riêng; không là proof triển khai.

Verifier mặc định không viết source reports. Giữ ZIP gốc để đối chiếu; báo cáo tái chạy lưu tên khác ngoài gói. Không đưa cache Python, credential, font, dữ liệu runtime hoặc thư mục handoff_work mới vào gói source.

## 9. Trạng thái cuối danh mục tài liệu

DOC-00–DOC-21: **22/22 tài liệu lõi đã soạn bản thảo**, approved0. DOC21 hoàn tất phần tổ chức bàn giao theo phạm vi trung lập công nghệ: nguồn đọc, task cards, hướng dẫn agent, templates và helper thực có. Chưa đủ điều kiện gọi ứng dụng đã build hoặc được phép dùng người thật.

Bước tiếp theo theo kế hoạch là [TASK21-001](DOC-21_TASK_CARDS.md#task21-001) với [prompt khởi đầu](CODEX_START_PROMPT.md), không tài liệu DOC22 và không task chạy nền.
'''
md('DOC-21_VALIDATION_REPORT.md','DOC-21 — Báo cáo kiểm tra và giới hạn bằng chứng',body)
