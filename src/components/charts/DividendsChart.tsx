import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Legend } from '@/src/interfaces/Dividends';

const DividendsChart = ({ data, color, toolip } : {data: Legend[]; color: string; toolip: string;}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Chuyển đổi dữ liệu nhận được thành các giá trị phù hợp cho chart
  const years = data.map(item => item.year.toString());
  const freeCashFlowData = data.map(item => item.value);

  // Cấu hình chart và data
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 250,
    },
    title: {
      text: '',
      style: {
        color: '#fff',
      },
    },
    xAxis: {
      categories: years,
      labels: {
        style: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
        style: {
          color: '#fff',
        },
      },
      labels: {
        style: {
          color: '#fff',
        },
      },
      gridLineDashStyle: 'Dot',
      gridLineColor: '#2B3139',
      gridLineWidth: 2,
      tickAmount: 4,
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
        name: toolip,
        data: freeCashFlowData,
        type: 'column',
        color: color,
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

export default DividendsChart;