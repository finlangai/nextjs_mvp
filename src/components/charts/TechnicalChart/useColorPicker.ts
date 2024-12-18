import { useEffect, useRef } from 'react';

const useColorPicker = ({ inputName }: { inputName: string}) => {
    const colorPickerContainerRef = useRef<HTMLDivElement | null>(null);
    const colorPickerInputRef = useRef<HTMLInputElement | null>(null);
    const activeInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.style.position = 'absolute';
        colorPickerContainer.style.zIndex = '100000';
        colorPickerContainer.style.display = 'none';
        colorPickerContainer.style.backgroundColor = 'white';
        colorPickerContainer.style.padding = '10px';
        colorPickerContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        colorPickerContainer.style.borderRadius = '4px';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.style.width = '100%';
        colorInput.style.height = '40px';
        colorInput.style.padding = '0';
        colorInput.style.border = 'none';
        colorInput.style.cursor = 'pointer';

        colorPickerContainer.appendChild(colorInput);
        document.body.appendChild(colorPickerContainer);

        colorPickerContainerRef.current = colorPickerContainer;
        colorPickerInputRef.current = colorInput;

        document.addEventListener('click', handleClickOutside);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const strokeInputs = document.querySelectorAll(`input[highcharts-data-name="${inputName}"]`);
                    strokeInputs.forEach((strokeInput) => {
                        if (!(strokeInput as HTMLInputElement).dataset.colorPickerInitialized) {
                            initializeColorPicker(strokeInput as HTMLInputElement);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            document.removeEventListener('click', handleClickOutside);
            if (colorPickerContainerRef.current && document.body.contains(colorPickerContainerRef.current)) {
                document.body.removeChild(colorPickerContainerRef.current);
            }
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            colorPickerContainerRef.current &&
            !colorPickerContainerRef.current.contains(event.target as Node) &&
            activeInputRef.current !== event.target
        ) {
            colorPickerContainerRef.current.style.display = 'none';
        }
    };

    const positionColorPicker = (inputElement: HTMLInputElement) => {
        if (!colorPickerContainerRef.current) return;

        const inputRect = inputElement.getBoundingClientRect();
        const pickerWidth = 200;
        const spacing = 10;

        let left = inputRect.right + spacing;
        let top = inputRect.top;

        if (left + pickerWidth > window.innerWidth) {
            left = inputRect.left - pickerWidth - spacing;
        }

        if (top + inputRect.height > window.innerHeight) {
            top = window.innerHeight - inputRect.height - spacing;
        }

        top = Math.max(0, top);

        colorPickerContainerRef.current.style.left = `${left}px`;
        colorPickerContainerRef.current.style.top = `${top}px`;
        colorPickerContainerRef.current.style.width = `${pickerWidth}px`;
    };

    const initializeColorPicker = (strokeInput: HTMLInputElement) => {
        strokeInput.dataset.colorPickerInitialized = 'true';
        strokeInput.style.cursor = 'pointer';
        strokeInput.style.backgroundColor = strokeInput.value || '#FFFFFF';
        strokeInput.readOnly = true;

        strokeInput.addEventListener('click', (e) => {
            e.stopPropagation();
            if (colorPickerContainerRef.current && colorPickerInputRef.current) {
                colorPickerInputRef.current.value = strokeInput.value || '#000000';
                colorPickerContainerRef.current.style.display = 'block';
                positionColorPicker(strokeInput);
                activeInputRef.current = strokeInput;

                colorPickerInputRef.current.onchange = (e) => {
                    const color = (e.target as HTMLInputElement).value;
                    strokeInput.value = color;
                    updateInputStyle(strokeInput, color);

                    const changeEvent = new Event('change', { bubbles: true });
                    strokeInput.dispatchEvent(changeEvent);
                };
            }
        });

        updateInputStyle(strokeInput, strokeInput.value || '#000000');
    };

    const updateInputStyle = (input: HTMLInputElement, color: string) => {
        input.style.backgroundColor = color;
        input.style.color = getContrastColor(color);
    };

    const getContrastColor = (hexcolor: string) => {
        const r = parseInt(hexcolor.slice(1, 3), 16);
        const g = parseInt(hexcolor.slice(3, 5), 16);
        const b = parseInt(hexcolor.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF';
    };

    return {};
};

export const useColorPickerStroke = () => {
    return useColorPicker({ inputName: "typeOptions.line.stroke" });
};

export const useColorPickerForcrosshairYLine = () => {
    return useColorPicker({ inputName: "typeOptions.crosshairY.stroke" });
};

export const useColorPickerForcrosshairXLine = () => {
    return useColorPicker({ inputName: "typeOptions.crosshairX.stroke" });
};

export const useColorPickerbackgroundStroke = () => {
    return useColorPicker({ inputName: "typeOptions.background.stroke" });
};

export const useColorPickerLineFill = () => {
    return useColorPicker({ inputName: "typeOptions.line.fill" });
};

export const useColorPickerFill = () => {
    return useColorPicker({ inputName: "typeOptions.background.fill" });
};

export const useColorPickerForSingleBackgroundsColors = () => {
    return useColorPicker({ inputName: "typeOptions.backgroundColors" });
};

export const useColorPickerForSingleLabelBackground = () => {
    return useColorPicker({ inputName: "labelOptions.backgroundColor" });
};

export const useColorPickerForSingleLabel = () => {
    return useColorPicker({ inputName: "labelOptions.style.color" });
};

export const useColorPickerForTypeLabel = () => {
    return useColorPicker({ inputName: "typeOptions.label.style.color" });
};

export const useColorPickerForConnectorStroke = () => {
    return useColorPicker({ inputName: "typeOptions.connector.stroke" });
};

export const useColorPickerForConnectorFill = () => {
    return useColorPicker({ inputName: "typeOptions.connector.fill" });
};

export const useColorPickerForShapesStroke = () => {
    return useColorPicker({ inputName: "shapes.0.stroke" });
};

export const useColorPickerForIndexedShapesFill = () => {
    return useColorPicker({ inputName: "shapes.0.fill" });
};

export const useColorPickerForInnerBackgroundStroke = () => {
    return useColorPicker({ inputName: "typeOptions.innerBackground.stroke" });
};

export const useColorPickerForInnerBackgroundFill = () => {
    return useColorPicker({ inputName: "typeOptions.innerBackground.fill" });
};

export const useColorPickerForOuterBackgroundStroke = () => {
    return useColorPicker({ inputName: "typeOptions.outerBackground.stroke" });
};

export const useColorPickerForOuterBackgroundFill = () => {
    return useColorPicker({ inputName: "typeOptions.outerBackground.fill" });
};

export const useColorPickerForIndexedBackgroundsColors = () => {
    const colorPickerContainerRef = useRef<HTMLDivElement | null>(null);
    const colorPickerInputRef = useRef<HTMLInputElement | null>(null);
    const activeInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.style.position = 'absolute';
        colorPickerContainer.style.zIndex = '10000';
        colorPickerContainer.style.display = 'none';
        colorPickerContainer.style.backgroundColor = 'white';
        colorPickerContainer.style.padding = '10px';
        colorPickerContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        colorPickerContainer.style.borderRadius = '4px';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.style.width = '100%';
        colorInput.style.height = '40px';
        colorInput.style.padding = '0';
        colorInput.style.border = 'none';
        colorInput.style.cursor = 'pointer';

        colorPickerContainer.appendChild(colorInput);
        document.body.appendChild(colorPickerContainer);

        colorPickerContainerRef.current = colorPickerContainer;
        colorPickerInputRef.current = colorInput;

        document.addEventListener('click', handleClickOutside);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Tìm tất cả các input có highcharts-data-name bắt đầu bằng "typeOptions.backgroundColors."
                    const backgroundInputs = document.querySelectorAll<HTMLInputElement>('[highcharts-data-name^="typeOptions.backgroundColors."]');
                    backgroundInputs.forEach((backgroundInput) => {
                        if (!backgroundInput.dataset.colorPickerInitialized) {
                            initializeColorPicker(backgroundInput);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            document.removeEventListener('click', handleClickOutside);
            if (colorPickerContainerRef.current && document.body.contains(colorPickerContainerRef.current)) {
                document.body.removeChild(colorPickerContainerRef.current);
            }
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            colorPickerContainerRef.current &&
            !colorPickerContainerRef.current.contains(event.target as Node) &&
            activeInputRef.current !== event.target
        ) {
            colorPickerContainerRef.current.style.display = 'none';
        }
    };

    const positionColorPicker = (inputElement: HTMLInputElement) => {
        if (!colorPickerContainerRef.current) return;

        const inputRect = inputElement.getBoundingClientRect();
        const pickerWidth = 200;
        const spacing = 10;

        let left = inputRect.right + spacing;
        let top = inputRect.top;

        if (left + pickerWidth > window.innerWidth) {
            left = inputRect.left - pickerWidth - spacing;
        }

        if (top + inputRect.height > window.innerHeight) {
            top = window.innerHeight - inputRect.height - spacing;
        }

        top = Math.max(0, top);

        colorPickerContainerRef.current.style.left = `${left}px`;
        colorPickerContainerRef.current.style.top = `${top}px`;
        colorPickerContainerRef.current.style.width = `${pickerWidth}px`;
    };

    const initializeColorPicker = (backgroundInput: HTMLInputElement) => {
        backgroundInput.dataset.colorPickerInitialized = 'true';
        backgroundInput.style.cursor = 'pointer';
        backgroundInput.style.backgroundColor = backgroundInput.value || '#FFFFFF';
        backgroundInput.readOnly = true;

        backgroundInput.addEventListener('click', (e) => {
            e.stopPropagation();
            if (colorPickerContainerRef.current && colorPickerInputRef.current) {
                colorPickerInputRef.current.value = backgroundInput.value || '#000000';
                colorPickerContainerRef.current.style.display = 'block';
                positionColorPicker(backgroundInput);
                activeInputRef.current = backgroundInput;

                colorPickerInputRef.current.onchange = (e) => {
                    const color = (e.target as HTMLInputElement).value;
                    backgroundInput.value = color;
                    updateInputStyle(backgroundInput, color);

                    const changeEvent = new Event('change', { bubbles: true });
                    backgroundInput.dispatchEvent(changeEvent);
                };
            }
        });

        updateInputStyle(backgroundInput, backgroundInput.value || '#000000');
    };

    const updateInputStyle = (input: HTMLInputElement, color: string) => {
        input.style.backgroundColor = color;
        input.style.color = getContrastColor(color);
    };

    const getContrastColor = (hexcolor: string) => {
        const r = parseInt(hexcolor.slice(1, 3), 16);
        const g = parseInt(hexcolor.slice(3, 5), 16);
        const b = parseInt(hexcolor.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF';
    };

    return {};
};

export const useColorPickerForIndexedLabelColors  = () => {
    const colorPickerContainerRef = useRef<HTMLDivElement | null>(null);
    const colorPickerInputRef = useRef<HTMLInputElement | null>(null);
    const activeInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.style.position = 'absolute';
        colorPickerContainer.style.zIndex = '10000';
        colorPickerContainer.style.display = 'none';
        colorPickerContainer.style.backgroundColor = 'white';
        colorPickerContainer.style.padding = '10px';
        colorPickerContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        colorPickerContainer.style.borderRadius = '4px';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.style.width = '100%';
        colorInput.style.height = '40px';
        colorInput.style.padding = '0';
        colorInput.style.border = 'none';
        colorInput.style.cursor = 'pointer';

        colorPickerContainer.appendChild(colorInput);
        document.body.appendChild(colorPickerContainer);

        colorPickerContainerRef.current = colorPickerContainer;
        colorPickerInputRef.current = colorInput;

        document.addEventListener('click', handleClickOutside);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Tìm tất cả các input có highcharts-data-name bắt đầu bằng "typeOptions.labels." và kết thúc bằng ".style.color"
                    const labelColorInputs = document.querySelectorAll<HTMLInputElement>('[highcharts-data-name^="typeOptions.labels."][highcharts-data-name$=".style.color"]');
                    labelColorInputs.forEach((labelColorInput) => {
                        if (!labelColorInput.dataset.colorPickerInitialized) {
                            initializeColorPicker(labelColorInput);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            document.removeEventListener('click', handleClickOutside);
            if (colorPickerContainerRef.current && document.body.contains(colorPickerContainerRef.current)) {
                document.body.removeChild(colorPickerContainerRef.current);
            }
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            colorPickerContainerRef.current &&
            !colorPickerContainerRef.current.contains(event.target as Node) &&
            activeInputRef.current !== event.target
        ) {
            colorPickerContainerRef.current.style.display = 'none';
        }
    };

    const positionColorPicker = (inputElement: HTMLInputElement) => {
        if (!colorPickerContainerRef.current) return;

        const inputRect = inputElement.getBoundingClientRect();
        const pickerWidth = 200;
        const spacing = 10;

        let left = inputRect.right + spacing;
        let top = inputRect.top;

        if (left + pickerWidth > window.innerWidth) {
            left = inputRect.left - pickerWidth - spacing;
        }

        if (top + inputRect.height > window.innerHeight) {
            top = window.innerHeight - inputRect.height - spacing;
        }

        top = Math.max(0, top);

        colorPickerContainerRef.current.style.left = `${left}px`;
        colorPickerContainerRef.current.style.top = `${top}px`;
        colorPickerContainerRef.current.style.width = `${pickerWidth}px`;
    };

    const initializeColorPicker = (labelColorInput: HTMLInputElement) => {
        labelColorInput.dataset.colorPickerInitialized = 'true';
        labelColorInput.style.cursor = 'pointer';
        labelColorInput.style.backgroundColor = labelColorInput.value || '#FFFFFF';
        labelColorInput.readOnly = true;

        labelColorInput.addEventListener('click', (e) => {
            e.stopPropagation();
            if (colorPickerContainerRef.current && colorPickerInputRef.current) {
                colorPickerInputRef.current.value = labelColorInput.value || '#000000';
                colorPickerContainerRef.current.style.display = 'block';
                positionColorPicker(labelColorInput);
                activeInputRef.current = labelColorInput;

                colorPickerInputRef.current.onchange = (e) => {
                    const color = (e.target as HTMLInputElement).value;
                    labelColorInput.value = color;
                    updateInputStyle(labelColorInput, color);

                    const changeEvent = new Event('change', { bubbles: true });
                    labelColorInput.dispatchEvent(changeEvent);
                };
            }
        });

        updateInputStyle(labelColorInput, labelColorInput.value || '#000000');
    };

    const updateInputStyle = (input: HTMLInputElement, color: string) => {
        input.style.backgroundColor = color;
        input.style.color = getContrastColor(color);
    };

    const getContrastColor = (hexcolor: string) => {
        const r = parseInt(hexcolor.slice(1, 3), 16);
        const g = parseInt(hexcolor.slice(3, 5), 16);
        const b = parseInt(hexcolor.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF';
    };

    return {};
};

