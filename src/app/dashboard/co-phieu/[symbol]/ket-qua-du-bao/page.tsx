"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/ForecastingPage';
import OverallAssessment from '@/src/components/organisms/forecasting/OverallAssessment';
import Profitability from '@/src/components/organisms/forecasting/Profitability';
import PaymentCapacity from '@/src/components/organisms/forecasting/PaymentCapacity';
import RevenueAndProfit from '@/src/components/organisms/forecasting/RevenueAndProfit';
import CashFlow from '@/src/components/organisms/forecasting/CashFlow';
import AssetsAndEquity from '@/src/components/organisms/forecasting/AssetsAndEquity';
import UpgradeNotice from '@/src/components/common/UpgradeNotice';
import { selecScope } from "@/src/redux/auth";
import LoginForm from '@/src/components/form/Login';

export default function KetQuaDuBaoPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);
    const getScope = useAppSelector(selecScope);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const formRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    // Xác định UI của trang đang ở
    useSetSelectedButtonStockPage(3);

    const handleButtonClick = (button: number, text: string) => {
        dispatch(setSelectedButtonAndText({ button, text }));
    };

    // CHECK SCOPE============================================================

    // Lấy chiều cao
    useEffect(() => {
        if (!getScope || !containerRef.current) {
            return;
        }

        setContainerHeight(containerRef.current.clientHeight);
        console.log('containerHeight', containerHeight)
        const handleResize = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [getScope, containerRef.current, symbol]);

    // Xử lý hiệu ứng trượt xuống khi modal xuất hiện
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // console.log(getScope)
        if (!getScope) {
            const timer = setTimeout(() => setIsModalVisible(true), 0);
            return () => clearTimeout(timer);
        }
    }, [getScope]);

    if (!getScope) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                onClick={(event) => {
                    if (formRef.current && !formRef.current.contains(event.target as Node)) {
                        linkRef.current?.click();
                    }
                }}
            >
                <Link
                    href={`/dashboard/co-phieu/${symbol}`}
                    ref={linkRef}
                    style={{ display: 'none' }}
                >
                    Go to Dashboard
                </Link>

                <div
                    ref={formRef}
                    className={`
                        w-full
                        max-w-md
                        transform
                        transition-all
                        duration-500
                        ${isModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                    `}
                    style={{
                        transform: isModalVisible ? 'translateY(0)' : 'translateY(-50px)',
                        opacity: isModalVisible ? 1 : 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <LoginForm />
                </div>
            </div>
        );
    };

    return (
        <>
        <div className='relative'>
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
                        <Profitability symbol={symbol} />
                    </div>
                )
            }

            {
                selectedButton === 2 && (
                    <div className='flex flex-col gap-y-[97px]'>
                        <PaymentCapacity symbol={symbol} />
                    </div>
                )
            }

            {
                selectedButton === 3 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <RevenueAndProfit symbol={symbol} />
                    </div>
                )
            }

            {
                selectedButton === 4 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <CashFlow symbol={symbol} />
                    </div>
                )
            }

            {
                selectedButton === 5 &&  (
                    <div className='flex flex-col gap-y-[97px]'>
                        <AssetsAndEquity symbol={symbol} />
                    </div>
                )
            }

            <br />

            {!getScope.includes('assessment-read') && (
                <UpgradeNotice 
                containerHeight={`100%`} 
                style={{
                    top: "0px",
                    width:"100%",
                    zIndex: 49
                }}
                />
            )}

        </div>
        </>
    );
}
