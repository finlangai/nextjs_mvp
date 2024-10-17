import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";
import { BarsLoader } from '../../common/Loader';
import ForecastingContent from './ForecastingContent ';
import { ChartConfig } from '@/src/interfaces/Chart';

import FreeCashFlowGrowthRateChart from "../../charts/forecasting/FreeCashFlowGrowthRateChart"

export default function CashFlow({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  const configChart: ChartConfig[] = [
    {
      n: "Tăng trưởng dòng tiền tự do",
      chart: FreeCashFlowGrowthRateChart,
      color: chartsConfig.liquidityRatio.color
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 4, group:`` }));
      hasFetched.current = true;
    }
  }, [dispatch, symbol]);

  // RENDER
  if (forecastingCriteriaLoading) {
    return (
      <div className='flex w-full justify-center items-center h-[428px]'>
        <BarsLoader/>
      </div>
    );
  }

  return (
    <ForecastingContent 
      forecastingCriteriaData={forecastingCriteriaData} 
      configChart={configChart}
    />
  );
}