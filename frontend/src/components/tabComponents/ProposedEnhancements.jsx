

import React from "react";

const ProposedEnhancements = () => {
  const data = [
    {
      label: "PURPOSE",
      question1: "What is actually done?",
      question2: "Why is the activity necessary at all?",
      suggestionTitle: "ELIMINATE",
      suggestionDesc: "unnecessary parts of the job",
    },
    {
      label: "PLACE",
      question1: "Where is it being done?",
      question2: "Why is it done at that particular place?",
    },
    {
      label: "SEQUENCE",
      question1: "When is it done?",
      question2: "Why is it done at that particular time?",
      suggestionTitle: "COMBINE",
      suggestionDesc: "wherever possible or REARRANGE the sequence of operations for more effective results.",
    },
    {
      label: "PERSON",
      question1: "Who is doing it?",
      question2: "Why is it done by that particular person?",
    },
    {
      label: "MEANS",
      question1: "How is it being done?",
      question2: "Why is it being done in that particular way?",
      suggestionTitle: "SIMPLIFY",
      suggestionDesc: "the operation.",
    },
  ];

  const highlight = (text) =>
    text.split(/(What|Why|Where|When|Who|How|REARRANGE)/g).map((part, i) => {
      const isKeyword = ["What", "Why", "Where", "When", "Who", "How", "REARRANGE"].includes(part);
      return (
        <span key={i} className={isKeyword ? "font-bold" : ""}>
          {part}
        </span>
      );
    });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white border border-gray-300 rounded">
      <h2 className="text-center font-bold text-lg mb-6">
        TO IMPROVE YOUR PROCESS ASK THE FOLLOWINGS:
      </h2>

      <div className="grid grid-cols-[150px_1fr_180px] gap-x-6 gap-y-6 text-sm text-gray-800">
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="font-bold uppercase">{item.label}</div>

            <div className="space-y-1">
              <p>{highlight(item.question1)}</p>
              <p>{highlight(item.question2)}</p>
            </div>

            <div>
              {item.suggestionTitle && (
                <>
                  <div className="font-bold">{item.suggestionTitle}</div>
                  <div>{highlight(item.suggestionDesc)}</div>
                </>
              )}
            </div>

            {(item.label === "PURPOSE" || item.label === "PERSON") && (
              <div className="col-span-3 border-b border-gray-300 my-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProposedEnhancements;
