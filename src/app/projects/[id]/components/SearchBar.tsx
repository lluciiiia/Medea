import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the search function passed down from the parent component
  };

  return (
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
  );
};

export default SearchBar;
