import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';

export default function EBITDAGrowthRateChart({data}: {data: Metric[]}){
    const chartSeries = convertToChartSeries(data, "eBITDAGrowthRate"); 

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
            ...data[0].historical.map(item => item.year.toString()), // Chuyển đổi số thành chuỗi
            ...data[0].forecast.map(item => item.year.toString())
        ],        
        labels: {
            style: {
                color: '#ffffff' // Màu chữ trục x
            }
        },
        plotBands: [{ // Vùng màu phủ cho năm dự báo
            from: data[0].historical.length - 0.5,
            to: data[0].historical.length + data[0].forecast.length - 0.5,
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
            },
        },
        tickAmount: 5,
        gridLineColor: '#2B3139',
    }, 
    
    plotOptions: {
      column: {
          stacking: 'normal',
          borderColor: 'none'
      },
      area: {
        borderColor: 'transparent',
        borderWidth: 2
      }
    },
    series: chartSeries.map(series => ({
        type: series.type,
        name: series.name,
        data: series.data,
        color: series.color,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#25B770'],
            [1, 'rgba(37, 183, 112, 0)']
          ]
        },        
        dataLabels: {
            enabled: true, // Hiển thị nhãn trên đường
            style: {
              color: 'white',
              textOutline: 'none'
            }
        },
    })),
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
