"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import { setHistorySelectedButton, selectHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import LogValuation from '@/src/components/organisms/valuetion/LogValuation';
import { selecScope } from "@/src/redux/auth";
import LoginForm from '@/src/components/form/Login';
import ValuationHeader from '@/src/components/organisms/valuetion/ValuationHeader';
import UpgradeNotice from '@/src/components/common/UpgradeNotice';

export default function DinhGiaCoPhieuLayout({ children, params }: { children: React.ReactNode, params: { symbol: string } }) {
    const selectedButton = useAppSelector(selectSelectedButton);
    const selectedTabRight = useAppSelector(selectHistorySelectedButton);
    const dispatch = useAppDispatch();
    useSetSelectedButtonSiderBar(6);
    const getScope = useAppSelector(selecScope);

    const symbol = params.symbol.toUpperCase();
    const isValidSymbol = /^[A-Z]{3}$/.test(symbol);

    const formRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    // =========================================================================
    if (!isValidSymbol) {
        notFound();
    }

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    // CHECK SCOPE============================================================
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
                    href={`/dashboard`}
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
            <div className='flex ' >
                <div className='w-full' >
                    <div className='pl-[40px] border-r border-b border-fintown-br ' >
                        < ValuationHeader symbol={symbol} />
                    </div>

                    <div className='flex' >
                        <div className='min-w-[265px] w-max pl-[40px] pt-[25px] pr-[24px] flex flex-col gap-y-[10px]' ref={containerRef}>
                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/chiet-khau-dong-tien`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 0 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Chiết khấu dòng tiền
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/chiet-khau-co-tuc`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 1 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Chiết khấu cổ tức
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/benjamin-graham`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 2 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Benjamin Graham
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/he-so-pe`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 3 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Hệ số P/E
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/he-so-pb`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 4 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Hệ số P/B
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/phuong-phap-peg`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 5 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Phương pháp PEG
                                </div>
                            </Link>

                            <Link href={`/dashboard/dinh-gia-co-phieu/${symbol}/mo-hinh-capm`}>
                                <div
                                    className={`cursor-pointer text-fintown-txt-1 text-[14px] font-bold w-full px-[17px] py-[14px] rounded-[8px] ${selectedButton === 6 ? 'bg-[#1E2127]' : 'hover:bg-[#1E2127]'
                                        }`}
                                >
                                    Mô hình CAPM
                                </div>
                            </Link>
                        </div>

                        <div className='w-full h-full  border-l border-fintown-br'>
                            {children}
                        </div>
                    </div>
                </div>

                <div className='min-w-[300px] max-w-[300px] border-l border-fintown-br'>
                    < LogValuation containerHeight={containerHeight} />
                </div>
            </div>

            {!getScope.includes('valuation-read') && (
                <UpgradeNotice containerHeight={`${containerHeight}px`} />
            )}
        </>
    );
}