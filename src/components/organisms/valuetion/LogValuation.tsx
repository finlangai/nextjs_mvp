import React, { useEffect, useState } from 'react';
import { 
    fetchScenarios,
    selectNewestScenario, 
    selectScenariosData, 
    selectScenariosLoading, 

    fetchIdScenario, 
    deleteScenario,
    selectIdScenario,
    deleteScenarioById,

    resetScenarios,
    resetIdScenario
} from '@/src/redux/Scenarios';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader } from "@/src/components/common/Loader";
import { getPotentialClass } from '@/src/utils/getPotentialClass';
import { selectToken } from "@/src/redux/auth";
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { getModelNameValuation } from '@/src/utils/getModelNameValuation';
import { setHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';
import FilterTimeScenariors from './FilterTimeScenariors';

export default function LogValuation ({containerHeight, symbol} : {containerHeight: number; symbol: string}){
    const dispatch = useAppDispatch();
    const selectButton = useAppSelector(selectSelectedButton);
    const scenariosData = useAppSelector(selectScenariosData);
    const scenariosLoading = useAppSelector(selectScenariosLoading);
    const idScenario = useAppSelector(selectIdScenario);
    const token = useAppSelector(selectToken);

    // FILTER 
    const [monthFt, setMonthFt] = useState('');
    const [yearFt, setYearFt] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const currentYear = currentDate.getFullYear().toString();
    
        setMonthFt(currentMonth); // Cập nhật tháng hiện tại
        setYearFt(currentYear);  // Cập nhật năm hiện tại
    }, []);

    // HÀM MỞ CHART XEM CHI TIẾT
    const OpenDetail = async (symbol: string, id: string) => {
        if (token) {
            let name = getModelNameValuation(selectButton);
            await dispatch(fetchIdScenario({ symbol, name: name, token: token, id }));
            dispatch(setHistorySelectedButton({ button: 1 }));
        }
    };  

    // POP XÓA KỊCH BẢN=============================================================
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const [symbolDelete, setSymbolDelete] = useState('');

    useEffect(() => {
        if (isPopupOpen) {
            setTimeout(() => setIsAnimating(true), 500);
        } else {
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [isPopupOpen]);
    
    const deleteById = async () => {
        if (token) {
            let name = getModelNameValuation(selectButton);
            await dispatch(deleteScenario({ symbol: symbolDelete, name: name, token: token, id: idDelete }));

            const filter = `year=${yearFt}&month=${monthFt}`;
            await dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));

            setIsPopupOpen(false);
        }
    }

    // BỘ LỌC=========================================================================
    const handleStartDateChange = (month: string, year: string) => {
        setMonthFt(month);
        setYearFt(year);
        dispatch(dispatch(resetScenarios()));
        if (token) {
            const filter = `year=${yearFt}&month=${monthFt}`;
            let name = getModelNameValuation(selectButton);         
            dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
        }
    };

    // RENDER=========================================================================

    return (
        <>
        <div className="border-b border-b-fintown-br">
            <div className="pl-[30px] pr-[40px] py-[32px] flex items-center">
                <div className="text-[14px] font-bold text-fintown-txt-1 mr-[8px]">
                    Danh sách kịch bản định giá
                </div>
                <div className="text-[10px] text-fintown-txt-1 h-[20px] w-[20px] rounded-[2px] bg-[#656F79] flex items-center justify-center">
                    <span className="h-max">{scenariosData?.length}</span>
                </div>
            </div>
        </div>

        <FilterTimeScenariors onDateChange={handleStartDateChange}/>

        <div 
        className="overflow-y-auto custom-scrollbarmini2 pl-[30px] pr-[10px] pr-[30px] mr-[10px] flex flex-col gap-y-[20px] py-[20px]"
        style={{height: `${containerHeight - 60}px`}}
        >

            {
                scenariosLoading && (
                    (
                        <div className="flex justify-center items-center h-[280px]">
                            <SpinerLoader />
                        </div>
                    )
                )
            }


            {
                (scenariosData && scenariosData.length > 0 && !scenariosLoading) && (
                    scenariosData.map((items) => (
                        <div className="border-b border-b-fintown-br" key={items.id}>
                            <div className="flex items-center mb-[15px]">
                                <div className="flex items-center">
                                    <div className="text-[14px] font-[600] text-fintown-txt-1">{items?.title}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsPopupOpen(true);
                                        setIdDelete(items?.id);
                                        setSymbolDelete(items?.symbol);
                                    }}                                
                                    className="h-[26px] w-[26px] rounded bg-fintown-btn-2 flex items-center justify-center ml-auto hover:bg-[#54575C]">
                                    <i className='bx bx-trash text-fintown-txt-2'></i>
                                </button>
                            </div>

                            <div className="mb-[15px]">
                                <div className="flex items-center mr-[20px] justify-between w-full mb-[8px]">
                                    <div className="text-[12px] text-fintown-txt-2 mr-[5px]">
                                        Tỷ lệ sinh lời tiềm năng:
                                    </div>
                                    <div className={`text-[12px] text-right font-[600]`} style={{ color: getPotentialClass(items?.potential) }}>
                                        {items?.potential?.toFixed(2)}%
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[12px] text-fintown-txt-2 mr-[5px]">
                                        Giá trị được định giá:
                                    </div>
                                    <div className="text-[12px] text-fintown-txt-1 text-right font-[600]">
                                        {items?.valuated?.toLocaleString('en-US')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex pb-[15px]">
                                <i className='bx bx-edit text-fintown-txt-2 mr-[10px]'></i>

                                <div
                                    className="text-[12px] text-fintown-txt-1"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {items?.note}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-[20px]">
                                <div className="text-fintown-txt-2 text-[12px]">
                                    Đã lưu: {items?.saveAt}
                                </div>

                                <button 
                                onClick={()=> OpenDetail(items?.symbol, items?.id)}
                                disabled={ idScenario?.id === items?.id}
                                className={`
                                    text-fintown-txt-1 text-[12px] py-[6px] px-[13px] rounded 
                                    ${ idScenario?.id === items?.id 
                                        ? 'bg-[#9CA3AF] cursor-not-allowed' 
                                        : 'bg-fintown-pr9'
                                    }  
                                `}
                                >
                                    Mở chart
                                </button>
                            </div>
                        </div>
                    ))
                )
            }

            {
                scenariosData.length === 0 && !scenariosLoading && (
                    <div className="text-fintown-txt-2 text-[14px] text-center py-[20px]">
                        Không có dữ liệu để hiển thị.
                    </div>
                )
            }
        </div>

        {(isPopupOpen || isAnimating) && (
            <div
            className={`fixed w-full h-full top-0 left-0 z-[60] flex justify-center items-start 
            bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
            ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsPopupOpen(false)}
            >
                <div
                onClick={(e) => e.stopPropagation()}
                className={`w-[400px] bg-fintown-bg-stn rounded-[8px] py-[32px] px-[32px] max-h-max
                transform transition-all duration-500 ease-out
                ${isPopupOpen ? 'mt-[100px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}>
                    <div className='h-[60px] w-[60px] bg-[#8b8b8b33] flex justify-center items-center rounded-[50%] mx-auto mb-[20px]'>
                        <i className='bx bx-trash text-fintown-txt-2 text-[30px]' ></i>
                    </div>
                    <div className="text-[16px] text-fintown-txt-1 font-[600] mb-[10px] text-center">
                        Xác nhận xóa kịch bản này?
                    </div>
                    <div className="text-[14px] text-fintown-txt-2 mb-[50px] text-center">
                        Kịch bản sẽ bị xóa khỏi danh sách lưu trữ. Hành động này không thể hoàn tác, bạn vẫn muốn tiếp tục?
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className="py-[12px] w-full text-fintown-txt-1 text-[14px] px-[23px] border border-fintown-br rounded-[8px] mr-[20px]">
                            Hủy bỏ
                        </button>
                        <button
                            onClick={()=> deleteById()}
                            className="py-[12px] w-full text-fintown-txt-1 text-[14px] px-[23px] bg-[#ef4444] rounded-[8px]">
                            Xác nhận xóa
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}