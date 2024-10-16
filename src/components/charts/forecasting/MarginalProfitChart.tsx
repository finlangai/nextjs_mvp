import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartSeries } from '@/src/interfaces/ChartSeries';
import { Metric } from '@/src/interfaces/ForecastingCriteria';

const historicalDataGross = [
    { year: '2015', value: 5 },
    { year: '2016', value: 6 },
    { year: '2017', value: 7 },
    { year: '2018', value: 8 },
    { year: '2019', value: 9 }
  ];
  
  const forecastDataGross = [
    { year: '2020', value: 5 },
    { year: '2021', value: 7 },
    { year: '2022', value: 6 },
    { year: '2023', value: 8 },
    { year: '2024', value: 9 }
  ];
  
  const historicalDataNet = [
    { year: '2015', value: 4 },
    { year: '2016', value: 5 },
    { year: '2017', value: 6 },
    { year: '2018', value: 7 },
    { year: '2019', value: 8 }
  ];
  
  const forecastDataNet = [
    { year: '2020', value: 4 },
    { year: '2021', value: 6 },
    { year: '2022', value: 5 },
    { year: '2023', value: 7 },
    { year: '2024', value: 8 }
  ];


const convertToChartSeries = (metrics: Metric[]): ChartSeries[] => {
    return metrics.map((metric, index) => ({
        name: metric.name,
        type: index === 0 ? 'column' : index === 1 ? 'column' : 'spline', 
        color: index === 0 ? '#25B770' : index === 1 ? 'white' : '#FF6347',
        data: [
        ...metric.historical.map(item => item.value),
        ...metric.forecast.map(item => item.value)
        ]
    }));
};

export default function MarginalProfitChart({data}: {data: Metric[]}){
    const chartSeries = convertToChartSeries(data); 

    const options = {
    credits: {
        enabled: false // Vô hiệu hóa watermark Highcharts.com
    },
    chart: {
        type: 'column',
        backgroundColor: 'transparent' // Nền trong suốt, phù hợp dark mode
    },
    title: {
        text: '',
        style: {
            color: '#ffffff' // Màu tiêu đề phù hợp với dark mode
        }
    },
    xAxis: {
        categories: [
            ...historicalDataGross.map(item => item.year),
            ...forecastDataGross.map(item => item.year)
        ],        
        labels: {
            style: {
                color: '#ffffff' // Màu chữ trục x
            }
        },
        plotBands: [{ // Vùng màu phủ cho năm dự báo
            from: 4.5, // Bắt đầu từ năm thứ 6 (0-indexed, tức là từ năm 2020)
            to: 9.5,   // Đến năm thứ 10 (tức là năm 2024)
            color: '#1E2026',
            label: {
              text: 'Dự báo',
              style: {
                color: 'white'
              }
            }
        }],
    },
    yAxis: {
        title: {
        text: '',
            style: {
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff'
            }
        },
        tickAmount: 5,
        gridLineColor: '#2B3139',
    }, 
    
    plotOptions: {
        column: {
            stacking: 'normal',
            borderColor: 'none'
        }
    },
    series: [
        {
            name: 'Biên lợi nhuận gộp',
            data: [
                ...historicalDataGross.map(item => item.value),
                ...forecastDataGross.map(item => item.value)
              ],
            color: '#25B770'
        }, {
            name: 'Biên lợi nhuận ròng',
            data: [
                ...historicalDataNet.map(item => item.value),
                ...forecastDataNet.map(item => item.value)
            ],            
            color: 'white'
        }
    ],
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false // Ẩn nút menu
    },
    };
    
    return (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    );
}
