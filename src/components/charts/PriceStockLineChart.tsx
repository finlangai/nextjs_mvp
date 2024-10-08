import { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PriceStock } from '@/src/interfaces/PriceStock';

// Thêm module zoom
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

// Định nghĩa các chuỗi tiếng Việt cho Highcharts
Highcharts.setOptions({
  lang: {
    months: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
      'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
      'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    shortMonths: [
      'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
      'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
    ],
    weekdays: [
      'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư',
      'Thứ năm', 'Thứ sáu', 'Thứ bảy'
    ],
    resetZoom: 'Đặt lại zoom',
    resetZoomTitle: 'Đặt lại mức zoom 1:1'
  }
});

const PriceStockLineChart = ({ data }: { data: PriceStock[] }) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartData: [number, number][] = data.map(item => [
    item.time * 1000,
    item.close
  ]);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Ngăn chặn cuộn trang
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const options: Highcharts.Options = {
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
        cursor: 'crosshair' // Thêm con trỏ chữ thập
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
        // dataGrouping: {
        //   enabled: true,
        //   units: [
        //     ['minute', [1, 5, 15, 30]],
        //     ['hour', [1]]
        //   ]
        // },
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

  return (
    <div 
      ref={chartContainerRef}
      style={{ cursor: 'crosshair' }}
    >
      <HighchartsReact 
        highcharts={Highcharts} 
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default PriceStockLineChart;