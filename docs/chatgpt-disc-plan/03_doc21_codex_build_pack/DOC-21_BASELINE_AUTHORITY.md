---
document_id: DOC-21_BASELINE_AUTHORITY
title: "DOC-21 — Thẩm quyền baseline và xử lý mâu thuẫn"
version: 0.1.0
status: REVIEW_DRAFT
approval_status: NOT_APPROVED
prepared_on: 2026-10-15
language: vi-VN
application_implementation_status: NOT_STARTED
application_test_execution_status: NOT_RUN
production_authorized: false
---

# DOC-21 — Thẩm quyền baseline và xử lý mâu thuẫn

## 1. Không dùng toàn corpus như một bản thiết kế đã ký

Corpus lưu kiến thức và lịch sử quyết định. Baseline ứng viên chọn đúng một scope và exact revisions. Baseline được phê duyệt cần người chịu trách nhiệm, phạm vi, điều kiện và hash; commit code cần bằng chứng khác. Không có tệp `approved.json` tự khai nào đủ chứng minh quyền duyệt.

Bộ nguồn có 276 DEC trước DOC21, nhiều đề xuất bổ sung qua các tài liệu. Mục đích không phải đóng hết các DEC trước khi viết một dòng code synthetic. Phải xác định **quyết định nào ảnh hưởng behavior và dữ liệu của scope đang chọn**, rồi tạo delta nhất quán. Những nhánh không chọn vẫn phải OFF ở server/worker/network khi có runtime.

## 2. Ma trận thẩm quyền theo khía cạnh

| Khía cạnh | Nguồn gốc | Delta cần kiểm | Người chốt |
|---|---|---|---|
| Mục đích sản phẩm | DOC01/02 | CR20 về scope, không mở đánh giá nhân sự | PO/HR |
| State và hành vi | DOC05 | CR14/17/18/19 theo phần áp dụng | BA/Tech/QA + domain owner |
| UI và wording | DOC06/07 | Preference/AI/analytics extensions, không đổi item wording | UX/Content; Psychometric cho item |
| Item/form/key | DOC08/09 | Revision và evidence DOC10, không heuristic từ vendor | Psychometric/IP/QA |
| Nội dung | DOC11 | DEC114/118, claims, exact bundle/policy | Content/Psychometric/Privacy |
| Data/transport | DOC12/13 | CR có mapping field/state/auth/error rõ | Data/API/Security |
| Quyền/lifecycle | DOC14 | Dataflow thực, retention, người duyệt, current authority | Privacy/Legal/Security |
| Deploy/tích hợp | DOC17/18 | Control survival, trust, identity writer/lanes | Ops/Identity/Security |
| Analytics/AI | DOC19/15 | Chọn task/event thực sự cần, purpose và provider nếu có | PO/Privacy/Research/Tech |
| Nghiệm thu | DOC16/20 | Applicability theo exact variant và tầng test | QA/domain reviewers |

Đây là bản phân công thiết kế, không là danh sách nhân sự thật được bổ nhiệm. Nếu một người kiêm nhiệm, vẫn tách maker và checker cho thay đổi nhạy cảm.

## 3. Bảy thay đổi nền cần xét cho manual người thật

Bảy CR bên dưới lấy từ DOC20. Không khẳng định mọi dòng của chúng đã áp hoặc phải triển khai mọi module mở rộng.

| CR nguồn | Điều phải được làm rõ | Đầu ra baseline đích | Dừng ở đâu nếu thiếu |
|---|---|---|---|
| CR14-01 | Xử lý dữ liệu khi chấm dứt quan hệ theo policy đã rà; phạm vi ngoại lệ | Lifecycle contract, targets, deny/purge/restore evidence | Không mở người thật với TTL draft mặc định |
| CR14-02 | Loại yêu cầu quyền và các mốc xử lý còn thiếu ở API nguồn | DTO/triage/UI hoặc quy trình hỗ trợ tương đương được duyệt | Không bỏ quyền chỉ vì enum cũ thiếu |
| CR14-03 | ReviewTarget nào được role/capability/assignment nào duyệt | Decision guard matrix + negative tests | Không endpoint reviews.decide toàn năng |
| CR14-04 | Phiên, hạn mức, retention, current generation và config authority | Typed config/approval/verification và effective state | Không đưa con số proposal thẳng vào production |
| CR17-01 | Control survival floor và mốc R/I/E trên topology | Protocol/fence/transport + observer và test causal | Không coi hai lần check là atomic gate |
| CR17-02 | Deployment manifest tách tài sản đo lường | Release closure + config/build/rollback compatibility | Không deploy để phê duyệt scientific assets |
| CR17-03 | Ops interfaces/harness private | Quyền thử, reset, observers và artifact exclusions | Không test hooks ở public service |

