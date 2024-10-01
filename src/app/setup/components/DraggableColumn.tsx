import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Column } from "./types/templateSetupInterfaces";
import { Trash2 } from "lucide-react";

interface DraggableColumnProps {
  column: Column;
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  removeColumn: (column: Column) => void;
}

const ItemTypes = {
  COLUMN: "column",
};

const DraggableColumn: React.FC<DraggableColumnProps> = ({
  column,
  index,
  moveColumn,
  removeColumn,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.COLUMN,
    item: { index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.COLUMN,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index; // Update the index to the current index
      }
    },
  });

  return (
    <div
      className={`flex items-center justify-between bg-white p-2 rounded shadow cursor-move mb-2 ${
        isDragging ? "opacity-50" : ""
      }`}>
      <span className="text-black">{column.content}</span>
      <Trash2
        className="text-red-500 hover:text-red-700 cursor-pointer ml-2"
        onClick={() => removeColumn(column)}
      />
    </div>
  );
};

export default DraggableColumn;
