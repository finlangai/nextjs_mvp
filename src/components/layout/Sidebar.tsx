"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/SiderBar';
import BtnSidebar from '../common/BtnSidebar';
import HoverArrowLink from '../common/HoverArrowLink';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const selectedButton = useSelector(selectSelectedButton);
    const dispatch = useDispatch();

    const handleClick = (buttonIndex: number | null) => {
        dispatch(setSelectedButtonActive({ button: buttonIndex }));
    };

    // Khởi tạo state cho chế độ sáng tối từ localStorage, mặc định là chế độ tối
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    // Lưu trạng thái chế độ sáng tối vào localStorage khi thay đổi
    useEffect(() => {
        // Chỉ thực hiện truy cập localStorage trên client-side
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDarkMode(true);
        } else if (theme === 'light') {
            setIsDarkMode(false);
        } else {
            // Nếu không có giá trị trong localStorage, đặt mặc định là dark
            setIsDarkMode(true);
        }
    }, []);

    // Hàm thay đổi chế độ sáng tối khi click vào button
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        // Cập nhật vào localStorage
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Đảm bảo cập nhật chế độ sáng/tối vào body
    useEffect(() => {
        if (isDarkMode === null) return; // Đảm bảo rằng isDarkMode đã được xác định

        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    if (isDarkMode === null) {
        return null; // Hoặc có thể hiển thị loading spinner nếu cần
    }

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
