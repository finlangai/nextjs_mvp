import React, { useState, useEffect, useRef } from 'react';
import GaugeChart from '@/src/components/charts/forecasting/GaugeChart';

export default function PredictiveIndicatorCard() {

    const [slidePosition, setSlidePosition] = useState(0);
    const [canSlideMore, setCanSlideMore] = useState(true);
    const [canSlideBack, setCanSlideBack] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // ===================SLLIDER=========================================
    const slideAmount = 215;
    useEffect(() => {
        checkSlideAbility();
        window.addEventListener('resize', checkSlideAbility);
        return () => window.removeEventListener('resize', checkSlideAbility);
    }, [slidePosition]);

    const checkSlideAbility = () => {
        if (containerRef.current && sliderRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const sliderWidth = sliderRef.current.scrollWidth;
            const currentPosition = slidePosition;
            
            setCanSlideMore(currentPosition + containerWidth < sliderWidth);
            setCanSlideBack(currentPosition > 0);
        }
    };

    const handleSlideLeft = () => {
        if (canSlideMore) {
            setSlidePosition(prev => prev + slideAmount);
        }
    };

    const handleSlideRight = () => {
        if (canSlideBack) {
            setSlidePosition(prev => Math.max(0, prev - slideAmount));
        }
    };

    return (
        <>
        <div ref={containerRef} className='pl-[40px] pb-[77px] relative'>
                
            <button 
                onClick={handleSlideLeft}
                disabled={!canSlideMore}
                className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] ml-[-18px] top-[40%] z-30 transition-all duration-300
                    ${canSlideMore 
                        ? 'bg-fintown-btn-2 cursor-pointer hover:opacity-80' 
                        : 'hidden'}`}
            >
                <i className={`bx bx-chevron-left text-[24px] ${canSlideMore ? 'text-white' : 'text-gray-500'}`}></i>
            </button>

            {canSlideBack && (
                <button 
                    onClick={handleSlideRight}
                    disabled={!canSlideBack}
                    className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] right-[18px] top-[40%] z-30 transition-all duration-300
                        ${canSlideBack 
                            ? 'bg-fintown-btn-2 cursor-pointer hover:opacity-80' 
                            : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    <i className={`bx bx-chevron-right text-[24px] ${canSlideBack ? 'text-white' : 'text-gray-500'}`}></i>
                </button>
            )}
                
            <div 
                ref={sliderRef}
                className='flex gap-x-[36px] overflow-hidden'
                style={{
                    marginLeft: `-${slidePosition}px`,
                    transition: isDragging ? 'none' : 'margin-left 0.5s ease-in-out',
                    userSelect: 'none'
                }}

             >
                <div className='px-[27px] py-[25px] rounded-[10px] border border-fintown-stt-sell min-w-[344px] max-w-[344px] '>
                    <div className='flex items-center gap-x-[10px] mb-[53px]'>
                        <p className='text-fintown-txt-1 text-[16px] font-bold'>Đánh giá chung</p>
                        <i className='bx bx-info-circle text-fintown-txt-1'></i>
                    </div>

                    <div className='mb-[20px]'>
                        < GaugeChart />
                    </div>

                    <hr className='border-fintown-br mb-[26px]' />
                    
                    <div className='flex mb-[20px] overflow-hidden flex-nowrap'>
                        <div className='flex flex-col gap-y-[23px] min-w-full mr-[10px]'>
                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Hiệu quả sinh lời</p>
                                <div className='text-fintown-stt-sell text-[14px] text-right font-bold' >
                                    Tiêu cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Khả năng thanh toán</p>
                                <div className='text-fintown-stt-sell text-[14px] text-right font-bold' >
                                    Tiêu cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Doanh thu & lợi nhuận</p>
                                <div className='text-fintown-stt-buy text-[14px] text-right font-bold' >
                                    Tích cực
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-[23px] min-w-full'>
                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Hiệu quả sinh lời</p>
                                <div className='text-fintown-stt-sell text-[14px] text-right font-bold' >
                                    Tiêu cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Khả năng thanh toán</p>
                                <div className='text-fintown-stt-sell text-[14px] text-right font-bold' >
                                    Tiêu cực
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-fintown-txt-1 text-[14px] font-bold'>Doanh thu & lợi nhuận</p>
                                <div className='text-fintown-stt-buy text-[14px] text-right font-bold' >
                                    Tích cực
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-x-[9px] justify-center'>
                        <div className='h-[10px] w-[10px] rounded-[50%] bg-white'></div>
                        <div className='h-[10px] w-[10px] rounded-[50%] bg-fintown-bg-stn'></div>
                    </div>
                </div>

                <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center mb-[53px] justify-between'>
                        <div>
                            <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                <p className='text-fintown-txt-1 text-[16px] font-bold'>Hiệu quả sinh lời</p>
                                <i className='bx bx-info-circle text-fintown-txt-1'></i>
                            </div>
                            <div className='text-fintown-stt-sell text-[12px]'>
                                Tiêu cực
                            </div>
                        </div>
                        <div className='h-[40px] w-[40px] rounded-[50%] bg-fintown-stt-sell flex items-center justify-center'>
                            <i className='bx bx-trending-down text-white text-[24px]'></i>
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

                    <button className='hover:bg-fintown-btn-2 mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                        Xem chi tiết
                    </button>
                </div>

                <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center mb-[53px] justify-between'>
                        <div>
                            <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                <p className='text-fintown-txt-1 text-[16px] font-bold'>Khả năng thanh toán</p>
                                <i className='bx bx-info-circle text-fintown-txt-1'></i>
                            </div>
                            <div className='text-fintown-stt-sell text-[12px]'>
                                Tiêu cực
                            </div>
                        </div>
                        <div className='h-[40px] w-[40px] rounded-[50%] bg-fintown-stt-sell flex items-center justify-center'>
                            <i className='bx bx-trending-down text-white text-[24px]'></i>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-[24px] mb-[20px]'>
                        <div className='flex gap-x-[18px]'>
                            <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                <i className='bx bx-down-arrow-alt text-fintown-stt-sell text-[24px] rotate-45'></i>
                            </div>

                            <div>
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>Rủi ro thanh toán các khoản nợ</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>
                    </div>

                    <button className='hover:bg-fintown-btn-2 mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                        Xem chi tiết
                    </button>
                </div>

                <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center mb-[53px] justify-between'>
                        <div>
                            <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                <p className='text-fintown-txt-1 text-[16px] font-bold'>Doanh thu & lợi nhuận</p>
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
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/E</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>

                        <div className='flex gap-x-[18px]'>
                            <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                            </div>

                            <div>
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/B</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>
                    </div>

                    <button className='hover:bg-fintown-btn-2 mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                        Xem chi tiết
                    </button>
                </div>

                <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center mb-[53px] justify-between'>
                        <div>
                            <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                <p className='text-fintown-txt-1 text-[16px] font-bold'>Dòng tiền</p>
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
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/E</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>

                        <div className='flex gap-x-[18px]'>
                            <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                            </div>

                            <div>
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/B</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>
                    </div>

                    <button className='hover:bg-fintown-btn-2 mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                        Xem chi tiết
                    </button>
                </div>

                <div className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center mb-[53px] justify-between'>
                        <div>
                            <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                <p className='text-fintown-txt-1 text-[16px] font-bold'>Tài sản & vốn chủ sở hữu</p>
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
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/E</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>

                        <div className='flex gap-x-[18px]'>
                            <div className='h-[40px] w-[40px] rounded-[8px] border border-fintown-br flex items-center justify-center'>
                                <i className='bx bx-up-arrow-alt text-fintown-pr9 text-[24px] rotate-45'></i>
                            </div>

                            <div>
                                <p className='text-fintown-txt-1 font-bold text-[14px] '>P/B</p>
                                <p className='text-fintown-txt-1 text-[12px]'>Dự báo tăng 6% trong 5 năm tới</p>
                            </div>
                        </div>
                    </div>

                    <button className='hover:bg-fintown-btn-2 mt-auto rounded h-[48px] w-full flex items-center justify-center border border-fintown-br text-[12px] font-bold text-fintown-txt-2'>
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
        </>
    )
};