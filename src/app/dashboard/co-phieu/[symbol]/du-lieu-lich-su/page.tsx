"use client";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/HistoricalDataPage';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import HistoricalDataTable from '@/src/components/organisms/HistoricalDataTable';
import FilterRangeTimeTransaction from '@/src/components/organisms/FilterRangeTimeTransaction';

export default function DuLieuLichSuPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);

    // Xác định UI của trang đang ở
    useSetSelectedButtonStockPage(4);

    const handleButtonClick = (button: number, text: string) => {
        dispatch(setSelectedButtonAndText({ button, text }));
    };

    return (
        <>
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 0 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(0, 'Lịch sử giá')}>
                    Lịch sử giá
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(1, 'Lịch sử khớp lệnh')}>
                    Lịch sử khớp lệnh
                </button>
                <button 
                    className={`text-[14px] py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-3 text-fintown-pr9' : 'text-fintown-txt-2'}`} 
                    onClick={() => handleButtonClick(2, 'Cổ đông và nội bộ')}>
                    Cổ đông và nội bộ
                </button>
            </div>

            {/* =========================================FILTER============================================== */}

            < FilterRangeTimeTransaction symbol={symbol}/>

            {/* =========================================FILTER============================================== */}
            <div className='px-[40px] mb-[40px]'>
                {
                    selectedButton === 2 && (
                        < HistoricalDataTable symbol={symbol}/>
                    )
                }
            </div>

        </>
    )
}
