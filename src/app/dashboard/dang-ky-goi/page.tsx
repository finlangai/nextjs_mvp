"use client";
import FAQ from '@/src/components/organisms/FAQ';
import Pricing from '@/src/components/organisms/Pricing';

const DangKyGoiPage = () => {
  const questions = [
    {
      number: "1",
      title: "Việc thanh toán diễn ra thế nào?",
      content:
        "Sau khi xác nhận thanh toán, việc thanh toán được diễn ra một lần duy nhất tại thời điểm đăng ký và bạn sẽ nhận được đầy đủ các quyền hạn trong gói. Việc này lặp lại vào mỗi định kỳ tùy theo thời gian của gói.",
    },
    {
      number: "2",
      title: "Fintown chấp nhận phương thức thanh toán nào?",
      content:
        "Hiện tại chúng tôi sử dụng cổng thanh toán trực tuyến của MOMO để áp dụng cho trường hợp có trả phí. Chính vì vậy khi đăng ký dịch vụ của FINTOWN bạn sẽ được chuyển đến màn hình giao dịch trực tiếp của MOMO.",
    },
    {
      number: "3",
      title: "Tôi có một vài câu hỏi khác.",
      content:
        "Không sao, chúng tôi luôn luôn sẵn lòng trả lời các câu hỏi của bạn cũng như các yêu cầu hỗ trợ. Bạn có thể gửi email cho chúng tôi qua địa chỉ info@fintown.software hoặc điền theo biểu mẫu Tại đây.",
    },
  ];
  
  return (
    <div className=" bg-fintown-bg dark:bg-fintown-bg-light font-inter custom-scrollbar">
      {/* Thanh điều hướng */}
      <main className="ml-[75px] mx-4 my-16">
        <div className="text-center mt-20" >
            <h1 className="text-4xl leading-9 mb-2 font-semibold text-fintown-txt-1 dark:text-fintown-txt-1-light">Đăng ký gói</h1>
        </div>

        <div className="text-center mt-8">
            <div className="max-w-[684px] mx-auto">
                <span className="font-inter text-[#848E9C] text-base">
                   Chỉ với một mức giá khiêm tốn cho tháng hoặc năm, bạn sẽ sỡ hữu một bộ các đặc quyền và công cụ tuyệt vời của Fintown để đem lại hiệu suất đầu tư đột phá.  
                </span>
            </div>
        </div>

        < Pricing />

        <div className="text-center mt-40" >
            <h1 className="text-4xl leading-9 mb-2 font-semibold text-fintown-txt-1 dark:text-fintown-txt-1-light">Những câu hỏi thường gặp</h1>
        </div>

        <div className="mx-auto w-[850px] mt-20">
          <div className="flex flex-col gap-16">
            {questions.map((q) => (
              <FAQ
                key={q.number}
                number={q.number}
                title={q.title}
                content={q.content}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DangKyGoiPage;
