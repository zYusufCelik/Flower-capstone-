

import React from 'react';
import Shapes from './Shapes';
import ProposedEnhancements from './ProposedEnhancements';
import Summary from './Summary';

const TABS = ['SHAPES', 'PROPOSED ENHANCEMENT', 'SUMMARY'];

const Tab = ({ summary, activeTab, setActiveTab }) => {
  return (
    <div className="h-full max-h-screen overflow-hidden flex flex-col bg-white text-black border border-gray-300 rounded-lg shadow-md">
      {/* Tab Buttonları */}
      <div className="sticky top-0 z-10 bg-white p-2 flex space-x-2 rounded-t-lg justify-center">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* İçerik */}
      <div className="overflow-y-auto p-4 flex-1">
        {activeTab === 'SHAPES' && <Shapes />}
        {activeTab === 'PROPOSED ENHANCEMENT' && <ProposedEnhancements />}
        {activeTab === 'SUMMARY' && summary && <Summary summary={summary} />}
      </div>
    </div>
  );
};

export default Tab;
