import { useEffect, useState, useRef } from 'react';
import VN30Summary from "./VN30Summary";
import { PriceStockNoVolume } from '@/src/interfaces/PriceStock';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchPriceStocksNoVolume, selectPriceStocksNovolume } from '@/src/redux/PriceStock';
import { getStartOfYear, getCurrentUnixTimestamp } from '@/src/utils/getTimeRanges';
import TimeRangeButtons from '../../common/TimeRangeButtons';
import { selectTickerListOverviewData, selectTickerListOverviewLoading } from '@/src/redux/TickerListOverview';
import { SpinerLoader } from '../../common/Loader';
import dynamic from 'next/dynamic';

const MarketIndicatorChart = dynamic(() => import('@/src/components/charts/MarketIndicatorChart/MarketIndicatorChartComponent'), {
  ssr: false,
});

export default function SectionMarketOverview() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const selectData = useAppSelector(selectPriceStocksNovolume);
  const [data, setStockData] = useState<PriceStockNoVolume[]>([]);

  const selectDataOverview = useAppSelector(selectTickerListOverviewData);
  const selectOverviewLoading = useAppSelector(selectTickerListOverviewLoading);

  useEffect(() => {
    const fetchInitialData = async () => {
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear();
      const symbol = "VN30";
      await dispatch(fetchPriceStocksNoVolume({ symbol, start, end: now, interval: '1D', type: 2, limit: 500 }));
    };
    if (!hasFetched.current) {
      fetchInitialData();
      hasFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    setStockData(selectData);
  }, [selectData]);


  return (
    <>
      <div>
        <div className='flex items-center pb-[20px] border-b border-b-fintown-br mb-[42px]'>
          <div className='flex items-center mr-[24px] border-r border-r-fintown-br pr-[20px]'>
            <div className='border border-fintown-br rounded-[50%] w-[30px] h-[30px] flex items-center justify-center mr-[10px] bg-fintown-txt-1'>
              <i className='bx bxs-star text-fintown-txt-2 text-[20px]' ></i>
            </div>

            <div className='text-fintown-txt-1 text-[16px] font-bold'>
              VN30
            </div>
          </div>

          {/* <div className='flex items-center text-[14px] text-fintown-txt-2 gap-x-[22px] font-[500]'>
            <button className='hover:text-fintown-pr9'>1D</button>
            <button className='hover:text-fintown-pr9'>3M</button>
            <button className='hover:text-fintown-pr9'>1Y</button>
            <button className='text-fintown-pr9 hover:text-fintown-pr9'>YTD</button>
          </div> */}

          < TimeRangeButtons symbol='VN30' />
          {
            !selectOverviewLoading ? (
              <div className="flex items-center ml-auto">
                <p className="text-fintown-txt-1 font-bold text-[24px] mr-[10px]">
                  {selectDataOverview?.vn30LastClosed}
                </p>
                <div
                  className={`flex items-center py-[4px] px-[8px] text-[14px] rounded-[4px] w-max text-white mr-[10px] ${selectDataOverview?.vn30DeltaPercent === undefined
                    ? 'bg-fintown-stt-hold'   // Nếu delta là undefined, mặc định là hold
                    : selectDataOverview?.vn30DeltaPercent < 0
                      ? 'bg-fintown-stt-sell'   // Nếu delta < 0 thì background màu sell
                      : selectDataOverview?.vn30DeltaPercent > 0
                        ? 'bg-fintown-stt-buy'    // Nếu delta > 0 thì background màu buy
                        : 'bg-fintown-stt-hold'   // Nếu delta = 0 thì background màu hold
                    }`}
                >
                  <i
                    className={`bx ${selectDataOverview?.vn30DeltaPercent === undefined
                      ? ''                       // Không hiện icon nếu delta là undefined
                      : selectDataOverview?.vn30DeltaPercent < 0
                        ? 'bx-caret-down'          // Icon mũi tên xuống nếu delta < 0
                        : 'bx-caret-up'            // Icon mũi tên lên nếu delta > 0
                      } text-fintown-txt-1 text-sx mr-[5px]`}
                  ></i>
                  <span>
                    {
                      selectDataOverview?.vn30DeltaPercent === 0 ? "0.00" : selectDataOverview?.vn30DeltaPercent
                    }

                  </span>
                  <span>%</span>
                </div>
                <div
                  className={`flex items-center py-[4px] px-[8px] text-[14px] rounded-[4px] w-max text-white ${selectDataOverview?.vn30DeltaValue === undefined
                    ? 'bg-fintown-stt-hold'
                    : selectDataOverview?.vn30DeltaValue < 0
                      ? 'bg-fintown-stt-sell'
                      : selectDataOverview?.vn30DeltaValue > 0
                        ? 'bg-fintown-stt-buy'
                        : 'bg-fintown-stt-hold'
                    }`}
                >
                  <span>
                    {
                      selectDataOverview?.vn30DeltaValue === 0 ? "0.00" : selectDataOverview?.vn30DeltaValue
                    }

                  </span>
                </div>
              </div>
            ) : (
              <div className='ml-auto'>
                < SpinerLoader />
              </div>
            )
          }
        </div>
        <div className='pb-[38px] mb-[24px] border-b border-b-fintown-br'>
          <MarketIndicatorChart data={data} />
        </div>
        < VN30Summary />
      </div>
    </>
  )
}