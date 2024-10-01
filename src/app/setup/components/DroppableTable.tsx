import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Column, Template } from "./types/templateSetupInterfaces";
import DraggableColumn from "./DraggableColumn";

const ItemTypes = {
  COLUMN: "column",
};

interface DroppableTableProps {
  activeTemplate: Template | undefined;
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
}

const DroppableTable: React.FC<DroppableTableProps> = ({
  activeTemplate,
  templates,
  setTemplates,
}) => {
  const [newColumnName, setNewColumnName] = useState<string>(""); // State for new column input
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  // Move column logic using DnD
  const moveColumn = (fromIndex: number, toIndex: number) => {
    const updatedTemplates = [...templates];
    const activeTemplateIndex = templates.findIndex(
      (t) => t.id === activeTemplate?.id
    );
    const updatedColumns = [...updatedTemplates[activeTemplateIndex].columns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    updatedTemplates[activeTemplateIndex].columns = updatedColumns;
    setTemplates(updatedTemplates);
  };

  // Remove column logic
  const removeColumn = (column: Column) => {
    const updatedTemplates = [...templates];
    const activeTemplateIndex = templates.findIndex(
      (t) => t.id === activeTemplate?.id
    );
    updatedTemplates[activeTemplateIndex].columns = updatedTemplates[
      activeTemplateIndex
    ].columns.filter((c) => c.id !== column.id);
    setTemplates(updatedTemplates);
  };

  // Add column logic with validation checks
  const addCustomColumn = () => {
    const trimmedColumnName = newColumnName.trim();

    // Validate if the column name is valid
    if (!trimmedColumnName) {
      setErrorMessage("Column name cannot be empty.");
      return;
    }

    // Check if column name is a duplicate (case-insensitive)
    const isDuplicate = activeTemplate?.columns.some(
      (col) => col.content.toLowerCase() === trimmedColumnName.toLowerCase()
    );
    if (isDuplicate) {
      setErrorMessage("Column name already exists.");
      return;
    }

    // Create new column and update state
    const newColumn: Column = {
      id: trimmedColumnName.toLowerCase().replace(/\s+/g, "-"),
      content: trimmedColumnName,
    };
    const updatedTemplates = [...templates];
    const activeTemplateIndex = templates.findIndex(
      (t) => t.id === activeTemplate?.id
    );
    updatedTemplates[activeTemplateIndex].columns.push(newColumn);
    setTemplates(updatedTemplates);

    // Clear input and error message
    setNewColumnName("");
    setErrorMessage(null);
  };

  // Handle "Enter" key for adding column
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addCustomColumn();
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
  });

  return (
    <div className="w-full">
      {/* Add column input and button above the table */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter new column name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-1/3 p-2 border rounded-lg shadow-sm text-black focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addCustomColumn}
          className="bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white px-4 py-2 rounded-lg">
          Add Column
        </button>
      </div>

      {/* Error message display */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Table to display columns and rows */}
      <div className="overflow-x-auto">
        {/* Show a user-friendly message if there are no columns */}
        {activeTemplate?.columns.length === 0 && (
          <p className="text-center text-gray-500 p-4">
            No columns added yet. Please add a column to get started.
          </p>
        )}

        {activeTemplate?.columns.length &&
          activeTemplate.columns.length > 0 && (
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-white">
                  {activeTemplate?.columns.map((column, index) => (
                    <th
                      key={column.id}
                      className="p-4 text-center cursor-move text-lg bg-white border-white">
                      <DraggableColumn
                        index={index}
                        column={column}
                        moveColumn={moveColumn}
                        removeColumn={removeColumn}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, rowIndex) => (
                  <tr key={rowIndex} className="bg-white border-white">
                    {activeTemplate?.columns.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="p-4 text-center text-lg bg-white border-white">
                        {/* Leaving cells blank for now */}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};

export default DroppableTable;
