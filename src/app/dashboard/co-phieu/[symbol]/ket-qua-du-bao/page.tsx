"use client";
import { useEffect, useRef, useState } from 'react';

import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import GaugeChart from '@/src/components/charts/GaugeChart';


export default function KetQuaDuBaoPage({ params }: { params: { symbol: string } }, selectedButton: any, handleButtonClick:any) {
    const { symbol } = params;

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(4);
    useSetSelectedButtonStockPage(3);

    return (
        <>  
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(1, 'Cân đối kế toán')}>
                    Đánh giá chung
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(2, 'Kết quả kinh doanh')}>
                    Hiệu quả sinh lời
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 3 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(3, 'Lưu chuyển tiền tệ')}>
                    Khả năng thanh toán
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 4 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(4, 'Chỉ số tài chính')}>
                    Giá trị thị trường
                </button>
            </div>

            <div className='pl-[40px] pb-[77px]'>
                <button className='flex items-center justify-center w-[40px] h-[40px] absolute bg-fintown-btn-2 rounded-[50%] mt-[132px] ml-[-18px] z-30'>
                    <i className='bx bx-chevron-left text-white text-[24px]'></i>
                </button>

                <div className='flex gap-x-[36px] overflow-hidden'>
                    <div className='px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px] '>
                        <div className='flex items-center gap-x-[10px] mb-[53px]'>
                            <p className='text-fintown-txt-1 text-[16px] font-bold'>Đánh giá chung</p>
                            <i className='bx bx-info-circle text-fintown-txt-1'></i>
                        </div>

                        <div className='mb-[20px]'>
                            < GaugeChart />
                        </div>

                        <hr className='border-fintown-br mb-[49px]' />
                        
                        <div className='flex flex-col gap-y-[23px]'>
                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Hiệu quả sinh lời</p>
                                <div className='text-fintown-pr9 text-[14px] text-right font-bold' >
                                    Tích cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Hiệu quả sinh lời</p>
                                <div className='text-fintown-pr9 text-[14px] text-right font-bold' >
                                    Tích cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Hiệu quả sinh lời</p>
                                <div className='text-fintown-pr9 text-[14px] text-right font-bold' >
                                    Tích cực
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='flex items-center mb-[53px] justify-between'>
                            <div>
                                <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                    <p className='text-fintown-txt-1 text-[16px] font-bold'>Hiệu quả sinh lời</p>
                                    <i className='bx bx-info-circle text-fintown-txt-1'></i>
                                </div>
                                <div className='text-fintown-stt-buy text-[12px]'>
                                    Tích cực
                                </div>
                            </div>
                            <div className='h-[40px] w-[40px] rounded-[50%] bg-fintown-stt-buy flex items-center justify-center'>
                                <i className='bx bx-trending-up text-white text-[24px]'></i>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[24px] mb-[20px]'>
                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Hiệu quả sinh lời trên vốn</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Lợi nhuận biên</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] min-w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>EPS (Lợi nhuận trên một phần cổ phiếu)</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>
                        </div>

                        <button className='mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                            Xem chi tiết
                        </button>
                    </div>

                    <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='flex items-center mb-[53px] justify-between'>
                            <div>
                                <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                    <p className='text-fintown-txt-1 text-[16px] font-bold'>Hiệu quả sinh lời</p>
                                    <i className='bx bx-info-circle text-fintown-txt-1'></i>
                                </div>
                                <div className='text-fintown-stt-buy text-[12px]'>
                                    Tích cực
                                </div>
                            </div>
                            <div className='h-[40px] w-[40px] rounded-[50%] bg-fintown-stt-buy flex items-center justify-center'>
                                <i className='bx bx-trending-up text-white text-[24px]'></i>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[24px] mb-[20px]'>
                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Hiệu quả sinh lời trên vốn</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Lợi nhuận biên</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] min-w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>EPS (Lợi nhuận trên một phần cổ phiếu)</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>
                        </div>

                        <button className='mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                            Xem chi tiết
                        </button>
                    </div>

                    <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='flex items-center mb-[53px] justify-between'>
                            <div>
                                <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                    <p className='text-fintown-txt-1 text-[16px] font-bold'>Hiệu quả sinh lời</p>
                                    <i className='bx bx-info-circle text-fintown-txt-1'></i>
                                </div>
                                <div className='text-fintown-stt-buy text-[12px]'>
                                    Tích cực
                                </div>
                            </div>
                            <div className='h-[40px] w-[40px] rounded-[50%] bg-fintown-stt-buy flex items-center justify-center'>
                                <i className='bx bx-trending-up text-white text-[24px]'></i>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[24px] mb-[20px]'>
                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Hiệu quả sinh lời trên vốn</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>Lợi nhuận biên</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>

                            <div className='flex gap-x-[18px]'>
                                <div className='h-[40px] min-w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                    <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                                </div>

                                <div>
                                    <p className='text-fintown-txt-1 font-bold text-[14px] '>EPS (Lợi nhuận trên một phần cổ phiếu)</p>
                                    <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                                </div>
                            </div>
                        </div>

                        <button className='mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>

            <div className='pl-[40px] text-[24px] font-bold text-fintown-txt-1 mb-[32px]'>
                Luận điểm
            </div>

            <div className='pl-[40px] pb-[40px] relative'> 
                <button className='flex items-center justify-center w-[40px] h-[40px] absolute bg-fintown-btn-2 rounded-[50%] ml-[-18px] mt-[70px] z-30'>
                    <i className='bx bx-chevron-left text-white text-[24px]'></i>
                </button>

                <div className='flex gap-x-[36px] overflow-hidden'>

                    <div className='rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='py-[21px] px-[23px]'>
                            <div className='flex mb-[24px] items-center'>
                                <div className='h-[15px] w-[15px] rounded-[50%] bg-fintown-chart-2 border border-fintown-txt-1 mr-[8px]'></div>
                                <div className='text-[14px] font-bold text-fintown-txt-1'>Nhận định chung:</div>
                            </div>

                            <div className='text-[14px] text-fintown-txt-1'>
                                ROE giảm 2%: Điều này cho thấy hiệu quả sử dụng vốn chủ sở hữu đang giảm sút. Có thể doanh nghiệp đã đầu tư vào các dự án không hiệu quả hoặc tăng vốn chủ sở hữu quá nhanh so với tăng trưởng lợi nhuận.  
                            </div>
                        </div>
                    </div>

                    <div className='rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='py-[21px] px-[23px]'>
                            <div className='flex mb-[24px] items-center'>
                                <div className='h-[15px] w-[15px] rounded-[50%] bg-fintown-chart-2 border border-fintown-txt-1 mr-[8px]'></div>
                                <div className='text-[14px] font-bold text-fintown-txt-1'>Nhận định chung:</div>
                            </div>

                            <div className='text-[14px] text-fintown-txt-1'>
                                ROE giảm 2%: Điều này cho thấy hiệu quả sử dụng vốn chủ sở hữu đang giảm sút. Có thể doanh nghiệp đã đầu tư vào các dự án không hiệu quả hoặc tăng vốn chủ sở hữu quá nhanh so với tăng trưởng lợi nhuận.  
                            </div>
                        </div>
                    </div>

                    <div className='rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='py-[21px] px-[23px]'>
                            <div className='flex mb-[24px] items-center'>
                                <div className='h-[15px] w-[15px] rounded-[50%] bg-fintown-chart-2 border border-fintown-txt-1 mr-[8px]'></div>
                                <div className='text-[14px] font-bold text-fintown-txt-1'>Nhận định chung:</div>
                            </div>

                            <div className='text-[14px] text-fintown-txt-1'>
                                ROE giảm 2%: Điều này cho thấy hiệu quả sử dụng vốn chủ sở hữu đang giảm sút. Có thể doanh nghiệp đã đầu tư vào các dự án không hiệu quả hoặc tăng vốn chủ sở hữu quá nhanh so với tăng trưởng lợi nhuận.  
                            </div>
                        </div>
                    </div>

                    <div className='rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                        <div className='py-[21px] px-[23px]'>
                            <div className='flex mb-[24px] items-center'>
                                <div className='h-[15px] w-[15px] rounded-[50%] bg-fintown-chart-2 border border-fintown-txt-1 mr-[8px]'></div>
                                <div className='text-[14px] font-bold text-fintown-txt-1'>Nhận định chung:</div>
                            </div>

                            <div className='text-[14px] text-fintown-txt-1'>
                                ROE giảm 2%: Điều này cho thấy hiệu quả sử dụng vốn chủ sở hữu đang giảm sút. Có thể doanh nghiệp đã đầu tư vào các dự án không hiệu quả hoặc tăng vốn chủ sở hữu quá nhanh so với tăng trưởng lợi nhuận.  
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}