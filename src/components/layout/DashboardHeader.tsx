import { useEffect, useState } from "react";
import InputSearch from "../common/InputSearch";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout, refreshToken } from "@/src/redux/auth/authSlice";
import { RootState, AppDispatch } from "@/src/redux/store";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import MarketSummary from "../organisms/MarketSummary";

export default function DashboardHeader({isTechnicalChart} : {isTechnicalChart: boolean}) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    let { user, loading, error } = useSelector((state: RootState) => state.auth) as {
        user: { email: string; avatar?: string; fullname?: string };
        loading: boolean;
        error: string | null;
    };
    const [isTokenChecked, setIsTokenChecked] = useState(false); // Trạng thái để theo dõi việc kiểm tra token
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

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            router.push('/');
        } catch (err) {
            console.error("Lỗi khi đăng xuất:", err);
        }
    };

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
                        <Link href="/profile/information">
                            <img
                                src={user.avatar || "/imgs/default-avatar.jpg"}
                                alt="Avatar"
                                className="w-[40px] h-[40px] rounded-full object-cover"
                            /> 
                        </Link>
                        <div>
                            <span className="text-fintown-txt-1 text-sm">{user.fullname || user.email}</span>
                            <p className="text-fintown-txt-2 text-xs">{user.email}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-fintown-txt-1 text-sm rounded-md bg-fintown-btn-2 px-[19px] py-[6px]"
                        >
                            Đăng xuất
                        </button>
                        {/* Nút nâng cấp tài khoản */}
                        <Link href="/pricing">
                            <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">
                                Nâng cấp tài khoản
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
