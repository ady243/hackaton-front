import React, { useState } from 'react';

interface TabBarProps {
  tabs: { name: string; content: React.ReactNode }[];
  position?: string; 
}

const TabBar: React.FC<TabBarProps> = ({ tabs, position = 'left-20' }) => { // Définissez une valeur par défaut
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className={`fixed top-12 ${position} bg-white z-10`}> {/* Utilisez la propriété position */}
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
      <div className={`pt-20 p-4 ${position}`}> {/* Utilisez la propriété position */}
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabBar;