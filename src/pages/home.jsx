import React, { useState, useEffect } from 'react';
import Sidebar from "./../components/sidebar/sidebar";
import SearchBar from "./../components/search/search";
import DisplayItems from "./../components/displayItems/displayItems";
import FilterSidebar from "./../components/filter/filterSidebar"; // Import FilterSidebar
import itemsData from '../components/items.json';
import './home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayItems, setDisplayItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState(itemsData);

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setDisplayItems(itemsData);
    } else {
      const filtered = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayItems(filtered);
    }
  }, [searchQuery]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <div className="sidebar">
        <Sidebar setDisplayItems={setDisplayItems} />
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Search bar */}
        <div className="flex justify-center">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Display Items */}
        <div className="flex justify-center display-items-container">
          <DisplayItems items={filteredItems} />
        </div>
      </div>

      {/* Filter Sidebar on the right */}
      <div className="filter-sidebar">
        <FilterSidebar items={displayItems} setFilteredItems={setFilteredItems} />
      </div>
    </div>
  );
};

export default Home;
