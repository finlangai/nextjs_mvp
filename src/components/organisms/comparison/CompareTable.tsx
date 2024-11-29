import React, { useState, useEffect } from 'react';
import { selectCompanyData, selectCompanyLoading } from '@/src/redux/Comparison';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader } from '@/src/components/common/Loader';

export default function CompareTable() {
    const companyData = useAppSelector(selectCompanyData);
    const companyLoading = useAppSelector(selectCompanyLoading);

    return (
        <>
        <div className='text-fintown-txt-1 text-[12px] mb-[29px]'>
           Q-Rating là bộ chỉ số của Fintown dùng để so sánh, đánh giá chất lượng tăng trưởng của công ty dựa trên dữ liệu báo cáo tài chính hằng quý.
        </div>

        <div>
            <div className='flex items-center text-fintown-txt-1 text-[12px] pb-[15px] border-b border-b-fintown-br mb-[18px] justify-between'>
                <div className='w-full max-w-[130px] text-right'>
                    Q-Rating
                </div>

                <div className='w-full max-w-[80px] text-right'>
                    Thu nhập
                </div>

                <div className='w-full max-w-[80px] text-right'>
                    Xu hướng
                </div>

                <div className='w-full max-w-[80px] text-right'>
                    Cổ tức
                </div>

                <div className='w-full max-w-[80px] text-right'>
                    Hiệu suất giá
                </div>

                <div className='w-full max-w-[80px] text-right'>
                    Doanh thu & lợi nhuận
                </div>
            </div>

            {
                companyLoading 
                ? 
                <div className='w-full flex justify-center py-[50px]'>
                    < SpinerLoader />         
                </div>
                :              
                companyData?.map((val) => (
                    <>
                    <div key={val?.symbol} className='flex items-center justify-between text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                        <div className='w-full max-w-[130px] text-right flex items-center'>
                            <div className='flex items-center w-[75px] justify-between '>
                                <div className='text-fintown-txt-1 font-bold'>{val?.symbol}</div>
                                <div className='min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                    <img className='w-full h-full object-contain' src={val?.logo} alt={val?.symbol} />
                                </div>
                            </div>
                            <div className='ml-auto'>
                                {val?.comparison?.rating?.toFixed(2)}
                            </div>
                        </div>

                        <div className='w-full max-w-[80px] text-right'>
                            {val?.comparison?.returns?.toFixed(2)}
                        </div>

                        <div className='w-full max-w-[80px] text-right'>
                            {val?.comparison?.trending?.toFixed(2)}
                        </div>

                        <div className='w-full max-w-[80px] text-right'>
                            {val?.comparison?.dividend?.toFixed(2)}
                        </div>

                        <div className='w-full max-w-[80px] text-right'>
                            {val?.comparison?.momentum?.toFixed(2)}
                        </div>

                        <div className='w-full max-w-[80px] text-right'>
                            {val?.comparison?.revenueProfit?.toFixed(2)}
                        </div>
                    </div>
                    </>
                ))  
            }

        </div>

        {/* <div className='flex items-center gap-x-[5px] justify-end'>
            <button
                className={`
                    flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                    transition-all duration-300
                    bg-fintown-btn-2 cursor-pointer hover:opacity-80 bg-gray-300 cursor-not-allowed}
                `}
            >
                <i className={`bx bx-chevron-left text-[24px] text-white text-gray-500}`}></i>
            </button>
            <button
                className={`
                    flex items-center justify-center w-[30px] h-[30px] rounded-[50%]
                    transition-all duration-300
                    bg-fintown-btn-2 cursor-pointer hover:opacity-80 'bg-gray-300 cursor-not-allowed'}
                `}
            >
                <i className={`bx bx-chevron-right text-[24px] text-white text-gray-500}`}></i>
            </button>
        </div>  */}
        </>
    )
}