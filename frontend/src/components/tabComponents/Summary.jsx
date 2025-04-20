
import React from "react";

const Summary = ({ summary }) => {
  if (!summary) return <p className="text-gray-500">No summary available.</p>;

  return (
    <div className="space-y-6 w-full max-w-xl">
      {/* Genel Bilgiler */}
      <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded border">
        <div><strong>Total Time:</strong> {summary.totalTime} min</div>
        <div><strong>Total Distance:</strong> {summary.totalDistance} m</div>
        <div><strong>Value Added:</strong> {summary.valueAddedCount} ({summary.valueAddedPercentage}%)</div>
        <div><strong>Non-Value Added:</strong> {summary.nonValueAddedCount} ({summary.nonValueAddedPercentage}%)</div>
      </div>

      {/* Şekil Özeti */}
      <div>
        <h3 className="text-md font-semibold mb-2">Shapes Summary</h3>
        <div className="space-y-2">
          {summary.shapes.map((shape, idx) => (
            <div key={idx} className="flex justify-between text-sm bg-white p-2 border rounded shadow-sm">
              <span><strong>{shape.name}</strong> ({shape.shape})</span>
              <span>{shape.count} step(s) - {shape.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
