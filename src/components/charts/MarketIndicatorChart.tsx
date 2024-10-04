import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

// Dữ liệu giả lập cho VN30 5 năm
const mockData = [
  { date: '2020', price: 900 },
  { date: '2021', price: 1000 },
  { date: '2022', price: 1200 },
  { date: '2023', price: 1100 },
  { date: '2024', price: 1300 }
];

const MarketIndicatorChart = () => {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    // Chuyển đổi dữ liệu cho Highcharts
    const categories = mockData.map(data => data.date);
    const seriesData = mockData.map(data => data.price);

    setChartOptions({
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
        title: {
          text: ''
        },
        labels: {
            style: {
              color: 'white' // Đổi màu cho các giá trị trục Y
            }
        },
      },
      yAxis: {
        title: {
          text: ''
        },
        gridLineWidth: 0, // Ẩn lưới của trục Y
        opposite: true,
        labels: {
            style: {
              color: 'white' // Đổi màu cho các giá trị trục Y
            }
        },
      },
      series: [
        {
          name: 'VN30',
          data: seriesData,
          color: "white",
          showInLegend: false
        }
      ],
      chart: {
        type: 'line',
        backgroundColor: 'transparent', // Ẩn màu nền
        width: null,   // Tùy chỉnh chiều rộng
        height: "300px"  // Tùy chỉnh chiều cao
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }, []);

  return (
    <>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </>
  );
};

export default MarketIndicatorChart;
