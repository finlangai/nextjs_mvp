import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';

interface ChartData {
  year: number;
  roce: number;
  roe: number;
}

interface SeriesOptions {
  name: string;
  color: string;
  dashStyle?: Highcharts.DashStyleValue;
  lineWidth?: number;
}

interface ROIChartProps {
  historicalData: ChartData[];
  forecastData: ChartData[];
  title?: string;
  seriesOptions?: {
    roce: SeriesOptions;
    roe: SeriesOptions;
  };
  forecastLineStyle?: Highcharts.DashStyleValue;
}

const defaultSeriesOptions: Required<ROIChartProps>['seriesOptions'] = {
  roce: { name: 'ROCE', color: 'white', dashStyle: 'Solid', lineWidth: 2 },
  // roa: { name: 'ROA', color: '#434348', dashStyle: 'Solid', lineWidth: 2 },
  roe: { name: 'ROE', color: '#25B770', dashStyle: 'Solid', lineWidth: 2 },
};

export default function ROIChart({
  historicalData,
  forecastData,
  seriesOptions = defaultSeriesOptions,
  forecastLineStyle = 'ShortDot'
}: ROIChartProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);
  }, []);

  const allData = [...historicalData, ...forecastData];
  const forecastStartIndex = historicalData.length - 1;

  const options: Highcharts.Options = {
    credits: {
        enabled: false
    },
    chart: {
        backgroundColor: 'transparent',
    },
    title: {
        text: "",
    },
    exporting: {
        enabled: false // Ẩn nút menu
    },
    xAxis: {
      categories: allData.map(d => d.year.toString()),
      plotBands: [{
        from: forecastStartIndex,
        to: allData.length,
        color: '#1E2026',
        label: { text: 'Dự báo', style: { color: 'white' } }
      }],
      labels: {
        style: {
          color: 'white' // Đổi màu cho các giá trị trục Y
        }
      },

    },
    yAxis: { 
        title: { text: '' },
        labels: {
            style: {
              color: 'white' // Đổi màu cho các giá trị trục Y
            }
        },
        gridLineColor: '#2B3139',
        tickAmount: 5, // Giới hạn số lượng vạch tối đa trên trục Y

    },
    series: ['roce', 'roe'].map(key => ({
      name: seriesOptions[key as keyof typeof seriesOptions].name,
      data: allData.map(d => d[key as keyof ChartData]),
      type: 'line',
      color: seriesOptions[key as keyof typeof seriesOptions].color,
      dashStyle: seriesOptions[key as keyof typeof seriesOptions].dashStyle,
      lineWidth: seriesOptions[key as keyof typeof seriesOptions].lineWidth,
      zoneAxis: 'x',
      zones: [
        { value: forecastStartIndex },
        { dashStyle: forecastLineStyle }
      ]
    })) as Highcharts.SeriesOptionsType[],
    tooltip: {
      shared: true,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    legend: {
        enabled: false
    },
    responsive: {
      rules: [{
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  return <HighchartsReact
    highcharts={Highcharts}
    options={options}
    ref={chartComponentRef}
  />;
}

