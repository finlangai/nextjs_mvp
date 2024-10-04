"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import useSetSelectedButtonSiderBar from '@/src/redux/hooks/useButtonsiderBar';
import useSetSelectedButtonStockPage from '@/src/redux/hooks/useButtonstockPage';

import { TableSection, NormalSection, CardSection, IndexSectionOne, IndexSectionTwo } from '@/src/components/organisms/ProfileSection';

export default function HoSoDoanhNghiepPage ({ params }: { params: { symbol: string } }) {
    const { symbol } = params;

  // Xác định UI của trang đang ở
  useSetSelectedButtonSiderBar(3);
  useSetSelectedButtonStockPage(2);

  const handleScroll = (id:string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
        if (sidebarRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;

            if (containerRect.top <= 70) { 
                setIsFixed(true);
                setSidebarStyle({
                    position: 'fixed',
                    top: '70px',
                    width: `${sidebarRef.current.offsetWidth}px`,
                    left: `${containerRect.left + 40}px`,
                    height: "100vh",
                    marginTop: "20px"
                });
            } else {
                setIsFixed(false);
                setSidebarStyle({});
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Chạy một lần để set up initial position
    handleScroll();

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
    }, []);

    return (
        <>
            <div className='flex px-[40px]  mt-[50px] h-screen scroll-moot '  ref={containerRef}>
                <div className='min-w-[318px] ' id='siderbar'  ref={sidebarRef}>
                    <div className='min-w-[318px]'  style={sidebarStyle}>
                       <Link href="/dashboard/co-phieu/VCB/ho-so-doanh-nghiep">
                        <button className='text-fintown-txt-1 h-[48px] bg-fintown-btn-active-3 px-[20px] border-l-[5px] border-fintown-pr9 block w-full text-left'>Tổng quan</button>
                       </Link> 
                        <button onClick={() => handleScroll('section2')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Lịch sử phát triển</button>
                        <button onClick={() => handleScroll('section3')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Lời hứa</button>
                        <button onClick={() => handleScroll('section4')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Thách thức</button>
                        <button onClick={() => handleScroll('section5')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Lĩnh vực kinh doanh</button>
                        <button onClick={() => handleScroll('section6')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Chiến lược kinh doanh</button>
                        <button onClick={() => handleScroll('section7')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Thông tin cơ bản</button>
                        <button onClick={() => handleScroll('section8')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Danh sách cổ đông</button>
                        <button onClick={() => handleScroll('section9')} className='text-fintown-txt-1 h-[48px] px-[20px] block w-full text-left'>Ban lãnh đạo</button>
                    </div>
                </div>

                <div className='pl-[40px] pb-[20px] flex flex-col gap-y-[100px] flex-1 overflow-y-auto custom-scrollbarmini scroll-moot border-l border-fintown-lnr-1'>

                    <div id="x" className='pr-[20px]' >
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Tổng quan
                        </div>
                        < NormalSection />
                    </div>

                    <div id="section2" className='pr-[20px]' >
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Lịch sử phát triển
                        </div>
                        < IndexSectionOne />
                    </div>
                    
                    <div id="section3" className='pr-[20px]' >
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Lời hứa
                        </div>

                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            Việt Nam là một trong những thị trường mới nổi hấp dẫn, thu hút đầu tư nước ngoài với những lợi thế như giá bất động sản công nghiệp rẻ, môi trường chính trị ổn định, kinh tế đang phát triển, nguồn nhân công trẻ, dồi dào cộng thêm vị trí thuận lợi về giao thông, cửa ngõ của các hoạt động giao thương quốc tế. Chính phủ tạo môi trường thuận lợi cho các nhà đầu tư bằng cách chú trọng công tác nâng cấp và phát triển cơ sở hạ tầng tại các khu công nghiệp. Việc tham gia đàm phán, ký kết các Hiệp định thương mại, Hiệp định Thương mại tự do Việt Nam - EU, Hiệp định thương mại tự do với liên minh Hải quan Nga, Belarus, Kazakhstan và Hiệp định thương mại tự do với các nước ASEAN là cơ hội lớn cho làn sóng dịch chuyển của các doanh nghiệp quốc tế vào Việt Nam. Do đó, nhu cầu sử dụng các khu công nghiệp sẽ gia tăng mạnh trong tương lai.                         
                        </div>
                    </div>

                    <div id="section4" className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Thách thức
                        </div>

                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            Hiện nay, mặc dù kinh tế thế giới và trong nước đã có những dấu hiệu tích cực, tuy nhiên,tình hình khó khăn chung và những thay đổi về cơ chế chính sách cũng sẽ ảnh hưởng đến Tổng Công ty trong giai đoạn đầu khi chuyển sang hình thức cổ phần. Doanh nghiệp cũng có khả năng chịu ảnh hưởng của các yếu tố rủi ro tài chính như rủi ro thanh khoản, rủi ro tỷ giá, rủi ro lãi suất, rủi ro từ giá cổ phiếu. Tổng Công ty sẽ phải đối mặt với sự cạnh tranh khốc liệt từ các đối thủ cạnh tranh do sự phát triển của ngành bất động sản trong nước.                        
                        </div>
                    </div>

                    <div id="section5" className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Lĩnh vực kinh doanh
                        </div>
                        
                        <div className='flex flex-col gap-y-[12px]'>

                            <div className='flex gap-x-[10px] items-start'>
                                <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    Ngày 24/04/1993: Ngân hàng Thương mại Cổ phần Á Châu (ACB) được thành lập với vốn điều lệ ban đầu là 20 tỷ đồng theo Giấy phép số 0032/NH-GP của Ngân hàng Nhà nước; 
                                </div>
                            </div>

                            <div className='flex gap-x-[10px] items-start'>
                                <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    Ngày 24/04/1993: Ngân hàng Thương mại Cổ phần Á Châu (ACB) được thành lập với vốn điều lệ ban đầu là 20 tỷ đồng theo Giấy phép số 0032/NH-GP của Ngân hàng Nhà nước; 
                                </div>
                            </div> 

                        </div>
                    </div>

                    <div id="section6" className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Thông tin cơ bản
                        </div>
                        
                        <div className='flex flex-col gap-y-[12px]'>

                            <div className='flex gap-x-[5px] items-start'>
                                <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                                    Mã SIC:
                                </div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    ACB                                
                                </div>
                            </div>

                            <div className='flex gap-x-[5px] items-start'>
                                <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                                    Mã SIC:
                                </div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    ACB                                
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="section7" className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Thông tin niêm yết
                        </div>
                        
                        <div className='flex flex-col gap-y-[12px]'>

                            <div className='flex gap-x-[5px] items-start'>
                                <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                                    Mã SIC:
                                </div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    ACB                                
                                </div>
                            </div>

                            <div className='flex gap-x-[5px] items-start'>
                                <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                                    Mã SIC:
                                </div>
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    ACB                                
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="section8" className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Danh sách cổ đông
                        </div>

                        <div className='w-full bg-fintown-bg-stn rounded-[8px]'>
                            <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                    Tên cổ đông
                                </div>

                                <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                    Số cổ phần
                                </div>

                                <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                    Loại cổ đông
                                </div>

                                <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                    Tỷ lệ sở hữu
                                </div>

                                <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                    Nguồn gốc
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='w-full rounded-[8px] border-b border-fintown-lnr-1'>
                                <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                    <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                        KUSTOCEM PTE. LTD.
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        13,906,666
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Tổ chức
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        18.69%
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Nước ngoài
                                    </div>
                                </div>
                            </div>

                            <div className='w-full rounded-[8px] border-b border-fintown-lnr-1'>
                                <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                    <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                        KUSTOCEM PTE. LTD.
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        13,906,666
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Tổ chức
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        18.69%
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Nước ngoài
                                    </div>
                                </div>
                            </div>

                            <div className='w-full rounded-[8px] border-b border-fintown-lnr-1'>
                                <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                    <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                        KUSTOCEM PTE. LTD.
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        13,906,666
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Tổ chức
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        18.69%
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Nước ngoài
                                    </div>
                                </div>
                            </div>

                            <div className='w-full rounded-[8px] border-b border-fintown-lnr-1'>
                                <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                    <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                        KUSTOCEM PTE. LTD.
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        13,906,666
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Tổ chức
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        18.69%
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Nước ngoài
                                    </div>
                                </div>
                            </div>

                            <div className='w-full rounded-[8px] border-b border-fintown-lnr-1'>
                                <div className='px-[24px] py-[20px] flex items-center justify-between'>
                                    <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                        KUSTOCEM PTE. LTD.
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        13,906,666
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Tổ chức
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        18.69%
                                    </div>

                                    <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                        Nước ngoài
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="section9"  className='pr-[20px]'>
                        <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                            Ban lãnh đạo
                        </div>

                        <div className="flex flex-wrap gap-[20px]">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="flex flex-grow items-center px-[14px] py-[14px] border border-fintown-lnr-1 rounded-[8px] w-full md:w-[calc(33.333%-20px)]">
                                <div className="w-[60px] h-[60px] overflow-hidden rounded-[50%] mr-[20px]">
                                    <img className="w-full h-full" src="https://i.pinimg.com/564x/7d/20/0d/7d200d1ffb71351210774f2d2201f9b8.jpg" />
                                </div>
                                <div>
                                    <div className="text-fintown-txt-1 font-bold">Trương Gia Bình</div>
                                    <div className="text-fintown-txt-2 text-[14px]">Chủ tịch HĐQT</div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}