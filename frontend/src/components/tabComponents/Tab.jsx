import React from "react";
import Shapes from "./Shapes";
import ProposedEnhancements from "./ProposedEnhancements";
import Summary from "./Summary";
import VideoEmbed from "./VideoEmbed";

const TABS = ["SHAPES", "IMPROVEMENT IDEAS", "SUMMARY", "VIDEO"];

const Tab = ({ summary, activeTab, setActiveTab, videoId, setVideoId }) => {
  return (
    <div className="h-full max-h-screen overflow-hidden flex flex-col bg-white text-black border border-gray-300 rounded-lg shadow-md">
      {/* Tab Buttons */}
      <div className="sticky top-0 z-10 bg-white p-2 flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-2 rounded-t-lg">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-150 text-center text-sm 
              whitespace-normal md:whitespace-nowrap
              ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto p-4 flex-1">
        <div className={activeTab === "SHAPES" ? "block" : "hidden"}>
          <Shapes />
        </div>

        <div className={activeTab === "IMPROVEMENT IDEAS" ? "block" : "hidden"}>
          <ProposedEnhancements />
        </div>

        <div className={activeTab === "SUMMARY" ? "block" : "hidden"}>
          {summary && <Summary summary={summary} />}
        </div>

        <div className={activeTab === "VIDEO" ? "block" : "hidden"}>
          <VideoEmbed videoId={videoId} setVideoId={setVideoId} />
        </div>
      </div>
    </div>
  );
};

export default Tab;
