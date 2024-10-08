import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';

highchartsMore(Highcharts);

const CustomGaugeChart = ({ value = 80.9, title = "Đầu tư" }) => {
  const options = {
    credits: {
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
    title: null,
    pane: {
      startAngle: -130, 
      endAngle: 130,   
      background: null,
      center: ['50%', '65%'], // Điều chỉnh vị trí trung tâm lên cao hơn một chút
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
          to: 33,
          color: '#FF4560',
          thickness: 20
        },
        {
          from: 33,
          to: 67,
          color: '#FEB019',
          thickness: 20
        },
        {
          from: 67,
          to: 100,
          color: '#00E396',
          thickness: 20
        }
      ]
    },
    series: [{
      name: 'Điểm',
      data: [value],
      dial: {
        radius: '50%',
        backgroundColor: 'white',
        baseWidth: 3,
        topWidth: 1,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'white',
        radius: 6
      },
      dataLabels: {
        enabled: false,
        format: '{y}',
        y: 30, // Điều chỉnh vị trí của số
        borderWidth: 0,
        style: {
          fontSize: '24px',
          color: 'white',
          fontWeight: 'bold'
        }
      }
    }]
  };

  return (
    <div className="text-center">
      <HighchartsReact highcharts={Highcharts} options={options}/>
      <div className="text-fintown-txt-1 text-[24px] font-bold mt-[32px]">{value}</div>
      <div className="text-green-400 text-[16px] font-bold mb-[62px]">{title}</div>

      <div className="flex justify-between space-x-4 mt-2 text-sm">
        <div className="flex items-center gap-x-[5px]">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
          <span className="text-white">Đầu tư</span>
        </div>
        <div className="flex items-center gap-x-[5px]">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span className="text-white">Bán</span>
        </div>
        <div className="flex items-center gap-x-[5px]">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span className="text-white">Quan sát</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CustomGaugeChart value={80.9} />
  );
}