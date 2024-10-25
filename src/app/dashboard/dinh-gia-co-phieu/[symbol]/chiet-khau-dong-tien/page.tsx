"use client";
import React, { useState } from 'react';
import FairValueCalculator from "@/src/components/organisms/FairValueCalculator"
import SlidingTabs from "@/src/components/common/SlidingTabs"
import PriceHistoryTab from '@/src/components/organisms/PriceHistoryTab';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { setHistorySelectedButton} from '@/src/redux/ValuetionPage/valuationHistorySlice';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';

export default function DiscountCashFlowPage({ params }: { params: { symbol: string } }){
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(1);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    // Handler nhận index từ SlidingTabs
    const handleTabChange = (index: number) => {
      setActiveTabIndex(index);
    };

    const renderContent = () => {
        switch (activeTabIndex) {
          case 0:
            dispatch(setHistorySelectedButton({ button: 0 }));
            return (
                < FairValueCalculator />
            );
          case 1:
            dispatch(setHistorySelectedButton({ button: 1 }));
            return (
                < PriceHistoryTab />
            );
          default:
            return null;
        }
    };

    return(
        <>
        <div className='w-full'>
            <div className='py-[30px] px-[24px] justify-between border-r border-b border-fintown-br'>
                <div className='text-[20px] font-bold text-fintown-txt-1 mb-[16px]'>
                    Mô hình chiết khấu dòng tiền (Discounted Cash Flow)
                </div>

                <div className="text-[14px] text-fintown-txt-1">
                    Công thức: P0 = Σ (FCFt) / (1 + r)^t
                </div>
            </div>

            <div className="flex items-center px-[24px] border-b border-fintown-br">
                < SlidingTabs onTabChange={handleTabChange} />

                <button className="text-fintown-txt-1 text-[12px] rounded py-[7px] px-[17px] bg-fintown-btn-2 ml-auto">
                    Lưu kết quả
                </button>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
        </>
    )
}