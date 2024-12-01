import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type DataLabelsFormatterContextObject = {
  y?: number; // Giá trị y của dữ liệu
  x?: number; // Giá trị x của dữ liệu (nếu có)
  [key: string]: any; // Cho phép các thuộc tính khác (linh hoạt với Highcharts)
};


const HistoryValuetionChart = () => {
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
      categories: ['Q2-2024', 'Q3-2024'],
      labels: {
        style: {
          color: '#ffffff', 
        },
      },
      gridLineColor: '#2B3139',

    },
    yAxis: {
      tickAmount: 5,
      min: 0,
      max: 60,
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
          value: 33.55,
          width: 2,
          dashStyle: 'Dash',
          zIndex: 5,
          label: {
            text: '<div style="background-color: blue; color: #ffffff; padding: 5px 10px; border-radius: 5px;">33,55</div>',
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
        name: 'Giá',
        data: [
          {
            y: 38.56,
            color: '#ffffff',
            dataLabels: {
              enabled: true,
              useHTML: true,
              formatter: function (this: DataLabelsFormatterContextObject): string {
                return `
                <div>
                  <div
                    style='
                      padding: 8px 12px;
                      borderRadius: 6px;
                      fontSize: 14px;
                      fontWeight: 500;
                      color: white;
                      whiteSpace: nowrap;
                      backgroundColor: #ef4444;
                    '>
                    ${this.y?.toFixed(2)}%
                  </div>
                  <div
                    style='
                      width: 0;
                      height: 0;
                      borderLeft: 4px solid transparent;
                      borderRight: 4px solid transparent;
                      borderTop: 4px solid #ef4444;
                      margin: 0 auto;
                    '
                  />
                </div>
                `;
              },
            },
          },
          {
            y: 38.56,
            color: '#9b5de5',
            dataLabels: {
              enabled: true,
              useHTML: true,
              formatter: function (this: DataLabelsFormatterContextObject): string {
                return `
                <div>
                  <div
                    style='
                      padding: 8px 12px;
                      borderRadius: 6px;
                      fontSize: 14px;
                      fontWeight: 500;
                      color: white;
                      whiteSpace: nowrap;
                      backgroundColor: #9b5de5;
                    '>
                    ${this.y?.toFixed(2)}%
                  </div>
                  <div
                    style='
                      width: 0;
                      height: 0;
                      borderLeft: 4px solid transparent;
                      borderRight: 4px solid transparent;
                      borderTop: 4px solid #9b5de5;
                      margin: 0 auto;
                    '
                  />
                </div>
                `;
              },
            },
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
      enabled: false, 
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return(
    <>
    <HighchartsReact highcharts={Highcharts} options={options} />;
    </>
  )
};

export default HistoryValuetionChart;
