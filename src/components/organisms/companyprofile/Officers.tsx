import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchOfficers, selectOfficersData, selectOfficersError, selectOfficersLoading } from '@/src/redux/Officers';
import { BarsLoader } from '../../common/Loader';
import { Officers } from '@/src/interfaces/Officers';

export default function OfficersComponent({symbol} : {symbol: string}){
    const dispatch = useAppDispatch();
    const selectOfficers = useAppSelector(selectOfficersData);
    const [companyData, setcompanyData] = useState<Officers[]>([]);
    const officersLoading = useAppSelector(selectOfficersLoading);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (!hasFetchedData.current && selectOfficers.length === 0) {
            dispatch(fetchOfficers({ symbol }));
            hasFetchedData.current = true; 
        }
    }, [symbol]);

    useEffect(() => {
        console.log(selectOfficers)
        if (selectOfficers.length !== 0) {
            setcompanyData(selectOfficers);
        }
    }, [selectOfficers]);

    if (officersLoading) {
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
            <div id="officers"  className='pr-[20px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Ban lãnh đạo
                </div>

                <div className="flex flex-wrap gap-[20px]">
                    {companyData?.map((items) => (
                        <div key={items.name} className="flex flex-grow items-center px-[14px] py-[14px] border border-fintown-lnr-1 rounded-[8px] w-full md:w-[calc(33.333%-20px)]">
                        <div className="w-[60px] h-[60px] overflow-hidden rounded-[50%] mr-[20px]">
                            <img className="w-full h-full object-contain" src={items.avatar} />
                        </div>
                        <div>
                            <div className="text-fintown-txt-1 font-bold">{items.name}</div>
                            <div className="text-fintown-txt-2 text-[14px]">{items.position}</div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};