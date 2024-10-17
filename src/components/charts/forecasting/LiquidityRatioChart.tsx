import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';
import { Metric } from '@/src/interfaces/ForecastingCriteria';

export default function MarginalProfitChart({data}: {data: Metric[]}){
  const chartSeries = convertToChartSeries(data, "liquidityRatio"); 

  const chartOptions = {
    chart: {
      type: 'column', // Đường cong uốn lượn
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        ...data[0].historical.map(item => item.year.toString()), // Chuyển đổi số thành chuỗi
        ...data[0].forecast.map(item => item.year.toString())
      ],
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white' // Đổi màu cho các giá trị trục X
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
      min: 0,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white'
        }
      },
      gridLineColor: '#2B3139',
      tickAmount: 5,
    },
    // series: [
    //   {
    //     name: 'Chỉ số 1',
    //     data: [
    //       ...historicalData1.map(item => item.value),
    //       ...forecastData1.map(item => item.value)
    //     ],
    //     color: '#25B770', // Màu cho chỉ số 1
    //     marker: {
    //       enabled: true, // Hiển thị các chấm tròn
    //       radius: 4 // Kích thước chấm tròn
    //     },
    //     type: "spline"
    //   },
    //   {
    //     name: 'Chỉ số 2',
    //     data: [
    //       ...historicalData2.map(item => item.value),
    //       ...forecastData2.map(item => item.value)
    //     ],
    //     color: 'white', // Màu cho chỉ số 2
    //     marker: {
    //       enabled: true, // Hiển thị các chấm tròn
    //       radius: 4 // Kích thước chấm tròn
    //     },
        
    //   },
    //   {
    //     name: 'Chỉ số 3',
    //     data: [
    //       ...historicalData3.map(item => item.value),
    //       ...forecastData3.map(item => item.value)
    //     ],
    //     color: '#FF6347', // Màu cho chỉ số 3
    //     marker: {
    //       enabled: true, // Hiển thị các chấm tròn
    //       radius: 4 // Kích thước chấm tròn
    //     }
    //   }
    // ],
    series: chartSeries.map(series => ({
      type: series.type,
      name: series.name,
      data: series.data,
      color: series.color,
    })),
    plotOptions: {
      spline: {
        borderColor: 'transparent',
        borderWidth: 2
      },
      column: {
        borderColor: 'none' // Xóa màu viền cho các cột
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false // Ẩn nút menu
    },
    legend: {
      enabled: false, // Hiển thị chú giải (legend)
      itemStyle: {
        color: 'white' // Đổi màu chữ cho legend
      }
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};
