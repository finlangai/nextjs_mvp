import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HistoricalData } from "@/src/interfaces/BestNPM";
import { useAppSelector } from "@/src/redux/hooks/useAppStore";
import { selectBestNPMData } from "@/src/redux/BestNPM";
import { selectDarkMode } from '@/src/redux/darkmode';

const StackedColumnChart = () => {
  const isDarkMode = useAppSelector(selectDarkMode);

  const bestNPMData = useAppSelector(selectBestNPMData);
  const [NowData, setNowData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    if (bestNPMData && bestNPMData?.historical?.length > 0) {
      setNowData(bestNPMData?.historical);
    }
  }, [bestNPMData]);

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
        color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
      }
    },
    xAxis: {
      categories: NowData.map(d => d.year.toString()),
      labels: {
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
        }
      },
    },
    yAxis: [{
      title: {
        text: '',
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
        }
      },
      labels: {
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
        }
      },
      tickAmount: 5,
      gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
    }, {
      title: {
        text: '',
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        }
      },
      labels: {
        format: '{value}%',
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
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
      color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
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
