import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StackedColumnChart = () => {
  const options = {
    credits: {
      enabled: false // Vô hiệu hóa watermark Highcharts.com
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
      categories: ['2019', '2020', '2021', '2022', '2023'],
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
      tickAmount: 5, // Đặt số lượng vạch tối đa cho trục y đầu tiên
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
      tickAmount: 5, // Đặt số lượng vạch tối đa cho trục y thứ hai
      opposite: true, // Hiển thị trục y bên phải
      gridLineWidth: 0 // Ẩn lưới
    }],
    plotOptions: {
      column: {
        stacking: 'normal',
        borderColor: 'none'
      }
    },
    series: [{
      name: 'Doanh thu',
      data: [500, 700, 900, 850, 1000],
      color: '#25B770'
    }, {
      name: 'LNST',
      data: [100, 150, 200, 180, 250],
      color: 'white'
    }, {
      type: 'spline', // Đường line cho biên lợi nhuận ròng
      name: 'Biên lợi nhuận ròng',
      data: [20, 21.5, 22.2, 21.2, 25],
      yAxis: 1, // Trục y thứ 2 (bên phải)
      color: 'rgb(128 37 183)',
      marker: {
        lineWidth: 2,
        lineColor: 'rgb(128 37 183)',
        fillColor: 'white'
      },
    }],
    legend: {
      itemStyle: {
        color: '#ffffff' // Màu chữ của chú giải (legend)
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
