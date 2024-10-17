import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";
import AssetGrowthRateChart from "../../charts/forecasting/AssetGrowthRateChart";
import EquityGrowthRateChart from "../../charts/forecasting/EquityGrowthRateChart";
import ReturnOnAssetsGrowthRateChart from "../../charts/forecasting/ReturnOnAssetsGrowthRateChart";
import ForecastingContent from './ForecastingContent ';
import { BarsLoader } from '../../common/Loader';
import { ChartConfig } from '@/src/interfaces/Chart';

export default function AssetsAndEquity({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  const configChart: ChartConfig[] = [
    {
      n: "Tỷ lệ tăng trưởng tài sản",
      chart: AssetGrowthRateChart,
      color: chartsConfig.assetGrowthRate.color
    },
    {
      n: "Tỷ lệ tăng trưởng vốn chủ sở hữu",
      chart: EquityGrowthRateChart,
      color: chartsConfig.equityGrowthRate.color
    },
    {
      n: "Tỷ lệ tăng trưởng lợi nhuận trên tổng tài sản",
      chart: ReturnOnAssetsGrowthRateChart,
      color: chartsConfig.returnOnAssetsGrowthRate.color
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 5, group:`` }));
      hasFetched.current = true;
    }
  }, [dispatch, symbol]);

  // RENDER
  if (forecastingCriteriaLoading) {
    return (
      <div className='flex w-full justify-center items-center h-[428px]'>
        < BarsLoader/>
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