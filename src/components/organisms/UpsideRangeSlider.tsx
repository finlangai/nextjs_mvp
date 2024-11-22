import React from 'react';

interface ProgressBarProps {
  value: number;
}

type ColorClass = {
  bg: string;
  text: string;
};

const UpsideRangerSlider: React.FC<ProgressBarProps> = ({ value }) => {
  const progress = value;
  
  const displayMin = progress < 0 ? Math.floor(progress / 50) * 50 : 0;
  const displayMax = progress > 100 ? Math.ceil(progress / 50) * 50 : 100;
  
  const range = displayMax - displayMin;
  const normalizedProgress = ((progress - displayMin) / range) * 100;
  const displayProgress = Math.max(0, Math.min(100, normalizedProgress));

  const getColorClasses = (value: number): ColorClass => {
    if (value < 0) return { bg: 'bg-red-500', text: 'text-red-600' };
    if (value === 0) return { bg: 'bg-slate-400', text: 'text-slate-600' };
    if (value <= 10) return { bg: 'bg-orange-500', text: 'text-orange-600' };
    if (value <= 25) return { bg: 'bg-yellow-500', text: 'text-yellow-600' };
    if (value < 50) return { bg: 'bg-green-500', text: 'text-green-600' };
    return { bg: 'bg-purple-500', text: 'text-purple-600' };
  };

  const totalSegments = 30;
  const filledSegments = Math.round((displayProgress / 100) * totalSegments);

  const legendItems = [
    { threshold: '<0%', color: 'bg-red-500' },
    { threshold: '0%', color: 'bg-slate-400' },
    { threshold: '≤ 10%', color: 'bg-orange-500' },
    { threshold: '≤ 25%', color: 'bg-yellow-500' },
    { threshold: '< 50%', color: 'bg-green-500' },
    { threshold: '≥ 50%', color: 'bg-purple-500' }
  ];
  
  return (
    <div className="w-full max-w-xl">
      <div className="text-[14px] font-medium mb-2 text-fintown-txt-2 mb-[20px]">Tỷ lệ sinh lợi tiềm năng</div>
      
      <div className="relative">
        {/* Progress bar */}
        <div className="flex gap-1 mb-2">
          {Array.from({ length: totalSegments }).map((_, idx) => (
            <div
              key={idx}
              className={`h-4 flex-1 rounded ${
                idx < filledSegments 
                  ? getColorClasses(progress).bg
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Current value indicator */}
        <div 
          className="absolute top-0 transform -translate-y-full"
          style={{ 
            left: `${displayProgress}%`, 
            transform: `translateX(-50%) translateY(-15px)` 
          }}
        >
          <div className={`
            px-2 py-1 rounded-md text-sm font-medium
            ${getColorClasses(progress).bg} text-white
            whitespace-nowrap
          `}>
            {progress.toFixed(2)}%
          </div>
          <div 
            className={`w-0 h-0 border-l-4 border-r-4 border-t-4 
              border-l-transparent border-r-transparent mx-auto
              ${progress < 0 ? 'border-t-red-500' : 
                progress === 0 ? 'border-t-slate-400' :
                progress <= 10 ? 'border-t-orange-500' :
                progress <= 25 ? 'border-t-yellow-500' :
                progress < 50 ? 'border-t-green-500' :
                'border-t-purple-500'}`}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm mt-4">
        <span className={getColorClasses(displayMin).text}>
          {displayMin}%
        </span>
        <span className={getColorClasses(displayMax).text}>
          {displayMax}%
        </span>
      </div>

      <div className="flex justify-between text-xs mt-[20px]">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`}></div>
            <span className='text-fintown-txt-2'>{item.threshold}</span>
          </div>
        ))}
      </div>

      {/* {(progress > 100 || progress < 0) && (
        <div className="text-xs text-gray-500 text-right mt-1">
          *Giá trị {progress > 100 ? 'vượt ngưỡng tối đa' : 'dưới ngưỡng tối thiểu'} 
          {progress > 100 ? ' 100%' : ' 0%'}
        </div>
      )} */}
    </div>
  );
};

export default UpsideRangerSlider;