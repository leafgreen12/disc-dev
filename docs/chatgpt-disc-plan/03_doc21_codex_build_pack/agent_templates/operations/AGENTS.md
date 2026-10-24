# Operations guidance template
Đây là mẫu cho operations code/runbooks, không lệnh vận hành đã được cho phép.
Đọc root AGENTS, DOC14/17 và task scope. Không cloud/provider calls, secrets,
production deploy, data erasure hay user invitation nếu chưa có quyền riêng.
Config mặc định OFF khi thiếu approval; effective settings phải được kiểm.
Rollback/restore giữ current deny/deletion/source validity và generation mới.
Không dump private payload để debug. Mọi command binding có môi trường, side
effects, evidence/cleanup và người chịu trách nhiệm; UNBOUND không trả success.
