import { useEffect, useState, useRef } from "react";

export default function NotificationsComponent() {
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng menu thông báo
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Khai báo ref cho menu thông báo

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); 
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Đóng dropdown nếu click bên ngoài
        }
    };

    useEffect(() => {
        // Lắng nghe sự kiện click bên ngoài
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="flex items-center relative" onClick={toggleDropdown}>
                {/* Vòng thông báo */}
                <div className="h-[10px] w-[10px] rounded-full bg-red-600 absolute top-0 right-0"></div>
                {/* Biểu tượng chuông */}
                <i className='bx bx-bell text-fintown-txt-1 dark:text-fintown-txt-1-light text-[24px] hover:text-fintown-pr9'></i>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-fintown-btn-5 dark:bg-fintown-btn-5-light rounded-[10px] shadow-lg">
                    <div className="py-[26px] min-w-[300px] max-w-[300px] text-fintown-txt-2">
                        <div className="px-[24px] flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light justify-between pb-[20px] border-b border-b-fintown-br dark:border-fintown-br-light">
                            <div className="text-[16px] font-bold">Thông báo</div>
                            <i className='bx bx-x text-[20px] cursor-pointer' onClick={toggleDropdown}></i>
                        </div>

                        <div className="custom-scrollbarmini2 h-[380px] overflow-y-auto px-[24px]"> 
                            <div className="pt-[16px] pb-[12px] flex">
                                <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] overflow-hidden rounded-[50%] bg-white mr-[12px]">
                                    <img src="/imgs/logo_cty/vcb.png" className="w-full h-full" alt="vcb" />
                                </div>
                                <div>
                                    <div className="truncate-text text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[10px]">
                                        <span className="font-bold">VCB</span> - đã cập nhật kết quả dự báo. Hiệu quả sinh lời của công ty VNM có thể được đánh giá như sau:
                                        Công ty VNM có hiệu quả sinh lời dựa trên vốn giảm dần trong giai đoạn 2017-2023.
                                    </div>
                                    
                                    <div className="flex items-center">                                
                                        <div className="text-[12px] text-fintown-txt-2">Khoảng 1 tiếng</div>
                                        <div className="w-[1px] bg-fintown-br dark:bg-fintown-br-light h-[15px] ml-[10px] mr-[10px]"></div>
                                        <div className="h-[8px] w-[8px] rounded-[50%] bg-fintown-pr9"></div>
                                    </div> 

                                </div>
                            </div>
                        </div>

                        <div className="px-[24px] pt-[16px]">
                            <button className="text-[12px] text-fintown-txt-1 w-full py-[12px] bg-fintown-pr9 rounded-[8px]">
                                Xem thông báo cũ hơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
