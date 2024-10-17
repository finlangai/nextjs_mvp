import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";

import ROIChart from '../../charts/forecasting/ROIChart';
import MarginalProfitChart from "../../charts/forecasting/MarginalProfitChart";
import EPSChart from "../../charts/forecasting/EPSChart";
import ROSChart from "../../charts/forecasting/ROSChart";
import ForecastingContent from './ForecastingContent ';

import { BarsLoader } from '../../common/Loader';
import { ChartConfig } from '@/src/interfaces/Chart';

export default function Profitability({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  const configChart: ChartConfig[] = [
    {
      n: "Hiệu quả sinh lời dựa trên vốn",
      chart: ROIChart,
      color: chartsConfig.roi.color
    },
    {
      n: "Biên lợi nhuận",
      chart: MarginalProfitChart,
      color: chartsConfig.marginalProfit.color
    },
    {
      n: "Tỷ suất lợi nhuận trên doanh thu",
      chart: ROSChart,
      color: chartsConfig.ros.color
    },
    {
      n: "Lợi nhuận trên mỗi cổ phần",
      chart: EPSChart,
      color: chartsConfig.eps.color
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 1, group:`` }));
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