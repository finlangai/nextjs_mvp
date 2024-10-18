import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading, resetForecastingCriteria } from "@/src/redux/ForecastingCriteria";
import { selectForecastingToggleByGroup } from '@/src/redux/ForecastingToggle';
import { selectSelectedButton } from '@/src/redux/ForecastingPage';

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
  const selectedButton = useAppSelector(selectSelectedButton);
  const forecastingToggleByGroup = useAppSelector(selectForecastingToggleByGroup(selectedButton - 1));

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

  const fetchDataForGroup = (metric:number) => {
    dispatch(fetchForecastingCriteria({ symbol, type: 1, group: metric }));
  };

  const fetchAllData = () => {
    dispatch(fetchForecastingCriteria({ symbol, type: 1 }));
  };

  useEffect(() => {
    const metrics = forecastingToggleByGroup?.metrics;

    // Nếu đã fetch thì không gọi lại
    if (hasFetched.current) return;

    // Reset dữ liệu trước khi fetch mới
    dispatch(resetForecastingCriteria());

    if (Array.isArray(metrics) && metrics.length > 0) {
      const sortedMetrics = [...metrics].sort((a, b) => a - b);
      sortedMetrics.forEach(fetchDataForGroup);
    } else {
      fetchAllData();
    }

    // Đánh dấu đã fetch xong
    hasFetched.current = true;
  }, [dispatch, symbol, forecastingToggleByGroup]);

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
      symbol={symbol}
    />
  );
}