// CompareChart.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useEffect } from 'react';

// Initialize the Spiderweb (Radar) chart module
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
}

const CompareChart: React.FC = () => {
  const options: Highcharts.Options = {
    series: [
        {
          name: 'Car A',
          type: 'area',
          data: [80, 90, 70, 85, 60],
          pointPlacement: 'on',
          color: '#FF5733', 
          fillColor: 'rgba(255, 87, 51, 0.5)',
        },
        {
          name: 'Car B',
          type: 'area',
          data: [70, 80, 90, 75, 85],
          pointPlacement: 'on',
          color: '#33FF57', 
          fillColor: 'rgba(51, 255, 87, 0.5)',
        },
    ],
    chart: {
      polar: true,
      type: 'area',
      backgroundColor: "transparent"
    },
    title: {
      text: '',
    },
    pane: {
      size: '90%',
    },
    xAxis: {
      categories: ['Tài sản & vốn chủ sở hữu ', 'Khả năng thanh toán', 'Hiệu quả sinh lời', 'Doanh thu & lợi nhuận', 'Dòng tiền'],
      tickmarkPlacement: 'on',
      gridLineColor: '#848E9C', 
      lineWidth: 0,
      labels: {
        style: {
            color: '#ffffff',
            distance: 20 
        }
      }
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      gridLineColor: '#848E9C', 
      lineWidth: 0,
      min: 0,
      labels: {
        style: {
            color: '#ffffff',
            distance: 20 
        },
        enabled: false
      }
    },
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>',
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    }

  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CompareChart;
