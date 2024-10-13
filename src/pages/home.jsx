import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // For redirecting to login
import Sidebar from "./../components/sidebar/sidebar";
import SearchBar from "./../components/search/search";
import DisplayItems from "./../components/displayItems/displayItems";
import FilterSidebar from "./../components/filter/filterSidebar"; 
import itemsData from '../components/items.json';
import './home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayItems, setDisplayItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState(itemsData); 
  const navigate = useNavigate();  // Hook for navigation

  // Filter items based on search query
  useEffect(() => {
    let searchedItems = itemsData;

    if (searchQuery !== '') {
      searchedItems = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setDisplayItems(searchedItems); 
    setFilteredItems(searchedItems); 
  }, [searchQuery]);

  // Logout function
  const handleLogout = () => {
    // Clear the auth token (from localStorage, session, etc.)
    localStorage.removeItem('authToken'); // or however you're storing the token
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <div className="sidebar">
        <Sidebar setDisplayItems={setDisplayItems} />
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Logout Button */}
        <div className="header">
          <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
        </div>

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
