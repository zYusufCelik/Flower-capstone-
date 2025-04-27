import React, { useState } from "react";
import ChartBuilder from "./components/chartComponents/ChartBuilder";
import Tab from "./components/tabComponents/Tab";
import { Toaster } from 'react-hot-toast';

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [activeTab, setActiveTab] = useState("SHAPES");

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-gray-100">
      
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            },
          },
          duration: 4000,
        }}
      />

      {/* Sol taraf: Tabs */}
      <div className="w-full md:w-[40%] h-auto md:h-screen bg-white text-white overflow-y-auto p-4">
        <Tab
          summary={summaryData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Sağ taraf: ChartBuilder */}
      <div className="w-full md:w-[60%] bg-white flex flex-col items-end relative p-6 overflow-y-auto">
        {/* ChartBuilder içerik */}
        <div className="w-full flex justify-center items-start">
          <ChartBuilder onSetSummary={setSummaryData} onSetTab={setActiveTab} />
        </div>
      </div>

    </div>
  );
}

export default App;
