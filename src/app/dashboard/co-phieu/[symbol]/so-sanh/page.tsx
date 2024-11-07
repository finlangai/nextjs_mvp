"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import CompareChart from '@/src/components/charts/CompareChart';
import SlidingTabs from '@/src/components/common/SlidingTabs';
import SemiCircularGauge from '@/src/components/charts/ProgressCircle';

interface Tab {
    id: number;
    label: string;
}

export default function SoSanhPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(4);
    useSetSelectedButtonStockPage(5);

    const tabs: Tab[] = [
        { id: 0, label: "So sánh đôi" },
        { id: 1, label: "So sánh tổng hợp" }
    ];

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <>
        <div className='flex pb-[100px]'>
            <div className='pl-[40px] pt-[30px] flex flex-col gap-y-[24px] pr-[26px]'>
                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer text-fintown-txt-2 hover:border-fintown-pr9 hover:text-fintown-pr9'>
                    <div className='text-[30px] hover:text-fintown-pr9'>
                        +
                    </div>
                </div>
            </div>

            <div className='pt-[30px] pr-[34px]'>
                <CompareChart />
            </div>

            <div className='pt-[30px] w-full pr-[40px]'>
                <div className='flex justify-between pb-[33px] items-center'>
                    <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"18px"} startIndex={0} fontsize={'14px'}/>
                    <div className='text-fintown-txt-1 text-[14px]'>*Kỳ tính toán: Quý 2 - 2024</div>
                </div>

                <div className='flex items-center mb-[49px]'>
                    <div className='relative w-max mr-[5px]'>
                        <div className='ml-[-20px]'>
                            < SemiCircularGauge />
                            <div className='top-[28px] left-[13px] absolute min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                            </div>
                        </div>

                        <div className='top-[70px] left-[20px] text-fintown-txt-1 text-[12px] absolute w-full'>
                            7.55
                        </div>
                    </div>
                    <div className='flex items-center justify-center rounded-[50%] border border-fintown-br w-[25px] h-[25px] mr-[25px]'>
                        <div className='text-fintown-txt-1 text-[8px]'>
                            VS
                        </div>
                    </div>
                    <div className='relative w-max'>
                        <div className='ml-[-20px]'>
                            < SemiCircularGauge />
                            <div className='top-[28px] left-[13px] absolute min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                            </div>
                        </div>

                        <div className='top-[70px] left-[20px] text-fintown-txt-1 text-[12px] absolute w-full'>
                            7.55
                        </div>
                    </div>

                    <i className='bx bx-recycle text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'></i>
                </div>

                <div className='text-fintown-txt-1 text-[12px] mb-[29px]'>
                    Q-Rating là bộ chỉ số đánh giá toàn diện chất lượng doanh nghiệp theo thang điểm 1-10.
                </div>

                <div>
                    <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                        <div className='min-w-[129px] w-full text-right'>
                            Q-Rating
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                            Hiệu quả sinh lời
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                            Khả năng thanh toán
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                            Doanh thu & Lợi nhuận
                        </div>
                    </div>
                    <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                        <div className='min-w-[129px] w-full text-right flex items-center'>
                            <div className='flex items-center w-[75px] justify-between '>
                                <div className='text-fintown-txt-1 font-bold'>VCB</div>
                                <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                    <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                </div>
                            </div>
                            <div className='ml-auto'>
                                7.55
                            </div>
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>
                    </div>
                    <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                        <div className='min-w-[129px] w-full text-right flex items-center'>
                            <div className='flex items-center w-[75px] justify-between '>
                                <div className='text-fintown-txt-1 font-bold'>VCB</div>
                                <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                    <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                </div>
                            </div>
                            <div className='ml-auto'>
                                7.55
                            </div>
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>
                    </div>
                    <div className='flex items-center text-fintown-txt-1 text-[14px] pb-[15px] border-b border-b-fintown-br mb-[18px]'>
                        <div className='min-w-[129px] w-full text-right flex items-center'>
                            <div className='flex items-center w-[75px] justify-between '>
                                <div className='text-fintown-txt-1 font-bold'>VCB</div>
                                <div className='min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                                    <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                </div>
                            </div>
                            <div className='ml-auto'>
                                7.55
                            </div>
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>

                        <div className='min-w-[129px] w-full text-right'>
                        7.55
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-x-[5px] justify-end'>
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
                </div>
            </div>
        </div>
        </>
    );
}
