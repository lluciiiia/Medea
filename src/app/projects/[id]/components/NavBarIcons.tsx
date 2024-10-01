import React from 'react';
import { FiBell, FiSettings, FiUser } from 'react-icons/fi';

const NavbarIcons: React.FC = () => {
  return (
    <div className="flex items-center space-x-6">
      <FiSettings className="text-gray-500 w-6 h-6 cursor-pointer hover:text-orange-500" />
      <div className="relative">
        <FiBell className="text-gray-500 w-6 h-6 cursor-pointer hover:text-orange-500" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#F36961]"></span>
      </div>
      <FiUser className="text-gray-500 w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:text-orange-500" />
    </div>
  );
};

export default NavbarIcons;
