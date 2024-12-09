import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';
import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { selectDarkMode } from '@/src/redux/darkmode';
import { useAppSelector } from "@/src/redux/hooks/useAppStore";
const RevenueGrowthRateChart = ({data}: {data: Metric[]}) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  const chartSeries = convertToChartSeries(data, "revenueGrowthRate"); 

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
      type: 'column',
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
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        }
      },
      plotBands: [{
        from: forecastStartIndex - 0.5,
        to: xAxisCategories.length - 0.5,
        color: `${isDarkMode ? '#EAECEF' : 'rgb(217 217 217 / 5%)'}`,
        label: {
          text: 'Dự báo',
          style: {
            color: `${isDarkMode ? '#232323' : '#EAECEF'}`
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
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        },
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
          return this.value + '%';
        }
      },
      gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
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
      enabled: false 
    },
    legend: {
      enabled: false
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default RevenueGrowthRateChart;
