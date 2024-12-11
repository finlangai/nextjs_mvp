"use client";
import Cookies from 'js-cookie';

import LoginForm from "@/src/components/form/Login";
import Link from "next/link";
import './login.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function HomePage() {    
    const [login, setLogin  ] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token"); 
        if (token) {
            setLogin(true);
         router.push('/dashboard');
        }
      }, []);
    return (
        <>
        {login ? (
            <>
                <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
                </div>
            
             </>
        ) : 
        (<div> <section>
            <div className="pt-[40px] pb-[174px] max-w-[1120px] mr-auto ml-auto">
                <div className="flex items-center">
                    <div className="w-full max-w-[507px]">
                        <div className="text-[20px] text-fintown-txt-1 mb-[20px]">
                            NỀN TẢNG ĐẦU TƯ HÀNG ĐẦU
                        </div>
                        <h1 className="font-bold text-[50px] text-fintown-txt-1 mb-[25px]">
                            Đạt được lợi nhuận dễ dàng với <span className="text-fintown-pr9">Fintown</span>
                        </h1>
                        <div className="text-[16px] text-fintown-txt-1">Chúng tôi tin tưởng bạn sẽ đạt được nhiều hơn những gì mong đợi.</div>
                        <div className="text-[16px] text-fintown-txt-1 mb-[48px]">Hãy bắt đầu trải nghiệm ngay.</div>
                        <Link href="/dashboard">
                            <button  className="text-fintown-txt-1 text-sm h-[48px] px-[30px] bg-fintown-pr9 rounded-[8px]">
                                <span>Tìm hiểu ngay bây giờ</span>
                            </button>
                        </Link>
                    </div>
                    <div className="ml-auto text-fintown-txt-1">
                        < LoginForm/>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="pt-[40px] pb-[174px] max-w-[1120px] mr-auto ml-auto">
                <div className="text-center mb-[107px]">
                    <h2 className="font-bold text-fintown-txt-1 text-[40px]">Phân tích chuyên sâu,</h2>
                    <div className="text-fintown-txt-1 text-[40px]">hiểu thấu doanh nghiệp</div>
                </div>
                
                <div className="flex justify-between items-center">
                    <img className="w-[475px] h-[281px] border-[2px] rounded-[20px] border-fintown-br" src="/imgs/cap.jpg" alt="" />

                    <div className="min-w-[554px]">
                        <div className="pb-[30px] border-b border-fintown-br mb-[30px]">
                            <div className="flex items-center mb-[9px] justify-end">
                                <p className="text-[24px] font-bold text-fintown-txt-1 mr-[13px]">Dự báo tăng trưởng</p>
                                <i className='bx bx-trending-up text-fintown-txt-1 text-[22px]'></i>
                            </div>
                            <div className="text-fintown-txt-1 text-[16px] text-right">
                                Xem phân tích và kết quả dự báo chính xác cao với AI
                            </div>
                        </div>

                        <div className="pb-[30px] border-b border-fintown-br mb-[30px]">
                            <div className="flex items-center mb-[9px] justify-end">
                                <p className="text-[24px] font-bold text-fintown-txt-1 mr-[13px]">Phân tích thị trường</p>
                                <i className='bx bx-bar-chart text-fintown-txt-1 text-[22px]'></i>
                            </div>
                            <div className="text-fintown-txt-1 text-[16px] text-right">
                                Cung cấp các công cụ hữu ích để theo dõi diễn biến thị trường
                            </div>
                        </div>

                        <div className="pb-[30px] border-b border-fintown-br">
                            <div className="flex items-center mb-[9px] justify-end">
                                <p className="text-[24px] font-bold text-fintown-txt-1 mr-[13px]">Tư vấn thông minh</p>
                                <i className='bx bx-happy text-fintown-txt-1 text-[22px]'></i>
                            </div>
                            <div className="text-fintown-txt-1 text-[16px] text-right">
                                Nhận những lời đánh giá sâu sắc từ AI của Fintown
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        
        <section className="bg-fintown-bg-stn">
            <div className="max-w-[1120px] mr-auto ml-auto pt-[83px] pb-[83px]">

                <div className="flex justify-center ">
                    <h2 className="font-bold text-fintown-txt-1 text-[40px] mb-[57px] max-w-[652px] text-center">
                        Hãy để cho lợi nhuận của bạn luôn bay cao từ lúc này!
                    </h2>
                </div>
                
                <Link href="/signup" className="flex justify-center">
                    <button  className="text-fintown-txt-1 text-sm h-[48px] px-[30px] bg-fintown-pr9 rounded-[8px]">
                        <span>Tạo tài khoản ngay</span>
                    </button>
                </Link>
            </div>
        </section> </div>)}
       
        </>
    );
}