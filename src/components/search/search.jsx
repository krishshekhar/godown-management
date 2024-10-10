import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './search.css';

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  // Update input field value
  const handleInputChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  // Trigger search on button click
  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="searchbox">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search godowns or items..."
      />
      <button onClick={handleSearch}>
        <CiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
