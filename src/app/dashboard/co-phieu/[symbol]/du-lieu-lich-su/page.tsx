"use client";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/HistoricalDataPage';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import TransactionTable from '@/src/components/organisms/transaction/TransactionTable';
import FilterRangeTimeTransaction from '@/src/components/organisms/transaction/FilterRangeTimeTransaction';
import DivendensTable from '@/src/components/organisms/transaction/DivendensTable';
import SlidingTabs from "@/src/components/common/SlidingTabs";
interface Tab {
    id: number;
    label: string;
}

export default function DuLieuLichSuPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);

    // Xác định UI của trang đang ở
    useSetSelectedButtonStockPage(4);

    const handleButtonClick = (button: number, text: string) => {
        dispatch(setSelectedButtonAndText({ button, text }));
    };

    // SLIDING TAB
    const handleTabChange = (index: number) => {
        let text;
        switch (index) { 
          case 0:
            text = 'Cổ tức';
            dispatch(setSelectedButtonAndText({ button: index, text }));
            break;
          case 1:
            text = 'Cổ đông và nội bộ';
            dispatch(setSelectedButtonAndText({ button: index, text }));
            break;
          default:
            break;
        }
    };
    
    const tabs: Tab[] = [
        { id: 0, label: "Cổ tức" },
        { id: 1, label: "Cổ đông và nội bộ" },
    ];

    return (
        <>
            <div className='px-[40px] py-[22px] flex items-center gap-x-[50px] mb-[28px]'>
                <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"50px"} startIndex={selectedButton} fontsize='14px'/>
            </div>

            {/* =========================================FILTER============================================== */}
            {
                selectedButton === 1 && (
                    < FilterRangeTimeTransaction symbol={symbol} />
                )
            }

            {/* =========================================FILTER============================================== */}
            <div className='px-[40px] pb-[40px]'>
                {
                    selectedButton === 0 && (
                        < DivendensTable symbol={symbol} />
                    )
                }

                {
                    selectedButton === 1 && (
                        < TransactionTable symbol={symbol} />
                    )
                }
            </div>

        </>
    )
}
