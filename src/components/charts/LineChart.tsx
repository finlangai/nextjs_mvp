import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { quotes } from '@/src/interfaces/CardStock';

interface DataPoint extends Highcharts.PointOptionsObject {
  x: number;
  y: number;
}

const LineChart = ({ data }: { data: quotes[] }) => {
  const formattedData: DataPoint[] = data.map(item => {
    const date = new Date(item.time * 1000);
    return {
      x: date.getTime(),
      y: Number(item.price),
    };
  });

  const prices = formattedData.map(item => item.y);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      backgroundColor: 'none',
      borderRadius: 10,
      height: '103px',
    },
    title: {
      text: undefined,
    },
    xAxis: {
      type: 'datetime',
      visible: false,
    },
    yAxis: {
      visible: false,
      min: minPrice - padding,
      max: maxPrice + padding,
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
    },
    plotOptions: {
      area: {
        animation: false,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 3
            }
          }
        },
      }
    },
    series: [{
      type: 'area',
      data: formattedData,
      color: 'white',
      lineWidth: 1.5,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#ffffff61'],
          [1, '#49494921']
        ]
      },
    }],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
        if (typeof this.x === 'undefined') return '';
        
        const date = new Date(this.x);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        
        const price = typeof this.y === 'number' ? this.y.toLocaleString() : '0';
        
        return `<b>${day}/${month}/${year}</b><br/>Giá: ${price}`;
      }
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LineChart;