import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { 
    selectCompanyDescriptionsData, 
    selectCompanyDescriptionsError, 
    selectCompanyDescriptionsLoading, 
    fetchCompanyDescriptions 
} from '@/src/redux/CompanyDescription';
import { CompanyDescription } from '@/src/interfaces/CompanyDescription';
import { BarsLoader } from '../../common/Loader';
import { NoneDataComponent } from '../../common/NoneData';

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
        <div className='flex flex-col'>
            <div id="overview" className='pr-[20px] pb-[100px] anchor-section ' >
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Tổng quan
                </div>
                <div className='text-xm text-fintown-txt-1 text-justify'>
                    {companyData?.summary?.overview }
                </div>
            </div>

            <div id="history" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Lịch sử phát triển
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {Array.isArray(companyData?.summary?.historyDev) && companyData?.summary?.historyDev.length > 0 ? (
                        companyData.summary?.historyDev.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.summary?.historyDev) && companyData.summary?.historyDev.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    ) : (
                        < NoneDataComponent/>
                    )}
                </div>
            </div>
            
            <div id="promise" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Lời hứa
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {Array.isArray(companyData?.summary?.companyPromise) && companyData.summary?.companyPromise.length > 0 ? (
                        companyData.summary?.companyPromise.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.summary?.companyPromise) && companyData.summary?.companyPromise.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    ) : (
                        < NoneDataComponent/>
                    )}
                </div>
            </div>

            <div id="businessrisk" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Thách thức
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {Array.isArray(companyData?.summary?.businessRisk) && companyData.summary?.businessRisk.length > 0 ? (
                        companyData.summary?.businessRisk.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData.summary?.businessRisk) && companyData.summary?.businessRisk.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    ) : (
                        < NoneDataComponent/>
                    )}
                </div>
            </div>

            <div id="keydevelopments" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Chiến lược kinh doanh
                </div>
                <div className='flex flex-col gap-y-[12px]'>
                    {Array.isArray(companyData?.summary?.keyDevelopments) && companyData.summary?.keyDevelopments.length > 0 ? (
                        companyData.summary?.keyDevelopments.map((items, index) => (
                            <div className='flex gap-x-[10px] items-start mb-[5px]' key={index}>
                                {Array.isArray(companyData?.summary?.keyDevelopments) && companyData.summary?.keyDevelopments.length >= 2 && (
                                    <div className='h-[6px] min-w-[6px] bg-fintown-txt-1 rounded-[50%] mt-[8px]'></div>
                                )}
                                <div className='text-xm text-fintown-txt-1 text-justify'>
                                    {items}
                                </div>
                            </div>
                        ))
                    ) : (
                        < NoneDataComponent/>
                    )}
                </div>
            </div>

            <div id="basic" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Thông tin cơ bản
                </div>
                
                <div className='flex flex-col gap-y-[12px]'>
                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Mã SIC:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental.sic}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Mã ICB:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental.icbCode}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Tên quốc tế:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental.internationName}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Trụ sở chính:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.headQuarters}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Số điện thoại:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.phone}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Fax:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.fax}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Email:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.email}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Mã số thuế:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.taxIdNumber}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Số lượng nhân sự:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.fundamental?.employees?.toLocaleString('US')}         
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Vốn điều lệ:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {(Number((companyData?.fundamental?.charterCapital / 1_000_000_000).toFixed(0))).toLocaleString('en-US')}  Tỷ                       
                        </div>
                    </div>
                </div>
            </div>

            <div id="listing" className='pr-[20px] pb-[100px] anchor-section'>
                <div className='text-fintown-txt-1 font-bold text-[20px] mb-[12px]'>
                    Thông tin niêm yết
                </div>
                
                <div className='flex flex-col gap-y-[12px]'>
                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Sàn niêm yết:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                        {companyData?.listingInfo.exchange}                                 
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Ngày niêm yết:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                        {companyData?.listingInfo.dateOfListing}                                                                 
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Giá chào sàn:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                            {companyData?.listingInfo.initialListingPrice.toLocaleString('US')}                                                           
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Lần cuối phát hành:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                        {companyData?.listingInfo.dateOfIssue}                                 
                        </div>
                    </div>

                    <div className='flex gap-x-[5px] items-start'>
                        <div className='text-xm text-fintown-txt-1 text-justify font-bold'>
                            Khối lượng đang niêm yết:
                        </div>
                        <div className='text-xm text-fintown-txt-1 text-justify'>
                        {companyData?.listingInfo.listingVolume.toLocaleString('US')}                                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}