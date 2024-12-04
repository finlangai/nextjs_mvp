"use client";
import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import TechnicalChart from '@/src/components/charts/TechnicalChart/TechnicalChart';
import {
    useColorPickerStroke,
    useColorPickerFill,
    useColorPickerForIndexedBackgroundsColors,
    useColorPickerForSingleLabelBackground,
    useColorPickerForSingleBackgroundsColors,
    useColorPickerLineFill,
    useColorPickerForSingleLabel,
    useColorPickerForTypeLabel,
    useColorPickerForConnectorStroke,
    useColorPickerForConnectorFill,
    useColorPickerForIndexedLabelColors,
    useColorPickerForcrosshairYLine,
    useColorPickerForcrosshairXLine,
    useColorPickerForShapesStroke,
    useColorPickerbackgroundStroke,
    useColorPickerForIndexedShapesFill,
    useColorPickerForInnerBackgroundStroke,
    useColorPickerForInnerBackgroundFill,
    useColorPickerForOuterBackgroundStroke,
    useColorPickerForOuterBackgroundFill
} from '@/src/components/charts/TechnicalChart/useColorPicker';
import useFullScreenButton from '@/src/components/charts/TechnicalChart/useFullScreenButton';
import LeftBarTechnicalChart from '@/src/components/organisms/technicalchart/LeftBarTechnicalChart';
import StockSummaryTechChart from '@/src/components/organisms/technicalchart/StockSummaryTechChart';
import TimeRangebutton from '@/src/components/organisms/technicalchart/TimeRangebutton'; 
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';

export default function BieuDoKyThuatPage({ params }: { params: { symbol: string } }) {
    const symbol = params.symbol.toUpperCase();
    const isValidSymbol = /^[A-Z]{3}$/.test(symbol);
    if (!isValidSymbol) {
        notFound();
    }

    useSetSelectedButtonSiderBar(5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    // =================CHỌN FULL SREEN==================================

    const { handleFullScreenClick } = useFullScreenButton();
    const { handleExitFullScreenClick } = useFullScreenButton();
    const { handedleLeftBarClick } = useFullScreenButton();
    // ===============================CUSTOM TÙY CHỌN CHỈNH MÀU===========================
    useColorPickerStroke();
    useColorPickerFill();
    useColorPickerLineFill();
    useColorPickerForIndexedBackgroundsColors();
    useColorPickerForSingleBackgroundsColors()
    useColorPickerForSingleLabelBackground();
    useColorPickerForSingleLabel();
    useColorPickerForTypeLabel();
    useColorPickerForConnectorStroke();
    useColorPickerForConnectorFill();
    useColorPickerForIndexedLabelColors();
    useColorPickerForcrosshairYLine();
    useColorPickerForcrosshairXLine();
    useColorPickerForShapesStroke();
    useColorPickerbackgroundStroke();
    useColorPickerForIndexedShapesFill();
    useColorPickerForInnerBackgroundStroke();
    useColorPickerForInnerBackgroundFill();
    useColorPickerForOuterBackgroundStroke();
    useColorPickerForOuterBackgroundFill();

    return (
        <>
            <div id='technical-chart-page' className='border-r border-r-fintown-br w-full bg-fintown-bg'>
                <div className='flex w-full'>

                    < LeftBarTechnicalChart symbol={symbol} />

                    <div id='right-chart-technical-vvv' className='w-full'>
                        < StockSummaryTechChart symbol={symbol} />

                        <div className='border-b border-b-fintown-br flex'>
                            <div className='flex min-w-[430px]'>
                                <div className='pl-[24px] flex items-center'>
                                    <i
                                        onClick={() => handedleLeftBarClick(true)}
                                        id='show-leftbar-search'
                                        className='bx bxs-arrow-to-left text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'>
                                    </i>
                                    <i
                                        onClick={() => handedleLeftBarClick(false)}
                                        style={{ display: "none" }}
                                        id='exit-leftbar-search'
                                        className='bx bxs-arrow-to-right text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'>
                                    </i>
                                </div>
                                < TimeRangebutton symbol={symbol} />
                            </div>

                            <div className='flex items-center w-full'>
                                <div className='flex items-center ml-auto pr-[24px]'>
                                    <i className='bx bx-list-check text-fintown-txt-2 text-[26px] mr-[20px] cursor-pointer hover:text-fintown-pr9'></i>
                                    <i
                                        onClick={() => setIsPopupOpen(true)}
                                        className='bx bx-cloud-download text-fintown-txt-2 text-[24px] mr-[20px] cursor-pointer hover:text-fintown-pr9'>
                                    </i>
                                    <i className='bx bx-camera text-fintown-txt-2 text-[22px] mr-[20px] cursor-pointer hover:text-fintown-pr9' ></i>
                                    <i
                                        id='in-full-sreen'
                                        className='bx bx-expand text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'
                                        onClick={handleFullScreenClick}
                                    ></i>
                                    <i
                                        id='exit-full-sreen'
                                        className='bx bx-collapse text-fintown-txt-2 text-[22px] cursor-pointer hover:text-fintown-pr9'
                                        onClick={handleExitFullScreenClick}
                                        style={{ display: 'none' }}
                                    ></i>
                                </div>
                            </div>
                        </div>

                        <div className=' py-[10px]'>
                            < TechnicalChart symbol={symbol} />
                        </div>
                    </div>
                </div>
            </div>

            {(isPopupOpen || isAnimating) && (
                <div className={`fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-start 
                bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}>

                    <div className={`w-[600px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
                                        transform transition-all duration-500 ease-out
                                        ${isPopupOpen ? 'mt-[200px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}>

                        <div className='text-[16px] text-fintown-txt-1 font-[600] mb-[24px]'>
                            Lưu bố cục biểu đồ mới
                        </div>

                        <div className='mb-[10px] text-[14px] text-fintown-txt-1 font-[600]'>
                            Nhập tên cho bố cục:
                        </div>
                        <div className='py-[13px] px-[16px] rounded border border-fintown-br mb-[32px]'>
                            <input
                                className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                placeholder='Ví dụ: Phân tích kỹ thuật ngày 27/10'
                            />
                        </div>

                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded mr-[10px]'>
                                Để sau vậy
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] bg-fintown-pr9 rounded hover:bg-[#34A36A]'>
                                Lưu bố cục
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}