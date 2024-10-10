"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store"; // Đảm bảo đường dẫn đúng
import Link from "next/link";
import SidebarUser from '@/src/components/layout/SidebarUser';

export default function InformationPage() {
    // Lấy thông tin người dùng từ Redux store
    const user = useSelector((state: RootState) => state.auth.user); 
    const token = useSelector((state: RootState) => state.auth.token); 

    return (
        <div className="w-3/4 p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <img
                        src={user?.avatar || "/imgs/default-avatar.jpg"}
                        alt="User profile picture"
                        className="rounded-full w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-fintown-txt-1">{user?.email || "Tên người dùng"}</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">BASIC</span>
                            <span className="text-red-500">• Chưa tích hợp</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-fintown-txt-1">0</span>
                    <i className="bx bx-coin text-yellow-500 text-2xl"></i>
                    <span className="text-fintown-txt-1">Credit của bạn</span>
                    <Link href="#" className="text-blue-500">
                        Xem chi tiết
                    </Link>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block mb-2 text-fintown-txt-1">Tên hiển thị</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-user text-gray-500 text-2xl"></i>
                        <input
                            type="text"
                            value={user?.fullname || ""}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-fintown-txt-1">Email</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-envelope text-gray-500 text-2xl"></i>
                        <input
                            type="email"
                            value={user?.email || ""}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                </div>
              
                <div>
                    <label className="block mb-2 text-fintown-txt-1">Số điện thoại</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-phone text-gray-500 text-2xl"></i>
                        <input
                            type="string"
                            value={user?.phone || ""}
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                    </div>
                </div>
             
                <div>
                    <label className="block mb-2 text-fintown-txt-1">Mật khẩu</label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                        <i className="bx bx-lock text-gray-500 text-2xl"></i>
                        <input
                            type="password"
                            placeholder="********"
                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                        />
                        <button className="text-gray-500">Đổi mật khẩu</button>
                    </div>
                </div>
                <button className="text-fintown-txt-1 text-sm rounded-md bg-fintown-pr9 px-[19px] py-[6px]">Cập nhật thông tin</button>
            </div>
        </div>
    );
}
