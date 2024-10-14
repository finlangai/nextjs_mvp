import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';

// Khởi tạo module
if (typeof Highcharts === 'object') {
  HC_more(Highcharts);
}

// Dữ liệu giả lập cho 10 năm, chia thành 5 năm lịch sử và 5 năm dự báo cho một chỉ số
const historicalData = [
  { year: '2015', value: 5 },
  { year: '2016', value: 6 },
  { year: '2017', value: 7 },
  { year: '2018', value: 8 },
  { year: '2019', value: 9 }
];

const forecastData = [
  { year: '2020', value: 5 },
  { year: '2021', value: 7 },
  { year: '2022', value: 6 },
  { year: '2023', value: 8 },
  { year: '2024', value: 9 }
];

const EPSChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'waterfall',
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      style: {
        color: '#ffffff'
      }
    },
    xAxis: {
      categories: [
        ...historicalData.map(item => item.year),
        ...forecastData.map(item => item.year)
      ],
      type: 'category',
      labels: {
        style: {
          color: '#ffffff'
        }
      },
      plotBands: [{ // Vùng màu phủ cho năm dự báo
        from: historicalData.length - 0.5, // Bắt đầu từ vị trí của phần tử đầu tiên trong dự báo
        to: historicalData.length + forecastData.length - 0.5,   // Đến vị trí của phần tử cuối cùng trong dự báo
        color: '#1E2026',
        label: {
          text: 'Dự báo',
          style: {
            color: 'white'
          }
        }
      }],
    },
    yAxis: {
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
      gridLineColor: '#2B3139',
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: '<b>${point.y:,.2f}</b> USD'
    },
    series: [{
      type: 'waterfall',
      color: 'transparent',
      borderColor: '#25B770',  
      data: [
        ...historicalData.map(item => item.value),
        ...forecastData.map(item => item.value)
      ],
      dataLabels: {
        enabled: true,
        formatter: function (this: Highcharts.PointLabelObject): string {
          return Highcharts.numberFormat(this.y ?? 0, 0, ',') + ' $';
        },
        style: {
          color: '#FFFFFF',
          fontWeight: 'bold',
          textOutline: 'none'
        }
      },
      pointPadding: 0
    }],
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default EPSChart;