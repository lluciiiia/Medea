import React from "react";

interface ProjectInfoCardProps {
  title: string;
  content: string | JSX.Element;
}

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  title,
  content,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-base font-semibold text-[#1F2937]">{title}</h3>
      <p className="text-gray-700 mt-2 line-clamp-2">{content}</p>
    </div>
  );
};

export default ProjectInfoCard;
