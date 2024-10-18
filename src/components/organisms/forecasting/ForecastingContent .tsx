import React, { useEffect, useState } from 'react';
import SelectTableOrChart from "../../common/SelectTableOrChart";
import SegmentedControl from "../../common/SegmentedControl";
import { ChartConfig } from '@/src/interfaces/Chart';

import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaLoading, resetForecastingCriteria } from "@/src/redux/ForecastingCriteria";
import { selectForecastingToggleByGroup } from '@/src/redux/ForecastingToggle';
import { selectSelectedButton } from '@/src/redux/ForecastingPage';
import { ForecastingCriteria } from '@/src/interfaces/ForecastingCriteria';
import { BarsLoader } from '../../common/Loader';

export default function ForecastingContent ({configChart, symbol}: {configChart:ChartConfig[]; symbol:string}){
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  const [NowData, setNowData] = useState<ForecastingCriteria[]>([]);

  const selectedButton = useAppSelector(selectSelectedButton);
  const forecastingToggleByGroup = useAppSelector(selectForecastingToggleByGroup(selectedButton - 1));
  const metrics = forecastingToggleByGroup?.metrics;

  useEffect(()=> {
    if (forecastingCriteriaData.length > 0) {
      setNowData(forecastingCriteriaData);
    }
  }, [forecastingCriteriaData, metrics])

  // RENDER
  if (forecastingCriteriaLoading) {
    return (
      <div className='flex w-full justify-center items-center h-[428px]'>
        < BarsLoader/>
      </div>
    );
  }

  return (
    <>
      <SegmentedControl symbol={symbol} />
      
      {NowData?.map((val: ForecastingCriteria, index: number) => {
        const chartConfig = configChart.find(config => config.n === val?.title);
        const color = chartConfig?.color;
        const ChartComponent = chartConfig?.chart;

        return (
          val && (
            <div className="px-[40px]" key={index}>
              <div className="text-fintown-txt-1 font-bold text-[40px] mb-[36px]">
                {val?.title}
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="text-fintown-txt-1 font-bold text text-[20px] mb-[36px]">
                  Dự báo 5 năm tiếp theo
                </div>

                <div className="flex items-center gap-x-[28px]">
                  {val?.metrics?.map((metric, index) => (
                    metric && (
                      <div className="flex gap-x-[5px] items-center" key={index}>
                        <div className={`min-h-[9px] min-w-[9px] rounded-[50%]`} style={{ backgroundColor: color?.[index] }}></div>
                        <div className="text-fintown-txt-1 text-[14px]">
                          {metric?.name}
                        </div>
                      </div>
                    )
                  ))}
                {/* //   <SelectTableOrChart symbol={symbol} year={2020} quarter={4} /> */}

                </div>
              </div>

              <div className="mb-[64px]">
                {ChartComponent && <ChartComponent data={val?.metrics} />}
              </div>

              <div className="px-[24px] py-[24px] rounded-[10px] border border-fintown-br">
                <div className="flex items-center gap-x-[14px] mb-[20px]">
                  <div className="text-[16px] text-fintown-txt-1 font-[600]">
                    Phân tích dự báo
                  </div>
                  <div className={`text-[12px] py-[4px] font-bold px-[12px] rounded ${val?.status === "Tích cực" ? "bg-[#0ecb4629] text-fintown-stt-buy" : "bg-[#cb0e0e29] text-fintown-stt-sell"} `}>
                    {val?.status}
                  </div>
                </div>
                
                {val?.assessment && (
                  <div className="text-fintown-txt-1 text-[14px]" dangerouslySetInnerHTML={{ __html: val?.assessment }}></div>
                )}

              </div>
            </div>
          )
        );
      })}
    </>
  );
};
