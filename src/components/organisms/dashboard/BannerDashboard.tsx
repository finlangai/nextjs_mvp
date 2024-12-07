import React, {useEffect, useState, useRef} from "react";
import StackedColumnChart from "../../../components/charts/HistoricalRevenueAndProfit";
import { fetchBestNPM, selectBestNPMData, selectBestNPMError, selectBestNPMLoading } from "@/src/redux/BestNPM";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/useAppStore";
import { BestNPMData } from "@/src/interfaces/BestNPM";
import { BarsLoader } from '../../common/Loader';
import Link from "next/link";

export default function BannerDashboard(){
    const dispatch = useAppDispatch();
    const BestNPMData = useAppSelector(selectBestNPMData);
    const BestNPMLoading = useAppSelector(selectBestNPMLoading);
    const [NowData, setNowData] = useState<BestNPMData>();
    const hasFetched = useRef(false);

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchBestNPM());
            hasFetched.current = true;
        }
    }, [dispatch]);

    // Lưu data đã fetch
    useEffect(() => {
        if (BestNPMData !== null) {
            setNowData(BestNPMData);
        }
    }, [BestNPMData]);
    

    if (BestNPMLoading) {
        return (
            <>
            <div className='flex w-full justify-center items-center h-[428px]'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return(
        <>
            <div className="flex">
                <div id="left-stn" className="pr-[30px] w-[40%]">
                    <div className="flex items-center mb-[16px]">
                    <div className="overflow-hidden min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-[50%] bg-white mr-[10px] flex items-center justify-center">
                        <img className="min-w-full min-h-full object-contain" src={NowData?.logo} alt={NowData?.symbol} />
                    </div>
                    <div className="flex items-center text-fintown-txt-1">
                        <h2 className="font-bold text-2xl mr-[5px]">{NowData?.symbol}</h2>
                        <p className="text-xl">({NowData?.exchange})</p>
                    </div>
                    </div>

                    <p className="text-base text-fintown-txt-1 font-semibold mb-[42px]">{NowData?.company_name}</p>

                    <p className="text-base text-fintown-txt-2 font-semibold mb-[5px]">Lợi nhuận sau thuế</p>

                    <div className="flex mb-[23px]">
                    <p className="text-4xl font-bold text-fintown-txt-1 mr-[10px]">{NowData?.netProfit.toLocaleString('en-US')} tỷ</p>
                    <i className='bx bxs-up-arrow text-2xl text-fintown-stt-buy mb-[5px]'></i>
                    </div>

                    <p className="text-base text-fintown-txt-1 font-normal mb-[40px] max-w-[470px]">
                        {NowData?.assessment}
                    </p>

                    <div className="flex items-center gap-x-7 mb-10">
                        <div className="flex items-center gap-x-2.5">
                            <div className="bg-[#FF6347] w-[45px] h-[5px]"></div>
                            <p className="text-fintown-txt-1">Biên lãi ròng</p>
                        </div>

                        <div className="flex items-center gap-x-2.5">
                            <div className="bg-white rounded w-[40px] h-[21px]"></div>
                            <p className="text-fintown-txt-1">LNST</p>
                        </div>

                        <div className="flex items-center gap-x-2.5">
                            <div className="bg-fintown-pr9 rounded w-[40px] h-[21px]"></div>
                            <p className="text-fintown-txt-1">Doanh thu</p>
                        </div>
                    </div>

                    <Link href={`/dashboard/co-phieu/${NowData?.symbol}/ket-qua-du-bao`}>
                        <button className="bg-fintown-pr9 rounded-lg text-sm text-fintown-txt-1 py-[11px] px-[16px]">
                            Xem kết quả dự báo
                        </button>
                    </Link>

                </div>

                <div id="right-stn" className="w-[60%]">
                    <p className="text-fintown-txt-1 font-semibold text-2xl mb-[18px]">Doanh thu và lợi nhuận quá khứ</p>
                    <div className="w-full">
                        <StackedColumnChart />
                    </div>
                </div>
            </div>
        </>
    )
}