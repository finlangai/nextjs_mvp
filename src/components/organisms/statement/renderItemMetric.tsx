import React from 'react';
import { FinancialMetric } from '@/src/interfaces/FinancialMetric';
import MiniColumnChartWrapper from './MiniColumnChartWrapper';

const renderItemMetric = (item: FinancialMetric) => {
    return (
        <React.Fragment key={item.name}>
            <div className='border-b border-fintown-br dark:border-fintown-br-light'>
                <div className='flex justify-between py-[18px] items-center hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light px-[16px] px-[16px]'>
                    <div className="flex flex-grow-0 flex-shrink-0 basis-[350px] items-center pr-[30px]">
                        <div className="flex flex-nowrap flex-grow flex-shrink basis-auto">
                            <div className='text-sm text-fintown-txt-1 dark:text-fintown-txt-1-light'>
                                {item.name}
                                <span>{item.unit == null ? "" : ` (${item.unit})`}</span>
                            </div>
                        </div>
                        <MiniColumnChartWrapper data={item.values} />
                    </div>
                    <div className="flex-grow flex-shrink basis-auto ">
                        <div className='flex justify-between'>
                            {item.values.slice(0, 9).map((val) => (
                                <div className="text-xm text-fintown-txt-1 dark:text-fintown-txt-1-light min-w-[calc(11.1111%)] pl-[16px]" key={`${val.period}-${val.year}-${val.quarter}`}>
                                    <div className="flex justify-end">
                                        {val.value !== null ? val.value.toLocaleString('en-US') : '-'}
                                        <span>{item.isPercentage !== true ? "" : "%"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default renderItemMetric;
