import React, { useState } from 'react';
import { PeParamsComponent, PbParamsComponent } from './ValuationParams';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import ValuationResult from './ValuationResult';

export default function FairValueCalculator({symbol} : {symbol: string}){
    const selectButton = useAppSelector(selectSelectedButton);

    return (
        <>
        <div className="px-[24px] py-[24px]">
            <div className="px-[24px] py-[24px] border border-fintown-br rounded-[8px] flex justify-between">
                <div className="w-full pr-[24px] ">
                    <div className="font-[500] text-[14px] text-fintown-txt-2 mb-[12px]">
                        Giá trị thực:
                    </div>
                    < ValuationResult />
                    
                    {
                        selectButton === 0 ? (
                            <>
                                <div className="mb-[14px] text-[14px] text-fintown-txt-2">
                                    Thời gian chiết khấu mong muốn
                                </div>
                                
                                <div className="flex items-center">
                                    <div className="rounded border border-fintown-br flex items-center px-[16px] w-full max-w-[120px] justify-between mr-[14px] cursor-pointer">
                                        <div className="text-fintown-txt-1 text-[12px] py-[12px] font-[600]">
                                            Quý 3
                                        </div>
                                        <div>
                                            <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                                        </div>
                                    </div>

                                    <div className="rounded border border-fintown-br flex items-center px-[16px] w-full max-w-[120px] justify-between cursor-pointer">
                                        <div className="text-fintown-txt-1 text-[12px] py-[12px] font-[600]">
                                            Năm 2024
                                        </div>
                                        <div>
                                            <i className='bx bx-chevron-down text-fintown-txt-1'></i>
                                        </div>
                                    </div>
                                </div>

                                <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-pr9 w-full mt-[32px]">
                                    Tính toán
                                </button>
                            </>
                        ) : null
                    }
                </div>

                <div className="w-full max-w-[350px] flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-[14px] text-fintown-txt-1 mb-[17px] ">
                        Các tham số
                        </div>

                        <div>
                            {
                                selectButton === 3 && (
                                    < PeParamsComponent />
                                )
                            }

                            {
                                selectButton === 4 && (
                                    < PbParamsComponent />
                                )
                            }
                        </div>
                    </div>
                    {
                        selectButton === 0 ? (
                            <button className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-btn-2 w-full">
                                Đặt lại
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </div>
        </>
    )
}