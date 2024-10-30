import React, { useState } from 'react';
import UpsideRangerSlider from "./UpsideRangeSlider"
import CalculatorChart from "../charts/valuetion/CalculatorChart";

export default function FairValueCalculator(){
    const stockPrice = 150.75;
    const upside = 60;

    const [showChart, setShowChart] = useState(false);
    const handleMouseEnter = () => {
        setShowChart(true);
    };

    const handleMouseLeave = (e: any) => {
        // Kiểm tra xem chuột có đang ở trên icon hoặc chart không
        const tooltipEl = document.querySelector('.tooltip-container');
        const iconEl = document.querySelector('.icon-trigger');
        
        if (!tooltipEl?.contains(e.relatedTarget) && !iconEl?.contains(e.relatedTarget)) {
          setShowChart(false);
        }
    }

    return (
        <>
        <div className="px-[24px] py-[24px]">
            <div className="px-[24px] py-[24px] border border-fintown-br rounded-[8px] flex justify-between">

                <div className="w-full pr-[24px] ">
                    <div className="font-bold text-[14px] text-fintown-txt-1 mb-[12px]">
                        Giá trị thực:
                    </div>

                    <div className="flex items-end mb-[22px]">
                        <div className="font-bold text-[36px] text-fintown-txt-1 mr-[10px] leading-none">
                            105.500
                        </div>
                        <div className="text-[12px] text-fintown-txt-1 pb-[2px]">
                            VNĐ/cổ phiếu
                        </div>
                    </div>

                    <div>
                        < UpsideRangerSlider value={60}/>
                    </div>

                    <div className="text-[14px] text-fintown-txt-1 mb-[24px] pb-[17px] border-b border-fintown-br">
                        Tỷ lệ sinh lợi tiềm năng sau khi định giá là 20%, đây được xem là mức sinh lợi hấp dẫn.
                    </div>

                    <div className="mb-[14px] text-[14px] text-fintown-txt-2">
                        Thời gian chiết khấu mong muốn
                    </div>
                    
                    <div className="flex items-center mb-[72px]">
                        <div className="rounded border border-fintown-br flex items-center px-[16px] w-full max-w-[120px] justify-between mr-[14px] cursor-pointer">
                            <div className="text-fintown-txt-1 text-[12px] py-[12px] font-[600]">
                                Quý 3
                            </div>
                            <div>
                                <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                            </div>
                        </div>

                        <div className="rounded border border-fintown-br flex items-center px-[16px] w-full max-w-[120px] justify-between cursor-pointer">
                            <div className="text-fintown-txt-1 text-[12px] py-[12px] font-[600]">
                                Năm 2024
                            </div>
                            <div>
                                <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                            </div>
                        </div>
                    </div>

{/* =========================================================================================== */}
                    <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-pr9 w-full">
                        Tính toán
                    </button>
                </div>

                <div className="w-full max-w-[350px] flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-[14px] text-fintown-txt-1 mb-[17px] ">
                        Các tham số
                        </div>

                        <div className="flex flex-col gap-y-[10px]">
                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px] relative">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Dòng tiền tương lai dự kiến
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bol flex items-centerd">
                                        D1
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1 text-right flex items-center">
                                        <i className='bx bxs-bar-chart-alt-2 text-[18px] text-fintown-txt-2 cursor-pointer'
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                        </i>
                                    </div>
                                </div>

                                {showChart && (
                                    <div 
                                    className="px-[22px] py-[20px] absolute rounded-[10px] bg-fintown-bg-stn w-[385px] h-max right-[0] tooltip-container"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    >
                                    <div className="text-fintown-txt-1 text-[14px] font-[600] mb-[38px]">
                                        Dòng tiền tương lai dự kiến (Tỷ)
                                    </div>

                                    <div className="w-full">
                                        <CalculatorChart />
                                    </div>
                                    </div>
                                )}
                            </div>

                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Tỷ suất chiết khấu (WACC)
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bold text-right">
                                        r
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1">
                                        10%
                                    </div>
                                </div>
                            </div>

                            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                                    Số lượng thời kỳ
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] text-fintown-txt-1 font-bold">
                                        t
                                    </div>

                                    <div className="text-[14px] text-fintown-txt-1">
                                        Đến Q3 2025
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-btn-2 w-full">
                        Đặt lại
                    </button>
                </div>

            </div>
        </div>
        </>
    )
}