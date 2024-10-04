import React, { useState } from 'react';

interface ExpandButtonProps {
    level: number;
    childrenLength: number;
    left: string;
}

const ExpandButton = ({ level, childrenLength, left }: ExpandButtonProps) => {
    const [expanded, setExpanded] = useState(false); // Trạng thái để kiểm soát dấu và ẩn/hiện phần tử

    // Xử lý sự kiện click
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (childrenLength > 0) {
            const currentElement = event.currentTarget.closest('.hover\\:bg-fintown-hvr-btn-1');
    
            if (currentElement) {
                // Lấy phần tử cha gần nhất chứa tất cả children
                const parentContainer = currentElement.closest('.border-b');
                if (parentContainer) {
                    // Lấy tất cả các phần tử con có class 'fintown-is-children' trong phạm vi parentContainer
                    const siblingChildrenList = parentContainer.querySelectorAll('.fintown-is-children');
    
                    siblingChildrenList.forEach((sibling) => {
                        // Toggle trạng thái ẩn/hiện cho tất cả các phần tử con trong phạm vi
                        sibling.classList.toggle('hidden');
                    });
                }
                // Thay đổi trạng thái để cập nhật dấu (+/-)
                setExpanded(!expanded);
            }
        }
    };

    if (level >= 3 && childrenLength > 0) {
        return (
            <div
                onClick={handleClick}
                className="text-fintown-txt-1 h-[18px] w-[18px] mr-[8px] cursor-pointer bg-fintown-btn-disable flex items-center justify-center rounded"
            >
                <span>{expanded ? '-' : '+'}</span>
            </div>
        );
    } else if (level >= 3 && childrenLength === 0) {
        return(
            <>
            <div
                style={{ marginLeft: left }}
                className="text-fintown-txt-1 h-[18px] w-[18px] mr-[8px] cursor-pointer bg-fintown-btn-disable flex items-center justify-center rounded invisible"
            >
                <span>{expanded ? '-' : '+'}</span>
            </div>
            </>
        )
        ;
    }

    return null;
};

export default ExpandButton;
