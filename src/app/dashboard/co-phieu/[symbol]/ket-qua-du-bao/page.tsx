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
import SlidingTabs from "@/src/components/common/SlidingTabs";

interface Tab {
    id: number;
    label: string;
}

export default function KetQuaDuBaoPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    const selectedButton = useAppSelector(selectSelectedButton);
    const getScope = useAppSelector(selecScope);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const formRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const tabs: Tab[] = [
        { id: 0, label: "Đánh giá chung" },
        { id: 1, label: "Hiệu quả sinh lời" },
        { id: 2, label: "Khả năng thanh toán" },
        { id: 3, label: "Doanh thu & lợi nhuận" },
        { id: 4, label: "Dòng tiền" },
        { id: 5, label: "Tài sản & vốn chủ sở hữu" },
    ];

    // Xác định UI của trang đang ở
    useSetSelectedButtonStockPage(3);

    const handleButtonClick = (button: number, text: string) => {
        dispatch(setSelectedButtonAndText({ button, text }));
    };

    const handleTabChange = (index: number) => {
        const tabTexts: Record<number, string> = {
            0: "Đánh giá chung",
            1: "Hiệu quả sinh lời",
            2: "Khả năng thanh toán",
            3: "Doanh thu & lợi nhuận",
            4: "Dòng tiền",
            5: "Tài sản & vốn chủ sở hữu",
        };
    
        const text = tabTexts[index] || "";
        dispatch(setSelectedButtonAndText({ button: index, text }));
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
            <div className='px-[40px] py-[22px] flex items-center'>
                <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"50px"} startIndex={selectedButton} fontsize='14px'/>
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
