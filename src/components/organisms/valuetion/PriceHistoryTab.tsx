import React, { useEffect, useRef, useState } from 'react';
import HistoryValuetionChart from "../../charts/valuetion/HistoryValuetionChart"
import { 
    selectNewestScenario, 
    selectScenariosData,
    fetchScenarios,

    fetchIdScenario,
    patchScenario, 
    selectIdScenarioLoading, 
    selectScenariosLoading, 
    selectIdScenario,
} from '@/src/redux/Scenarios';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks/useAppStore';
import { getPotentialClass } from '@/src/utils/getPotentialClass';
import { Scenarios } from '@/src/interfaces/Scenarios';
import { SpinerLoader } from '../../common/Loader';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { selectToken } from "@/src/redux/auth";
import { getModelNameValuation } from '@/src/utils/getModelNameValuation';

export default function PriceHistoryTab({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const scenariosData = useAppSelector(selectScenariosData);
    const newestScenario = useAppSelector(selectNewestScenario);
    const idScenario = useAppSelector(selectIdScenario);
    const idScenarioLoading = useAppSelector(selectIdScenarioLoading);
    const scenariosLoading = useAppSelector(selectScenariosLoading);
    const selectButton = useAppSelector(selectSelectedButton);
    const token = useAppSelector(selectToken);
    const hasFetched = useRef(false);
    const [nowData, setNowData] = useState<Scenarios>();

    // ANIMATION POPUP
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // VALIDATION
    const [scenarioName, setScenarioName] = useState(nowData?.title || '');
    const [notes, setNotes] = useState(nowData?.note || '');
    const [errors, setErrors] = useState({ scenarioName: '', notes: ''});

    //CÁC HÀM VALIDATE===================================================================
    const handleSave = async () => {
        let valid = true;
        const newErrors = { scenarioName: '', notes: '' };

        // Validate Tên kịch bản
        if (!scenarioName.trim()) {
            valid = false;
            newErrors.scenarioName = 'Tên kịch bản không được bỏ trống.';
        } else if (scenarioName && scenarioName.length > 50) {
            valid = false;
            newErrors.scenarioName = 'Tên kịch bản không được vượt quá 50 ký tự.';
        }

        // Validate Ghi chú
        if (!notes.trim()) {
            valid = false;
            newErrors.notes = 'Ghi chú không được bỏ trống.';
        } else if (notes && notes.length > 1000) {
            valid = false;
            newErrors.notes = 'Ghi chú không được vượt quá 1000 ký tự.';
        }

        setErrors(newErrors);

        if (valid) {
            const data = { 
                title: scenarioName,
                note: notes
            };

            // console.log('Saving...', data);

            if (nowData?.id) {
                const name = getModelNameValuation(selectButton);
                const year = new Date().getFullYear();
                const filter = `year=${year}`;
                if (token) {
                    await dispatch(patchScenario({ symbol: symbol, name: name, token: token, id: nowData?.id, updatedData: data}));
                    dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
                    dispatch(fetchIdScenario({ symbol: symbol, name: name, token: token, id: nowData?.id }));
                }
                setIsPopupOpen(false);
            }
        }
    };

    // LẦN ĐẦU VÀO TRANG LẤY KỊCH BẢN MỚI NHẤT HIỂN THỊ
    useEffect(() => {
        if (!hasFetched.current) {
            if (idScenario && idScenario !== null) {
                setNowData(idScenario);
                hasFetched.current = true;
                return;
            }    
            if (token) {
                if (newestScenario?.id) {
                    const name = getModelNameValuation(selectButton);
                    dispatch(fetchIdScenario({ symbol, name: name, token: token, id: newestScenario?.id }));
                    hasFetched.current = true;
                }
            }
        }
    }, [dispatch]);

    useEffect(()=> {
        // console.log('idScenario', idScenario)
        if (idScenario && idScenario !== null) {
            setNowData(idScenario);
            hasFetched.current = true;
            return;
        }  
    }, [idScenario]);

    
    useEffect(()=> {
        if (scenariosData?.[0]?.id === idScenario?.id) {
            return;
        };

        if (token) {
            if (scenariosData?.[0]?.id) {
                const name = getModelNameValuation(selectButton);
                dispatch(fetchIdScenario({ symbol, name: name, token: token, id: scenariosData?.[0]?.id }));
            }
        }
    }, [scenariosData])

    // CẬP NHẬT DATA CHO POPUP SỬA 
    useEffect(()=> {
        // console.log('capp', nowData)
        if (nowData) {
            setScenarioName(nowData?.title);
            setNotes(nowData?.note);
        }
    }, [nowData]);

    if (idScenarioLoading || scenariosLoading) {
        return(
            <>
            <div className='w-full flex items-center justify-center min-h-[400px]'>                
                < SpinerLoader />
            </div>
            </>
        )
    };

    if (scenariosData.length === 0) {
        return(
            <div className='text-fintown-txt-2 h-[400px] text-center flex justify-center items-center'>
                Bạn chưa lưu kịch bản nào!
            </div>
        )
    }

    return (
        <>
            <div className="px-[24px] py-[24px] h-full border-b border-b-fintown-br dark:border-b-fintown-br-light">
                <div className=" text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[12px] flex items-center">
                    <div className="mr-[10px]">Ghi chú của bạn</div>
                    <button 
                    onClick={() => setIsPopupOpen(true)} 
                    className='ml-auto flex items-center py-[10px] px-[16px] border text-fintown-txt-1 dark:text-fintown-txt-1-light border-fintown-br dark:border-fintown-br-light rounded-[6px] '>
                        <i className='bx bx-edit mr-[10px] text-[18px] cursor-pointer'></i>
                        <div className='text-[12px]'>Chỉnh sửa ghi chú</div>
                    </button>
                </div>

                <div className="text-[20px] text-fintown-txt-1 dark:text-fintown-txt-1-light mb-[10px] font-bold">
                    {nowData?.title}
                </div>

                <div className="text-[14px] text-fintown-txt-2 mb-[20px]">
                    {nowData?.note}
                </div>

                {/* <div className='h-[15px] w-[1px] bg-fintown-br mr-[10px]'></div> */}
                <div className='text-fintown-txt-2 text-[12px]'>
                    Đã lưu vào: <span className='text-fintown-txt-1 dark:text-fintown-txt-1-light'>{nowData?.saveAt}</span>
                </div>
            </div>

            <div className="border-b border-b-fintown-br w-full flex items-center items-stretch">

                <div className="w-full border-r border-r-fintown-br dark:border-r-fintown-br-light">
                    <div className="flex items-center gap-x-[24px] py-[18px] border-b border-b-fintown-br dark:border-b-fintown-br-light px-[27px] ">
                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-fintown-txt-1 dark:bg-fintown-txt-1-light mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Giá cổ phiếu tại thời điểm định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className={`h-[10px] w-[10px] rounded-[50%] mr-[8px]`} style={{ backgroundColor: getPotentialClass(nowData?.potential) }}></div>
                            <div className="text-[14px] text-fintown-txt-2">Kết quả định giá</div>
                        </div>

                        <div className="flex items-center">
                            <div className="h-[10px] w-[10px] rounded-[50%] bg-[blue] mr-[8px]"></div>
                            <div className="text-[14px] text-fintown-txt-2">Giá cổ phiếu hiện tại</div>
                        </div>
                    </div>

                    <div className="mt-[40px] px-[20px] w-full">
                        < HistoryValuetionChart data={nowData} />
                    </div>
                </div>

                <div className="min-w-[224px]">
                    <div className="h-[50%] border-b border-b-fintown-br dark:border-b-fintown-br-light flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Kết quả định giá
                            </div>
                            <div className="font-bold text-[30px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-center">
                                {nowData?.valuated?.toLocaleString('en-US')}
                            </div>
                        </div>
                    </div>

                    <div className="h-[50%] flex items-center justify-center">
                        <div>
                            <div className="mb-[5px] text-[12px] text-fintown-txt-2 text-center">
                                Tỷ lệ sinh lợi tiềm năng
                            </div>
                            <div className={`font-bold text-[30px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-center`} style={{ color: getPotentialClass(nowData?.potential) }}>
                                {nowData?.potential?.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(isPopupOpen || isAnimating) && (
                <div
                onClick={() => setIsPopupOpen(false)}
                className={`fixed w-full h-full top-0 left-0 z-[60] flex justify-center items-start 
                bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out 
                ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className={`
                    w-[400px] bg-fintown-bg-stn dark:bg-fintown-bg-stn-light rounded-[8px] py-[32px] px-[32px] max-h-max
                    transform transition-all duration-500 ease-out
                    ${isPopupOpen ? 'mt-[100px] translate-y-0 opacity-100' : 'mt-0 -translate-y-12 opacity-0'}`}>

                    <div className="text-[16px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-[600] mb-[10px]">
                        Chỉnh sửa ghi chú
                    </div>
                    <div className="text-[12px] text-fintown-txt-2 mb-[33px]">
                        Thay đổi ghi chép của bạn về kịch bản này bao gồm tiêu đề và nội dung cần thiết.
                    </div>

                    {/* Tên kịch bản */}
                    <div className="mb-[10px] text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-[600]">Tên cho kịch bản này</div>
                    <div className={`py-[13px] px-[16px] rounded-[8px] border 
                    ${errors.scenarioName ? 'border-[#E03C4A]' : 'border-fintown-br dark:border-fintown-br-light'}
                    `}>
                        <input
                            className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none"
                            placeholder="Ví dụ: Kết quả ước tính cho FPT - Q2/2025"
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                        />
                    </div>
                    {errors.scenarioName && (
                        <div className="text-red-500 text-[12px] mt-[5px]">{errors.scenarioName}</div>
                    )}

                    <div className='mb-[32px]'></div>

                    {/* Ghi chú */}
                    <div className="mb-[10px] text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light font-[600]">Ghi chú</div>
                        <div 
                        className={`py-[13px] px-[16px] rounded-[8px] border mb-[33px]
                        ${errors.notes ? 'border-[#E03C4A]' : 'border-fintown-br dark:border-fintown-br-light'}`}>
                            <textarea
                                className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light block w-full placeholder:text-fintown-txt-2 bg-transparent outline-none custom-scrollbarmini2"
                                placeholder="Hãy viết vài dòng ghi chú ngắn gọn"
                                rows={6}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            {errors.notes && <div className="text-red-500 text-[12px] mt-[4px]">{errors.notes}</div>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="py-[10px] text-fintown-txt-1 dark:text-fintown-txt-1-light text-[12px] px-[23px] border border-fintown-br dark:border-fintown-br-light rounded-[8px] mr-[10px]">
                                Để sau vậy
                            </button>
                            <button
                                onClick={handleSave}
                                className="py-[10px] text-fintown-txt-1 text-[12px] px-[23px] bg-fintown-pr9 rounded-[8px]">
                                Lưu kịch bản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}