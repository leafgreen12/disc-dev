/**
 * NGÂN HÀNG CÂU HỎI VAGA DISC (64 ITEMS: 40 LIKERT + 8 ADAPTIVE + 24 FORCED-CHOICE)
 * & MA TRẬN NỘI DUNG HÀNH VI 72 THẺ (DOC-08, DOC-09, DOC-11, VAGA v0.2)
 * Dùng chung cho cả Frontend (window.*) và Backend Node.js (module.exports)
 */
(function (root) {
  // ============================================================================
  // 1. 7 NGỮ CẢNH CÔNG VIỆC CHUẨN VAGA (DOC-06 / DOC-11)
  // ============================================================================
  const VAGA_WORKPLACE_CONTEXTS = [
    {
      id: 'direct_conversation',
      label: 'Giao tiếp trực tiếp',
      icon: '💬',
      shortDesc: 'Cách bắt đầu cuộc trao đổi 1-1, trình bày ý chính và đặt câu hỏi.'
    },
    {
      id: 'chat_email',
      label: 'Tin nhắn & Email',
      icon: '✉️',
      shortDesc: 'Độ dài tin nhắn, cấu trúc bullet-point, thời점 phản hồi kỳ vọng.'
    },
    {
      id: 'meeting',
      label: 'Họp hành & Thảo luận',
      icon: '📅',
      shortDesc: 'Chuẩn bị agenda, cách đóng góp ý kiến và chốt hành động trong cuộc họp.'
    },
    {
      id: 'decision',
      label: 'Ra quyết định',
      icon: '⚖️',
      shortDesc: 'Mức độ cần dữ liệu, tốc độ chốt phương án và phạm vi tự chủ.'
    },
    {
      id: 'conflict',
      label: 'Giải quyết bất đồng',
      icon: '🤝',
      shortDesc: 'Cách xử lý khi có ý kiến trái chiều hoặc áp lực tiến độ.'
    },
    {
      id: 'delegation',
      label: 'Giao việc & Phối hợp',
      icon: '🎯',
      shortDesc: 'Cách nhận/giao đầu việc, tần suất cập nhật tiến độ và tiêu chí hoàn thành.'
    },
    {
      id: 'feedback_recognition',
      label: 'Phản hồi & Ghi nhận',
      icon: '🌟',
      shortDesc: 'Cách góp ý cải thiện và hình thức ghi nhận đóng góp phù hợp nhất.'
    }
  ];

  // ============================================================================
  // 2. 5 THANH TRƯỢT PHONG CÁCH LÀM VIỆC (WORKSTYLE SLIDERS - thang 1..5)
  // ============================================================================
  const VAGA_WORKSTYLE_SLIDERS = [
    {
      id: 'pace',
      label: 'Nhịp độ làm việc',
      leftLabel: 'Điềm tĩnh, chắc chắn từng bước',
      rightLabel: 'Nhanh, dứt khoát, ưu tiên tốc độ'
    },
    {
      id: 'decision_mode',
      label: 'Căn cứ ra quyết định',
      leftLabel: 'Phân tích kỹ dữ liệu & rủi ro',
      rightLabel: 'Linh hoạt, dựa trên mục tiêu & trực giác'
    },
    {
      id: 'communication_channel',
      label: 'Kênh & Phong cách trao đổi',
      leftLabel: 'Văn bản có cấu trúc, chuẩn bị trước',
      rightLabel: 'Trao đổi nhanh trực tiếp / thảo luận mở'
    },
    {
      id: 'detail_need',
      label: 'Mức độ chi tiết cần thiết',
      leftLabel: 'Tổng quan ngắn gọn, đi thẳng kết quả',
      rightLabel: 'Đầy đủ ngữ cảnh, thông số & tiêu chuẩn'
    },
    {
      id: 'change_attitude',
      label: 'Phản ứng với thay đổi đột xuất',
      leftLabel: 'Cần lộ trình chuyển tiếp & ổn định',
      rightLabel: 'Sẵn sàng xoay trục & thử nghiệm ngay'
    }
  ];

  // ============================================================================
  // 3. BỘ 40 CÂU LIKERT CHUẨN VAGA (L-D01..L-C10) + 8 CÂU ADAPTIVE (A-D01..A-C02)
  // Nguồn: DR-03_Bo_Cau_Hoi_DISC_64_Items_Vaga.md & DOC-08 / DOC-09
  // Quy tắc: Câu 06, 07, 08 mỗi nhóm là Reverse-keyed (Điểm = 6 - x)
  // ============================================================================
  const VAGA_LIKERT_40 = [
    // --- Nhóm D (Dominance / Chủ động - Kết quả) ---
    { id: 'L-D01', index: 1, dimension: 'D', keying: 'forward', context: 'decision', text: 'Trong cuộc họp bị kéo dài, tôi thường chủ động đưa thảo luận quay lại mục tiêu cần chốt.', pairId: 'PAIR_D1' },
    { id: 'L-D02', index: 2, dimension: 'D', keying: 'forward', context: 'delegation', text: 'Khi dự án chưa rõ người chịu trách nhiệm, tôi sẵn sàng đứng ra nhận quyền điều phối.', pairId: null },
    { id: 'L-D03', index: 3, dimension: 'D', keying: 'forward', context: 'conflict', text: 'Tôi thoải mái nêu quan điểm bất đồng trực tiếp nếu thấy phương án hiện tại kém hiệu quả.', pairId: null },
    { id: 'L-D04', index: 4, dimension: 'D', keying: 'forward', context: 'decision', text: 'Khi phải chọn giữa tốc độ triển khai và sự đồng thuận tuyệt đối, tôi ưu tiên tiến độ trước.', pairId: null },
    { id: 'L-D05', index: 5, dimension: 'D', keying: 'forward', context: 'delegation', text: 'Tôi thích những mục tiêu thách thức và có tiêu chí thắng - thua, đạt - không đạt rõ ràng.', pairId: null },
    { id: 'L-D06', index: 6, dimension: 'D', keying: 'reverse', context: 'meeting', text: 'Tôi thường tránh thúc ép tiến độ vì ngại tạo áp lực cho các thành viên khác.', pairId: 'PAIR_D1' },
    { id: 'L-D07', index: 7, dimension: 'D', keying: 'reverse', context: 'decision', text: 'Khi chưa có ý kiến thống nhất của cả nhóm, tôi hiếm khi tự mình đưa ra quyết định.', pairId: null },
    { id: 'L-D08', index: 8, dimension: 'D', keying: 'reverse', context: 'conflict', text: 'Tôi cảm thấy không thoải mái khi phải tranh luận thẳng thắn để bảo vệ phương án của mình.', pairId: null },
    { id: 'L-D09', index: 9, dimension: 'D', keying: 'forward', context: 'direct_conversation', text: 'Khi nhận một nhiệm vụ mới, câu hỏi đầu tiên của tôi là: "Kết quả cuối cùng cần đạt là gì?"', pairId: null },
    { id: 'L-D10', index: 10, dimension: 'D', keying: 'forward', context: 'decision', text: 'Trong tình huống khẩn cấp, tôi quyết định nhanh và chấp nhận chịu trách nhiệm về rủi ro phát sinh.', pairId: null },

    // --- Nhóm I (Influence / Kết nối - Truyền cảm hứng) ---
    { id: 'L-I01', index: 11, dimension: 'I', keying: 'forward', context: 'meeting', text: 'Tôi dễ dàng bắt chuyện và tạo bầu không khí thoải mái khi làm việc với các thành viên mới.', pairId: 'PAIR_I1' },
    { id: 'L-I02', index: 12, dimension: 'I', keying: 'forward', context: 'meeting', text: 'Khi trình bày ý tưởng, tôi thường dùng câu chuyện hoặc ví dụ sinh động để thuyết phục mọi người.', pairId: null },
    { id: 'L-I03', index: 13, dimension: 'I', keying: 'forward', context: 'direct_conversation', text: 'Tôi có thêm nhiều năng lượng khi được brainstorming trực tiếp cùng tập thể hơn là tự làm một mình.', pairId: null },
    { id: 'L-I04', index: 14, dimension: 'I', keying: 'forward', context: 'feedback_recognition', text: 'Tôi thường chủ động khen ngợi và ghi nhận đóng góp của đồng nghiệp trước nhóm.', pairId: null },
    { id: 'L-I05', index: 15, dimension: 'I', keying: 'forward', context: 'delegation', text: 'Khi nhóm gặp khó khăn, tôi là người giữ tinh thần lạc quan và khích lệ mọi người tiếp tục.', pairId: null },
    { id: 'L-I06', index: 16, dimension: 'I', keying: 'reverse', context: 'chat_email', text: 'Tôi thích trao đổi công việc hoàn toàn qua văn bản hơn là trò chuyện trực tiếp.', pairId: null },
    { id: 'L-I07', index: 17, dimension: 'I', keying: 'reverse', context: 'meeting', text: 'Trong các buổi họp đông người, tôi thường giữ im lặng trừ khi được hỏi trực tiếp.', pairId: 'PAIR_I1' },
    { id: 'L-I08', index: 18, dimension: 'I', keying: 'reverse', context: 'direct_conversation', text: 'Tôi cảm thấy mệt mỏi nếu phải liên tục kết nối và giao tiếp với nhiều bên trong ngày.', pairId: null },
    { id: 'L-I09', index: 19, dimension: 'I', keying: 'forward', context: 'decision', text: 'Tôi nhanh chóng hào hứng với các sáng kiến mới và thích lan tỏa sự hào hứng đó cho đồng đội.', pairId: null },
    { id: 'L-I10', index: 20, dimension: 'I', keying: 'forward', context: 'conflict', text: 'Khi cần tháo gỡ vướng mắc liên phòng ban, tôi ưu tiên gặp gỡ trực tiếp để tạo thiện chí hợp tác.', pairId: null },

    // --- Nhóm S (Steadiness / Ổn định - Hỗ trợ) ---
    { id: 'L-S01', index: 21, dimension: 'S', keying: 'forward', context: 'delegation', text: 'Đồng nghiệp thường tìm đến tôi khi cần một người kiên nhẫn lắng nghe và hỗ trợ nhịp nhàng.', pairId: null },
    { id: 'L-S02', index: 22, dimension: 'S', keying: 'forward', context: 'delegation', text: 'Tôi làm việc hiệu quả nhất khi quy trình phối hợp ổn định và có kế hoạch rõ ràng từ đầu.', pairId: 'PAIR_S1' },
    { id: 'L-S03', index: 23, dimension: 'S', keying: 'forward', context: 'conflict', text: 'Khi có xung đột trong nhóm, tôi ưu tiên tìm điểm chung để giữ sự hài hòa và gắn kết.', pairId: null },
    { id: 'L-S04', index: 24, dimension: 'S', keying: 'forward', context: 'delegation', text: 'Tôi luôn cố gắng hoàn thành trọn vẹn phần việc đã cam kết để không làm ảnh hưởng đến người khác.', pairId: null },
    { id: 'L-S05', index: 25, dimension: 'S', keying: 'forward', context: 'decision', text: 'Trước một thay đổi lớn, tôi cần thời gian tìm hiểu kỹ lộ trình chuyển giao trước khi bắt tay thực hiện.', pairId: null },
    { id: 'L-S06', index: 26, dimension: 'S', keying: 'reverse', context: 'delegation', text: 'Tôi thích môi trường thay đổi mục tiêu liên tục mỗi ngày hơn là duy trì nhịp làm việc ổn định.', pairId: null },
    { id: 'L-S07', index: 27, dimension: 'S', keying: 'reverse', context: 'delegation', text: 'Tôi dễ mất kiên nhẫn khi phải hướng dẫn từng bước lặp đi lặp lại cho người mới.', pairId: 'PAIR_S1' },
    { id: 'L-S08', index: 28, dimension: 'S', keying: 'reverse', context: 'conflict', text: 'Tôi sẵn sàng phá bỏ thỏa thuận chung của nhóm nếu thấy cách làm cá nhân nhanh hơn.', pairId: null },
    { id: 'L-S09', index: 29, dimension: 'S', keying: 'forward', context: 'feedback_recognition', text: 'Khi góp ý cho đồng nghiệp, tôi luôn cân nhắc kỹ cách diễn đạt để tránh làm tổn thương họ.', pairId: null },
    { id: 'L-S10', index: 30, dimension: 'S', keying: 'forward', context: 'meeting', text: 'Tôi coi trọng sự tin cậy lâu dài và tinh thần đồng đội bền vững hơn là sự nổi bật cá nhân.', pairId: null },

    // --- Nhóm C (Conscientiousness / Chuẩn xác - Phân tích) ---
    { id: 'L-C01', index: 31, dimension: 'C', keying: 'forward', context: 'decision', text: 'Trước khi đưa ra kết luận, tôi luôn kiểm tra số liệu, nguồn dẫn chứng và tính logic của thông tin.', pairId: null },
    { id: 'L-C02', index: 32, dimension: 'C', keying: 'forward', context: 'delegation', text: 'Tôi thiết lập tiêu chuẩn chất lượng rất cụ thể và tự rà soát kỹ để hạn chế tối đa sai sót.', pairId: 'PAIR_C1' },
    { id: 'L-C03', index: 33, dimension: 'C', keying: 'forward', context: 'chat_email', text: 'Tôi thích các tài liệu, yêu cầu công việc được viết rõ ràng, có cấu trúc và định nghĩa tiêu chí nghiệm thu.', pairId: null },
    { id: 'L-C04', index: 34, dimension: 'C', keying: 'forward', context: 'decision', text: 'Khi đánh giá một đề xuất mới, tôi thường nhìn ra các kịch bản rủi ro hoặc lỗ hổng vận hành tiềm ẩn.', pairId: null },
    { id: 'L-C05', index: 35, dimension: 'C', keying: 'forward', context: 'meeting', text: 'Trong thảo luận chuyên môn, tôi thuyết phục người khác bằng lập luận có cấu trúc và bằng chứng thực tế.', pairId: null },
    { id: 'L-C06', index: 36, dimension: 'C', keying: 'reverse', context: 'decision', text: 'Tôi thường làm theo cảm tính ban đầu mà không cần kiểm tra lại chi tiết hay quy trình.', pairId: null },
    { id: 'L-C07', index: 37, dimension: 'C', keying: 'reverse', context: 'delegation', text: 'Việc phải đối chiếu từng tiểu tiết, tài liệu kỹ thuật hoặc quy định khiến tôi nhanh chán nản.', pairId: 'PAIR_C1' },
    { id: 'L-C08', index: 38, dimension: 'C', keying: 'reverse', context: 'decision', text: 'Tôi thoải mái bàn giao sản phẩm ở mức "tạm chấp nhận được" miễn là xong nhanh.', pairId: null },
    { id: 'L-C09', index: 39, dimension: 'C', keying: 'forward', context: 'feedback_recognition', text: 'Tôi đánh giá cao những phản hồi khách quan, chỉ rõ bằng chứng cụ thể hơn là lời khen chung chung.', pairId: null },
    { id: 'L-C10', index: 40, dimension: 'C', keying: 'forward', context: 'delegation', text: 'Khi giải quyết vấn đề phức tạp, tôi phân tách thành từng bước logic và lưu vết tài liệu cẩn thận.', pairId: null }
  ];

  // 8 Câu Adaptive Reserve (A-D01..A-C02) kích hoạt khi khoảng cách Top 1 - Top 2 hẹp hoặc phương sai cao
  const VAGA_ADAPTIVE_8 = [
    { id: 'A-D01', index: 41, dimension: 'D', keying: 'forward', context: 'decision', text: 'Khi cuộc thảo luận rơi vào bế tắc, tôi thường là người chốt phương án cuối cùng để nhóm tiến lên.' },
    { id: 'A-D02', index: 42, dimension: 'D', keying: 'reverse', context: 'delegation', text: 'Tôi thích để người khác dẫn dắt và đặt mục tiêu hơn là tự mình cầm trịch.' },
    { id: 'A-I01', index: 43, dimension: 'I', keying: 'forward', context: 'meeting', text: 'Tôi dễ dàng khuấy động năng lượng tích cực cho cả phòng chỉ sau vài phút trò chuyện.' },
    { id: 'A-I02', index: 44, dimension: 'I', keying: 'reverse', context: 'direct_conversation', text: 'Tôi thường giữ khoảng cách xã giao và ít chia sẻ cảm xúc cá nhân nơi công sở.' },
    { id: 'A-S01', index: 45, dimension: 'S', keying: 'forward', context: 'delegation', text: 'Tôi sẵn sàng điều chỉnh nhịp cá nhân để hỗ trợ đồng đội hoàn thành mục tiêu chung một cách êm thấm.' },
    { id: 'A-S02', index: 46, dimension: 'S', keying: 'reverse', context: 'conflict', text: 'Khi không đồng ý, tôi phản biện gay gắt ngay lập tức bất kể bầu không khí chung.' },
    { id: 'A-C01', index: 47, dimension: 'C', keying: 'forward', context: 'decision', text: 'Nếu số liệu chưa khớp hoặc quy trình chưa rõ, tôi kiên quyết yêu cầu làm rõ trước khi ký duyệt.' },
    { id: 'A-C02', index: 48, dimension: 'C', keying: 'reverse', context: 'chat_email', text: 'Tôi thấy việc ghi chép quy trình chuẩn hóa và checklist kiểm tra là hình thức rườm rà không cần thiết.' }
  ];

  // ============================================================================
  // 4. BỘ 24 CÂU FORCED-CHOICE (MOST / LEAST)
  // ============================================================================
  const DISC_QUESTIONS = [
    {
      id: 1,
      code: 'FC-01',
      context: 'Khi bắt đầu một dự án hoặc kế hoạch mới cùng đội nhóm',
      options: [
        { type: 'D', text: 'Quyết đoán, chủ động nắm quyền điều phối và tập trung ngay vào mục tiêu cuối cùng' },
        { type: 'I', text: 'Hào hứng, truyền cảm hứng và khuấy động không khí tích cực cho mọi người' },
        { type: 'S', text: 'Điềm tĩnh, lắng nghe ý kiến và sẵn sàng hỗ trợ các thành viên phối hợp nhịp nhàng' },
        { type: 'C', text: 'Thận trọng, tìm hiểu kỹ quy trình, số liệu và lập kế hoạch chi tiết từng bước' }
      ]
    },
    {
      id: 2,
      code: 'FC-02',
      context: 'Trong một cuộc họp quan trọng cần đưa ra quyết định',
      options: [
        { type: 'D', text: 'Đi thẳng vào trọng tâm, muốn chốt phương án nhanh chóng và dứt khoát' },
        { type: 'I', text: 'Cởi mở chia sẻ ý tưởng sáng tạo, dùng câu chuyện để thuyết phục tập thể' },
        { type: 'S', text: 'Quan sát thái độ mọi người, ưu tiên sự đồng thuận và hòa khí trong phòng họp' },
        { type: 'C', text: 'Đặt câu hỏi phản biện dựa trên dữ liệu, bằng chứng và tính logic của vấn đề' }
      ]
    },
    {
      id: 3,
      code: 'FC-03',
      context: 'Khi đối mặt với áp lực thời gian (Deadline gấp)',
      options: [
        { type: 'D', text: 'Tăng tốc độ xử lý, cắt bỏ thủ tục rườm rà để hoàn thành bằng mọi giá' },
        { type: 'I', text: 'Tìm kiếm sự hỗ trợ từ mối quan hệ xung quanh và giữ tinh thần lạc quan' },
        { type: 'S', text: 'Kiên trì bám sát lịch trình đã định, làm việc đều đặn và tránh xáo trộn' },
        { type: 'C', text: 'Rà soát kỹ các đầu việc ưu tiên để đảm bảo không xảy ra sai sót chất lượng' }
      ]
    },
    {
      id: 4,
      code: 'FC-04',
      context: 'Khi xảy ra bất đồng quan điểm hoặc xung đột trong công việc',
      options: [
        { type: 'D', text: 'Thẳng thắn tranh luận trực diện để bảo vệ quan điểm và giải quyết dứt điểm' },
        { type: 'I', text: 'Dùng sự hài hước và khéo léo giao tiếp để làm dịu bầu không khí căng thẳng' },
        { type: 'S', text: 'Nhường nhịn hoặc tìm giải pháp dung hòa để giữ gìn mối quan hệ lâu dài' },
        { type: 'C', text: 'Tạm lùi lại, tổng hợp quy định và dẫn chứng khách quan để phân định đúng sai' }
      ]
    },
    {
      id: 5,
      code: 'FC-05',
      context: 'Phong cách giao tiếp hàng ngày của bạn nơi công sở',
      options: [
        { type: 'D', text: 'Ngắn gọn, súc tích, nói thẳng vào kết quả và yêu cầu cần thực hiện' },
        { type: 'I', text: 'Thân thiện, giàu cảm xúc, thích trò chuyện trực tiếp và mở rộng kết nối' },
        { type: 'S', text: 'Nhẹ nhàng, chân thành, kiên nhẫn lắng nghe trước khi đưa ra phản hồi' },
        { type: 'C', text: 'Chính xác, mạch lạc, ưu tiên trao đổi qua văn bản/email có cấu trúc rõ ràng' }
      ]
    },
    {
      id: 6,
      code: 'FC-06',
      context: 'Khi tổ chức hoặc quy trình làm việc có sự thay đổi đột ngột',
      options: [
        { type: 'D', text: 'Xem đó là cơ hội để bứt phá, lập tức nắm bắt và điều chỉnh hướng đi' },
        { type: 'I', text: 'Hào hứng thử nghiệm cái mới và lan tỏa năng lượng tích cực cho đồng nghiệp' },
        { type: 'S', text: 'Cần thêm thời gian thích nghi và mong muốn có lộ trình chuyển đổi an toàn' },
        { type: 'C', text: 'Phân tích kỹ nguyên nhân, rủi ro và tác động của sự thay đổi trước khi áp dụng' }
      ]
    },
    {
      id: 7,
      code: 'FC-07',
      context: 'Điều tạo động lực lớn nhất cho bạn trong công việc',
      options: [
        { type: 'D', text: 'Quyền tự chủ, thử thách lớn và kết quả thành tích vượt trội' },
        { type: 'I', text: 'Sự công nhận trước tập thể, môi trường vui vẻ và tự do sáng tạo' },
        { type: 'S', text: 'Sự ổn định, gắn kết bền vững và cảm giác được tin cậy trong đội nhóm' },
        { type: 'C', text: 'Tiêu chuẩn chất lượng cao, sự chuẩn xác chuyên môn và quy trình minh bạch' }
      ]
    },
    {
      id: 8,
      code: 'FC-08',
      context: 'Khi được giao một nhiệm vụ hoàn toàn mới và chưa có tiền lệ',
      options: [
        { type: 'D', text: 'Bắt tay vào làm thử ngay, vừa làm vừa tháo gỡ vướng mắc' },
        { type: 'I', text: 'Thảo luận sôi nổi với đồng nghiệp để tìm kiếm các ý tưởng đột phá' },
        { type: 'S', text: 'Tham khảo kinh nghiệm từ người đi trước để thực hiện từng bước chắc chắn' },
        { type: 'C', text: 'Thu thập đầy đủ tài liệu, nghiên cứu tiêu chuẩn và thiết kế khung quy trình chuẩn' }
      ]
    },
    {
      id: 9,
      code: 'FC-09',
      context: 'Khi làm việc nhóm, đồng nghiệp thường nhận xét bạn là người',
      options: [
        { type: 'D', text: 'Mạnh mẽ, dám nghĩ dám làm và luôn thúc đẩy tiến độ chung' },
        { type: 'I', text: 'Hoạt bát, nhiệt tình, luôn mang lại tiếng cười và sự gắn kết' },
        { type: 'S', text: 'Đáng tin cậy, tận tâm, luôn sẵn lòng giúp đỡ người khác âm thầm' },
        { type: 'C', text: 'Tỉ mỉ, cẩn trọng, có tư duy hệ thống và kiểm soát chất lượng tốt' }
      ]
    },
    {
      id: 10,
      code: 'FC-10',
      context: 'Khi cần thuyết phục khách hàng hoặc đối tác chấp thuận đề xuất',
      options: [
        { type: 'D', text: 'Nhấn mạnh vào lợi ích cốt lõi, hiệu quả đầu tư (ROI) và cam kết tốc độ' },
        { type: 'I', text: 'Xây dựng thiện cảm cá nhân, vẽ ra bức tranh tầm nhìn hấp dẫn' },
        { type: 'S', text: 'Tạo dựng niềm tin bằng sự chân thành, cam kết đồng hành và hỗ trợ lâu dài' },
        { type: 'C', text: 'Trình bày bảng phân tích số liệu, so sánh chi tiết và chứng minh tính khả thi' }
      ]
    },
    {
      id: 11,
      code: 'FC-11',
      context: 'Khi phát hiện một sai sót nghiêm trọng trong dự án đang chạy',
      options: [
        { type: 'D', text: 'Lập tức chỉ đạo phương án xử lý khẩn cấp để giảm thiểu thiệt hại' },
        { type: 'I', text: 'Trấn an tinh thần cả nhóm và kêu gọi mọi người cùng chung tay giải quyết' },
        { type: 'S', text: 'Bình tĩnh hỗ trợ các thành viên khắc phục từng phần để ổn định tình hình' },
        { type: 'C', text: 'Truy vết nguyên nhân gốc rễ (Root cause) và cập nhật quy trình để không tái diễn' }
      ]
    },
    {
      id: 12,
      code: 'FC-12',
      context: 'Cách bạn quản lý thời gian và danh sách công việc (To-do list)',
      options: [
        { type: 'D', text: 'Ưu tiên các việc tạo ra tác động lớn nhất, giải quyết nhanh gọn từng mục' },
        { type: 'I', text: 'Linh hoạt thay đổi theo cảm hứng và các cuộc trao đổi phát sinh trong ngày' },
        { type: 'S', text: 'Duy trì thói quen làm việc cố định, hoàn thành tuần tự từng việc đã lên lịch' },
        { type: 'C', text: 'Phân loại chi tiết theo mức độ ưu tiên, theo dõi sát sao bằng bảng biểu/checklist' }
      ]
    },
    {
      id: 13,
      code: 'FC-13',
      context: 'Khi góp ý hoặc nhận xét về kết quả làm việc của người khác',
      options: [
        { type: 'D', text: 'Góp ý thẳng thắn, trực diện vào những điểm chưa đạt yêu cầu để sửa ngay' },
        { type: 'I', text: 'Khen ngợi điểm tích cực trước, khích lệ tinh thần rồi mới góp ý nhẹ nhàng' },
        { type: 'S', text: 'Lựa lời khéo léo, góp ý riêng tư để tránh làm tổn thương cảm xúc đối phương' },
        { type: 'C', text: 'Đưa ra nhận xét chi tiết dựa trên tiêu chí đánh giá và bằng chứng cụ thể' }
      ]
    },
    {
      id: 14,
      code: 'FC-14',
      context: 'Môi trường làm việc khiến bạn cảm thấy bức bối hoặc mất hứng thú nhất',
      options: [
        { type: 'D', text: 'Môi trường trì trệ, thiếu quyết đoán và phải xin phép qua quá nhiều tầng nấc' },
        { type: 'I', text: 'Công việc đơn điệu, tách biệt, ít được giao tiếp hay chia sẻ ý tưởng' },
        { type: 'S', text: 'Môi trường cạnh tranh gay gắt, hay thay đổi đột ngột và thiếu sự sẻ chia' },
        { type: 'C', text: 'Làm việc cảm tính, thiếu quy chuẩn rõ ràng và thường xuyên làm ẩu cho xong' }
      ]
    },
    {
      id: 15,
      code: 'FC-15',
      context: 'Khi cần học một kỹ năng hoặc công nghệ mới phục vụ công việc',
      options: [
        { type: 'D', text: 'Học nhanh phần cốt lõi nhất để áp dụng ngay vào thực tế công việc' },
        { type: 'I', text: 'Học qua trao đổi nhóm, workshop tương tác hoặc trải nghiệm trực quan' },
        { type: 'S', text: 'Học theo hướng dẫn từng bước (Step-by-step) và thực hành lặp lại cho quen tay' },
        { type: 'C', text: 'Đọc kỹ tài liệu hướng dẫn chuyên sâu để hiểu rõ bản chất và nguyên lý hoạt động' }
      ]
    },
    {
      id: 16,
      code: 'FC-16',
      context: 'Thái độ của bạn đối với rủi ro khi đưa ra quyết định kinh doanh / công việc',
      options: [
        { type: 'D', text: 'Sẵn sàng chấp nhận rủi ro cao nếu phần thưởng và cơ hội bứt phá đủ lớn' },
        { type: 'I', text: 'Tin tưởng vào trực giác tích cực và khả năng xoay xở tình huống của bản thân' },
        { type: 'S', text: 'Ưu tiên phương án an toàn, đã được kiểm chứng để bảo vệ sự ổn định chung' },
        { type: 'C', text: 'Tính toán kỹ mọi kịch bản rủi ro và luôn chuẩn bị sẵn phương án dự phòng' }
      ]
    },
    {
      id: 17,
      code: 'FC-17',
      context: 'Trong vai trò người dẫn dắt hoặc hướng dẫn thành viên mới',
      options: [
        { type: 'D', text: 'Giao mục tiêu rõ ràng, trao quyền tự chủ và đánh giá dựa trên kết quả đầu ra' },
        { type: 'I', text: 'Truyền lửa nhiệt huyết, kết nối họ với tập thể và khích lệ họ tự tin thể hiện' },
        { type: 'S', text: 'Kiên nhẫn cầm tay chỉ việc, đồng hành sát sao và luôn lắng nghe khó khăn của họ' },
        { type: 'C', text: 'Cung cấp tài liệu quy chuẩn, hướng dẫn quy trình chuẩn xác và kiểm tra định kỳ' }
      ]
    },
    {
      id: 18,
      code: 'FC-18',
      context: 'Khi tham gia các sự kiện giao lưu, tiệc công ty hoặc kết nối (Networking)',
      options: [
        { type: 'D', text: 'Chủ động tiếp cận những người có tầm ảnh hưởng hoặc liên quan đến mục tiêu công việc' },
        { type: 'I', text: 'Hòa nhập nhanh chóng, làm trung tâm của các cuộc trò chuyện sôi nổi' },
        { type: 'S', text: 'Trò chuyện sâu và thân mật với một nhóm nhỏ đồng nghiệp quen thuộc' },
        { type: 'C', text: 'Quan sát nhiều hơn, trao đổi lịch sự và tập trung vào các chủ đề chuyên môn sâu' }
      ]
    },
    {
      id: 19,
      code: 'FC-19',
      context: 'Khi phải xử lý các công việc hành chính, báo cáo hoặc giấy tờ lặp đi lặp lại',
      options: [
        { type: 'D', text: 'Muốn ủy quyền hoặc giải quyết thật nhanh để dành thời gian cho việc chiến lược' },
        { type: 'I', text: 'Dễ cảm thấy nhàm chán, thường kết hợp nghe nhạc hoặc trò chuyện để đỡ khô khan' },
        { type: 'S', text: 'Thực hiện đều đặn, kiên nhẫn và hoàn thành đúng hạn một cách bền bỉ' },
        { type: 'C', text: 'Sắp xếp ngăn nắp, chuẩn hóa biểu mẫu để đảm bảo số liệu chính xác tuyệt đối' }
      ]
    },
    {
      id: 20,
      code: 'FC-20',
      context: 'Khi ý kiến đề xuất của bạn bị cấp trên hoặc tập thể từ chối',
      options: [
        { type: 'D', text: 'Tìm cách bảo vệ quan điểm mạnh mẽ hơn hoặc chứng minh bằng hành động thực tế' },
        { type: 'I', text: 'Nhanh chóng chuyển sang đề xuất ý tưởng mới hấp dẫn hơn và giữ sự hào hứng' },
        { type: 'S', text: 'Vui vẻ chấp nhận quyết định chung để giữ sự đồng thuận của tập thể' },
        { type: 'C', text: 'Rà soát lại số liệu, bổ sung lập luận chặt chẽ hơn để trình bày lại khi phù hợp' }
      ]
    },
    {
      id: 21,
      code: 'FC-21',
      context: 'Cách bạn đặt câu hỏi khi tiếp nhận yêu cầu từ cấp trên hoặc khách hàng',
      options: [
        { type: 'D', text: 'Hỏi tập trung vào "Cần đạt kết quả gì?" và "Khi nào phải xong?"' },
        { type: 'I', text: 'Hỏi về "Ai sẽ cùng tham gia?" và "Ý tưởng này mang lại trải nghiệm thú vị gì?"' },
        { type: 'S', text: 'Hỏi về "Chúng ta sẽ phối hợp hỗ trợ nhau như thế nào để mọi việc êm xuôi?"' },
        { type: 'C', text: 'Hỏi kỹ "Quy trình thực hiện ra sao?" và "Tiêu chuẩn đánh giá chính xác là gì?"' }
      ]
    },
    {
      id: 22,
      code: 'FC-22',
      context: 'Khi đánh giá một sản phẩm hoặc bản kế hoạch trước khi bàn giao',
      options: [
        { type: 'D', text: 'Quan tâm nhất đến tính hiệu quả thực chiến và tốc độ đưa vào vận hành' },
        { type: 'I', text: 'Chú trọng hình thức trình bày bắt mắt, sáng tạo và sức hút truyền thông' },
        { type: 'S', text: 'Đảm bảo sản phẩm thân thiện, dễ sử dụng và nhận được sự hài lòng của mọi bên' },
        { type: 'C', text: 'Kiểm tra tỉ mỉ từng chi tiết kỹ thuật, độ chính xác của dữ liệu và tính tuân thủ' }
      ]
    },
    {
      id: 23,
      code: 'FC-23',
      context: 'Khi rơi vào trạng thái căng thẳng (Stress) kéo dài trong công việc',
      options: [
        { type: 'D', text: 'Trở nên nóng vội, khắt khe hơn và muốn tự mình kiểm soát mọi thứ' },
        { type: 'I', text: 'Dễ phân tán sự tập trung, nói nhiều hơn hoặc phản ứng theo cảm xúc' },
        { type: 'S', text: 'Thu mình lại, ngại va chạm và có xu hướng ôm đồm phần việc về mình' },
        { type: 'C', text: 'Trở nên cầu toàn quá mức, soi xét tiểu tiết và thận trọng đến mức chậm ra quyết định' }
      ]
    },
    {
      id: 24,
      code: 'FC-24',
      context: 'Giá trị cốt lõi bạn luôn hướng tới trong sự nghiệp của mình',
      options: [
        { type: 'D', text: 'Chinh phục đỉnh cao mới, tạo ra tác động mạnh mẽ và làm chủ cuộc chơi' },
        { type: 'I', text: 'Truyền cảm hứng tích cực, xây dựng mạng lưới quan hệ rộng mở và giàu ý nghĩa' },
        { type: 'S', text: 'Xây dựng hậu phương vững chắc, đồng hành bền bỉ và tạo dựng sự bình an' },
        { type: 'C', text: 'Vươn tới sự tinh thông chuyên môn, chuẩn mực chất lượng và giá trị bền vững' }
      ]
    }
  ];

  // ============================================================================
  // 5. MA TRẬN NỘI DUNG HÀNH VI 72 THẺ (DOC-11 MODULAR CONTENT MATRIX)
  // Gồm:
  //   - 28 Thẻ Self-Development (16 thẻ D/I/S/C + 12 thẻ Blend)
  //   - 28 Thẻ Collaboration Manual (7 Context Templates + 7 Recipes + 14 Preferences)
  //   - 16 Thẻ Pair Comparison (4x4 Directional Matrix A -> B)
  // Kèm quy tắc primary_context, secondary_contexts, excluded_contexts (RV-008)
  // ============================================================================
  const VAGA_CONTENT_BANK_72 = [
    // --- A. 16 THẺ SELF-DEVELOPMENT THEO 4 MIỀN D/I/S/C ---
    {
      card_id: 'CB11-SELF-D-01',
      category: 'SELF_DIMENSION',
      dimension: 'D',
      title: 'Tạm dừng 10 giây trước khi chốt phương án trong cuộc họp',
      primary_context: 'meeting',
      secondary_contexts: ['decision'],
      excluded_contexts: ['chat_email'],
      trigger_situation: 'Khi cuộc họp đang thảo luận chậm và bạn muốn chốt ngay lập tức để chuyển sang việc khác.',
      action_behavior: 'Đặt 1 câu hỏi mở: "Còn rủi ro hoặc góc nhìn nào chúng ta chưa tính tới không?" và lắng nghe trọn vẹn 2 ý kiến trước khi kết luận.',
      success_signal: 'Các thành viên nhóm S và C chủ động nêu được rủi ro vận hành ngay trong cuộc họp.',
      overuse_warning: 'Quyết đoán quá mức dễ biến thành áp đặt và làm đồng đội ngừng đóng góp ý kiến.'
    },
    {
      card_id: 'CB11-SELF-D-02',
      category: 'SELF_DIMENSION',
      dimension: 'D',
      title: 'Giải thích rõ "Vì sao" trước khi yêu cầu "Làm gì"',
      primary_context: 'direct_conversation',
      secondary_contexts: ['chat_email', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi gửi tin nhắn hoặc yêu cầu gấp cho đồng nghiệp xử lý một đầu việc mới.',
      action_behavior: 'Bổ sung 1 câu bối cảnh mục tiêu và lý do ưu tiên trước khi nêu deadline và kết quả mong đợi.',
      success_signal: 'Đồng nghiệp hiểu đúng trọng tâm ngay lần đầu, giảm số lần hỏi lại.',
      overuse_warning: 'Giao tiếp quá ngắn gọn dễ khiến người nhận cảm thấy bị ra lệnh.'
    },
    {
      card_id: 'CB11-SELF-D-03',
      category: 'SELF_DIMENSION',
      dimension: 'D',
      title: 'Trao quyền kèm khung tự chủ rõ ràng khi giao việc',
      primary_context: 'delegation',
      secondary_contexts: ['decision'],
      excluded_contexts: ['feedback_recognition', 'chat_email'],
      trigger_situation: 'Khi bàn giao một hạng mục quan trọng và bạn có xu hướng muốn can thiệp sâu vào cách làm khi thấy chậm.',
      action_behavior: 'Thống nhất rõ tiêu chí đầu ra (Definition of Done), mốc check-in giữa kỳ và để người nhận tự chọn cách triển khai.',
      success_signal: 'Hạng mục hoàn thành đúng chuẩn mà bạn không phải trực tiếp làm thay.',
      overuse_warning: 'Ôm quyền kiểm soát khi sốt ruột sẽ làm giảm tính chủ động của đội ngũ.'
    },
    {
      card_id: 'CB11-SELF-D-04',
      category: 'SELF_DIMENSION',
      dimension: 'D',
      title: 'Tách biệt phản biện vấn đề khỏi áp lực cá nhân khi bất đồng',
      primary_context: 'conflict',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi phương án của bạn bị phản박 hoặc tiến độ dự án bị chậm so với cam kết.',
      action_behavior: 'Hạ nhịp giọng nói, tập trung đặt câu hỏi về dữ kiện và giải pháp thay thế thay vì truy vấn lỗi cá nhân.',
      success_signal: 'Cuộc trao đổi giữ được sự cởi mở và tìm ra giải pháp tháo gỡ trong 15 phút.',
      overuse_warning: 'Thẳng thắn quá mức khi căng thẳng dễ gây tổn thương tâm lý an toàn của nhóm.'
    },
    {
      card_id: 'CB11-SELF-I-01',
      category: 'SELF_DIMENSION',
      dimension: 'I',
      title: 'Chốt văn bản tóm tắt 3 gạch đầu dòng sau buổi thảo luận',
      primary_context: 'meeting',
      secondary_contexts: ['chat_email', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Sau một buổi brainstorming hoặc họp nhóm rất sôi nổi với nhiều ý tưởng mới.',
      action_behavior: 'Dành 5 phút cuối buổi họp ghi lại: (1) Việc cần làm, (2) Người phụ trách, (3) Thời hạn hoàn thành và gửi vào nhóm.',
      success_signal: '100% ý tưởng được thống nhất có đầu mối theo dõi thực thi sau cuộc họp.',
      overuse_warning: 'Sự hào hứng nếu thiếu bước chốt hành động sẽ khiến ý tưởng bị rơi rụng.'
    },
    {
      card_id: 'CB11-SELF-I-02',
      category: 'SELF_DIMENSION',
      dimension: 'I',
      title: 'Cấu trúc hóa tin nhắn và email dài thành các mục rõ ràng',
      primary_context: 'chat_email',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn muốn chia sẻ một đề xuất mới hoặc cập nhật tình hình cho đồng nghiệp nhóm D hoặc C.',
      action_behavior: 'Mở đầu bằng câu kết luận/đề xuất chính, sau đó liệt kê tối đa 3 luận điểm kèm số liệu minh họa.',
      success_signal: 'Người đọc nắm bắt ngay đề xuất và phản hồi quyết định nhanh hơn.',
      overuse_warning: 'Diễn đạt lan man theo mạch cảm xúc dễ làm lu mờ thông điệp cốt lõi.'
    },
    {
      card_id: 'CB11-SELF-I-03',
      category: 'SELF_DIMENSION',
      dimension: 'I',
      title: 'Kiểm chứng tính khả thi và nguồn lực trước khi cam kết mới',
      primary_context: 'decision',
      secondary_contexts: ['delegation'],
      excluded_contexts: ['feedback_recognition'],
      trigger_situation: 'Khi được đề nghị nhận thêm một sáng kiến thú vị trong lúc đang có các dự án dở dang.',
      action_behavior: 'Đối chiếu danh sách công việc hiện tại và hỏi ý kiến người phối hợp kỹ thuật trước khi gật đầu nhận lời.',
      success_signal: 'Giữ đúng 100% cam kết tiến độ của các đầu việc đang chạy.',
      overuse_warning: 'Sự lạc quan quá mức dễ dẫn đến ôm đồm và quá tải ở giai đoạn hoàn thiện.'
    },
    {
      card_id: 'CB11-SELF-I-04',
      category: 'SELF_DIMENSION',
      dimension: 'I',
      title: 'Đưa phản hồi cải thiện cụ thể thay vì né tránh điều khó nói',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['conflict'],
      excluded_contexts: [],
      trigger_situation: 'Khi đồng nghiệp làm chưa đạt yêu cầu nhưng bạn ngại góp ý thẳng vì sợ mất vui.',
      action_behavior: 'Sử dụng khung SBI (Tình huống - Hành vi - Tác động) để nêu rõ 1 điểm làm tốt và 1 điểm cần chỉnh sửa cụ thể.',
      success_signal: 'Đồng nghiệp nắm rõ tiêu chuẩn cần cải thiện mà vẫn giữ được sự gắn kết.',
      overuse_warning: 'Khen chung chung mà né tránh góp ý thẳng sẽ làm vấn đề kéo dài.'
    },
    {
      card_id: 'CB11-SELF-S-01',
      category: 'SELF_DIMENSION',
      dimension: 'S',
      title: 'Nêu quan điểm riêng ngay trong nửa đầu cuộc họp',
      primary_context: 'meeting',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi tham gia cuộc họp có nhiều ý kiến mạnh mẽ và bạn có xu hướng chờ mọi người nói hết mới lên tiếng.',
      action_behavior: 'Chuẩn bị trước 2 gạch đầu dòng quan điểm cá nhân và chủ động phát biểu ngay trong 15 phút đầu.',
      success_signal: 'Góc nhìn thực thi bền vững của bạn được đưa vào phương án chung từ sớm.',
      overuse_warning: 'Im lặng chiều theo số đông có thể khiến nhóm bỏ sót rủi ro vận hành thực tế.'
    },
    {
      card_id: 'CB11-SELF-S-02',
      category: 'SELF_DIMENSION',
      dimension: 'S',
      title: 'Nói "Không" hoặc thương lượng lại thứ tự ưu tiên khi quá tải',
      primary_context: 'delegation',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi đồng nghiệp nhờ hỗ trợ gấp nhưng bạn đang phải xử lý các cam kết quan trọng khác.',
      action_behavior: 'Phản hồi rõ: "Hiện tôi đang hoàn thành việc X đến 15h. Sau 15h tôi có thể hỗ trợ phần A, hoặc chúng ta cần thống nhất lại ưu tiên."',
      success_signal: 'Bảo vệ được tiến độ công việc chính mà không bị kiệt sức ngầm.',
      overuse_warning: 'Ôm đồm vì ngại từ chối sẽ dẫn đến quá tải và giảm chất lượng đầu ra.'
    },
    {
      card_id: 'CB11-SELF-S-03',
      category: 'SELF_DIMENSION',
      dimension: 'S',
      title: 'Chủ động làm rõ điểm bất đồng thay vì im lặng chịu đựng',
      primary_context: 'conflict',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn cảm thấy phương án phối hợp chưa hợp lý nhưng ngại tranh luận trực tiếp.',
      action_behavior: 'Đặt lịch trao đổi 1-1 ngắn gọn để nêu rõ lo ngại thực tế và đề xuất phương án điều chỉnh.',
      success_signal: 'Vướng mắc được tháo gỡ sớm thay vì tích tụ thành sự bức bối kéo dài.',
      overuse_warning: 'Né tránh xung đột bề mặt sẽ làm vấn đề âm ỉ và khó xử lý hơn về sau.'
    },
    {
      card_id: 'CB11-SELF-S-04',
      category: 'SELF_DIMENSION',
      dimension: 'S',
      title: 'Chủ động thử nghiệm bước nhỏ khi quy trình thay đổi',
      primary_context: 'decision',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi tổ chức áp dụng công cụ hoặc quy trình mới khiến nhịp làm việc quen thuộc bị xáo trộn.',
      action_behavior: 'Chọn 1 phạm vi nhỏ để áp dụng thử ngay trong 3 ngày đầu và ghi lại các điểm cần hướng dẫn thêm.',
      success_signal: 'Thích nghi nhanh hơn với thay đổi và giúp cả nhóm chuyển đổi êm thấm.',
      overuse_warning: 'Chần chừ quá lâu trước thay đổi có thể làm lỡ nhịp cơ hội của đội nhóm.'
    },
    {
      card_id: 'CB11-SELF-C-01',
      category: 'SELF_DIMENSION',
      dimension: 'C',
      title: 'Áp dụng nguyên tắc "Đủ tốt ở mức 85%" cho các quyết định tốc độ',
      primary_context: 'decision',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn đang trì hoãn việc đưa ra đề xuất vì muốn thu thập thêm dữ liệu cho thật hoàn hảo.',
      action_behavior: 'Đặt giới hạn thời gian phân tích (Time-box), nêu rõ kết luận dựa trên dữ liệu hiện có kèm các giả định cần theo dõi.',
      success_signal: 'Ra quyết định đúng hạn mà không bị rơi vào "tê liệt vì phân tích" (Analysis Paralysis).',
      overuse_warning: 'Cầu toàn tuyệt đối ở mọi quyết định sẽ làm chậm tốc độ phản ứng của tổ chức.'
    },
    {
      card_id: 'CB11-SELF-C-02',
      category: 'SELF_DIMENSION',
      dimension: 'C',
      title: 'Mở đầu bằng kết luận (Bottom-line Up Front) trước khi đi vào chi tiết',
      primary_context: 'chat_email',
      secondary_contexts: ['meeting', 'direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi gửi báo cáo phân tích hoặc trình bày phương án kỹ thuật cho lãnh đạo và các phòng ban khác.',
      action_behavior: 'Viết 3 dòng Tóm tắt điều hành (Kết luận - Tác động - Đề xuất) ở ngay đầu email/báo cáo, phần dữ liệu chi tiết để ở phụ lục.',
      success_signal: 'Các bên liên quan nắm bắt ngay thông điệp chính và duyệt phương án nhanh hơn.',
      overuse_warning: 'Trình bày quá nhiều chi tiết kỹ thuật ngay từ đầu dễ làm người nghe mất phương hướng.'
    },
    {
      card_id: 'CB11-SELF-C-03',
      category: 'SELF_DIMENSION',
      dimension: 'C',
      title: 'Cân bằng giữa chỉ ra lỗi sai và ghi nhận nỗ lực của đồng đội',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi rà soát bản nháp hoặc sản phẩm của đồng nghiệp và phát hiện một số điểm chưa chuẩn xác.',
      action_behavior: 'Ghi nhận rõ những phần đã làm tốt và đúng hướng trước, sau đó phân loại các góp ý thành "Cần sửa bắt buộc" và "Gợi ý tối ưu thêm".',
      success_signal: 'Người nhận tiếp thu phản hồi tích cực, không cảm thấy bị bắt lỗi khắt khe.',
      overuse_warning: 'Chỉ tập trung vào các điểm sai sót dễ làm giảm nhiệt huyết sáng tạo của đồng nghiệp.'
    },
    {
      card_id: 'CB11-SELF-C-04',
      category: 'SELF_DIMENSION',
      dimension: 'C',
      title: 'Chuyển từ tranh luận đúng - sai sang cùng tìm giải pháp khả thi',
      primary_context: 'conflict',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi xảy ra bất đồng về phương pháp kỹ thuật hoặc quy trình giữa các bộ phận.',
      action_behavior: 'Đặt câu hỏi: "Trong giới hạn nguồn lực hiện tại, phương án nào vừa kiểm soát được rủi ro chính vừa đáp ứng tiến độ chung?"',
      success_signal: 'Đạt được thỏa thuận thực thi chung mà không làm căng thẳng mối quan hệ liên phòng ban.',
      overuse_warning: 'Bảo vệ tiêu chuẩn lý thuyết một cách cứng nhắc có thể gây tắc nghẽn phối hợp.'
    },

    // --- B. 12 THẺ SELF-DEVELOPMENT CHO 12 PHONG CÁCH PHA TRỘN (BLENDS) ---
    {
      card_id: 'CB11-BLEND-DI-01',
      category: 'SELF_BLEND',
      dimension: 'DI',
      title: 'Kiểm tra bước chuyển giao thực thi sau khi khởi xướng đột phá',
      primary_context: 'delegation',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn vừa thuyết phục nhóm thông qua một mục tiêu tăng trưởng đầy tham vọng.',
      action_behavior: 'Thiết lập bảng phân công chi tiết và mốc kiểm tra tuần đầu tiên cùng thành viên nhóm S/C.',
      success_signal: 'Dự án giữ được đà thực thi bền bỉ sau giai đoạn hào hứng ban đầu.',
      overuse_warning: 'Nhịp độ quá nhanh của DI có thể khiến đội ngũ thực thi hụt hơi vì thiếu quy trình.'
    },
    {
      card_id: 'CB11-BLEND-ID-01',
      category: 'SELF_BLEND',
      dimension: 'ID',
      title: 'Chuyển hóa năng lượng truyền cảm hứng thành cam kết đo lường được',
      primary_context: 'decision',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi kết thúc phiên thảo luận sáng tạo với nhiều hướng đi hấp dẫn.',
      action_behavior: 'Chọn tối đa 2 ưu tiên trọng tâm và gắn chỉ số đo lường cụ thể cho từng ưu tiên.',
      success_signal: 'Tập trung nguồn lực tạo ra kết quả thực tế thay vì dàn trải.',
      overuse_warning: 'Thích mở mới liên tục dễ làm giảm tỷ lệ hoàn thành trọn vẹn.'
    },
    {
      card_id: 'CB11-BLEND-IS-01',
      category: 'SELF_BLEND',
      dimension: 'IS',
      title: 'Giữ vững tiêu chuẩn kết quả khi hỗ trợ và khích lệ đồng đội',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi một thành viên liên tục trễ hạn nhưng bạn ngại nhắc nhở nghiêm khắc.',
      action_behavior: 'Trao đổi chân thành nhưng nêu rõ tiêu chuẩn bắt buộc và hậu quả đối với tiến độ chung của nhóm.',
      success_signal: 'Vừa giữ được sự ấm áp, vừa đảm bảo kỷ luật thực thi của tập thể.',
      overuse_warning: 'Quá ưu tiên cảm xúc dễ dẫn đến nể nang và giảm hiệu suất chung.'
    },
    {
      card_id: 'CB11-BLEND-SI-01',
      category: 'SELF_BLEND',
      dimension: 'SI',
      title: 'Đưa ra quyết định dứt khoát khi không thể làm hài lòng tất cả',
      primary_context: 'decision',
      secondary_contexts: ['conflict'],
      excluded_contexts: [],
      trigger_situation: 'Khi có hai luồng ý kiến trái ngược và việc chờ đồng thuận tuyệt đối làm chậm tiến độ.',
      action_behavior: 'Lắng nghe công bằng hai phía, sau đó chọn phương án phục vụ tốt nhất cho mục tiêu chung và giải thích rõ lý do.',
      success_signal: 'Nhóm thoát khỏi trạng thái lưỡng lự và bắt tay vào hành động.',
      overuse_warning: 'Cố chiều lòng mọi phía sẽ làm mất thời điểm vàng để quyết định.'
    },
    {
      card_id: 'CB11-BLEND-SC-01',
      category: 'SELF_BLEND',
      dimension: 'SC',
      title: 'Chủ động lên tiếng sớm khi thấy rủi ro quy trình hoặc tiến độ',
      primary_context: 'meeting',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn nhận thấy kế hoạch có điểm chưa khả thi nhưng chưa hoàn thiện đủ 100% số liệu.',
      action_behavior: 'Chia sẻ ngay cảnh báo sớm (Early Flag) ở mức 70% thông tin để cả nhóm cùng điều chỉnh kịp thời.',
      success_signal: 'Ngăn chặn được sai sót lớn từ sớm thay vì chờ đến khi có đủ bằng chứng mới nói.',
      overuse_warning: 'Sự thận trọng kép của SC có thể làm chậm tốc độ cảnh báo trong môi trường nhanh.'
    },
    {
      card_id: 'CB11-BLEND-CS-01',
      category: 'SELF_BLEND',
      dimension: 'CS',
      title: 'Tăng tính linh hoạt khi xử lý các yêu cầu phát sinh ngoài chuẩn',
      primary_context: 'delegation',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi có yêu cầu đột xuất từ khách hàng/dự án chưa nằm trong quy trình chuẩn hiện hành.',
      action_behavior: 'Đề xuất một giải pháp tạm thời an toàn (Workaround) trong 24h trước khi chuẩn hóa quy trình dài hạn.',
      success_signal: 'Đáp ứng kịp thời nhu cầu thực tế mà vẫn kiểm soát được rủi ro.',
      overuse_warning: 'Bám quá chặt vào quy trình tĩnh có thể gây chậm trễ trong tình huống khẩn cấp.'
    },
    {
      card_id: 'CB11-BLEND-CD-01',
      category: 'SELF_BLEND',
      dimension: 'CD',
      title: 'Tăng cường giải thích thiện chí khi phản biện bằng dữ liệu sắc bén',
      primary_context: 'conflict',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn chỉ ra lỗi logic hoặc hiệu suất kém trong bản đề xuất của đồng nghiệp.',
      action_behavior: 'Khẳng định mục tiêu chung là nâng cao chất lượng dự án và đề xuất cùng phối hợp tháo gỡ trước khi nêu các điểm lỗi.',
      success_signal: 'Đồng nghiệp đón nhận phản biện kỹ thuật một cách cởi mở, hợp tác.',
      overuse_warning: 'Sự kết hợp giữa tiêu chuẩn khắt khe (C) và thẳng thắn (D) dễ gây cảm giác lạnh lùng, áp lực.'
    },
    {
      card_id: 'CB11-BLEND-DC-01',
      category: 'SELF_BLEND',
      dimension: 'DC',
      title: 'Tạo không gian cho thử nghiệm sáng tạo và lắng nghe cảm nhận đội ngũ',
      primary_context: 'meeting',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi điều hành buổi họp giải quyết vấn đề và bạn đã có sẵn đáp án trong đầu.',
      action_behavior: 'Dành 10 phút đầu để các thành viên chia sẻ ý tưởng mới mà không phán xét hay bác bỏ ngay.',
      success_signal: 'Khơi dậy được sự chủ động và các sáng kiến cải tiến từ đội ngũ.',
      overuse_warning: 'Vừa đòi hỏi tốc độ cao vừa yêu cầu chuẩn xác tuyệt đối dễ làm người khác căng thẳng.'
    },
    {
      card_id: 'CB11-BLEND-D-PURE',
      category: 'SELF_BLEND',
      dimension: 'D',
      title: 'Lắng nghe phản hồi chiều sâu từ đội ngũ thực thi mỗi tuần',
      primary_context: 'direct_conversation',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Trong các buổi 1-on-1 định kỳ với thành viên nhóm.',
      action_behavior: 'Dành 70% thời lượng để lắng nghe khó khăn thực tế và hỏi "Tôi có thể hỗ trợ gì để bạn làm việc thuận lợi hơn?"',
      success_signal: 'Tăng mức độ tin cậy và gắn kết của các thành viên trong nhóm.',
      overuse_warning: 'Chỉ tập trung kiểm tra kết quả số học dễ bỏ qua các rào cản con người.'
    },
    {
      card_id: 'CB11-BLEND-I-PURE',
      category: 'SELF_BLEND',
      dimension: 'I',
      title: 'Theo dõi đến cùng việc thực thi các cam kết sau cuộc họp',
      primary_context: 'delegation',
      secondary_contexts: ['chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Sau khi khởi động dự án và bước vào giai đoạn vận hành chi tiết hàng ngày.',
      action_behavior: 'Đặt lịch rà soát checklist tiến độ 2 lần/tuần và hoàn tất dứt điểm từng hạng mục trước khi mở việc mới.',
      success_signal: 'Tỷ lệ hoàn thành đúng hạn các đầu việc chi tiết tăng rõ rệt.',
      overuse_warning: 'Thiếu kỷ luật theo dõi chi tiết sẽ làm giảm uy tín thực thi.'
    },
    {
      card_id: 'CB11-BLEND-S-PURE',
      category: 'SELF_BLEND',
      dimension: 'S',
      title: 'Tập thói quen đưa ra đề xuất cải tiến chủ động mỗi tháng',
      primary_context: 'decision',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc trong một quy trình ổn định đã quen thuộc lâu ngày.',
      action_behavior: 'Mỗi tháng chủ động đề xuất ít nhất 1 cải tiến nhỏ giúp tiết kiệm thời gian hoặc nâng cao trải nghiệm phối hợp.',
      success_signal: 'Tạo dựng hình ảnh chủ động đóng góp giá trị mới cho tập thể.',
      overuse_warning: 'Quá quen với vùng an toàn có thể làm giảm sức bật đổi mới cá nhân.'
    },
    {
      card_id: 'CB11-BLEND-C-PURE',
      category: 'SELF_BLEND',
      dimension: 'C',
      title: 'Tăng tốc độ chia sẻ bản nháp sớm (Early Draft) để lấy phản hồi',
      primary_context: 'delegation',
      secondary_contexts: ['chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Khi đang xây dựng tài liệu chuyên môn hoặc phương án kỹ thuật phức tạp.',
      action_behavior: 'Chia sẻ khung sườn (Outline 30%) với người liên quan để chốt hướng đi trước khi đầu tư thời gian hoàn thiện 100%.',
      success_signal: 'Tiết kiệm thời gian chỉnh sửa và tăng tốc độ phối hợp liên phòng ban.',
      overuse_warning: 'Làm âm thầm một mình đến phút cuối mới trình bày dễ dẫn đến lệch kỳ vọng.'
    },

    // --- C. 28 THẺ COLLABORATION MANUAL (7 CONTEXT TEMPLATES + 7 RECIPES + 14 PREFERENCES) ---
    {
      card_id: 'CB11-MAN-CTX-01',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Giao tiếp trực tiếp 1-1',
      primary_context: 'direct_conversation',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi đồng nghiệp muốn gặp trực tiếp để trao đổi công việc.',
      action_behavior: 'Nêu rõ mục tiêu cuộc trao đổi ngay câu đầu tiên, thời lượng dự kiến và kết quả cần thống nhất.',
      success_signal: 'Cuộc trao đổi ngắn gọn, đúng trọng tâm và tôn trọng thời gian của nhau.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-02',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Tin nhắn & Email công việc',
      primary_context: 'chat_email',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi gửi tin nhắn chat hoặc email phối hợp hàng ngày.',
      action_behavior: 'Ghi rõ [Mục đích / Cần phản hồi trước thời gian nào] ở dòng đầu, dùng gạch đầu dòng cho các ý chính.',
      success_signal: 'Không bị trôi tin nhắn quan trọng và giảm việc hỏi đi hỏi lại.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-03',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Họp hành & Thảo luận nhóm',
      primary_context: 'meeting',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi mời tham gia họp hoặc điều phối thảo luận nhóm.',
      action_behavior: 'Gửi trước agenda và tài liệu tối thiểu 2 giờ; chốt rõ người phụ trách và deadline ở cuối buổi họp.',
      success_signal: 'Cuộc họp hiệu quả, mọi thành viên đều có sự chuẩn bị tốt.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-04',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Ra quyết định & Phê duyệt',
      primary_context: 'decision',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi cần trình duyệt phương án hoặc cùng đưa ra quyết định.',
      action_behavior: 'Đưa ra 2 phương án kèm ưu/nhược điểm, dữ liệu cốt lõi và đề xuất phương án ưu tiên của bạn.',
      success_signal: 'Rút ngắn thời gian cân nhắc và nâng cao chất lượng quyết định.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-05',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Giải quyết bất đồng & Tranh luận',
      primary_context: 'conflict',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi hai bên có góc nhìn khác nhau về mục tiêu hoặc cách làm.',
      action_behavior: 'Tập trung vào mục tiêu chung và dữ kiện thực tế; trao đổi riêng 1-1 thay vì tranh luận căng thẳng trên kênh chat chung.',
      success_signal: 'Giải quyết được gốc rễ vấn đề mà vẫn giữ được sự tôn trọng lẫn nhau.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-06',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Giao việc & Phối hợp tiến độ',
      primary_context: 'delegation',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi bàn giao đầu việc hoặc phối hợp liên phòng ban.',
      action_behavior: 'Làm rõ kết quả đầu ra mong đợi, thời hạn, mức độ ưu tiên và chủ động báo sớm nếu có nguy cơ trễ tiến độ.',
      success_signal: 'Phối hợp trôi chảy, không có bất ngờ vào phút chót.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-CTX-07',
      category: 'MANUAL_CONTEXT_TEMPLATE',
      dimension: 'ALL',
      title: 'Mẫu hướng dẫn: Phản hồi & Ghi nhận đóng góp',
      primary_context: 'feedback_recognition',
      secondary_contexts: [],
      excluded_contexts: [],
      trigger_situation: 'Khi góp ý cải thiện hoặc ghi nhận kết quả công việc.',
      action_behavior: 'Góp ý thẳng thắn, kịp thời dựa trên tình huống cụ thể; ghi nhận đúng nỗ lực và giá trị thực tế tạo ra.',
      success_signal: 'Xây dựng văn hóa phản hồi văn minh và giúp nhau tiến bộ.',
      overuse_warning: ''
    },

    // 7 Manual Recipes (CB11-MAN-REC-01..07)
    {
      card_id: 'CB11-MAN-REC-01',
      category: 'MANUAL_RECIPE',
      dimension: 'D',
      title: 'Cẩm nang 1 phút cho người ưu tiên Tốc độ & Kết quả (D)',
      primary_context: 'direct_conversation',
      secondary_contexts: ['decision', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc với đồng nghiệp có xu hướng D cao.',
      action_behavior: 'Đi thẳng vào kết luận và mục tiêu; chuẩn bị sẵn phương án giải quyết thay vì chỉ nêu khó khăn.',
      success_signal: 'Chốt việc nhanh gọn trong 5 phút.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-02',
      category: 'MANUAL_RECIPE',
      dimension: 'I',
      title: 'Cẩm nang 1 phút cho người ưu tiên Kết nối & Sáng kiến (I)',
      primary_context: 'meeting',
      secondary_contexts: ['direct_conversation', 'feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc với đồng nghiệp có xu hướng I cao.',
      action_behavior: 'Tạo không gian trao đổi cởi mở, lắng nghe ý tưởng mới và cùng chốt lại các bước hành động cụ thể bằng văn bản.',
      success_signal: 'Khai thác tối đa sự sáng tạo và giữ đúng cam kết tiến độ.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-03',
      category: 'MANUAL_RECIPE',
      dimension: 'S',
      title: 'Cẩm nang 1 phút cho người ưu tiên Ổn định & Đồng hành (S)',
      primary_context: 'delegation',
      secondary_contexts: ['conflict', 'direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc với đồng nghiệp có xu hướng S cao.',
      action_behavior: 'Trao đổi chân thành, thông báo trước các thay đổi và làm rõ lộ trình từng bước thay vì thúc ép đột ngột.',
      success_signal: 'Xây dựng sự tin cậy cao và phối hợp bền bỉ.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-04',
      category: 'MANUAL_RECIPE',
      dimension: 'C',
      title: 'Cẩm nang 1 phút cho người ưu tiên Chuẩn xác & Logic (C)',
      primary_context: 'chat_email',
      secondary_contexts: ['decision', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc với đồng nghiệp có xu hướng C cao.',
      action_behavior: 'Cung cấp đầy đủ dữ liệu, tiêu chuẩn chất lượng và cho họ khoảng thời gian hợp lý để rà soát trước khi chốt.',
      success_signal: 'Đạt chất lượng đầu ra chuẩn xác và thuyết phục.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-05',
      category: 'MANUAL_RECIPE',
      dimension: 'DI',
      title: 'Cẩm nang phối hợp khi khởi động dự án mới (Kick-off)',
      primary_context: 'meeting',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bắt đầu làm việc cùng nhau trong một dự án liên phòng ban.',
      action_behavior: 'Dành 10 phút đầu chia sẻ Cẩm nang cộng tác của nhau để thống nhất kênh liên lạc, nhịp cập nhật và cách xử lý vướng mắc.',
      success_signal: 'Giảm 50% hiểu lầm về phong cách giao tiếp trong 2 tuần đầu.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-06',
      category: 'MANUAL_RECIPE',
      dimension: 'SC',
      title: 'Cẩm nang phối hợp khi nghiệm thu & kiểm soát chất lượng',
      primary_context: 'decision',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi rà soát sản phẩm trước khi phát hành hoặc bàn giao.',
      action_behavior: 'Đối chiếu theo danh sách tiêu chí đã thống nhất từ đầu (Acceptance Criteria) và phản hồi bằng dẫn chứng cụ thể.',
      success_signal: 'Nghiệm thu minh bạch, khách quan và nhanh chóng.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-REC-07',
      category: 'MANUAL_RECIPE',
      dimension: 'ALL',
      title: 'Cẩm nang phối hợp cho hồ sơ Cân bằng / Linh hoạt',
      primary_context: 'direct_conversation',
      secondary_contexts: ['meeting', 'chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Khi làm việc với đồng nghiệp có phong cách linh hoạt theo ngữ cảnh.',
      action_behavior: 'Làm rõ tính chất của nhiệm vụ hiện tại (cần tốc độ nhanh hay cần độ chính xác sâu) để cùng điều chỉnh nhịp phối hợp.',
      success_signal: 'Thích ứng mượt mà với từng giai đoạn của dự án.',
      overuse_warning: ''
    },

    // 14 Owner-Confirmed Preference Cards (CB11-MAN-PREF-01..14)
    {
      card_id: 'CB11-MAN-PREF-01',
      category: 'MANUAL_PREFERENCE',
      dimension: 'D',
      title: 'Ưu tiên thông điệp BLUF (Kết luận ở ngay dòng đầu)',
      primary_context: 'chat_email',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi gửi tin nhắn hoặc email xin ý kiến.',
      action_behavior: 'Hãy bắt đầu bằng câu hỏi cần chốt hoặc kết luận chính trước khi giải thích chi tiết.',
      success_signal: 'Tôi có thể đọc và phản hồi ngay trong 1-2 phút.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-02',
      category: 'MANUAL_PREFERENCE',
      dimension: 'D',
      title: 'Đề xuất giải pháp đi kèm khi báo cáo vấn đề',
      primary_context: 'delegation',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi phát sinh vướng mắc làm ảnh hưởng tiến độ.',
      action_behavior: 'Hãy báo sớm kèm theo ít nhất 1-2 phương án xử lý mà bạn đề xuất.',
      success_signal: 'Chúng ta chốt được hướng tháo gỡ ngay lập tức.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-03',
      category: 'MANUAL_PREFERENCE',
      dimension: 'I',
      title: 'Trao đổi nhanh 5 phút trực tiếp/gọi điện khi việc phức tạp',
      primary_context: 'direct_conversation',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi nhắn tin qua lại quá 4-5 lượt mà chưa thống nhất được ý tưởng.',
      action_behavior: 'Hãy gọi nhanh hoặc trao đổi trực tiếp 5 phút để thông suốt ý tưởng rồi chốt lại bằng tin nhắn.',
      success_signal: 'Tránh hiểu lầm ý tứ và giữ năng lượng hợp tác tích cực.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-04',
      category: 'MANUAL_PREFERENCE',
      dimension: 'I',
      title: 'Ghi nhận công khai và phản hồi cải thiện mang tính xây dựng',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi tổng kết dự án hoặc đánh giá kết quả phối hợp.',
      action_behavior: 'Tôi trân trọng sự ghi nhận nhiệt thành trước nhóm và những góp ý thẳng thắn, thiện chí khi trao đổi 1-1.',
      success_signal: 'Tạo động lực mạnh mẽ để cống hiến và cải thiện.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-05',
      category: 'MANUAL_PREFERENCE',
      dimension: 'S',
      title: 'Thông báo trước bối cảnh khi có thay đổi ưu tiên đột xuất',
      primary_context: 'delegation',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi cần thay đổi kế hoạch hoặc chèn việc gấp.',
      action_behavior: 'Hãy giải thích ngắn gọn lý do thay đổi và cùng tôi sắp xếp lại thứ tự ưu tiên các việc đang chạy.',
      success_signal: 'Tôi chủ động điều chỉnh lịch trình êm thấm mà không bị bị động.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-06',
      category: 'MANUAL_PREFERENCE',
      dimension: 'S',
      title: 'Trao đổi riêng 1-1 với thái độ tôn trọng khi có bất đồng',
      primary_context: 'conflict',
      secondary_contexts: ['feedback_recognition'],
      excluded_contexts: [],
      trigger_situation: 'Khi có điểm chưa thống nhất hoặc cần góp ý điều chỉnh.',
      action_behavior: 'Hãy trao đổi riêng với tôi một cách bình tĩnh, chân thành thay vì gây áp lực căng thẳng trước đám đông.',
      success_signal: 'Tôi lắng nghe trọn vẹn và phối hợp điều chỉnh rất nhanh.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-07',
      category: 'MANUAL_PREFERENCE',
      dimension: 'C',
      title: 'Gửi trước tài liệu & số liệu trước cuộc họp quan trọng',
      primary_context: 'meeting',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi cần tôi đưa ra đánh giá chuyên môn hoặc phê duyệt phương án trong cuộc họp.',
      action_behavior: 'Hãy gửi trước agenda và tài liệu liên quan để tôi có thời gian nghiên cứu kỹ trước khi họp.',
      success_signal: 'Tôi đưa ra được các nhận định sâu sắc và chính xác ngay trong buổi họp.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-08',
      category: 'MANUAL_PREFERENCE',
      dimension: 'C',
      title: 'Làm rõ tiêu chí nghiệm thu (Definition of Done) ngay khi giao việc',
      primary_context: 'delegation',
      secondary_contexts: ['chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Khi bắt đầu một hạng mục công việc hoặc yêu cầu kỹ thuật.',
      action_behavior: 'Hãy nêu rõ các thông số yêu cầu, phạm vi và tiêu chuẩn đánh giá hoàn thành bằng văn bản.',
      success_signal: 'Sản phẩm bàn giao đạt chuẩn ngay từ lần đầu tiên.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-09',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Khung giờ tập trung sâu (Deep Work) không bị ngắt quãng',
      primary_context: 'chat_email',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi tôi đang trong khung giờ xử lý chuyên môn sâu.',
      action_behavior: 'Với việc không khẩn cấp, hãy để lại tin nhắn đầy đủ nội dung; nếu khẩn cấp hãy gọi trực tiếp.',
      success_signal: 'Đảm bảo chất lượng công việc chuyên sâu và vẫn phản hồi kịp việc gấp.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-10',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Minh bạch ngay khi có nguy cơ chậm deadline',
      primary_context: 'delegation',
      secondary_contexts: ['direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi một đầu việc phối hợp có dấu hiệu gặp trở ngại.',
      action_behavior: 'Hãy báo cho tôi trước ít nhất 24h trước hạn chót để chúng ta cùng điều chỉnh phương án hỗ trợ.',
      success_signal: 'Luôn làm chủ được tiến độ chung của dự án.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-11',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Góp ý dựa trên dữ kiện cụ thể và hướng tới giải pháp',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['conflict'],
      excluded_contexts: [],
      trigger_situation: 'Khi cần phản hồi để cải thiện chất lượng công việc.',
      action_behavior: 'Hãy chỉ rõ ví dụ thực tế và kỳ vọng tiếp theo thay vì nhận xét cảm tính chung chung.',
      success_signal: 'Cải thiện nhanh, rõ ràng và không gây hiểu lầm.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-12',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Tôn trọng phạm vi tự chủ sau khi đã thống nhất mục tiêu',
      primary_context: 'delegation',
      secondary_contexts: ['decision'],
      excluded_contexts: [],
      trigger_situation: 'Trong quá trình triển khai công việc đã được phân công.',
      action_behavior: 'Sau khi chốt mục tiêu và các mốc cập nhật, hãy để tôi chủ động phương pháp thực hiện chi tiết.',
      success_signal: 'Phát huy tối đa trách nhiệm và tính sáng tạo cá nhân.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-13',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Chốt biên bản hành động ngắn gọn sau mỗi cuộc họp',
      primary_context: 'meeting',
      secondary_contexts: ['chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Khi kết thúc buổi họp hoặc thảo luận liên bộ phận.',
      action_behavior: 'Cùng xác nhận lại danh sách Action Items (Ai làm - Việc gì - Khi nào xong) trên nhóm chung.',
      success_signal: 'Mọi bên đều nắm thống nhất một nguồn thông tin chuẩn.',
      overuse_warning: ''
    },
    {
      card_id: 'CB11-MAN-PREF-14',
      category: 'MANUAL_PREFERENCE',
      dimension: 'ALL',
      title: 'Đặt câu hỏi làm rõ kỳ vọng trước khi bắt tay thực hiện',
      primary_context: 'direct_conversation',
      secondary_contexts: ['delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi nhận một đề bài mới còn nhiều điểm mở.',
      action_behavior: 'Tôi thường hỏi lại 2-3 câu để xác nhận đúng mục tiêu và mức độ ưu tiên trước khi triển khai.',
      success_signal: 'Tránh làm sai hướng hoặc lãng phí nguồn lực.',
      overuse_warning: ''
    },

    // --- D. 16 THẺ PAIR COMPARISON (MA TRẬN 4x4 CÓ HƯỚNG A -> B) ---
    {
      card_id: 'CB11-PAIR-D-D',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'D->D',
      title: 'Phối hợp D → D: Phân định rõ phạm vi quyết định để cộng hưởng tốc độ',
      primary_context: 'decision',
      secondary_contexts: ['delegation', 'conflict'],
      excluded_contexts: [],
      trigger_situation: 'Khi cả hai cùng quyết đoán, nhịp nhanh và muốn tự chủ điều phối.',
      action_behavior: 'Thống nhất rõ ranh giới quyền quyết định của từng người ngay từ đầu; đi thẳng vào mục tiêu chung khi tranh luận.',
      success_signal: 'Ra quyết định cực nhanh mà không va chạm quyền kiểm soát.',
      overuse_warning: 'Tránh biến cuộc thảo luận thành cuộc đua thắng - thua cá nhân.'
    },
    {
      card_id: 'CB11-PAIR-D-I',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'D->I',
      title: 'Phối hợp D → I: Dành không gian cho ý tưởng trước khi chốt cam kết',
      primary_context: 'meeting',
      secondary_contexts: ['direct_conversation', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (D) muốn đi thẳng vào kết quả còn đồng nghiệp (I) muốn chia sẻ ý tưởng và kết nối.',
      action_behavior: 'Lắng nghe và ghi nhận ý tưởng sáng tạo của họ trong 5 phút đầu, sau đó cùng họ tóm tắt lại thành 2-3 bước thực thi có thời hạn.',
      success_signal: 'Giữ được nhiệt huyết của đồng nghiệp I mà vẫn đảm bảo tiến độ thực chất.',
      overuse_warning: 'Tránh cắt ngang hoặc gạt bỏ ý tưởng quá phũ phàng.'
    },
    {
      card_id: 'CB11-PAIR-D-S',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'D->S',
      title: 'Phối hợp D → S: Giảm nhịp áp lực và giải thích rõ bối cảnh thay đổi',
      primary_context: 'delegation',
      secondary_contexts: ['conflict', 'direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (D) thúc đẩy tiến độ nhanh còn đồng nghiệp (S) cần sự ổn định và lộ trình rõ ràng.',
      action_behavior: 'Nêu rõ lý do của sự thay đổi, chia mục tiêu lớn thành các bước tuần tự và chủ động hỏi ý kiến họ một cách chân thành.',
      success_signal: 'Đồng nghiệp S cảm thấy an tâm và đồng hành bền bỉ, đáng tin cậy.',
      overuse_warning: 'Tránh thúc ép đột ngột khiến họ im lặng nhận lời nhưng quá tải.'
    },
    {
      card_id: 'CB11-PAIR-D-C',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'D->C',
      title: 'Phối hợp D → C: Cung cấp dữ kiện và thời gian rà soát chất lượng',
      primary_context: 'decision',
      secondary_contexts: ['chat_email', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (D) muốn quyết nhanh còn đồng nghiệp (C) cần kiểm tra dữ liệu và rủi ro kỹ lưỡng.',
      action_behavior: 'Nêu rõ tiêu chí cốt lõi, cung cấp thông tin đầu vào đầy đủ và tôn trọng các cảnh báo rủi ro có căn cứ của họ.',
      success_signal: 'Kết hợp được tốc độ bứt phá của D với sự chuẩn xác, an toàn của C.',
      overuse_warning: 'Tránh ép họ ký duyệt ngay khi chưa có thông số tối thiểu.'
    },
    {
      card_id: 'CB11-PAIR-I-D',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'I->D',
      title: 'Phối hợp I → D: Đi thẳng vào kết quả cốt lõi và giải pháp đề xuất',
      primary_context: 'direct_conversation',
      secondary_contexts: ['meeting', 'decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (I) trình bày ý tưởng cho đồng nghiệp (D) có quỹ thời gian hạn hẹp.',
      action_behavior: 'Mở đầu bằng kết quả kỳ vọng và tác động thực tế trong 60 giây đầu; hạn chế kể chuyện lan man.',
      success_signal: 'Nhận được sự ủng hộ và quyết định phê duyệt nhanh chóng từ đồng nghiệp D.',
      overuse_warning: 'Tránh hứa hẹn cảm tính mà thiếu cam kết thời hạn cụ thể.'
    },
    {
      card_id: 'CB11-PAIR-I-I',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'I->I',
      title: 'Phối hợp I → I: Chốt văn bản hành động để biến hứng khởi thành kết quả',
      primary_context: 'meeting',
      secondary_contexts: ['delegation', 'chat_email'],
      excluded_contexts: [],
      trigger_situation: 'Khi cả hai cùng hào hứng tung hứng rất nhiều ý tưởng mới.',
      action_behavior: 'Chỉ định 1 người ghi chép lại 3 đầu việc ưu tiên nhất kèm deadline cụ thể trước khi kết thúc cuộc trò chuyện.',
      success_signal: 'Các ý tưởng hay được hiện thực hóa trọn vẹn thay vì bị quên lãng.',
      overuse_warning: 'Tránh mở quá nhiều đầu việc mới cùng lúc mà không ai theo dõi chi tiết.'
    },
    {
      card_id: 'CB11-PAIR-I-S',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'I->S',
      title: 'Phối hợp I → S: Chậm lại để lắng nghe và giữ cam kết thực thi ổn định',
      primary_context: 'delegation',
      secondary_contexts: ['direct_conversation', 'meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (I) muốn xoay chuyển ý tưởng nhanh còn đồng nghiệp (S) đang thực hiện theo kế hoạch.',
      action_behavior: 'Lắng nghe kỹ những vướng mắc vận hành của họ, hạn chế thay đổi yêu cầu liên tục vào phút chót.',
      success_signal: 'Xây dựng mối quan hệ hợp tác ấm áp, ăn ý và hoàn thành tốt công việc.',
      overuse_warning: 'Tránh để đồng nghiệp S phải âm thầm dọn dẹp các chi tiết bị bỏ sót.'
    },
    {
      card_id: 'CB11-PAIR-I-C',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'I->C',
      title: 'Phối hợp I → C: Chuẩn bị số liệu dẫn chứng và cấu trúc hóa đề xuất',
      primary_context: 'chat_email',
      secondary_contexts: ['decision', 'meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (I) cần thuyết phục đồng nghiệp (C) về một sáng kiến hoặc thay đổi mới.',
      action_behavior: 'Trình bày đề xuất bằng văn bản có cấu trúc logic, đính kèm dữ liệu thực tế và phân tích sẵn các rủi ro.',
      success_signal: 'Đồng nghiệp C tin tưởng vào tính khả thi và hỗ trợ hoàn thiện giải pháp.',
      overuse_warning: 'Tránh dùng lời nói phóng đại hoặc cảm tính thay cho số liệu.'
    },
    {
      card_id: 'CB11-PAIR-S-D',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'S->D',
      title: 'Phối hợp S → D: Nêu thẳng kết luận, tiến độ và chủ động đề xuất phương án',
      primary_context: 'direct_conversation',
      secondary_contexts: ['decision', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (S) báo cáo tiến độ hoặc trao đổi vướng mắc với đồng nghiệp (D).',
      action_behavior: 'Đi thẳng vào trạng thái hiện tại, nêu rõ rủi ro nếu có và đề xuất ngay phương án xử lý ngắn gọn.',
      success_signal: 'Cuộc trao đổi hiệu quả, không bị đồng nghiệp D hiểu nhầm là thiếu quyết đoán.',
      overuse_warning: 'Tránh rào đón quá dài hoặc im lặng khi không đồng tình.'
    },
    {
      card_id: 'CB11-PAIR-S-I',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'S->I',
      title: 'Phối hợp S → I: Hưởng ứng ý tưởng tích cực và giúp chốt các bước tiếp theo',
      primary_context: 'meeting',
      secondary_contexts: ['delegation', 'direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi đồng nghiệp (I) đang chia sẻ một kế hoạch mới đầy hào hứng.',
      action_behavior: 'Ghi nhận điểm hay của ý tưởng, sau đó nhẹ nhàng đặt câu hỏi để cùng họ xác định lộ trình triển khai từng bước.',
      success_signal: 'Vừa giữ được không khí sôi nổi vừa chuyển hóa thành kế hoạch khả thi.',
      overuse_warning: 'Tránh im lặng скептик hoặc nhận hết phần việc hậu cần về mình.'
    },
    {
      card_id: 'CB11-PAIR-S-S',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'S->S',
      title: 'Phối hợp S → S: Chủ động chốt quyết định và nói thẳng những điểm cần đổi mới',
      primary_context: 'decision',
      secondary_contexts: ['conflict', 'meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi cả hai cùng ưu tiên sự hài hòa và nhường nhịn nhau khi cần ra quyết định khó.',
      action_behavior: 'Đặt thời hạn rõ ràng để chốt phương án và khuyến khích nhau nêu thẳng các góc nhìn phản biện.',
      success_signal: 'Tránh được sự trì trệ do cả nể và nâng cao tốc độ xử lý.',
      overuse_warning: 'Tránh né tránh vấn đề gai góc chỉ để giữ hòa khí bề mặt.'
    },
    {
      card_id: 'CB11-PAIR-S-C',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'S->C',
      title: 'Phối hợp S → C: Bám sát tiêu chuẩn chất lượng và trao đổi dựa trên dữ kiện',
      primary_context: 'delegation',
      secondary_contexts: ['chat_email', 'decision'],
      excluded_contexts: [],
      trigger_situation: 'Khi phối hợp thực hiện quy trình chuyên môn hoặc rà soát chất lượng cùng đồng nghiệp (C).',
      action_behavior: 'Thống nhất rõ checklist tiêu chuẩn từ đầu và đừng lấy làm tổn thương cá nhân khi họ góp ý thẳng vào chi tiết kỹ thuật.',
      success_signal: 'Phối hợp cực kỳ chuẩn chỉ, ổn định và tin cậy.',
      overuse_warning: 'Tránh để sự thận trọng của cả hai làm chậm tiến độ quyết định chung.'
    },
    {
      card_id: 'CB11-PAIR-C-D',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'C->D',
      title: 'Phối hợp C → D: Đưa kết luận và phương án khuyến nghị lên đầu tiên',
      primary_context: 'decision',
      secondary_contexts: ['chat_email', 'meeting'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (C) trình bày báo cáo phân tích hoặc cảnh báo rủi ro cho đồng nghiệp (D).',
      action_behavior: 'Trình bày ngay Kết luận & Phương án đề xuất trong 30 giây đầu; chỉ đi sâu vào dữ liệu chi tiết khi họ hỏi thêm.',
      success_signal: 'Đồng nghiệp D nắm bắt ngay trọng tâm và đánh giá cao tư duy sắc bén của bạn.',
      overuse_warning: 'Tránh liệt kê quá nhiều rào cản kỹ thuật mà không đưa ra giải pháp khả thi.'
    },
    {
      card_id: 'CB11-PAIR-C-I',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'C->I',
      title: 'Phối hợp C → I: Ghi nhận bức tranh lớn trước khi đi vào rà soát chi tiết',
      primary_context: 'meeting',
      secondary_contexts: ['feedback_recognition', 'direct_conversation'],
      excluded_contexts: [],
      trigger_situation: 'Khi đồng nghiệp (I) trình bày một ý tưởng mới còn nhiều điểm chưa hoàn chỉnh.',
      action_behavior: 'Đánh giá cao giá trị sáng tạo của ý tưởng trước, sau đó chọn 2-3 rủi ro quan trọng nhất để cùng họ hoàn thiện phương án.',
      success_signal: 'Giúp ý tưởng của I trở nên thực tế mà không dập tắt sự hứng khởi của họ.',
      overuse_warning: 'Tránh bắt lỗi tiểu tiết ngay lập tức khiến cuộc trao đổi bị cụt hứng.'
    },
    {
      card_id: 'CB11-PAIR-C-S',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'C->S',
      title: 'Phối hợp C → S: Kết hợp tiêu chuẩn rõ ràng với sự thấu cảm và đồng hành',
      primary_context: 'feedback_recognition',
      secondary_contexts: ['delegation', 'conflict'],
      excluded_contexts: [],
      trigger_situation: 'Khi bạn (C) cần góp ý chỉnh sửa quy trình hoặc tiêu chuẩn chất lượng với đồng nghiệp (S).',
      action_behavior: 'Ghi nhận sự tận tâm của họ, giải thích nhẹ nhàng lý do kỹ thuật và hướng dẫn từng bước rõ ràng.',
      success_signal: 'Đồng nghiệp S tiếp nhận tiêu chuẩn mới một cách thoải mái và thực hiện rất bền bỉ.',
      overuse_warning: 'Tránh nhận xét quá khô khan, lạnh lùng khiến họ cảm thấy không được trân trọng.'
    },
    {
      card_id: 'CB11-PAIR-C-C',
      category: 'PAIR_MATRIX_4X4',
      dimension: 'C->C',
      title: 'Phối hợp C → C: Đặt giới hạn thời gian (Time-box) để chốt phương án thực thi',
      primary_context: 'decision',
      secondary_contexts: ['meeting', 'delegation'],
      excluded_contexts: [],
      trigger_situation: 'Khi cả hai cùng phân tích sâu và tranh luận kỹ lưỡng về các chi tiết kỹ thuật.',
      action_behavior: 'Thống nhất ngưỡng "đủ dữ liệu để hành động" và đặt mốc thời gian bắt buộc phải chốt quyết định.',
      success_signal: 'Đạt chất lượng chuyên môn xuất sắc mà vẫn đảm bảo tốc độ triển khai.',
      overuse_warning: 'Tránh sa đà vào việc cầu toàn tiểu tiết làm đình trệ tiến độ dự án.'
    }
  ];

  // Export cho cả Browser và Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      DISC_QUESTIONS,
      VAGA_LIKERT_40,
      VAGA_ADAPTIVE_8,
      VAGA_WORKPLACE_CONTEXTS,
      VAGA_WORKSTYLE_SLIDERS,
      VAGA_CONTENT_BANK_72
    };
  }
  root.DISC_QUESTIONS = DISC_QUESTIONS;
  root.VAGA_LIKERT_40 = VAGA_LIKERT_40;
  root.VAGA_ADAPTIVE_8 = VAGA_ADAPTIVE_8;
  root.VAGA_WORKPLACE_CONTEXTS = VAGA_WORKPLACE_CONTEXTS;
  root.VAGA_WORKSTYLE_SLIDERS = VAGA_WORKSTYLE_SLIDERS;
  root.VAGA_CONTENT_BANK_72 = VAGA_CONTENT_BANK_72;
})(typeof window !== 'undefined' ? window : globalThis);
