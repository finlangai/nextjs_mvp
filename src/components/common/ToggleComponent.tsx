import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import {
  selectForecastingToggleByGroup,
  addMetric,
  removeMetric
} from '@/src/redux/ForecastingToggle';
import { selectSelectedButton } from '@/src/redux/ForecastingPage';
import {
  fetchForecastingCriteria,
  resetForecastingCriteria
} from "@/src/redux/ForecastingCriteria";

export default function ToggleComponent({ index, symbol }: { index: number; symbol: string }) {
  const dispatch = useAppDispatch();
  const selectedButton = useAppSelector(selectSelectedButton);
  const forecastingToggleByGroup = useAppSelector(selectForecastingToggleByGroup(selectedButton - 1));
  const metrics = forecastingToggleByGroup?.metrics;
  const [isActive, setIsActive] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    setIsActive(Array.isArray(metrics) && metrics.includes(index));
  }, [metrics, index]);

  useEffect(() =>{
    if (fetch) {
      if (Array.isArray(metrics) && metrics.length > 0) {
        dispatch(resetForecastingCriteria());
        const sortedMetrics = [...metrics].sort((a, b) => a - b);
        sortedMetrics.forEach(fetchDataForGroup);
      }
    }
    setFetch(false);
  }, [fetch])

  const fetchDataForGroup = (metric:number) => {
    return dispatch(fetchForecastingCriteria({ symbol, type: 1, group: metric }));
  };

  const handleToggle = () => {
    const metrics = forecastingToggleByGroup?.metrics;
    const group = selectedButton - 1;
    console.log("Nhóm:", metrics)
    
    if (isActive) {
      if (metrics && metrics.length === 1) {
        return;
      }
      // Kiểm tra nếu phần tử tồn tại trong metrics
      if (metrics && metrics.includes(index)) {
        dispatch(removeMetric({ group, metric: index }));
        setFetch(true);
      }
    } else {
      if (metrics && !metrics.includes(index)) {
        dispatch(addMetric({ group, metric: index }));
        setFetch(true);
      }
    }
    setIsActive(!isActive);
  };

  return (
    <div
      className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer overflow-hidden"
      onClick={handleToggle}
    >
      <div
        className={`w-[22px] h-[22px] rounded transition-all duration-300 ${
          isActive ? 'bg-fintown-pr9 translate-x-0' : 'bg-gray-300 translate-x-[23px]'
        }`}
      ></div>
    </div>
  );
}