

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
        "Movement of workers or materials. Eg. Move material by truck or conveyor.",
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full relative overflow-hidden flex">
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
        "The stage of a finished good or a material waiting for an action. Eg. Finished products stacked on pallets.",
    },
  ];

  return (
    <div className="w-full p-3 text-black bg-white mt-0">

      <div className="space-y-4">
        {shapes.map((shape, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border border-black p-2"
          >
            {/* Sol blok: Icon + Name */}
            <div className="flex items-center w-[200px] gap-3">
              <div className="w-8 h-8 flex items-center justify-center">{shape.icon}</div>
              <div className="border border-black px-3 py-1 text-sm font-medium text-center whitespace-nowrap">
                {shape.name}
              </div>
            </div>

            {/* Sağ blok: Açıklama */}
            <div className="flex-1 border border-black px-3 py-2 text-sm">
              {shape.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shapes;
