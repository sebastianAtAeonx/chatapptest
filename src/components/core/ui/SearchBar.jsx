import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="flex justify-end w-[60%] h-fit">
      <div className="flex w-[90%] bg-[#ffffffc9] border rounded-full overflow-hidden">
        <div className="w-full pl-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Here..."
            value={query}
            required
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="w-[90%] bg-transparent focus:outline-none"
          />
        </div>
        <button
          onClick={onSearch}
          className="px-2 py-2 text-white rounded-full bg-gradient-to-tr from-[#0072e5]/40 to-[#d399fa]/70 
          hover:from-[#0072e5]/50 hover:to-[#d399fa]/90 active:scale-[95%] duration-500 m-1"
        >
          <IoSearchOutline size={21} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
