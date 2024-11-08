// pages/pricing.js
"use client";
import { useEffect, useState } from 'react';

const Pricing = () => {
  const [pricingData, setPricingData] = useState<PricingData>();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    fetch('https://portal.fintown.software/api/general/pricing')
      .then((response) => response.json())
      .then((data) => {
        setPricingData(data);
        setLoad(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoad(false);
      });
  }, []); 

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="text-lg mt-4 font-semibold text-gray-600">Đang tải dữ liệu, vui lòng chờ...</p>
        </div>
      </div>
    );
  }
  const formatPrice = (price: number): string => {
    const formattedPrice = price >= 1000 ? (price / 1000).toFixed(0) + 'k' : price.toString();
    return formattedPrice;
  }

  return (
    <div className="bg-fintown-bg font-inter custom-scrollbar">
      {/* Thanh điều hướng */}
      <main className="ml-[75px] mx-4 my-16">
        <div className="text-center mt-48" >
            <h1 className="text-4xl leading-9 mb-2 font-semibold text-white">Hãy trân trọng</h1>
        </div>
        <div className="text-center mt-10">
            <span className="text-6xl leading-9 mb-2 font-bold text-fintown-pr9 block">Số tiền đầu tư của bạn</span>
            <div className="max-w-[684px] mx-auto">
                <span className="font-inter font-normal text-[#a7adb2] text-center md:text-[1.125rem] md:leading-[1.875rem] text-sm leading-5 block">
                    Hơn <span className="text-[#f4f4f5] font-inter text-base leading-[1.625rem] font-bold inline">150,000+</span> nhà đầu tư chuyên nghiệp đang sử dụng <strong  className="text-[#25B770]">fintown</strong> làm công cụ
                    thông minh hỗ trợ đầu tư mỗi ngày.
                </span>
            </div>
        </div>
        <div className="mx-auto mt-20 flex justify-center">
            <div className="rounded-tl-[16px] rounded-bl-[16px] text-white bg-[#222222] min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]">
                <div className="p-2">
                  <div className="text-center text-[#A7ADB2]">
                      <h2 className='text-[#A7ADB2] text-lg font-bold'>Basic</h2>
                      <span className="text-[#fff] font-normal text-4xl mt-4 block">Miễn phí</span>
                  </div>
                  <div className="mt-5">
                      <button className="bg-[#2C2C2C] rounded-lg p-3 w-full">
                          <span className="text-[#656f79] text-base font-semibold">Đăng kí miễn phí</span>
                      </button>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-[#f4f4f5]"> 1 danh mục</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-[#f4f4f5]"> 2 năm</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="font-medium">Tính năng chính</h4>
                
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Quản lý danh mục đầu tư
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Theo dõi cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Phân tích thị trường
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                          Phân tích kỹ thuật
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Dữ liệu cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Bộ lọc cổ phiếu (cơ bản)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="rounded-none bg-[#2C2C2C] shadow-[0_4px_20px_rgba(0,0,0,0.5)] min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]">
              <button className="absolute top-[-48px] left-0 right-0 bg-[#32A071] hover:bg-[#25B770] text-white p-3 rounded-tl-xl rounded-tr-xl">
                  <p className="text-white text-center font-bold">TIẾT KIỆM {formatPrice(pricingData?.YEARLY?.discountAmount ?? 0)} VNĐ ({pricingData?.YEARLY?.discountPercentage}%)</p>
              </button>
              <div className="p-2">
                  <div className="text-center text-[#A7ADB2]">
                  <h2 className="text-[#A7ADB2] text-2xl font-bold">
                      {pricingData?.YEARLY?.name || "Tên gói không có sẵn"}
                    </h2>
                      <div className="font-medium text-[40px] leading-[60px] text-[#f4f4f5] relative inline-block mt-0">
                          <span>{formatPrice(pricingData?.YEARLY?.discountedPrice ?? 0)}</span>
                          <span className="align-super  font-medium text-[18px] leading-[26px] text-[#f4f4f5]">VNĐ</span>
                          <span className="text-base">/Năm</span>
                      </div> 
                      <div>
                      {formatPrice(pricingData?.YEARLY?.originalPrice ?? 0)} VNĐ/năm
                      </div>
                  </div>
                  <div className="mt-5">
                      <a href={`/payment/${pricingData?.YEARLY.programId}`} className="bg-[#32A071] rounded-lg p-3 w-full block text-center hover:bg-fintown-pr9 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
                          <span className="text-[white] text-base font-semibold">Đăng kí ngay</span>
                      </a>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-[#f4f4f5]">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">danh mục theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-[#f4f4f5]">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                  <div className="mt-3">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-[#f4f4f5]">Trợ lý AI</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">hỗ trợ đầu tư -</h6>
                        <h6 className="font-inter text-sm leading-6 font-semibold  text-[#f4f4f5]">Nebula Gen 1</h6>
                      </div>
                  </div>
                  <div className="mt-3">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-normal  text-[#f4f4f5]">1200 Credits</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">sử dụng trợ lý AI -</h6>
                        <h6 className="font-inter text-sm leading-6 font-normal  text-[#f4f4f5]">Nebula</h6>
                      </div>
                  </div>
                
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="text-white font-bold">Bao gồm tất cả tính năng của gói Basic, cộng thêm:</h4>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Đầu tư hiệu quả với hỗ trợ từ AI
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Phân tích chất lượng doanh nghiệp
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Phân tích rủi ro cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Định giá cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Dự báo kết quả kinh doanh
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        So sánh cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Bộ lọc cổ phiếu (nâng cao)
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Tối ưu phân bổ vốn đầu tư
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Xuất dữ liệu Excel/PDF...
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="rounded-tr-[16px] rounded-br-[16px] text-white bg-[#222222] min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]"> 
              <div className="p-2">
                  <div className="text-center text-[#A7ADB2]">
                    <h2 className="text-[#A7ADB2] text-2xl font-bold">
                      {pricingData?.MONTHLY?.name || "Tên gói không có sẵn"}
                    </h2>
                      <div className="font-medium text-[40px] leading-[60px] text-[#f4f4f5] relative inline-block mt-0">
                          <span>{formatPrice(pricingData?.MONTHLY?.price ?? 0)}</span>
                          <span className="align-super  font-medium text-[18px] leading-[26px] text-[#f4f4f5]">VNĐ</span>
                          <span className="text-base">/Năm</span>
                      </div> 
                  </div>
                  <div className="mt-5">
                      <a
                        href={`/payment/${pricingData?.MONTHLY.programId}`}
                        className="bg-[#2C2C2C] rounded-lg p-3 w-full block text-center hover:bg-fintown-pr9 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        <span className="text-[white] text-base font-semibold">Đăng kí ngay</span>
                      </a>
                    </div>

                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-[#f4f4f5]">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">danh mục theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-[#f4f4f5]">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                  <div className="mt-3">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-[#f4f4f5]">Trợ lý AI</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">hỗ trợ đầu tư -</h6>
                        <h6 className="font-inter text-sm leading-6 font-semibold  text-[#f4f4f5]">Nebula Gen 1</h6>
                      </div>
                  </div>
                  <div className="mt-3">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-normal  text-[#f4f4f5]">100 Credits</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-[#a7adb2] ml-2">sử dụng trợ lý AI -</h6>
                        <h6 className="font-inter text-sm leading-6 font-normal  text-[#f4f4f5]">Nebula</h6>
                      </div>
                  </div>
                
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="text-white font-bold">Bao gồm tất cả tính năng của gói Basic, cộng thêm:</h4>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Đầu tư hiệu quả với hỗ trợ từ AI
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Phân tích chất lượng doanh nghiệp
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Phân tích rủi ro cổ phiếu
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-[#a7adb2]">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={20} 
                          height={20} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth={2} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-check mr-2"
                        > 
                          <path d="M20 6 9 17l-5-5" />  
                        </svg>
                        <span className="font-inter text-base leading-6 font-normal ">
                        Định giá cổ phiếu
                        </span>
                      </div>
                    </div>
                 
                  </div>
              </div>
            </div>
        </div>
        <div className="mt-24">
              <h1 className="text-[white] text-center text-6xl font-bold">Bứt phá lợi nhuận đầu tư cùng AI</h1>
              <div className="block">
                <div className="flex flex-wrap justify-center w-full gap-y-0 relative">
                  <div className="relative mt-[550px] max-w-[1298px] w-full flex justify-between">
                    <div className="relative block flex-none max-w-[47%] min-h-[1px]">
                      <img 
                        src="/imgs/chisoTT.jpg" 
                        alt="Image 1" 
                      />
                    </div>
                    <div className="relative block flex-none max-w-[47%] min-h-[1px]">
                      <img 
                        src="/imgs/topCP.jpg" 
                        alt="Image 2" 
                      />
                    </div>
                  </div>
                  <div style={{
                              position: 'absolute',
                              top: '100px',
                              left: '50%',
                              transform: 'translate(-50%, 0px)',
                              width: '856px',
                              height: '481.5px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              boxShadow: 'rgb(0, 0, 0) 0px 0px 50px 10px'
                            }}>
                    <video  src="/imgs/video/investing-ai.mp4"  autoPlay  loop  playsInline  disableRemotePlayback  />
                  </div>
                </div>
              </div>
              <div className="text-[#A7ADB2] text-center text-lg font-semibold max-w-[700px] mx-auto">
                Với trợ lý trí tuệ nhân tạo Nebula, việc khớp lệnh và chốt lời của bạn trở nên dễ dàng hơn với hiệu suất vượt trội
              </div>
              <div className="mt-10 p-20">
                <h1 className="text-[white] text-center text-6xl font-bold">Phân tích cổ phiếu toàn diện</h1>
                <div className="mt-[48px] flex justify-center flex-wrap">
                  <div className="relative max-w-full min-h-[1px]">
                      <div className="p-[8px] rounded-[28px] border border-[#25B770] flex">
                            <div className="p-[7px] px-[54px] rounded-[24px] cursor-pointer bg-[#25B770] relative max-w-full min-h-[1px]">
                                <h5 className="text-white font-medium text-lg">Web app</h5>
                            </div>
                      </div>
                  
                  </div>
                  
                </div>
                <div className=" rounded-[12px] overflow-hidden shadow-[0px_0px_50px_10px_rgba(0,0,0,0.5)] p-10 mt-10 ">
                    <div className="mx-auto flex justify-center items-center w-full">
                      <video 
                        src="/imgs/video/investing-ai.mp4" 
                        autoPlay  loop  playsInline  disableRemotePlayback
                      />
                    </div>
                  </div>
              </div>

        </div>




      </main>
    </div>
  );
};

export default Pricing;
