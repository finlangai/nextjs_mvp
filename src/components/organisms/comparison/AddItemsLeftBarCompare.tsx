import React, { useState, useEffect } from 'react';
import { selectCompanyData, removeCompany } from '@/src/redux/Comparison';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import AddItemPopup from './AddItemPopup';

export default function AddItemsLeftBarCompare({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();

    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const colors = ['#64E766', '#E7E575', '#E565A1', '#9552CF', '#66BED6'];

    const companyData = useAppSelector(selectCompanyData);

    const removeCompanyFunction = (symbol: string) => {
        dispatch(removeCompany(symbol));
    }

    return (
        <>
            <div className='flex flex-col gap-y-[24px]'>

                {
                    companyData?.map((val, index) => (
                        <div
                            key={val?.symbol}
                            className="w-[55px] h-[55px] flex items-center justify-center rounded-[50%] cursor-pointer"
                            style={{
                                border: `2px solid ${colors[index % colors.length]}`,
                            }}
                        >
                            <div className="relative group h-[35px] w-[35px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white border-[2px] border-fintown-txt-1">
                                <img
                                className="w-full h-full object-contain "
                                src={val?.logo}
                                alt={val?.symbol || ''}
                                />
                                <div 
                                    onClick={()=> removeCompanyFunction(val?.symbol)}
                                    style={{backgroundColor: "#cb0e0e7a"}}
                                    className={`
                                    w-full h-full absolute text-fintown-txt-1 text-[30px] flex items-center justify-center 
                                    transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0
                                    ${val?.symbol === symbol ? 'hidden' : ''}
                                    `}
                                >
                                    <i className='bx bx-x'></i> 
                                    {/* <i className='bx bx-trash text-[18px]' ></i> */}
                                </div>
                            </div>
                        </div>
                    ))
                }


                <div 
                onClick={() => setIsPopupOpen(true)}  
                className='w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer text-fintown-txt-2 hover:border-fintown-pr9 hover:text-fintown-pr9'>
                    <div className='text-[30px] hover:text-fintown-pr9'>
                        +
                    </div>
                </div>
            </div>

            {(isPopupOpen) && (
                < AddItemPopup 
                isPopupOpen={isPopupOpen} 
                setIsPopupOpen={setIsPopupOpen}
                />
            )}
        </>
    )
}