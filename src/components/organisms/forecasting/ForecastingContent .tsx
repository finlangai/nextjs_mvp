import React from 'react';
import SelectTableOrChart from "../../common/SelectTableOrChart";
import SegmentedControl from "../../common/SegmentedControl";
import { ForecastingCriteria } from '@/src/interfaces/ForecastingCriteria';
import { ChartConfig } from '@/src/interfaces/Chart';

export default function ForecastingContent ({forecastingCriteriaData, configChart}: {forecastingCriteriaData:ForecastingCriteria[]; configChart:ChartConfig[]}){

  return (
    <>
      <SegmentedControl forecastingCriteriaData={forecastingCriteriaData} />
      {forecastingCriteriaData.map((val: ForecastingCriteria) => {
        const chartConfig = configChart.find(config => config.n === val?.title);
        const color = chartConfig?.color;
        const ChartComponent = chartConfig?.chart;

        return (
          val && (
            <div className="px-[40px]" key={val?.title}>
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
