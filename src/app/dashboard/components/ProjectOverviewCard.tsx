"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiTrash } from "react-icons/fi"; // Import delete icon

interface ProjectOverviewCardProps {
  projectId: string; // Add projectId to pass to the delete function
  name: string;
  category: string;
  description: string;
  createdDate: string;
  link: string; // URL to redirect when the card is clicked
  onDelete: (projectId: string) => void; // Add the onDelete function prop
}

const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({
  projectId,
  name,
  category,
  description,
  createdDate,
  link,
  onDelete,
}) => {
  const router = useRouter(); // Next.js router for navigation

  // Handle the card click
  const handleCardClick = () => {
    router.push(link); // Redirect to the provided project link
  };

  // Handle delete button click
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the card click handler from triggering
    onDelete(projectId); // Call the onDelete function with the project ID
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md cursor-pointer hover:shadow-xl transition-shadow duration-200 relative">
      {/* Header with Name and Delete Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[#2A3659] text-sm">Name</h3>
          <p className="text-xl font-semibold text-[#2A3659]">{name}</p>
        </div>

        {/* Delete Button aligned with Name */}
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-800"
          title="Delete project">
          <FiTrash size={20} />
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-[#2A3659] text-sm">Category</h3>
          <p className="text-lg italic text-[#2A3659]">{category}</p>
        </div>

        <div>
          <h3 className="text-[#2A3659] text-sm">Production Date</h3>
          <p className="text-lg text-[#2A3659]">{createdDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;
