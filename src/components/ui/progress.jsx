// components/ui/progress.jsx
import React from "react";

export const Progress = ({ value = 0 }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

