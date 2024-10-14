import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Dữ liệu giả lập cho 10 năm, chia thành 5 năm lịch sử và 5 năm dự báo cho hai chỉ số
const historicalDataColumn = [
  { year: '2015', value: 5 },
  { year: '2016', value: 6 },
  { year: '2017', value: 7 },
  { year: '2018', value: 8 },
  { year: '2019', value: 9 }
];

const forecastDataColumn = [
  { year: '2020', value: 5 },
  { year: '2021', value: 7 },
  { year: '2022', value: 6 },
  { year: '2023', value: 8 },
  { year: '2024', value: 9 }
];

const historicalDataLine = [
  { year: '2015', value: 4 },
  { year: '2016', value: 5 },
  { year: '2017', value: 6 },
  { year: '2018', value: 7 },
  { year: '2019', value: 8 }
];

const forecastDataLine = [
  { year: '2020', value: 4 },
  { year: '2021', value: 6 },
  { year: '2022', value: 5 },
  { year: '2023', value: 7 },
  { year: '2024', value: 8 }
];

const FreeCashFlowGrowthRateChart = () => {
  const chartOptions = {
    chart: {
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        ...historicalDataColumn.map(item => item.year),
        ...forecastDataColumn.map(item => item.year)
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
        from: historicalDataColumn.length - 0.5, // Bắt đầu từ vị trí của phần tử đầu tiên trong dự báo
        to: historicalDataColumn.length + forecastDataColumn.length - 0.5,   // Đến vị trí của phần tử cuối cùng trong dự báo
        color: '#1E2026',
        label: {
          text: 'Dự báo',
          style: {
            color: 'white'
          }
        }
      }],
    },
    yAxis: [{
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
    }],
    series: [
      {
        type: 'column',
        name: 'Tỷ lệ tăng trưởng (Cột)',
        data: [
          ...historicalDataColumn.map(item => item.value),
          ...forecastDataColumn.map(item => item.value)
        ],
        color: '#25B770' // Màu cho cột
      },
      {
        type: 'spline',
        name: 'Tỷ lệ tăng trưởng (Đường)',
        data: [
          ...historicalDataLine.map(item => item.value),
          ...forecastDataLine.map(item => item.value)
        ],
        color: 'white', // Màu cho đường
        marker: {
          enabled: true, // Hiển thị các chấm tròn
          radius: 4 // Kích thước chấm tròn
        },
        dataLabels: {
          enabled: true, // Hiển thị nhãn trên đường
          style: {
            color: 'white',
            textOutline: 'none'
          }
        },
        dashStyle: 'ShortDot' // Đường dự báo thành ShortDot
      }
    ],
    plotOptions: {
      column: {
        borderColor: 'none'
      },
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

export default FreeCashFlowGrowthRateChart;
