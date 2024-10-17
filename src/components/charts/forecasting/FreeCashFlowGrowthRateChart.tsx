import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { convertToChartSeries } from '@/src/utils/convertToChartSeries';

const FreeCashFlowGrowthRateChart = ({data}: {data: Metric[]}) => {
  const chartSeries = convertToChartSeries(data, "freeCashFlowGrowthRate");

  // Tìm năm bắt đầu và kết thúc cho tất cả các series
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

  // Tìm giá trị min và max cho từng trục y
  const primaryAxisValues = chartSeries
    .filter(series => series.type === 'column')
    .flatMap(series => series.data);
  const secondaryAxisValues = chartSeries
    .filter(series => series.type !== 'column')
    .flatMap(series => series.data);

  const primaryMinValue = Math.min(...primaryAxisValues);
  const primaryMaxValue = Math.max(...primaryAxisValues);
  const secondaryMinValue = Math.min(...secondaryAxisValues);
  const secondaryMaxValue = Math.max(...secondaryAxisValues);

  // Xác định điểm bắt đầu của dự báo
  const forecastStartIndex = data[0].historical.length;

  const chartOptions = {
    chart: {
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: xAxisCategories,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white'
        }
      },
      plotBands: [{
        from: forecastStartIndex - 0.5,
        to: xAxisCategories.length - 0.5,
        color: '#1E2026',
        label: {
          text: 'Dự báo',
          style: {
            color: 'white'
          }
        },
        gridLineColor: '#2B3139',

      }],
    },
    yAxis: [
      {
        // Trục Y chính (không phải tỷ lệ phần trăm)
        min: Math.floor(primaryMinValue),
        max: Math.ceil(primaryMaxValue),
        title: {
          text: '',
          style: {
            color: 'white'
          }
        },
        labels: {
          style: {
            color: 'white'
          },
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
            return this.value.toLocaleString();
          }
        },
        gridLineColor: '#2B3139', // Màu lưới tối hơn
        gridLineWidth: 1,
        minorGridLineColor: '#2B3139', // Màu lưới phụ tối hơn
        minorGridLineWidth: 0.5,
      },
      {
        // Trục Y phụ (tỷ lệ phần trăm)
        min: Math.floor(secondaryMinValue),
        max: Math.ceil(secondaryMaxValue),
        title: {
          text: '',
          style: {
            color: 'white'
          }
        },
        labels: {
          style: {
            color: 'white'
          },
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
            return this.value + '%';
          }
        },
        opposite: true,
        gridLineColor: '#2B3139', // Màu lưới tối hơn
        gridLineWidth: 1,
        minorGridLineColor: '#2B3139', // Màu lưới phụ tối hơn
        minorGridLineWidth: 0.5,
      }
    ],
    series: chartSeries.map(series => ({
      ...series,
      yAxis: series.type === 'column' ? 0 : 1,
      gridLineColor: '#2B3139',
      // Gán series vào trục Y tương ứng
    })),
    plotOptions: {
      column: {
        borderColor: 'transparent',
        borderWidth: 1,
        stacking: 'normal',
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
    },
    tooltip: {
      shared: true,
      formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
        let s = '<b>' + this.x + '</b>';
        this.points?.forEach(function(point) {
          s += '<br/>' + point.series.name + ': ' +
            (point.series.type === 'column' ? point?.y?.toLocaleString() : point?.y?.toFixed(2) + '%');
        });
        return s;
      }
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default FreeCashFlowGrowthRateChart;