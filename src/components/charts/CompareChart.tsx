// CompareChart.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useEffect, useMemo } from 'react';
import { selectCompanyData } from '@/src/redux/Comparison';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

// Initialize the Spiderweb (Radar) chart module
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
}

const CompareChart: React.FC = () => {
  const companyData = useAppSelector(selectCompanyData);
  const colors = ['#64E766', '#E7E575', '#E565A1', '#9552CF', '#66BED6'];

  const chartData = useMemo(() => {
    return companyData.map((company, index) => ({
      name: company.symbol,
      type: 'area' as const,
      data: [
        parseFloat(company?.comparison?.revenueProfit?.toFixed(2)),
        parseFloat(company?.comparison?.momentum?.toFixed(2)),
        parseFloat(company?.comparison?.dividend?.toFixed(2)),
        parseFloat(company?.comparison?.trending?.toFixed(2)),
        parseFloat(company?.comparison?.returns?.toFixed(2)),
      ],
      pointPlacement: 'on',
      color: colors[index % colors.length], 
      fillColor: `${colors[index % colors.length]}80`,
    }));
  }, [companyData, colors]);
  
  const options: Highcharts.Options = {
    series: chartData,
    chart: {
      polar: true,
      type: 'area',
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    pane: {
      size: '90%',
    },
    xAxis: {
      categories: [
        'Doanh thu & lợi nhuận',
        'Hiệu suất giá',
        'Cổ tức',
        'Xu hướng',
        'Thu nhập',
      ],
      tickmarkPlacement: 'on',
      gridLineColor: '#848E9C',
      lineWidth: 0,
      labels: {
        style: {
          color: '#ffffff',
          distance: 20,
        },
      },
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      gridLineColor: '#848E9C',
      lineWidth: 0,
      min: 0,
      labels: {
        style: {
          color: '#ffffff',
          distance: 20,
        },
        enabled: false,
      },
    },

    tooltip: {
      shared: true, // Hiển thị tất cả series trong một tooltip
      useHTML: true, // Dùng HTML để tùy chỉnh
      backgroundColor: 'transparent', // Xóa màu nền

      formatter: function () {
        const xAxisLabel = this.x || ''; 
        let tooltipHTML = `
          <div style="font-size: 14px; color: #ffffff; margin-bottom: 20px;">
            <b>${xAxisLabel}</b>
          </div>`; 
    
        // Kiểm tra `this.points` để tránh undefined
        if (this.points) {
          this.points.forEach((point) => {
            const seriesName = `
            <span style="color:${point.color}; font-weight: bold;">
              ${point.series?.name || 'Unknown'}
            </span>`;
            const pointValue = `
            <span style="font-size: 14px; color: #dddddd;">
              ${point.y?.toFixed(2) || 'N/A'}
            </span>`;
            tooltipHTML += `
            <div style="padding: 10px 0px; border-top: 1px solid; display:flex; align-items: center; ">
              <div style="marginRight:10px;">${seriesName}<b style="color:white;">: </b> </div>
              <div>${pointValue}</div>
            </div>`;
          });
        }
    
        return `<div style="background-color: #1E2329; padding: 20px; border-radius: 5px; width: 200px; opacity: 0.7;">
            ${tooltipHTML}
          </div>`;
      },
    },
      
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CompareChart;
