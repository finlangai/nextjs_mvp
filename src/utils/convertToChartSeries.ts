import { Metric } from '@/src/interfaces/ForecastingCriteria';
import { ChartSeries } from '@/src/interfaces/Chart';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

function hasTypeProperty(obj: any): obj is { type: Record<string, string> } {
  return obj && obj.type && typeof obj.type === 'object';
}

export const convertToChartSeries = (metrics: Metric[], main: string): ChartSeries[] => {
  const chartsConfig = useAppSelector((state:any) => state.forecastingcharts);

  if (main in chartsConfig) {
    return metrics.map((metric, index) => {
      const color = chartsConfig[main as keyof typeof chartsConfig]?.color?.[index] || '#FF6347'; // Cast main
      const type = chartsConfig[main as keyof typeof chartsConfig]?.type?.[index] || 'column'; // Cast main

      return {
        name: metric.name,
        type,
        color,
        data: [
          ...metric.historical.map(item => item.value),
          ...metric.forecast.map(item => item.value),
        ],
      };
    });
  }

  return [];
};
