import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { ChartSeries } from '@/src/interfaces/ChartSeries';

const convertToChartSeries = (metrics: Metric[]): ChartSeries[] => {
  return metrics.map((metric, index) => ({
    name: metric.name,
    type: index === 0 ? 'column' : index === 1 ? 'line' : 'spline', 
    color: index === 0 ? '#25B770' : index === 1 ? 'white' : '#FF6347',
    data: [
      ...metric.historical.map(item => item.value),
      ...metric.forecast.map(item => item.value)
    ]
  }));
};

const ROIChart = ({data}: {data: Metric[]}) => {

  const chartSeries = convertToChartSeries(data); 

  const chartOptions = {
    chart: {
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
          color: 'white'
        }
      },
      plotBands: [{ 
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
      marker: {
        enabled: true,
        radius: 4
      },
      lineWidth: series.type === 'spline' ? 3 : 2
    })),
    plotOptions: {
      column: { 
        borderColor: 'transparent',
        borderWidth: 1
      },
      spline: { 
        borderColor: 'transparent',
        borderWidth: 2
      },
      line: { 
        lineWidth: 2
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: 'white'
      }
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default ROIChart;
