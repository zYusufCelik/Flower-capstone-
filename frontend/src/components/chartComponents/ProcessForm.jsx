import React, { useState } from "react";

const ProcessForm = ({ onAddStep }) => {
  const [form, setForm] = useState({
    type: "Operation",
    isValueAdded: true,
    time: "",
    distance: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.time || !form.distance) return;

    onAddStep({
      ...form,
      time: parseFloat(form.time),
      distance: parseFloat(form.distance)
    });

    setForm({ ...form, time: "", distance: "" }); // temizle
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xl mx-auto space-y-4 border border-gray-200"
    >
      <h2 className="text-xl font-bold text-center text-gray-800">Add New Process Step</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Step Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option>Operation</option>
          <option>Inspection</option>
          <option>Transportation</option>
          <option>Delay</option>
          <option>Storage</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isValueAdded"
          checked={form.isValueAdded}
          onChange={handleChange}
          className="accent-blue-600"
        />
        <label className="text-sm text-gray-700">Value-Added Step</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time (minutes)</label>
        <input
          type="number"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Distance (meters)</label>
        <input
          type="number"
          name="distance"
          value={form.distance}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
      >
        Add Step
      </button>
    </form>
  );
};

export default ProcessForm;
