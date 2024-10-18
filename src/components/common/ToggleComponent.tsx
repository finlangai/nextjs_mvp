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

  useEffect(() => {
    setIsActive(Array.isArray(metrics) && metrics.includes(index));
  }, [metrics, index]);

  const fetchDataForGroup = useCallback((metric: number) => {
    dispatch(fetchForecastingCriteria({ symbol, type: 1, group: metric }));
  }, [dispatch, symbol]);

  const handleToggle = useCallback(() => {
    const group = selectedButton - 1;
    
    if (isActive) {
      if (metrics && metrics.length === 1) {
        return; // Prevent deactivating the last active metric
      }
      dispatch(removeMetric({ group, metric: index }));
    } else {
      dispatch(addMetric({ group, metric: index }));
      // Fetch data only when activating the toggle
      fetchDataForGroup(index);
    }
    
    setIsActive(!isActive);
  }, [isActive, metrics, selectedButton, dispatch, index, fetchDataForGroup]);

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