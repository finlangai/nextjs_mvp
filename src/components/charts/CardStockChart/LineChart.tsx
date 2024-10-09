import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { LineChartProps } from './types';
import { formatChartData, calculatePriceBounds } from './utils';
import { getChartOptions } from './chartConfig';

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const formattedData = formatChartData(data);
  const { minPrice, maxPrice } = calculatePriceBounds(formattedData);
  const chartOptions = getChartOptions(formattedData, minPrice, maxPrice);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LineChart;