import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { BarsLoader } from '../common/Loader';
import { Holder } from '@/src/interfaces/Holder';
import { fetchHolders, selectHoldersData, selectHoldersError, selectHoldersLoading } from '@/src/redux/Holders';

export default function HolderList({symbol} : {symbol: string}){
    const dispatch = useAppDispatch();
    const selectHolders = useAppSelector(selectHoldersData);
    const [companyData, setcompanyData] = useState<Holder[]>([]);
    const hasFetchedData = useRef(false);
    const holdersLoading = useAppSelector(selectHoldersLoading);

    useEffect(() => {
        if (!hasFetchedData.current && selectHolders.length === 0) {
            dispatch(fetchHolders({ symbol }));
            hasFetchedData.current = true; 
        }
    }, [symbol]);

    useEffect(() => {
        if (selectHolders.length !== 0) {
            setcompanyData(selectHolders);
        }
    }, [selectHolders]);

    if (holdersLoading) {
        return (
            <>
            <div className='w-full flex justify-center items-center'>
                < BarsLoader/>
            </div>
            </>
        )
    };

    return (
        <>
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
                {companyData?.map((items) => (
                    <div key={items.name} className='w-full  border-b border-fintown-lnr-1'>
                        <div className='px-[24px] py-[20px] flex items-center justify-between'>
                            <div className='text-fintown-txt-1 text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[252px]'>
                                {items.name}
                            </div>

                            <div className='text-fintown-txt-1 w-max text-right text-[14px] pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                {items.shares.toLocaleString('en-US')}
                            </div>

                            <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                {items.isOrganization ? "Tổ chức" : "Cá nhân"}
                            </div>

                            <div className='text-fintown-txt-1 w-max text-[14px] text-right pr-[10px] flex-grow-0 flex-shrink-0 basis-[110px]'>
                                {items.ownership.toFixed(4)}%
                            </div>

                            <div className='text-fintown-txt-1 w-max text-[14px] text-right flex-grow-0 flex-shrink-0 basis-[110px]'>
                                {items.isForeigner ? "Nước ngoài" : "Trong nước"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}