import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { CardStock } from "@/src/interfaces/CardStock";
import { fetchIndustry, selectIndustry, fetchTopGainers, selectTopGainers } from "@/src/redux/CardStock";
import LineChart from "../charts/LineChart";

export default function SectionCard({endpoint}: {endpoint: string}){
    const dispatch = useAppDispatch();
    const [stockData, setStockData] = useState<CardStock[]>([]);
    const selectIndustryData = useAppSelector(selectIndustry);
    const selectTopGainersData = useAppSelector(selectTopGainers);

    useEffect(() => {
        if (endpoint === "industry") {
            dispatch(fetchIndustry({name: "Ngân hàng", limit: 4}));
        } else if (endpoint === "top-gainer") {
            dispatch(fetchTopGainers({limit: 4}));
        }
    }, [endpoint]);

    useEffect(() => {
        console.log('stockData', stockData)

        if (endpoint === "industry") {
            setStockData(selectIndustryData);
        } else if (endpoint === "top-gainer") {
            setStockData(selectTopGainersData);
        }
    }, [selectIndustryData, selectTopGainersData]);

    return (
        <div className="flex items-center gap-[20px] overflow-hidden">
            { 
                stockData.map((x) => (
                    <div key={x.symbol} className="rounded-xl border border-fintown-br max-w-[380px] max-h-[240px] min-w-[380px] ">
                        <div className="flex px-6 pt-[24px]">
                            <div className="overflow-hidden min-w-[40px] max-w-[40px] h-[40px] rounded-full bg-white mr-[10px]">
                                <img className="w-full h-full object-contain" src={x.logo} alt={x.symbol} />
                            </div>
                            <div className='w-full min-w-0'>
                                <div className="flex">
                                    <p className="text-fintown-txt-1 font-bold mr-[5px] ">{x.symbol}</p>
                                    <p className="text-fintown-txt-1">({x.exchange})</p>
                                </div>
                                <div className="text-fintown-txt-1 text-sm overflow-hidden whitespace-nowrap text-ellipsis">{x.companyName}</div>
                            </div>
                        </div>
                        <div className="flex items-center mt-[16px]">
                            <p className="text-fintown-txt-1 font-bold text-xl ml-[69px] mr-[10px]">{x.price.toLocaleString('en-US')}</p>
                            <div 
                            className={`flex items-center py-[5px] px-[5px] rounded-[8px] w-max text-white ${
                                x?.delta === undefined
                                ? 'bg-fintown-stt-hold'   // Nếu delta là undefined, mặc định là hold
                                : x?.delta < 0
                                ? 'bg-fintown-stt-sell'   // Nếu delta < 0 thì background màu sell
                                : x?.delta > 0
                                ? 'bg-fintown-stt-buy'    // Nếu delta > 0 thì background màu buy
                                : 'bg-fintown-stt-hold'   // Nếu delta = 0 thì background màu hold
                            }`}
                            >
                                <i
                                    className={`bx ${
                                    x?.delta === undefined
                                        ? ''                       // Không hiện icon nếu delta là undefined
                                        : x?.delta < 0
                                        ? 'bx-caret-down'          // Icon mũi tên xuống nếu delta < 0
                                        : 'bx-caret-up'            // Icon mũi tên lên nếu delta > 0
                                    } text-fintown-txt-1 text-sx mr-[5px]`}
                                ></i>
                                <span>
                                    {
                                        x?.delta === 0 ? "0.00" : x.delta
                                    }

                                </span>
                                <span>%</span>
                            </div>
                        </div>
                        <div>
                            <LineChart data={x.quotes} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
