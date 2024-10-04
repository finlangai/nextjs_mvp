import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = () => {
    const chartOptions = {
        chart: {
            type: 'spline', // Sử dụng đường cong mượt (spline)
            backgroundColor: 'none', // Màu nền tối
            borderRadius: 10, // Tạo bo góc cho biểu đồ nếu cần
            height: '103px', // Tùy chỉnh chiều cao
            width: null,
        },
        title: {
            text: null, // Không hiển thị tiêu đề
        },
        xAxis: {
            visible: false, // Ẩn trục X
        },
        yAxis: {
            visible: false, // Ẩn trục Y
        },
        series: [
            {
                data: [5, 2, 3, 6, 2, 1, 9, 5, 7, 6, 4, 5], // Dữ liệu mẫu
                color: '#fff', // Màu của đường (trắng để nổi bật trên nền tối)
                lineWidth: 2, // Độ dày của đường
                marker: {
                    enabled: false, // Ẩn các chấm tròn trên đường
                    states: {
                        hover: {
                          enabled: false, // Loại bỏ các chấm khi hover
                        },
                    },
                },
            },
        ],
        legend: {
            enabled: false, // Ẩn chú giải (legend)
        },
        credits: {
            enabled: false, // Ẩn thông tin bản quyền ở góc dưới
        },
        tooltip: {
            enabled: false, // Ẩn tooltip khi hover
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LineChart;
