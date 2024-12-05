import React, { useEffect, useState } from 'react';

export default function ListLayoutChartSaved(){
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);

    const [layouts, setLayouts] = useState<
        { name: string; layout: any; createdAt: string; }[]
    >([]);

    useEffect(() => {
        // Lấy danh sách bố cục từ localStorage khi component mount
        const existingLayouts = localStorage.getItem("chartLayouts");
        if (existingLayouts) {
          setLayouts(JSON.parse(existingLayouts));
        }
    }, [isPopupOpen, isPopupDelete]);

    return (
        <>
            <i 
                onClick={()=> setIsPopupOpen(true)} 
                className='bx bx-list-check text-fintown-txt-2 text-[26px] mr-[20px] cursor-pointer hover:text-fintown-pr9'
            >
            </i>

            {isPopupOpen && (
                <div
                    className={`fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-start 
                    bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                    ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={()=> setIsPopupOpen(false)}
                >
                    <div
                        className={`w-[450px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
                        transform transition-all duration-500 ease-out
                        ${isPopupOpen ? 'mt-[80px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[24px] flex justify-between items-center">
                            <div>Tải bố cục biểu đồ</div>
                            <i className='bx bx-x text-[24px] cursor-pointer' onClick={()=> setIsPopupOpen(false)}></i>
                        </div>

                        <div className='flex items-center mb-[32px]'>
                            <div className='py-[13px] px-[16px] rounded-[6px] border border-fintown-br flex items-center mr-[12px] w-full'>
                                <i className='bx bx-search text-fintown-txt-2 text-[20px] mr-[14px]'></i>
                                <input
                                    className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                    placeholder='Tìm bố cục đã lưu'
                                    // value={searchTerm}
                                    // onChange={handleSearchChange}
                                />
                            </div>

                            <div 
                                className='text-fintown-pr9 text-[12px] font-[600] cursor-pointer'
                                // onClick={handleClearSearch}
                            >
                                Xóa
                            </div>
                        </div>

                        <div className='custom-scrollbarmini2 h-[400px] overflow-y-auto'>
                            {layouts.length > 0 ? (
                                <>
                                {layouts.map((layout, index) => (
                                    <div className='flex items-center mb-[5px] hover:bg-[rgba(66,64,64,0.34)] cursor-pointer px-[12px] py-[10px] rounded-[8px]'>
                                        <div className='pr-[30px]'>
                                            <div className='text-fintown-txt-1 text-[14px] mb-[5px]'>
                                                {layout?.name}
                                            </div>
                                            <div className='text-fintown-txt-2 text-[12px]'>
                                                {layout?.createdAt}
                                            </div>
                                        </div>
                                        <div className='text-fintown-txt-2 text-[20px] ml-auto'>
                                            <i 
                                                className='bx bx-trash cursor-pointer hover:text-fintown-txt-1' 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Ngăn chặn sự kiện click lan rộng
                                                    setIsPopupDelete(true); // Mở popup xóa
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                ))}
                                </>
                            ) : (
                                <p className="text-[14px] text-fintown-txt-2 text-center mt-[100px]">
                                Không có bố cục nào được lưu.
                                </p>
                            )}
                        </div>
                    </div>

                    {(isPopupDelete) && (
                        <div className='absolute mt-[200px] flex items-center justify-center w-full ' onClick={()=> setIsPopupDelete(false)}> 
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className={`w-[400px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px]  shadow-2xl
                                transform transition-all duration-500 ease-out
                                ${isPopupDelete ? 'mt-[100px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}
                            >

                                <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[10px] text-center">
                                    Xác nhận xóa bố cục "Phân tích kỹ thuật ngày 20/05"?
                                </div>

                                <div className="text-[14px] text-fintown-txt-2 mb-[30px] text-center">
                                    Bố cục sẽ bị xóa và không thể khôi phục, bạn có chắc chắn muốn xóa?
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setIsPopupDelete(false)}
                                        className="py-[12px] w-full text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded-[8px] mr-[20px]">
                                        Hủy bỏ
                                    </button>
                                    <button
                                        className="py-[12px] w-full text-fintown-txt-1 text-[12px] px-[23px] bg-[#ef4444] rounded-[8px]">
                                        Xác nhận xóa
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}