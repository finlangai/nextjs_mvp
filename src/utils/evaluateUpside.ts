export const evaluateUpside = (upside?: number): string => {
    if (upside === undefined || upside === null) {
      return '';
    }
  
    if (upside < 0) {
      return ', với kết quả âm bạn không nên nghĩ đến cổ phiếu này nữa. Việc có lợi nhuận từ những cổ phiếu có giá trị sinh lợi âm thật sự mong manh như mẫu giấy.';
    } else if (upside === 0) {
      return ', như vậy giá cổ phiếu hiện tại đã phản ánh chính xác giá trị thực tế, bạn không nên đầu tư lúc này vì khả năng sẽ không đem lại thu hoạch.';
    } else if (upside <= 5) {
      return ', bạn đang đứng trước khả năng có thể thu được lợi nhuận với cổ phiếu này. Tuy nhiên cần cân nhắc mức độ lợi nhuận có xứng đáng với chi phí thời gian bạn dành cho cổ phiếu này không.';
    } else if (upside <= 10) {
      return ', đây là mức sinh lời có thể xem là đạt ngưỡng trung bình phổ biến. Tuy nhiên nên cân nhắc chi phí thời gian trong lúc đợi chờ thu hoạch.';
    } else if (upside <= 25) {
      return ', mức sinh lời này được coi là khá tốt khi vượt qua ngưỡng sinh lợi trung bình phổ biến. Có thể cân nhắc đưa cổ phiếu này vào chiến lược đầu tư của bạn.';
    } else if (upside < 50) {
      return ', mức sinh lợi này thật sự không tồi, ở ngưỡng này bạn ít nhất đã cách được ba bậc thang so với việc thua lỗ. Chừa một chỗ cho cổ phiếu này trong danh mục sẽ không uổng phí.';
    } else {
      return '. Rất tuyệt vời, bạn sẽ đạt được ít nhất 50% lợi nhuận từ việc đầu tư, đây là một mức lợi nhuận mơ ước với bất kỳ ai.';
    }
  };
  