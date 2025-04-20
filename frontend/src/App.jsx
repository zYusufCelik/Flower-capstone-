

import React, { useState } from 'react';
import ChartBuilder from './components/chartComponents/ChartBuilder';
import Tab from './components/tabComponents/Tab';

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [activeTab, setActiveTab] = useState('SHAPES');

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sol taraf */}
      <div className="w-[40%] h-screen bg-white text-white overflow-y-auto p-4">
        <Tab summary={summaryData} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Sağ taraf */}
      <div className="w-[60%] bg-white flex justify-center items-start p-6 overflow-scroll">
        <ChartBuilder
          onSetSummary={setSummaryData}
          onSetTab={setActiveTab}
        />
      </div>
    </div>
  );
}

export default App;
