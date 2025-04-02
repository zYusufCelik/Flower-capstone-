import React from "react";

const Shapes = () => {
  const shapes = [
    {
      icon: <div className="w-4 h-4 bg-green-500 rounded-full"></div>,
      name: "Operation",
      description:
        "An action. One of the steps in the procedure. Any operation for making, altering or changing. Eg. Drilling a hole, cutting, shaping.",
    },
    {
      icon: <div className="w-4 h-4 bg-blue-500"></div>,
      name: "Inspection",
      description:
        "Represents checking for quality and quantity of the items. Eg. Weight check, examine printed form for information.",
    },
    {
      icon: <span className="text-orange-500 text-lg">→</span>,
      name: "Transportation",
      description:
        "Movement of workers or materials. Eg. Move material by truck or conveyor.",
    },
    {
      icon: (
        <div className="w-4 h-4 bg-yellow-400 rounded-full relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-white"></div>
        </div>
      ),
      name: "Delay",
      description:
        "Delay means the process has stopped due to some reason. Eg. Waiting for elevator, materials waiting on floor to be processed.",
    },
    {
      icon: (
        <div className="w-4 h-4 bg-purple-500 clip-triangle-down"></div>
      ),
      name: "Storage",
      description: "Represents a storage or holding step.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">SHAPES</h3>

      <div className="space-y-4">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className="flex items-center border border-gray-200 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="mr-4 flex items-center justify-center w-5 h-5">
              {shape.icon}
            </div>

            {/* Name + Description */}
            <div className="flex items-start w-full">
              {/* Name */}
              <div className="w-32">
                <span className="font-semibold text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-md px-3 py-1 inline-block text-center">
                  {shape.name}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-snug ml-4">
                {shape.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shapes;
