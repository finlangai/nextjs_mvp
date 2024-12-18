import Highcharts from 'highcharts';
import { PriceStockNoVolume } from '@/src/interfaces/PriceStock';

interface DataPoint extends Highcharts.PointOptionsObject {
  x: number;
  y: number;
}

export const getChartOptions = (data: PriceStockNoVolume[], isDarkMode:boolean): Highcharts.Options => {
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

  return {
    title: {
      text: undefined
    },
    xAxis: {
      type: 'datetime',
      minRange: 15 * 60 * 1000,
      crosshair: {
        color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
        width: 1,
        dashStyle: 'ShortDot'
      },
      title: {
        text: undefined
      },
      labels: {
        style: {
          color: `${isDarkMode ? '#101010' : '#D9D9D9'}`
        }
      }
    },
    yAxis: {
      crosshair: {
        color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
        width: 1,
        dashStyle: 'ShortDot'
      },
      min: minPrice - padding,
      max: maxPrice + padding,
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      title: {
        text: undefined
      },
      gridLineWidth: 2,
      opposite: false,
      labels: {
        style: {
          color: `${isDarkMode ? '#101010' : '#D9D9D9'}`
        },
        formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
          if (this.value === this.axis.min) {
            return '';
          }
          return this.value.toString();
        }
      },
      gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
      // tickAmount: 6,
      gridLineDashStyle: 'ShortDot'
    },
    series: [{
      type: 'area',
      data: formattedData,
      color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
      lineWidth: 1.5,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, `${isDarkMode ? '#ffffff61' : '#ffffff61'}`],
          [1, `${isDarkMode ? 'rgb(255 255 255 / 69%)' : '#49494921'}`]
        ]
      },
      dataGrouping: {
        enabled: false
      }
    }],
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
        }
      }
    },
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      width: null,
      height: 576,
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
        const point = this.points?.[0];
        if (!point || typeof point.point.index !== 'number' || typeof this.x !== 'number') {
          return '';
        }
        
        const stockData = data[point.point.index];
        
        return `
          <b>Thời gian: ${Highcharts.dateFormat('%d/%m/%Y', this.x)}</b><br/>
          Đóng cửa: ${stockData.price.toLocaleString('vi-VN')}<br/>
        `;
      },
      shared: true
    }
  };
};