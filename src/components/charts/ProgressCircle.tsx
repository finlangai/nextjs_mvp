import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
  SolidGauge(Highcharts);
}

const SemiCircularGauge: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
      backgroundColor: "transparent",
      width: 100,
      height: "100%"
    },
    credits: {
        enabled: false
    },
    title: {
      text: undefined,
    },
    pane: {
      startAngle: -140,
      endAngle: 140,
      background: [{
        backgroundColor: '#2B3139',
        innerRadius: '98%', 
        outerRadius: '100%',
        shape: 'arc'
      }]
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickWidth: 0, // Ẩn các vạch trên vòng tròn
      minorTickInterval: undefined, // Ẩn các vạch nhỏ
      tickAmount: 0, // Ẩn các vạch chính
      labels: {
        enabled: false // Ẩn nhãn
      },
      stops: [
        [0.1, '#55BF3B'], // Green
        [0.5, '#DDDF0D'], // Yellow
        [0.9, '#DF5353'] // Red
      ]
    },
    plotOptions: {
      solidgauge: {
        innerRadius: '98%', // Điều chỉnh độ dày của phần tô màu
        radius: '100%',
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
          format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            '<span style="font-size:12px;color:silver">Điểm</span></div>',
        enabled: false
        }
      }
    },
    series: [{
      type: 'solidgauge',
      data: [80],
    }],
    tooltip: { enabled: false}
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options}  />
  );
};

export default SemiCircularGauge;
