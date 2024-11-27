"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedButtonActive, selectSelectedButton } from '@/src/redux/SiderBar';
import BtnSidebar from '../common/BtnSidebar';
import HoverArrowLink from '../common/HoverArrowLink';

export default function Sidebar() {
    const selectedButton = useSelector(selectSelectedButton);
    const dispatch = useDispatch();

    const handleClick = (buttonIndex: number | null) => {
        dispatch(setSelectedButtonActive({ button: buttonIndex }));
    };

    return (
        <div
        id="sider-bar-left-dashboard"
        className="fixed z-50 top-0 w-[70px] border-r h-screen border-fintown-br bg-fintown-bg flex flex-col justify-between"
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

                    <div onClick={() => handleClick(3)} className="relative group">
                        {/* BtnSidebar - phần tử cha */}
                        <BtnSidebar class_icon="bx bx-bar-chart" active={selectedButton === 3} />

                        {/* Danh sách menu khi hover */}
                        <div className="text-[14px] absolute left-full top-0 hidden group-hover:block bg-[#1E2329] shadow-lg rounded-tr-lg rounded-br-lg border border-fintown-br min-w-[200px]">
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

                    <Link href="/dashboard/bieu-do-ky-thuat/VCB/" onClick={() => handleClick(5)}>
                        <BtnSidebar class_icon="bx bx-candles" active={selectedButton === 5} />
                    </Link>

                    <div onClick={() => handleClick(6)} className="relative group">
                        <BtnSidebar class_icon="bx bxs-calculator" active={selectedButton === 6} />

                        
                        <div className="text-[14px] absolute left-full top-0 hidden group-hover:block bg-[#1E2329] shadow-lg rounded-tr-lg rounded-br-lg border border-fintown-br min-w-[200px]">
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
                </div>
            </div>

            {/* Phần button ở chân trang */}
            <div className="mt-auto mb-[50px]">
                <button className="flex items-center justify-center h-14 w-full text-fintown-btn-disable">
                    <i className="bx bxs-moon text-2xl text-fintown-pr9 text-fintown-txt-2 hover:text-fintown-pr9"></i>
                </button>
            </div>
        </div>

    );
}
