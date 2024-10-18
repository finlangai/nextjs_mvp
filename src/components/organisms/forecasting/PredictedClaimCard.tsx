import React, { useEffect, useState, useRef, use } from 'react';
import { 
    selectForecastingOverallAssessmentLoading, 
    selectForecastingOverallAssessmentError,
    selectForecastingOverallAssessmentData
} from '@/src/redux/ForecastingOverallAssessment';
import { ForecastingOverallAssessment, Criterias } from '@/src/interfaces/ForecastingOverallAssessment';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

import { convertToSignals, SignalInterface, finalStatus, finalStatusInterface } from '@/src/utils/convertToSignals';

export default function PredictedClaimCard() {
    const forecastingData = useAppSelector(selectForecastingOverallAssessmentData);
    const [NowData, setNowData] = useState<ForecastingOverallAssessment | null>(null);
    const [signals, setSignals] = useState<SignalInterface[]>([]);
    const [status, setStatus] = useState<finalStatusInterface>();

    useEffect(()=> {
        if (forecastingData) {
            setNowData(forecastingData);
        }
    }, [forecastingData]);

    useEffect(()=> {
        if (NowData?.criterias) {
            const signals = convertToSignals(NowData.criterias);
            setSignals(signals);
        }
    }, [NowData]);

    useEffect(()=> {
        if (signals.length > 0) {
            const kq = finalStatus({signals});
            setStatus(kq);
        }
    }, [signals]);

    return (
        <>
        <div className='px-[40px] pb-[40px] relative'> 
            <div className='flex flex-col gap-y-[23px] overflow-hidden'>
                
                <div className={`rounded-[10px] border`} style={{ borderColor: status?.color }}>
                    <div className='py-[21px] px-[23px]'>
                        <div className='flex mb-[24px] items-center'>
                            <div 
                            className={`h-[15px] w-[15px] rounded-[50%] border border-fintown-txt-1 mr-[8px]`} style={{ backgroundColor: status?.color }}></div>
                            <div className='text-[16px] font-bold text-fintown-txt-1'>Nhận định chung:</div>
                        </div>
                        {
                            NowData && (
                                <div className='text-[14px] text-fintown-txt-1 ' dangerouslySetInnerHTML={{ __html: NowData?.overall }}></div>
                            )
                        }
                    </div>
                </div>

                {NowData && Object.keys(NowData?.criterias).map((key) => {
                    const criteria = NowData.criterias[key];
                    // {console.log('??', criteria)}
                    if (criteria !== null) {
                        return (
                            <>
                                <div key={criteria.name} className={`rounded-[10px] border  ${criteria?.status === "Tích cực" ? "border-fintown-stt-buy" : "border-fintown-stt-sell"}`}>
                                    <div className='py-[21px] px-[23px]'>
                                        <div className='flex mb-[24px] items-center'>
                                            <div 
                                            className={`bg-fintown-stt-${criteria.status === "Tích cực" ? "buy" : "sell"} h-[15px] w-[15px] rounded-[50%] border border-fintown-txt-1 mr-[8px]`}>
                                                
                                            </div>
                                            <div className='text-[16px] font-bold text-fintown-txt-1'>{criteria.name}:</div>
                                        </div>

                                        <div className='text-[14px] text-fintown-txt-1 ' dangerouslySetInnerHTML={{ __html: criteria?.insight }}></div>
                                    </div>
                                </div>

                            </>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
        </>
    )
}