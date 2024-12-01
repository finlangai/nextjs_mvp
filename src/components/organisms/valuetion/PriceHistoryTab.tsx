import React, { useEffect, useRef, useState } from 'react';
import HistoryValuetionChart from "../../charts/valuetion/HistoryValuetionChart"
import { selectNewestScenario, fetchIdScenario, selectIdScenarioLoading, selectScenariosLoading, selectIdScenario } from '@/src/redux/Scenarios';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { getPotentialClass } from '@/src/utils/getPotentialClass';
import { Scenarios } from '@/src/interfaces/Scenarios';
import { SpinerLoader } from '../../common/Loader';

export default function PriceHistoryTab() {
    const dispatch = useAppDispatch();
    const newestScenario = useAppSelector(selectNewestScenario);
    const idScenario = useAppSelector(selectIdScenario);
    const idScenarioLoading = useAppSelector(selectIdScenarioLoading);
    const scenariosLoading = useAppSelector(selectScenariosLoading);

    const [nowData, setNowData] = useState<Scenarios>();

    // LẦN ĐẦU VÀO TRANG LẤY KỊCH BẢN MỚI NHẤT HIỂN THỊ
    useEffect(()=> {
        if (newestScenario) {
            setNowData(newestScenario);
        };    
    }, [newestScenario]);

    // NẾU CÓ DỮ LIỆU Ở ID TỨC USER MỞ CHỌN XEM KỊCH BẢN KHÁC THÌ LẤY DỮ LIỆU ĐÓ CẬP NHẬT
    useEffect(()=> {
        // console.log('idScenario', idScenario)
        if (idScenario) {
            setNowData(idScenario);
        };    
    }, [idScenario]);

    if (idScenarioLoading || scenariosLoading) {
        return(
            <>
            <div className='w-full flex items-center justify-center min-h-[400px]'>                
                < SpinerLoader />
            </div>
            </>
        )
    }

    return (
        <>
            <div className="border-b border-b-fintown-br w-full flex items-center items-stretch">

                <div className="w-full border-r border-r-fintown-br">
                    <div className="flex items-center gap-x-[24px] py-[18px] border-b border-b-fintown-br px-[27px] ">
                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-white mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Giá cổ phiếu tại thời điểm định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className={`h-[10px] w-[10px] rounded-[50%] mr-[8px]`} style={{ backgroundColor: getPotentialClass(nowData?.potential) }}></div>
                            <div className="text-[14px] text-fintown-txt-2">Kết quả định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-[blue] mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Giá cổ phiếu hiện tại</div>
                        </div>
                    </div>

                    <div className="mt-[40px] px-[20px] w-full">
                        < HistoryValuetionChart data={nowData} />
                    </div>
                </div>

                <div className="min-w-[224px]">
                    <div className="h-[50%] border-b border-b-fintown-br flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Kết quả định giá
                            </div>
                            <div className="font-bold text-[30px] text-fintown-txt-1 text-center">
                                {nowData?.valuated?.toLocaleString('en-US')}
                            </div>
                        </div>
                    </div>

                    <div className="h-[50%] flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Tỷ lệ sinh lợi tiềm năng
                            </div>
                            <div className={`font-bold text-[30px] text-fintown-txt-1 text-center`} style={{ color: getPotentialClass(nowData?.potential) }}>
                                {nowData?.potential?.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-[24px] py-[24px] h-full">
                <div className=" text-[14px] text-fintown-txt-1 mb-[12px] flex items-center">
                    <div className="mr-[5px]">Ghi chú của bạn</div>
                    <i className='bx bx-edit text-fintown-txt-2 mr-[10px] text-[18px] cursor-pointer'></i>
                </div>

                <div className="text-[20px] text-fintown-txt-1 mb-[10px] font-bold">
                    {nowData?.title}
                </div>

                <div className="text-[14px] text-fintown-txt-2">
                    {nowData?.note}
                </div>
            </div>
        </>
    )
}