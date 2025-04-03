import React from "react";
import { exportToWord } from "../../utils/exportToWord";


const shapeIcons = {
  Operation: <div className="w-6 h-6 rounded-full bg-green-500"></div>,
  Inspection: <div className="w-6 h-6 bg-blue-500"></div>,
  Transportation: <div className="text-orange-500 text-lg font-bold">→</div>,
  Delay: <div className="text-yellow-400 text-lg font-bold">◐</div>,
  Storage: <div className="text-purple-500 text-lg font-bold">▼</div>
};

const Summary = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return <p className="text-center text-sm text-gray-500">No steps available.</p>;
  }

  const totalTime = steps.reduce((sum, s) => sum + s.time, 0);
  const totalDistance = steps.reduce((sum, s) => sum + s.distance, 0);
  const valueAddedCount = steps.filter(s => s.isValueAdded).length;
  const nonValueAddedCount = steps.length - valueAddedCount;
  const valueAddedPercentage = ((valueAddedCount / steps.length) * 100).toFixed(2);
  const nonValueAddedPercentage = (100 - valueAddedPercentage).toFixed(2);

  const shapeCount = {};
  steps.forEach(s => {
    shapeCount[s.type] = (shapeCount[s.type] || 0) + 1;
  });

  const shapeData = ["Operation", "Inspection", "Transportation", "Delay", "Storage"].map(type => {
    const count = shapeCount[type] || 0;
    const percentage = ((count / steps.length) * 100).toFixed(2);
    return {
      process: type,
      shape: shapeIcons[type],
      count,
      percentage
    };
  });

  return (
    <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-10">
        {/* Sol istatistikler */}
        <div className="space-y-4 text-sm font-semibold text-gray-800">
          <p>TOTAL DISTANCE: {totalDistance}</p>
          <p>TOTAL TIME: {totalTime}</p>
          <p>NUMBER OF VALUE ADDED: {valueAddedCount}</p>
          <p>NUMBER OF NON-VALUE ADDED: {nonValueAddedCount}</p>
          <p>PERCENTAGE OF VALUE ADDED: {valueAddedPercentage}%</p>
          <p>PERCENTAGE OF NON-VALUE ADDED: {nonValueAddedPercentage}%</p>
        </div>

        {/* Sağ tablo */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left bg-blue-200 text-xs uppercase font-bold">
                <th className="px-4 py-2">Process</th>
                <th className="px-4 py-2">Shape</th>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Percentage</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {shapeData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2 font-semibold">{item.process}</td>
                  <td className="px-4 py-2">{item.shape}</td>
                  <td className="px-4 py-2">{item.count}</td>
                  <td className="px-4 py-2">{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save as Word */}
      <div className="flex justify-end mt-6">
      <button
  onClick={() => exportToWord(summaryStats, shapeData)}
  className="text-xs flex items-center gap-1 text-black font-semibold hover:underline"
>
  SAVE AS WORD
  <span className="text-lg">⬇️</span>
</button>
      </div>
    </div>
  );
};

export default Summary;
