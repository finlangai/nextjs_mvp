import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

const RevenueGrowthRateChart = () => {
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
        ...historicalData.map(item => item.year),
        ...forecastData.map(item => item.year)
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
        from: historicalData.length - 0.5, // Bắt đầu từ vị trí của phần tử đầu tiên trong dự báo
        to: historicalData.length + forecastData.length - 0.5, 
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
        name: 'Tỷ lệ tăng trưởng',
        data: [
          ...historicalData.map(item => item.value),
          ...forecastData.map(item => item.value)
        ],
        color: '#25B770', // Màu cho đường lợi nhuận
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
      },
      
      
    ],
    plotOptions: {
      column: {
        borderColor: 'none' // Xóa màu viền cho các cột
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

export default RevenueGrowthRateChart;
