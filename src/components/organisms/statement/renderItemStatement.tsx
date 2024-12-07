import React from 'react';
import { FinancialStatementWithChildren } from '@/src/interfaces/FinancialStatement';
import ExpandButton from './ExpandButton';
import ItemName from './ItemName';
import MiniColumnChartWrapper from './MiniColumnChartWrapper';
import ItemValues from './ItemValues';

const renderItemStatement = (item: FinancialStatementWithChildren) => {
    const leftpx = item.level > 3 ? `${(item.level - 2) * 14}px` : '0';

    return (
        <React.Fragment key={item.id}>
            <div className={`${item.level <= 3 ? 'border-b border-fintown-br dark:border-fintown-br-light' : 'hidden fintown-is-children'}`}>
                <div className='flex justify-between py-[18px] items-center hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light px-[16px]'>
                    <div className="flex flex-grow-0 flex-shrink-0 basis-[350px] items-center pr-[30px]">
                        <div className="flex flex-nowrap flex-grow flex-shrink basis-auto">
                            <ExpandButton level={item.level} childrenLength={item.children.length} left={leftpx} />
                            <ItemName name={item.name} level={item.level} />
                        </div>
                        <div style={{position:"relative", maxWidth: "100px", width: "100px", height: "24px"  }}>
                            <MiniColumnChartWrapper data={item.values} />
                            {/* < LineChart /> */}
                        </div>
                    </div>
                    <div className="flex-grow flex-shrink basis-auto ">
                        <ItemValues values={item.values} level={item.level} />
                    </div>
                </div>

                {/* 
                Nếu có level > 3 thì sẽ render ra ở đây
                */}
                {item.children && item.children.length > 0 && item.children.some(child => child.level > 3) && (
                    <React.Fragment key={item.id}>
                        {item.children.map(child => (
                            child.level > 3
                                ? renderItemStatement(child)
                                : null
                        ))}
                    </React.Fragment>
                )}
            </div>
            {/*                 
            Nếu level <= 3 thì sẽ render ra ở đây
             */}
            {item.children && item.children.length > 0 && item.children.some(child => child.level <= 3) && (
                <div>
                    {item.children.map(child => (
                        child.level <= 3 ? renderItemStatement(child) : null
                    ))}
                </div>
            )}
        </React.Fragment>
    );
};

export default renderItemStatement;
