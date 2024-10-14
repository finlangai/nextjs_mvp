import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Dữ liệu giả lập cho 10 năm, chia thành 5 năm lịch sử và 5 năm dự báo cho 3 chỉ số
const historicalData1 = [
  { year: '2015', value: 5 },
  { year: '2016', value: 6 },
  { year: '2017', value: 7 },
  { year: '2018', value: 8 },
  { year: '2019', value: 9 }
];

const forecastData1 = [
  { year: '2020', value: 5 },
  { year: '2021', value: 7 },
  { year: '2022', value: 6 },
  { year: '2023', value: 8 },
  { year: '2024', value: 9 }
];

const historicalData2 = [
  { year: '2015', value: 4 },
  { year: '2016', value: 5 },
  { year: '2017', value: 6 },
  { year: '2018', value: 7 },
  { year: '2019', value: 8 }
];

const forecastData2 = [
  { year: '2020', value: 4 },
  { year: '2021', value: 6 },
  { year: '2022', value: 5 },
  { year: '2023', value: 7 },
  { year: '2024', value: 8 }
];

const historicalData3 = [
  { year: '2015', value: 3 },
  { year: '2016', value: 4 },
  { year: '2017', value: 5 },
  { year: '2018', value: 6 },
  { year: '2019', value: 7 }
];

const forecastData3 = [
  { year: '2020', value: 3 },
  { year: '2021', value: 5 },
  { year: '2022', value: 4 },
  { year: '2023', value: 6 },
  { year: '2024', value: 7 }
];

const ROIChart = () => {
  const chartOptions = {
    chart: {
      type: 'spline', // Đường cong uốn lượn
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        ...historicalData1.map(item => item.year),
        ...forecastData1.map(item => item.year)
      ],
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white' // Đổi màu cho các giá trị trục X
        }
      },
      plotBands: [{ // Vùng màu phủ cho năm dự báo
        from: historicalData1.length - 0.5, // Bắt đầu từ vị trí của phần tử đầu tiên trong dự báo
        to: historicalData1.length + forecastData1.length - 0.5,   // Đến vị trí của phần tử cuối cùng trong dự báo
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
      min: 0,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'white'
        }
      },
      gridLineColor: '#2B3139',
      tickAmount: 5,
    },
    series: [
      {
        name: 'Chỉ số 1',
        data: [
          ...historicalData1.map(item => item.value),
          ...forecastData1.map(item => item.value)
        ],
        color: '#25B770', // Màu cho chỉ số 1
        marker: {
          enabled: true, // Hiển thị các chấm tròn
          radius: 4 // Kích thước chấm tròn
        },
      },
      {
        name: 'Chỉ số 2',
        data: [
          ...historicalData2.map(item => item.value),
          ...forecastData2.map(item => item.value)
        ],
        color: 'white', // Màu cho chỉ số 2
        marker: {
          enabled: true, // Hiển thị các chấm tròn
          radius: 4 // Kích thước chấm tròn
        },
      },
      {
        name: 'Chỉ số 3',
        data: [
          ...historicalData3.map(item => item.value),
          ...forecastData3.map(item => item.value)
        ],
        color: '#FF6347', // Màu cho chỉ số 3
        marker: {
          enabled: true, // Hiển thị các chấm tròn
          radius: 4 // Kích thước chấm tròn
        },
      }
    ],
    plotOptions: {
      spline: {
        borderColor: 'transparent',
        borderWidth: 2
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false // Ẩn nút menu
    },
    legend: {
      enabled: false, // Hiển thị chú giải (legend)
      itemStyle: {
        color: 'white' // Đổi màu chữ cho legend
      }
    }
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default ROIChart;
