import Highcharts from 'highcharts';
import { PriceStock } from '@/src/interfaces/PriceStock';

export const getChartOptions = (data: PriceStock[]): Highcharts.Options => {
  const chartData: [number, number][] = data?.map(item => [
    item.time * 1000,
    item.close
  ]);

  return {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      borderWidth: 0,
      plotBorderWidth: 0,
      height: 576,
      zooming: {
        type: 'x',
        mouseWheel: {
          enabled: true,
          sensitivity: 1.5
        },
      },
      panning: {
        enabled: true,
        type: 'x'
      },
      animation: {
        duration: 300
      },
      style: {
        cursor: 'crosshair' 
      }
    },
    title: {
      text: undefined
    },
    xAxis: {
      type: 'datetime',
      lineColor: '#2B3139',
      labels: {
        style: {
          color: '#ffffff'
        }
      },
      tickLength: 0,
      minRange: 15 * 60 * 1000,
      crosshair: {
        color: '#cccccc',
        width: 1,
        dashStyle: 'ShortDot'
      },
    },
    yAxis: {
      title: {
        text: undefined
      },
      lineColor: '#2B3139',
      gridLineWidth: 1,
      gridLineColor: '#2B3139',
      labels: {
        style: {
          color: '#ffffff'
        },
        formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
          if (this.value === this.axis.min) {
            return '';
          }
          return this.value.toString();
        }
      },
      crosshair: {
        color: '#cccccc',
        width: 1,
        dashStyle: 'ShortDot'
      }
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
          Mở cửa: ${stockData.open.toLocaleString('vi-VN')}<br/>
          Cao nhất: ${stockData.high.toLocaleString('vi-VN')}<br/>
          Thấp nhất: ${stockData.low.toLocaleString('vi-VN')}<br/>
          Đóng cửa: ${stockData.close.toLocaleString('vi-VN')}<br/>
          Khối lượng: ${stockData.volume.toLocaleString('vi-VN')}
        `;
      },
      shared: true
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        turboThreshold: 5000,
      }
    },
    series: [{
      type: 'line',
      data: chartData,
      color: '#ffffff'
    }] as any,
    credits: {
      enabled: false
    },
    scrollbar: {
      enabled: true
    }
  };
};