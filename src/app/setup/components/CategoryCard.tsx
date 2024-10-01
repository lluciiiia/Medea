import React from 'react';

interface CategoryCardProps {
  label: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  onClick: () => void;
  additionalAction?: React.ReactNode; // Optional prop for actions like delete
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  icon,
  description,
  selected,
  onClick,
  additionalAction,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
      ${selected ? 'border-orange-500 shadow-lg' : 'border-gray-300 hover:shadow-md'}
      `}
      style={{ width: '400px', minHeight: '250px' }} // Adjusted width and height for better layout
      onClick={onClick}
    >
      {/* Icon */}
      <div className="text-orange-500 text-4xl mb-4">{icon}</div>

      {/* Label */}
      <h2 className="text-xl font-semibold mb-2 text-[#1F2937]">{label}</h2>

      {/* Description */}
      <p className="text-gray-500">{description}</p>

      {/* Additional Action */}
      {additionalAction && (
        <div className="mt-4">
          {additionalAction} {/* Render the additional action, such as delete */}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
