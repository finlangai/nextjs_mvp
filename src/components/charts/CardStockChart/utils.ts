import { DataPoint } from './types';
import { quotes } from '@/src/interfaces/CardStock';

export const formatChartData = (data: quotes[]): DataPoint[] => {
  return data.map(item => ({
    x: new Date(item.time * 1000).getTime(),
    y: Number(item.price),
  }));
};

export const calculatePriceBounds = (formattedData: DataPoint[]) => {
  const prices = formattedData.map(item => item.y);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  return {
    minPrice: minPrice - padding,
    maxPrice: maxPrice + padding
  };
};