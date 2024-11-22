"use client";
import React, { useState, useEffect, useRef } from 'react';
import FairValueCalculator from "@/src/components/organisms/FairValueCalculator";
import SlidingTabs from "@/src/components/common/SlidingTabs";
import PriceHistoryTab from '@/src/components/organisms/PriceHistoryTab';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { setHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { selectToken } from "@/src/redux/auth";

interface Tab {
    id: number;
    label: string;
}

export default function HeSoPePage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(3);

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [isAnimating, setIsAnimating] = useState(false);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);
    // console.log("Token:", token);

    useEffect(() => {
        if (!hasFetched.current) {
            const name = 'price-to-earnings-relative-valuation';
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token:token }));
                hasFetched.current = true;
            }
        }
    }, [dispatch]);

    // POP UP THÊM KỊCH BẢN=============================================================
    useEffect(() => {
        if (isPopupOpen) {
            document.body.classList.add('overflow-hidden');
            setIsAnimating(true);
        } else {
            setTimeout(() => setIsAnimating(false), 300);
            document.body.classList.remove('overflow-hidden');
        }
    }, [isPopupOpen]);

    // SLIDING TAB======================================================================
    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    const tabs: Tab[] = [
        { id: 0, label: "Máy tính" },
        { id: 1, label: "Lưu trữ định giá" }
    ];

    const renderContent = () => {
        switch (activeTabIndex) {
            case 0:
                dispatch(setHistorySelectedButton({ button: 0 }));
                return <FairValueCalculator symbol={symbol} />;
            case 1:
                dispatch(setHistorySelectedButton({ button: 1 }));
                return <PriceHistoryTab />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='w-full'>
                <div className='py-[30px] px-[24px] justify-between border-r border-b border-fintown-br'>
                    <div className='text-[20px] font-bold text-fintown-txt-1 mb-[16px]'>
                        Mô hình định giá theo hệ số P/E (Price to Earnings)
                    </div>

                    <div className="text-[14px] text-fintown-txt-1">
                        Công thức: P = EPS x P/E
                    </div>
                </div>

                <div className="flex items-center px-[24px] border-b border-fintown-br">
                    <div className='py-6'>
                        <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"18px"} startIndex={0} fontsize='12px'/>
                    </div>
                    {activeTabIndex === 0 && (
                        <button 
                            onClick={() => setIsPopupOpen(true)} 
                            className="text-fintown-txt-1 text-[12px] rounded py-[7px] px-[17px] bg-fintown-btn-2 ml-auto">
                            Lưu kịch bản
                        </button>
                    )}
                </div>

                <div>
                    {renderContent()}
                </div>
            </div>

            {(isPopupOpen || isAnimating) && (
                <div className={`fixed w-full h-full top-0 left-0 z-[60] flex justify-center items-start 
                    bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                    ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}>

                    <div className={`w-[400px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
                                            transform transition-all duration-500 ease-out
                                            ${isPopupOpen ? 'mt-[100px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}>

                        <div className='text-[16px] text-fintown-txt-1 font-[600] mb-[10px]'>

                            Lưu trữ kết quả tính toán của bạn
                        </div>
                        <div className='text-[12px] text-fintown-txt-2 mb-[33px]'>
                            Bằng cách lưu lại kịch bản định giá này, bạn có thể kiểm xem lại và so sánh với diễn biến thực tế của cổ phiếu.
                        </div>

                        <div className='mb-[10px] text-[14px] text-fintown-txt-1 font-[600]'>
                            Tên cho kịch bản này
                        </div>
                        <div className='py-[13px] px-[16px] rounded border border-fintown-br mb-[32px]'>
                            <input
                                className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                placeholder='Ví dụ: Kết quả ước tính cho FPT - Q2/2025'
                            />
                        </div>

                        <div className='mb-[10px] text-[14px] text-fintown-txt-1 font-[600]'>
                            Ghi chú
                        </div>
                        <div className='py-[13px] px-[16px] rounded border border-fintown-br mb-[33px]'>
                            <textarea
                                className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                placeholder='Hãy viết vài dòng ghi chú ngắn gọn'
                                rows={4}
                            />
                        </div>

                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded mr-[10px]'>
                                Để sau vậy
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] bg-fintown-pr9 rounded'>
                                Lưu kịch bản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
