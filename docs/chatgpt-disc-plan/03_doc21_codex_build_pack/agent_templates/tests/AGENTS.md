# Testing guidance template
Đây là mẫu cho tests/harness của repo thực; không tạo test runtime trong gói.
Đọc root AGENTS, DOC16 và task applicability. Dựng actors/namespaces synthetic,
không production dump. Oracle không được sinh từ chính SUT để che regression.
Negative authorization phải kiểm side effects/reads/egress ở boundary thật.
Canary observer cần positive control; thiếu tín hiệu là INCONCLUSIVE, không PASS.
Test hooks không hiện diện production. Cleanup độc lập khi thử deletion.
Giữ failed attempts, NOT_RUN và evidence theo build/config; không chỉnh AC nguồn.
