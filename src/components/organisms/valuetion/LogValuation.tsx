import React, { useEffect, useState } from 'react';
import { 
    selectNewestScenario, 
    selectScenariosData, 
    selectScenariosLoading, 

    fetchIdScenario, 
    deleteScenario, 
    deleteScenarioById 
} from '@/src/redux/Scenarios';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { SpinerLoader } from "@/src/components/common/Loader";
import { getPotentialClass } from '@/src/utils/getPotentialClass';
import { selectToken } from "@/src/redux/auth";
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { getModelNameValuation } from '@/src/utils/getModelNameValuation';

export default function LogValuation ({containerHeight} : {containerHeight: number}){
    const dispatch = useAppDispatch();
    const selectButton = useAppSelector(selectSelectedButton);
    const scenariosData = useAppSelector(selectScenariosData);
    const scenariosLoading = useAppSelector(selectScenariosLoading);
    const token = useAppSelector(selectToken);

    // LẤY ID
    const idScenarioinArrayFirtChild = useAppSelector(selectNewestScenario);
    const [checkId, setCheckId] = useState('abc');
    useEffect(()=> {
        if (idScenarioinArrayFirtChild?.id) {
            setCheckId(idScenarioinArrayFirtChild.id);
        }
    }, [idScenarioinArrayFirtChild])

    // HÀM MỞ CHART XEM CHI TIẾT
    const OpenDetail = async (symbol: string, id: string) => {
        if (token) {
            let name = getModelNameValuation(selectButton);
            await dispatch(fetchIdScenario({ symbol, name: name, token: token, id }));
            setCheckId(id);
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
            await dispatch(deleteScenarioById(idDelete));
            if (idScenarioinArrayFirtChild?.id) {
                await dispatch(fetchIdScenario({ symbol: symbolDelete, name: name, token: token, id: idScenarioinArrayFirtChild?.id }));
                await setCheckId(idScenarioinArrayFirtChild.id);
            }
            setIsPopupOpen(false);
        }
    }

    if (scenariosLoading) {
        return (
            <div className="flex justify-center items-center h-[280px]">
                <SpinerLoader />
            </div>
        );
    }

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

        <div className="py-[13px] pl-[30px] pr-[30px] flex items-center justify-between border-b border-fintown-br">
            <div className="text-fintown-txt-1 text-[12px]">
                Lọc theo tháng
            </div>
            <div className="flex items-center w-full max-w-[117px] px-[12px] py-[7px] rounded border border-fintown-br justify-between cursor-pointer">
                <i className='bx bx-calendar-event text-[18px] text-fintown-txt-2'></i>
                <div className="text-fintown-txt-2 text-[12px]">
                    12/07/2024
                </div>
            </div>
        </div>

        <div 
        className="overflow-y-auto custom-scrollbarmini2 pl-[30px] pr-[10px] pr-[30px] mr-[10px] flex flex-col gap-y-[20px] py-[20px]"
        style={{height: `${containerHeight - 60}px`}}
        >
            {
                scenariosData && scenariosData.length > 0 ? (
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
                                disabled={ checkId === items?.id}
                                className={`
                                    text-fintown-txt-1 text-[12px] py-[6px] px-[13px] rounded 
                                    ${ checkId === items?.id 
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
                ) : (
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