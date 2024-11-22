import React, { useState, useEffect } from 'react';
import CalculatorChart from "../charts/valuetion/CalculatorChart";
import 
{ 
    selectValuationParamsData, 
    selectValuationParamsError, 
    selectValuationParamsLoading 
} 
from '@/src/redux/ValuationParams/valuationParamsSlice';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { PeParams } from '@/src/interfaces/Valuation';

export function PeParamsComponent(){
    const [nowData, setNowData] = useState<PeParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    // Lưu data đã fetch
    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    return(
        <div className="flex flex-col gap-y-[10px]">
            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                    Lợi nhuận trên mỗi cổ phiếu.
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[14px] text-fintown-txt-1 font-bold text-right">
                    EPS
                    </div>

                    <div className="text-[14px] text-fintown-txt-1">
                        {nowData?.earnings_per_share.toLocaleString('en-US')}
                    </div>
                </div>
            </div>

            <div className="border border-fintown-br py-[15px] px-[17px] rounded-[8px]">
                <div className="text-[12px] text-fintown-txt-1 mb-[7px]">
                    Tỷ lệ P/E của thị trường (VN30)
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[14px] text-fintown-txt-1 font-bold">
                        P/E
                    </div>

                    <div className="text-[14px] text-fintown-txt-1">
                        {nowData?.price_to_earnings}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DcfParams(){
    const [showChart, setShowChart] = useState(false);
    const handleMouseEnter = () => {
        setShowChart(true);
    };

    const handleMouseLeave = (e: any) => {
        const tooltipEl = document.querySelector('.tooltip-container');
        const iconEl = document.querySelector('.icon-trigger');
        
        if (!tooltipEl?.contains(e.relatedTarget) && !iconEl?.contains(e.relatedTarget)) {
          setShowChart(false);
        }
    }

    return(
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
    )
}