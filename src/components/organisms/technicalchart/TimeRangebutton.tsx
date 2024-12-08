import React, { useState, useRef, useEffect } from 'react';
import { fetchPriceStocks } from '@/src/redux/PriceStock';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { getStartOfYear, getCurrentUnixTimestamp, getTimeRanges  } from '@/src/utils/getTimeRanges';
import { TimeRange } from '@/src/interfaces/PriceStock';

export default function TimeRangeButton({ symbol }: { symbol: string }) {
    const dispatch = useAppDispatch();

    const hasFetched = useRef(false);

    // Quản lý trạng thái active cho nút
    const [activeButton, setActiveButton] = useState('YTD');

    // Lấy danh sách time ranges
    const timeRanges = getTimeRanges();

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            const fetchInitialData = async () => {
                const now = getCurrentUnixTimestamp();
                const start = getStartOfYear(); 
                dispatch(fetchPriceStocks({ symbol, start, end: now, interval: '1D', type: 1, limit: 500 }));
            };
            fetchInitialData();        
            hasFetched.current = true;
        }
    }, [dispatch]);

    // Logic gọi API dựa trên nút được bấm
    const handleButtonClick = (range: TimeRange) => {
        setActiveButton(range.label);
        dispatch(fetchPriceStocks({ 
            symbol: symbol, 
            start: range?.start, 
            end: range?.end, 
            interval: range?.interval, 
            type: 1, 
            limit: range?.limit 
        }));
    };

    return (
        <>
          <div className="px-[24px] flex items-center gap-x-[28px] py-[18px] w-full border-r border-r-fintown-br dark:border-r-fintown-br-light">
            {timeRanges.map((range) => (
              <button
                key={range.label}
                className={`text-[12px] font-bold ${
                  activeButton === range.label ? 'text-fintown-pr9' : 'text-fintown-txt-2'
                }`}
                onClick={() => handleButtonClick(range)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </>
    );
}
