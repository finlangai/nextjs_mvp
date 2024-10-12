import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function MarginalProfitChart(){
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
        categories: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
        labels: {
        style: {
            color: '#ffffff' // Màu chữ trục x
        }
        }
    },
    yAxis: {
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
        tickAmount: 5,
        gridLineColor: '#2B3139',
    }, 
    
    plotOptions: {
        column: {
            stacking: 'normal' 
        }
    },
    series: [
        {
            name: 'Biên lợi nhuận gộp',
            data: [500, 700, 900, 850, 1000, 258, 300, 250, 250, 250],
            color: '#25B770'
        }, {
            name: 'Biên lợi nhuận ròng',
            data: [100, 150, 200, 180, 250, 258, 300, 250, 250, 250],
            color: 'white'
        }
    ],
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false // Ẩn nút menu
    },
    };
    
    return (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    );
}
