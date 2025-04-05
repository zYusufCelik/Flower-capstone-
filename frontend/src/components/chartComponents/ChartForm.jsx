import React from "react";

const ChartForm = ({ steps }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-8 border border-gray-200">
      <h3 className="text-lg font-bold text-center text-gray-800 mb-4">Process Flow Steps</h3>
      {steps.length === 0 ? (
        <p className="text-center text-gray-500">No steps added yet.</p>
      ) : (
        <ul className="space-y-3">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <span className="font-semibold text-gray-700">{index + 1}. {step.type}</span>
              <span className="text-sm text-gray-500">
                {step.isValueAdded ? "Value-Added" : "Non-Value-Added"} — Time: {step.time} min, Distance: {step.distance} m
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChartForm;
