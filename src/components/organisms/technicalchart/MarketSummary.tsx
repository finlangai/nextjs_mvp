import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { TechnicalChartOverview } from '@/src/interfaces/TechnicalChartOverview';
import { fetchTechnicalChartOverview, selectTechnicalChartOverviewData, selectTechnicalChartOverviewLoading } from '@/src/redux/TechnicalChartOverview';
import { SpinerLoader } from '../../common/Loader';

const MarketSummary = () => {
  const dispatch = useAppDispatch();
  const selectData = useAppSelector(selectTechnicalChartOverviewData);
  const selectLoading = useAppSelector(selectTechnicalChartOverviewLoading);
  const [NowData, setNowData] = useState<TechnicalChartOverview | null>(null);
  const hasFetched = useRef(false);

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchTechnicalChartOverview());
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Lưu data đã fetch
  useEffect(() => {
    if (selectData !== null) {
      setNowData(selectData);
    }
  }, [selectData]);

  if (selectLoading) {
    return (
      <>
        <div className="flex items-center gap-x-[30px] justify-center w-[40%]">
          < SpinerLoader />
        </div>
      </>
    )
  }

  return (
    <div className="flex items-center gap-x-[30px]">
      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Số lượng cổ phiếu:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          {NowData?.totalTickers.toLocaleString('en-US')}
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Vốn hóa:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          {NowData?.totalMarketCap.toLocaleString('en-US')}Tỷ
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Tổng KLGD 24h:
        </div>
        <div className="text-fintown-txt-1 text-[14px]">
          {NowData?.totalTradingVolume.toLocaleString('en-US')}
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-[5px] text-fintown-txt-2 text-[14px]">
          Tăng giá mạnh nhất 24h:
        </div>
        <div className="text-fintown-txt-1 text-[14px] mr-[5px]">
          {NowData?.highestDeltaSymbol}
        </div>
        <div className="mr-[5px]">
          <i
            className={`font-bold text-[14px]  ${NowData?.highestDeltaPercent !== undefined
                ? NowData.highestDeltaPercent > 0
                  ? 'bx bx-caret-up text-fintown-stt-buy'
                  : NowData.highestDeltaPercent < 0
                    ? 'bx bx-caret-down text-fintown-stt-sell'
                    : 'hidden'
                : 'hidden'
              }`}></i>
        </div>
        <div
          className={`font-bold text-[14px] mr-[5px] ${NowData?.highestDeltaPercent !== undefined
              ? NowData.highestDeltaPercent > 0
                ? 'text-fintown-stt-buy'
                : NowData.highestDeltaPercent < 0
                  ? 'text-fintown-stt-sell'
                  : 'text-fintown-txt-1'
              : 'text-fintown-txt-1'
            }`}
        >
          {NowData?.highestDeltaPercent}%
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
