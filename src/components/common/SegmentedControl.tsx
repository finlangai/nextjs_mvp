import { ForecastingCriteria } from '@/src/interfaces/ForecastingCriteria';

export default function SegmentedControl({forecastingCriteriaData}:{forecastingCriteriaData: ForecastingCriteria[]  }){
    return(
        <>
            <div className="pl-[40px] border-b border-t border-fintown-br overflow-hidden">
                <div className="flex h-[72px] items-center">
                    <div className="flex items-center gap-x-[48px]">
                        <div className="text-fintown-txt-1 text-[14px] whitespace-nowrap"> 
                            Chọn chỉ số cần xem
                        </div>
                        <div className="min-h-[72px] w-[1px] bg-fintown-br"></div>
                    </div>

                    {forecastingCriteriaData.map((val: ForecastingCriteria) => { 
                        return (
                            val && (
                                <>
                                    <div className="flex items-center gap-x-[15px] ml-[48px] w-max" key={val?.title}>
                                        <div className="w-[46px] min-h-[23px] rounded border border-fintown-br flex items-center cursor-pointer">
                                            <div className="w-[22px] h-[22px] bg-fintown-pr9 rounded"></div>
                                        </div>
                
                                        <div className="text-fintown-txt-1 text-[14px] whitespace-nowrap"> 
                                            {val?.title}
                                        </div>
                                    </div>
                                </>
                            )
                        )
                    })}
                </div>
            </div>
        </>
    )
}