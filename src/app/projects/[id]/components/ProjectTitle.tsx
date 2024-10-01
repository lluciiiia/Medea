import React from 'react';

interface ProjectTitleProps {
  projectName?: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ projectName }) => {
  return (
    <h1 className="text-2xl font-bold text-[#2A3659]">
      {projectName ? projectName : 'Projects'}
    </h1>
  );
};

export default ProjectTitle;
    