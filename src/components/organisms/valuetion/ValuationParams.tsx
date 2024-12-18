import React, { useState, useEffect } from 'react';
import FreeCashFlowChart from "../../charts/valuetion/FreeCashFlowChart";
import {
    selectValuationParamsData,
    selectValuationParamsError,
    selectValuationParamsLoading
}
    from '@/src/redux/ValuationParams/valuationParamsSlice';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';
import { ValuationParams } from '@/src/interfaces/ValuationParams';
import { SpinerLoader } from "../../common/Loader";
import { convertToDecimal } from '@/src/utils/convertToDecimal';

export function PeParamsComponent() {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                        Lợi nhuận trên mỗi cổ phiếu.
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">EPS</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.earnings_per_share?.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ lệ P/E của thị trường (VN30)</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">P/E</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.price_to_earnings}</div>
                    </div>
                </div>
            </>
        </div>
    );
}

export function PbParamsComponent() {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                        Giá trị sổ sách trên mỗi cổ phiếu.
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">BVPS</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.book_value_per_share?.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ lệ P/B của thị trường (VN30)</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">P/B</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.price_to_book}</div>
                    </div>
                </div>
            </>
        </div>
    );
}

export function BenjaminGramhamParamsComponent() {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                        EPS (Lợi nhuận trên mỗi cổ phiếu) 12 tháng
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">E</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.earnings_per_share?.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ lệ tăng trưởng EPS dự kiến 7-10 năm tới</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">g</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.earnings_per_share_growth_rate?.toFixed(4)}</div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Lãi suất trái phiếu doanh nghiệp hạng A hiện tại</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">y</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.bonds_yield}</div>
                    </div>
                </div>
            </>
        </div>
    );
}

export function DCFParamsComponent({sYear, sQuarter} : {sYear:number; sQuarter:number}) {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);
    const [showChart, setShowChart] = useState(false);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    const [selectedQuarter, setSelectedQuarter] = useState(sQuarter);
    const [selectedYear, setSelectedYear] = useState(sYear);
    const [start, setStart] = useState(true);

    useEffect(()=> {
        let index = 0;
        let yearStart = 0;
        let cQuarter = sQuarter;

        // Lần đầu tiên tăng thêm một quý so với quý hiện có => định giá cho quý tiếp theo. 
        // Nếu đã là quý 4 thì tăng thêm 1 năm, không tăng qu => định giá cho quý 1 năm tiếp theo.
        if (start && sQuarter > 0 && sQuarter < 4) {
            index = 1;
            setStart(false);
        };
        if (start && sYear > 0 && sQuarter === 4) {
            cQuarter = 1;
            yearStart = 1;
            setStart(false);
        };

        setSelectedQuarter(cQuarter + index);
        setSelectedYear(sYear + yearStart);
    }, [sYear, sQuarter])

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    // HOVER SHOW CHART
    const handleMouseEnter = () => {
        setShowChart(true);
    };

    const handleMouseLeave = (e: any) => {
        const iconEl = document.querySelector('.icon-trigger');
        const tooltipEl = document.querySelector('.tooltip');

        if (!tooltipEl?.contains(e.relatedTarget) && !iconEl?.contains(e.relatedTarget)) {
            setShowChart(false);
        }
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px] relative">
                <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                    Dòng tiền tương lai dự kiến
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bol flex items-centerd">
                        FCFE_t
                    </div>

                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-right flex items-center">
                        <i className='bx bxs-bar-chart-alt-2 text-[18px] text-fintown-txt-2 cursor-pointer'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                        </i>
                    </div>
                </div>

                {showChart && (
                    <div
                        className="px-[22px] py-[20px] absolute rounded-[10px] bg-fintown-bg-stn dark:bg-fintown-bg-stn-light w-[385px] h-max right-[0] tooltip-container border border-fintown-br dark:border-fintown-br-light"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px] font-[600] mb-[30px]">
                            Dòng tiền tương lai dự kiến (Tỷ)
                        </div>

                        <div className="w-full">
                            {
                                (nowData?.fcf_forecasts) && (
                                    <FreeCashFlowChart data={nowData?.fcf_forecasts}/>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>

            <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                    Tỷ suất chiết khấu (WACC)
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">
                        r
                    </div>

                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                        {nowData?.r?.toFixed(4)}
                    </div>
                </div>
            </div>

            <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                    Số lượng thời kỳ
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">
                        t
                    </div>

                    <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                        Đến Q{selectedQuarter} {selectedYear}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DDMParamsComponent({g} : {g:number}) {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        // console.log(valuationParamsData)
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                    Cổ tức dự kiến năm tới
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">D1</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.D1?.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ suất yêu cầu (CAPM)</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">r</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.r?.toFixed(4)}</div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ lệ tăng trưởng cổ tức</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">g</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{convertToDecimal(g)}</div>
                    </div>
                </div>
            </>
        </div>
    );
}

export function PEGParamsComponent() {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                        Tỷ lệ giá trên lợi nhuận của cổ phiếu
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">P/E</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.price_to_earnings?.toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Tỷ lệ tăng trưởng lợi nhuận dự kiến hàng năm</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">G</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.earnings_per_share_growth_rate?.toFixed(4)}</div>
                    </div>
                </div>
            </>
        </div>
    );
}

export function CAPMParamsComponent({Rm} : {Rm:number}) {
    const [nowData, setNowData] = useState<ValuationParams | null>(null);

    const valuationParamsLoading = useAppSelector(selectValuationParamsLoading);
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    useEffect(() => {
        if (valuationParamsData !== null) {
            setNowData(valuationParamsData);
        }
    }, [valuationParamsData]);

    if (valuationParamsLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-y-[10px]">
            <>
                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">
                        Lãi suất không rủi ro
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold text-right">Rf</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">
                            {nowData?.risk_free_rate?.toFixed(4)}
                        </div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Hệ số beta</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">βa</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{nowData?.beta?.toFixed(4)}</div>
                    </div>
                </div>

                <div className="border border-fintown-br dark:border-fintown-br-light py-[15px] px-[17px] rounded-[8px]">
                    <div className="text-[12px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[7px]">Lợi suất kỳ vọng của thị trường</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-bold">Rm</div>
                        <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light">{convertToDecimal(Rm)}</div>
                    </div>
                </div>
            </>
        </div>
    );
}