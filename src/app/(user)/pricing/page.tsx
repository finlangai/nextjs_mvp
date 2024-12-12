"use client";
import Link from 'next/link';
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
  const formatPrice = (price: any): string => {
    const formattedPrice = price >= 1000 ? (price / 1000).toFixed(0) + 'k' : price.toString();
    return formattedPrice;
  }
  console.log(pricingData)
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
        {/* <div className="mx-auto mt-20 flex justify-center">
            <div className="rounded-tl-[16px] rounded-bl-[16px] text-fintown-txt-1 dark:text-fintown-txt-1-light  bg-fintown-bg dark:bg-fintown-bg-light border border-gray-600 min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]">
                <div className="p-2">
                  <div className="text-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
                      <h2 className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-lg font-bold'>Basic</h2>
                      <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light font-normal text-4xl mt-4 block">Miễn phí</span>
                  </div>
                  <div className="mt-5">
                      <button className=" bg-fintown-bg dark:bg-fintown-bg-light rounded-lg p-3 w-full">
                          <span className="text-[#656f79] text-base font-semibold">Đăng kí miễn phí</span>
                      </button>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-fintown-txt-1 dark:text-fintown-txt-1-light"> 1 danh mục</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-fintown-txt-1 dark:text-fintown-txt-1-light"> 2 năm</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="font-medium">Tính năng chính</h4>
                
                    <div className="mt-2">
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
            <div className="rounded-none  bg-fintown-bg dark:bg-fintown-bg-light shadow-[0_4px_20px_rgba(0,0,0,0.5)] min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]">
              <button className="absolute top-[-48px] left-0 right-0 bg-[#32A071] hover:bg-[#25B770] text-fintown-txt-1 dark:text-fintown-txt-1-light p-3 rounded-tl-xl rounded-tr-xl">
                  <p className="text-white text-center font-bold">TIẾT KIỆM {formatPrice(pricingData?.YEARLY?.discountAmount ?? 0)} VNĐ ({pricingData?.YEARLY?.discountPercentage}%)</p>
              </button>
              <div className="p-2">
                  <div className="text-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
                  <h2 className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-bold">
                      {pricingData?.YEARLY?.name || "Tên gói không có sẵn"}
                    </h2>
                      <div className="font-medium text-[40px] leading-[60px] text-fintown-txt-1 dark:text-fintown-txt-1-light relative inline-block mt-0">
                          <span>{formatPrice(pricingData?.YEARLY?.discountedPrice ?? 0)}</span>
                          <span className="align-super  font-medium text-[18px] leading-[26px] text-fintown-txt-1 dark:text-fintown-txt-1-light">VNĐ</span>
                          <span className="text-base">/Năm</span>
                      </div> 
                      <div>
                      {formatPrice(pricingData?.YEARLY?.originalPrice ?? 0)} VNĐ/năm
                      </div>
                  </div>
                  <div className="mt-5">
                      <a href={`/payment/${pricingData?.YEARLY.programId}`} className="bg-[#32A071] rounded-lg p-3 w-full block text-center hover:bg-fintown-pr9 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
                          <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold">Đăng kí ngay</span>
                      </a>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-fintown-txt-1 dark:text-fintown-txt-1-light">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">danh mục theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-fintown-txt-1 dark:text-fintown-txt-1-light">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">Bao gồm tất cả tính năng của gói Basic, cộng thêm:</h4>
                    <div className="mt-2">
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
            <div className="rounded-tr-[16px] rounded-br-[16px] text-fintown-txt-1 dark:text-fintown-txt-1-light  bg-fintown-bg dark:bg-fintown-bg-light border border-gray-600 min-h-full relative p-[24px_32px_40px] overflow-visible w-[378px]"> 
              <div className="p-2">
                  <div className="text-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
                    <h2 className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-bold">
                      {pricingData?.MONTHLY?.name || "Tên gói không có sẵn"}
                    </h2>
                      <div className="font-medium text-[40px] leading-[60px] text-fintown-txt-1 dark:text-fintown-txt-1-light relative inline-block mt-0">
                          <span>{formatPrice(pricingData?.MONTHLY?.price ?? 0)}</span>
                          <span className="align-super  font-medium text-[18px] leading-[26px] text-fintown-txt-1 dark:text-fintown-txt-1-light">VNĐ</span>
                          <span className="text-base">/Năm</span>
                      </div> 
                  </div>
                  <div className="mt-5">
                      <a
                        href={`/payment/${pricingData?.MONTHLY.programId}`}
                        className=" bg-fintown-bg dark:bg-fintown-bg-light rounded-lg p-3 w-full block text-center hover:bg-fintown-pr9 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold">Đăng kí ngay</span>
                      </a>
                    </div>

                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-5">
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold mb-2 text-fintown-txt-1 dark:text-fintown-txt-1-light">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">danh mục theo dõi</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex">
                        <h6 className="font-inter text-base leading-6 font-semibold  text-fintown-txt-1 dark:text-fintown-txt-1-light">Không giới hạn</h6>
                        <h6 className="font-inter text-base leading-6 font-normal text-fintown-txt-1 dark:text-fintown-txt-1-light ml-2">dữ liệu tài chính</h6>
                      </div>
                  </div>
                
                
                  <div className="border-b border-[#4d4d4d] py-3"></div>
                  <div className="mt-3">
                    <h4 className="text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">Bao gồm tất cả tính năng của gói Basic, cộng thêm:</h4>
                    <div className="mt-2">
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
                      <div className="flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light">
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
        </div> */}
          <div className="w-[900px] h-[519px] flex gap-10 py-10 items-stretch mx-auto">
        <div className="grow shrink basis-0 self-stretch pb-[109px] rounded-[10px] h-[519px] border border-[#2b3139] flex-col justify-start items-center gap-[29px]">
          <div className="self-stretch h-[198px] pl-[27px] pr-[26px] py-[21px] border-b border-[#2b3139] flex justify-center items-center">
            <div className="w-[220px] h-[156px] flex flex-col justify-center items-center"> {/* Cập nhật flex-col */}
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center"> {/* Căn giữa văn bản */}
                  Basic
               </div>
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center  py-5 "> {/* Căn giữa văn bản */}
                  Miễn phí
               </div>
               <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center"> {/* Căn giữa văn bản */}
                  Được nhận các đặt quyền cơ bản.
               </div>
               <button className="px-[67px] pt-[11px] pb-2.5 bg-[#848e9c] rounded-lg  flex justify-center items-center my-3"> {/* Căn giữa nội dung button */}
                  <div className="text-white text-xs font-medium">
                  Nâng cấp ngay
                  </div>
               </button>
            </div>
          </div>
          <div className="h-[183px] flex-col justify-end items-start gap-6 pt-5">
            <ul className="space-y-6">
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} 
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Nhận dữ liệu báo cáo tài chính của 30 công ty trong VN30.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Nhận thông tin chi tiết về giá cổ phiếu hàng ngày.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Biểu đồ và các công cụ phân tích kỹ thuật.
                  </div>
               </li>
               <li className="flex gap-[15px] h-[30px] ml-5">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }} // Màu xanh lá
                  className="w-6 h-6"
                  >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  So sánh và đánh giá sức khỏe tài chính của doanh nghiệp.
                  </div>
               </li>
            </ul>
         </div>


        </div>
        
        {/* Gói Professional - 1 năm */}
        <div className="w-[273px] h-[519px] rounded-[10px] border border-[#2b3139] flex flex-col">
          {/* Phần đầu - thông tin tài khoản */}
          <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-[#2b3139] flex flex-col justify-center items-center">
            <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
                {pricingData?.YEARLY.name}
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
                {formatPrice(pricingData?.YEARLY.originalPrice)}
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
                Được nhận các đặc quyền cơ bản.
              </div>
              <Link href={`/payment/${pricingData?.YEARLY.programId}`} className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
                <div className="text-white text-xs font-medium">
                  Nâng cấp ngay
                </div>
              </Link>
            </div>
          </div>

          <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-[#2b3139] flex justify-center items-center">
            <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
              Đã bao gồm các đặc quyền gói Basic
            </div>
          </div>

          <div className="h-[207px] flex flex-col justify-start items-start gap-6 mt-5">
            <ul className="space-y-6">
              <li className="flex items-center gap-[15px] h-[45px] ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }}
                  className="w-6 h-6"
                >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
                <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
                </div>
              </li>
              <li className="flex items-center gap-[15px] h-[30px] ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }}
                  className="w-6 h-6"
                >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
                <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
                </div>
              </li>
              <li className="flex items-center gap-[15px] h-[30px] ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }}
                  className="w-6 h-6"
                >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
                <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
                </div>
              </li>
              <li className="flex items-center gap-[15px] h-[30px] ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ fill: "#25b770" }}
                  className="w-6 h-6"
                >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
                <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                  Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
                </div>
              </li>
            </ul>
          </div>
        </div>

          {/* Gói Professional - 1 Tháng */}
        <div className="w-[273px] h-[519px] rounded-[10px] border border-[#2b3139] flex flex-col mx-auto">
            <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-[#2b3139] flex flex-col justify-center items-center">
              <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
                  {pricingData?.MONTHLY.name}
                </div>
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
                  {formatPrice(pricingData?.MONTHLY.price)}
                </div>
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
                  Được nhận các đặc quyền cơ bản.
                </div>
                <Link href={`/payment/${pricingData?.MONTHLY.programId}`} className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
                  <div className="text-white text-xs font-medium">
                    Nâng cấp ngay
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-[#2b3139] flex justify-center items-center">
              <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
                Đã bao gồm các đặc quyền gói Basic
              </div>
            </div>
            <div className="h-[207px] flex flex-col justify-start items-start gap-6 mt-5">
              <ul className="space-y-6">
                <li className="flex items-center gap-[15px] h-[45px] ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    style={{ fill: "#25b770" }}
                    className="w-6 h-6"
                  >
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                    Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
                  </div>
                </li>
                <li className="flex items-center gap-[15px] h-[30px] ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    style={{ fill: "#25b770" }}
                    className="w-6 h-6"
                  >
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                    Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
                  </div>
                </li>
                <li className="flex items-center gap-[15px] h-[30px] ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    style={{ fill: "#25b770" }}
                    className="w-6 h-6"
                  >
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                    Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
                  </div>
                </li>
                <li className="flex items-center gap-[15px] h-[30px] ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    style={{ fill: "#25b770" }}
                    className="w-6 h-6"
                  >
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                  </svg>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
                    Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
          
        <div className="text-center mt-40" >
            <h1 className="text-4xl leading-9 mb-2 font-semibold text-fintown-txt-1 dark:text-fintown-txt-1-light">Những câu hỏi thường gặp</h1>
        </div>
        <div className="mx-auto w-[850px] mt-20">
            <div className="flex flex-col gap-16">
              <div className="flex gap-3">
                <div className="Frame427322061 w-[30px] h-[30px] pt-2 pb-[7px] rounded border border-[#2b3139] justify-center items-center inline-flex">
                  <div className=" text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">1</div>  
                </div>
                <div>
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold">
                    Việc thanh toán diễn ra thế nào?
                  </div>
                  <div className=" w-[730px] text-[#848e9c] text-sm font-medium">
                    Sau khi xác nhận thanh toán, việc thanh toán được diễn ra một lần duy nhất
                    tại thời điểm đăng ký và bạn sẽ nhận được đầy đủ các quyền hạn trong gói.
                    Việc này lặp lại vào mỗi định kỳ tùy theo thời gian của gói.{" "}
                  </div>
                </div>
                <span className="ml-10"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus text-fintown-txt-1 dark:text-fintown-txt-1-light" > <path d="M5 12h14" /> </svg></span>
              </div>
              <div className="flex gap-3">
                <div className="Frame427322061 w-[30px] h-[30px] pt-2 pb-[7px] rounded border border-[#2b3139] justify-center items-center inline-flex">
                  <div className=" text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">2</div>  
                </div>
                <div>
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold">
                  Fintown chấp nhận phương thức thanh toán nào?
                  </div>
                  <div className=" w-[730px] text-[#848e9c] text-sm font-medium">
                  Hiện tại chúng tôi sử dụng cổng thanh toán trực tuyến của <span className="text-[#25B770]">MOMO </span>để áp dụng cho trường hợp có trả phí. Chính vì vậy khi đăng ký dịch vụ của <span className="text-[#25B770]">FINTOWN</span> bạn sẽ được chuyển đến màn hình giao dịch trực tiếp của <span className="text-[#25B770]">MOMO </span>.
                  </div>
                </div>
                <span className="ml-10"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus text-fintown-txt-1 dark:text-fintown-txt-1-light" > <path d="M5 12h14" /> </svg></span>
              </div>
              <div className="flex gap-3">
                <div className="Frame427322061 w-[30px] h-[30px] pt-2 pb-[7px] rounded border border-[#2b3139] justify-center items-center inline-flex">
                  <div className=" text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">3</div>  
                </div>
                <div>
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold">
                  Tôi có một vài câu hỏi khác.
                  </div>
                  <div className=" w-[730px] text-[#848e9c] text-sm font-medium">
                      Không sao, chúng tôi luôn luôn sẵn lòng trả lời các câu hỏi của bạn cũng như các yêu cầu hỗ trợ. Bạn có thể gửi email cho chúng tôi qua địa chỉ <span className="text-[#25B770]">info@fintown.software</span> hoặc điền theo biểu mẫu <span className="text-[#25B770]">Tại dây </span>.
                  </div>
                </div>
                <span className="ml-10"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus text-fintown-txt-1 dark:text-fintown-txt-1-light" > <path d="M5 12h14" /> </svg></span>
              </div>
            </div>
        </div>



      </main>
    </div>
  );
};

export default Pricing;
