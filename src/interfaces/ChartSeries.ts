export interface ChartSeries {
    name: string; // Tên chỉ số
    type: 'spline' | 'column' | 'line' | 'waterfall'; // Loại biểu đồ
    color: string; // Màu sắc cho biểu đồ
    data: number[]; // Dữ liệu để vẽ
}