import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';

highchartsMore(Highcharts);

interface Signal {
  name: string;
  isPositive: boolean;
}

interface CustomGaugeChartProps {
  signals: Signal[];
  title?: string;
}

const CustomGaugeChart: React.FC<CustomGaugeChartProps> = ({ signals, title = "Đầu tư" }) => {
  const positiveSignals = signals.filter(signal => signal.isPositive).length;
  let status: 'Rất tốt' | 'Tốt' | 'Không ổn định';
  let value: number;
  let color: string;

  if (positiveSignals === 3) {
    status = 'Rất tốt';
    value = 90;
    color = 'rgb(138 71 255)';
  } else if (positiveSignals === 2) {
    status = 'Tốt';
    value = 60;
    color = '#00E396';
  } else {
    status = 'Không ổn định';
    value = 30;
    color = '#FF4560';
  }

  const options = {
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false // Ẩn nút menu
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
          to: 33,
          color: '#FF4560',
          thickness: 20
        },
        {
          from: 33,
          to: 67,
          color: '#00E396',
          thickness: 20
        },
        {
          from: 67,
          to: 100,
          color: 'rgb(138 71 255)',
          thickness: 20
        }
      ]
    },
    series: [{
      name: 'Trạng thái',
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
        enabled: false
      }
    }]
  };

  return (
    <div className="text-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="text-fintown-txt-1 text-[24px] font-bold mb-[62px] mt-[39px]">{status}</div>
      {/* <div className="text-green-400 text-[16px] font-bold mb-[62px]">{status}</div> */}
      <div className="flex flex-col space-y-2 mt-2 text-sm">
        <div className="flex justify-between space-x-4 mt-2 text-sm">
          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-stt-buy mr-1"></div>
            <span className="text-white">Tốt</span>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-chart-4 mr-1"></div>
            <span className="text-white">Rất tốt</span>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <div className="w-3 h-3 rounded-full bg-fintown-stt-sell mr-1"></div>
            <span className="text-white">Không ổn định</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const signals: Signal[] = [
    { name: "Tín hiệu 1", isPositive: false },
    { name: "Tín hiệu 2", isPositive: false },
    { name: "Tín hiệu 3", isPositive: true },
  ];

  return (
    <CustomGaugeChart signals={signals} />
  );
}