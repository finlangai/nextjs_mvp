"use client";

import Link from "next/link";

export default function ProfilePage() {
    return (
        <>
            <section>
                <div className="pt-[40px] pb-[174px] max-w-[1120px] mr-auto ml-auto">
                    <div className="flex h-screen">
                        {/* Sidebar */}
                        <div className="w-1/4 bg-gray-900 p-4">
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-info-circle text-blue-500"></i>
                                    <span className="text-fintown-txt-1">Thông tin cơ bản</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-check-circle text-green-500"></i>
                                    <span className="text-fintown-txt-1">Tích hợp TKCK</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-users text-yellow-500"></i>
                                    <span className="text-fintown-txt-1">Hội viên</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-coins text-blue-500"></i>
                                    <span className="text-fintown-txt-1">Điểm Credit</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-user-friends text-red-500"></i>
                                    <span className="text-fintown-txt-1">Mời bạn bè</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-sticky-note text-orange-500"></i>
                                    <span className="text-fintown-txt-1">Ghi chú</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-cog text-green-500"></i>
                                    <span className="text-fintown-txt-1">Cài đặt</span>
                                </li>
                            </ul>
                        </div>

                        {/* Content Area */}
                        <div className="w-3/4 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://placehold.co/50x50"
                                        alt="User profile picture"
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h1 className="text-2xl font-bold text-fintown-txt-1">Tấn Phước</h1>
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-yellow-500 text-black px-2 py-1 rounded">BASIC</span>
                                            <span className="text-red-500">• Chưa tích hợp</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-fintown-txt-1">0</span>
                                    <i className="fas fa-coins text-yellow-500"></i>
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
                                        <i className="fas fa-user text-gray-500"></i>
                                        <input
                                            type="text"
                                            
                                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-fintown-txt-1">Email</label>
                                    <div className="flex items-center bg-gray-800 p-2 rounded">
                                        <i className="fas fa-envelope text-gray-500"></i>
                                        <input
                                            type="email"
                                            
                                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-fintown-txt-1">Mật khẩu</label>
                                    <div className="flex items-center bg-gray-800 p-2 rounded">
                                        <i className="fas fa-lock text-gray-500"></i>
                                        <input
                                            type="password"
                                           
                                            className="bg-transparent border-none focus:outline-none ml-2 w-full text-fintown-txt-1"
                                        />
                                        <button className="text-gray-500">Đổi mật khẩu</button>
                                    </div>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Cập nhật thông tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
