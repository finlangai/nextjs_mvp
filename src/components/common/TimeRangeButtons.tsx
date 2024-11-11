import React, { useState } from 'react';
import { TimeRange } from '@/src/interfaces/PriceStock';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { fetchPriceStocksNoVolume } from '@/src/redux/PriceStock';
import { getTimeRanges } from '@/src/utils/getTimeRanges';

export default function TimeRangeButtons({symbol} : {symbol: string}) {
  const [timeRanges] = useState(getTimeRanges());
  const [activeTimeRange, setActiveTimeRange] = useState(timeRanges[4]); 
  const dispatch = useAppDispatch();

  const handleTimeRangeClick = async (timeRange: TimeRange) => {
    const type = 2;
    await dispatch(fetchPriceStocksNoVolume({ symbol, start: timeRange.start, end: timeRange.end, interval: timeRange.interval, type, limit: timeRange.limit }));
    setActiveTimeRange(timeRange);
  };

  return (
    <div className="flex items-center gap-x-[12px] py-[5px] w-max rounded-[8px]">
      {timeRanges.map((timeRange) => (
        <button
          key={timeRange.label}
          onClick={() => handleTimeRangeClick(timeRange)}
          className={`text-sm h-[30px] rounded px-[8px] w-max ${
            activeTimeRange?.label === timeRange.label
              ? 'text-fintown-txt-1 bg-fintown-btn-active-1'
              : 'text-fintown-txt-2'
          } ${timeRange.label !== 'all' ? 'w-[30px] ' : ''}`}
        >
          {timeRange.label}
        </button>
      ))}
    </div>
  );
}