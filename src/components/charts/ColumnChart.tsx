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
      backgroundColor: 'transparent' // Nền trong suốt, phù hợp dark mode
    },
    title: {
      text: '',
      style: {
        color: '#ffffff' // Màu tiêu đề phù hợp với dark mode
      }
    },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023'],
      labels: {
        style: {
          color: '#ffffff' // Màu chữ trục x
        }
      }
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
      gridLineWidth: 0 // Ẩn lưới
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
      opposite: true, // Hiển thị trục y bên phải
      gridLineWidth: 0 // Ẩn lưới
    }],
    plotOptions: {
      column: {
        stacking: 'normal' // Cột chồng lên nhau
      }
    },
    series: [{
      name: 'Doanh thu',
      data: [500, 700, 900, 850, 1000],
      color: '#7cb5ec'
    }, {
      name: 'LNST',
      data: [100, 150, 200, 180, 250],
      color: '#434348'
    }, {
      type: 'spline', // Đường line cho biên lợi nhuận ròng
      name: 'Biên lợi nhuận ròng',
      data: [20, 21.5, 22.2, 21.2, 25],
      yAxis: 1, // Trục y thứ 2 (bên phải)
      color: '#f45b5b',
      marker: {
        lineWidth: 2,
        lineColor: '#f45b5b',
        fillColor: 'white'
      }
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
