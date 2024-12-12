import { useEffect, useState, useRef } from "react";
import { Realtime } from "ably";
import Link from "next/link";
import { selectToken } from "@/src/redux/auth";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchNotificationsToken, selectTokenNotificationsData } from "@/src/redux/Notifications/getTokenNotificationsSlice";
import { fetchNotifications, selectNotificationsData, postNotification } from "@/src/redux/Notifications/dataNotificationsSlice";
import { formatTimeAgo } from "@/src/utils/formatTimeAgo";
import { DataNotifications } from "@/src/interfaces/Notifications";


export default function NotificationsComponent() {
    const dispatch = useAppDispatch();
    const hasFetched = useRef(false);
    const tokenUser = useAppSelector(selectToken);
    const tokenNotificationsData = useAppSelector(selectTokenNotificationsData);
    const notificationsData = useAppSelector(selectNotificationsData);
    const [nowData, setNowData] = useState<DataNotifications[]>([]);

    const [notiRed, setNotiRed] = useState(false);
    const [start, setStart] = useState(true);
    const [isOpen, setIsOpen] = useState(false); 

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); 
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); 
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ĐÁNH DẤU LÀ ĐÃ ĐỌC
    const readNoti = (id: string) => {
        if (tokenUser) {
            // Khởi tạo hoặc tái sử dụng mảng idArray
            let idArray: string[] = [];

            // Tìm đối tượng trong mảng notificationsData với id tương ứng
            const notification = nowData.find(notif => notif.id === id);
    
            // Thêm ID vào mảng
            idArray.push(id);
    
            // Kiểm tra nếu mảng có phần tử
            if (idArray.length > 0) {
                dispatch(postNotification({
                    token: tokenUser,
                    body: { uuids: idArray },
                }));

                
                console.log("Updated ID Array:", idArray);
            }
        }
    };    

    // HÀM TẢI THÊM THÔNG BÁO
    const viewMore = () => {
        if (tokenUser) {
            console.log(tokenUser)
            const conditional = `limit=5&offset=0&from=${nowData?.[0]?.createdAt}`;
            setStart(false);
            dispatch(fetchNotifications({ token: tokenUser,  conditional: conditional}));
        }    
    }

    // B1: FETCH API LẤY TOKEN CHO NOTIFICATIONS
    useEffect(() => {
        if (!hasFetched.current) {
            if (tokenUser) {
                dispatch(fetchNotificationsToken({ token: tokenUser }));
                hasFetched.current = true;
            }
        }
    }, [tokenUser]);

    // B2: THEO DÕI TOKEN ĐÃ ĐƯỢC LẤY SAU ĐÓ CẬP NHẬT VÀ KẾT NỐI WEBSOCKET
    useEffect(() => {
        if (tokenNotificationsData && tokenNotificationsData !== null) {
            const realtime = new Realtime({
                key: process.env.ABLY_KEY,
                token: tokenNotificationsData.token,
            });

            const channel = realtime.channels.get("public:notification");
            const conditional = `limit=5&offset=0`;

            channel.subscribe("new-notification", (event) => {
                // console.log("Event received: ", event);
                if (tokenUser) {
                    dispatch(fetchNotifications({ token: tokenUser,  conditional: conditional}));
                }
            });
        }
    }, [tokenNotificationsData]);

    // B3: THEO DÕI DỮ LIỆU NẾU CÓ THAY ĐỔI HOẶC CẬP NHẬT MỚI THÌ LIỀN LẤY VỀ
    useEffect(() => {
        if (!start) {
            const newItems = notificationsData.filter(
                newItem => !nowData.some(existingItem => existingItem.id === newItem.id)
            );
            setNowData(prevData => [...prevData, ...newItems]);
            setStart(true);
        } else {
            setNowData(notificationsData);
        }
    }, [notificationsData]);

    // B4: THEO DÕI THÔNG BÁO ĐỂ CẬP NHẬT DẤU CHẤM ĐỎ BÁO HIỆU
    useEffect(()=>{
        const hasUnreadNotifications = nowData.some(notification => !notification.isReaded);
        setNotiRed(hasUnreadNotifications);
    }, [nowData])

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="flex items-center relative" onClick={toggleDropdown}>
                {/* Vòng thông báo */}
                {
                    !notiRed
                    ? ''
                    : <div className="h-[10px] w-[10px] rounded-full bg-red-600 absolute top-0 right-0"></div>
                }
                {/* Biểu tượng chuông */}
                <i className='bx bx-bell text-fintown-txt-1 dark:text-fintown-txt-1-light text-[24px] hover:text-fintown-pr9'></i>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-fintown-bg dark:bg-fintown-bg-light rounded-[10px] shadow-lg">
                    <div className="py-[26px] min-w-[300px] max-w-[300px] text-fintown-txt-2">
                        <div className="px-[24px] flex items-center text-fintown-txt-1 dark:text-fintown-txt-1-light justify-between pb-[20px] border-b border-b-fintown-br dark:border-fintown-br-light">
                            <div className="text-[16px] font-bold">Thông báo</div>
                            <i className='bx bx-x text-[20px] cursor-pointer' onClick={toggleDropdown}></i>
                        </div>

                        <div className="custom-scrollbarmini2 h-[380px] overflow-y-auto"> 
                            {   
                                nowData.length > 0
                                ? 
                                    nowData?.map((val) => (
                                        <>
                                            <Link 
                                            href={`/dashboard/co-phieu/${val?.title}/ket-qua-du-bao`}
                                            onClick={()=> readNoti(val?.id)}
                                            >
                                                <div key={val?.id} 
                                                className={`
                                                    cursor-pointer
                                                    pt-[16px] pb-[12px] flex w-full px-[24px]
                                                    ${val?.isReaded ? 'hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light' : 'bg-fintown-hvr-btn-1 dark:bg-fintown-hvr-btn-1-light'}
                                                    `}
                                                
                                                >
                                                    <div className="border border-fintown-br dark:border-fintown-br-light min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] overflow-hidden rounded-[50%] bg-white mr-[12px]">
                                                        <img src={val?.thumbnail} className="w-full h-full object-contain" alt="vcb" />
                                                    </div>
                                                    <div>
                                                        <div className="truncate-text text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[10px]">
                                                            <span className="font-bold">{val?.title}</span> - {val?.content}.
                                                        </div>
                                                        
                                                        <div className="flex items-center">                                
                                                            <div className="text-[12px] text-fintown-txt-2">{formatTimeAgo(val?.createdAt)}</div>
                                                            <div className="w-[1px] bg-fintown-br dark:bg-fintown-br-light h-[15px] ml-[10px] mr-[10px]"></div>
                                                            <div className={`
                                                                h-[8px] w-[8px] rounded-[50%] bg-fintown-pr9
                                                                ${val?.isReaded ? 'bg-fintown-txt-2' : 'bg-fintown-pr9'}
                                                                `
                                                            }></div>
                                                        </div> 

                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    ))
                                : 
                                <>
                                    <div className="text-center px-[24px] h-full py-[30px] text-fintown-txt-2">
                                       Chưa có thông báo nào
                                    </div>
                                </>
                            }
                        </div>

                        <div className="px-[24px] pt-[16px]">
                            <button 
                            onClick={()=> viewMore()}
                            className={`
                            ${notificationsData.length === 0 || notificationsData.length < 5 ? 'hidden' : ''}
                            text-[12px] text-fintown-txt-1 w-full py-[12px] bg-fintown-pr9 rounded-[8px]`}>
                                Xem thông báo cũ hơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
