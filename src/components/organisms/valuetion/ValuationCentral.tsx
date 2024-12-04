import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import FairValueCalculator from "@/src/components/organisms/valuetion/FairValueCalculator";
import PriceHistoryTab from '@/src/components/organisms/valuetion/PriceHistoryTab';
import SlidingTabs from "@/src/components/common/SlidingTabs";
import { fetchScenarios, postScenario } from '@/src/redux/Scenarios';
import { selectValuationResultData } from '@/src/redux/ValuationResult';
import { selectProfileSummaryClosePrice } from '@/src/redux/ProfileSummary';
import { upsideCalculator } from "@/src/utils/upsideCalculator";
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { selectToken } from "@/src/redux/auth";
import { getModelNameValuation } from '@/src/utils/getModelNameValuation';
import { selectHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';

interface Tab {
    id: number;
    label: string;
}

export default function ValuationCentralComponent({ symbol, name, formular }: { symbol: string; name: string; formular: string }) {
    const dispatch = useAppDispatch();
    const valuationResultData = useAppSelector(selectValuationResultData);
    const selectPrice = useAppSelector(selectProfileSummaryClosePrice) ?? 0;
    const selectButton = useAppSelector(selectSelectedButton);
    const token = useAppSelector(selectToken);
    const selectedTabScenarios = useAppSelector(selectHistorySelectedButton);

    const result = valuationResultData
    ? upsideCalculator(selectButton, valuationResultData, selectPrice)
    : { upside: 0, adjustedPrice: 0 };
    // Tính toán giá cuối cùng dựa trên tỷ lệ tăng trưởng nếu selectButton > 4
    const adjustedPrice = result.adjustedPrice;
    // Tính toán upside
    const upside = result.upside;

    // ANIMATION POPUP
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // VALIDATION
    const [scenarioName, setScenarioName] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({ scenarioName: '', notes: '' });

    // POP UP THÊM KỊCH BẢN=============================================================
    useEffect(() => {
        if (isPopupOpen) {
            // document.body.classList.add('overflow-hidden');
            setIsAnimating(true);
        } else {
            setTimeout(() => setIsAnimating(false), 300);
            // document.body.classList.remove('overflow-hidden');
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
                return <FairValueCalculator symbol={symbol} />;
            case 1:
                return <PriceHistoryTab symbol={symbol} />;
            default:
                return null;
        }
    };

    useEffect(()=>{
        // console.log('selectedTabScenarios ở bên kia ', selectedTabScenarios)
        handleTabChange(selectedTabScenarios);
    }, [selectedTabScenarios])

    //CÁC HÀM VALIDATE===================================================================
    const handleSave = async () => {
        let valid = true;
        const newErrors = { scenarioName: '', notes: '' };

        // Validate Tên kịch bản
        if (!scenarioName.trim()) {
            valid = false;
            newErrors.scenarioName = 'Tên kịch bản không được bỏ trống.';
        } else if (scenarioName.length > 50) {
            valid = false;
            newErrors.scenarioName = 'Tên kịch bản không được vượt quá 50 ký tự.';
        }

        // Validate Ghi chú
        if (!notes.trim()) {
            valid = false;
            newErrors.notes = 'Ghi chú không được bỏ trống.';
        } else if (notes.length > 1000) {
            valid = false;
            newErrors.notes = 'Ghi chú không được vượt quá 1000 ký tự.';
        }

        setErrors(newErrors);

        if (valid) {

            let valuated;

            if (selectButton > 4) {
                valuated = adjustedPrice;
            }

            if (selectButton < 5) {
                valuated =  valuationResultData?.valuationResult;
            }

            const data = { 
                title: scenarioName,
                potential: upside,
                valuated: valuated,
                note: notes,
                actual: selectPrice,
                // expectedDate: 'Q3 2024'
            };

            // console.log('Saving...', data);

            if (token) {
                const name = getModelNameValuation(selectButton);
                const year = new Date().getFullYear();
                const filter = `year=${year}`;
                await dispatch(postScenario({ symbol: symbol, name: name, token: token, data: data}));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
            }

            setIsPopupOpen(false);
        }
    };
    
    return (
        <>
            <div className='w-full'>
                <div className='py-[30px] px-[24px] justify-between border-b border-fintown-br'>
                    <div className='text-[20px] font-bold text-fintown-txt-1 mb-[16px]'>
                        {name}
                    </div>

                    <div className="text-[14px] text-fintown-txt-1">
                        {formular}
                    </div>
                </div>

                <div className="flex items-center px-[24px] border-b border-fintown-br">
                    <div className='py-6'>
                        <SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"18px"} startIndex={0} fontsize='14px'/>
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
                <div
                onClick={() => setIsPopupOpen(false)}
                className={`fixed w-full h-full top-0 left-0 z-[60] flex justify-center items-start 
                bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-[400px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
                    transform transition-all duration-500 ease-out
                    ${isPopupOpen ? 'mt-[100px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}>

                    <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[10px]">
                        Lưu trữ kết quả tính toán của bạn
                    </div>
                    <div className="text-[12px] text-fintown-txt-2 mb-[33px]">
                        Bằng cách lưu lại kịch bản định giá này, bạn có thể kiểm xem lại và so sánh với diễn biến thực tế của cổ phiếu.
                    </div>

                    {/* Tên kịch bản */}
                    <div className="mb-[10px] text-[14px] text-fintown-txt-1 font-[600]">Tên cho kịch bản này</div>
                    <div className={`py-[13px] px-[16px] rounded-[8px] border 
                    ${errors.scenarioName ? 'border-[#E03C4A]' : 'border-fintown-br'}
                    `}>
                        <input
                            className="text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none"
                            placeholder="Ví dụ: Kết quả ước tính cho FPT - Q2/2025"
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                        />
                    </div>
                    {errors.scenarioName && (
                        <div className="text-red-500 text-[12px] mt-[5px]">{errors.scenarioName}</div>
                    )}

                    <div className='mb-[32px]'></div>

                    {/* Ghi chú */}
                    <div className="mb-[10px] text-[14px] text-fintown-txt-1 font-[600]">Ghi chú</div>
                        <div 
                        className={`py-[13px] px-[16px] rounded-[8px] border mb-[33px]
                        ${errors.notes ? 'border-[#E03C4A]' : 'border-fintown-br'}`}>
                            <textarea
                                className="text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none custom-scrollbarmini2"
                                placeholder="Hãy viết vài dòng ghi chú ngắn gọn"
                                rows={6}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            {errors.notes && <div className="text-red-500 text-[12px] mt-[4px]">{errors.notes}</div>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="py-[10px] text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded-[8px] mr-[10px]">
                                Để sau vậy
                            </button>
                            <button
                                onClick={handleSave}
                                className="py-[10px] text-fintown-txt-1 text-[12px] px-[23px] bg-fintown-pr9 rounded-[8px]">
                                Lưu kịch bản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}