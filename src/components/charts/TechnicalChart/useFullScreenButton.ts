import { useRef, useEffect } from 'react';

const useFullScreenButton = () => {
    const button = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        const findFullScreenButton = () => {
            const indicatorButton = document.querySelector('li.highcharts-full-screen');
            if (indicatorButton) {
                button.current = indicatorButton as HTMLLIElement;
            }
        };

        setTimeout(findFullScreenButton, 1000);
    }, []);

    const handleFullScreenClick = () => {
        if (button.current) {
            button.current.click();
        }
    };

    return { handleFullScreenClick };
};

export default useFullScreenButton;
