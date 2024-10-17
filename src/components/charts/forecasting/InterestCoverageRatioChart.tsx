import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';
import { Metric } from '@/src/interfaces/ForecastingCriteria';

const InterestCoverageRatioChart = ({data}: {data: Metric[]}) => {
  const chartSeries = convertToChartSeries(data, "interestCoverageRatio"); 

  const chartOptions = {
    chart: {
      type: 'column', // Biểu đồ cột
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
    series: chartSeries.map(series => ({
      type: series.type,
      name: series.name,
      data: series.data,
      color: series.color,
    })),
    // series: [
    //   {
    //     name: 'Tỷ lệ tăng trưởng',
    //     data: [
    //       ...historicalData.map(item => item.value),
    //       ...forecastData.map(item => item.value)
    //     ],
    //     color: '#25B770', // Màu cho cột
    //     borderWidth: 2
    //   }
    // ],
    plotOptions: {
      column: {
        borderColor: 'transparent',
        borderWidth: 2
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false // Ẩn nút menu
    },
    legend: {
      enabled: false // Ẩn chú giải (legend)
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default InterestCoverageRatioChart;
