"use client";
import React, { useState, useRef, useEffect } from 'react';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import TechnicalChart from '@/src/components/charts/TechnicalChart/TechnicalChart';
import { sampleStockData} from '@/src/utils/sampleData';
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
import LeftBarTechnicalChart from '@/src/components/organisms/LeftBarTechnicalChart';

interface Tab {
    id: number;
    label: string | null;
}

export default function BieuDoKyThuatPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    useSetSelectedButtonSiderBar(5);

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

    // ========================CHỌN TYPE CHART=============================== 

    return (
        <>
        <div id='technical-chart-page' className='border-r border-r-fintown-br w-full bg-fintown-bg'>
            <div className='flex w-full'>

                < LeftBarTechnicalChart symbol={symbol} />

                <div id='right-chart-technical-vvv' className='w-full'>
                    <div className='border-b border-b-fintown-br flex w-full'>
                        {/* Phần tử đầu tiên có width cố định */}
                        <div className='flex items-center pl-[24px] border-r border-r-fintown-br w-[430px] py-[16px]'>
                            <div className='h-[40px] w-[40px] rounded-[50%] overflow-hidden bg-white mr-[13px]'>
                                <img className='h-full w-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                            </div>

                            <div>
                                <div className='flex items-center'>
                                    <p className='text-[16px] text-fintown-txt-1 font-bold mr-[11px]'>VCB</p>
                                    <i className='bx bxs-star text-[18px] text-fintown-txt-2 mr-[10px] cursor-pointer'></i>
                                </div>
                                <div className='text-[14px] font-[400] text-fintown-txt-2'>
                                    Công ty cổ phần vàng bạc đá quý Phú Nhuận
                                </div>
                            </div>
                        </div>
                        
                        {/* Các phần tử còn lại chia đều không gian */}
                        <div className='flex flex-1'>
                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Giá đóng cửa</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thay đổi 24h</div>
                                <div className='text-fintown-stt-buy text-[12px] font-bold'>+5.65%</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Cao nhất 24h</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] border-r border-r-fintown-br'>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Thấp nhất 24h</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>

                            <div className='flex-1 py-[16px] px-[16px] '>
                                <div className='text-fintown-txt-2 text-[12px] font-bold mb-[9px]'>Khối lượng</div>
                                <div className='text-fintown-txt-1 text-[12px] font-bold'>123,654</div>
                            </div>
                        </div>
                    </div>

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
                                style={{display: "none"}}
                                id='exit-leftbar-search'
                                className='bx bxs-arrow-to-right text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'>
                                </i>
                            </div>
                            <div className='pl-[24px] flex items-center gap-x-[28px] py-[18px] w-full '>
                                <button className='text-[12px] font-bold text-fintown-pr9'>
                                    1D
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    3M
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    1Y
                                </button>

                                <button className='text-fintown-txt-2 text-[12px] font-bold'>
                                    YTD
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='flex items-center ml-auto pr-[24px]'>
                                <i className='bx bx-camera text-fintown-txt-2 text-[20px] mr-[20px]' ></i>
                                <i 
                                    id='in-full-sreen'
                                    className='bx bx-expand text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'
                                    onClick={handleFullScreenClick}
                                ></i>
                                <i 
                                    id='exit-full-sreen'
                                    className='bx bx-collapse text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9'
                                    onClick={handleExitFullScreenClick}
                                    style={{display: 'none'}}
                                ></i>
                            </div>
                        </div>
                    </div>

                    <div className=' py-[10px]'>
                        < TechnicalChart data={sampleStockData} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}