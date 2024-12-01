import { useEffect, useState, useRef } from "react";
import InputSearch from "../common/InputSearch";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout, refreshToken } from "@/src/redux/auth/authSlice";
import { RootState, AppDispatch } from "@/src/redux/store";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import MarketSummary from "../organisms/MarketSummary";
import NotificationsComponent from "../organisms/Notifications";

export default function DashboardHeader({isTechnicalChart} : {isTechnicalChart: boolean}) {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); 

    const router = useRouter();
    let { user, loading, error } = useSelector((state: RootState) => state.auth) as {
        user: { email: string; avatar?: string; fullname?: string; role?: string ;
        };
        loading: boolean;
        error: string | null;
    };

    const [isTokenChecked, setIsTokenChecked] = useState(false); 

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    await Promise.all([
                        dispatch(refreshToken()).unwrap(),
                        dispatch(fetchUserProfile()).unwrap(),
                    ]);
                } catch (err) {
                    
                }
            } 
            // else {
            //     // Nếu không có token, chuyển hướng về trang chính
            //     router.push('/');
            // }
            setIsTokenChecked(true); // Đã kiểm tra token
        };
        checkAndRefreshToken();
    }, [dispatch, router]);

    // ĐĂNG XUẤT
    const handleLogout = async () => {
        try {
            await dispatch(logout());
            router.push('/');
        } catch (err) {
            console.error("Lỗi khi đăng xuất:", err);
        }
    };

    // XỔ MENU PROFILE
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    }; 

    const handleClickOutside = (event: MouseEvent) => {
        // Kiểm tra nếu click bên ngoài dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        // Lắng nghe sự kiện click bên ngoài
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Hủy bỏ sự kiện khi component unmount
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
      
    // XỔ MENU NOTI

    return (
        <header
            className="w-full h-[70px] border-b border-fintown-br px-[40px] flex items-center justify-between bg-fintown-bg fixed top-0 z-50 ml-[70px]"
            style={{ width: 'calc(100% - 70px)' }}
            id="dasnhboard-header"
            >

            {
                isTechnicalChart === !true && (
                    <>
                        <InputSearch />
                    </>
                )
            } 

            {
                isTechnicalChart === true && (
                    <>
                        <MarketSummary />
                    </>
                )
            } 

            <div className="flex items-center gap-x-2.5 ml-auto">
                {loading ? (
                    <div>...</div>
                ) : user ? (
                    <div className="flex items-center gap-x-3">
                        <div>
                            <div className={`${user?.role === 'basic' ? 'text-[yellow]' : 'text-fintown-pr9'} text-[10px] flex items-center gap-x-[5px] justify-end`}>
                                <i className='bx bx-cube text-[14px]'></i>
                                <div className="capitalize font-bold text-right">{user?.role}</div>
                            </div>
                            <div className="text-fintown-txt-1 text-sm text-right">{user.fullname}</div>
                        </div>

                        <div className="w-[1px] bg-fintown-br h-[25px] ml-[5px] mr-[5px]"></div>
                        
                        <div className="relative" ref={dropdownRef}>
                            {/* href="/profile/information" */}

                            <div className="flex items-center" onClick={toggleDropdown}>
                                <img
                                src={user.avatar || "/imgs/default-avatar.jpg"}
                                alt="Avatar"
                                className="w-[40px] h-[40px] rounded-full object-cover"
                                />
                                <i className="bx bx-chevron-down ml-[12px] text-fintown-txt-1 text-[24px]" />
                            </div>

                            {/* Dropdown menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 bg-fintown-bg-stn rounded-[10px] shadow-lg">
                                    <ul className="px-[24px] pb-[26px] pt-[10px] min-w-max text-fintown-txt-2">

                                        <li className="border-b border-b-fintown-br py-[14px] flex items-center gap-x-[12px] min-w-max hover:text-fintown-pr9">
                                            <i className='bx bx-user-circle text-[24px]' ></i>
                                            <Link href="/" className="text-[14px]">Thông tin cá nhân</Link>
                                        </li>

                                        <li className="border-b border-b-fintown-br py-[14px] flex items-center gap-x-[12px] min-w-max hover:text-fintown-pr9">
                                            <i className='bx bx-cube text-[24px]' ></i>
                                            <Link href="/" className="text-[14px]">Quyền hạn sử dụng</Link>
                                        </li>

                                        <li className="py-[14px] flex items-center gap-x-[12px] min-w-max hover:text-fintown-pr9">
                                            <i className='bx bx-history text-[24px]' ></i>
                                            <Link href="/" className="text-[14px]">Lịch sử thanh toán</Link>
                                        </li>

                                        <li className="mt-[12px]">
                                            <button className="py-[10px] w-full bg-fintown-pr9 text-fintown-txt-1 rounded-[8px] text-[14px]" onClick={() => handleLogout()}>Đăng xuất</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="w-[1px] bg-fintown-br h-[25px] ml-[5px] mr-[5px]"></div>

                        < NotificationsComponent />

                        <div className="w-[1px] bg-fintown-br h-[25px] ml-[5px] mr-[5px]"></div>

                        <Link href="/pricing">
                            <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">
                                Nâng cấp
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link href="/">
                            <button
                                className="text-fintown-txt-1 text-sm rounded-md bg-fintown-btn-2 px-[19px] py-[6px]"
                            >
                                Đăng nhập
                            </button>
                        </Link>

                        <Link href="/signup">
                            <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">
                                Đăng ký
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
