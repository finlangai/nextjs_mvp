import React, { useEffect, useState, useRef } from 'react';
import PredictiveIndicatorCard from '@/src/components/organisms/forecasting/PredictiveIndicatorCard';
import PredictedClaimCard from '@/src/components/organisms/forecasting/PredictedClaimCard';
import { 
    fetchForecastingOverallAssessment, 
    selectForecastingOverallAssessmentLoading, 
    selectForecastingOverallAssessmentError 
} from '@/src/redux/ForecastingOverallAssessment';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { BarsLoader } from '../../common/Loader';

export default function OverallAssessment({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const hasFetched = useRef(false);
    const OverallAssessmentLoading = useAppSelector(selectForecastingOverallAssessmentLoading);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchForecastingOverallAssessment({ symbol: symbol }));
            hasFetched.current = true;
        }
    }, [dispatch]);

    // RENDER
    if (OverallAssessmentLoading) {
        return (
            <>
            <div className='flex w-full justify-center items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <>
            <div className="overflow-hidden">
                < PredictiveIndicatorCard/>
            </div>

            <div className='pl-[40px] text-[24px] font-bold text-fintown-txt-1 mb-[32px]'>
                Luận điểm
            </div>

            <div className="overflow-hidden">
                < PredictedClaimCard />
            </div>
        </>
    )
}