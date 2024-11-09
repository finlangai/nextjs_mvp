import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import { useEffect, useState, useRef } from 'react';
import { PriceStockNoVolume } from '@/src/interfaces/PriceStock';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchPriceStocksNoVolume, selectPriceStocksNovolume, selectPriceStocksLoading } from '@/src/redux/PriceStock';
import { getStartOfYear, getCurrentUnixTimestamp } from '@/src/utils/getTimeRanges';
import { SpinerLoader } from '../../common/Loader';
import { configureHighchartsLanguage } from '@/src/utils/highchartsLanguageConfig';
import { getChartOptions } from './chartOptions';

HC_more(Highcharts);
configureHighchartsLanguage();

const MarketIndicatorChart = () => {
  const dispatch = useAppDispatch();
  const [chartOptions, setChartOptions] = useState<any>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectData = useAppSelector(selectPriceStocksNovolume);
  const selectLoading = useAppSelector(selectPriceStocksLoading);
  const [data, setStockData] = useState<PriceStockNoVolume[]>([]);

  // LẦN ĐẦU CALL API LẤY YTD
  useEffect(() => {
    const fetchInitialData = async () => {
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear();
      const symbol = "VN30";
      await dispatch(fetchPriceStocksNoVolume({ symbol, start, end: now, interval: '1D', type: 2, limit: 90 }));
    };
    fetchInitialData();
  }, [dispatch]);

  useEffect(() => {
    setStockData(selectData);
  }, [selectData]);

  if (data.length === 0) {
    return (
      <div className='w-full flex justify-center items-center h-[576px]'>
        <SpinerLoader/>
      </div>
    );
  }
  return (
    <>
      <div ref={chartContainerRef} style={{ cursor: 'crosshair' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={getChartOptions(data)}
          ref={chartRef}
        />
      </div>

    </>
  );
};

export default MarketIndicatorChart;
