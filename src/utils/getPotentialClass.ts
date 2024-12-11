export const getPotentialClass = (potential: number | undefined): string => {
    if (potential === undefined) return '#6B7280'; // gray-500 (#6B7280)
    if (potential < 0) return '#EF4444'; // red-500 (#EF4444)
    if (potential === 0) return '#64748B'; // slate-400 (#64748B)
    if (potential <= 10) return '#F97316'; // orange-500 (#F97316)
    if (potential <= 25) return '#FACC15'; // yellow-500 (#FACC15)
    if (potential < 50) return '#22C55E'; // green-500 (#22C55E)
  
    return '#A855F7'; // purple-500 (#A855F7)
};  