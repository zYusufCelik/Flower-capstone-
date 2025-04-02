import React, { useState, useRef, useEffect } from "react";
import Shapes from "./Shapes";
import ProposedEnhancements from "./ProposedEnhancements";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("shapes");
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 }); // <-- daha yukarı başlasın
  const tabRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        setPosition({
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDragging = (e) => {
    isDragging.current = true;
    const rect = tabRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      ref={tabRef}
      className="group z-50 fixed"
      style={{ left: position.x, top: position.y }}
      onMouseDown={startDragging} // <--- sürüklemeyi başlat
    >
      <div className="flex items-start space-x-2">
        {/* Sol sekme butonları */}
        <div className="flex flex-col space-y-1 border border-black p-1 bg-white rounded">
          <button
            onClick={() => setActiveTab("shapes")}
            className={`px-4 py-1 text-sm border border-black w-40 rounded ${
              activeTab === "shapes" ? "font-bold bg-gray-100" : ""
            }`}
          >
            SHAPES
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-1 text-sm border border-black w-40 rounded ${
              activeTab === "summary" ? "font-bold bg-gray-100" : ""
            }`}
          >
            SUMMARY
          </button>
          <button
            onClick={() => setActiveTab("improvement")}
            className={`px-4 py-1 text-sm border border-black w-40 rounded ${
              activeTab === "improvement" ? "font-bold bg-gray-100" : ""
            }`}
          >
            IMPROVEMENT IDEAS
          </button>
        </div>

        {/* Aç/Kapat butonu */}
        <div>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded bg-white hover:bg-gray-100 transition"
            title={expanded ? "Close Panel" : "Open Panel"}
          >
            {expanded ? "↙" : "↗"}
          </button>
        </div>

        {/* İçerik */}
        {expanded && (
          <div className="absolute top-0 left-[calc(100%+12px)] bg-white border border-gray-300 rounded-xl shadow-lg p-5 w-[90vw] max-w-5xl transition-all">
            {activeTab === "shapes" && <Shapes />}
            {activeTab === "improvement" && <ProposedEnhancements />}
            {activeTab === "summary" && (
              <p className="text-sm text-gray-700">Summary component yakında eklenecek...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
