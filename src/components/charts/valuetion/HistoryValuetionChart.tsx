import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getPotentialClass } from '@/src/utils/getPotentialClass';
import { Scenarios } from '@/src/interfaces/Scenarios';
import { selectProfileSummaryClosePrice } from '@/src/redux/ProfileSummary';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

const HistoryValuetionChart = ({ data }: { data: Scenarios | undefined }) => {
  const selectPrice = useAppSelector(selectProfileSummaryClosePrice) ?? 0;

  // Tính toán min và max cho trục y
  const chartValues = [selectPrice, data?.valuated || 0, data?.actual || 0];
  const minValue = Math.min(...chartValues);
  const maxValue = Math.max(...chartValues);
  const padding = 10; // Khoảng đệm cho trục y
  const calculatedMin = minValue - padding;
  const calculatedMax = maxValue + padding;

  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'none',
      height: 250,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [data?.createdAt, data?.expectedDate],
      labels: {
        style: {
          color: '#ffffff',
        },
      },
      gridLineColor: '#2B3139',
    },
    yAxis: {
      tickAmount: 5,
      min: calculatedMin,
      max: calculatedMax,
      gridLineColor: '#2B3139',
      title: {
        text: null,
      },
      labels: {
        style: {
          color: '#ffffff',
        },
      },
      plotLines: [
        {
          color: '#66b2ff',
          value: selectPrice,
          width: 2,
          dashStyle: 'Dash',
          zIndex: 5,
          label: {
            text: `<div style="background-color: blue; color: #ffffff; padding: 5px 10px; border-radius: 5px;">${selectPrice?.toLocaleString('en-US')}</div>`,
            useHTML: true,
            align: 'right',
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
            },
          },
        },
      ],
    },
    series: [
      {
        name: '',
        data: [
          {
            y: data?.actual,
            color: 'white',
          },
          {
            y: data?.valuated,
            color: getPotentialClass(data?.potential),
          },
        ],
      },
    ],
    plotOptions: {
      column: {
        borderRadius: 0,
        pointWidth: 50,
        borderWidth: 0,
      },
    },
    tooltip: {
      backgroundColor: '#333333', // Màu nền của tooltip
      borderColor: '#666666', // Màu viền
      style: {
        color: '#ffffff', // Màu chữ
        fontSize: '12px', // Kích thước chữ
      },
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
        return `
          <div style="display: flex; align-items: center;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${this.color}; margin-right: 8px;"></div>
            <span><b>${this.series.name}</b>: ${this.y?.toLocaleString('en-US')}</span>
          </div>`;
      },
    },    
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };
  

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HistoryValuetionChart;