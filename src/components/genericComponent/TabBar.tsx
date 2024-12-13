import React, { useState, useEffect } from 'react';

interface TabBarProps {
  tabs: { name: string; content: React.ReactNode }[];
  position?: string;
  onTabChange?: (index: number) => void; 
}

const TabBar: React.FC<TabBarProps> = ({ tabs, position = 'left-20', onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  return (
    <div>
      <div className={`fixed top-12 ${position} bg-white z-10`}>
        <div className="flex justify-center border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === index
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-100'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } border-b-2 focus:outline-none`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className={`pt-20 p-4 ${position}`}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabBar;