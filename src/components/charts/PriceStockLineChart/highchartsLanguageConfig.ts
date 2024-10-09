import Highcharts from 'highcharts';

export const configureHighchartsLanguage = () => {
  Highcharts.setOptions({
    lang: {
      months: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ],
      shortMonths: [
        'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
        'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
      ],
      weekdays: [
        'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư',
        'Thứ năm', 'Thứ sáu', 'Thứ bảy'
      ],
      resetZoom: 'Đặt lại zoom',
      resetZoomTitle: 'Đặt lại mức zoom 1:1'
    }
  });
};