import { quotes } from '@/src/interfaces/CardStock';
import Highcharts from 'highcharts';

export interface DataPoint extends Highcharts.PointOptionsObject {
  x: number;
  y: number;
}

export interface LineChartProps {
  data: quotes[];
}