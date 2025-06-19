import React from 'react';

const ProgressBar = ({ percentage, isSelected }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative overflow-hidden">
      <div 
        className={`h-2.5 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-blue-600'}`} 
        style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
