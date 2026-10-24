---
document_id: DOC-21_DECISIONS_AND_REFERENCES
title: "DOC-21 — Quyết định, thay đổi và nguồn tham chiếu"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Quyết định, thay đổi và nguồn tham chiếu

## 1. Phạm vi đối chiếu

Các nguồn dưới được mở ngày 15/10/2026 từ trang chính thức. Các URL Codex cũ chuyển tới ChatGPT Learn; gói ghi cả địa chỉ yêu cầu và địa chỉ đích quan sát được. Chỉ sử dụng phần HTML liên quan, không tuyên bố đã xác minh mọi trang hoặc tính năng trên máy người dùng. Không phân tích PDF, cập nhật pháp lý hoặc gọi provider trong DOC21.

Những đề xuất kiến trúc, task, policies và artifacts Vaga là thiết kế mới trên nguồn dự án, không được OpenAI/IETF/JSON Schema chứng nhận. Không tái bản toàn trang, source code vendor, logo hay font.

## 2. Quyết định đề xuất

<a id="dec-277"></a>
### DEC-277 — Đủ 22 bản thảo không phải release

**Đề xuất:** Kết thúc danh mục DOC00–21, chuyển sang TASK21-001; trạng thái code/research/release tách riêng.

**Giới hạn/phương án khác:** Không tạo DOC22 để né bước thực thi; không gọi app hoàn thành.

**Owner:** PO/BA. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-278"></a>
### DEC-278 — Một dossier cho mỗi variant

**Đề xuất:** 50 dossier gắn WP20 và recipe; AC pool phải có applicability trước run.

**Giới hạn/phương án khác:** Không kéo tất cả variant chỉ vì cùng WP hoặc đóng toàn story từ phần nhỏ.

**Owner:** BA/QA/Tech. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-279"></a>
### DEC-279 — Corpus bất biến, baseline tách riêng

**Đề xuất:** Giữ bytes nguồn và tạo candidate delta/hash theo scope.

**Giới hạn/phương án khác:** Không dùng tài liệu mới nhất thay quyết định có thẩm quyền.

**Owner:** BA/Tech/Privacy. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-280"></a>
### DEC-280 — Nguồn tối thiểu có selector

**Đề xuất:** JSON pointer/khoảng dòng và file digest; giới hạn output không truncate.

**Giới hạn/phương án khác:** Registry chỉ định tuyến, không thay đọc phụ thuộc quan trọng hoặc nguồn quyền.

**Owner:** Tech/QA. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-281"></a>
### DEC-281 — AGENTS ngắn và theo vùng

**Đề xuất:** Root hướng dẫn gói, bốn template code vùng; kiểm cwd và instruction sources.

**Giới hạn/phương án khác:** AGENTS không là sandbox hoặc app authorization.

**Owner:** Tech/Security. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-282"></a>
### DEC-282 — Config mẫu chưa active

**Đề xuất:** Mẫu workspace-write/on-request, subprocess network off; không provider/model credentials.

**Giới hạn/phương án khác:** Không ghi config toàn máy hoặc bypass managed settings.

**Owner:** Security/Tech. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-283"></a>
### DEC-283 — Khởi đầu bằng chuẩn bị R20-00

**Đề xuất:** Ba dossier đầu làm baseline/ADR/toolchain theo điều kiện; người thật có gate riêng.

**Giới hạn/phương án khác:** Không chặn toàn bộ bởi optional; không dùng synthetic marker hợp thức real data.

**Owner:** PO/Tech. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-284"></a>
### DEC-284 — Commands có mức chứng cứ

**Đề xuất:** LOCAL_PACK đã kiểm khác CODEX_EXAMPLE chưa chạy và PRODUCT_UNBOUND.

**Giới hạn/phương án khác:** Không stub exit0 hoặc suy package manager từ source script Python.

**Owner:** Tech/QA. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-285"></a>
### DEC-285 — Evidence không ghi đè nguồn

**Đề xuất:** Verifier stdout hoặc output mới ngoài gói; report runtime khác doc-local.

**Giới hạn/phương án khác:** Không cộng PASS cũ thành test app, không sửa golden để khớp SUT.

**Owner:** QA. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-286"></a>
### DEC-286 — Applicability trước test

**Đề xuất:** Mỗi source AC có disposition theo variant và phần nghĩa vụ còn lại.

**Giới hạn/phương án khác:** Pool refs không là coverage mọi field/endpoint hoặc full 375 AC đã chạy.

**Owner:** QA/BA. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-287"></a>
### DEC-287 — Corpus và keys không ra frontend

**Đề xuất:** Lưu nguồn/server assets tách projection, kiểm artifact graph trước release.

**Giới hạn/phương án khác:** Tên restricted_assets không phải kiểm soát nếu pipeline vẫn bundle.

**Owner:** Security/Engineering. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-288"></a>
### DEC-288 — Song song theo write set

**Đề xuất:** Branches/worktrees và ownership sau repo thực; review contract trước merge.

**Giới hạn/phương án khác:** Không reset/revert thay đổi của người khác hoặc tự push/merge.

**Owner:** Tech. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-289"></a>
### DEC-289 — Gap đóng bằng đúng bằng chứng

**Đề xuất:** DOC21 bổ sung handoff cho GAP20-16 nhưng commands/runtime vẫn thiếu; OpenAPI gap mở.

**Giới hạn/phương án khác:** Không đổi OPEN thành CLOSED bằng một checker nháp.

**Owner:** QA/domain owners. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

<a id="dec-290"></a>
### DEC-290 — Kết thúc handoff có checkpoint thực thi

**Đề xuất:** README và CHECKPOINT_BUILD_START nêu task kế, artifacts, blockers và không background task.

