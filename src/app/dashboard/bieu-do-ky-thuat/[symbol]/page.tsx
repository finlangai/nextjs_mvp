"use client";
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
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
import SaveLayoutChart from '@/src/components/organisms/technicalchart/SaveLayoutChart';
import ListLayoutChartSaved from '@/src/components/organisms/technicalchart/ListLayoutChartSaved';
import { setSelectedLayout } from '@/src/redux/LayoutTechChart';
import { useAppDispatch } from '@/src/redux/hooks/useAppStore';

const TechnicalChart = dynamic(() => import('@/src/components/charts/TechnicalChart/TechnicalChartComponent'), {
    ssr: false,
});

export default function BieuDoKyThuatPage({ params }: { params: { symbol: string } }) {
    const symbol = params.symbol.toUpperCase();
    const isValidSymbol = /^[A-Z]{3}$/.test(symbol);
    if (!isValidSymbol) {
        notFound();
    }
    const dispatch = useAppDispatch();
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

    // Handle layout selection
    const resetLayout = () => {
        const layout = { name: '', layout: [], createdAt: '' }
        dispatch(setSelectedLayout(layout));
    };

    return (
        <>
            <div id='technical-chart-page' className='border-r border-r-fintown-br w-full bg-fintown-bg'>
                <div className='flex w-full'>

                    < LeftBarTechnicalChart symbol={symbol} />

                    <div id='right-chart-technical-vvv' className='w-full'>
                        < StockSummaryTechChart symbol={symbol} />

                        <div className='border-b border-b-fintown-br flex'>
                            <div className='flex'>
                                <div className='px-[24px] flex items-center border-r border-r-fintown-br'>
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

                            <div className='flex items-center gap-x-[28px] px-[24px] w-full'>
                                <div className='flex items-center gap-x-[5px] cursor-pointer'>
                                    <i className='bx bx-revision text-fintown-txt-2 text-[22px] hover:text-fintown-pr9' onClick={(()=> resetLayout())}></i>
                                    <div className='text-[12px] text-fintown-txt-2'>Đặt lại</div>
                                </div>

                                <div className='flex items-center gap-x-[5px]'>
                                    < ListLayoutChartSaved />
                                    <div className='text-[12px] text-fintown-txt-2'>Danh sách bố cục</div>
                                </div>

                                <div className='flex items-center gap-x-[5px]'>
                                    < SaveLayoutChart />
                                    <div className='text-[12px] text-fintown-txt-2'>Lưu bố cục</div>
                                </div>
                            </div>

                            <div className='flex items-center w-full'>
                                <div className='flex items-center ml-auto pr-[24px]'>
                                    {/* <i className='bx bx-camera text-fintown-txt-2 text-[22px] mr-[20px] cursor-pointer hover:text-fintown-pr9' ></i> */}

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
        </>
    )
}