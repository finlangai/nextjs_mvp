"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/StockPage/stockPageSlice';
import Breadcrumbs from '@/src/components/common/Breadcrumbs';
import StockProfileSummary from '@/src/components/organisms/StockProfileSummary';
import StockMetricsSummary from '@/src/components/organisms/StockMetricsSummary';
import { fetchProfileSummaries } from '@/src/redux/ProfileSummary';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';

export default function MaCoPhieuLayout({ children, params }: { children: React.ReactNode, params: { symbol: string } }) {
    const symbol = params.symbol.toUpperCase();
    const isValidSymbol = /^[A-Z]{3}$/.test(symbol);
    if (!isValidSymbol) {
        notFound();
    }

    useSetSelectedButtonSiderBar(3);
    const selectedButton = useAppSelector(selectSelectedButton);
    const dispatch = useAppDispatch();

    // Hàm xử lý khi button được nhấn
    const handleButtonClick = (buttonIndex: number | null) => {
        dispatch(setSelectedButtonActive({ button: buttonIndex }));
    };
    
    // Sử dụng useRef để theo dõi trạng thái gọi API
    const hasFetched = useRef(false);

    useEffect(() => {
        // Chỉ fetch nếu chưa fetch API
        if (!hasFetched.current) {
            dispatch(fetchProfileSummaries({ symbol }));
            hasFetched.current = true;
        }
    }, [symbol, dispatch]);

    return (
        <>
            <Breadcrumbs symbol={symbol}/>

            <div className='px-[40px] flex'>
                <div className='max-w-[594px] mr-[48px]'>
                    <StockProfileSummary />
                </div>

                <div className='w-full'>
                    <StockMetricsSummary symbol={symbol}/>
                </div>
            </div>

            <div className='px-[40px] py-[22px] font-bold flex items-center gap-x-[50px] border-y border-fintown-br dark:border-fintown-br-light text-fintown-txt-2'>

                <Link href={`/dashboard/co-phieu/${symbol}/`}>
                    <button
                        onClick={() => handleButtonClick(0)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 0 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        Chỉ số kỹ thuật
                    </button>
                </Link>

                <Link href={`/dashboard/co-phieu/${symbol}/bao-cao-doanh-nghiep`}>
                    <button
                        onClick={() => handleButtonClick(1)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 1 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        Báo cáo doanh nghiệp
                    </button>
                </Link>

                <Link href={`/dashboard/co-phieu/${symbol}/ho-so-doanh-nghiep`}>
                    <button
                        onClick={() => handleButtonClick(2)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 2 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        Hồ sơ doanh nghiệp
                    </button>
                </Link>

                <Link href={`/dashboard/co-phieu/${symbol}/ket-qua-du-bao`}>
                    <button
                        onClick={() => handleButtonClick(3)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 3 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        Kết quả dự báo
                    </button>
                </Link>

                <Link href={`/dashboard/co-phieu/${symbol}/du-lieu-lich-su`}>
                    <button
                        onClick={() => handleButtonClick(4)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 4 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        Dữ liệu lịch sử
                    </button>
                </Link>

                <Link href={`/dashboard/co-phieu/${symbol}/so-sanh`}>
                    <button
                        onClick={() => handleButtonClick(5)} 
                        className={`text-sm py-[10px] px-[16px] rounded-[7px] ${selectedButton === 5 ? 'bg-fintown-btn-active-1 text-fintown-txt-1' : ''}`}
                    >
                        So sánh
                    </button>
                </Link>

            </div>

            {/* =========================================COMPONENT============================================== */}

            <div>{children}</div>
        </>
    );
}
