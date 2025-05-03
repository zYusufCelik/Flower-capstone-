import React from "react";

const Shapes = () => {
  const shapes = [
    {
      icon: <div className="w-6 h-6 bg-green-600 rounded-full" />,
      name: "Operation",
      description:
        "A step in the process where a specific task is performed that changes the form, fit, function, or condition of a product. It adds value to the product. Eg. Drilling, cutting, shaping.",
    },
    {
      icon: <div className="w-6 h-6 bg-blue-500 rounded" />,
      name: "Inspection",
      description:
        "Represents checking for quality and quantity of the items. Eg. Weight check, examine printed form for information.",
    },
    {
      icon: (
        <img
        src="src/assets/transportation.png"
        alt="Transportation Icon"
        className="w-10 h-10 object-contain"
      />
      ),
      name: "Transportation",
      description:
        "Movement of workers or materials, e.g., by hand, or truck.",
    },
    {
      icon: (
        <img
      src="src/assets/delay.png"
      alt="Delay Icon"
      className="w-10 h-10 object-contain"
    />
      ),
      name: "Delay",
      description:
        "Delay means the process has stopped due to some reason. Eg. Waiting for elevator, materials waiting on floor to be processed.",
    },
    {
      icon: (
        <img
      src="src/assets/storage.png"
      alt="Storage Icon"
      className="w-max h-max object-contain"
    />
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
            <div className="border border-gray-400 px-3 py-1 rounded text-xs font-medium text-center w-full break-words">
              {shape.name}
            </div>
          </div>

          {/* Alt: açıklama */}
          <div className="w-full lg:flex-1 border border-gray-300 p-3 rounded text-xs text-center lg:text-left break-words">
            {shape.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shapes;