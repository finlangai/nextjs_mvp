import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, resetForecastingCriteria } from "@/src/redux/ForecastingCriteria";
import { selectForecastingToggleByGroup, updateMetrics } from '@/src/redux/ForecastingToggle';
import { selectSelectedButton } from '@/src/redux/ForecastingPage';
import ForecastingContent from './ForecastingContent ';
import { getConfigCharts } from '../../charts/forecasting/chartConfig';

export default function PaymentCapacity({ symbol }: { symbol: string }) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const selectedButton = useAppSelector(selectSelectedButton);
  const forecastingToggleByGroup = useAppSelector(selectForecastingToggleByGroup(selectedButton - 1));
  const chartsConfig = useAppSelector(state => state.forecastingcharts); // Sử dụng hook để lấy chartsConfig
  const configChart = getConfigCharts(chartsConfig)[selectedButton - 1]; // Truyền chartsConfig vào hàm

  const fetchDataForGroup = (metric: number) => {
    dispatch(fetchForecastingCriteria({ symbol, type: selectedButton, group: metric }));
  };

  const fetchAllData = () => {
    dispatch(fetchForecastingCriteria({ symbol, type: selectedButton }));
  };

  const createMetrics = (configChart: any[]): number[] => {
    return Array.from({ length: configChart.length }, (_, index) => index);
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
      const arr = createMetrics(configChart)
      dispatch(updateMetrics({ group: selectedButton - 1, metrics: arr }));
    }

    // Đánh dấu đã fetch xong
    hasFetched.current = true;
  }, [dispatch, symbol, forecastingToggleByGroup, selectedButton]);

  return (
    <ForecastingContent 
      configChart={configChart}
      symbol={symbol}
    />
  );
}
