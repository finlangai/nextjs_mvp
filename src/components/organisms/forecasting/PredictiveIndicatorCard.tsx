import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedButton, setSelectedButtonAndText } from '@/src/redux/ForecastingPage';
import { 
    selectForecastingOverallAssessmentData
} from '@/src/redux/ForecastingOverallAssessment';
import { Criterias } from '@/src/interfaces/ForecastingOverallAssessment';
import OverallSlider from './OverallSlider';
import { convertToSignals, SignalInterface, finalStatus, finalStatusInterface } from '@/src/utils/convertToSignals';
import { updateMetrics } from '@/src/redux/ForecastingToggle';

const OverallChart = dynamic(() => import('@/src/components/charts/forecasting/OverallChartComponent'), {
    ssr: false,
});

export default function PredictiveIndicatorCard() {
    const dispatch = useAppDispatch();

    const forecastingData = useAppSelector(selectForecastingOverallAssessmentData);
    const [NowData, setNowData] = useState<Criterias | null>(null);
    const [signals, setSignals] = useState<SignalInterface[]>([]);
    const [status, setStatus] = useState<finalStatusInterface>();

    const [slidePosition, setSlidePosition] = useState(0);
    const [canSlideMore, setCanSlideMore] = useState(true);
    const [canSlideBack, setCanSlideBack] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        if (forecastingData?.criterias) {
            setNowData(forecastingData.criterias)
        }
    }, [forecastingData]);

    useEffect(()=> {
        if (NowData) {
            const signals = convertToSignals(NowData);
            setSignals(signals);
        }
    }, [NowData]);

    useEffect(()=> {
        if (signals.length > 0) {
            const kq = finalStatus({signals});
            setStatus(kq);
        }
    }, [signals]);

    // Xem chỉ số 1
    const handleClick = async (index: number, indexMetric: number) => {
        // console.log('index: ', index, 'indexMetric: ', indexMetric);
        // Chỉ thực hiện một lần dispatch để cập nhật metrics
        dispatch(updateMetrics({ group: index, metrics: [indexMetric] }));
        dispatch(setSelectedButtonAndText({ button: index + 1, text: '' }));
    };

    // Xem detail toàn bộ tiêu chí
    const clickDetail = (index:number) => {
        dispatch(setSelectedButtonAndText({ button: index + 1, text: '' }));
    };  
    
    // ===================SLLIDER=========================================
    const slideAmount = 215;
    useEffect(() => {
        checkSlideAbility();
        window.addEventListener('resize', checkSlideAbility);
        return () => window.removeEventListener('resize', checkSlideAbility);
    }, [slidePosition, NowData]);

    const checkSlideAbility = () => {
        if (containerRef.current && sliderRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const sliderWidth = sliderRef.current.scrollWidth;
            const currentPosition = slidePosition;
            
            setCanSlideMore(currentPosition + containerWidth < sliderWidth);
            setCanSlideBack(currentPosition > 0);
        }
    };

    const handleSlideLeft = () => {
        if (canSlideMore) {
            setSlidePosition(prev => prev + slideAmount);
        }
    };

    const handleSlideRight = () => {
        if (canSlideBack) {
            setSlidePosition(prev => Math.max(0, prev - slideAmount));
        }
    };

    return (
        <>
        <div ref={containerRef} className='pl-[40px] pt-[36px] pb-[77px] relative'>
                
            <button 
                onClick={handleSlideLeft}
                disabled={!canSlideMore}
                className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] ml-[-18px] top-[40%] z-30 transition-all duration-300
                    ${canSlideMore
                                ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80'
                                : 'hidden'}`}                  
            >
                <i className={`bx bx-chevron-left text-[24px] ${canSlideMore ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-gray-500'}`}></i>
            </button>

            {canSlideBack && (
                <button 
                    onClick={handleSlideRight}
                    disabled={!canSlideBack}
                    className={`flex items-center justify-center w-[40px] h-[40px] absolute rounded-[50%] right-[18px] top-[40%] z-30 transition-all duration-300
                        ${canSlideBack
                                ? 'bg-fintown-btn-2 dark:bg-fintown-btn-2-light cursor-pointer hover:opacity-80'
                                : 'bg-gray-300 cursor-not-allowed'}`}      
                >
                    <i className={`bx bx-chevron-right text-[24px] ${canSlideBack ? 'text-fintown-txt-1 dark:text-fintown-txt-1-light' : 'text-gray-500'}`}></i>
                </button>
            )}
                
            <div 
                ref={sliderRef}
                className='flex gap-x-[36px] overflow-hidden'
                style={{
                    marginLeft: `-${slidePosition}px`,
                    transition: isDragging ? 'none' : 'margin-left 0.5s ease-in-out',
                    userSelect: 'none'
                }}

             >
                <div className='px-[27px] py-[25px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light min-w-[344px] max-w-[344px]'>
                    <div className='flex items-center gap-x-[10px] mb-[53px]'>
                        <p className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-[16px] font-bold'>Đánh giá chung</p>
                        {/* <i className='bx bx-info-circle text-fintown-txt-1 dark:text-fintown-txt-1-light'></i> */}
                    </div>

                    <div className='mb-[20px]'>
                    {NowData && (
                        < OverallChart />
                    )}
                    </div>

                    <hr className='border-fintown-br dark:border-fintown-br-light mb-[26px]' />
                    
                    {NowData && (
                        <OverallSlider />
                    )}
                </div>

                {NowData && Object.keys(NowData).map((key, index) => {
                    const criteria = NowData[key];
                    if (criteria !== null) {
                        return (
                            <div key={index} className='flex flex-col justify-between px-[27px] py-[25px] rounded-[10px] border border-fintown-br dark:border-fintown-br-light min-w-[344px] max-w-[344px]'>
                                <div className='flex items-center mb-[53px] justify-between'>
                                    <div>
                                        <div className='flex items-center gap-x-[10px] mb-[5px]'>
                                            <p className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-[16px] font-bold'>{criteria.name}</p>
                                            {/* <i className='bx bx-info-circle text-fintown-txt-1 dark:text-fintown-txt-1-light'></i> */}
                                        </div>
                                        <div className={`text-[12px] ${criteria.status === "Tích cực" ? "text-fintown-stt-buy" : "text-fintown-stt-sell"}`}>
                                            {criteria.status}
                                        </div>
                                    </div>
                                    
                                    <div className={`h-[40px] w-[40px] rounded-[50%] flex items-center justify-center ${criteria.status === "Tích cực" ? "bg-fintown-stt-buy" : "bg-fintown-stt-sell"}`}>
                                        <i className={`${criteria.status === "Tích cực" ? "bx bx-trending-up" : "bx bx-trending-down"} text-white text-[24px] `}></i>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-y-[24px] mb-[20px]'>
                                    {criteria.group.map((groupItem) => (
                                        <div className='flex gap-x-[18px]' key={groupItem?.name}>
                                            <div className='min-h-[40px] max-h-[40px] min-w-[40px] rounded-[8px] border border-fintown-br dark:border-fintown-br-light flex items-center justify-center'>
                                                <i 
                                                className={`
                                                ${groupItem.status === "Tích cực" ? 
                                                    "bx bx-up-arrow-alt text-fintown-stt-buy " : 
                                                    "bx bx-down-arrow-alt text-fintown-stt-sell"
                                                } 
                                                text-[24px] `}>
                                                </i>
                                            </div>

                                            <div>
                                                <p 
                                                onClick={() => handleClick(index, groupItem?.index)} 
                                                className='cursor-pointer text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-[14px] hover:text-fintown-pr9'
                                                >
                                                {groupItem.name}
                                                </p>
                                                <p className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px]'> 
                                                {groupItem.status === "Tích cực" ? 
                                                    "Kết quả dự báo tích cực" : 
                                                    "Kết quả dự báo không được khả quan"
                                                } </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <button 
                                onClick={()=> clickDetail(index)} 
                                className='
                                mt-auto rounded-[8px] h-[48px] w-full flex items-center justify-center 
                                border border-fintown-br dark:border-fintown-br-light text-[12px] font-bold text-fintown-txt-1 dark:text-fintown-txt-1-light 
                                hover:border-fintown-pr9 hover:dark:border-fintown-pr9 '>
                                    Xem chi tiết
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}

            </div>
        </div>
        </>
    )
};