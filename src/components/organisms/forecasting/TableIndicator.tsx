import React from 'react';
import { Metric } from '@/src/interfaces/ForecastingCriteria';

const TableIndicator = ({ data }: { data: Metric[] }) => {
  const years = [
    ...new Set(data.flatMap(item => [...item.historical, ...item.forecast].map(item => item.year)))
  ].sort((a, b) => a - b);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-fintown-br dark:divide-fintown-br-light">
        <thead className="bg-fintown-bg-stn dark:bg-fintown-bg-stn-light">
          <tr>
            <th className="px-6 py-3 text-left text-[14px] font-medium text-fintown-txt-1 dark:text-fintown-txt-1-light uppercase tracking-wider">Tên chỉ số</th>
            {years.map((year, index) => (
              <th key={index} className="px-6 py-3 text-left text-[14px] font-medium text-fintown-txt-1 dark:text-fintown-txt-1-light uppercase tracking-wider text-right">
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-fintown-br dark:divide-fintown-br-light bg-fintown-bg dark:bg-fintown-bg-light">
          {data.map(row => (
            <tr key={row?.name}>
              <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-fintown-txt-1 dark:text-fintown-txt-1-light text-left">{row?.name}</td>
              {years.map((year, index) => {
                const historical = row?.historical.find(h => h.year === year);
                const forecast = row?.forecast.find(f => f.year === year);
                const value = historical?.value ?? forecast?.value ?? '-';
                return (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-right">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableIndicator;
