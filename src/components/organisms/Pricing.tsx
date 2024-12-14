"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Pricing() {
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
        // console.error('Error fetching data:', error);
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
    };

    const formatPrice = (price: any): string => {
    const formattedPrice = price >= 1000 ? (price / 1000).toFixed(0) + 'k' : price.toString();
    return formattedPrice;
    };
    return (
        <>
        <div className="w-[900px] flex gap-10 py-10 items-stretch mx-auto">
          <div className="pb-[109px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light flex-col gap-[29px]">
            <div className="pl-[27px] pr-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
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
                      Đã sử dụng
                    </div>
                </button>
              </div>
            </div>
            <div className="flex-col gap-6 pt-5">
              <div>

                <div className="flex gap-[15px] ml-5 mb-[20px]">
                  <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Nhận dữ liệu báo cáo tài chính của 30 công ty trong VN30.
                  </div>
                </div>

                <div className="flex gap-[15px] ml-5 mb-[20px]">
                  <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                  Nhận thông tin chi tiết về giá cổ phiếu hàng ngày.
                  </div>
                </div>

                <div className="flex gap-[15px] ml-5 mb-[20px]">
                  <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Biểu đồ và các công cụ phân tích kỹ thuật.
                  </div>
                </div>

                <div className="flex gap-[15px] ml-5 mb-[20px]">
                  <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                  <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                  So sánh và đánh giá sức khỏe tài chính của doanh nghiệp.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gói Professional - 1 năm */}
          <div className="w-[273px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light flex flex-col">
            {/* Phần đầu - thông tin tài khoản */}
            <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex flex-col justify-center items-center">
              <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
                  {pricingData?.YEARLY.name}
                </div>
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
                  {formatPrice(pricingData?.YEARLY.originalPrice)}
                </div>
                <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
                  Được nhận các đặc quyền nâng cao.
                </div>
                <Link href={`/payment/${pricingData?.YEARLY.programId}`} className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
                  <div className="text-white text-xs font-medium">
                    Nâng cấp ngay
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
              <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
                Đã bao gồm các đặc quyền gói Basic
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-5">
                <div>
                  <div className="flex gap-x-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
                    </div>
                  </div>

                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                      Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
                    </div>
                  </div>
                  
                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
                    </div>
                  </div>

                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
                    </div>
                  </div>
                </div>
            </div>

          </div>

            {/* Gói Professional - 1 Tháng */}
          <div className="w-[273px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light flex flex-col mx-auto">
              <div className="w-[273px] h-[198px] px-[26px] py-[21px] border-b border-fintown-br dark:border-fintown-br-light flex flex-col justify-center items-center">
                <div className="w-[220px] h-[156px] flex flex-col justify-center items-center">
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold text-center">
                    {pricingData?.MONTHLY.name}
                  </div>
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-2xl font-semibold text-center py-5">
                    {formatPrice(pricingData?.MONTHLY.price)}
                  </div>
                  <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium text-center">
                    Được nhận các đặc quyền nâng cao.
                  </div>
                  <Link href={`/payment/${pricingData?.MONTHLY.programId}`} className="px-[67px] pt-[11px] pb-2.5 bg-[#25b770] rounded-lg  flex justify-center items-center my-3">
                    <div className="text-white text-xs font-medium">
                      Nâng cấp ngay
                    </div>
                  </Link>
                </div>
              </div>
              <div className="w-[273px] h-[42px] px-6 pt-[13px] pb-3.5 border-b border-fintown-br dark:border-fintown-br-light flex justify-center items-center">
                <div className="w-[225px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs ml-2 font-medium">
                  Đã bao gồm các đặc quyền gói Basic
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-5">
                <div>
                  <div className="flex gap-x-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Truy cập kết quả dự báo sức khỏe tài chính của các công ty 5 năm tới.
                    </div>
                  </div>

                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                      Nhận thông báo mới nhất khi kết quả dự báo vừa được cập nhật.
                    </div>
                  </div>
                  
                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Đọc các phân tích sâu sắc từ AI giúp bổ sung lựa chọn đầu tư.
                    </div>
                  </div>

                  <div className="flex gap-[15px] ml-5 mb-[20px]">
                    <i className='bx bx-check text-fintown-pr9 text-[25px]'></i>
                    <div className="w-[186px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-medium">
                    Sử dụng công cụ định giá và lưu trữ kịch bản không giới hạn.
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div> 
        </>
    )
}