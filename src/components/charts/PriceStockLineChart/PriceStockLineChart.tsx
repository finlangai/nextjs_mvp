import { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PriceStockNoVolume } from '@/src/interfaces/PriceStock';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchPriceStocksNoVolume, selectPriceStocksNovolume, selectPriceStocksLoading } from '@/src/redux/PriceStock';
import { configureHighchartsLanguage } from '../../../utils/highchartsLanguageConfig';
import { getChartOptions } from './chartOptions';
import HC_more from 'highcharts/highcharts-more';
import { BarsLoader } from '../../common/Loader';
import { getStartOfYear, getCurrentUnixTimestamp} from '@/src/utils/getTimeRanges';
import { selectDarkMode } from '@/src/redux/darkmode';

HC_more(Highcharts);
configureHighchartsLanguage();

const PriceStockLineChart = ({symbol}: {symbol: string}) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectPriceStocks = useAppSelector(selectPriceStocksNovolume);
  const [data, setStockData] = useState<PriceStockNoVolume[]>([]);
  const selectsLoading = useAppSelector(selectPriceStocksLoading);
  // LẦN ĐẦU CALL API LẤY YTD
  useEffect(() => {
    const fetchInitialData = async () => {
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear(); 
      await dispatch(fetchPriceStocksNoVolume({ symbol, start, end: now, interval: '1D', type: 2, limit: 500 }));
    };
    fetchInitialData(); 
  }, [dispatch, symbol]);
  
  useEffect(() => {
    setStockData(selectPriceStocks);
  }, [selectPriceStocks]);

  if (selectsLoading) {
    return (
      <div className='w-full flex justify-center items-center h-[576px]'>
        <BarsLoader/>
      </div>
    );
  }

  return (
    <div ref={chartContainerRef} style={{ cursor: 'crosshair' }}>
      <HighchartsReact 
        highcharts={Highcharts} 
        options={getChartOptions(data, isDarkMode)}
        ref={chartRef}
      />
    </div>
  );
};

export default PriceStockLineChart;