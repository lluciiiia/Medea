import React from "react";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => (
  <div className="container mx-auto mt-4 mb-1 text-center">
    <p className="text-1xl text-gray-600 mb-2 font-medium">
      {`Step ${step} of ${totalSteps}`}
    </p>
    <div className="w-2/3 mx-auto bg-gray-200 rounded-full h-[10px] relative">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#F8AB5E] to-[#F36961]"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
