import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";
import { BarsLoader } from '../../common/Loader';
import ForecastingContent from './ForecastingContent ';
import { ChartConfig } from '@/src/interfaces/Chart';

import LiquidityRatioChart from "../../charts/forecasting/LiquidityRatioChart";
import InterestCoverageRatioChart from "../../charts/forecasting/InterestCoverageRatioChart";
import DebtToAssetsRatioChart from "../../charts/forecasting/DebtToAssetsRatioChart";

export default function PaymentCapacity({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  const configChart: ChartConfig[] = [
    {
      n: "Tính thanh khoản",
      chart: LiquidityRatioChart,
      color: chartsConfig.liquidityRatio.color
    },
    {
      n: "Tỷ số thanh toán lãi vay",
      chart: InterestCoverageRatioChart,
      color: chartsConfig.interestCoverageRatio.color
    },
    {
      n: "Tỷ số nợ trên tài sản",
      chart: DebtToAssetsRatioChart,
      color: chartsConfig.debtToAssetsRatio.color
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 2, group:`` }));
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