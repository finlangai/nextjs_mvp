import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { selectDarkMode } from '@/src/redux/darkmode';
import { useAppSelector } from "@/src/redux/hooks/useAppStore";

// Khởi tạo module
if (typeof Highcharts === 'object') {
  HC_more(Highcharts);
}

const EPSChart = ({ data }: { data: Metric[] }) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  // Tính toán sự thay đổi hàng năm
  const historicalData = data[0].historical;
  const forecastData = data[0].forecast;

  const waterfallData = [...historicalData, ...forecastData].map((item, index, arr) => {
    if (index === 0) return { name: item.year.toString(), y: item.value }; // Điểm khởi đầu
    return {
      name: item.year.toString(), // Chuyển đổi 'year' thành chuỗi
      y: item.value - arr[index - 1].value // Sự thay đổi giữa năm hiện tại và năm trước đó
    };
  });

  const options: Highcharts.Options = {
    chart: {
      type: 'waterfall',
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
      style: {
        color: `${isDarkMode ? '#232323' : '#EAECEF'}`
      }
    },
    xAxis: {
      categories: waterfallData.map(item => item.name),
      type: 'category',
      labels: {
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        }
      },
      plotBands: [{
        from: historicalData.length - 0.5,
        to: historicalData.length + forecastData.length - 0.5,
        color: `${isDarkMode ? '#EAECEF' : 'rgb(217 217 217 / 5%)'}`,
        label: {
          text: 'Dự báo',
          style: {
            color: `${isDarkMode ? '#232323' : '#EAECEF'}`
          }
        }
      }],
    },
    yAxis: {
      title: {
        text: '',
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        }
      },
      labels: {
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`
        }
      },
      gridLineColor: `${isDarkMode ? '#D9D9D9' : '#2B3139'}`,
      tickAmount: 5,
      min: 0,
    },
    tooltip: {
      pointFormat: '<b>{point.y:,.2f}</b> (VNĐ/CP)'
    },
    series: [{
      type: 'waterfall',
      color: 'transparent',
      borderColor: '#25B770',
      data: waterfallData,
      dataLabels: {
        enabled: true,
        formatter: function (this: Highcharts.PointLabelObject): string {
          return Highcharts.numberFormat(this.y ?? 0, 0, ',');
        },
        style: {
          color: `${isDarkMode ? '#232323' : '#EAECEF'}`,
          fontWeight: 'bold',
          textOutline: 'none'
        }
      },
      pointPadding: 0,
    }],
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
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
