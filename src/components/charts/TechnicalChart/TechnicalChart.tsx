import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';

// Import các module cần thiết
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import hollowCandlestick from 'highcharts/modules/hollowcandlestick';
import heikinAshi from 'highcharts/modules/heikinashi';
import { PriceStock } from '@/src/interfaces/PriceStock';
import { fetchPriceStocks, selectPriceStocksData } from '@/src/redux/PriceStock';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { getStartOfYear, getCurrentUnixTimestamp} from '@/src/utils/getTimeRanges';

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

const CandlestickChart = ({symbol} : {symbol: string}) => {
  const dispatch = useAppDispatch();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const selectPriceStocks = useAppSelector(selectPriceStocksData);
  const [data, setStockData] = useState<PriceStock[]>([]);

  // LẦN ĐẦU CALL API LẤY YTD
  useEffect(() => {
    const fetchInitialData = async () => {
      const now = getCurrentUnixTimestamp();
      const start = getStartOfYear(); 
      await dispatch(fetchPriceStocks({ symbol, start, end: now, interval: '1D', type: 1, limit: 90 }));
    };
    fetchInitialData(); 
  }, [dispatch, symbol]);
  
  useEffect(() => {
    setStockData(selectPriceStocks);
  }, [selectPriceStocks]);

  // TẠO CHART===========================================
  useEffect(() => {
    const seriesData = data.map((point) => [
      point.time,
      point.open,
      point.high,
      point.low,
      point.close,
    ]);

    // Tính toán màu cho volume dựa trên giá đóng cửa và mở cửa
    const volumeData = data.map((point) => ({
      x: point.time,
      y: point.volume,
      color: point.close >= point.open ? '#0ECB81' : '#F6465D'
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
        annotations: [ {

          labels: [],
          shapes: [],
          draggable: 'xy',
          shapeOptions: {
            stroke: 'orange',
            strokeWidth: 2,
          },
        }],
        chart: {
          backgroundColor: 'rgb(24 26 32)',
          renderTo: chartContainerRef.current,
        },       
        tooltip: {
          useHTML: true,
          backgroundColor: 'none', 
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
            color: '#0ECB81',       
          },
        },
        series: [
          {
            type: 'candlestick',
            id: `${symbol}-ohlc`,
            name: `${symbol} Stock Price`,
            data: seriesData,
          }, {
            type: 'column',
            id: `${symbol}-Volume`,
            name: `${symbol} Volume`,
            data: volumeData,
            yAxis: 1
          }
        ],
        xAxis: {
          
          type: 'datetime',
          gridLineColor: '#2B3139',
          labels: {
            style: {
              color: '#ffffff'
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
        }]

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
            height: '80%',
            resize: {
              enabled: true
            },
            crosshair: {
              color: '#cccccc',
              width: 1,
              dashStyle: 'ShortDot',
            },
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
            offset: 0,
          },
          
        ],
        navigator: {
          enabled: false
        },
        rangeSelector: {
          selected: 4,
          enabled: false,
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
      };
      chartRef.current = Highcharts.stockChart(chartOptions);
    }
  }, [data]);

  return <div id='container-technical-chart-azz' ref={chartContainerRef} style={{ height: '600px', width: '100%' }} />;
};

export default CandlestickChart;