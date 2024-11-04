import React, { useState, useRef, useEffect } from 'react';
import SlidingTabs from '@/src/components/common/SlidingTabs';
import { fetchInstrumentList, selectInstrumentListsData, selectInstrumentListsLoading, selectInstrumentListsError } from '@/src/redux/InstrumentList';
import { SpinerLoader } from '@/src/components/common/Loader';
import { Instruments } from '@/src/interfaces/Instruments';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import Link from 'next/link';

interface Tab {
    id: number;
    label: string | null;
    api: string | null;
}

export default function LeftBarTechnicalChart({symbol} : {symbol:string}){
    const dispatch = useAppDispatch();
    const selectInstrumentLists = useAppSelector(selectInstrumentListsData);
    const [NowData, setNowData] = useState<Instruments[] | null>(null);
    const hasFetched = useRef(false);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(1);
    const ListsLoading = useAppSelector(selectInstrumentListsLoading);
    const [isDescending, setIsDescending] = useState<boolean>(true); // Track sorting order
    const [sortKey, setSortKey] = useState<keyof Instruments | null>(null); // Track sorted column

     // State cho việc sắp xếp
    const [sortConfig, setSortConfig] = useState<{ key: keyof Instruments | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

    const tabs: Tab[] = [
        { id: 0, label: null, api: null },
        { id: 1, label: "VN30", api: "vn30" },
        { id: 2, label: "HOSE", api: "hose" },
        { id: 3, label: "HNX", api: "hnx" }
    ];

    const handleTabChange = (index: number, api: string) => {
        setActiveTabIndex(index);
        dispatch(fetchInstrumentList({ category: api }));
    };

    // Fetch API Lần đầu
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchInstrumentList({ category: "vn30" }));
            hasFetched.current = true;
        }
    }, [dispatch]);
    
    // Lưu data đã fetch
    useEffect(() => {
        if (selectInstrumentLists !== null) {
            setNowData(selectInstrumentLists);
        }
    }, [selectInstrumentLists]);

    // Hàm xử lý sắp xếp=================================================
    const handleSort = (key: keyof Instruments) => {
        if (NowData) {
            const sortedData = [...NowData].sort((a, b) => {
                if (isDescending) {
                    return b[key] > a[key] ? 1 : -1;
                } else {
                    return a[key] > b[key] ? 1 : -1;
                }
            });
            setNowData(sortedData);
            setSortKey(key); // Set the key for the sorted column
            setIsDescending(!isDescending); // Toggle sort order
        }
    };

    // Khi Data thay đổi hủy biểu diễn icoin sắp xếp
    useEffect(() => {
        if (ListsLoading) {
            setSortKey(null);
            setIsDescending(true);
        }
    }, [ListsLoading]);

    return(
        <>
        <div id='left-bar-technical-chart-vvv' className='min-w-[358px] border-r border-r-fintown-br bg-fintown-bg'>
            <div className=' border-b border-b-fintown-br'>
                <div className='px-[20px] pt-[16px] mb-[12px]'>
                    <div className='py-[13px] px-[20px] flex items-center rounded-[8px] border border-fintown-br'> 
                        <i className='bx bx-search text-fintown-txt-2 text-[20px] pr-[13px]'></i>
                        <input className='bg-transparent text-[14px] outline-none text-fintown-txt-1 w-full' type="text" placeholder='Tìm cổ phiếu' />
                    </div>
                </div>
                <div className='px-[20px] py-[13px]'>
                    < SlidingTabs onTabChange={handleTabChange} tabs={tabs} gap={"24px"} />
                </div>
            </div>

            <div className='flex items-center px-[24px] py-[14px] border-b border-b-fintown-br'>
                <div className='text-fintown-txt-2 font-bold text-[12px] w-full text-right'>Cổ phiếu</div>
                <div
                    className='text-fintown-txt-2 font-bold text-[12px] min-w-[74px] flex justify-end items-center hover:text-fintown-pr9 cursor-pointer'
                    onClick={() => handleSort('price')}
                >
                    <p className='mr-[3px]'>Giá</p>
                    <i className={`bx ${sortKey === 'price' ? (isDescending ? 'bx-down-arrow-alt' : 'bx-up-arrow-alt') : 'bx-down-arrow-alt'} text-[15px]`}></i>
                </div>
                <div
                    className='text-fintown-txt-2 font-bold text-[12px] min-w-[86px] flex justify-end items-center hover:text-fintown-pr9 cursor-pointer'
                    onClick={() => handleSort('volume')}
                >
                    <p className='mr-[3px]'>KL</p>
                    <i className={`bx ${sortKey === 'volume' ? (isDescending ? 'bx-down-arrow-alt' : 'bx-up-arrow-alt') : 'bx-down-arrow-alt'} text-[15px]`}></i>
                </div>
                <div
                    className='text-fintown-txt-2 font-bold text-[12px] min-w-[61px] flex justify-end items-center hover:text-fintown-pr9 cursor-pointer'
                    onClick={() => handleSort('delta')}
                >
                    <p className='mr-[3px]'>%</p>
                    <i className={`bx ${sortKey === 'delta' ? (isDescending ? 'bx-down-arrow-alt' : 'bx-up-arrow-alt') : 'bx-down-arrow-alt'} text-[15px]`}></i>
                </div>
            </div>

            <div
            className='custom-scrollbarmini2'
            style={
                {
                    height: "600px",
                    overflowY: "scroll"
                }
            }>
                {
                    ListsLoading ? (
                        <div className='flex w-full justify-center items-center h-[428px]'>
                            <SpinerLoader />
                        </div>
                    ) : (
                        Array.isArray(NowData) && NowData.length > 0 ? (
                            NowData.map((item, index) => (
                                <div key={index} 
                                className={`flex items-center px-[24px] py-[14px] border-b border-b-fintown-br hover:bg-fintown-bg-stn
                                ${item.symbol === symbol ? "bg-fintown-bg-stn" : ""}
                                `}>
                                    <div className="flex items-center w-full">
                                        <div className="flex justify-center w-[25px]">
                                            <i className={`bx bxs-star text-[18px] mr-[10px] cursor-pointer ${item.isInWatchlist ? "text-fintown-pr9" : "text-fintown-txt-2"}`}></i>
                                        </div>
                                        <div className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] rounded-[50%] overflow-hidden bg-white mr-[7px] flex items-center justify-center">
                                            <img className="w-full h-full object-contain" src={item.logo} alt="" />
                                        </div>
                                        <Link href={`/dashboard/bieu-do-ky-thuat/${item.symbol}`}>
                                            <div className="text-fintown-txt-1 font-bold text-[12px] cursor-pointer hover:text-fintown-pr9">
                                                {item.symbol}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-fintown-txt-1 font-bold text-[12px] min-w-[74px] flex justify-end items-center">
                                        <p>{item.price.toLocaleString('en-US')}</p>
                                    </div>
                                    <div className="text-fintown-txt-1 font-bold text-[12px] min-w-[86px] flex justify-end items-center">
                                        <p>{item.volume.toLocaleString('en-US')}</p>
                                    </div>
                                    <div 
                                        className={`font-bold text-[12px] min-w-[61px] flex justify-end items-center ${
                                            item.delta > 0 ? 'text-fintown-stt-buy' : 
                                            item.delta < 0 ? 'text-fintown-stt-sell' : 
                                            'text-fintown-txt-1'
                                        }`}
                                    >
                                        <p>{item.delta}%</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex w-full justify-center items-center h-[428px] text-fintown-txt-1">
                                Cổ phiếu chưa được cập nhật
                            </div>
                        )
                    )
                }
            </div>
        </div>       
        </>
    )
}