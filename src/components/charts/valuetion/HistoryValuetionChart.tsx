import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PriceData {
  date: string;
  actualPrice: number;
  valuationPrice: number;
}

interface Props {
  data?: PriceData[];
  width?: string | number;
  height?: string | number;
}

const sampleData: PriceData[] = [
  { date: '01/10', actualPrice: 28.5, valuationPrice: 29.2 },
  { date: '02/10', actualPrice: 28.7, valuationPrice: 29.3 },
  { date: '03/10', actualPrice: 29.1, valuationPrice: 29.4 },
  { date: '04/10', actualPrice: 29.3, valuationPrice: 29.5 },
  { date: '05/10', actualPrice: 29.2, valuationPrice: 29.6 },
  { date: '08/10', actualPrice: 29.4, valuationPrice: 29.8 },
  { date: '09/10', actualPrice: 29.8, valuationPrice: 30.0 },
  { date: '10/10', actualPrice: 30.1, valuationPrice: 30.2 },
  { date: '11/10', actualPrice: 30.3, valuationPrice: 30.4 },
  { date: '12/10', actualPrice: 30.0, valuationPrice: 30.5 },
  { date: '15/10', actualPrice: 29.8, valuationPrice: 30.3 },
  { date: '16/10', actualPrice: 29.6, valuationPrice: 30.2 },
  { date: '17/10', actualPrice: 29.9, valuationPrice: 30.4 },
  { date: '18/10', actualPrice: 30.2, valuationPrice: 30.6 },
  { date: '19/10', actualPrice: 30.4, valuationPrice: 30.8 },
  { date: '22/10', actualPrice: 30.6, valuationPrice: 31.0 },
  { date: '23/10', actualPrice: 30.8, valuationPrice: 31.2 },
  { date: '24/10', actualPrice: 30.7, valuationPrice: 31.1 },
  { date: '25/10', actualPrice: 30.9, valuationPrice: 31.3 },
  { date: '26/10', actualPrice: 31.2, valuationPrice: 31.5 },
];

const ValuetionChart: React.FC<Props> = ({ 
  data = sampleData,
  width = '100%',
  height = 400
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'spline',
      width: width === '100%' ? undefined : Number(width),
      height: Number(height),
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: data.map(item => item.date),
      labels: {
        style: {
          color: '#9CA3AF'
        }
      },
      lineColor: '#2B3139',
      tickLength: 0,
      crosshair: {
        color: '#cccccc',
        width: 1,
        dashStyle: 'ShortDot'
      }
    },
    yAxis: {
        title: {
          text: ''
        },
        labels: {
          style: {
            color: 'white'
          },
          formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
            return this.value.toString(); // Không thêm %
          }
        },
        gridLineColor: '#2B3139',
        tickAmount: 7,
    },    
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      shadow: true,
      style: {
        fontSize: '12px'
      },
      formatter: function() {
        if (!this.points) return '';
        return this.points.reduce((acc: string, point) => {
          const seriesName = point.series.name === 'Actual Price' ? 'Thực tế' : 'Định giá';
          const value = typeof point.y === 'number' ? point.y.toFixed(2) : 'N/A';
          return acc + `<span style="color:black;">${seriesName}: ${value}</span><br/>`;
        }, '');
      }
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 3
          }
        }
      },
      series: {
        animation: {
          duration: 1000
        }
      }
    },
    series: [
      {
        type: 'spline',
        name: 'Actual Price',
        data: data.map(item => item.actualPrice),
        color: 'white',
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        type: 'spline',
        name: 'Valuation Price',
        data: data.map(item => item.valuationPrice),
        color: '#10B981',
        tooltip: {
          valueDecimals: 2
        }
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default ValuetionChart;
