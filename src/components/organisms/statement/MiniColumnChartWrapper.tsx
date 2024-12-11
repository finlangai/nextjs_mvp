import React, { useEffect, useRef } from 'react';
import { Value as ValueStatement } from '@/src/interfaces/FinancialStatement';
import { Value as ValueMetric } from '@/src/interfaces/FinancialMetric';

interface MiniColumnChartProps {
  data: ValueStatement[] | ValueMetric[];
}

const MiniColumnChart = ({ data }: MiniColumnChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      createBarChart(data);
    }
  }, [data]);

  const createBarChart = (chartData: ValueStatement[] | ValueMetric[]) => {
    const chartContainer = chartRef.current;
    if (!chartContainer || !chartData || chartData.length === 0) return;
  
    chartContainer.innerHTML = ''; // Xóa nội dung cũ

    // Chuyển đổi dữ liệu
    const numericData = chartData
      .map(item => {
        const value = item.value;
        return typeof value === 'string' ? parseFloat(value) : (typeof value === 'number' ? value : 0);
      })
      .filter(value => !isNaN(value));
  
    const maxValue = Math.max(...numericData.map(Math.abs));
  
    numericData.forEach((value) => {
      const bar = document.createElement('div');
      const height = (Math.abs(value) / maxValue) * 100;
  
      // Nếu giá trị âm, đặt height âm
      if (value < 0) {
        bar.style.height = `${height}%`;
        bar.style.marginBottom = `${(100 - height)}%`; // Đẩy xuống để hiển thị đúng chiều
      } else {
        bar.style.height = `${height}%`;
        bar.style.marginBottom = '0'; // Cột dương không cần đẩy
      }
  
      Object.assign(bar.style, {
        width: '4px',
        backgroundColor: value < 0 ? '#e74c3c' : '#3498db',
        margin: '0 1px',
        transition: 'height 0.5s ease-in-out',
        position: 'relative',
        bottom: value < 0 ? `-${height}%` : '0',
      });
  
      chartContainer.appendChild(bar);
    });
  };
  
  return (
    <>
      <div
        ref={chartRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'end',
          height: '16px',
          width: '100px',
          padding: '2px',
          marginBottom:"5px",
          boxSizing: 'border-box',
        }}
      ></div>  
    </>
  );
};

export default MiniColumnChart;
