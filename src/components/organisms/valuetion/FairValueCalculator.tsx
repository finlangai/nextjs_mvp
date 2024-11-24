import React, { useState } from 'react';
import { 
    PeParamsComponent, 
    PbParamsComponent, 
    BenjaminGramhamParamsComponent, 
    DDMParamsComponent,
    DCFParamsComponent,
    PEGParamsComponent,
    CAPMParamsComponent 
} from './ValuationParams';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import ValuationResult from './ValuationResult';
import SliderWithValue from './SliderWithValue';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { selectToken } from "@/src/redux/auth";

export default function FairValueCalculator({symbol} : {symbol: string}){
    const dispatch = useAppDispatch();

    const selectButton = useAppSelector(selectSelectedButton);
    const [sliderValue, setSliderValue] = useState(0.03);

    // Hàm callback để nhận giá trị từ SliderWithValue
    const handleSliderChange = (value: number) => {
      setSliderValue(value);
    };

    // Hàm tính toán
    const token = useAppSelector(selectToken);
    const calculateValue = () => {
        const name = 'dividend-discount-model';
        if (token) {
            dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { g: sliderValue } }));
        }
    }

    // Reset Tham số
    const resetParams = () => {
        setSliderValue(0.03);
    }

    return (
        <>
        <div className="px-[24px] py-[24px]">
            <div className="px-[24px] py-[24px] border border-fintown-br rounded-[8px] flex justify-between">
                <div className="w-full pr-[24px] ">
                    <div className="font-[500] text-[14px] text-fintown-txt-2 mb-[12px]">
                        {
                            (selectButton > 4) && (
                                "Giá mục tiêu:"
                            )   
                        }
                        {
                            (selectButton < 5) && (
                                "Giá trị thực:"
                            )   
                        }
                    </div>

                    < ValuationResult />

                    {
                        (selectButton === 0 || selectButton === 1) ? (
                            <hr className='border-fintown-br mt-[20px]'/>
                        ) : null
                    }

                    {
                        selectButton === 0 && (
                            <>
                                <div className="mb-[14px] text-[14px] text-fintown-txt-2 mt-[20px]">
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
                            </>
                        )
                    }

                    {
                        selectButton === 1 && (
                        <div className='mt-[20px]'>
                            <div className='text-fintown-txt-1 text-[14px] font-bold mb-[30px]'>
                                Tỷ suất sinh lợi yêu cầu
                            </div>
                            <div>
                                < SliderWithValue 
                                min={0} 
                                max={100} 
                                step={1} 
                                value={sliderValue} 
                                onChange={handleSliderChange}
                                tooltip={true} 
                                />
                            </div>
                        </div>
                        )
                    }

                    {
                        (selectButton === 0 || selectButton === 1) ? (
                            <> 
                                <button 
                                className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-pr9 w-full mt-[32px]"
                                onClick={() => calculateValue()}
                                >
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
                                selectButton === 0 && (
                                    < DCFParamsComponent />
                                )
                            }

                            {
                                selectButton === 1 && (
                                    < DDMParamsComponent g={sliderValue} />
                                )
                            }

                            {
                                selectButton === 2 && (
                                    < BenjaminGramhamParamsComponent />
                                )
                            }

                            {
                                selectButton === 3 && (
                                    < PeParamsComponent/>
                                )
                            }

                            {
                                selectButton === 4 && (
                                    < PbParamsComponent />
                                )
                            }

                            {
                                selectButton === 5 && (
                                    < PEGParamsComponent />
                                )
                            }

                            {
                                selectButton === 6 && (
                                    < CAPMParamsComponent Rm={0.15} />
                                )
                            }
                        </div>
                    </div>
                    {
                        (selectButton === 0 || selectButton === 1) ? (
                            <button 
                            className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-btn-2 w-full"
                            onClick={() => resetParams()}
                            >
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