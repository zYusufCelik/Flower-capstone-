import React from "react";

const ProposedEnhancement = () => {
  return (
    <div className="border border-black w-[700px] mx-auto mt-10 p-6 bg-white">
      <div className="flex space-x-2 mb-4">
        <div className="border border-black px-2 py-1 text-xs font-semibold bg-gray-200">SHAPES</div>
        <div className="border border-black px-2 py-1 text-xs font-semibold bg-gray-200">SUMMARY</div>
        <div className="border border-black px-2 py-1 text-xs font-semibold bg-white">PROPOSED ENHANCEMENT</div>
      </div>
      <h2 className="font-bold mb-4">TO IMPROVE YOUR PROCESS CHECK THE FOLLOWINGS:</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Are there too many non-value-added activities in the process?</li>
        <li>Is there unnecessary transportation or movement within the process?</li>
        <li>Are there any repetitive processes that could be streamlined or eliminated?</li>
        <li>Is the process clearly defined and easily understandable?</li>
      </ul>
    </div>
  );
};

export default ProposedEnhancement;
