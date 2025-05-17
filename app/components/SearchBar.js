"use client";

import Image from "next/image";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 px-2 sm:px-4 py-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-4 text-gray-500 hover:text-gray-700"
        >
          <Image
          alt="search"
            src="/search.svg" 
            width={18}
            height={18}
            className="m-1 text-gray-600"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
