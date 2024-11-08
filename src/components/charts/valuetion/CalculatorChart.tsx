// CalculatorChart.tsx
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CalculatorChart: React.FC = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Cấu hình chart và data
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 150
    },
    title: {
      text: '',
      style: {
        color: '#fff',
      },
    },
    xAxis: {
      categories: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
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
      gridLineColor: '#2B3139',
      tickAmount: 3,
    },
    legend: {
        enabled: false, // Ẩn legend
      },
    credits: {
        enabled: false
    },
    series: [
      {
        name: '',
        data: [100, 200, 150, 300, 250, 200, 180],
        type: 'column',
        color: '#00FF88',
        borderWidth: 0
        // Màu của cột
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

export default CalculatorChart;
