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
            color: '#684D74',
            // dataLabels: {
            //   enabled: true,
            //   useHTML: true,
            //   // formatter: function (this: DataLabelsFormatterContextObject): string {
            //   //   return `
            //   //   <div>
            //   //     <div
            //   //       style='
            //   //         padding: 8px 12px;
            //   //         border-radius: 6px;
            //   //         font-size: 14px;
            //   //         font-weight: 500;
            //   //         color: white;
            //   //         white-space: nowrap;
            //   //         background-color: #ffffff;
            //   //         color: black;
            //   //       '>
            //   //       ${this.y?.toLocaleString('en-US')}
            //   //     </div>
            //   //     <div
            //   //       style='
            //   //         width: 0;
            //   //         height: 0;
            //   //         border-left: 4px solid transparent;
            //   //         border-right: 4px solid transparent;
            //   //         border-top: 4px solid #ffffff;
            //   //         margin: 0 auto;
            //   //       '
            //   //     />
            //   //   </div>
            //   //   `;
            //   // },
            // },
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
    // tooltip: {
    //   enabled: false,
    // },
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