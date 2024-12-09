import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FcfForecasts } from '@/src/interfaces/ValuationParams';
import { selectDarkMode } from '@/src/redux/darkmode';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

const FreeCashFlowChart = ({ data } : {data: FcfForecasts[]}) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Chuyển đổi dữ liệu nhận được thành các giá trị phù hợp cho chart
  const years = data.map(item => item.year.toString());
  const freeCashFlowData = data.map(item => item.free_cash_flow);

  // Cấu hình chart và data
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 150,
    },
    title: {
      text: '',
      style: {
        color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
      },
    },
    xAxis: {
      categories: years,
      labels: {
        style: {
          color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
        },
      },
    },
    yAxis: {
      title: {
        text: '',
        style: {
          color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
        },
      },
      labels: {
        style: {
          color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
        },
      },
      gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,      
      tickAmount: 3,
      // type: 'logarithmic', // Sử dụng scale logarithmic
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Free Cash Flow',
        data: freeCashFlowData,
        type: 'column',
        color: '#00FF88',
        borderWidth: 0,
      },
    ],
  };

  // Hàm tự động cập nhật kích thước biểu đồ khi container thay đổi
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.reflow();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        containerProps={{ style: { width: '100%', height: '100%' } }}
      />
    </div>
  );
};

export default FreeCashFlowChart;
