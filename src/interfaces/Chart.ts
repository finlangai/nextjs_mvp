import { Metric } from '@/src/interfaces/ForecastingCriteria';

export interface ChartSeries {
    name: string; // Tên chỉ số
    type: string; // Loại biểu đồ
    color: string; // Màu sắc cho biểu đồ
    data: number[]; // Dữ liệu để vẽ
}


interface ChartProps {
    data: Metric[]; 
  }
    
export interface ChartConfig {
      n: string;
      chart: React.FC<ChartProps>;
      color:string[];
  }