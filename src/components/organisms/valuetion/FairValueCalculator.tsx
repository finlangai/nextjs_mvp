import React, { useEffect, useState } from 'react';
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
import QuarterYearSelector from './QuarterYearSelector';
import { selectValuationParamsData } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { setQuarterSlice, setYearSlice } from '@/src/redux/ValuetionPage/valuetionSelectTimeSlice';

export default function FairValueCalculator({symbol} : {symbol: string}){
    const dispatch = useAppDispatch();
    const valuationParamsData = useAppSelector(selectValuationParamsData);

    const selectButton = useAppSelector(selectSelectedButton);
    const [sliderValueDDM, setSliderValueDDM] = useState(30);
    const [sliderValueCAPM, setSliderValueCAPM] = useState(15);

    const [selectFCFt, setSelectFCFt] = useState(1);
    const [sQuarter, setQuarter] = useState(0);
    const [sYear, setYear] = useState(0);

    // CẬP NHẬT QUÝ VÀ NĂM LẦN ĐẦU TIÊN
    useEffect(()=> {
        if (valuationParamsData && valuationParamsData !== null) {
            setQuarter(valuationParamsData?.quarter);
            setYear(valuationParamsData?.year);
        }
    }, [valuationParamsData]);

    // CẬP NHẬT MỐC THỜI GIAN ĐỊNH GIÁ
    useEffect(()=>{
        dispatch(setQuarterSlice({ quarter: sQuarter })); 
        dispatch(setYearSlice({ year: sYear })); 
    }, [sQuarter, sYear]);

    // Hàm callback để nhận giá trị từ SliderWithValue
    const handleSliderChange = (value: number) => {
        setSliderValueDDM(value);
        setSliderValueCAPM(value);
    };

    // Hàm callbank nhận dữ liệu từ select
    const handleSelect = (data: { quarter: number; year: number; totalQuarters: number }) => {
        setSelectFCFt(data.totalQuarters);
        setQuarter(data.quarter);
        setYear(data.year);
        // console.log('Selected Quarter:', data.quarter);
        // console.log('Selected Year:', data.year);
        // console.log('Total Quarters to Selected Date:', data.totalQuarters);
    };

    // Hàm tính toán
    const token = useAppSelector(selectToken);
    const calculateValue = () => {
        if (token) {
            if (selectButton === 0) {
                const name = 'discounted-cash-flow';
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { t: selectFCFt } }));
            }
            if (selectButton === 1) {
                const finalValue = sliderValueDDM / 100;
                const name = 'dividend-discount-model';
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { g: finalValue } }));
            }
            if (selectButton === 6) {
                const finalValue = sliderValueCAPM / 100;
                const name = 'capital-asset-pricing-model';
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { Rm: finalValue } }));
            }
        }
    }

    // Reset Tham số
    const resetParams = () => {
        setSliderValueDDM(30);
        setSliderValueCAPM(15);
        setSelectFCFt(1);
        if (valuationParamsData && valuationParamsData !== null) {
            setQuarter(valuationParamsData?.quarter);
            setYear(valuationParamsData?.year);
        }
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
                        (selectButton === 0 || selectButton === 1) &&(
                            <hr className='border-fintown-br mt-[20px]'/>
                        )
                    }

                    {
                        selectButton === 0 && (
                            <>
                                < QuarterYearSelector 
                                    onSelect={handleSelect} 
                                    currentYear={sYear} 
                                    currentQuarter={sQuarter}
                                />
                            </>
                        )
                    }

                    {
                        (selectButton === 1 || selectButton === 6) && (
                        <div className='mt-[20px]'>
                            <div className='text-fintown-txt-1 text-[14px] font-bold mb-[30px]'>
                                {
                                    (selectButton === 1) && (
                                        "Tỷ suất sinh lợi yêu cầu"
                                    )   
                                }

                                {
                                    (selectButton === 6) && (
                                        "Lợi suất kỳ vọng của thị trường"
                                    )
                                }
                            </div>
                            <div>
                                {
                                    (selectButton === 1) && (
                                        < SliderWithValue 
                                            min={0} 
                                            max={100} 
                                            step={1} 
                                            value={sliderValueDDM} 
                                            onChange={handleSliderChange}
                                            tooltip={true} 
                                        />
                                    )   
                                }

                                {
                                    (selectButton === 6) && (
                                        < SliderWithValue 
                                            min={0} 
                                            max={100} 
                                            step={1} 
                                            value={sliderValueCAPM} 
                                            onChange={handleSliderChange}
                                            tooltip={true} 
                                        />
                                    )
                                }
                            </div>
                        </div>
                        )
                    }

                    {
                        (selectButton === 0 || selectButton === 1 || selectButton === 6) &&(
                            <> 
                                <button 
                                className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-pr9 w-full mt-[32px]"
                                onClick={() => calculateValue()}
                                >
                                    Tính toán
                                </button>
                            </>
                        )
                    }
                </div>

                <div className="w-full max-w-[350px] flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-[14px] text-fintown-txt-2 mb-[17px] ">
                        Các tham số
                        </div>

                        <div>
                            {
                                selectButton === 0 && (
                                    < DCFParamsComponent 
                                    sYear={sYear} 
                                    sQuarter={sQuarter} 
                                    />
                                )
                            }

                            {
                                selectButton === 1 && (
                                    < DDMParamsComponent g={sliderValueDDM} />
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
                                    < CAPMParamsComponent Rm={sliderValueCAPM} />
                                )
                            }
                        </div>
                    </div>
                    {
                        (selectButton === 0 || selectButton === 1 || selectButton === 6) && (
                            <button 
                            className="text-[14px] text-fintown-txt-1 py-[12px] rounded-[8px] bg-fintown-btn-2 w-full"
                            onClick={() => resetParams()}
                            >
                                Đặt lại
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}