"use client";

import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/ForecastingPage';
import OverallAssessment from '@/src/components/organisms/forecasting/OverallAssessment';
import Profitability from '@/src/components/organisms/forecasting/Profitability';
import PaymentCapacity from '@/src/components/organisms/forecasting/PaymentCapacity';
import RevenueAndProfit from '@/src/components/organisms/forecasting/RevenueAndProfit';
import CashFlow from '@/src/components/organisms/forecasting/CashFlow';
import AssetsAndEquity from '@/src/components/organisms/forecasting/AssetsAndEquity';

export default function KetQuaDuBaoPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(4);
    useSetSelectedButtonStockPage(3);

    const handleButtonClick = (button: number, text: string) => {
        dispatch(setSelectedButtonAndText({ button, text }));
    };

    return (
        <>
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px]'>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 0 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(0, 'Đánh giá chung')}>
                    Đánh giá chung
                </button>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(1, 'Hiệu quả sinh lời')}>
                    Hiệu quả sinh lời
                </button>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(2, 'Khả năng thanh toán')}>
                    Khả năng thanh toán
                </button>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 3 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(3, 'Doanh thu & lợi nhuận')}>
                    Doanh thu & lợi nhuận
                </button>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 4 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(4, 'Dòng tiền')}>
                    Dòng tiền
                </button>
                <button
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 5 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`}
                    onClick={() => handleButtonClick(5, 'Tài sản & vốn chủ sở hữu')}>
                    Tài sản & vốn chủ sở hữu
                </button>
            </div>

            {
                selectedButton === 0 && (<OverallAssessment symbol={symbol} />)
            }

            {
                selectedButton === 1 && (
                    <div className='flex flex-col gap-y-[97px]'>
                        <Profitability />
                    </div>
                )
            }

            {
                selectedButton === 2 && (
                    <div className='flex flex-col gap-y-[97px]'>
                        <PaymentCapacity />
                    </div>
                )
            }

            {
                selectedButton === 3 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <RevenueAndProfit />
                    </div>
                )
            }

            {
                selectedButton === 4 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <CashFlow />
                    </div>
                )
            }

            {
                selectedButton === 5 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <AssetsAndEquity />
                    </div>
                )
            }

            <br />
        </>
    );
}
