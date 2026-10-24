---
document_id: DOC-21_LOCAL_TOOL_CONTRACTS
title: "DOC-21 — Hợp đồng công cụ đọc nguồn và kiểm handoff"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Hợp đồng công cụ đọc nguồn và kiểm handoff

## 1. Phạm vi

`handoff_doc21.py` dùng thư viện chuẩn Python, chỉ đọc các tệp trong gói qua allowlist. Nó không cài dependency, tạo repository, gọi Codex, chạy source checkers, chấm DISC, gửi dữ liệu hoặc thực thi command từ task. `verify_doc21.py` dùng thêm jsonschema để kiểm cấu trúc và fixtures. Kết quả chỉ là kiểm tài liệu/công cụ cục bộ.

## 2. Các registry

| Registry | Dữ liệu chính | Quy tắc |
|---|---|---|
| SOURCE_MANIFEST | 475 path gốc/path giữ lại/hash/size | Corpus original byte giữ; README/manifest lịch sử đổi tên đã ghi |
| CONTEXT_SOURCES | SRC21 ID/path/hash/selector/label | Selector chỉ json_pointer hoặc line_range, không URL/script |
| TASK_REGISTRY | TASK21/WP20/variant/source pools/steps/tests/paths | 50 task, không dispatch hoặc authority thực |
| VARIANT_ROUTING | WP+variant → TASK21 | Unique, phủ đúng 50 source variants, không thêm giả |
| COMMAND_REGISTRY | Lệnh local/mẫu/unbound | Commands sản phẩm argv=null; tool không thực thi chúng |
| BASELINE_CANDIDATE | Recipe R20-00, OFF list và refs chưa chốt | Approvals rỗng; production_authorized=false |
| TRACEABILITY | 75 US/FR/375 AC → WP/variant/task | Chỉ routing; AC applicability phải review trước run |

## 3. Nguồn và selector

Mỗi source có ID ổn định trong registry, path tương đối, SHA-256 bytes, selector type và giá trị. `json_pointer` tuân theo escape `~0`/`~1`; resolve chỉ sau đọc strict JSON, không eval. `line_range` là inclusive 1-indexed, end không vượt file, phải là số nguyên thật không boolean. Cả hai trả nguyên nội dung được chọn, không sửa wording.

Path phải ở dưới root, không absolute/`..`/ký tự phân cách Windows để thoát, không symlink từng thành phần. Tệp thiếu, hash đổi, JSON duplicate, selector sai hoặc excerpt vượt giới hạn đều là lỗi. Hash ở registry không chữ ký; người sửa cùng cả source và manifest có thể làm checksums khớp, nên khi triển khai cần nguồn trust ngoài gói và kiểm commit/approval đúng quy trình.

## 4. CLI và kết quả

| Lệnh | Đầu ra | Exit |
|---|---|---|
| `--verify-sources` | count và mismatch metadata, không nội dung riêng | 0 khi khớp, 2 khi mismatch/lỗi |
| `--list-tasks` | task/WP/variant/kind | 0 |
| `--task TASK21-001` | Dossier và nguồn cần đọc | 0; unknown2 |
| `--recipe R20-00` | Exact required variants/tasks + gates/source note | 0; unknown2 |
| `--excerpt SRC21-0001` | Source metadata và nội dung selected | 0; quá giới hạn/sai hash2 |
| `--check-gates` | PLANNING_ONLY, các blocker, production_authorized=false | 3 có chủ đích |

Mặc định excerpt tối đa 65.536 UTF-8 bytes; đây là **giới hạn output của helper**, không giới hạn context/model hoặc cấu hình Codex. Người dùng có thể chọn `--max-bytes` trong khoảng 1–262.144; quá trần reject. Không truncate; chọn excerpt nhỏ hơn hoặc mở source trong phạm vi được duyệt. `--task` in metadata/steps không tự mở toàn bộ source text.

Mọi output lỗi có code an toàn; không echo arbitrary file contents. Helper không có `--approve`, `--deploy`, `--execute-command`, shell eval, endpoint URL hoặc token input. `--recipe` không tự cộng mọi variants của một WP và không sắp lịch/topological order; nó chuyển exact required_deliverables source thành task references để người nhận review.

## 5. Schema và giới hạn

[DOC-21_HANDOFF_CONTRACTS.schema.json](DOC-21_HANDOFF_CONTRACTS.schema.json) định nghĩa TaskRegistry, SourceRegistry, VariantRouting, CandidateBaseline và TaskResultTemplate. Required không nghĩa client được quyền cung cấp trong một runtime tương lai; đây là draft artifacts.

Additional fields bị chặn trong các object đã đặc tả. Status nháp/approval/null/product commands được khóa. Schema không chứng minh reviewer thật, source đúng ngữ nghĩa, code đã chạy hoặc dữ liệu truly synthetic. Cross-reference checks nằm verifier; semantic compatibility của contract phải do engineering/domain review.

Task-result template là khuôn để người làm ghi sau task; file đang có không chứa test outcome thực. Schema cho Codex final response là định dạng riêng tối giản, không source of authority. JSON đúng không đủ claim task complete hoặc merge/release.

## 6. Verifier và fixtures

Verifier đối chiếu source bytes, 50 variants/tasks, source pointers/ranges, ID uniqueness, 75 story/FR/375 AC trace, command binding null, zero approvals, config mẫu parse được, source links trong Markdown và code parse. Fixtures kiểm source traversal/symlink/hash drift, unknown ID, invalid pointer/range, duplicate JSON, vượt budget, task status injection và recipe không kéo optional.

Các negative fixtures tạo **thư mục tạm riêng**, không sửa corpus để thử. Mỗi expected outcome được ghi cụ thể trước run; một test thất bại giữ failure, không đổi case cho đạt. Kiểm CLI sử dụng Python helper, không chạy `codex` hoặc gọi API.

## 7. Báo cáo và tính lặp lại

Verifier in JSON summary hoặc ghi `--output` bên ngoài package, không overwrite existing file. Report có thời điểm/môi trường/library version và chi tiết từng check. Chạy lại không tự sửa manifest/source reports. Bản report đi kèm gói là actual output của lần chạy được ghi, không số PASS cộng dồn từ trước.

Không nhận đầu vào do người dùng tải lên ở một public service; resource/file trust phải được thiết kế khác nếu dùng tool làm server. Test path allowlist cục bộ không đủ chống TOCTOU trên filesystem có attacker đồng thời; môi trường chạy phải là bản corpus đã kiểm, read-only đối với actor khác. Windows native chưa kiểm; đường dẫn pathlib có thiết kế portable nhưng không tuyên bố đã chạy Windows.
