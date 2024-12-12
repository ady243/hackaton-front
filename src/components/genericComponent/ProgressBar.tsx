import { ProgressBarProps } from '@/interfaces/interaces';
import React from 'react';


const ProgressBar: React.FC<ProgressBarProps> = ({ message, type }) => {
  const barColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
      <div className="w-full bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{message}</span>
          <div className="w-1/2 h-2 bg-gray-200 rounded-full overflow-hidden ml-4">
            <div className={`h-full ${barColor} animate-progress`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;