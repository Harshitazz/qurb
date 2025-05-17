'use client';

import { useState } from 'react';
import { FiSliders } from 'react-icons/fi'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-full max-w-xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 px-2 sm:px-4 py-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        <button type="submit" className="absolute right-4 text-gray-500 hover:text-gray-700">
          <FiSliders size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
