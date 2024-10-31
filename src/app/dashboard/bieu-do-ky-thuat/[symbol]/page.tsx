"use client";
import React, { useState } from 'react';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import SlidingTabs from '@/src/components/common/SlidingTabs';
import TechnicalChart from '@/src/components/charts/TechnicalChart/TechnicalChart';
import { sampleStockData, generateRandomStockData  } from '@/src/utils/sampleData';

interface Tab {
    id: number;
    label: string | null;
}
export default function BieuDoKyThuatPage() {
    useSetSelectedButtonSiderBar(5);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const tabs: Tab[] = [
        { id: 0, label: null },
        { id: 1, label: "VN30" },
        { id: 2, label: "HOSE" },
        { id: 3, label: "HNX" }
    ];

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <>
        <div className='border-r border-r-fintown-br'>
            <div className='flex w-full '>
                <div className='min-w-[358px] border-r border-r-fintown-br'>
                    <div className=' border-b border-b-fintown-br'>
                        <div className='px-[20px] pt-[20px] mb-[12px]'>
                            <div className='py-[13px] px-[24px] flex items-center rounded-[8px] border border-fintown-br'> 
                                <i className='bx bx-search text-fintown-txt-2 text-[20px] pr-[13px]'></i>
                                <input className='bg-transparent text-[14px] outline-none text-fintown-txt-1' type="text" placeholder='Tìm cổ phiếu' />
                            </div>
                        </div>
                        <div className='px-[20px] py-[13px]'>
                            < SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"24px"} />
                        </div>
                    </div>

                    <div className='flex items-center px-[24px] py-[14px] border-b border-b-fintown-br'>
                        <div className='text-fintown-txt-2 font-bold text-[12px] w-full text-right'>Cổ phiếu</div>
                        <div className='text-fintown-txt-2 font-bold text-[12px] min-w-[74px] flex justify-center items-center'>
                            <p className='mr-[3px]'>Giá</p>
                            <i className='bx bx-down-arrow-alt text-[15px]' ></i>
                        </div>
                        <div className='text-fintown-txt-2 font-bold text-[12px] min-w-[86px] flex justify-center items-center'>
                            <p className='mr-[3px]'>KL</p>
                            <i className='bx bx-down-arrow-alt text-[15px]' ></i>
                        </div>
                        <div className='text-fintown-txt-2 font-bold text-[12px] min-w-[61px] flex justify-center items-center'>
                            <p className='mr-[3px]'>%</p>
                            <i className='bx bx-down-arrow-alt text-[15px]' ></i>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center px-[24px] py-[14px] border-b border-b-fintown-br hover:bg-fintown-bg-stn'>
                            <div className='flex items-center w-full'>
                                <div className='flex justify-center w-full w-[25px]'>
                                    <i className='bx bxs-star text-[18px] text-fintown-txt-2 mr-[10px] cursor-pointer'></i>
                                </div>
                                <div className='min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] rounded-[50%] overflow-hidden bg-white mr-[7px]'>
                                    <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                </div>
                                <div className='text-fintown-txt-1 font-bold text-[12px] cursor-pointer'>
                                    VCB
                                </div>
                            </div>
                            <div className='text-fintown-txt-1 font-bold text-[12px] min-w-[74px] flex justify-center items-center '>
                                <p>1,456,584</p>
                            </div>
                            <div className='text-fintown-txt-1 font-bold text-[12px] min-w-[86px] flex justify-center items-center'>
                                <p>156,456,584</p>
                            </div>
                            <div className='text-fintown-stt-buy font-bold text-[12px] min-w-[61px] flex justify-center items-center'>
                                <p>+10,45%</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-full '>
                    <div className='border-b border-b-fintown-br flex w-full'>
                        {/* Phần tử đầu tiên có width cố định */}
                        <div className='flex items-center pl-[24px] border-r border-r-fintown-br w-[430px] py-[16px]'>
                            <div className='h-[40px] w-[40px] rounded-[50%] overflow-hidden bg-white mr-[13px]'>
                                <img className='h-full w-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                            </div>

                            <div>
                                <div className='flex items-center'>
                                    <p className='text-[16px] text-fintown-txt-1 font-bold mr-[11px]'>VCB</p>
                                    <i className='bx bxs-star text-[18px] text-fintown-txt-2 mr-[10px] cursor-pointer'></i>
                                </div>
                                <div className='text-[14px] font-[400] text-fintown-txt-2'>
                                    Công ty cổ phần vàng bạc đá quý Phú Nhuận
                                </div>
                            </div>
                        </div>
                        
                        {/* Các phần tử còn lại chia đều không gian */}
                        <div className='flex flex-1'>
                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Giá đóng cửa</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thay đổi 24h</div>
                                <div className='text-fintown-stt-buy text-[12px] font-bold'>+5.65%</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Cao nhất 24h</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thấp nhất 24h</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] '>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Khối lượng</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>
                        </div>
                    </div>

                    <div className='border-b border-b-fintown-br flex'>
                        <div className='flex min-w-[430px]'>
                            <div className='pl-[24px] flex items-center gap-x-[28px] py-[18px] min-w-[257px] border-r border-r-fintown-br'>
                                <button className='text-[12px] font-bold text-fintown-pr9'>
                                    1D
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    3M
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    1Y
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    YTD
                                </button>
                            </div>

                            <div className='pl-[24px] flex items-center gap-x-[28px] py-[20.5px] w-full border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 font-bold cursor-pointer flex items-center'>
                                    <i className='bx bx-candles text-[20px] text-fintown-pr9'></i>
                                </div>

                                <div className='text-fintown-txt-2 font-bold max-h-max flex items-center cursor-pointer'>
                                    <i className='bx bxs-chart text-[20px]'></i>
                                </div>

                                <div className='text-fintown-txt-2 font-bold cursor-pointer flex items-center'>
                                    <i className='bx bxs-bar-chart-square text-[20px]'></i>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='pl-[24px] flex items-center mr-[24px]'>
                                <i className='bx bx-line-chart mr-[11px] text-fintown-txt-2 text-[20px]'></i>
                                <div className='text-[12px] font-bold text-fintown-txt-2'>Chỉ báo kỹ thuật</div>
                            </div>
                            <div className='flex items-center'>
                                <i className='bx bx-cog text-fintown-txt-2 text-[20px]'></i>
                            </div>
                            <div className='flex items-center ml-auto pr-[24px]'>
                                <i className='bx bx-camera text-fintown-txt-2 text-[20px] mr-[20px]' ></i>
                                <i className='bx bx-expand text-fintown-txt-2 text-[20px]'></i>
                            </div>
                        </div>
                    </div>

                    <div className='px-[10px] py-[10px]'>
                        < TechnicalChart data={sampleStockData} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}