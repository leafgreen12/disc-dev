# Domain guidance template
Đây là mẫu cho domain code, chưa được gắn vào runtime.
Đọc root AGENTS và đúng FR/DATA/scoring contracts. Pure domain chỉ nhận inputs
explicit; auth/policy nguồn được application service kiểm, không nhận từ client.
Giữ immutable submission, sparse responses, null, exact fractions/version,
key hypotheses và classification disabled. Không inference từ tên/prefix/wording.
Không network, secrets hoặc I/O ẩn trong hàm chấm/chọn. Golden độc lập là oracle;
thay công thức phải có proposal/review và corrective lineage, không sửa lịch sử.
