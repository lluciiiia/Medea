import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProjectTitle from './ProjectTitle';
import NavbarIcons from './NavBarIcons';

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
  projectName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, projectName }) => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-sm">
      {/* Left: Project Title */}
      <ProjectTitle projectName={projectName} />

      {/* Center: Search Bar */}
      <SearchBar onSearch={onSearch} />

      {/* Right: Navbar Icons */}
      <NavbarIcons />
    </nav>
  );
};

export default Navbar;
