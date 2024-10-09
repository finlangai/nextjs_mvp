import { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PriceStock } from '@/src/interfaces/PriceStock';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchPriceStocks, selectPriceStocksData } from '@/src/redux/PriceStock';
import { configureHighchartsLanguage } from './highchartsLanguageConfig';
import { getChartOptions } from './chartOptions';
import HC_more from 'highcharts/highcharts-more';
import { BarsLoader } from '../../common/Loader';
import { getStartOfYear, getCurrentUnixTimestamp} from './getTimeRanges';

HC_more(Highcharts);
configureHighchartsLanguage();

const PriceStockLineChart = ({symbol}: {symbol: string}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectPriceStocks = useAppSelector(selectPriceStocksData);
  const [data, setStockData] = useState<PriceStock[]>([]);

  // LẦN ĐẦU CALL API LẤY YTD
  useEffect(() => {
    const fetchInitialData = async () => {
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear(); 
      await dispatch(fetchPriceStocks({ symbol, start, end: now, interval: '1D', type: 1, limit: 500 }));
    };
    fetchInitialData(); 
  }, [dispatch, symbol]);
  
  useEffect(() => {
    setStockData(selectPriceStocks);
  }, [selectPriceStocks]);

  if (data.length === 0) {
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
        options={getChartOptions(data)}
        ref={chartRef}
      />
    </div>
  );
};

export default PriceStockLineChart;