"use client";
import React from 'react';

// Hàm hiển thị giá trị
const displayValue = (value: any, level: number) => {
    if (value !== null && value !== '' && !isNaN(value)) {
        return level === 1 
            ? value.toLocaleString('en-US') 
            : value.toLocaleString('en-US');
    }
    return level === 1 ? '' : '-';
};
interface ItemValuesProps {
    values: any[];
    level: number;
}

const ItemValues = ({ values, level }: ItemValuesProps) => {
    return (
        <div className='flex justify-between'>
            {values?.slice(0, 9).map((val) => (
                <div className="text-xm text-fintown-txt-1 dark:text-fintown-txt-1-light min-w-[calc(11.1111%)] pl-[16px]" key={`${val.period}-${val.year}-${val.quarter}`}>
                    <div className="flex justify-end">
                        {displayValue(val.value, level)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemValues;
