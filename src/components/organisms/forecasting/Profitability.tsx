import React, { useState, useEffect, useRef, FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import SelectTableOrChart from "../../common/SelectTableOrChart";
import ROIChart from "../../charts/forecasting/ROIChart";
import MarginalProfitChart from "../../charts/forecasting/MarginalProfitChart";
import EPSChart from "../../charts/forecasting/EPSChart";
import ROSChart from "../../charts/forecasting/ROSChart";
import SegmentedControl from "../../common/SegmentedControl";
import { fetchForecastingCriteria, selectForecastingCriteriaData, selectForecastingCriteriaError, selectForecastingCriteriaLoading } from "@/src/redux/ForecastingCriteria";
import { BarsLoader } from '../../common/Loader';
import { ForecastingCriteria, Metric } from '@/src/interfaces/ForecastingCriteria';

interface ChartProps {
    data: Metric[]; 
}
  
interface ChartConfig {
    n: string;
    chart: FC<ChartProps>;
    color: { [key: string]: string };
}

export default function Profitability({symbol} : {symbol:string}) {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const forecastingCriteriaData = useAppSelector(selectForecastingCriteriaData);
  const forecastingCriteriaLoading = useAppSelector(selectForecastingCriteriaLoading);
  const [NowData, setNowData] = useState<ForecastingCriteria[]>([]);

  const configChart: ChartConfig[] = [
    {
      n: "Hiệu quả sinh lời dựa trên vốn",
      chart: ROIChart,
      color: {
        ROE: "blue",
        ROA: "red",
        ROCE: "white"
      }
    },
    {
      n: "Biên lợi nhuận",
      chart: MarginalProfitChart,
      color: {
        NPM: "blue",
        GPM: "red",
      }
    },
    {
      n: "Tỷ suất lợi nhuận trên doanh thu",
      chart: ROSChart,
      color: {
        ROS: "blue",
      }
    },
    {
      n: "Lợi nhuận trên mỗi cổ phần",
      chart: EPSChart,
      color: {
        EPS: "blue"
      }
    },
  ];

  // Fetch API Lần đầu
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchForecastingCriteria({ symbol: symbol, type: 1, group:`` }));
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Lưu data đã fetch
  useEffect(() => {
    if (forecastingCriteriaData.length > 0) {
      setNowData(forecastingCriteriaData);
    }
  }, [forecastingCriteriaData]);

  // RENDER
  if (forecastingCriteriaLoading) {
    return (
      <div className='flex w-full justify-center items-center h-[428px]'>
        < BarsLoader/>
      </div>
    );
  };

  return (
    <>
      < SegmentedControl/>
      {NowData?.map((val) => {
        const chartConfig = configChart.find(config => config.n === val?.title);
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
                    {val?.metrics?.map((metric, index) => {
                    const color = chartConfig?.color[metric.name];
                    return (
                        metric && (
                        <div className="flex gap-x-[5px] items-center" key={index}>
                            <div className={`min-h-[9px] min-w-[9px] rounded-[50%]`} style={{ backgroundColor: color }}></div>
                            <div className="text-fintown-txt-1 text-[14px]">
                            {metric?.name}
                            </div>
                        </div>
                        )
                    );
                    })}
                    <SelectTableOrChart symbol="VNM" year={2020} quarter={4} />
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
}
