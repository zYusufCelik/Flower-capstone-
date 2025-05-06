import React from "react";

const shapeOptions = [
  {
    value: "circle",
    label: (
      <img src="src/assets/operation.png" alt="Operation" className="w-4 h-3" />
    ),
    colorClass: "border-2 border-green-500",
  },

  {
    value: "arrow",
    label: (
      <img
        src="src/assets/transportation.png"
        alt="Delay"
        className="w-4 h-4"
      />
    ),
    colorClass: "border-2 border-red-500",
  },

  {
    value: "square",
    label: (
      <img
        src="src/assets/inspection.png"
        alt="Inspection"
        className="w-4 h-4"
      />
    ),
    colorClass: "border-2 border-blue-300",
  },

  {
    value: "D",
    label: (
      <img
        src="src/assets/delay.png"
        alt="Transportation"
        className="w-4 h-4"
      />
    ),
    colorClass: "border-2 border-yellow-300",
  },

  {
    value: "triangle",
    label: (
      <img src="src/assets/storage.png" alt="Storage" className="w-4 h-4" />
    ),
    colorClass: "border-2 border-purple-500",
  },
];

const ProcessForm = ({ data, onChange, onDelete }) => {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="relative w-full mx-0 mb-4">
      {/* Delete icon */}
      <button
        onClick={onDelete}
        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 z-10"
        title="Delete"
      >
        ×
      </button>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center gap-6 w-full border border-gray-300 bg-white p-3 rounded shadow-sm text-xs">
          {/* Process */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Step
            </label>
            <textarea
              className="border px-2 py-1 rounded resize-none h-[40px] w-full text-xs text-gray-900 bg-white placeholder-gray-400 text-center"
              placeholder="Step Name"
              value={data.processName}
              onChange={(e) => updateField("processName", e.target.value)}
            />
          </div>

          {/* Shape */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Shape
            </label>
            <div className="flex gap-1 flex-wrap justify-center">
              {shapeOptions.map((shape) => {
                const isSelected = data.shape === shape.value;
                return (
                  <button
                    key={shape.value}
                    onClick={() =>
                      updateField("shape", isSelected ? null : shape.value)
                    }
                    className={`w-6 h-6 flex items-center justify-center rounded border text-[13px] font-normal leading-none transition-colors duration-200
                      ${
                        isSelected
                          ? shape.colorClass + " border-black"
                          : "text-gray-500 border-gray-300 bg-white"
                      }`}
                  >
                    {shape.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Time
            </label>
            <input
              type="number"
              className="border px-2 py-1 rounded w-[60px] h-[40px] text-xs text-gray-900 bg-white placeholder-gray-400 text-center"
              placeholder={data.shape === "arrow" ? "X" : "sec"}
              value={data.time}
              onChange={(e) => updateField("time", e.target.value)}
              disabled={data.shape === "arrow"}
            />
          </div>

          {/* Distance */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Distance
            </label>
            <input
              type="number"
              className="border px-2 py-1 rounded w-[60px] h-[40px] text-xs text-gray-900 bg-white placeholder-gray-400 text-center"
              placeholder={data.shape !== "arrow" ? "X" : "m"}
              value={data.distance}
              onChange={(e) => updateField("distance", e.target.value)}
              disabled={data.shape !== "arrow"}
            />
          </div>

          {/* Value Added */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Value Added
            </label>
            <input
              type="checkbox"
              checked={data.valueAdded}
              onChange={(e) => updateField("valueAdded", e.target.checked)}
              className="w-6 h-6 mt-1 items-center"
            />
          </div>

          {/* Non-Value Added */}
          <div className="flex flex-col items-center justify-between w-full h-[75px]">
            <label className="text-gray-700 text-center h-[20px] flex items-end justify-center">
              Non-Value Added
            </label>
            <input
              type="checkbox"
              checked={data.nonValueAdded}
              onChange={(e) => updateField("nonValueAdded", e.target.checked)}
              className="w-6 h-6 mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessForm;
