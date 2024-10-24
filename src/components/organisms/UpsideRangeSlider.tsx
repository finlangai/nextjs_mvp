// components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  value: number; // Value between 0 and 100
}

const UpsideRangerSlider: React.FC<ProgressBarProps> = ({ value }) => {
  // Limit value to a range between 0 and 100
  const progress = Math.max(0, Math.min(100, value));

  // Generate an array of filled and empty segments
  const totalSegments = 30; // Same as the number of boxes in the design
  const filledSegments = Math.round((progress / 100) * totalSegments);

  return (
    <div className="progress-container">
      <div className="progress-title">Upside</div>
      <div className="progress-bar">
        {Array.from({ length: totalSegments }).map((_, idx) => (
          <div
            key={idx}
            className={`segment ${idx < filledSegments ? 'filled' : 'empty'}`}
          ></div>
        ))}
      </div>
      <div className="progress-labels">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default UpsideRangerSlider;
