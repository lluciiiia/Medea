import React, { useState } from 'react';
import { FiSearch, FiBell, FiSettings, FiUser } from 'react-icons/fi';

interface NavbarProps {
  onSearch: (searchTerm: string) => void; // Function to handle the search input
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Track the search term

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Update search term in the local state
    onSearch(value); // Call the search function passed down from the parent component
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-sm">
      {/* Left: Page Title */}
      <h1 className="text-2xl font-bold text-[#2A3659]">Projects</h1>

      {/* Center: Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for something"
          className="bg-[#F6F8FB] border-none rounded-full p-2 pl-10 w-80 text-gray-600"
        />
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6">
        <FiSettings className="text-gray-500 w-6 h-6 cursor-pointer hover:text-orange-500" />
        <div className="relative">
          <FiBell className="text-gray-500 w-6 h-6 cursor-pointer hover:text-orange-500" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#F36961]"></span>
        </div>
        <FiUser className="text-gray-500 w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:text-orange-500" />
      </div>
    </nav>
  );
};

export default Navbar;
