import dynamic from 'next/dynamic';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import { useRef } from 'react';
import { configureHighchartsLanguage } from '@/src/utils/highchartsLanguageConfig';
import { getChartOptions } from './chartOptions';

import { SpinerLoader } from '../../common/Loader';
import { PriceStockNoVolume } from '@/src/interfaces/PriceStock';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectPriceStocksLoading } from '@/src/redux/PriceStock';

const MarketIndicatorChart = dynamic(() => {
  return import('./MarketIndicatorChartComponent').then(mod => mod.default);
}, {
  ssr: false, // Tắt SSR cho component này
});

HC_more(Highcharts);
configureHighchartsLanguage();

const MarketIndicatorChartComponent  = ({data} : {data: PriceStockNoVolume[]}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const selectLoading = useAppSelector(selectPriceStocksLoading);

  if (selectLoading) {
    return (
      <div className='w-full flex justify-center items-center h-[576px]'>
        <SpinerLoader/>
      </div>
    );
  };

  return (
      <div ref={chartContainerRef} >
        <HighchartsReact
          highcharts={Highcharts}
          options={getChartOptions(data)}
          ref={chartRef}
        />
      </div>
  );
};

export default MarketIndicatorChartComponent ;
