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
// Initialize the hollowcandlestick module
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


const CandlestickChart = ({ data} :{data:StockDataPoint[]}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  function removeCircularReferences<T>(obj: T): T {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return; // Trả về undefined để loại bỏ thuộc tính vòng tròn
        }
        seen.add(value);
      }
      return value;
    }));
  }
  
  const saveToSession = () => {
    if (chartRef.current) {
      try {
        const chartConfig = removeCircularReferences<Highcharts.Options>(chartRef.current.options); // Đảm bảo kiểu trả về
        const annotations = chartConfig.annotations || [];
        
        // Update indicators filtering
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
        console.log('Chart auto-saved to session storage:', savedConfig);
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
  
        // Ghi lại cấu hình biểu đồ đã lưu
        console.log('Loaded chart configuration from session:', parsedConfig);
  
        // Xóa annotations hiện tại
        if (chartRef.current.options.annotations) {
          chartRef.current.options.annotations = [];
        }
        
        // Xóa indicators hiện tại bằng remove
        chartRef.current.series
          .filter(series => {
            const seriesOptions = series.options as any;
            return seriesOptions.type && 
                   seriesOptions.type !== 'candlestick' && 
                   seriesOptions.type !== 'column';
          })
          .forEach(series => series.remove(false)); // false để không redraw ngay lập tức
  
        // Thêm lại annotations
        parsedConfig.annotations.forEach((annotation) => {
          chartRef.current?.addAnnotation(annotation);
        });
  
        // Thêm lại indicators
        parsedConfig.indicators.forEach((indicator) => {
          chartRef.current?.addSeries(indicator.options);
        });
  
        // Redraw chart
        chartRef.current.redraw();
        console.log('Chart loaded from session storage successfully');
      } else {
        console.log('No saved configuration found in session storage.');
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

    const volume = data.map((point) => [
      point.date,
      point.volume
    ]);

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
              redraw : saveToSession,

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
            color: 'white',       
          },
          ohlc: {
            color: '#F6465D',
            upColor: '#0ECB81',
          },
          line: {
            color: 'white',       
          },
        },


        series: [{
          type: 'candlestick',
          id: 'aapl-ohlc',
          name: 'AAPL Stock Price',
          data: seriesData
        }, {
          type: 'column',
          id: 'aapl-volume',
          name: 'AAPL Volume',
          data: volume,
          yAxis: 1
        }],

        xAxis: {
          type: 'datetime',
          gridLineColor: '#2B3139',
          offset: 0,  
          labels: {
            style: {
              color: '#ffffff'
            },
          },
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
            top: '70%',
            height: '30%',
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
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,
          positioner: function (
            this: Highcharts.Tooltip,
            width: number,
            height: number,
            point: ExtendedPoint
          ): Highcharts.PositionObject {
            const chart = this.chart;
            let position: Highcharts.PositionObject;
    
            if (point.isHeader) {
              const plotX = point.plotX || 0;
              position = {
                x: Math.max(
                  chart.plotLeft,
                  Math.min(
                    plotX + chart.plotLeft - width / 2,
                    chart.plotLeft + chart.plotWidth - width
                  )
                ),
                y: 0
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.toPixels(point.y || 0, true)
              };
            }
    
            return position;
          }
        },

        credits: {
          enabled: false
        },
      };

      // // Khởi tạo chart
      chartRef.current = Highcharts.stockChart(chartOptions);

      // // Load cấu hình đã lưu từ session storage
      // loadFromSession();
      // autoSaveIntervalRef.current = setInterval(saveToSession, 1000);
    }

    // Cleanup function
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
      if (chartRef.current) {
        // Lưu lần cuối trước khi destroy
        saveToSession();
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return <div id='container-technical-chart-azz' ref={chartContainerRef} style={{ height: '600px', width: '100%' }} />;
};

export default CandlestickChart;