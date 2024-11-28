import React, { useState, useEffect } from 'react';

export default function AddItemsLeftBarCompare() {
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <>
            <div className='flex flex-col gap-y-[24px]'>
                <div className='w-[55px] h-[55px] flex items-center justify-center border-[2px] border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border-[2px] border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div className='w-[55px] h-[55px] flex items-center justify-center border-[2px] border-fintown-pr9 rounded-[50%]'>
                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                    </div>
                </div>

                <div 
                onClick={() => setIsPopupOpen(true)}  
                className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer text-fintown-txt-2 hover:border-fintown-pr9 hover:text-fintown-pr9'>
                    <div className='text-[30px] hover:text-fintown-pr9'>
                        +
                    </div>
                </div>
            </div>

            {(isPopupOpen || isAnimating) && (
                <div className={`fixed w-full h-full top-0 left-0 z-[999999] flex justify-center items-start 
                    bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                    ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}>

                    <div className={`w-[400px] bg-fintown-bg-stn rounded-[8px] py-[32px] max-h-max
                                            transform transition-all duration-500 ease-out
                                            ${isPopupOpen ? 'mt-[200px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}
                        >     
                        <div className='flex items-center mb-[32px] px-[32px]'>
                            <div className='py-[13px] px-[16px] rounded-[6px] border border-fintown-br flex items-center mr-[12px] w-full'>
                                <i className='bx bx-search text-fintown-txt-2 text-[20px] mr-[14px]'></i>
                                <input
                                    className='text-[14px] text-fintown-txt-1 block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none'
                                    placeholder='Tìm mã cổ phiếu'
                                />
                            </div>

                            <div className='text-fintown-pr9 text-[12px] font-[600] cursor-pointer'>Xóa</div>
                        </div>

                        <div className='flex items-center mb-[24px] px-[32px]'>
                            <div className='text-fintown-txt-2 mr-[5px] text-[12px]'>
                                Còn trống:
                            </div>
                            <div className='text-fintown-txt-1 text-[12px]'>
                                2
                            </div>
                        </div>

                        <div className='mb-[50px] h-[219px] overflow-y-auto custom-scrollbarmini2 pl-[32px] pr-[28px]'>
                            <div className='py-[12px] border-b border-b-fintown-br flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]'>
                                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>
                                    <div className='text-fintown-txt-1 text-[14px]'>
                                        MBS
                                    </div>
                                </div>

                                <div className='text-fintown-txt-1 text-[12px]'>
                                    Kỳ báo cáo hiện có Q2 - 2024
                                </div>

                                <div className='w-[15px] h-[15px] rounded border border-fintown-pr9'>

                                </div>
                            </div>

                            <div className='py-[12px] border-b border-b-fintown-br flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]'>
                                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>
                                    <div className='text-fintown-txt-1 text-[14px]'>
                                        MBS
                                    </div>
                                </div>

                                <div className='text-fintown-txt-1 text-[12px]'>
                                    Kỳ báo cáo hiện có Q2 - 2024
                                </div>

                                <div className='w-[15px] h-[15px] rounded border border-fintown-pr9'>

                                </div>
                            </div>

                            <div className='py-[12px] border-b border-b-fintown-br flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]'>
                                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>
                                    <div className='text-fintown-txt-1 text-[14px]'>
                                        MBS
                                    </div>
                                </div>

                                <div className='text-fintown-txt-1 text-[12px]'>
                                    Kỳ báo cáo hiện có Q2 - 2024
                                </div>

                                <div className='w-[15px] h-[15px] rounded border border-fintown-pr9'>

                                </div>
                            </div>

                            <div className='py-[12px] border-b border-b-fintown-br flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]'>
                                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>
                                    <div className='text-fintown-txt-1 text-[14px]'>
                                        MBS
                                    </div>
                                </div>

                                <div className='text-fintown-txt-1 text-[12px]'>
                                    Kỳ báo cáo hiện có Q2 - 2024
                                </div>

                                <div className='w-[15px] h-[15px] rounded border border-fintown-pr9'>

                                </div>
                            </div>

                            <div className='py-[12px] border-b border-b-fintown-br flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white mr-[14px]'>
                                        <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                                    </div>
                                    <div className='text-fintown-txt-1 text-[14px]'>
                                        MBS
                                    </div>
                                </div>

                                <div className='text-fintown-txt-1 text-[12px]'>
                                    Kỳ báo cáo hiện có Q2 - 2024
                                </div>

                                <div className='w-[15px] h-[15px] rounded border border-fintown-pr9'>

                                </div>
                            </div>
                        </div>


                        <div className='flex justify-end'>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] border border-fintown-br rounded mr-[10px]'>
                                Để sau vậy
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className='py-[10px] text-fintown-txt-1 text-[12px] px-[23px] bg-fintown-pr9 rounded hover:bg-[#34A36A]'>
                                Thêm vào danh sách
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}