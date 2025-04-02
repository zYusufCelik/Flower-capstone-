import React, { useState, useRef, useEffect } from "react";
import { FaShapes, FaLightbulb, FaClipboardList } from "react-icons/fa";
import Shapes from "./Shapes";
import ProposedEnhancements from "./ProposedEnhancements";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("shapes");
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onMouseDown={startDragging}
        className="cursor-move flex space-x-2 border border-gray-300 bg-white rounded-lg px-2 py-1 text-xs font-semibold shadow-md"
      >
        <button
          className={`flex items-center space-x-1 ${
            activeTab === "shapes" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("shapes")}
        >
          <FaShapes /> <span>SHAPES</span>
        </button>
        <button
          className={`flex items-center space-x-1 ${
            activeTab === "summary" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("summary")}
        >
          <FaClipboardList /> <span>SUMMARY</span>
        </button>
        <button
          className={`flex items-center space-x-1 ${
            activeTab === "improvement" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("improvement")}
        >
          <FaLightbulb /> <span>IMPROVEMENT IDEAS</span>
        </button>
      </div>

      <div
        className={`absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-all duration-300 origin-top-left ${
          hovered ? "opacity-100 scale-100 w-[300px] sm:w-[500px] md:w-[700px]" : "opacity-0 scale-95 w-0 pointer-events-none"
        }`}
      >
        {activeTab === "shapes" && <Shapes />}
        {activeTab === "improvement" && <ProposedEnhancements />}
        {activeTab === "summary" && <p className="text-sm">Summary component yakında eklenecek...</p>}
      </div>
    </div>
  );
};

export default Tab;