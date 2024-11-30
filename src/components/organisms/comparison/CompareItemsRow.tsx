import React, { useState } from 'react';
import SemiCircularGauge from '@/src/components/charts/ProgressCircle';

export default function CompareItemsRow() {
    const [isContainerVisible, setIsContainerVisible] = useState(false);

    const toggleContainer = () => {
        setIsContainerVisible(!isContainerVisible);
    };

    return (
        <>
            <div className='flex items-center mb-[49px]'>
                <div className='relative w-max mr-[5px]'>
                    <div className='ml-[-20px]'>
                        <SemiCircularGauge />
                        <div className='top-[28px] left-[13px] absolute min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                    </div>
                    <div className='top-[70px] left-[20px] text-fintown-txt-1 text-[12px] absolute w-full'>
                        7.55
                    </div>
                </div>

                <div className='flex items-center justify-center rounded-[50%] border border-fintown-br w-[25px] h-[25px] mr-[25px]'>
                    <div className='text-fintown-txt-1 text-[8px]'>
                        VS
                    </div>
                </div>

                <div className='relative w-max'>
                    <div className='ml-[-20px]'>
                        <SemiCircularGauge />
                        <div className='top-[28px] left-[13px] absolute min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                    </div>
                    <div className='top-[70px] left-[20px] text-fintown-txt-1 text-[12px] absolute w-full'>
                        7.55
                    </div>
                </div>

                <div className="relative w-[20px] h-[20px] mr-[25px]">
                    <i 
                        className={`bx bx-recycle text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9 absolute top-0 left-0 transition-all duration-500 ${
                            isContainerVisible ? 'opacity-0 rotate-180 pointer-events-none' : 'opacity-100'
                        }`}
                        onClick={toggleContainer}
                    ></i>

                    <i 
                        className={`bx bx-x-circle text-fintown-txt-2 text-[20px] cursor-pointer hover:text-fintown-pr9 absolute top-0 left-0 transition-all duration-500 ${
                            isContainerVisible ? 'opacity-100' : 'opacity-0 rotate-180 pointer-events-none'
                        }`}
                        onClick={toggleContainer}
                    ></i>
                </div>

                <div 
                    className={`flex items-center gap-x-[14px] transition-all duration-500 transform ${
                        isContainerVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
                    style={{display: isContainerVisible ? 'flex' : 'none'}}
                >
                    <div className='relative w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer overflow-hidden group'>
                        <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                        <div 
                            style={{backgroundColor: "rgb(94 93 93 / 42%)"}}
                            className='w-full h-full absolute text-fintown-txt-1 text-[30px] flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0'
                        >
                            +
                        </div>
                    </div>
                    
                    <div className='relative w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer overflow-hidden group'>
                        <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                        <div 
                            style={{backgroundColor: "rgb(94 93 93 / 42%)"}}
                            className='w-full h-full absolute text-fintown-txt-1 text-[30px] flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0'
                        >
                            +
                        </div>
                    </div>
                    <div className='relative w-[55px] h-[55px] flex items-center justify-center border border-fintown-br rounded-[50%] cursor-pointer overflow-hidden group'>
                        <div className='h-[30px] w-[30px] rounded-[50%] overflow-hidden flex items-center justify-center bg-white'>
                            <img className='w-full h-full object-contain' src="/imgs/logo_cty/vcb.png" alt="" />
                        </div>
                        <div 
                            style={{backgroundColor: "rgb(94 93 93 / 42%)"}}
                            className='w-full h-full absolute text-fintown-txt-1 text-[30px] flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0'
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}