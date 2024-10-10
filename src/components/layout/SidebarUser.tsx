"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const menuItems = [
        { label: "Thông tin cơ bản", href: "/profile/information", icon: "bx-info-circle", color: "text-blue-500" },
        { label: "Tích hợp TKCK", href: "/profile/integrated-tkck", icon: "bx-check-circle", color: "text-green-500" },
        { label: "Hội viên", href: "/profile/member", icon: "bx-crown", color: "text-yellow-500" },
        { label: "Điểm Credit", href: "/profile/credit", icon: "bx-coin-stack", color: "text-blue-500" },
        { label: "Mời bạn bè", href: "/profile/invite-friend", icon: "bx-user-plus", color: "text-red-500" },
        { label: "Ghi chú", href: "/profile/notes", icon: "bx-note", color: "text-orange-500" },
        { label: "Cài đặt", href: "/profile/settings", icon: "bx-cog", color: "text-green-500" },
    ];

    return (
        <>

                        {/* Sidebar */}
                        <div className="w-1/4 bg-gray-900 p-4">
                            <ul className="space-y-4">
                             
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform ${activeIndex === index ? "bg-gray-700 scale-105" : "hover:bg-gray-800 hover:scale-105"
                                            }`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <i className={`bx ${item.icon} text-2xl ${item.color} transition-transform duration-300`}></i>
                                        <Link href={item.href}>
                                            <span className="text-fintown-txt-1">{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
 
        </>
    );
}
