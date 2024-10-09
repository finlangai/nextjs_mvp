import TimeRangeButtons from "./TimeRangeButtons";
import PriceStockLineChart from "./PriceStockLineChart";
import PriceInsights from "../../organisms/PriceInsights";

export default function HistoricalPriceLineChart({symbol}: {symbol: string}) {
    return (
        <>
            <div className="flex px-[40px] mb-[140px]">
                <div className="pr-[40px] w-full h-full">
                    <div className="flex items-center mb-[40px]">
                        <TimeRangeButtons symbol={symbol} />
                        <div className="ml-auto">
                        <button className="py-[8px] px-[8px] bg-fintown-btn-disable rounded-[4px] flex items-center justify-center">
                            <i className='bx bx-expand text-fintown-txt-1 text-[24px]'></i>
                        </button>
                        </div>
                    </div>

                    <div>
                        <PriceStockLineChart symbol={symbol} />
                    </div>
                </div>

                <div className="w-full max-w-[436px]">
                <PriceInsights symbol={symbol} />
                </div>
            </div>
        </>
    )
}