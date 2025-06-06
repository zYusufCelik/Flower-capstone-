import React, { useState } from "react";
import ProcessForm from "./ProcessForm";
import { saveChart } from "../../services/chartService";
import { validateProcesses } from "../../utils/validationHelper";
import { toast } from "react-hot-toast";

const ChartBuilder = ({ onSetSummary, onSetTab }) => {
  const [chartName, setChartName] = useState("");
  const [processes, setProcesses] = useState([]);

  const handleAddProcess = () => {
    setProcesses((prev) => [
      ...prev,
      {
        processName: "",
        shape: "",
        time: "",
        distance: "",
        valueAdded: false,
        nonValueAdded: false,
      },
    ]);
  };

  const handleProcessChange = (index, updated) => {
    const newProcesses = [...processes];
    newProcesses[index] = updated;
    setProcesses(newProcesses);
  };

  const handleDeleteProcess = (index) => {
    setProcesses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveChart = async () => {
    if (!chartName || chartName.trim() === "") {
      toast.error("Process name is required.");
      return;
    }

    const validationErrors = validateProcesses(processes);
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    try {
      const cleanedProcesses = processes.map((p) => ({
        ...p,
        time: p.time === "" ? null : Number(p.time),
        distance: p.distance === "" ? null : Number(p.distance),
      }));

      const chartPayload = {
        name: chartName,
        processes: cleanedProcesses,
      };

      const result = await saveChart(chartPayload);

      if (result && result.summary) {
        onSetSummary(result.summary);
        onSetTab("SUMMARY");
        toast.success("Chart saved successfully!");
      } else {
        toast("Chart saved but summary could not be generated.", {
          icon: "⚠️",
        });
      }
    } catch (error) {
      console.error("Error while saving chart:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleRefresh = () => {
    setChartName("");
    setProcesses([]);
    onSetSummary(null);
  };

  return (
    <div className="w-full max-w-[1000px]">
      {/* Chart Name */}
      <div className="mb-6">
        <label className="block text-md font-medium text-gray-700 mb-1">
          Process Name
        </label>
        <input
          className="w-[300px] border border-gray-300 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-400 text-sm my-3"
          value={chartName}
          onChange={(e) => setChartName(e.target.value)}
          placeholder="Enter process name"
        />
      </div>

      {/* Process Forms */}
      <div className="space-y-5 pr-2">
        {processes.map((process, index) => (
          <ProcessForm
            key={index}
            data={process}
            onChange={(updated) => handleProcessChange(index, updated)}
            onDelete={() => handleDeleteProcess(index)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleAddProcess}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded border border-blue-300 text-sm"
        >
          + New Step
        </button>

        <button
          onClick={handleSaveChart}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded text-sm"
        >
          Save and Analyze
        </button>

        <button
          onClick={handleRefresh}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded text-sm"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ChartBuilder;
