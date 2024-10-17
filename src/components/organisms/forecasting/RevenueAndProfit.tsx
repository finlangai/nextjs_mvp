import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";
import RevenueGrowthRateChart from "../../charts/forecasting/RevenueGrowthRateChart";
import ProfitGrowthRateChart from "../../charts/forecasting/ProfitGrowthRateChart";
import EBITDAGrowthRateChart from "../../charts/forecasting/EBITDAGrowthRateChart";
import EPSGrowthChart from "../../charts/forecasting/EPSGrowthChart";
import { BarsLoader } from '../../common/Loader';
import { ChartConfig } from '@/src/interfaces/Chart';
import ForecastingContent from './ForecastingContent ';

export default function RevenueAndProfit({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  const configChart: ChartConfig[] = [
    {
      n: "Tăng trưởng doanh thu",
      chart: RevenueGrowthRateChart,
      color: chartsConfig.revenueGrowthRate.color
    },
    {
      n: "Tăng trưởng lợi nhuận",
      chart: ProfitGrowthRateChart,
      color: chartsConfig.profitGrowthRate.color
    },
    {
      n: "Tăng trưởng lợi nhuận trước lãi vay, thuế và khấu hao",
      chart: EBITDAGrowthRateChart,
      color: chartsConfig.eBITDAGrowthRate.color
    },
    {
      n: "Tăng trưởng lợi nhuận trên mỗi cổ phần",
      chart: EPSGrowthChart,
      color: chartsConfig.GePSGrowth.color
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 3, group:`` }));
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