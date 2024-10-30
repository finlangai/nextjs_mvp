"use client";
import React, { useState, useEffect } from 'react';
import FairValueCalculator from "@/src/components/organisms/FairValueCalculator";
import SlidingTabs from "@/src/components/common/SlidingTabs";
import PriceHistoryTab from '@/src/components/organisms/PriceHistoryTab';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { setHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';

export default function DiscountCashFlowPage({ params }: { params: { symbol: string } }) {
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(0);

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isPopupOpen) {
            document.body.classList.add('overflow-hidden');
            setIsAnimating(true);
        } else {
            setTimeout(() => setIsAnimating(false), 300);
            document.body.classList.remove('overflow-hidden');
        }
    }, [isPopupOpen]);

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    const renderContent = () => {
        switch (activeTabIndex) {
            case 0:
                dispatch(setHistorySelectedButton({ button: 0 }));
                return <FairValueCalculator />;
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
                        Mô hình chiết khấu dòng tiền (Discounted Cash Flow)
                    </div>

                    <div className="text-[14px] text-fintown-txt-1">
                        Công thức: P0 = Σ (FCFt) / (1 + r)^t
                    </div>
                </div>

                <div className="flex items-center px-[24px] border-b border-fintown-br">
                    <SlidingTabs onTabChange={handleTabChange} />
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