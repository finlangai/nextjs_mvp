import React from 'react';

interface ItemNameProps {
    name: string;
    level: number;
}

const ItemName = ({ name, level }: ItemNameProps) => {
    return (
        <div className={`text-sm ${level === 1 ? 'font-bold' : ''} ${level === 2 ? 'text-fintown-pr9' : 'text-fintown-txt-1 dark:text-fintown-txt-1-light'}`}>
            {name}
        </div>
    );
};

export default ItemName;
