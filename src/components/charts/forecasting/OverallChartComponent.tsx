import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { Criterias } from '@/src/interfaces/ForecastingOverallAssessment';
import { selectForecastingOverallAssessmentData } from '@/src/redux/ForecastingOverallAssessment';
import { convertToSignals, SignalInterface, finalStatus } from '@/src/utils/convertToSignals';
import { selectDarkMode } from '@/src/redux/darkmode';

highchartsMore(Highcharts);

const OverallChart = dynamic(() => {
  return import('./OverallChartComponent').then(mod => mod.default);
}, {
  ssr: false,
});

const CustomGaugeChart= ({ signals } : {signals: SignalInterface[]; title?: string}) => {
  const isDarkMode = useAppSelector(selectDarkMode);
  // console.log('vv', isDarkMode ? '#232323' : '#EAECEF')

  // Đợi isDarkMode có giá trị trước khi render
  if (typeof isDarkMode === "undefined") return null;

  const result = finalStatus({ signals });
  
  const options = {
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    chart: {
      type: 'gauge',
      backgroundColor: 'transparent',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '180px',
      spacing: [0, 0, 0, 0]
    },
    title: {
      text: '',
      style: {
        color: `${isDarkMode ? '#EAECEF' : '#232323'}`
      }
    },
    tooltip: { enabled: false },
    pane: {
      startAngle: -130,
      endAngle: 130,
      background: null,
      center: ['50%', '65%'],
      size: '100%'
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
      minorTickLength: 0,
      labels: {
        enabled: false
      },
      plotBands: [
        {
          from: 0,
          to: 25,
          color: '#FF0000', // Rất kém
          thickness: 20
        },
        {
          from: 25,
          to: 50,
          color: '#FF4560', // Không ổn định
          thickness: 20
        },
        {
          from: 50,
          to: 75,
          color: '#00E396', // Tốt
          thickness: 20
        },
        {
          from: 75,
          to: 100,
          color: '#8A47FF', // Rất tốt
          thickness: 20
        }
      ]
    },
    series: [{
      name: 'Trạng thái',
      data: [result?.value],
      dial: {
        radius: '50%',
        backgroundColor: `${isDarkMode ? '#232323' : '#EAECEF'}`,
        baseWidth: 3,
        topWidth: 1,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: `${isDarkMode ? '#232323' : '#EAECEF'}`,
        radius: 6
      },
      dataLabels: {
        enabled: false
      }
    }]
  };

  return (
    <div className="text-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[24px] font-bold mb-[62px] mt-[39px]">{result?.status}</div>
      <div className="flex flex-col space-y-2 mt-2 text-sm">
        <div className="flex justify-between space-x-4 mt-2 text-sm">

          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-stt-sell mr-1"></div>
            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px]">Xấu</span>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-[#FF0000] mr-1"></div>
            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px]">Rất xấu</span>
          </div>

          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-stt-buy mr-1"></div>
            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px]">Tốt</span>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-chart-4 mr-1"></div>
            <span className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px]">Rất tốt</span>
          </div>

        </div>
      </div>
    </div>
  );
};

const OverallChartComponent = () => {
  const [NowData, setNowData] = useState<Criterias | null>(null);
  const forecastingData = useAppSelector(selectForecastingOverallAssessmentData);
  const [signals, setSignals] = useState<SignalInterface[]>([]);

  useEffect(()=> {
    if (forecastingData?.criterias) {
        setNowData(forecastingData.criterias)
    }
  }, [forecastingData]);

  useEffect(()=> {
    if (forecastingData?.criterias) {
        setNowData(forecastingData?.criterias);
        if (NowData) {
          const x = convertToSignals(NowData);
          setSignals(x)
        }
    }
  }, [NowData]);

  return (
    <>
      <CustomGaugeChart signals={signals} />
    </>
  );
}

export default OverallChartComponent;

