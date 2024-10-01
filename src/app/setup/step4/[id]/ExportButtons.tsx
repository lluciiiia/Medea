import React from "react";

interface ExportButtonsProps {
  handleExportAll: () => void;
  handleExportCurrent: () => void;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  handleExportAll,
  handleExportCurrent,
}) => {
  return (
    <div className="mt-4 ml-auto mr-16 flex justify-end">
      <button
        onClick={handleExportAll}
        className="text-xs mx-2 px-3 py-2 border-2 border-grey-600 rounded-lg bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white cursor-pointer">
        Export All
      </button>
      <button
        onClick={handleExportCurrent}
        className="text-xs mx-2 px-3 py-2 border-2 border-ggrey-600 rounded-lg bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white cursor-pointer">
        Export This Table
      </button>
    </div>
  );
};

export default ExportButtons;
