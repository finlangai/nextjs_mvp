import Highcharts from 'highcharts';
import { DataPoint } from './types';

export const getChartOptions = (
  formattedData: DataPoint[],
  minPrice: number,
  maxPrice: number
): Highcharts.Options => ({
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
    min: minPrice,
    max: maxPrice,
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
});