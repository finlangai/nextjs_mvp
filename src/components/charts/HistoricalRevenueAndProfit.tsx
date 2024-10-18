import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HistoricalData } from "@/src/interfaces/BestNPM";
import { useAppSelector } from "@/src/redux/hooks/useAppStore";
import { selectBestNPMData } from "@/src/redux/BestNPM";

const StackedColumnChart = () => {
  const bestNPMData = useAppSelector(selectBestNPMData);
  const [NowData, setNowData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    if (bestNPMData && bestNPMData?.historical?.length > 0) {
      setNowData(bestNPMData?.historical);
    }
  }, [bestNPMData]);
  console.log('NowData:', NowData); // Kiểm tra dữ liệu NowData

  const options = {

    
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      style: {
        color: '#ffffff'
      }
    },
    xAxis: {
      categories: NowData.map(d => d.year.toString()),
      labels: {
        style: {
          color: '#ffffff'
        }
      },
    },
    yAxis: [{
      title: {
        text: '',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        style: {
          color: '#ffffff'
        }
      },
      tickAmount: 5,
      gridLineColor: '#2B3139',
    }, {
      title: {
        text: '',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        format: '{value}%',
        style: {
          color: '#ffffff'
        }
      },
      tickAmount: 5,
      opposite: true,
      gridLineWidth: 0
    }],
    plotOptions: {
      column: {
        stacking: 'normal',
        borderColor: 'none'
      }
    },
    series: [{
      name: 'Doanh thu',
      data: NowData.map(d => d?.revenue),
      color: '#25B770'
    }, {
      name: 'LNST',
      data: NowData.map(d => d?.net_profit),
      color: 'white',
      type: 'column'
    }, {
      type: 'spline',
      name: 'Biên lợi nhuận ròng',
      data: NowData.map(d => d?.npm),
      yAxis: 1,
      color: '#FF6347',
      marker: {
        lineWidth: 2,
        lineColor: '#FF6347',
        fillColor: 'white'
      },
    }],
    legend: {
      enabled: false ,// Ẩn chú giải (legend)
      itemStyle: {
        color: '#ffffff'
      }
    }
  };


  return (
    <div>
      
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StackedColumnChart;
