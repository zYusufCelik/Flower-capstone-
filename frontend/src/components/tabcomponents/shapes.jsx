import React from "react";

const Shapes = () => {
  const shapes = [
    {
      icon: "⬤",
      color: "text-green-500",
      name: "Operation",
      description:
        "An action. One of the steps in the procedure. Any operation for making, altering or changing. Eg. Drilling a hole, cutting, shaping."
    },
    {
      icon: "⬛",
      color: "text-blue-500",
      name: "Inspection",
      description:
        "Represents checking for quality and quantity of the items. Eg. Weight check, examine printed form for information."
    },
    {
      icon: "→",
      color: "text-orange-500",
      name: "Transportation",
      description:
        "Movement of workers or materials. Eg. Move material by truck or conveyor."
    },
    {
      icon: "◐",
      color: "text-yellow-400",
      name: "Delay",
      description:
        "Delay means the process has stopped due to some reason. Eg. Waiting for elevator, materials waiting on floor to be processed."
    },
    {
      icon: "▽",
      color: "text-purple-500",
      name: "Storage",
      description:
        "Represents a storage or holding step."
    }
  ];

  return (
    <div className="w-fit bg-white p-6 rounded-xl shadow-md border mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">SHAPES SUMMARY</h3>
      <div className="space-y-4">
        {shapes.map((shape, index) => (
          <div key={index} className="flex items-start w-[700px] border border-gray-300 rounded p-3 bg-white">
            <div className={`text-3xl mr-4 mt-1 ${shape.color}`}>{shape.icon}</div>
            <div className="flex flex-col w-full">
              <div className="flex items-center mb-2 gap-6">
                <div className="border border-black px-4 py-1 text-sm font-semibold rounded w-fit">
                  {shape.name}
                </div>
                <div className="border border-black p-2 text-xs text-gray-700 rounded max-w-[420px]">
                  {shape.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shapes;