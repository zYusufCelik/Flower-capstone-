
import React from "react";

const Shapes = () => {
  const shapes = [
    {
      icon: <div className="w-6 h-6 bg-green-600 rounded-full" />,
      name: "Operation",
      description:
      "An action. One of the steps in the procedure. Any operation for making, altering or changing. Eg. Drilling a hole, cutting, shaping.",
    },
    {
      icon: <div className="w-6 h-6 bg-blue-500 rounded" />,
      name: "Inspection",
      description:
      "Represents checking for quality and quantity of the items. Eg. Weight check, examine printed form for information.",
    },
    {
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-3 h-[3px] bg-orange-500" />
          <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-orange-500 ml-[2px]" />
        </div>
      ),
      name: "Transportation",
      description:
        "Movement of workers or materials, e.g., by truck or conveyor.",
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full overflow-hidden flex">
          <div className="w-1/2 h-full bg-yellow-400 rounded-l-full" />
          <div className="w-1/2 h-full bg-white rounded-r-full" />
        </div>
      ),
      name: "Delay",
      description:
      "Delay means the process has stopped due to some reason. Eg. Waiting for elevator, materials waiting on floor to be processed.",
    },
    {
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-purple-600" />
        </div>
      ),
      name: "Storage",
      description:
        "Holding stage for goods, e.g., products stacked on pallets.",
    },
  ];

  return (
    <div className="w-full p-4 text-black bg-white space-y-4">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row gap-3 border border-gray-300 p-4 rounded-md overflow-hidden"
        >
          {/* Üst: ikon + isim */}
          <div className="flex items-center gap-3 w-full lg:w-[220px] shrink-0">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              {shape.icon}
            </div>
            <div className="border border-gray-400 px-3 py-1 rounded text-sm font-medium text-center w-full break-words">
              {shape.name}
            </div>
          </div>

          {/* Alt: açıklama */}
          <div className="w-full lg:flex-1 border border-gray-300 p-3 rounded text-sm text-center lg:text-left break-words">
            {shape.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shapes;

