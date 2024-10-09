import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    selectCompanyDescriptionsData, 
    selectCompanyDescriptionsError, 
    selectCompanyDescriptionsLoading, 
    fetchCompanyDescriptions 
} from '@/src/redux/CompanyDescription';
import { CompanyDescription } from '@/src/interfaces/CompanyDescription';
import { BarsLoader } from '../common/Loader';

export default function CompanyDescriptionComponent({symbol} : {symbol: string}) {
    const dispatch = useAppDispatch();
    const selectCompanyDescription = useAppSelector(selectCompanyDescriptionsData);
    const [companyData, setcompanyData] = useState<CompanyDescription | null>(null);

    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (!hasFetchedData.current && !selectCompanyDescription) {
            dispatch(fetchCompanyDescriptions({ symbol }));
            hasFetchedData.current = true; 
        }
    }, [symbol, selectCompanyDescription]);

    useEffect(() => {
        console.log(selectCompanyDescription)
        if (selectCompanyDescription !== null) {
            setcompanyData(selectCompanyDescription);
        }
    }, [selectCompanyDescription]);

    if (companyData === null) {
        return (
            <>
            <div>
                < BarsLoader/>
            </div>
            </>
        )
    };
    
    return (
        <>
        <div className='flex flex-col gap-y-[100px]'>
            <div id="x" className='pr-[20px]' >
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Tổng quan
                </div>
                <div className='text-xm text-fintown-txt-1 text-justify'>
                    {companyData?.overview }
                </div>
            </div>

            <div id="section2" className='pr-[20px]' >
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Lịch sử phát triển
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {
                        Array.isArray(companyData?.historyDev) && companyData?.historyDev.length > 0 && companyData?.historyDev.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.historyDev) && companyData?.historyDev.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div id="section3" className='pr-[20px]' >
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Lời hứa
                </div>

                <div className='flex flex-col gap-y-[12px]'>
                    {
                        Array.isArray(companyData?.companyPromise) && companyData?.companyPromise.length > 0 && companyData?.companyPromise.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.companyPromise) && companyData?.companyPromise.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div id="section4" className='pr-[20px]'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Thách thức
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {
                        Array.isArray(companyData?.businessRisk) && companyData.businessRisk.length > 0 && companyData.businessRisk.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData.businessRisk) && companyData.businessRisk.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div id="section5" className='pr-[20px]'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Chiến lược kinh doanh
                </div>
                
                <div className='flex flex-col gap-y-[12px]'>
                    {
                        Array.isArray(companyData?.keyDevelopments) && companyData?.keyDevelopments.length > 0 && companyData?.keyDevelopments.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.keyDevelopments) && companyData?.keyDevelopments.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}