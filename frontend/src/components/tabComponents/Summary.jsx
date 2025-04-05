import React from "react";

const Summary = ({ steps }) => {
  // 🔢 Toplam zaman ve mesafe
  const totalTime = steps.reduce((sum, step) => sum + step.time, 0);
  const totalDistance = steps.reduce((sum, step) => sum + step.distance, 0);

  // 🔍 Değer katan ve katmayan adımlar
  const valueAddedCount = steps.filter((s) => s.isValueAdded).length;
  const nonValueAddedCount = steps.length - valueAddedCount;

  const valueAddedPercentage = steps.length > 0
    ? ((valueAddedCount / steps.length) * 100).toFixed(2)
    : "0.00";

  const nonValueAddedPercentage = steps.length > 0
    ? ((nonValueAddedCount / steps.length) * 100).toFixed(2)
    : "0.00";

  // 🔷 Şekil bazlı istatistik
  const shapeTypes = ["Operation", "Inspection", "Transportation", "Delay", "Storage"];
  const shapeData = shapeTypes.map((type) => {
    const count = steps.filter((s) => s.type === type).length;
    const percentage = steps.length > 0
      ? ((count / steps.length) * 100).toFixed(2)
      : "0.00";

    const shapeIcon = {
      Operation: <div className="w-6 h-6 rounded-full bg-green-500"></div>,
      Inspection: <div className="w-6 h-6 bg-blue-500"></div>,
      Transportation: <div className="text-orange-500 text-lg font-bold">→</div>,
      Delay: <div className="text-yellow-400 text-lg font-bold">◐</div>,
      Storage: <div className="text-purple-500 text-lg font-bold">▼</div>
    };

    return {
      process: type,
      shape: shapeIcon[type],
      count,
      percentage: `${percentage}%`
    };
  });

  // 🧾 Export için özet veriler
  const summaryStats = {
    totalDistance,
    totalTime,
    valueAddedCount,
    nonValueAddedCount,
    valueAddedPercentage: `${valueAddedPercentage}%`,
    nonValueAddedPercentage: `${nonValueAddedPercentage}%`
  };

  // 📄 Save as Word (henüz aktif değilse exportToWord eklenebilir)
  const exportToWord = () => {
    alert("Word export işlemi burada tanımlanacak.");
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Summary of Your Process
      </h2>

      {/* Sol istatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm font-medium text-gray-700">
        <div className="space-y-2">
          <p>Total Time: <span className="font-semibold">{summaryStats.totalTime} min</span></p>
          <p>Total Distance: <span className="font-semibold">{summaryStats.totalDistance} m</span></p>
          <p>Number of Value-Added: <span className="font-semibold">{summaryStats.valueAddedCount}</span></p>
          <p>Number of Non-Value-Added: <span className="font-semibold">{summaryStats.nonValueAddedCount}</span></p>
          <p>Value-Added %: <span className="font-semibold">{summaryStats.valueAddedPercentage}</span></p>
          <p>Non-Value-Added %: <span className="font-semibold">{summaryStats.nonValueAddedPercentage}</span></p>
        </div>

        {/* Sağ tablo */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="text-left bg-blue-100 text-xs uppercase font-bold text-gray-800">
                <th className="px-4 py-2">Process</th>
                <th className="px-4 py-2">Shape</th>
                <th className="px-4 py-2">Count</th>
                <th className="px-4 py-2">%</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {shapeData.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td className="px-4 py-2 font-medium">{item.process}</td>
                  <td className="px-4 py-2">{item.shape}</td>
                  <td className="px-4 py-2">{item.count}</td>
                  <td className="px-4 py-2">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save as Word */}
      <div className="flex justify-end mt-6">
        <button
          onClick={exportToWord}
          className="text-xs flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          Save as Word <span className="text-lg">⬇️</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
