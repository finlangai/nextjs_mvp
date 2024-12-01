import React, { useEffect, useRef, useState } from 'react';
import { selectScenariosData, selectScenariosLoading } from '@/src/redux/Scenarios';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader } from "@/src/components/common/Loader";

export default function LogValuation ({containerHeight} : {containerHeight: number}){
    const scenariosData = useAppSelector(selectScenariosData);
    const scenariosLoading = useAppSelector(selectScenariosLoading);

    if (scenariosLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

    return (
        <>
        <div className="border-b border-b-fintown-br">
            <div className="pl-[30px] pr-[40px] py-[32px] flex items-center">
                <div className="text-[14px] font-bold text-fintown-txt-1 mr-[8px]">
                    Danh sách kịch bản định giá
                </div>
                <div className="text-[10px] text-fintown-txt-1 h-[20px] w-[20px] rounded-[2px] bg-[#656F79] flex items-center justify-center">
                    <span className="h-max">{scenariosData?.length}</span>
                </div>
            </div>
        </div>

        <div className="py-[13px] pl-[30px] pr-[30px] flex items-center justify-between border-b border-fintown-br">
            <div className="text-fintown-txt-1 text-[12px]">
                Xem theo ngày
            </div>
            <div className="flex items-center w-full max-w-[117px] px-[12px] py-[7px] rounded border border-fintown-br justify-between cursor-pointer">
                <i className='bx bx-calendar-event text-[18px] text-fintown-txt-2'></i>
                <div className="text-fintown-txt-2 text-[12px]">
                    12/07/2024
                </div>
            </div>
        </div>

        <div 
        className="overflow-y-auto custom-scrollbarmini2 pl-[30px] pr-[10px] pr-[30px] mr-[10px] flex flex-col gap-y-[20px] py-[20px]"
        style={{height: `${containerHeight - 60}px`}}
        >
            {
                scenariosData && scenariosData.length > 0 ? (
                    scenariosData.map((items) => (
                        <div className="border-b border-b-fintown-br" key={items.id}>
                            <div className="flex items-center mb-[15px]">
                                <div className="flex items-center">
                                    <div className="text-[14px] font-[600] text-fintown-txt-1">{items?.title}</div>
                                </div>
                                <button className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto">
                                    <i className='bx bx-trash text-fintown-txt-2'></i>
                                </button>
                            </div>

                            <div className="mb-[15px]">
                                <div className="flex items-center mr-[20px] justify-between w-full mb-[8px]">
                                    <div className="text-[12px] text-fintown-txt-2 mr-[5px]">
                                        Tỷ lệ sinh lời tiềm năng:
                                    </div>
                                    <div className="text-[12px] text-fintown-stt-sell text-right font-[600]">
                                        {items?.potential}%
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[12px] text-fintown-txt-2 mr-[5px]">
                                        Giá trị được định giá:
                                    </div>
                                    <div className="text-[12px] text-fintown-txt-1 text-right font-[600]">
                                        {items?.valuated}
                                    </div>
                                </div>
                            </div>

                            <div className="flex pb-[15px]">
                                <i className='bx bx-edit text-fintown-txt-2 mr-[10px]'></i>

                                <div
                                    className="text-[12px] text-fintown-txt-1"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {items?.note}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-[20px]">
                                <div className="text-fintown-txt-2 text-[12px]">
                                    Đã lưu: {items?.saveAt}
                                </div>

                                <button className="text-fintown-txt-1 text-[12px] py-[6px] px-[13px] rounded bg-fintown-pr9">
                                    Mở chart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-fintown-txt-2 text-[14px] text-center py-[20px]">
                        Không có dữ liệu để hiển thị.
                    </div>
                )
            }
        </div>
        </>
    )
}