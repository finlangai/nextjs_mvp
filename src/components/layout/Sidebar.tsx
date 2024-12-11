"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/SiderBar';
import { selectDarkMode, toggleDarkMode, setDarkMode } from '@/src/redux/darkmode';

import { updateDebtToAssetsRatioChartColor } from '@/src/redux/ForecastingChartConfig/debtToAssetsRatioSlice';
import { updateAssetGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/assetGrowthRateSlice';
import { updateEPSGrowthChartColor } from '@/src/redux/ForecastingChartConfig/EPSGrowthSlice';
import { updateEBITDAGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/eBITDAGrowthRateSlice';
import { updateEquityGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/equityGrowthRateSlice';
import { updateFreeCashFlowGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/freeCashFlowGrowthRateSlice';
import { updateInterestCoverageRatioChartColor } from '@/src/redux/ForecastingChartConfig/interestCoverageRatioSlice';
import { updateROIChartColor } from '@/src/redux/ForecastingChartConfig/roiChartSlice';
import { updateliquidityRatioChartColor } from '@/src/redux/ForecastingChartConfig/liquidityRatioChartSlice';
import { updateMarginalProfitChartColor } from '@/src/redux/ForecastingChartConfig/marginalProfitChartSlice';
import { updateProfitGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/profitGrowthRateSlice';
import { updateReturnOnAssetsGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/returnOnAssetsGrowthRateSlice';
import { updateRevenueGrowthRateChartColor } from '@/src/redux/ForecastingChartConfig/revenueGrowthRateSlice';

import BtnSidebar from '../common/BtnSidebar';
import HoverArrowLink from '../common/HoverArrowLink';

export default function Sidebar() {
    const selectedButton = useAppSelector(selectSelectedButton);
    const isDarkMode = useAppSelector(selectDarkMode);
    const dispatch = useAppDispatch();
    const [isThemeInitialized, setIsThemeInitialized] = useState(false);

    const handleClick = (buttonIndex: number | null) => {
        dispatch(setSelectedButtonActive({ button: buttonIndex }));
    };

    // Hàm chuyển đổi dark mode
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        dispatch(toggleDarkMode());
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const upColorChart = (color: string) => {
        dispatch(updateDebtToAssetsRatioChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateAssetGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateEBITDAGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateEPSGrowthChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateEquityGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateFreeCashFlowGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateMarginalProfitChartColor([color, "#25B770"]));
        dispatch(updateROIChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateInterestCoverageRatioChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateliquidityRatioChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateProfitGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateReturnOnAssetsGrowthRateChartColor(["#25B770", color, "#FF6347"]));
        dispatch(updateRevenueGrowthRateChartColor(["#25B770", color, "#FF6347"]));
    };

    // Khởi tạo Redux state từ localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            dispatch(setDarkMode(true));
        } else if (savedTheme === 'light') {
            dispatch(setDarkMode(false));
        }
        setIsThemeInitialized(true); 
    }, [dispatch]);

    // Cập nhật class body theo Redux state sau khi khởi tạo xong
    useEffect(() => {
        if (!isThemeInitialized) return;

        if (isDarkMode) {
            document.body.classList.add('dark');
            upColorChart('#39414C');
        } else {
            document.body.classList.remove('dark');
            upColorChart('#D9D9D9');
        }
    }, [isDarkMode, isThemeInitialized]);

    // Cập nhật `localStorage` khi Redux state thay đổi
    useEffect(() => {
        if (!isThemeInitialized) return;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, isThemeInitialized]);

    return (
        <div
            id="sider-bar-left-dashboard"
            className="fixed z-50 top-0 w-[70px] border-r h-screen border-fintown-br dark:border-fintown-br-light bg-fintown-bg dark:bg-fintown-bg-light flex flex-col justify-between"
        >
            {/* Phần trên cùng */}
            <div>
                <div className="logo">
                    <Link href="/" className="flex justify-center h-[70px] items-center">
                        <img className="w-[42px] h-[42px]" src="/imgs/logo.png" alt="logo fintown" />
                    </Link>
                </div>

                {/* Các nút đầu tiên */}
                <div id="central-container-sidebar" className="mt-[50px]">
                    <Link href="/dashboard/" onClick={() => handleClick(0)}>
                        <BtnSidebar class_icon="bx bxs-grid" active={selectedButton === 0} />
                    </Link>

                    <Link href="/dashboard/co-phieu" onClick={() => handleClick(2)}>
                        <BtnSidebar class_icon="bx bx-left-indent" active={selectedButton === 2} />
                    </Link>

                    <div className="relative group">
                        {/* BtnSidebar - phần tử cha */}
                        <BtnSidebar class_icon="bx bx-bar-chart" active={selectedButton === 3} />

                        {/* Danh sách menu khi hover */}
                        <div 
                        className="
                        text-[14px] absolute left-full top-0 hidden group-hover:block 
                        bg-fintown-btn-5 dark:bg-fintown-btn-5-light rounded-tr-lg 
                        rounded-br-lg border border-fintown-br dark:border-fintown-br-light min-w-[200px]"
                        >                         
                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/" 
                            label="Chỉ số kỹ thuật" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/bao-cao-doanh-nghiep" 
                            label="Báo cáo doanh nghiệp" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/ho-so-doanh-nghiep" 
                            label="Hồ sơ doanh nghiệp" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/ket-qua-du-bao" 
                            label="Kết quả dự báo" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/du-lieu-lich-su" 
                            label="Dữ liệu lịch sử" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/co-phieu/VCB/so-sanh" 
                            label="So sánh" 
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <BtnSidebar class_icon="bx bxs-calculator" active={selectedButton === 6} />
                     
                        <div className="
                        text-[14px] absolute left-full top-0 hidden group-hover:block 
                        bg-fintown-btn-5 dark:bg-fintown-btn-5-light rounded-tr-lg 
                        rounded-br-lg border border-fintown-br dark:border-fintown-br-light min-w-[200px]">
                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/chiet-khau-dong-tien" 
                            label="Chiết khấu dòng tiền" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/chiet-khau-co-tuc" 
                            label="Chiết khấu cổ tức" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/benjamin-graham" 
                            label="Benjamin Graham" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/he-so-pe" 
                            label="Hệ số P/E" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/he-so-pb" 
                            label="Hệ số P/B" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/phuong-phap-peg" 
                            label="Phương pháp PEG" 
                            />

                            <HoverArrowLink 
                            href="/dashboard/dinh-gia-co-phieu/VCB/mo-hinh-capm" 
                            label="Mô hình CAPM" 
                            />
                        </div>
                    </div>
                    
                    <Link href="/dashboard/bieu-do-ky-thuat/VCB/" onClick={() => handleClick(5)}>
                        <BtnSidebar class_icon="bx bx-equalizer" active={selectedButton === 5} />
                    </Link>
                </div>
            </div>

            {/* Phần button ở chân trang */}
            <div className="mt-auto mb-[50px]">
                <button
                    onClick={toggleTheme} // Thêm sự kiện click để chuyển đổi chế độ sáng/tối
                    className="flex items-center justify-center h-14 w-full text-fintown-btn-disable"
                >
                    <i 
                        className={`bx ${isDarkMode ? 'bxs-sun' : 'bxs-moon'} text-2xl text-fintown-pr9 text-fintown-txt-2 hover:text-fintown-pr9`} 
                    ></i>
                </button>
            </div>
        </div>
    );
}
