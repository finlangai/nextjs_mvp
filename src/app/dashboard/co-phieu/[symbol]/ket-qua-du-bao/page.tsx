"use client";

import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/ForecastingPage';
import OverallAssessment from '@/src/components/organisms/OverallAssessment';
import Profitability from '@/src/components/organisms/Profitability';

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
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
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
                    onClick={() => handleButtonClick(3, 'Giá trị thị trường')}>
                    Giá trị thị trường
                </button>
            </div>

            {
                selectedButton === 0 && (<OverallAssessment />)
            }

            {
                selectedButton === 1 && (
                    <div className='flex flex-col gap-y-[97px]'>
                        <Profitability/>
                    </div>
                )
            }
        </>
    );
}