Khi chọn OIDC làm login tối thiểu, phần cần của CR18-01 phải đi cùng identity baseline, dù HRIS/SCIM chưa xây. Không dùng “enterprise optional” để bỏ xác thực an toàn. Nội dung pháp lý của CR14 là nguồn cần review, DOC21 không cập nhật hay kết luận luật áp dụng mới.

## 4. Các delta theo nhánh

AI dùng CR15-01–06; HRIS/SCIM/notifications dùng CR18 theo capability; analytics dùng CR19-01–06. CR20-01–03 bổ sung cách giao nhận baseline/task/release. Ma trận 24 CR trước DOC20, ba CR20 và bốn REC20 được giữ trong [baseline source](DOC-20_BASELINE_RECONCILIATION.md).

REC20-01 là preference-first/semantic binding; cần chọn literal path trước hay extension rồi đổi nguồn FR một cách có version. REC20-02 giữ scorer hiện tại không tự sinh token/label. REC20-03 tách variant để lifecycle không bị đẩy sau người thật. REC20-04 yêu cầu gate riêng cho optional integration/analytics, không tự giả RLS16 đã có profile đó.

Đối với branch không chọn, disposition ứng viên là `PROPOSED_DEFER_FOR_SCOPE`, không `CANCELLED` hoặc `APPLIED`. Khi scope đổi, xử lý lại. Unknown compatibility vẫn chặn phép so sánh ngay cả khi code có chung D/I/S/C.

## 5. Mẫu delta bắt buộc

Mỗi delta có issue/ref, source path/sha, source proposition, selected recipe/variant, alternative, candidate disposition, target contract paths, changed fields/states/roles, consumer impact, test IDs, migration/lifecycle, reviewer roles và unresolved facts. Không sửa byte source; target nằm baseline/candidates của repo được cấp quyền.

Ví dụ CR14-03: request body của endpoint review có target loại nào; domain resolver xác minh assignment; maker/checker so danh tính thật; scope hash trỏ đúng revision; lỗi không tiết lộ tài sản khác. Candidate phải chỉ rõ field và check nào nằm service, check nào nằm DB, check nào là quyết định con người. Không ghi “thêm security check” chung chung.

## 6. Quy trình làm và review

1. Khóa corpus và task intent; source drift chặn đoạn bị ảnh hưởng.
2. Chọn recipe; mở toàn bộ CR liên quan và capability OFF nghĩa vụ.
3. Soạn delta ứng viên, ghi cả phương án khác và dữ liệu thiếu.
4. Review đúng chuyên môn, không mượn chữ ký của role khác.
5. Tạo manifest approved baseline ở workflow tổ chức thực; gói hiện không có workflow này.
6. Bind commands/paths, implement và test từng assertion.
7. Chỉ chuyển APPLIED khi target baseline và implementation/evidence đủ nghĩa của trạng thái; không đánh APPLIED từ file diff nháp.

Một slice synthetic có thể dùng giả định kỹ thuật tường minh để thử feasibility; chúng không trở thành căn cứ processing người thật. Spike hỏng nên kết thúc bằng counterexample và tradeoff, không che failure để giữ lựa chọn ban đầu.

## 7. Khuôn baseline trong gói

[DOC-21_BASELINE_CANDIDATE.json](DOC-21_BASELINE_CANDIDATE.json) chỉ R20-00 ứng viên, `approved_baseline_ref=null`, `stack_decision_ref=null`, `approvals=[]`, `production_authorized=false`. Các lựa chọn task không cấp quyền thật. Schema nháp khóa trạng thái này để tránh sơ ý; service review tương lai là hợp đồng khác.

Những proof chưa có không điền bằng boolean true: chữ ký, scope, retained evidence, actual source branch, effective config. SHA-256 hỗ trợ phát hiện drift nhưng không chứng minh source an toàn hoặc reviewer đã đọc.
