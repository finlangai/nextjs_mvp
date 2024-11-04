import { useRef, useEffect, useState } from 'react';

const useFullScreenButton = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const leftbar = useRef<HTMLDivElement | null>(null);
    const insreen = useRef<HTMLDivElement | null>(null);
    const exitsreen = useRef<HTMLDivElement | null>(null);
    const showleftBarbtn = useRef<HTMLDivElement | null>(null);
    const exitLeftBarbtn = useRef<HTMLDivElement | null>(null);
    const page = useRef<HTMLDivElement | null>(null);
    const rightchart = useRef<HTMLDivElement | null>(null);

    // State to store original styles
    const [originalStyles, setOriginalStyles] = useState<{
        containerHeight: string;
        leftbarDisplay: string;
        pagePosition: string;
        pageTop: string;
        pageLeft: string;
        pageZIndex: string;
        pageWidth: string;
        pageHeight: string;
        pageMaxWidth: string;
    } | null>(null);

    useEffect(() => {
        const findFullScreenButton = () => {
            const containerElement = document.getElementById('container-technical-chart-azz');
            if (containerElement) container.current = containerElement as HTMLDivElement;

            const leftbarElm = document.getElementById('left-bar-technical-chart-vvv');
            if (leftbarElm) leftbar.current = leftbarElm as HTMLDivElement;

            const inSreenElm = document.getElementById('in-full-sreen');
            if (inSreenElm) insreen.current = inSreenElm as HTMLDivElement;

            const exitSreenElm = document.getElementById('exit-full-sreen');
            if (exitSreenElm) exitsreen.current = exitSreenElm as HTMLDivElement;

            const showLbarElm = document.getElementById('show-leftbar-search');
            if (showLbarElm) showleftBarbtn.current = showLbarElm as HTMLDivElement;

            const exitLbarElm = document.getElementById('exit-leftbar-search');
            if (exitLbarElm) exitLeftBarbtn.current = exitLbarElm as HTMLDivElement;

            const pageElm = document.getElementById('technical-chart-page');
            if (pageElm) page.current = pageElm as HTMLDivElement;

            const rightChartElm = document.getElementById('right-chart-technical-vvv');
            if (rightChartElm) rightchart.current = rightChartElm as HTMLDivElement;

            // Save original styles
            setOriginalStyles({
                containerHeight: container.current?.style.height || '',
                leftbarDisplay: leftbar.current?.style.display || '',
                pagePosition: page.current?.style.position || '',
                pageTop: page.current?.style.top || '',
                pageLeft: page.current?.style.left || '',
                pageZIndex: page.current?.style.zIndex || '',
                pageWidth: page.current?.style.width || '',
                pageHeight: page.current?.style.height || '',
                pageMaxWidth: page.current?.style.maxWidth || '',
            });
        };

        setTimeout(findFullScreenButton, 500);
    }, []);

    const handleFullScreenClick = () => {
        if (page.current) {
            page.current.style.position = "absolute";
            page.current.style.top = "0";
            page.current.style.left = "0";
            page.current.style.zIndex = "100";
            page.current.style.width = "100%";
            page.current.style.height = "100vh";
        }
        if (container.current) container.current.style.height = `calc(100vh - 111px)`;
        if (rightchart.current) rightchart.current.style.width = `100%`;
        if (leftbar.current) leftbar.current.style.display = 'none';
        if (insreen.current) insreen.current.style.display = 'none';
        if (exitsreen.current) exitsreen.current.style.display = 'inline-block';
        if (showleftBarbtn.current) showleftBarbtn.current.style.display = 'none';
        if (exitLeftBarbtn.current) exitLeftBarbtn.current.style.display = 'inline-block';
    };

    const handleExitFullScreenClick = () => {
        if (!originalStyles) return;

        if (page.current) {
            page.current.style.position = originalStyles.pagePosition;
            page.current.style.top = originalStyles.pageTop;
            page.current.style.left = originalStyles.pageLeft;
            page.current.style.zIndex = originalStyles.pageZIndex;
            page.current.style.width = originalStyles.pageWidth;
            page.current.style.height = originalStyles.pageHeight;
            page.current.style.maxWidth = originalStyles.pageMaxWidth;
        }
        if (rightchart.current) rightchart.current.style.width = `calc(100% - 358px)`;
        if (container.current) container.current.style.height = originalStyles.containerHeight;
        if (leftbar.current) leftbar.current.style.display = originalStyles.leftbarDisplay;
        if (insreen.current) insreen.current.style.display = 'inline-block';
        if (exitsreen.current) exitsreen.current.style.display = 'none';
        if (showleftBarbtn.current) showleftBarbtn.current.style.display = 'inline-block';
        if (exitLeftBarbtn.current) exitLeftBarbtn.current.style.display = 'none';
    };

    const handedleLeftBarClick = (state: boolean): void => {
        if (!originalStyles) return;

        if (state) {
            if (rightchart.current) rightchart.current.style.width = `100%`;
            if (leftbar.current) leftbar.current.style.display = 'none';
            if (showleftBarbtn.current) showleftBarbtn.current.style.display = 'none';
            if (exitLeftBarbtn.current) exitLeftBarbtn.current.style.display = 'inline-block';
        } else {
            if (rightchart.current) rightchart.current.style.width = `calc(100% - 358px)`;
            if (leftbar.current) leftbar.current.style.display = 'inline-block';
            if (showleftBarbtn.current) showleftBarbtn.current.style.display = 'inline-block';
            if (exitLeftBarbtn.current) exitLeftBarbtn.current.style.display = 'none';
        }
    };

    return { handleFullScreenClick, handleExitFullScreenClick, handedleLeftBarClick };
};

export default useFullScreenButton;
