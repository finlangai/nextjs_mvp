"use client";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/HistoricalDataPage';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import HistoricalDataTable from '@/src/components/organisms/HistoricalDataTable';

export default function DuLieuLichSuPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);

    // Xác định UI của trang đang ở
    useSetSelectedButtonSiderBar(3);
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

            <div className='px-[40px] flex items-center gap-x-[26px] mb-[20px]'>
                <div className='flex items-center gap-x-[15px]'>
                    <button className='flex items-center py-[10px] px-[15px] rounded-[10px] bg-fintown-btn-disable'>
                        <div className='mr-[10px] text-fintown-txt-1 text-[14px]'>Chọn ngày</div>
                        <i className='bx bx-calendar text-fintown-txt-1'></i>
                    </button>

                    <div className='text-fintown-txt-1 text-[14px]'>
                        đến
                    </div>

                    <button className='flex items-center py-[10px] px-[15px] rounded-[10px] bg-fintown-btn-disable'>
                        <div className='mr-[10px] text-fintown-txt-1 text-[14px]'>Chọn ngày</div>
                        <i className='bx bx-calendar text-fintown-txt-1'></i>
                    </button>

                    <button className='flex items-center py-[10px] px-[20px] rounded-[10px] bg-fintown-pr9 justify-center'>
                        <div className='text-fintown-txt-1 text-[14px]'>Xác nhận</div>
                    </button>
                </div>
            </div>

            {/* =========================================FILTER============================================== */}
            <div className='px-[40px] mb-[40px]'>
                < HistoricalDataTable symbol={symbol}/>
            </div>

        </>
    )
}
