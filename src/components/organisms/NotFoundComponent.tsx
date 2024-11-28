import React from 'react';
import Link from 'next/link';

const NotFoundComponent = () => {
  return (
    <div className="w-[400px] border border-fintown-br rounded-[10px] py-[38px]">
      {/* Logo */}
      <div className="flex items-center justify-center mb-[32px]">
        <div className="w-[42px] h-[42px]">
          <img className='w-full h-full' src="/imgs/logo.png" alt="" />
        </div>
        <div className="text-[#EAECEF] font-bold text-2xl">
          fintown
        </div>
      </div>

      {/* 404 and description */}
      <div className="flex flex-col justify-center items-center mb-[30px]">
        <div className="text-white text-[50px] font-black">404</div>
        <div className="text-white text-[16px] font-medium">Không tìm thấy trang.</div>
      </div>

      {/* Quote box */}
      <div className="px-10 py-[19px] border-t border-b border-[#2B3139] flex justify-center items-center mb-[30px]">
        <div className="text-white text-center text-[14px] font-medium">
          Điều quan trọng nhất cần làm nếu bạn thấy mình rơi vào một cái hố, đó là ngừng đào.
        </div>
      </div>

      {/* Image with text */}
      <div className="text-center mb-[36px]">
        <div className='w-[60px] h-[60px] overflow-hidden rounded-[50%] border-[2px] border-fintown-txt-1 mx-auto mb-[12px]'>
          <img
            className="w-full h-full object-contain"
            src="/imgs/asset/warrent.png"
            alt="Warren Buffett"
          />
        </div>
        <div className="text-white text-[14px] font-bold">
          Warren Buffett
        </div>
        <div className="text-[#848E9C] text-[12px] font-medium">
          Nhà tiên tri xứ Omaha
        </div>
      </div>

      {/* Back to dashboard */}
      <Link href={"/dashboard"} className='w-full text-center'>
        <button className="px-[22px] py-[10px] border border-[#2B3139] rounded-[6px] mx-auto flex items-center text-[12px] text-fintown-txt-2 hover:text-fintown-pr9 hover:border-fintown-pr9">
            <i className='bx bx-left-arrow-alt text-[18px]'></i>
            <div>
              Về trang dashboard
            </div>
        </button>
      </Link>

    </div>
  );
};

export default NotFoundComponent;
