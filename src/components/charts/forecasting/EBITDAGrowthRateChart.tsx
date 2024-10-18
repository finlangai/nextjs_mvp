import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';
import { Metric } from '@/src/interfaces/ForecastingCriteria';

const EBITDAGrowthRateChart = ({data}: {data: Metric[]}) => {
  const chartSeries = convertToChartSeries(data, "eBITDAGrowthRate"); 

  const allYears = data.flatMap(metric => 
    [...metric.historical, ...metric.forecast].map(item => item.year)
  );
  const startYear = Math.min(...allYears);
  const endYear = Math.max(...allYears);

  // Tạo mảng các năm cho trục x
  const xAxisCategories = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => (startYear + index).toString()
  );

  // Tìm giá trị min và max cho trục y
  const allValues = chartSeries.flatMap(series => series.data);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Xác định điểm bắt đầu của dự báo
  const forecastStartIndex = data[0].historical.length;

  const chartOptions = {
    chart: {
      type: 'column', // Biểu đồ cột
      backgroundColor: 'transparent'
    },
    title: {
      text: ''  
    },
    xAxis: {
      categories:xAxisCategories,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white' // Đổi màu cho các giá trị trục X
        }
      },
      plotBands: [{ // Vùng màu phủ cho năm dự báo
        from: forecastStartIndex - 0.5,
        to: xAxisCategories.length - 0.5,
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
      min: Math.floor(minValue),
      max: Math.ceil(maxValue),
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white'
        },
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
          return this.value + '%';
        }
      },
      gridLineColor: '#2B3139',
      tickAmount: 5,
    },
    series: chartSeries,
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

export default EBITDAGrowthRateChart;
