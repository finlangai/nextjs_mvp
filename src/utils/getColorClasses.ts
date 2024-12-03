type ColorClass = {
    bg: string;
    text: string;
};

export const getColorClasses = (value: number): ColorClass => {
    if (value < 0) return { bg: 'bg-red-500', text: 'text-red-600' };
    if (value === 0) return { bg: 'bg-slate-400', text: 'text-slate-600' };
    if (value <= 10) return { bg: 'bg-orange-500', text: 'text-orange-600' };
    if (value <= 25) return { bg: 'bg-yellow-500', text: 'text-yellow-600' };
    if (value < 50) return { bg: 'bg-green-500', text: 'text-green-600' };
    return { bg: 'bg-purple-500', text: 'text-purple-600' };
  };
