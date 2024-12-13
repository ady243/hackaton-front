import { ProgressBarProps } from '@/interfaces/interaces';
import React, { useEffect, useState } from 'react';
import '../../components/genericComponent/css/progress.css';

const ProgressBar: React.FC<ProgressBarProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);
  const barColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center bg-opacity-75 p-4 rounded-lg shadow-lg">
      <div className="w-full bg-white p-4">
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