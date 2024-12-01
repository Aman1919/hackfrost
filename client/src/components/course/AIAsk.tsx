import React from "react";

const AIAsk: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ask AI</h2>
      {/* AI Ask interface */}
      <p>
        Here you can interact with AI and ask any questions related to the course.
      </p>
      {/* Placeholder for AI interaction */}
      <textarea
        className="w-full h-40 p-4 border rounded-lg"
        placeholder="Ask your question..."
      ></textarea>
    </div>
  );
};

export default AIAsk;
