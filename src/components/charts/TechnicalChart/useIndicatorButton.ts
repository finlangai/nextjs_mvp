import { useRef, useEffect } from 'react';

const useIndicatorButton = () => {
    const indicatorButtonRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        const findIndicatorButton = () => {
            const indicatorButton = document.querySelector('.highcharts-indicators');
            if (indicatorButton) {
                indicatorButtonRef.current = indicatorButton as HTMLLIElement;
            }
        };

        setTimeout(findIndicatorButton, 1000);
    }, []);

    const handleIndicatorClick = () => {
        if (indicatorButtonRef.current) {
            indicatorButtonRef.current.click();
        }
    };

    return { handleIndicatorClick };
};

export default useIndicatorButton;
