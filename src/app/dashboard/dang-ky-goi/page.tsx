"use client";
import FAQ from '@/src/components/organisms/FAQ';
import Pricing from '@/src/components/organisms/Pricing';

const DangKyGoiPage = () => {
  
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
            <FAQ/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DangKyGoiPage;
