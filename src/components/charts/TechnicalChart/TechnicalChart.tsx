import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';

import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";

// Kích hoạt các module
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

interface DataPoint {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  data: DataPoint[];
}

// Extended Point interface để thêm các thuộc tính cần thiết
interface ExtendedPoint extends Highcharts.Point {
  plotX?: number;
  plotY?: number;
  isHeader?: boolean;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

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

    // Tạo biểu đồ
    if (chartContainerRef.current) {
      const chartOptions: Highcharts.Options = {
        chart: {
          backgroundColor: 'transparent',
          renderTo: chartContainerRef.current
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
          column: {
            color: 'white',       
          }
        },
        stockTools: {
          gui: {
            buttons: [ 'separator', 'simpleShapes', 'lines', 'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels', 'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator', 'currentPriceIndicator', 'saveChart' ]
          }
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
        title: {text: undefined},
        legend: {
          enabled: false,
        },
        tooltip: {
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,
          positioner: function (this: Highcharts.Tooltip, width: number, height: number, point: ExtendedPoint): Highcharts.PositionObject {
            const chart = this.chart;
            let position: Highcharts.PositionObject;
    
            if (point.isHeader) {
              const plotX = point.plotX || 0;
              const plotY = point.plotY || 0;
              
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

      Highcharts.stockChart(chartOptions);
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default CandlestickChart;