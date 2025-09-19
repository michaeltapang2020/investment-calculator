import React from 'react';
import { TrendingUp, BarChart3, Target, DollarSign } from 'lucide-react';

const iconMap = {
  TrendingUp,
  BarChart3,
  Target,
  DollarSign
};

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
      {tabs.map(tab => {
        const IconComponent = iconMap[tab.icon];
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 m-1 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;