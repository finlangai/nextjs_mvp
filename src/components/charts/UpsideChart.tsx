import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Đảm bảo rằng bạn đã thêm module "highcharts-more" để hỗ trợ biểu đồ hình donut
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

interface DonutChartProps {
  stockPrice: number;
  upside: number;
}

const UpsideChart: React.FC<DonutChartProps> = ({ stockPrice, upside }) => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: "180px"

    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: '80%',
        startAngle: -145,
        endAngle: 145,
        dataLabels: {
          enabled: false,
          
        },
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Upside',
        data: [
          {
            y: upside,
            color: '#25B770', // Màu xanh cho phần đã hoàn thành
          },
          {
            y: 100 - upside,
            color: '#F0E5FC', // Màu xám nhạt cho phần còn lại
          },
        ],
      },
    ],
    // tooltip: {
    //   enabled: false,
    // },
    credits: {
      enabled: false,
    },
  };

  return (
    <>
    <div className='relative'>
        <div className='absolute w-full h-full top-0 flex items-center flex-col justify-center'>
            <div className='text-fintown-txt-1 flex items-end'>
                <div className='font-bold text-[24px]'>24</div>
                <div className='text-[12px] mb-[5px]'>%</div>
            </div>

            <div className='text-[12px] text-fintown-txt-1'>
                Upside
            </div>
        </div>
        <div className='min-w-[180px] max-h-[180px]'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    </div>
    </>
  );
};

export default UpsideChart;
