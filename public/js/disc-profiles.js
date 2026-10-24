/**
 * KHO DỮ LIỆU CHUYÊN SÂU 12 PHONG CÁCH PHA TRỘN VAGA DISC + BALANCED
 * (D, DI, ID, I, IS, SI, S, SC, CS, C, CD, DC, BALANCED)
 * Dùng chung cho cả Frontend (window.*) và Backend Node.js (module.exports)
 */
(function (root) {
  const DISC_DIMENSIONS = {
    D: {
      code: 'D',
      name: 'Dominance – Chủ động & Hướng kết quả',
      shortName: 'Chủ động (D)',
      color: '#e11d48',
      lightBg: '#ffe4e6',
      tagline: 'Tập trung vào Kết quả • Quyết đoán • Thích chinh phục thử thách',
      axes: 'Nhịp nhanh (Fast-paced) & Hướng công việc/mục tiêu (Task-oriented)'
    },
    I: {
      code: 'I',
      name: 'Influence – Kết nối & Truyền cảm hứng',
      shortName: 'Ảnh hưởng (I)',
      color: '#f59e0b',
      lightBg: '#fef3c7',
      tagline: 'Tập trung vào Con người • Nhiệt huyết • Giàu sức thuyết phục',
      axes: 'Nhịp nhanh (Fast-paced) & Hướng con người/quan hệ (People-oriented)'
    },
    S: {
      code: 'S',
      name: 'Steadiness – Ổn định & Đồng hành',
      shortName: 'Kiên định (S)',
      color: '#10b981',
      lightBg: '#d1fae5',
      tagline: 'Tập trung vào Sự ổn định • Chân thành • Hợp tác bền vững',
      axes: 'Nhịp điềm tĩnh (Moderate-paced) & Hướng con người/hỗ trợ (People-oriented)'
    },
    C: {
      code: 'C',
      name: 'Conscientiousness – Chuẩn xác & Phân tích',
      shortName: 'Chuẩn xác (C)',
      color: '#2563eb',
      lightBg: '#dbeafe',
      tagline: 'Tập trung vào Chất lượng • Logic • Chính xác & Hệ thống',
      axes: 'Nhịp thận trọng (Methodical-paced) & Hướng dữ liệu/quy chuẩn (Task-oriented)'
    },
    BALANCED: {
      code: 'BALANCED',
      name: 'Balanced – Linh hoạt đa miền theo ngữ cảnh',
      shortName: 'Cân bằng',
      color: '#6366f1',
      lightBg: '#e0e7ff',
      tagline: 'Linh hoạt điều chỉnh • Cầu nối đa phong cách • Thích ứng theo mục tiêu',
      axes: 'Cân bằng giữa Nhịp độ và Định hướng Công việc / Con người'
    }
  };

  const DISC_PROFILES = {
    D: {
      code: 'D',
      primary: 'D',
      secondary: null,
      title: 'Người Kiến Tạo Kết Quả (Directing / Driver)',
      subtitle: 'Quyết đoán, độc lập, hướng thẳng tới mục tiêu và giải quyết vấn đề tốc độ cao',
      motto: '“Tập trung vào mục tiêu lớn – Hành động quyết liệt – Tạo kết quả thực chất.”',
      keywords: ['Quyết đoán', 'Hướng kết quả', 'Tốc độ cao', 'Tự chủ', 'Thẳng thắn'],
      overview:
        'Bạn có xu hướng hành vi Chủ động (D) rõ nét. Trong công việc, bạn nhìn thẳng vào mục tiêu cuối cùng, thích nắm quyền chủ động và giải quyết vướng mắc một cách dứt khoát. Bạn phát huy tối đa năng lực khi được trao quyền tự quyết và đối mặt với những bài toán thách thức.',
      strengths: [
        'Ra quyết định nhanh chóng, dứt khoát ngay cả khi thông tin chưa hoàn hảo',
        'Tập trung cao độ vào mục tiêu đầu ra (Output & ROI), không ngại việc khó',
        'Thẳng thắn nêu vấn đề cốt lõi và thúc đẩy tiến độ toàn đội nhóm',
        'Sẵn sàng nhận trách nhiệm dẫn dắt trong các tình huống khẩn cấp'
      ],
      overused_strengths: [
        'Quyết đoán quá mức dễ trở thành áp đặt, làm giảm không gian đóng góp của người khác',
        'Ưu tiên tốc độ cao đôi khi khiến đồng đội cảm thấy bị thúc ép và bỏ sót chi tiết vận hành',
        'Cách phản hồi quá trực diện dễ làm người nhạy cảm cảm thấy bị phán xét'
      ],
      blindspots: [
        'Dễ mất kiên nhẫn với các quy trình chi tiết hoặc thảo luận kéo dài',
        'Đôi khi đi quá nhanh khiến các thành viên nhóm S/C chưa kịp nắm bắt bối cảnh',
        'Có xu hướng tự ôm việc để làm cho nhanh thay vì kiên nhẫn hướng dẫn'
      ],
      stress_pattern: {
        trigger: 'Mất quyền tự chủ, tiến độ trì trệ, hoặc phải chờ đợi phê duyệt qua nhiều tầng nấc.',
        reaction: 'Tăng mức độ kiểm soát, nói ngắn gọn sắc lạnh và tự mình quyết định thay nhóm.',
        impact: 'Các thành viên khác co cụm, ngại báo cáo rủi ro sớm và giảm tính chủ động.',
        recovery: 'Lùi lại 5 phút, tách bạch mục tiêu dài hạn khỏi sự sốt ruột tức thời và trao quyền rõ ràng.'
      },
      quick_wins: [
        'Tạm dừng 10 giây và hỏi thêm 1 góc nhìn rủi ro trước khi chốt quyết định trong cuộc họp',
        'Bổ sung 1 câu giải thích bối cảnh "Vì sao việc này quan trọng" khi giao việc gấp',
        'Ghi nhận nỗ lực quá trình của đồng đội bên cạnh việc đánh giá kết quả cuối cùng'
      ],
      habits_30d: [
        'Duy trì 1 buổi lắng nghe 1-1 mỗi tuần mà bạn chỉ đặt câu hỏi và nghe 70% thời lượng',
        'Thiết lập khung ủy quyền rõ ràng (Mục tiêu + Ranh giới tự quyết) thay vì can thiệp sâu'
      ],
      communication_dos: [
        'Đi thẳng vào kết luận, mục tiêu và kết quả mong đợi ngay từ đầu (BLUF)',
        'Đưa ra 2 phương án giải quyết kèm ưu/nhược điểm ngắn gọn khi báo cáo vấn đề',
        'Cam kết rõ mốc thời gian hoàn thành và chủ động báo sớm nếu có thay đổi'
      ],
      communication_donts: [
        'Tránh mở đầu vòng vo, lan man hoặc kể lể quá nhiều lý do khó khăn mà thiếu giải pháp',
        'Tránh hứa hẹn mơ hồ không có thời hạn hoặc số liệu cụ thể',
        'Tránh làm mất thời gian họp mà không chốt được hành động tiếp theo'
      ],
      communication_tips: [
        'Đi thẳng vào trọng tâm, trình bày kết luận và giải pháp đề xuất trước',
        'Chuẩn bị các phương án lựa chọn rõ ràng để chốt nhanh',
        'Tôn trọng thời gian và quyền tự chủ trong phạm vi công việc'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc nhịp nhanh, ưu tiên đi thẳng vào mục tiêu và kết quả đầu ra. Khi trao đổi với tôi, hãy nêu kết luận chính trước kèm phương án đề xuất.',
        sliders: { pace: 5, decision_mode: 4, communication_channel: 4, detail_need: 2, change_attitude: 5 },
        contexts: {
          direct_conversation: 'Đi thẳng vào mục tiêu cần giải quyết trong 60 giây đầu; nêu rõ bạn cần tôi quyết định hay hỗ trợ điều gì.',
          chat_email: 'Dùng gạch đầu dòng ngắn gọn, ghi rõ [Cần chốt trước giờ nào] ở dòng đầu tiên.',
          meeting: 'Cần có agenda rõ ràng và kết thúc bằng danh sách việc cần làm (Ai - Việc gì - Deadline).',
          decision: 'Đưa cho tôi 2 phương án kèm tác động thực tế và đề xuất ưu tiên của bạn.',
          conflict: 'Trao đổi thẳng thắn, tập trung vào mục tiêu chung và giải pháp tháo gỡ, không vòng vo.',
          delegation: 'Chúng ta thống nhất kết quả đầu ra và deadline, sau đó bạn hoàn toàn chủ động cách thực hiện.',
          feedback_recognition: 'Góp ý thẳng, ngắn gọn và kịp thời; ghi nhận bằng kết quả thực chất và trao thêm thử thách mới.'
        }
      },
      adaptation_with: {
        D: 'Thống nhất rõ ranh giới quyền quyết định của mỗi người từ đầu để tránh va chạm kiểm soát.',
        I: 'Dành 5 phút đầu lắng nghe ý tưởng sáng tạo của họ trước khi đưa thảo luận về các cam kết thời hạn.',
        S: 'Hạ nhịp áp lực, giải thích rõ lý do thay đổi và cho họ lộ trình từng bước để an tâm thực thi.',
        C: 'Cung cấp đủ dữ kiện cốt lõi và cho họ thời gian kiểm chứng rủi ro thay vì ép chốt tức thì.'
      },
      ideal_environment: 'Môi trường năng động, trao quyền tự chủ cao, định hướng mục tiêu rõ ràng và đánh giá dựa trên kết quả thực chất.',
      suggested_careers: ['Quản lý Dự án / Sản phẩm', 'Giám đốc Điều hành / Kinh doanh', 'Trưởng nhóm Phát triển Thị trường', 'Điều phối Vận hành Chiến lược']
    },

    DI: {
      code: 'DI',
      primary: 'D',
      secondary: 'I',
      title: 'Người Tiên Phong Truyền Lửa (Pioneering / Inspiring Driver)',
      subtitle: 'Quyết liệt tạo đột phá và lôi cuốn đội ngũ cùng tiến về phía trước',
      motto: '“Mở lối tiên phong – Truyền lửa hành động – Bứt phá giới hạn.”',
      keywords: ['Tiên phong', 'Lôi cuốn', 'Nhịp độ nhanh', 'Tầm nhìn', 'Đột phá'],
      overview:
        'Sự kết hợp giữa D và I tạo nên phong cách hành động tốc độ cao đi kèm khả năng thuyết phục mạnh mẽ. Bạn không chỉ muốn đạt kết quả nhanh mà còn biết cách truyền cảm hứng để cả tập thể cùng hào hứng nhập cuộc trong các sáng kiến mới.',
      strengths: [
        'Khởi xướng thay đổi nhanh và thuyết phục các bên liên quan đầy thuyết phục',
        'Kết hợp tốt giữa tư duy mục tiêu (D) và sự nhạy bén giao tiếp (I)',
        'Xoay xở linh hoạt trước các cơ hội mới hoặc tình huống chưa có tiền lệ',
        'Tạo động lực mạnh mẽ cho đội nhóm vượt qua giai đoạn khởi đầu khó khăn'
      ],
      overused_strengths: [
        'Khởi xướng nhiều sáng kiến tốc độ cao cùng lúc khiến đội ngũ thực thi hụt hơi',
        'Dễ chuyển sự chú ý sang mục tiêu mới khi dự án cũ vừa qua giai đoạn hào hứng',
        'Tranh luận quá nhiệt thành đôi khi lấn át tiếng nói của các thành viên trầm tính'
      ],
      blindspots: [
        'Thiếu kiên nhẫn với các công việc hậu cần, tài liệu hóa và kiểm soát chi tiết',
        'Đôi khi đánh giá quá lạc quan về thời gian hoàn thành các hạng mục kỹ thuật phức tạp',
        'Dễ bỏ qua các cảnh báo rủi ro chi tiết từ nhóm S và C'
      ],
      stress_pattern: {
        trigger: 'Bị bó buộc trong quy trình hành chính cứng nhắc hoặc dự án giậm chân tại chỗ.',
        reaction: 'Phản ứng gay gắt, thúc ép liên tục hoặc tự ý đổi hướng đi mới đột ngột.',
        impact: 'Đội ngũ bị rối thứ tự ưu tiên và mệt mỏi vì phải chạy theo các thay đổi liên tục.',
        recovery: 'Họp ngắn với thành viên nhóm S/C để neo lại 3 ưu tiên cốt lõi và lộ trình bàn giao.'
      },
      quick_wins: [
        'Sau khi chốt ý tưởng lớn, dành 10 phút cùng nhóm lập bảng phân công chi tiết từng bước',
        'Kiểm tra năng lực tải công việc thực tế của nhóm trước khi mở thêm sáng kiến mới',
        'Chủ động mời các thành viên nhóm C phản biện rủi ro trước khi triển khai rộng'
      ],
      habits_30d: [
        'Thực hiện quy tắc "Đóng 1 việc cũ trước khi mở 1 dự án mới"',
        'Dành 15 phút cuối tuần rà soát các chi tiết bàn giao và cam kết còn tồn đọng'
      ],
      communication_dos: [
        'Trình bày bức tranh mục tiêu lớn, tác động đột phá và tốc độ triển khai',
        'Trao đổi năng động, cởi mở và tập trung vào cơ hội giải quyết vấn đề',
        'Chốt lại bằng văn bản ngắn gọn các đầu việc sau khi thảo luận xong'
      ],
      communication_donts: [
        'Tránh kéo dài buổi trao đổi bằng các thủ tục hành chính vụn vặt ngay từ đầu',
        'Tránh chỉ nêu lý do "không làm được" mà không đề xuất hướng thử nghiệm mới',
        'Tránh để các thỏa thuận miệng trôi đi mà không có mốc theo dõi'
      ],
      communication_tips: [
        'Đi thẳng vào bức tranh lớn và giá trị đột phá của đề xuất',
        'Giữ nhịp trao đổi năng động, tích cực và hướng tới hành động',
        'Hỗ trợ chốt lại các chi tiết thực thi bằng văn bản sau cuộc họp'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi thích nhịp làm việc nhanh, cởi mở với ý tưởng đột phá và hướng tới kết quả cụ thể. Hãy trao đổi thẳng vào bức tranh lớn, cơ hội mới và cùng tôi chốt nhanh các bước hành động.',
        sliders: { pace: 5, decision_mode: 4, communication_channel: 5, detail_need: 2, change_attitude: 5 },
        contexts: {
          direct_conversation: 'Trao đổi trực tiếp, năng động, nêu bật mục tiêu chính và ý tưởng mới của bạn.',
          chat_email: 'Ngắn gọn, súc tích, làm nổi bật kết quả cần đạt và hành động tiếp theo.',
          meeting: 'Ưu tiên thảo luận giải pháp sáng tạo nhanh và chốt người chịu trách nhiệm rõ ràng.',
          decision: 'Tập trung vào tác động tăng trưởng, tốc độ triển khai và phương án kiểm soát rủi ro chính.',
          conflict: 'Đối thoại thẳng thắn với tinh thần xây dựng để tìm giải pháp vượt qua bế tắc.',
          delegation: 'Tôi chia sẻ tầm nhìn và mục tiêu đầu ra, khuyến khích bạn chủ động đề xuất cách làm sáng tạo.',
          feedback_recognition: 'Ghi nhận công khai những nỗ lực đột phá; góp ý thẳng thắn để cùng tiến bộ nhanh.'
        }
      },
      adaptation_with: {
        D: 'Cùng chốt mục tiêu chung và phân chia rõ phạm vi làm chủ của từng người.',
        I: 'Cùng khuấy động ý tưởng nhưng nhớ chỉ định người ghi lại checklist thực thi.',
        S: 'Giải thích rõ bức tranh thay đổi và đồng hành hỗ trợ để họ yên tâm chuyển đổi.',
        C: 'Tôn trọng các câu hỏi kiểm chứng dữ liệu của họ vì đó là chốt chặn an toàn cho dự án.'
      },
      ideal_environment: 'Môi trường đổi mới sáng tạo, nhịp độ nhanh, khuyến khích thử nghiệm và mở rộng quy mô.',
      suggested_careers: ['Giám đốc Phát triển Kinh doanh', 'Product Leader / Growth Lead', 'Quản lý Chiến dịch Truyền thông', 'Khởi nghiệp / Đổi mới Sáng tạo']
    },

    ID: {
      code: 'ID',
      primary: 'I',
      secondary: 'D',
      title: 'Người Truyền Cảm Hứng Hành Động (Energizing Persuader)',
      subtitle: 'Nhiệt huyết, giàu sức thuyết phục và thúc đẩy tập thể biến ý tưởng thành hành động',
      motto: '“Kết nối con người – Thắp lửa ý tưởng – Chinh phục mục tiêu.”',
      keywords: ['Thuyết phục', 'Nhiệt huyết', 'Năng động', 'Sáng tạo', 'Dẫn dắt'],
      overview:
        'Bạn nổi bật với nguồn năng lượng tích cực của nhóm I kết hợp cùng sự quyết đoán của nhóm D. Bạn rất giỏi trong việc kết nối con người, thuyết phục các bên liên quan và tạo đà hành động nhanh chóng cho những dự án mới.',
      strengths: [
        'Khả năng giao tiếp, thuyết trình và thương lượng rất cuốn hút',
        'Nhanh nhạy nắm bắt cơ hội mới và thúc đẩy mọi người cùng hành động',
        'Xây dựng mạng lưới hợp tác liên phòng ban nhanh chóng và hiệu quả',
        'Dám thử nghiệm cách tiếp cận mới để tháo gỡ bế tắc'
      ],
      overused_strengths: [
        'Sự hào hứng tốc độ cao dễ dẫn đến cam kết quá nhiều đầu việc cùng lúc',
        'Đôi khi quyết định dựa trên cảm hứng mà chưa rà soát kỹ nguồn lực vận hành',
        'Nói nhiều và dẫn dắt nhịp hội thoại nhanh khiến người trầm tính khó chen vào'
      ],
      blindspots: [
        'Dễ giảm hứng thú khi công việc bước vào giai đoạn lặp lại hoặc hoàn thiện tiểu tiết',
        'Cần cải thiện kỷ luật theo dõi tiến độ từng bước sau buổi họp khởi động',
        'Đôi khi chủ quan trước các rủi ro kỹ thuật hoặc quy định tuân thủ'
      ],
      stress_pattern: {
        trigger: 'Làm việc cô lập, thiếu sự tương tác hoặc bị kiểm soát tiểu tiết gắt gao.',
        reaction: 'Tranh luận cảm tính, nhảy qua nhiều đầu việc hoặc phản ứng bốc đồng.',
        impact: 'Tiến độ chi tiết bị bỏ ngỏ và thông tin phối hợp giữa các bên thiếu nhất quán.',
        recovery: 'Trao đổi ngắn để giải tỏa năng lượng, sau đó viết ra 3 việc ưu tiên cần hoàn tất trong ngày.'
      },
      quick_wins: [
        'Ghi lại 3 gạch đầu dòng cam kết hành động ngay sau mỗi cuộc trao đổi quan trọng',
        'Đặt câu hỏi lắng nghe ý kiến của các thành viên nhóm S và C trước khi chốt kế hoạch',
        'Kiểm tra lại lịch trình hiện tại trước khi nhận thêm nhiệm vụ mới'
      ],
      habits_30d: [
        'Duy trì thói quen rà soát checklist tiến độ 2 lần/tuần cho tới khi dự án hoàn tất 100%',
        'Đính kèm ít nhất 2 dữ kiện thực tế cho mỗi đề xuất sáng kiến mới'
      ],
      communication_dos: [
        'Bắt đầu với thái độ cởi mở, tích cực và chia sẻ tầm nhìn thú vị của công việc',
        'Kết hợp trao đổi trực tiếp nhanh với bản tóm tắt ngắn các bước tiếp theo',
        'Ghi nhận đóng góp và sự sáng tạo của nhau một cách kịp thời'
      ],
      communication_donts: [
        'Tránh dội quá nhiều bảng biểu khô khan mà không giải thích bức tranh tổng thể',
        'Tránh bác bỏ ý tưởng mới ngay lập tức mà chưa thảo luận tính khả thi',
        'Tránh để cuộc họp kết thúc mà không chốt rõ ai làm việc gì'
      ],
      communication_tips: [
        'Trao đổi cởi mở, giàu năng lượng và tập trung vào tầm nhìn chung',
        'Cùng ghi chú lại các mốc thời gian và tiêu chí hoàn thành cụ thể',
        'Khích lệ tinh thần chủ động và ghi nhận đóng góp kịp thời'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi tràn đầy năng lượng khi được trao đổi trực tiếp, cùng tìm giải pháp sáng tạo và đẩy nhanh hành động. Hãy chia sẻ bức tranh lớn với tôi rồi cùng chốt lại các mốc thực thi rõ ràng.',
        sliders: { pace: 5, decision_mode: 4, communication_channel: 5, detail_need: 2, change_attitude: 5 },
        contexts: {
          direct_conversation: 'Tôi rất thích trao đổi trực tiếp hoặc gọi nhanh 5 phút để thống nhất ý tưởng và tạo đà hành động.',
          chat_email: 'Thân thiện, đi vào ý chính và liệt kê rõ các hành động cần phối hợp.',
          meeting: 'Không khí cởi mở, khuyến khích ý tưởng mới và chốt rõ người phụ trách từng mục ở cuối buổi.',
          decision: 'Cân nhắc cả sức hút tầm nhìn lẫn tính khả thi để chốt nhanh phương án hành động.',
          conflict: 'Đối thoại trực tiếp với thái độ thiện chí để tháo gỡ nút thắt ngay lập tức.',
          delegation: 'Cùng thống nhất mục tiêu thú vị và thường xuyên trao đổi ngắn để giữ nhiệt huyết.',
          feedback_recognition: 'Ghi nhận nhiệt thành trước nhóm; góp ý thẳng thắn với tinh thần xây dựng.'
        }
      },
      adaptation_with: {
        D: 'Đi thẳng vào kết quả cam kết và giảm bớt phần dẫn chuyện dài.',
        I: 'Thống nhất rõ người ghi biên bản và theo dõi deadline sau buổi thảo luận.',
        S: 'Giữ đúng các cam kết đã thống nhất và hạn chế thay đổi kế hoạch đột ngột.',
        C: 'Bổ sung số liệu dẫn chứng và cấu trúc hóa đề xuất trước khi gửi họ duyệt.'
      },
      ideal_environment: 'Môi trường năng động, giàu tính tương tác, khuyến khích sáng kiến mới và ghi nhận thành tích nhanh.',
      suggested_careers: ['Trưởng phòng Truyền thông & Thương hiệu', 'Quản lý Phát triển Đối tác', 'Chuyên gia Đào tạo & Coaching', 'Quản lý Kinh doanh Giải pháp']
    },

    I: {
      code: 'I',
      primary: 'I',
      secondary: null,
      title: 'Người Kết Nối & Truyền Cảm Hứng (Influencing / Connector)',
      subtitle: 'Hoạt bát, lạc quan, xây dựng mạng lưới gắn kết và khơi nguồn sáng tạo',
      motto: '“Lan tỏa năng lượng tích cực – Kết nối mọi người – Sáng tạo không ngừng.”',
      keywords: ['Truyền cảm hứng', 'Giao tiếp tốt', 'Lạc quan', 'Sáng tạo', 'Gắn kết'],
      overview:
        'Bạn mang nguồn năng lượng ấm áp, cởi mở và giàu sức thuyết phục của nhóm Ảnh hưởng (I). Bạn dễ dàng tạo dựng thiện cảm, khích lệ tinh thần đồng đội và luôn mang đến những góc nhìn sáng tạo mới mẻ cho tập thể.',
      strengths: [
        'Khả năng giao tiếp, kết nối và tạo bầu không khí làm việc tích cực',
        'Sáng tạo, nhiều ý tưởng mới trong các buổi brainstorming giải quyết vấn đề',
        'Khích lệ tinh thần và kết nối các thành viên liên phòng ban hiệu quả',
        'Thích nghi nhanh với môi trường mới và giao thiệp đối ngoại tốt'
      ],
      overused_strengths: [
        'Nói và chia sẻ quá nhiều theo cảm hứng dễ làm loãng trọng tâm cuộc họp',
        'Sự lạc quan cao đôi khi khiến bạn đánh giá thấp độ phức tạp của chi tiết thực thi',
        'Ngại đưa ra phản hồi phê bình thẳng thắn vì sợ làm mất bầu không khí vui vẻ'
      ],
      blindspots: [
        'Dễ bị phân tâm bởi các ý tưởng mới khi đang làm việc chi tiết lặp lại',
        'Đôi khi quên ghi chép hoặc theo dõi sát các đầu việc hậu cần sau cuộc họp',
        'Cần rèn luyện thêm tính cấu trúc khi trình bày báo cáo số liệu'
      ],
      stress_pattern: {
        trigger: 'Bị cô lập giao tiếp, làm việc hành chính khô khan kéo dài hoặc cảm thấy không được ghi nhận.',
        reaction: 'Nói nhiều hơn để giải tỏa cảm xúc, làm việc ngẫu hứng hoặc né tránh các chi tiết căng thẳng.',
        impact: 'Các cam kết chi tiết dễ bị trễ hạn và giảm độ chính xác trong phối hợp.',
        recovery: 'Trò chuyện ngắn với đồng nghiệp tin cậy, sau đó chia việc lớn thành các chặng ngắn 25 phút (Pomodoro).'
      },
      quick_wins: [
        'Dành 5 phút cuối mỗi cuộc họp để viết lại 3 gạch đầu dòng việc cần làm và deadline',
        'Mở đầu email/báo cáo bằng 1 câu kết luận rõ ràng trước khi chia sẻ câu chuyện chi tiết',
        'Tập sử dụng khung SBI để góp ý cải thiện cụ thể thay vì chỉ khen chung chung'
      ],
      habits_30d: [
        'Sử dụng bảng theo dõi công việc trực quan (Kanban/Checklist) và cập nhật mỗi cuối ngày',
        'Lắng nghe trọn vẹn ý kiến của người khác trước khi chia sẻ câu chuyện của mình'
      ],
      communication_dos: [
        'Giao tiếp thân thiện, cởi mở và dành thời gian kết nối con người',
        'Khuyến khích chia sẻ ý tưởng sáng tạo và ghi nhận đóng góp tích cực',
        'Hỗ trợ tóm tắt lại các thống nhất quan trọng bằng văn bản ngắn gọn'
      ],
      communication_donts: [
        'Tránh giao tiếp lạnh lùng, chỉ toàn mệnh lệnh hoặc quy tắc khô cứng',
        'Tránh cắt ngang mạch chia sẻ một cách phũ phàng trước đám đông',
        'Tránh giao các việc số liệu cô lập dài ngày mà không có điểm chạm trao đổi'
      ],
      communication_tips: [
        'Tạo bầu không khí thân thiện, cởi mở và tôn trọng ý tưởng mới',
        'Cùng chuyển hóa các ý tưởng thảo luận thành checklist hành động cụ thể',
        'Ghi nhận nỗ lực và đóng góp một cách chân thành, kịp thời'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc hiệu quả nhất trong bầu không khí cởi mở, giàu năng lượng và được trao đổi trực tiếp. Hãy chia sẻ ý tưởng cùng tôi, và giúp tôi chốt lại các đầu việc cụ thể bằng checklist ngắn gọn.',
        sliders: { pace: 4, decision_mode: 4, communication_channel: 5, detail_need: 2, change_attitude: 4 },
        contexts: {
          direct_conversation: 'Thân thiện, cởi mở; một cuộc trò chuyện ngắn 5-10 phút sẽ giúp chúng ta hiểu ý nhau rất nhanh.',
          chat_email: 'Ngắn gọn, tích cực; hãy gắn thẻ tên tôi rõ ràng ở những mục cần tôi phản hồi hoặc hành động.',
          meeting: 'Tôi thích các buổi họp tương tác hai chiều, brainstorming sáng tạo và tổng kết rõ bước tiếp theo.',
          decision: 'Tôi quan tâm đến tác động lên con người, trải nghiệm và sự đồng lòng của tập thể.',
          conflict: 'Hãy trò chuyện trực tiếp với tinh thần xây dựng và giữ sự tôn trọng cảm xúc của nhau.',
          delegation: 'Hãy cho tôi biết mục tiêu ý nghĩa của công việc và giữ các buổi check-in ngắn để cùng duy trì đà làm việc.',
          feedback_recognition: 'Lời khen ngợi chân thành trước tập thể và những góp ý riêng tư, thiện chí giúp tôi phát huy tốt nhất.'
        }
      },
      adaptation_with: {
        D: 'Trình bày ngắn gọn, đi thẳng vào kết quả và cam kết thời hạn rõ ràng.',
        I: 'Tận hưởng sự sáng tạo chung nhưng nhớ cử người ghi lại biên bản hành động.',
        S: 'Lắng nghe chân thành và tôn trọng nhịp độ thực thi ổn định của họ.',
        C: 'Chuẩn bị dữ kiện cụ thể và kiểm tra kỹ chi tiết trước khi bàn giao.'
      },
      ideal_environment: 'Môi trường cởi mở, sáng tạo, đề cao tinh thần đồng đội và có nhiều cơ hội giao tiếp, kết nối.',
      suggested_careers: ['Truyền thông Nội bộ & Văn hóa', 'Quan hệ Công chúng (PR) & Sự kiện', 'Chăm sóc Khách hàng & Đối tác', 'Sáng tạo Nội dung & Marketing']
    },

    IS: {
      code: 'IS',
      primary: 'I',
      secondary: 'S',
      title: 'Người Gắn Kết Hòa Hợp (Harmonizing Connector)',
      subtitle: 'Ấm áp, thấu cảm, xây dựng tinh thần đồng đội bền chặt và môi trường an toàn tâm lý',
      motto: '“Thấu cảm chân thành – Kết nối bền lâu – Đồng hành cùng tập thể.”',
      keywords: ['Thấu cảm', 'Thân thiện', 'Hợp tác', 'Khích lệ', 'Hài hòa'],
      overview:
        'Bạn kết hợp sự nhiệt tình, cởi mở của nhóm I với sự điềm đạm, chân thành của nhóm S. Bạn là "chất keo gắn kết" trong đội ngũ, luôn biết cách lắng nghe, khích lệ và giúp mọi thành viên cảm thấy được trân trọng.',
      strengths: [
        'Tạo dựng niềm tin và sự gắn kết bền chặt giữa các thành viên trong nhóm',
        'Biết lắng nghe thấu cảm và hòa giải khéo léo các căng thẳng nội bộ',
        'Hỗ trợ đồng nghiệp nhiệt tình, tạo môi trường làm việc ấm áp, tích cực',
        'Giao tiếp mềm mỏng, thuyết phục bằng sự chân thành và thiện chí'
      ],
      overused_strengths: [
        'Quá coi trọng hòa khí dễ dẫn đến nể nang, ngại phê bình thẳng khi công việc chưa đạt',
        'Dễ nhận phần thiệt hoặc ôm thêm việc về mình để giữ sự vui vẻ chung',
        'Đôi khi mất nhiều thời gian trò chuyện làm chậm nhịp xử lý công việc ưu tiên'
      ],
      blindspots: [
        'Ngại các cuộc đối đầu trực diện hoặc ra quyết định cắt giảm cứng rắn',
        'Cần tăng tính quyết đoán khi phải bảo vệ quan điểm dưới áp lực cao',
        'Đôi khi bị ảnh hưởng tâm trạng bởi bầu không khí cảm xúc xung quanh'
      ],
      stress_pattern: {
        trigger: 'Xung đột gay gắt trong nhóm, thái độ thiếu tôn trọng hoặc bị thúc ép lạnh lùng.',
        reaction: 'Thu mình lại, cố gắng chiều lòng mọi phía hoặc tâm sự nhiều để tìm sự đồng cảm.',
        impact: 'Vấn đề cốt lõi chưa được giải quyết triệt để và bản thân bị quá tải cảm xúc.',
        recovery: 'Tách cảm xúc cá nhân khỏi vấn đề công việc, xác định rõ nguyên tắc công bằng cho tập thể.'
      },
      quick_wins: [
        'Thực hành góp ý thẳng thắn nhưng ấm áp theo công thức: Ghi nhận nỗ lực + Điểm cần sửa + Kỳ vọng rõ ràng',
        'Đặt khung thời gian cho các cuộc trao đổi để bảo vệ giờ làm việc tập trung',
        'Chủ động nêu rõ giới hạn công việc của mình khi được nhờ hỗ trợ thêm'
      ],
      habits_30d: [
        'Rèn luyện thói quen đặt tiêu chuẩn kết quả rõ ràng song hành với sự hỗ trợ con người',
        'Mỗi tuần chủ động nêu ít nhất 1 góc nhìn phản biện xây dựng trong cuộc họp nhóm'
      ],
      communication_dos: [
        'Giao tiếp chân thành, ấm áp và tôn trọng mối quan hệ hợp tác',
        'Chia sẻ rõ mục tiêu chung và cách công việc hỗ trợ cho tập thể',
        'Góp ý riêng tư, mang tính xây dựng và ghi nhận sự đóng góp'
      ],
      communication_donts: [
        'Tránh thái độ áp đặt, quát tháo hoặc phê bình gay gắt trước đám đông',
        'Tránh đẩy họ vào thế phải tranh giành thắng thua quyết liệt không cần thiết',
        'Tránh thay đổi kế hoạch đột ngột mà không giải thích bối cảnh'
      ],
      communication_tips: [
        'Bắt đầu bằng sự chân thành, tôn trọng và tinh thần hợp tác',
        'Làm rõ mục tiêu chung và lộ trình phối hợp rõ ràng',
        'Ghi nhận sự tận tâm và đóng góp kết nối của họ đối với nhóm'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi đề cao sự hợp tác chân thành, giao tiếp cởi mở và tôn trọng lẫn nhau. Khi làm việc cùng tôi, sự rõ ràng về mục tiêu đi kèm thái độ thiện chí sẽ giúp chúng ta phối hợp ăn ý nhất.',
        sliders: { pace: 3, decision_mode: 3, communication_channel: 4, detail_need: 3, change_attitude: 3 },
        contexts: {
          direct_conversation: 'Cởi mở, thân thiện và lắng nghe hai chiều; tôi luôn sẵn lòng cùng bạn tháo gỡ khó khăn.',
          chat_email: 'Lịch sự, rõ ràng về bối cảnh và thời hạn mong muốn để chúng ta chủ động phối hợp.',
          meeting: 'Tạo không gian để mọi người cùng được đóng góp ý kiến và thống nhất phương án hài hòa.',
          decision: 'Cân nhắc kỹ tác động lên đội ngũ và sự bền vững của kế hoạch thực thi.',
          conflict: 'Hãy trao đổi riêng 1-1 với tinh thần thấu hiểu và tìm điểm chung vì mục tiêu tập thể.',
          delegation: 'Làm rõ kỳ vọng đầu ra, lộ trình phối hợp và sẵn sàng hỗ trợ nhau khi có vướng mắc.',
          feedback_recognition: 'Tôi trân trọng lời cảm ơn chân thành và những góp ý thẳng thắn, nhẹ nhàng khi trao đổi riêng.'
        }
      },
      adaptation_with: {
        D: 'Nêu thẳng kết luận và đề xuất giải pháp ngắn gọn, đừng ngại sự bộc trực của họ.',
        I: 'Cùng lan tỏa năng lượng tích cực và hỗ trợ họ neo lại các bước thực hiện ổn định.',
        S: 'Khuyến khích nhau chủ động chốt quyết định nhanh hơn thay vì cùng chần chừ.',
        C: 'Chuẩn bị thông tin mạch lạc, rõ ràng và bám sát tiêu chuẩn chất lượng đã thống nhất.'
      },
      ideal_environment: 'Môi trường văn hóa nhân văn, gắn kết, đề cao sự hợp tác đồng đội và phát triển con người.',
      suggested_careers: ['Đối tác Nhân sự (HRBP) / Gắn kết', 'Đào tạo & Phát triển (L&D)', 'Chăm sóc Khách hàng Chuyên sâu', 'Điều phối Cộng đồng & Văn hóa']
    },

    SI: {
      code: 'SI',
      primary: 'S',
      secondary: 'I',
      title: 'Người Đồng Hành Tận Tâm (Supportive Collaborator)',
      subtitle: 'Điềm đạm, thân thiện, luôn lắng nghe và nâng đỡ đồng đội đạt mục tiêu chung',
      motto: '“Lắng nghe bằng trái tim – Hỗ trợ bằng hành động – Gắn kết bền vững.”',
      keywords: ['Tận tâm', 'Lắng nghe', 'Đồng hành', 'Thân thiện', 'Đáng tin cậy'],
      overview:
        'Bạn có nền tảng Kiên định (S) vững vàng kết hợp với sự cởi mở, thân thiện của nhóm I. Bạn là người đồng đội cực kỳ đáng tin cậy, kiên nhẫn hỗ trợ mọi người và tạo ra bầu không khí hợp tác dễ chịu, an toàn.',
      strengths: [
        'Kiên nhẫn lắng nghe, thấu hiểu và hỗ trợ đồng nghiệp rất chu đáo',
        'Giữ nhịp phối hợp ổn định đồng thời duy trì giao tiếp thân thiện, dễ gần',
        'Xây dựng niềm tin bền vững với khách hàng và các phòng ban phối hợp',
        'Giúp chuyển hóa các ý tưởng của nhóm thành các bước thực hiện hài hòa'
      ],
      overused_strengths: [
        'Dễ ưu tiên nhu cầu của người khác lên trên công việc của mình dẫn đến quá tải',
        'Ngại từ chối hoặc ngại nói lời phản biện sắc bén khi cần thiết',
        'Chờ đợi sự đồng thuận của tất cả mọi người làm chậm tốc độ quyết định'
      ],
      blindspots: [
        'Khó xử khi phải đưa ra quyết định cứng rắn hoặc xử lý kỷ luật',
        'Đôi khi giữ những băn khoăn trong lòng thay vì nói thẳng ngay lúc đầu',
        'Cần chủ động hơn khi đối mặt với những thay đổi mang tính đột phá'
      ],
      stress_pattern: {
        trigger: 'Bị đặt vào giữa các cuộc tranh cãi gay gắt hoặc bị ép thay đổi gấp không rõ lý do.',
        reaction: 'Im lặng nhận việc về mình, né tránh va chạm và chịu đựng áp lực một mình.',
        impact: 'Giảm tốc độ phản hồi và tích tụ sự mệt mỏi ngầm trong công việc.',
        recovery: 'Trao đổi 1-1 để làm rõ thứ tự ưu tiên và chia sẻ thẳng thắn khối lượng công việc thực tế.'
      },
      quick_wins: [
        'Phát biểu quan điểm cá nhân ngay trong 15 phút đầu của cuộc họp nhóm',
        'Khi quá tải, hãy đề xuất rõ phương án thương lượng lại deadline thay vì âm thầm nhận thêm',
        'Chủ động đặt lịch trao đổi ngắn 1-1 ngay khi thấy có điểm chưa thỏa đáng'
      ],
      habits_30d: [
        'Tập thói quen nói thẳng nhu cầu hỗ trợ và giới hạn nguồn lực của bản thân mỗi tuần',
        'Chủ động thử nghiệm 1 cách làm mới mỗi tháng để mở rộng vùng linh hoạt'
      ],
      communication_dos: [
        'Trao đổi với thái độ tôn trọng, ấm áp và cho biết rõ bối cảnh công việc',
        'Lắng nghe ý kiến của họ và tạo điều kiện để họ chuẩn bị trước khi họp',
        'Ghi nhận sự đóng góp bền bỉ và tinh thần hỗ trợ đồng đội của họ'
      ],
      communication_donts: [
        'Tránh gây áp lực đột ngột hoặc dùng giọng điệu mệnh lệnh gay gắt',
        'Tránh hiểu nhầm sự điềm đạm của họ là thiếu chính kiến',
        'Tránh thay đổi mục tiêu liên tục mà không giải thích nguyên nhân'
      ],
      communication_tips: [
        'Giao tiếp chân thành, lịch sự và làm rõ bối cảnh của công việc',
        'Khuyến khích họ chia sẻ góc nhìn thực tế trong quá trình vận hành',
        'Tôn trọng nhịp độ ổn định và ghi nhận sự đóng góp thầm lặng của họ'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc điềm tĩnh, tận tâm và luôn hướng tới sự phối hợp nhịp nhàng, bền vững. Hãy chia sẻ rõ bối cảnh, lộ trình công việc và trao đổi với nhau bằng sự chân thành, tôn trọng.',
        sliders: { pace: 2, decision_mode: 3, communication_channel: 4, detail_need: 3, change_attitude: 2 },
        contexts: {
          direct_conversation: 'Nhẹ nhàng, chân thành và đi từng bước rõ ràng; tôi luôn lắng nghe kỹ trước khi phản hồi.',
          chat_email: 'Rõ ràng, lịch sự, nêu đủ ngữ cảnh để tôi nắm bắt trọn vẹn yêu cầu phối hợp.',
          meeting: 'Tôi thích cuộc họp có trật tự, tôn trọng ý kiến của từng thành viên và chốt kế hoạch ổn định.',
          decision: 'Ưu tiên phương án an toàn, khả thi và tạo được sự đồng thuận cao trong đội ngũ.',
          conflict: 'Trao đổi riêng 1-1 một cách bình tĩnh để cùng tháo gỡ và bảo vệ mối quan hệ lâu dài.',
          delegation: 'Hãy thống nhất rõ lộ trình từng bước và thông báo sớm nếu có sự thay đổi ưu tiên.',
          feedback_recognition: 'Ghi nhận chân thành sự nỗ lực bền bỉ; góp ý riêng tư, cụ thể và mang tính khích lệ.'
        }
      },
      adaptation_with: {
        D: 'Trình bày ngắn gọn, đi thẳng vào tiến độ và chủ động đề xuất phương án giải quyết.',
        I: 'Hưởng ứng sự nhiệt tình của họ nhưng giúp họ neo lại kế hoạch thực hiện tuần tự.',
        S: 'Cùng đặt mốc thời gian chốt quyết định để tránh kéo dài sự lưỡng lự.',
        C: 'Phối hợp dựa trên quy trình chuẩn và tiêu chí chất lượng rõ ràng.'
      },
      ideal_environment: 'Môi trường ổn định, văn hóa tôn trọng, hợp tác chặt chẽ và có lộ trình phát triển rõ ràng.',
      suggested_careers: ['Chuyên viên Nhân sự & Tuyển dụng', 'Điều phối Dự án / Vận hành', 'Quản lý Dịch vụ Khách hàng', 'Cố vấn Đào tạo & Hỗ trợ Nội bộ']
    },

    S: {
      code: 'S',
      primary: 'S',
      secondary: null,
      title: 'Người Kiên Định Bền Bỉ (Steady / Supporter)',
      subtitle: 'Điềm tĩnh, đáng tin cậy, kiên trì hoàn thành cam kết và giữ nhịp ổn định cho tổ chức',
      motto: '“Chậm mà chắc – Đồng hành tin cậy – Bền bỉ tới đích.”',
      keywords: ['Kiên định', 'Đáng tin cậy', 'Điềm tĩnh', 'Hợp tác', 'Bền bỉ'],
      overview:
        'Bạn đại diện cho sự Kiên định (S) – trụ cột vững chắc và đáng tin cậy của đội nhóm. Bạn làm việc có kế hoạch, kiên trì theo đuổi mục tiêu đến cùng và luôn ưu tiên sự hài hòa, ổn định trong phối hợp tập thể.',
      strengths: [
        'Mức độ cam kết và độ tin cậy cực cao: đã nhận việc là hoàn thành trọn vẹn',
        'Điềm tĩnh, kiên nhẫn lắng nghe và giữ hòa khí trong những lúc nhóm căng thẳng',
        'Làm việc bền bỉ, duy trì chất lượng ổn định trong các quy trình dài hạn',
        'Hỗ trợ đồng đội tận tình, không ngại hy sinh cái tôi vì kết quả chung'
      ],
      overused_strengths: [
        'Ưu tiên sự ổn định quá mức có thể dẫn đến tâm lý ngại thay đổi hoặc chậm xoay trục',
        'Nhường nhịn và giữ hòa khí bề mặt đôi khi khiến vấn đề cốt lõi không được nói thẳng',
        'Ôm đồm phần việc hỗ trợ người khác mà không nói rõ khi bản thân đã quá tải'
      ],
      blindspots: [
        'Cần nhiều thời gian hơn để thích nghi khi mục tiêu hoặc cấu trúc thay đổi đột ngột',
        'Ngại thể hiện thành tích cá nhân hoặc ngại tranh luận quyết liệt trong đám đông',
        'Đôi khi chần chừ trước các quyết định đòi hỏi chấp nhận rủi ro nhanh'
      ],
      stress_pattern: {
        trigger: 'Thay đổi hỗn loạn không báo trước, môi trường cạnh tranh gay gắt hoặc xung đột trực diện.',
        reaction: 'Im lặng tuân thủ bề ngoài nhưng chậm lại bên trong, thu mình và ngại đưa ra ý kiến.',
        impact: 'Lãnh đạo không nhận ra các điểm nghẽn thực tế cho tới khi tiến độ bị ảnh hưởng.',
        recovery: 'Làm rõ lại lộ trình từng bước, xác định phần việc ổn định có thể kiểm soát ngay.'
      },
      quick_wins: [
        'Chuẩn bị trước 2 ý kiến đóng góp và chủ động phát biểu sớm trong các cuộc họp',
        'Tập nói rõ thứ tự ưu tiên hiện tại khi có đồng nghiệp nhờ việc phát sinh ngoài kế hoạch',
        'Thử nghiệm áp dụng 1 thay đổi nhỏ trong quy trình làm việc mỗi tuần'
      ],
      habits_30d: [
        'Chủ động phản hồi thẳng thắn các rủi ro vận hành ngay khi mới phát hiện dấu hiệu',
        'Thiết lập ranh giới khối lượng công việc rõ ràng để duy trì hiệu suất bền vững'
      ],
      communication_dos: [
        'Bắt đầu bằng thái độ điềm đạm, chân thành và giải thích rõ bối cảnh công việc',
        'Trình bày kế hoạch theo trình tự từng bước logic, có lộ trình thời gian hợp lý',
        'Đặt câu hỏi cụ thể để mời họ chia sẻ góc nhìn và lắng nghe kiên nhẫn'
      ],
      communication_donts: [
        'Tránh thúc ép thô bạo, dồn ép quyết định tức thì khi chưa cung cấp đủ thông tin',
        'Tránh thay đổi yêu cầu xoành xoạch vào phút chót mà không giải thích lý do',
        'Tránh tạo bầu không khí đối đầu căng thẳng không cần thiết'
      ],
      communication_tips: [
        'Trao đổi chân thành, điềm tĩnh và cung cấp lộ trình từng bước rõ ràng',
        'Thông báo sớm các thay đổi để họ có thời gian chuẩn bị chu đáo',
        'Lắng nghe và trân trọng sự đóng góp bền bỉ, ổn định của họ'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc hiệu quả nhất khi có kế hoạch rõ ràng, quy trình ổn định và sự phối hợp chân thành. Khi có thay đổi hoặc việc gấp, hãy cho tôi biết bối cảnh và thứ tự ưu tiên để tôi sắp xếp chu đáo.',
        sliders: { pace: 2, decision_mode: 2, communication_channel: 3, detail_need: 4, change_attitude: 2 },
        contexts: {
          direct_conversation: 'Điềm tĩnh, rõ ràng từng ý; tôi đánh giá cao sự tôn trọng và lắng nghe hai chiều.',
          chat_email: 'Cung cấp đầy đủ bối cảnh, hướng dẫn và thời hạn hợp lý để tôi chuẩn bị tốt nhất.',
          meeting: 'Gửi trước nội dung cần thảo luận để tôi suy nghĩ thấu đáo trước khi phát biểu.',
          decision: 'Cần đánh giá kỹ tính khả thi vận hành và lộ trình chuyển đổi an toàn cho đội ngũ.',
          conflict: 'Trao đổi riêng 1-1 nhẹ nhàng, tập trung tháo gỡ vướng mắc trên tinh thần hợp tác.',
          delegation: 'Làm rõ quy trình, tiêu chí hoàn thành và giữ nhịp phối hợp đều đặn, tránh xáo trộn đột ngột.',
          feedback_recognition: 'Ghi nhận chân thành sự cam kết và ổn định; góp ý riêng tư, cụ thể từng bước cải thiện.'
        }
      },
      adaptation_with: {
        D: 'Đi thẳng vào kết quả công việc, đừng ngại nói thẳng những vướng mắc cần họ quyết định.',
        I: 'Giúp họ chuyển các ý tưởng sôi nổi thành kế hoạch thực hiện tuần tự, khả thi.',
        S: 'Chủ động đứng ra chốt phương án khi cả hai đã lắng nghe đủ ý kiến.',
        C: 'Cùng xây dựng quy trình chuẩn hóa để đảm bảo cả sự ổn định lẫn độ chính xác.'
      },
      ideal_environment: 'Môi trường ổn định, quy trình minh bạch, văn hóa gắn kết lâu dài và tôn trọng con người.',
      suggested_careers: ['Vận hành Nội bộ & Hậu cần', 'Quản trị Nhân sự & Phúc lợi', 'Hỗ trợ Kỹ thuật & Chăm sóc Khách hàng', 'Quản lý Chất lượng Dịch vụ']
    },

    SC: {
      code: 'SC',
      primary: 'S',
      secondary: 'C',
      title: 'Người Thực Thi Chuẩn Chỉ (Methodical Stabilizer)',
      subtitle: 'Thận trọng, tỉ mỉ, kiên trì bảo đảm cả sự ổn định vận hành lẫn độ chính xác chất lượng',
      motto: '“Chuẩn mực từng bước – Vững vàng hệ thống – Bền bỉ chất lượng.”',
      keywords: ['Thận trọng', 'Chuẩn chỉ', 'Đáng tin cậy', 'Có hệ thống', 'Điềm tĩnh'],
      overview:
        'Sự kết hợp giữa S và C giúp bạn trở thành chuyên gia vận hành chuẩn mực và ổn định bậc nhất. Bạn làm việc có kế hoạch, tuân thủ quy trình chặt chẽ, tỉ mỉ trong từng chi tiết và luôn đảm bảo mọi đầu việc được hoàn thành an toàn, chính xác.',
      strengths: [
        'Độ tin cậy và độ chính xác rất cao trong các công việc đòi hỏi quy trình chuẩn',
        'Kiên nhẫn kiểm tra, rà soát và duy trì sự ổn định của hệ thống vận hành',
        'Điềm tĩnh, khách quan, không bị cuốn theo những quyết định bốc đồng',
        'Phối hợp ôn hòa, lịch sự và tôn trọng các cam kết chung của tổ chức'
      ],
      overused_strengths: [
        'Sự thận trọng kép (S + C) dễ dẫn đến chần chừ khi cần ra quyết định nhanh trong tình huống mơ hồ',
        'Ngại thay đổi quy trình đã quen thuộc nếu chưa thấy đầy đủ bằng chứng kiểm nghiệm',
        'Có xu hướng im lặng tự xử lý hoặc chờ đủ 100% thông tin mới báo cáo cảnh báo'
      ],
      blindspots: [
        'Khó thích ứng nhanh với các dự án thử nghiệm liên tục xoay trục (Pivot)',
        'Ngại tranh luận gay gắt để bảo vệ quan điểm trước những người có giọng điệu áp đảo',
        'Đôi khi quá chú trọng sự an toàn mà bỏ lỡ cơ hội cải tiến đột phá'
      ],
      stress_pattern: {
        trigger: 'Yêu cầu làm nhanh bất chấp quy chuẩn, mục tiêu mơ hồ hoặc thay đổi liên tục.',
        reaction: 'Rà soát đi rà soát lại chi tiết, thu mình và giảm tốc độ phản hồi để tránh sai sót.',
        impact: 'Tiến độ chung bị nghẽn ở khâu kiểm duyệt hoặc thiếu sự cảnh báo sớm.',
        recovery: 'Thống nhất rõ mức chất lượng tối thiểu chấp nhận được (MVP standard) và phạm vi miễn trừ rủi ro.'
      },
      quick_wins: [
        'Báo cáo cảnh báo rủi ro sớm ngay ở mức 70% thông tin thay vì chờ hoàn thiện 100%',
        'Khi gặp yêu cầu gấp, hãy đề xuất phương án xử lý tạm thời an toàn (Workaround) trong 24h',
        'Gửi trước quan điểm bằng văn bản trước cuộc họp để tự tin bảo vệ góc nhìn chuyên môn'
      ],
      habits_30d: [
        'Thực hành phân loại quyết định thành "Cần chuẩn xác 100%" và "Có thể thử nghiệm nhanh 80%"',
        'Chủ động đề xuất tự động hóa hoặc tinh gọn 1 quy trình rườm rà mỗi tháng'
      ],
      communication_dos: [
        'Cung cấp văn bản hướng dẫn, thông số yêu cầu và lộ trình thời gian rõ ràng',
        'Cho họ thời gian hợp lý để rà soát dữ liệu trước khi yêu cầu đưa ra kết luận',
        'Trao đổi điềm đạm, lịch sự và dựa trên dẫn chứng thực tế'
      ],
      communication_donts: [
        'Tránh giao việc miệng mơ hồ rồi thúc ép phải nộp kết quả ngay lập tức',
        'Tránh ép họ bỏ qua các bước kiểm soát rủi ro cốt lõi mà không có người chịu trách nhiệm',
        'Tránh gây áp lực cảm xúc hoặc tranh cãi ồn ào'
      ],
      communication_tips: [
        'Trao đổi có cấu trúc, cung cấp đầy đủ thông tin nền tảng và tiêu chuẩn chất lượng',
        'Dành thời gian để họ phân tích và chuẩn bị phản hồi thấu đáo',
        'Trân trọng tính cẩn trọng và khả năng giữ ổn định hệ thống của họ'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc cẩn trọng, có hệ thống và luôn đảm bảo chất lượng ổn định. Hãy cung cấp cho tôi yêu cầu rõ ràng bằng văn bản, tiêu chí nghiệm thu cụ thể và lộ trình thời gian hợp lý.',
        sliders: { pace: 2, decision_mode: 1, communication_channel: 2, detail_need: 5, change_attitude: 2 },
        contexts: {
          direct_conversation: 'Điềm tĩnh, mạch lạc; nếu vấn đề phức tạp hãy gửi trước thông tin để tôi xem qua trước khi trao đổi.',
          chat_email: 'Tôi ưu tiên tin nhắn/email có cấu trúc rõ ràng, đầy đủ bối cảnh, số liệu và thời hạn cụ thể.',
          meeting: 'Cần có tài liệu trước buổi họp; tôi đóng góp tốt nhất khi được chuẩn bị dữ kiện kỹ lưỡng.',
          decision: 'Dựa trên dữ liệu kiểm chứng, đánh giá rủi ro cẩn thận và có quy trình thực thi rõ ràng.',
          conflict: 'Thảo luận bình tĩnh dựa trên quy chuẩn, dữ kiện khách quan và tôn trọng lẫn nhau.',
          delegation: 'Làm rõ phạm vi, quy trình chuẩn và tiêu chí hoàn thành (DoD) ngay từ khi bắt đầu.',
          feedback_recognition: 'Đánh giá khách quan, cụ thể dựa trên chất lượng thực tế và sự bền bỉ đóng góp.'
        }
      },
      adaptation_with: {
        D: 'Mở đầu bằng kết luận ngắn gọn và phương án đề xuất trước khi trình bày chi tiết.',
        I: 'Giúp họ chuẩn hóa ý tưởng sáng tạo thành quy trình và checklist khả thi.',
        S: 'Cùng thống nhất mốc thời gian chốt phương án để giữ đúng tiến độ dự án.',
        C: 'Đặt giới hạn thời gian phân tích để tránh sa đà vào tiểu tiết quá mức.'
      },
      ideal_environment: 'Môi trường chuyên nghiệp, có quy chuẩn rõ ràng, đề cao chất lượng, sự an toàn và tính ổn định.',
      suggested_careers: ['Kiểm soát Chất lượng (QA/QC)', 'Kế toán – Kiểm toán – Tuân thủ', 'Quản trị Hệ thống & Dữ liệu', 'Chuyên viên Quy trình Vận hành']
    },

    CS: {
      code: 'CS',
      primary: 'C',
      secondary: 'S',
      title: 'Người Bảo Chứng Chất Lượng (Precision Guardian)',
      subtitle: 'Chuẩn xác, có hệ thống, kiên trì bảo vệ tiêu chuẩn chuyên môn và sự an toàn vận hành',
      motto: '“Chính xác trong phân tích – Kiên định trong thực thi – Vững vàng chất lượng.”',
      keywords: ['Chính xác', 'Hệ thống', 'Tỉ mỉ', 'Bền bỉ', 'An toàn'],
      overview:
        'Bạn có tư duy phân tích sắc bén của nhóm C kết hợp với sự bền bỉ, điềm tĩnh của nhóm S. Bạn luôn làm việc với tinh thần trách nhiệm cao, chú trọng độ chính xác của dữ liệu và kiên trì hoàn thiện hệ thống đạt chuẩn mực cao nhất.',
      strengths: [
        'Phân tích sâu sắc, phát hiện sớm các lỗ hổng kỹ thuật hoặc rủi ro vận hành',
        'Kiên trì theo đuổi công việc chuyên môn phức tạp đòi hỏi sự tỉ mỉ cao độ',
        'Xây dựng tài liệu, quy trình và hệ thống tiêu chuẩn rất mạch lạc, bền vững',
        'Thái độ làm việc điềm đạm, nghiêm túc và giữ đúng lời hứa chất lượng'
      ],
      overused_strengths: [
        'Cầu toàn quá mức ở các chi tiết nhỏ có thể làm chậm tiến độ bàn giao tổng thể',
        'Bám quá chặt vào quy định hiện hành khiến việc xử lý ngoại lệ bị cứng nhắc',
        'Ngại đưa ra nhận định sơ bộ khi dữ liệu chưa đạt độ tin cậy tuyệt đối'
      ],
      blindspots: [
        'Đôi khi trình bày quá nhiều thông tin chi tiết khiến người nghe khó nắm ý chính ngay',
        'Cần linh hoạt hơn khi phối hợp với những bộ phận ưu tiên tốc độ thử nghiệm',
        'Dễ căng thẳng ngầm khi phải làm việc trong môi trường thiếu quy trình chuẩn'
      ],
      stress_pattern: {
        trigger: 'Phải chịu trách nhiệm cho sản phẩm chưa kịp kiểm tra kỹ hoặc yêu cầu thay đổi liên tục thiếu căn cứ.',
        reaction: 'Tăng cường kiểm tra từng tiểu tiết, yêu cầu xác nhận bằng văn bản và thu hẹp phạm vi linh hoạt.',
        impact: 'Các bộ phận phối hợp cảm thấy quy trình nặng nề và chậm tốc độ phản hồi.',
        recovery: 'Xác định rõ 20% tiêu chí cốt lõi quyết định 80% sự an toàn của dự án để ưu tiên xử lý trước.'
      },
      quick_wins: [
        'Luôn đặt 3 dòng "Tóm tắt kết luận & Đề xuất" ở đầu mỗi báo cáo hoặc email phân tích',
        'Chia sẻ bản nháp khung sườn (Outline 30%) sớm để thống nhất hướng đi trước khi làm chi tiết',
        'Khi chỉ ra rủi ro, hãy luôn đính kèm ít nhất 1 phương án tháo gỡ khả thi'
      ],
      habits_30d: [
        'Áp dụng Time-boxing (Giới hạn thời gian phân tích) cho các quyết định vận hành hàng ngày',
        'Ghi nhận nỗ lực và ý tưởng của đồng nghiệp trước khi đưa ra các nhận xét hiệu chỉnh kỹ thuật'
      ],
      communication_dos: [
        'Trình bày mạch lạc, có dẫn chứng số liệu và tiêu chí đánh giá rõ ràng',
        'Tôn trọng quy trình làm việc và gửi trước tài liệu khi cần họ thẩm định sâu',
        'Trao đổi lịch sự, điềm tĩnh và tập trung vào bản chất chuyên môn'
      ],
      communication_donts: [
        'Tránh nói chung chung, phóng đại hoặc ép duyệt nhanh mà không có dữ liệu',
        'Tránh thay đổi yêu cầu miệng liên tục mà không cập nhật vào tài liệu chung',
        'Tránh thúc ép bằng áp lực cảm xúc'
      ],
      communication_tips: [
        'Cung cấp dữ liệu chính xác, bối cảnh đầy đủ và tiêu chuẩn đầu ra rõ ràng',
        'Tôn trọng thời gian rà soát chuyên môn để đảm bảo chất lượng',
        'Trao đổi bằng văn bản có cấu trúc kết hợp thảo luận điềm tĩnh'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi chú trọng tính chính xác, logic và sự ổn định của quy trình. Khi phối hợp với tôi, hãy cung cấp thông tin có cấu trúc, dữ kiện cụ thể và làm rõ tiêu chuẩn nghiệm thu ngay từ đầu.',
        sliders: { pace: 2, decision_mode: 1, communication_channel: 1, detail_need: 5, change_attitude: 2 },
        contexts: {
          direct_conversation: 'Mạch lạc, đi vào dữ kiện cụ thể; rất tốt nếu bạn gửi trước nội dung chính qua tin nhắn.',
          chat_email: 'Tôi thích văn bản có cấu trúc rõ ràng, đính kèm số liệu/tài liệu tham chiếu và thời hạn cụ thể.',
          meeting: 'Cần có agenda và tài liệu gửi trước; thảo luận tập trung vào dữ kiện và giải pháp khả thi.',
          decision: 'Cần bảng so sánh ưu/nhược điểm, dữ liệu kiểm chứng và phương án phòng ngừa rủi ro.',
          conflict: 'Đối chiếu bình tĩnh dựa trên dữ liệu, tiêu chuẩn chung và trao đổi riêng 1-1 tôn trọng.',
          delegation: 'Xác định rõ thông số đầu vào, quy trình thực hiện và tiêu chuẩn chất lượng đầu ra.',
          feedback_recognition: 'Phản hồi khách quan kèm dẫn chứng cụ thể; ghi nhận giá trị chuyên môn và độ chính xác.'
        }
      },
      adaptation_with: {
        D: 'Đưa kết luận và khuyến nghị hành động lên đầu tiên, để phần số liệu chi tiết ở phụ lục.',
        I: 'Ghi nhận ý tưởng sáng tạo của họ trước rồi mới cùng họ rà soát tính khả thi từng bước.',
        S: 'Phối hợp nhịp nhàng và cùng nhau chủ động chốt mốc thời gian hoàn thành.',
        C: 'Thống nhất ngưỡng "đủ dữ liệu để chốt" nhằm bảo đảm tốc độ chung.'
      },
      ideal_environment: 'Môi trường chuyên môn sâu, quy trình chuẩn hóa, đề cao tính chính xác, đạo đức nghề nghiệp và sự ổn định.',
      suggested_careers: ['Phân tích Dữ liệu / Nghiệp vụ (BA/DA)', 'Kỹ sư Đảm bảo Chất lượng / Bảo mật', 'Quản trị Rủi ro & Tuân thủ', 'Nghiên cứu & Phát triển (R&D)']
    },

    C: {
      code: 'C',
      primary: 'C',
      secondary: null,
      title: 'Người Phân Tích Chuẩn Xác (Conscientious / Analyst)',
      subtitle: 'Tư duy logic, khách quan, đề cao tiêu chuẩn chất lượng và quyết định dựa trên dữ liệu',
      motto: '“Dữ liệu dẫn đường – Logic soi sáng – Chất lượng làm gốc.”',
      keywords: ['Logic', 'Chuẩn xác', 'Phân tích', 'Hệ thống', 'Khách quan'],
      overview:
        'Bạn mang phong cách Chuẩn xác (C) đặc trưng với tư duy hệ thống, logic chặt chẽ và tiêu chuẩn chất lượng cao. Bạn luôn tìm hiểu bản chất vấn đề dựa trên dữ liệu thực tế và giúp tổ chức ngăn ngừa các rủi ro sai sót quan trọng.',
      strengths: [
        'Tư duy phân tích logic, khách quan và làm việc dựa trên bằng chứng xác thực',
        'Thiết lập tiêu chuẩn chất lượng cao, quy trình chặt chẽ và kiểm soát lỗi xuất sắc',
        'Khả năng giải quyết các bài toán kỹ thuật, chuyên môn phức tạp một cách có hệ thống',
        'Độc lập, kỷ luật cao và luôn rà soát kỹ lưỡng trước khi đưa ra kết luận'
      ],
      overused_strengths: [
        'Phân tích quá lâu để tìm phương án hoàn hảo dễ làm lỡ thời điểm quyết định nhanh',
        'Đặt tiêu chuẩn quá khắt khe đôi khi khiến đồng nghiệp cảm thấy bị soi xét tiểu tiết',
        'Ưu tiên văn bản và số liệu tuyệt đối có thể làm giảm sự kết nối cảm xúc trong nhóm'
      ],
      blindspots: [
        'Dễ rơi vào trạng thái "tê liệt vì phân tích" (Analysis Paralysis) khi thiếu dữ liệu',
        'Cách phản biện thẳng vào lỗi logic đôi khi nghe khô khan và làm giảm hứng khởi của người khác',
        'Ngại chia sẻ sản phẩm khi mới ở dạng bản nháp sơ bộ'
      ],
      stress_pattern: {
        trigger: 'Làm việc cảm tính thiếu quy chuẩn, bị ép cam kết khi chưa có số liệu hoặc sai sót chất lượng lặp lại.',
        reaction: 'Trở nên khắt khe, bắt lỗi chi tiết, rút về làm việc độc lập và yêu cầu mọi thứ qua văn bản.',
        impact: 'Tốc độ phối hợp liên phòng ban chậm lại và không khí thảo luận trở nên căng thẳng.',
        recovery: 'Làm rõ mức độ rủi ro chấp nhận được của nhiệm vụ và thống nhất ưu tiên giải pháp khả thi.'
      },
      quick_wins: [
        'Áp dụng cấu trúc BLUF (Kết luận 3 dòng ở đầu) khi gửi báo cáo phân tích cho các bên',
        'Ghi nhận 1 điểm hợp lý trong ý tưởng của đồng nghiệp trước khi nêu câu hỏi phản biện rủi ro',
        'Đặt giới hạn thời gian thu thập dữ liệu để đưa ra quyết định đúng hạn'
      ],
      habits_30d: [
        'Chia sẻ bản nháp 30% sớm với các bên liên quan để lấy phản hồi thay vì làm một mình đến 100%',
        'Phân biệt rõ "Tiêu chuẩn bắt buộc" và "Mong muốn hoàn hảo thêm" khi rà soát công việc'
      ],
      communication_dos: [
        'Cung cấp số liệu, dẫn chứng logic và trình bày có cấu trúc mạch lạc',
        'Nêu rõ tiêu chí đánh giá chất lượng và phạm vi yêu cầu ngay từ đầu',
        'Tôn trọng không gian làm việc tập trung sâu (Deep Work) của họ'
      ],
      communication_donts: [
        'Tránh nói cảm tính, thiếu căn cứ hoặc dùng khẩu hiệu chung chung để thuyết phục',
        'Tránh thúc ép trả lời phức tạp ngay lập tức mà không cho thời gian kiểm tra dữ liệu',
        'Tránh làm ẩu, bỏ qua các bước kiểm tra chất lượng cốt lõi'
      ],
      communication_tips: [
        'Chuẩn bị đầy đủ dữ liệu, dẫn chứng và lập luận logic khi trao đổi',
        'Viết yêu cầu công việc rõ ràng, có cấu trúc và tiêu chí nghiệm thu',
        'Đánh giá cao sự tỉ mỉ và góc nhìn cảnh báo rủi ro của họ'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi làm việc dựa trên dữ liệu, logic và tiêu chuẩn chất lượng rõ ràng. Khi trao đổi với tôi, hãy cung cấp thông tin có cấu trúc, dẫn chứng cụ thể và cho tôi khoảng thời gian hợp lý để phân tích thấu đáo.',
        sliders: { pace: 2, decision_mode: 1, communication_channel: 1, detail_need: 5, change_attitude: 2 },
        contexts: {
          direct_conversation: 'Đi thẳng vào dữ kiện, logic vấn đề và nêu rõ câu hỏi chuyên môn cần giải quyết.',
          chat_email: 'Ưu tiên văn bản có cấu trúc bullet-point, đính kèm tài liệu/số liệu liên quan và tiêu chí rõ ràng.',
          meeting: 'Gửi trước agenda và dữ liệu để tôi nghiên cứu; cuộc họp nên tập trung phân tích giải pháp thực chất.',
          decision: 'Cần dựa trên bằng chứng thực tế, phân tích rủi ro – lợi ích và tiêu chuẩn kỹ thuật minh bạch.',
          conflict: 'Tranh luận khách quan dựa trên dữ liệu và logic, tách biệt hoàn toàn khỏi cảm xúc cá nhân.',
          delegation: 'Làm rõ yêu cầu kỹ thuật, quy chuẩn áp dụng và tiêu chí nghiệm thu (Definition of Done).',
          feedback_recognition: 'Phản hồi cụ thể, chính xác dựa trên bằng chứng; ghi nhận chất lượng chuyên môn và chiều sâu phân tích.'
        }
      },
      adaptation_with: {
        D: 'Trình bày kết luận và phương án đề xuất ngay đầu tiên, không mở bài quá dài bằng chi tiết kỹ thuật.',
        I: 'Tôn trọng sự sáng tạo của họ và chọn 2-3 điểm cốt lõi nhất để giúp họ hoàn thiện kế hoạch.',
        S: 'Giải thích tiêu chuẩn kỹ thuật với thái độ nhẹ nhàng, đồng hành và tôn trọng.',
        C: 'Cùng đặt mốc thời gian chốt phương án để chuyển từ phân tích sang thực thi đúng hạn.'
      },
      ideal_environment: 'Môi trường tôn trọng chuyên môn sâu, dữ liệu minh bạch, quy trình rõ ràng và có không gian tập trung.',
      suggested_careers: ['Kỹ sư Phần mềm / Kiến trúc Hệ thống', 'Chuyên gia Phân tích Tài chính / Dữ liệu', 'Kiểm toán / Pháp chế / Tuân thủ', 'Nghiên cứu Chuyên sâu & Chiến lược']
    },

    CD: {
      code: 'CD',
      primary: 'C',
      secondary: 'D',
      title: 'Người Kiến Trúc Chiến Lược (Strategic Architect)',
      subtitle: 'Sắc bén, chuẩn xác, kết hợp tư duy hệ thống chặt chẽ với sự quyết liệt đạt kết quả',
      motto: '“Thiết kế chuẩn xác – Thực thi quyết liệt – Tối ưu hiệu suất.”',
      keywords: ['Chiến lược', 'Logic sắc bén', 'Tiêu chuẩn cao', 'Độc lập', 'Tối ưu'],
      overview:
        'Bạn kết hợp chiều sâu phân tích chuẩn xác của nhóm C với sự quyết đoán, hướng kết quả của nhóm D. Bạn nhìn vấn đề như một kiến trúc sư hệ thống: vừa đòi hỏi tính logic, chất lượng cao, vừa tập trung giải quyết triệt để bài toán hiệu suất.',
      strengths: [
        'Tư duy hệ thống sắc bén, giải quyết các bài toán phức tạp bằng giải pháp thực chất',
        'Độc lập, tự chủ cao, vừa kiểm soát chặt chất lượng vừa đảm bảo mục tiêu đầu ra',
        'Phản biện thẳng thắn dựa trên dữ liệu để loại bỏ các phương án kém hiệu quả',
        'Thiết lập quy chuẩn vận hành tinh gọn và nâng cao năng suất dài hạn'
      ],
      overused_strengths: [
        'Sự kết hợp giữa tiêu chuẩn khắt khe (C) và thẳng thắn (D) dễ tạo cảm giác lạnh lùng, khó tính',
        'Phản biện quá sắc lạnh trong cuộc họp có thể làm đồng nghiệp ngại đề xuất ý tưởng mới',
        'Có xu hướng tự làm một mình vì thấy người khác làm vừa chậm vừa chưa đạt chuẩn'
      ],
      blindspots: [
        'Đôi khi ít chú ý đến khía cạnh cảm xúc và nhu cầu khích lệ tinh thần của đội ngũ',
        'Khó kiên nhẫn với những cuộc trao đổi mang tính xã giao hoặc cảm tính',
        'Dễ tạo áp lực lớn lên người phối hợp khi yêu cầu đồng thời cả tốc độ lẫn độ chính xác cao'
      ],
      stress_pattern: {
        trigger: 'Phải làm việc với quy trình kém hiệu quả, sai sót lặp lại hoặc sự thiếu quyết đoán cảm tính.',
        reaction: 'Chỉ trích thẳng vào lỗi logic, thu quyền quyết định về mình và đặt tiêu chuẩn kiểm soát gắt gao.',
        impact: 'Đội ngũ cảm thấy áp lực nặng nề, giảm sự cởi mở và sáng tạo.',
        recovery: 'Khẳng định lại mục tiêu hỗ trợ chung và lắng nghe khó khăn thực tế của người thực thi.'
      },
      quick_wins: [
        'Mở đầu phần phản biện bằng việc khẳng định mục tiêu chung và ghi nhận nỗ lực của người đề xuất',
        'Khi giao việc, giải thích rõ tiêu chuẩn cốt lõi và留 không gian để đồng đội phát huy sáng kiến',
        'Dành 5 phút hỏi thăm và lắng nghe phản hồi con người trong các buổi họp kỹ thuật'
      ],
      habits_30d: [
        'Thực hành phản hồi cân bằng: Nêu điểm đạt chuẩn trước + Điểm cần tối ưu kèm gợi ý tháo gỡ',
        'Xây dựng tài liệu hướng dẫn chuẩn để trao quyền thay vì tự ôm việc về làm'
      ],
      communication_dos: [
        'Trình bày ngắn gọn, logic, dựa trên dữ kiện thực tế và hướng thẳng vào giải pháp',
        'Chuẩn bị sẵn phân tích hiệu quả – rủi ro trước khi đề xuất phương án',
        'Tôn trọng tính độc lập chuyên môn và cam kết chất lượng'
      ],
      communication_donts: [
        'Tránh trình bày lan man, cảm tính hoặc che giấu sai sót số liệu',
        'Tránh làm mất thời gian bằng các thủ tục hình thức không tạo ra giá trị thực',
        'Tránh can thiệp vụn vặt khi đã thống nhất tiêu chuẩn đầu ra'
      ],
      communication_tips: [
        'Giao tiếp súc tích, có cấu trúc logic và chứng minh bằng dữ liệu thực tế',
        'Đi thẳng vào bài toán hiệu suất, rủi ro cốt lõi và giải pháp tối ưu',
        'Tôn trọng tiêu chuẩn chuyên môn và phạm vi tự chủ của họ'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi đề cao tính logic, dữ liệu chuẩn xác và hiệu quả thực chất. Khi trao đổi với tôi, hãy đi thẳng vào vấn đề, trình bày có cấu trúc kèm số liệu và phương án giải quyết rõ ràng.',
        sliders: { pace: 4, decision_mode: 1, communication_channel: 2, detail_need: 4, change_attitude: 3 },
        contexts: {
          direct_conversation: 'Ngắn gọn, mạch lạc, tập trung vào bài toán cần giải quyết và dữ kiện cốt lõi.',
          chat_email: 'Văn bản súc tích, cấu trúc rõ [Vấn đề - Dữ liệu - Đề xuất - Thời hạn].',
          meeting: 'Đi đúng agenda, phân tích thẳng vào nguyên nhân gốc rễ và chốt giải pháp thực thi.',
          decision: 'Dựa trên dữ liệu định lượng, tính logic hệ thống và hiệu quả thực tế mang lại.',
          conflict: 'Tranh luận thẳng thắn, khách quan dựa trên bằng chứng để tìm phương án tối ưu nhất.',
          delegation: 'Thống nhất tiêu chuẩn chất lượng (DoD) và mốc hoàn thành; tôn trọng sự tự chủ chuyên môn.',
          feedback_recognition: 'Góp ý thẳng, chính xác vào bản chất vấn đề; ghi nhận bằng sự tôn trọng năng lực chuyên môn.'
        }
      },
      adaptation_with: {
        D: 'Trao đổi thẳng vào mục tiêu và kết luận dựa trên dữ liệu cốt lõi.',
        I: 'Lắng nghe ý tưởng mới với thái độ cởi mở hơn trước khi đặt câu hỏi kiểm chứng kỹ thuật.',
        S: 'Mềm화 giọng điệu phản biện và giải thích rõ lộ trình để họ yên tâm phối hợp.',
        C: 'Tập trung vào các tiêu chuẩn quan trọng nhất để đẩy nhanh tốc độ quyết định.'
      },
      ideal_environment: 'Môi trường đề cao năng lực thực chất, tư duy hệ thống, tự chủ chuyên môn và hiệu suất cao.',
      suggested_careers: ['Kiến trúc sư Giải pháp / Công nghệ (CTO/SA)', 'Giám đốc Vận hành / Chiến lược', 'Chuyên gia Tối ưu Hệ thống & Dữ liệu', 'Quản lý Đầu tư & Phân tích Định lượng']
    },

    DC: {
      code: 'DC',
      primary: 'D',
      secondary: 'C',
      title: 'Người Thực Thi Chuẩn Xác & Quyết Liệt (Resolute Challenger)',
      subtitle: 'Quyết đoán thúc đẩy kết quả đi đôi với tiêu chuẩn kiểm soát chất lượng khắt khe',
      motto: '“Quyết liệt hành động – Chuẩn xác từng khâu – Vượt chuẩn mục tiêu.”',
      keywords: ['Quyết liệt', 'Chuẩn xác', 'Thực chiến', 'Kỷ luật cao', 'Sắc bén'],
      overview:
        'Bạn sở hữu sự quyết liệt hướng kết quả của nhóm D kết hợp với tư duy kiểm soát chuẩn xác của nhóm C. Bạn vừa muốn đi nhanh tới mục tiêu, vừa đòi hỏi tiêu chuẩn chất lượng thực chất, không chấp nhận sự hời hợt hay làm qua loa.',
      strengths: [
        'Giải quyết vấn đề cực kỳ quyết liệt trên nền tảng phân tích thực tế vững chắc',
        'Đặt tiêu chuẩn cao cho bản thân và dự án, đảm bảo kết quả vừa nhanh vừa chất lượng',
        'Nhìn thấu các điểm nghẽn vận hành và xử lý dứt điểm tận gốc rễ',
        'Vững vàng, độc lập trước áp lực lớn hoặc các bài toán khủng hoảng kỹ thuật'
      ],
      overused_strengths: [
        'Yêu cầu đồng thời cả tốc độ nhanh (D) lẫn độ chính xác tuyệt đối (C) dễ gây áp lực lớn cho đồng đội',
        'Thái độ thẳng thắn và khắt khe dễ làm các thành viên mới cảm thấy e dè',
        'Đôi khi cứng nhắc bảo vệ phương án của mình vì tin rằng đã tính toán kỹ nhất'
      ],
      blindspots: [
        'Thiếu kiên nhẫn khi phải thuyết phục mềm mỏng hoặc chờ đợi sự đồng thuận cảm xúc',
        'Đôi khi quên khích lệ tinh thần đội ngũ trong các chặng đường dài nhiều áp lực',
        'Cần tạo thêm không gian an toàn để mọi người dám thử nghiệm và báo cáo sai sót sớm'
      ],
      stress_pattern: {
        trigger: 'Tiến độ bị đình trệ do sự thiếu chuyên nghiệp hoặc sai sót chủ quan lặp đi lặp lại.',
        reaction: 'Tăng cường chỉ đạo trực diện, siết chặt kiểm tra từng bước và phản biện rất gắt.',
        impact: 'Các thành viên làm việc trong tâm thế phòng vệ, chỉ làm đúng mệnh lệnh để tránh bị bắt lỗi.',
        recovery: 'Phân tách rõ các hạng mục ưu tiên tốc độ và hạng mục ưu tiên độ chính xác; trao đổi cởi mở về giải pháp.'
      },
      quick_wins: [
        'Dành 10 phút đầu buổi họp để lắng nghe ý tưởng của nhóm mà chưa vội phán xét đúng - sai',
        'Nêu rõ mức độ ưu tiên của từng việc: việc nào cần "Nhanh 80%", việc nào cần "Chuẩn 100%"',
        'Bổ sung lời ghi nhận cụ thể khi đồng đội hoàn thành tốt một hạng mục khó'
      ],
      habits_30d: [
        'Thực hành đặt câu hỏi coaching ("Bạn đề xuất hướng nào?") trước khi đưa ra chỉ đạo trực tiếp',
        'Xây dựng cơ chế rà soát chất lượng theo hệ thống thay vì tạo áp lực cá nhân'
      ],
      communication_dos: [
        'Đi thẳng vào mục tiêu, kết luận chính và chứng minh bằng số liệu thực tế',
        'Báo cáo tiến độ minh bạch, nêu rõ rủi ro kèm phương án xử lý đã chuẩn bị',
        'Giữ đúng cam kết về cả thời hạn lẫn tiêu chuẩn chất lượng'
      ],
      communication_donts: [
        'Tránh báo cáo cảm tính, vòng vo hoặc viện lý do khi chưa nỗ lực tìm giải pháp',
        'Tránh bàn giao sản phẩm cẩu thả chưa qua tự kiểm tra',
        'Tránh hứa hẹn suông mà không có kế hoạch thực thi cụ thể'
      ],
      communication_tips: [
        'Trình bày trực diện, súc tích, kết hợp giữa mục tiêu đầu ra và căn cứ dữ liệu',
        'Chủ động đề xuất giải pháp thực tế khi nêu vấn đề hoặc rủi ro',
        'Tôn trọng tính kỷ luật, tốc độ và tiêu chuẩn chất lượng đã cam kết'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi tập trung cao vào kết quả thực chất, tốc độ xử lý và độ chính xác chuyên môn. Hãy trao đổi thẳng vào trọng tâm, đi kèm dữ kiện rõ ràng và phương án hành động cụ thể.',
        sliders: { pace: 5, decision_mode: 2, communication_channel: 3, detail_need: 4, change_attitude: 4 },
        contexts: {
          direct_conversation: 'Trực diện, ngắn gọn, nêu rõ kết luận và các dữ kiện chính ngay từ đầu.',
          chat_email: 'Đi thẳng vào mục đích, các thông số quan trọng và thời hạn cần chốt.',
          meeting: 'Tập trung giải quyết dứt điểm từng vấn đề dựa trên dữ liệu và chốt rõ trách nhiệm thực thi.',
          decision: 'Đánh giá nhanh trên cơ sở dữ liệu thực tế, hiệu quả đầu ra và kiểm soát rủi ro cốt lõi.',
          conflict: 'Thẳng thắn nhìn vào sự thật và dữ kiện để chọn phương án hiệu quả nhất cho mục tiêu chung.',
          delegation: 'Rõ mục tiêu, rõ tiêu chuẩn chất lượng và rõ thời hạn; chủ động báo sớm nếu có điểm nghẽn.',
          feedback_recognition: 'Phản hồi trực diện, kịp thời dựa trên kết quả và tiêu chuẩn; ghi nhận bằng sự tin tưởng giao trọng trách.'
        }
      },
      adaptation_with: {
        D: 'Tập trung vào mục tiêu chung và thống nhất nhanh dữ kiện làm căn cứ quyết định.',
        I: 'Kiên nhẫn lắng nghe ý tưởng mới của họ trước khi đặt các tiêu chí kiểm duyệt khắt khe.',
        S: 'Hạ bớt áp lực giọng điệu và đồng hành giải thích rõ lộ trình thực hiện.',
        C: 'Tôn trọng quy trình phân tích của họ và cùng xác định mốc thời gian chốt phương án.'
      },
      ideal_environment: 'Môi trường thực chiến, kỷ luật cao, đánh giá công bằng theo năng lực và kết quả chất lượng.',
      suggested_careers: ['Giám đốc Dự án Kỹ thuật / Công nghệ', 'Quản lý Vận hành & Tối ưu Quy trình', 'Trưởng bộ phận Kiểm soát Rủi ro / Đầu tư', 'Chuyên gia Tư vấn Giải pháp Doanh nghiệp']
    },

    BALANCED: {
      code: 'BALANCED',
      primary: 'D',
      secondary: 'S',
      title: 'Người Linh Hoạt Đa Miền (Context-Adaptive / Balanced)',
      subtitle: 'Cân bằng giữa 4 xu hướng D-I-S-C, dễ dàng điều chỉnh vai trò theo yêu cầu thực tế của từng nhiệm vụ',
      motto: '“Hiểu đúng ngữ cảnh – Điều chỉnh linh hoạt – Kết nối mọi phong cách.”',
      keywords: ['Linh hoạt', 'Đa nhiệm', 'Cầu nối', 'Thích ứng', 'Cân bằng'],
      overview:
        'Hồ sơ của bạn có mức độ phân bổ tương đối cân bằng giữa các miền hành vi D, I, S, C (chênh lệch giữa điểm cao nhất và thấp nhất nhỏ). Điều này cho thấy bạn không bị đóng khung vào một cực cố định mà có khả năng đọc tình huống để điều chỉnh linh hoạt giữa việc thúc đẩy kết quả, kết nối con người, giữ nhịp ổn định hoặc phân tích chi tiết.',
      strengths: [
        'Làm cầu nối hiệu quả giữa các đồng nghiệp có phong cách trái ngược (như D với S, hoặc I với C)',
        'Thích ứng tốt với nhiều vai trò và giai đoạn khác nhau của dự án',
        'Nhìn nhận vấn đề đa chiều, cân bằng giữa mục tiêu công việc và sự hài hòa đội ngũ',
        'Giao tiếp linh hoạt, dễ dàng điều chỉnh nhịp độ theo đối tượng tương tác'
      ],
      overused_strengths: [
        'Điều chỉnh theo ngữ cảnh liên tục đôi khi khiến đồng nghiệp khó đoán định phong cách ưu tiên cố định của bạn',
        'Cân nhắc quá nhiều góc nhìn (tốc độ, cảm xúc, ổn định, chi tiết) đôi khi làm tốn năng lượng nội tâm',
        'Dễ nhận vai trò "lấp khoảng trống" cho cả nhóm dẫn đến phân tán trọng tâm cá nhân'
      ],
      blindspots: [
        'Khi gặp áp lực cao, có thể mất thêm thời gian để chọn chế độ phản ứng phù hợp nhất',
        'Cần chủ động tuyên bố rõ "chế độ làm việc" của mình trong từng dự án để đồng đội dễ phối hợp',
        'Tránh ôm đồm quá nhiều vai trò khác nhau trong cùng một thời điểm'
      ],
      stress_pattern: {
        trigger: 'Phải đứng giữa hòa giải quá nhiều xung đột phong cách hoặc nhận các yêu cầu mâu thuẫn nhau cùng lúc.',
        reaction: 'Cố gắng tự điều chỉnh để đáp ứng tất cả các bên dẫn đến tiêu hao năng lượng nhanh.',
        impact: 'Mệt mỏi vì chuyển đổi ngữ cảnh (Context Switching) liên tục trong ngày.',
        recovery: 'Xác định rõ vai trò chính (Primary Hat) của mình trong từng dự án và nói rõ kỳ vọng với nhóm.'
      },
      quick_wins: [
        'Nêu rõ phong cách ưu tiên của bạn ở đầu mỗi dự án (VD: "Trong dự án này tôi ưu tiên tốc độ D hay độ chuẩn xác C")',
        'Tận dụng khả năng cầu nối để giúp tóm tắt và dung hòa các ý kiến trái chiều trong cuộc họp',
        'Thiết lập khung giờ làm việc theo từng nhóm tính chất công việc để giảm chuyển đổi ngữ cảnh'
      ],
      habits_30d: [
        'Xây dựng Cẩm nang cộng tác ("How to Work With Me") cụ thể để đồng nghiệp không phải đoán phong cách của bạn',
        'Định kỳ rà soát lại các mục tiêu cá nhân trọng tâm thay vì chỉ chạy theo hỗ trợ khoảng trống của nhóm'
      ],
      communication_dos: [
        'Làm rõ tính chất của nhiệm vụ hiện tại (cần tốc độ nhanh, cần ý tưởng mở hay cần độ chính xác sâu)',
        'Trao đổi thẳng thắn, rõ ràng về mục tiêu và kỳ vọng phối hợp',
        'Phát huy vai trò điều phối và kết nối đa chiều của họ trong nhóm'
      ],
      communication_donts: [
        'Tránh giao nhiều đầu việc có tính chất trái ngược nhau trong cùng một khung giờ ngắn',
        'Tránh mặc định họ sẽ tự xoay xở mọi khoảng trống mà không làm rõ phạm vi trách nhiệm',
        'Tránh đưa ra yêu cầu mơ hồ về thứ tự ưu tiên'
      ],
      communication_tips: [
        'Nêu rõ bối cảnh và ưu tiên của nhiệm vụ (Tốc độ, Sáng tạo, Ổn định hay Chính xác)',
        'Thống nhất rõ vai trò và phạm vi trách nhiệm trong từng dự án cụ thể',
        'Tận dụng góc nhìn đa chiều của họ để kết nối các thành viên trong nhóm'
      ],
      manual_defaults: {
        best_read_in_60s: 'Tôi có phong cách làm việc linh hoạt theo ngữ cảnh nhiệm vụ. Khi trao đổi với tôi, hãy cho tôi biết bài toán hiện tại đang ưu tiên Tốc độ, Ý tưởng mới, Sự ổn định hay Độ chính xác để chúng ta phối hợp ăn ý nhất.',
        sliders: { pace: 3, decision_mode: 3, communication_channel: 3, detail_need: 3, change_attitude: 3 },
        contexts: {
          direct_conversation: 'Linh hoạt và đi vào trọng tâm; hãy nêu rõ mục tiêu cuộc trao đổi và điều bạn cần chúng ta cùng thống nhất.',
          chat_email: 'Rõ ràng, mạch lạc; ghi rõ mức độ khẩn cấp và thời hạn mong muốn phản hồi.',
          meeting: 'Tôi thích cuộc họp cân bằng giữa việc lắng nghe đa chiều và chốt hành động thực tế cuối buổi.',
          decision: 'Kết hợp cả dữ liệu thực tế lẫn sự đồng thuận của đội ngũ tùy theo mức độ quan trọng của quyết định.',
          conflict: 'Tìm điểm chung dựa trên mục tiêu dự án và dữ kiện khách quan, giữ sự tôn trọng hai chiều.',
          delegation: 'Làm rõ tính chất ưu tiên của đầu việc (nhanh hay chuẩn sâu) và thống nhất mốc cập nhật.',
          feedback_recognition: 'Phản hồi thẳng thắn, cân bằng giữa ghi nhận nỗ lực và góp ý cải thiện cụ thể.'
        }
      },
      adaptation_with: {
        D: 'Bật chế độ súc tích, đi thẳng vào kết quả và tốc độ.',
        I: 'Bật chế độ cởi mở, cùng thảo luận ý tưởng và chốt lại các bước tiếp theo.',
        S: 'Bật chế độ điềm tĩnh, làm rõ lộ trình từng bước và đồng hành ổn định.',
        C: 'Bật chế độ dữ liệu, cung cấp dẫn chứng logic và tiêu chuẩn chất lượng rõ ràng.'
      },
      ideal_environment: 'Môi trường đa기능 (Cross-functional), dự án liên phòng ban cần khả năng điều phối và thích ứng linh hoạt.',
      suggested_careers: ['Quản lý Dự án Liên phòng ban (PM/Scrum Master)', 'Business Partner / Điều phối Chiến lược', 'Quản lý Sản phẩm (Product Manager)', 'Tư vấn Quản trị & Vận hành']
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      DISC_DIMENSIONS,
      DISC_PROFILES
    };
  }
  root.DISC_DIMENSIONS = DISC_DIMENSIONS;
  root.DISC_PROFILES = DISC_PROFILES;
})(typeof window !== 'undefined' ? window : globalThis);
