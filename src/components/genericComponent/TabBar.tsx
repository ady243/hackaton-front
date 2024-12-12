import React, { useState } from 'react';

interface TabBarProps {
  tabs: { name: string; content: React.ReactNode }[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="fixed top-24 left-92 bg-white ">
        <div className="flex justify-center bord border-gray-200">
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
      <div className="pt-16 p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabBar;