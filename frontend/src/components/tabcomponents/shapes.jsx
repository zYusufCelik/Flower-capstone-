import React from "react";

const Shapes = () => {
  const shapes = [
    { color: "bg-green-500", name: "Operation", description: "Add order of the steps..." },
    { color: "bg-blue-500", name: "Inspection", description: "Steps where checks..." },
    { color: "bg-yellow-400", name: "Transportation", description: "Movement of items..." },
    { color: "bg-orange-500", name: "Delay", description: "Steps that introduce a delay..." },
    { color: "bg-purple-500", name: "Storage", description: "Steps where items are stored..." }
  ];

  return (
    <div className="w-80 p-5 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">SHAPES SUMMARY</h3>
      {shapes.map((shape, index) => (
        <div key={index} className="flex items-center p-3 bg-white shadow-sm rounded-md mb-2">
          <div className={`w-8 h-8 rounded-full ${shape.color} mr-3`}></div>
          <div>
            <p className="font-medium">{shape.name}</p>
            <p className="text-xs text-gray-500">{shape.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shapes;