**Giới hạn/phương án khác:** Không tự triển khai, mời người hoặc quyết định claims từ Continue.

**Owner:** PO/Tech/Ops. **Cổng:** Trước baseline của phần chịu ảnh hưởng. **Trạng thái:** OPEN_NOT_APPROVED; chưa có người/ngày ký.

## 3. Thay đổi chưa áp

| ID | Nội dung | Tài liệu ảnh hưởng | Trạng thái |
|---|---|---|---|
| CR21-01 | Thêm routing task/context, candidate baseline và evidence capsule vào delivery view; không sửa source requirements. | DOC-00, DOC-16, DOC-20, DOC-21 | PROPOSED_NOT_APPLIED |
| CR21-02 | Sau ADR, tạo command/path bindings và agent policy ở repository thực, cập nhật CI/secret/network/fixture boundaries tương ứng. | DOC-14, DOC-16, DOC-17, DOC-21 | PROPOSED_NOT_APPLIED |

## 4. Nguồn ngoài chính thức

<a id="s21-01"></a>
### S21-01 — OpenAI — Custom instructions with AGENTS.md

[Nguồn yêu cầu](https://developers.openai.com/codex/guides/agents-md) · [Đích truy cập](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

**Phần dùng:** Đã đọc mục discovery/layering; hướng dẫn theo thư mục và giới hạn nạp. **Giới hạn:** Chỉ nguồn hành vi Codex được tài liệu hóa; chưa chạy kiểm discovery trên CLI thực.

<a id="s21-02"></a>
### S21-02 — OpenAI — Agent approvals & security

[Nguồn yêu cầu](https://developers.openai.com/codex/agent-approvals-security) · [Đích truy cập](https://learn.chatgpt.com/docs/agent-approvals-security).

**Phần dùng:** Đã đọc sandbox, approval, network và phạm vi local/cloud. **Giới hạn:** Mẫu giới hạn của Vaga là đề xuất, không chứng minh cấu hình người dùng hiệu lực.

<a id="s21-03"></a>
### S21-03 — OpenAI — Config basics

[Nguồn yêu cầu](https://developers.openai.com/codex/config-basic) · [Đích truy cập](https://learn.chatgpt.com/docs/config-file/config-basic).

**Phần dùng:** Đã đọc project trust, lớp config và các keys sandbox/approval/web search. **Giới hạn:** Không chọn model, không ghi cấu hình active vào máy hoặc xác nhận CLI version.

<a id="s21-04"></a>
### S21-04 — OpenAI — Non-interactive mode

[Nguồn yêu cầu](https://developers.openai.com/codex/noninteractive) · [Đích truy cập](https://learn.chatgpt.com/docs/non-interactive-mode).

**Phần dùng:** Đã đọc exec, JSONL, output schema, output-last-message và cảnh báo credentials. **Giới hạn:** Command examples chưa chạy. Schema response không chứng minh app được triển khai.

<a id="s21-05"></a>
### S21-05 — OpenAI — Cloud environments

[Nguồn yêu cầu](https://developers.openai.com/codex/cloud/environments) · [Đích truy cập](https://learn.chatgpt.com/docs/environments/cloud-environment).

**Phần dùng:** Đã đọc setup/agent phase và phạm vi môi trường cloud. **Giới hạn:** Không có environment cloud, setup script hoặc secret của Vaga được tạo.

<a id="s21-06"></a>
### S21-06 — OpenAI — How OpenAI uses Codex

[Nguồn yêu cầu](https://openai.com/business/guides-and-resources/how-openai-uses-codex/) · [Đích truy cập](https://openai.com/business/guides-and-resources/how-openai-uses-codex/).

**Phần dùng:** Đối chiếu phần best practices: chuẩn bị ngữ cảnh và công việc có phạm vi rõ. **Giới hạn:** Không mượn số liệu hiệu quả, thời gian hay kinh nghiệm OpenAI làm số đo Vaga.

<a id="s21-07"></a>
### S21-07 — IETF — RFC 6901, JSON Pointer

[Nguồn yêu cầu](https://www.rfc-editor.org/rfc/rfc6901.html) · [Đích truy cập](https://www.rfc-editor.org/rfc/rfc6901.html).

**Phần dùng:** Đọc cú pháp, evaluation, escape và lỗi để thiết kế selector. **Giới hạn:** Helper không là JSON Patch hoặc URI fragment resolver tổng quát.

<a id="s21-08"></a>
### S21-08 — JSON Schema — Draft 2020-12

[Nguồn yêu cầu](https://json-schema.org/draft/2020-12) · [Đích truy cập](https://json-schema.org/draft/2020-12).

**Phần dùng:** Đối chiếu phiên bản schema dùng trong gói và phạm vi assertions. **Giới hạn:** JSON Schema không xác thực authority, legal basis hoặc correctness thực nghiệm.

## 5. Nguồn dự án và khoảng trống

Checkpoint DOC21, DOC20 WBS/recipe/reconciliation và các registry FR/API/UI/AC là đầu vào trực tiếp. 475 tệp được giữ nguyên, không có nghĩa đọc lại mọi dòng. Dossier và selector chỉ xuất những phần liên quan có kiểm định danh; source vẫn nháp. Các trạng thái actual/review của nghiên cứu và runtime không được tạo mới.

OpenAPI validator độc lập chưa cài sẵn, chưa chạy. Codex CLI/model/provider không được gọi. Runtime product commands, stack/provider, keying/scientific evidence, legal sign-off, UAT và deployment vẫn là khoảng trống phải xử lý đúng scope. Các DEC277–290 và CR21 không tự áp vào nguồn hoặc hệ thống.
