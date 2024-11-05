import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';

// Import các module cần thiết
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import hollowCandlestick from 'highcharts/modules/hollowcandlestick';
import heikinAshi from 'highcharts/modules/heikinashi';
import { StockDataPoint } from '@/src/utils/sampleData';

// Kích hoạt các module
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);
hollowCandlestick(Highcharts);
heikinAshi(Highcharts);

interface ExtendedPoint extends Highcharts.Point {
  plotX?: number;
  plotY?: number;
  isHeader?: boolean;
}

interface IndicatorConfig {
  type: string;
  options: Highcharts.SeriesOptionsType & {
    params?: {
      period?: number;
      [key: string]: any;
    };
  };
}

interface SavedChartConfig {
  chartConfig: Highcharts.Options;
  annotations: Array<Highcharts.AnnotationsOptions>;
  indicators: IndicatorConfig[];
  timestamp: number;
}

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
  }
});

const CandlestickChart = ({ data }: { data: StockDataPoint[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  function removeCircularReferences<T>(obj: T): T {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    }));
  }

  const saveToSession = () => {
    if (chartRef.current) {
      try {
        const chartConfig = removeCircularReferences<Highcharts.Options>(chartRef.current.options);
        const annotations = chartConfig.annotations || [];
        
        const indicators = chartRef.current.series
          .filter(series => {
            const seriesOptions = series.options as any;
            return seriesOptions.type && 
                   seriesOptions.type !== 'candlestick' && 
                   seriesOptions.type !== 'column';
          })
          .map(series => ({
            type: series.options.type || '',
            options: series.options as Highcharts.SeriesOptionsType & {
              params?: {
                period?: number;
                [key: string]: any;
              }
            }
          }));
  
        const savedConfig: SavedChartConfig = {
          chartConfig,
          annotations,
          indicators,
          timestamp: new Date().getTime()
        };
  
        sessionStorage.setItem('chartConfig', JSON.stringify(savedConfig));
      } catch (error) {
        console.error('Error auto-saving chart:', error);
      }
    }
  };

  const loadFromSession = () => {
    try {
      const savedConfig = sessionStorage.getItem('chartConfig');
      if (savedConfig && chartRef.current) {
        const parsedConfig: SavedChartConfig = JSON.parse(savedConfig);
  
        if (chartRef.current.options.annotations) {
          chartRef.current.options.annotations = [];
        }
        
        chartRef.current.series
          .filter(series => {
            const seriesOptions = series.options as any;
            return seriesOptions.type && 
                   seriesOptions.type !== 'candlestick' && 
                   seriesOptions.type !== 'column';
          })
          .forEach(series => series.remove(false));
  
        parsedConfig.annotations.forEach((annotation) => {
          chartRef.current?.addAnnotation(annotation);
        });
  
        parsedConfig.indicators.forEach((indicator) => {
          chartRef.current?.addSeries(indicator.options);
        });
  
        chartRef.current.redraw();
      }
    } catch (error) {
      console.error('Error loading chart from session storage:', error);
    }
  };

  useEffect(() => {
    const seriesData = data.map((point) => [
      point.date,
      point.open,
      point.high,
      point.low,
      point.close,
    ]);

    // Tính toán màu cho volume dựa trên giá đóng cửa và mở cửa
    const volumeData = data.map((point, index) => ({
      x: point.date,
      y: point.volume,
      color: point.close >= point.open ? '#0ECB81' : '#F6465D' // Xanh nếu tăng, đỏ nếu giảm
    }));

    if (chartContainerRef.current) {
      const chartOptions: Highcharts.Options = {
        stockTools: {
          gui: {
            buttons: [
              'indicators',
              'separator',
              'typeChange',
              'separator',
              'simpleShapes',
              'lines',
              'crookedLines',
              'measure',
              'advanced',
              'toggleAnnotations',
              'separator',
              'verticalLabels',
              'flags',
              'separator',
              'zoomChange',
              'fullScreen',
              'separator',
              'currentPriceIndicator',
            ],
          },
        },

        chart: {
          backgroundColor: 'rgb(24 26 32)',
          renderTo: chartContainerRef.current,
          events: {
            addSeries: saveToSession,
            redraw: saveToSession,
          }
        },

        annotations: [{
          labels: [{
            point: {
              x: 2,
              y: 2,
              xAxis: 0,
              yAxis: 0
            },
            text: 'Điểm quan trọng',
            style: {
              color: 'red',
              fontWeight: 'bold'
            }
          }]
        }],
        
        plotOptions: {
          series: {
            showInNavigator: false,
          },
          candlestick: {
            color: '#F6465D',
            lineColor: '#F6465D',
            upColor: '#0ECB81',
            upLineColor: '#0ECB81',            
          },
          hollowcandlestick: {
            color: '#F6465D',
            lineColor: '#F6465D',
            upColor: '#0ECB81',
            upLineColor: '#0ECB81',            
          },
          heikinashi: {
            color: '#F6465D',
            lineColor: '#F6465D',
            upColor: '#0ECB81',
            upLineColor: '#0ECB81',            
          },
          column: {
            borderWidth: 0,
            borderRadius: 0
          },
          ohlc: {
            color: '#F6465D',
            upColor: '#0ECB81',
          },
          line: {
            color: '#0ECB81',       
          },
        },

        series: [
          {
            type: 'candlestick',
            id: 'aapl-ohlc',
            name: 'AAPL Stock Price',
            data: seriesData,
          }, {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volumeData,
            yAxis: 1
          }
        ],

        xAxis: {
          type: 'datetime',
          gridLineColor: '#2B3139',
          offset: 0,  
          labels: {
            style: {
              color: '#ffffff'
            },
          },
          gridLineWidth: 1

        },

        yAxis: [
          {
            gridLineColor: '#2B3139',
            labels: {
              align: 'left',
              style: {
                color: '#ffffff'
              },
            },
            height: '70%',
            resize: {
              enabled: true
            }
          }, 
          {
            gridLineColor: '#2B3139',
            labels: {
              align: 'left',
              style: {
                color: '#ffffff'
              },
            },
            top: '80%',
            height: '20%',
            offset: 0
          }
        ],

        navigator: {
          enabled: false
        },

        rangeSelector: {
          enabled: false,
        },

        title: {
          text: undefined
        },

        legend: {
          enabled: false,
        },

        tooltip: {
          useHTML: true,
          backgroundColor: 'none', // Loại bỏ nền của tooltip
          formatter: function () {
            const point = this as any;
            // console.log("Tooltip context", point.point);
        
            const open = point.point.open !== undefined ? point.point.open : 'N/A';
            const high = point.point.high !== undefined ? point.point.high : 'N/A';
            const low = point.point.low !== undefined ? point.point.low : 'N/A';
            const close = point.point.close !== undefined ? point.point.close : 'N/A';
        
            return `
              <div style="display:flex; column-gap: 10px;">

                <div style="display:flex; column-gap: 5px;">
                  <div style="color: rgb(132 142 156);">
                    Ngày:
                  </div>
                  <div style="color: white;">
                    ${this.x !== undefined ? Highcharts.dateFormat('%e %b, %Y', this.x as number) : 'N/A'}
                  </div>
                </div>

                <div style="display:flex; column-gap: 5px;">
                  <div style="color: rgb(132 142 156);">
                    Giá mở cửa:
                  </div>
                  <div style="color: white;">
                    ${open.toLocaleString('en-US')}
                  </div>
                </div>

                <div style="display:flex; column-gap: 5px;">
                  <div style="color: rgb(132 142 156);">
                    Giá cao nhất:
                  </div>
                  <div style="color: white;">
                    ${high.toLocaleString('en-US')}
                  </div>
                </div>

                <div style="display:flex; column-gap: 5px;">
                  <div style="color: rgb(132 142 156);">
                    Giá thấp nhất:
                  </div>
                  <div style="color: white;">
                    ${low.toLocaleString('en-US')}
                  </div>
                </div>

                <div style="display:flex; column-gap: 5px;">
                  <div style="color: rgb(132 142 156);">
                    Giá đóng cửa:
                  </div>
                  <div style="color: white;">
                    ${close.toLocaleString('en-US')}
                  </div>
                </div>

              <div>
            `;
          },
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,
          positioner: function (): Highcharts.PositionObject {
            // Cố định tooltip ở góc trên cùng bên trái
            return {
              x: 50,  // Khoảng cách từ trái màn hình
              y: 10   // Khoảng cách từ đỉnh màn hình
            };
          }
        },
        

        credits: {
          enabled: false
        },
      };

      chartRef.current = Highcharts.stockChart(chartOptions);
    }

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
      if (chartRef.current) {
        saveToSession();
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return <div id='container-technical-chart-azz' ref={chartContainerRef} style={{ height: '600px', width: '100%' }} />;
};

export default CandlestickChart;