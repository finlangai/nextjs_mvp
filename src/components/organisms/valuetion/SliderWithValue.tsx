interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  tooltip?: boolean;
  onChange: (value: number) => void;
}

import { selectDarkMode } from '@/src/redux/darkmode';
import { useAppSelector } from "@/src/redux/hooks/useAppStore";

const SliderWithValue: React.FC<SliderProps> = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  value, 
  tooltip = true, 
  onChange 
}) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  return (
    <div className="relative mt-4 w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full appearance-none bg-[#2B3139] outline-none"
      />
      {/* Track styling */}
        <style jsx>{`
            input[type="range"] {
                height: 5px; /* Đảm bảo chiều cao track */
                -webkit-appearance: none;
                appearance: none;
                background: ${isDarkMode ? '#848E9C' : '#2B3139'} ${value}%,;
                outline: none;
            }

            input[type="range"]::-webkit-slider-runnable-track {
                height: 5px;
                background: linear-gradient(
                to right,
                ${isDarkMode ? 'black' : 'white'} 0%,          /* Màu bắt đầu (phần được tô) */
                ${isDarkMode ? 'black' : 'white'} ${value}%, /* Màu của phần được tô */
                ${isDarkMode ? '#EAECEF' : '#2B3139'} ${value}%,    /* Màu nền (phần chưa tô) */
                ${isDarkMode ? '#EAECEF' : '#2B3139'} 100%                /* Màu nền đến hết */
                );                
                border-radius: 5px;
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                background-color: ${isDarkMode ? 'black' : 'white'};
                border-radius: 50%;
                cursor: grab;
                margin-top: -7.5px; /* Căn chỉnh thumb để nó thẳng hàng với track */
            }

            input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                background-color: ${isDarkMode ? 'black' : 'white'};
                border-radius: 50%;
                cursor: grab;
                border: none;
            }

            input[type="range"]::-ms-thumb {
                width: 20px;
                height: 20px;
                background-color: ${isDarkMode ? 'black' : 'white'};
                border-radius: 50%;
                cursor: grab;
                border: none;
            }
        `}</style>


        {tooltip && (
        <div
            className={`
            absolute top-[-30px] text-center text-[14px] rounded-[8px] py-1
            text-fintown-txt-1 dark:text-fintown-txt-1-light
            `}
            style={{
            left: `${value}%`,
            transform:
                value < 1
                ? "translateX(0)" 
                : value === 100
                ? "translateX(-100%)" 
                : "translateX(-50%)",
            }}
        >
            {value}%
        </div>
        )}

      
        <div className="flex justify-between mt-2 text-sm text-fintown-txt-2">
            <span>{min}%</span>
            <span>{max}%</span>
        </div>
    </div>
  );
};

export default SliderWithValue;
