import React from "react";

const ProposedEnhancements = () => {
  const rows = [
    {
      label: "PURPOSE",
      questions: [
        "What is actually done?",
        "Why is the activity necessary at all?",
      ],
      suggestion: {
        title: "ELIMINATE",
        desc: "unnecessary parts of the job",
      },
      leftBracket: true,
      rightBracket: false,
    },
    {
      label: "PLACE",
      questions: [
        "Where is it being done? Why is it done at that particular place?",
      ],
      suggestion: {
        title: "COMBINE",
        desc: "wherever possible or REARRANGE the sequence of operations for more effective results.",
      },
      leftBracket: false,
      rightBracket: true,
      rightBracketGroup: "group1",
    },
    {
      label: "SEQUENCE",
      questions: [
        "When is it done? Why is it done at that particular time?",
      ],
      suggestion: null,
      leftBracket: false,
      rightBracket: true,
      rightBracketGroup: "group1",
    },
    {
      label: "PERSON",
      questions: [
        "Who is doing it? Why is it done by that particular person?",
      ],
      suggestion: null,
      leftBracket: false,
      rightBracket: true,
      rightBracketGroup: "group1",
    },
    {
      label: "MEANS",
      questions: [
        "How is it being done? Why is it being done in that particular way?",
      ],
      suggestion: {
        title: "SIMPLIFY",
        desc: "the operation.",
      },
      leftBracket: false,
      rightBracket: true,
      rightBracketGroup: "single",
    },
  ];

  const highlightKeywords = (text) => {
    return text.split(/(What|Why|Where|When|Who|How)/g).map((part, idx) => {
      if (["What", "Why", "Where", "When", "Who", "How"].includes(part)) {
        return (
          <span key={idx} className="font-bold">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="font-bold mb-6 text-center text-lg text-gray-800">
        TO IMPROVE YOUR PROCESS ASK THE FOLLOWINGS:
      </h2>

      <div className="space-y-6 relative">
        {rows.map((row, index) => (
          <div key={index} className="flex items-start space-x-4 relative">
            <div className="w-32 font-bold text-right text-sm pt-1 text-gray-800">
              {row.label}
            </div>

            <div className="relative flex-1">
              {row.leftBracket && (
                <div className="absolute -left-4 text-2xl text-gray-400 font-bold">
                  [
                </div>
              )}
              <div className="ml-4 space-y-1">
                {row.questions.map((q, i) => (
                  <p key={i} className="text-sm leading-tight text-gray-700">
                    {highlightKeywords(q)}
                  </p>
                ))}
              </div>
            </div>

            <div className="w-52 text-sm relative">
              {row.rightBracket && row.rightBracketGroup === "group1" && (
                <div className="absolute -left-2 top-0 text-4xl text-gray-400 font-bold">
                  ]
                </div>
              )}
              {row.rightBracket && row.rightBracketGroup === "single" && (
                <div className="absolute -left-2 top-0 text-2xl text-gray-400 font-bold">
                  ]
                </div>
              )}
              {row.suggestion && (
                <>
                  <div className="font-bold text-sm mb-1 text-gray-800">
                    {row.suggestion.title}
                  </div>
                  <div className="text-gray-700 leading-tight">
                    {row.suggestion.desc}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposedEnhancements;
