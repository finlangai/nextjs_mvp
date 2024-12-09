import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import dynamic from 'next/dynamic';
import cloneDeep from 'lodash/cloneDeep';

// Import các module cần thiết
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import hollowCandlestick from 'highcharts/modules/hollowcandlestick';
import heikinAshi from 'highcharts/modules/heikinashi';
import { selectPriceStocksData, selectPriceStocksLoading } from '@/src/redux/PriceStock';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedLayout } from '@/src/redux/LayoutTechChart';
import { SpinerLoader } from '../../common/Loader';
import { selectDarkMode } from '@/src/redux/darkmode';

// Kích hoạt các module
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);
hollowCandlestick(Highcharts);
heikinAshi(Highcharts);

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

const TechnicalChart = dynamic(() => {
  return import('./TechnicalChartComponent').then(mod => mod.default);
}, {
  ssr: false, // Tắt SSR cho component này
});

const TechnicalChartComponent = ({symbol} : {symbol: string}) => {
    const isDarkMode = useAppSelector(selectDarkMode);

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Highcharts.Chart | null>(null);
    const selectPriceStocks = useAppSelector(selectPriceStocksData);
    const [seriesData, setSeriesData] = useState<number[][]>([]);
    const [volumeData, setVolumeData] = useState<{ x: number; y: number; color: string }[]>([]);  
    const selectedLayout = useAppSelector(selectSelectedLayout);
    const priceStocksLoading = useAppSelector(selectPriceStocksLoading);

    useEffect(()=> {
      const x = selectPriceStocks.map((point) => [
        point.time, 
        point.open,
        point.high,
        point.low,
        point.close,
      ]);
      setSeriesData(x);

      // Tính toán màu cho volume dựa trên giá đóng cửa và mở cửa
      const f = selectPriceStocks.map((point) => ({
        x: point.time ,
        y: point.volume,
        color: point.close >= point.open ? '#0ECB81' : '#F6465D',
      }));
      setVolumeData(f);

    }, [selectPriceStocks])

    // TẠO CHART===========================================
    useEffect(() => {
      if (chartContainerRef.current) {
        // console.log('xe', layoutData)
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
          annotations: selectedLayout?.layout || [],
          chart: {
            backgroundColor: 'transparent',
            renderTo: chartContainerRef.current
          },       
          tooltip: {
            useHTML: true,
            backgroundColor: 'none', 
            formatter: function () {
              const point = this as any;
              const timestamp = point.point.options.x;           
          
              const open = point.point.options.open !== undefined ? point.point.options.open : 'N/A';
              const high = point.point.options.high !== undefined ? point.point.options.high : 'N/A';
              const low = point.point.options.low !== undefined ? point.point.options.low : 'N/A';
              const close = point.point.options.close !== undefined ? point.point.options.close : 'N/A';
          
              return `
                <div style="display:flex; column-gap: 10px;">

                  <div style="display:flex; column-gap: 5px;">
                    <div style="color: rgb(132 142 156);">
                      Ngày:
                    </div>
                    <div style="color: ${isDarkMode ? '#232323' : '#EAECEF'};">
                      ${timestamp !== undefined ? new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }) : 'N/A'}                  
                    </div>
                  </div>

                  <div style="display:flex; column-gap: 5px;">
                    <div style="color: rgb(132 142 156);">
                      Giá mở cửa:
                    </div>
                    <div style="color: ${isDarkMode ? '#232323' : '#EAECEF'};">
                      ${open.toLocaleString('en-US')}
                    </div>
                  </div>

                  <div style="display:flex; column-gap: 5px;">
                    <div style="color: rgb(132 142 156);">
                      Giá cao nhất:
                    </div>
                    <div style="color: ${isDarkMode ? '#232323' : '#EAECEF'};">
                      ${high.toLocaleString('en-US')}
                    </div>
                  </div>

                  <div style="display:flex; column-gap: 5px;">
                    <div style="color: rgb(132 142 156);">
                      Giá thấp nhất:
                    </div>
                    <div style="color:${isDarkMode ? '#232323' : '#EAECEF'};">
                      ${low.toLocaleString('en-US')}
                    </div>
                  </div>

                  <div style="display:flex; column-gap: 5px;">
                    <div style="color: rgb(132 142 156);">
                      Giá đóng cửa:
                    </div>
                    <div style="color: ${isDarkMode ? '#232323' : '#EAECEF'};">
                      ${close.toLocaleString('en-US')}
                    </div>
                  </div>

                <div>
              `;
            },
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
              color: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,       
            },
          },
          series: [
            {
              type: 'candlestick',
              id: `${symbol}-ohlc`,
              name: `${symbol} Stock Price`,
              data:  seriesData,
              cropThreshold: 5000,
              turboThreshold: 5000,    
              dataGrouping: {
                enabled:false
              }
            }, 
            {
              type: 'column',
              id: `${symbol}-Volume`,
              name: `${symbol} Volume`,
              data: volumeData,
              yAxis: 1,
              cropThreshold: 5000,
              turboThreshold: 5000,  
              dataGrouping: {
                enabled:false
              },

            }
          ],
          xAxis: {
            type: 'datetime',
            gridLineColor: '#2B3139',
            labels: {
              style: {
                color: `${isDarkMode ? 'blue' : '#EAECEF'}`
              },
            },
            gridLineWidth: 1,
            crosshair: {
              color: '#cccccc',
              width: 1,
              dashStyle: 'ShortDot',
            },
            plotLines: [{
              color: '#FF0000',
              width: 2,
              value: 5.5
            }],
          },
          yAxis: [
            {
              gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
              labels: {
                align: 'left',
                style: {
                   color: `${isDarkMode ? '#232323' : '#EAECEF'}`
                },
              },
              height: '80%',
              resize: {
                enabled: true
              },
              crosshair: {
                color: `${isDarkMode ? '#101010' : '#D9D9D9'}`,
                width: 1,
                dashStyle: 'ShortDot',
              },
            }, 
            {
              gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
              labels: {
                align: 'left',
                style: {
                   color: `${isDarkMode ? '#232323' : '#EAECEF'}`
                },
              },
              top: '80%',
              height: '20%',
              offset: 0,
            },
            
          ],
          navigator: {
            enabled: false
          },
          scrollbar: {
            enabled: false
          },
          rangeSelector:{
            selected: 4,
            enabled: false
          },
          title: {
            text: undefined
          },
          legend: {
            enabled: false,
          },
          credits: {
            enabled: false
          },
          responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
          },
        };

        // Tạo bản sao của `chartOptions` trước khi truyền
        const clonedOptions = cloneDeep(chartOptions);
        if (clonedOptions.chart) {
          delete clonedOptions.chart.renderTo; // Loại bỏ tham chiếu đến DOM
        }

        chartRef.current = Highcharts.stockChart({
          ...clonedOptions,
          chart: {
            ...(clonedOptions.chart || {}),
            renderTo: chartContainerRef.current, // Thêm lại tham chiếu DOM sau khi sao chép
          },
        });

      }
    }, [seriesData, volumeData, selectedLayout, isDarkMode]);

    // Lưu annotations vào sessionStorage
    const saveAnnotationsToSession = () => {
      const annotations = chartRef.current?.options.annotations || [];
      sessionStorage.setItem('chartAnnotations', JSON.stringify(annotations));
      // console.log('Annotations saved:', annotations);
    };

    // Lưu tự động sau 500ms không hoạt động
    useEffect(() => {
      const intervalId = setInterval(() => {
        saveAnnotationsToSession();
        // console.log('Annotations auto-saved to sessionStorage.');
      }, 500); // Lặp lại mỗi 500ms
    
      // Dọn dẹp khi component bị unmount
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    return (
      <>
        {
          priceStocksLoading 
          ? <div className='w-full mt-[200px] flex items-center justify-center'>< SpinerLoader /></div> 
          :  ''
        }

        { 
          !priceStocksLoading 
          ? 
          <div id='container-technical-chart-azz' ref={chartContainerRef} style={{ height: '600px', width: '100%' }} />
          : ''
        }
      
      </> 
    )

};

export default TechnicalChartComponent;