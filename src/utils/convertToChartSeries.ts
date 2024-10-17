import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { ChartSeries } from '@/src/interfaces/Chart';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

function hasTypeProperty(obj: any): obj is { type: Record<string, string> } {
  return obj && obj.type && typeof obj.type === 'object';
}

export const convertToChartSeries = (metrics: Metric[], main: keyof typeof chartsConfig): ChartSeries[] => {
  const chartsConfig = useAppSelector(state => state.forecastingcharts);

  if (main in chartsConfig) {
    return metrics.map((metric, index) => {
      const metricName = metric.name.toUpperCase();
      const color = chartsConfig[main]?.color?.[index] || '#FF6347'; // Truy xuất màu sắc dựa trên index
      const type = chartsConfig[main]?.type?.[index] || 'column'; // Truy xuất loại biểu đồ dựa trên index

      return {
        name: metric.name,
        type,
        color,
        data: [
          ...metric.historical.map(item => item.value),
          ...metric.forecast.map(item => item.value)
        ]
      };
    });
  }

  return []; 
};
