"use client";
import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import PriceStockLineChart from "@/src/components/charts/PriceStockLineChart";
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';
import PriceInsights from '@/src/components/organisms/PriceInsights';
import TimeRangeButtons from '@/src/components/common/TimeRangeButtons';
import { fetchPriceStocks, selectPriceStocksData } from '@/src/redux/PriceStock';
import { PriceStock } from '@/src/interfaces/PriceStock';
import { TimeRange } from '@/src/interfaces/PriceStock';

import SectionCard from '@/src/components/organisms/SectionCard';

export default function ChiSoKyThuatPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const dispatch = useAppDispatch();
  const selectPriceStocks = useAppSelector(selectPriceStocksData);

  useSetSelectedButtonSiderBar(3);
  useSetSelectedButtonStockPage(0);

  const [stockData, setStockData] = useState<PriceStock[]>([]);

  const handleTimeRangeChange = async (timeRange: TimeRange) => {
    // console.log(`Fetching data from ${timeRange.start} to ${timeRange.end} with interval ${timeRange.interval}`);
    const type = 1;
    await dispatch(fetchPriceStocks({ symbol, start: timeRange.start, end: timeRange.end, interval: timeRange.interval, type, limit: timeRange.limit}));
  };

  // Gọi API fetch data khi lần đầu tiên component được render
  useEffect(() => {
    const getStartOfYear = () => {
      const date = new Date();
      date.setMonth(0);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return Math.floor(date.getTime() / 1000);
    };

    const fetchInitialData = async () => {
      const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear(); 
      const interval = '1D';
      const type = 1;
      const limit = 500;
      await dispatch(fetchPriceStocks({ symbol, start, end: now, interval, type, limit }));
    };

    fetchInitialData(); 
  }, [dispatch, symbol]);

  useEffect(() => {
    setStockData(selectPriceStocks);
  }, [selectPriceStocks]);

  return (
    <>
      <div className="text-[24px] font-bold text-fintown-txt-1 mb-[40px] px-[40px]">
        Biểu đồ giá lịch sử
      </div>
      
      <div className="flex px-[40px] mb-[140px]">
        <div className="pr-[40px] w-full h-full">
          <div className="flex items-center mb-[40px]">
            <TimeRangeButtons onTimeRangeChange={handleTimeRangeChange} />
            <div className="ml-auto">
              <button className="py-[8px] px-[8px] bg-fintown-btn-disable rounded-[4px] flex items-center justify-center">
                <i className='bx bx-expand text-fintown-txt-1 text-[24px]'></i>
              </button>
            </div>
          </div>
          
          <div>
            <PriceStockLineChart data={stockData}/>
          </div>
        </div>
        
        <div className="w-full max-w-[436px]">
          <PriceInsights symbol={symbol}/>
        </div>
      </div>
      
      <div className="overflow-hidden  mb-[106px]">
        <div className="text-[24px] font-bold text-fintown-txt-1 px-[40px] mb-[35px]">
          Cổ phiếu cùng ngành
        </div>
        < SectionCard  endpoint={"industry"} />
      </div>
      
      <div className="overflow-hidden  mb-[106px]">
        <div className="text-[24px] font-bold text-fintown-txt-1 px-[40px] mb-[35px]">
          Top tăng giá mạnh nhất
        </div>
        < SectionCard endpoint={"top-gainer"} />
      </div>
      
    </>
  );
}