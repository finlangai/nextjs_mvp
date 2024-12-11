import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { priceInsights } from '@/src/interfaces/PriceInsights';
import { fetchpriceInsights, selectpriceInsightsData, selectpriceInsightsError, selectpriceInsightsLoading } from '@/src/redux/PriceInsights';
import { BarsLoader } from '../../common/Loader';

export default function PriceInsights({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const [stockData, setStockData] = useState<priceInsights | null>(null);
    const selectpriceInsights = useAppSelector(selectpriceInsightsData);

    useEffect(() => {
      dispatch(fetchpriceInsights({symbol}));
    }, [symbol]);

    useEffect(() => {
      if (selectpriceInsights !== null) {
        setStockData(selectpriceInsights);
      }
    }, [selectpriceInsights]);

    if (stockData === null) {
      return (
        <>
        <div className='w-full flex justify-center items-center h-[576px]'>
          < BarsLoader/>
        </div>
        </>
      )
    }

    return(
        <>
        <div className="px-[24px] py-[28px] bg-fintown-bg-stn dark:bg-fintown-bg-stn-light rounded-[16px] border border-fintown-br dark:border-fintown-br-light">
            <div className="text-[24px] font-bold mb-[28px] text-fintown-txt-1 dark:text-fintown-txt-1-light">Sự biến động</div>
            <div>

            <div className="text-[16px] font-bold text-fintown-txt-1 dark:text-fintown-txt-1-light pb-[21px] border-b border-fintown-lnr-1 dark:border-fintown-br-light">Chỉ số kỹ thuật</div>

            <div className="py-[15px] border-b border-fintown-br dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 52 tuần
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.avg52Week.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 200 ngày
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.avg200day.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 150 ngày
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.avg150day.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Trung bình động 24 ngày
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
               {stockData?.avg24day.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Phạm vi trong ngày
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.low.toLocaleString('en-US')} - {stockData?.high.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá mở cửa
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.open.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá đóng cửa
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.close.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] border-b border-fintown-lnr-1 dark:border-fintown-br-light flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Giá kết phiên trước
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.previousClosingPrice.toLocaleString('en-US')}
              </div>
            </div>

            <div className="py-[15px] flex items-center justify-between">
              <div className="text-fintown-txt-2 text-sm font-bold">
                Tổng khối lượng
              </div>
              <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-sm font-bold">
                {stockData?.volume.toLocaleString('en-US')}
              </div>
            </div>
          </div>
        </div>
        </>
    )
}