import React, { useState, useEffect } from 'react';
import Sidebar from "./../components/sidebar/sidebar";
import SearchBar from "./../components/search/search";
import DisplayItems from "./../components/displayItems/displayItems";
import itemsData from '../components/items.json'; // Import items for searching
import './home.css';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayItems, setDisplayItems] = useState(itemsData); // Initially show all items

  // Filter items based on search query when search icon is clicked
  useEffect(() => {
    if (searchQuery === '') {
      setDisplayItems(itemsData); // Show all items when search is empty
    } else {
      const filteredItems = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.brand.toLowerCase().includes(searchQuery)
      );
      setDisplayItems(filteredItems);
    }
  }, [searchQuery]); // Only runs when searchQuery changes

  return (
    <div style={{display:"flex"}}>
      {/* Sidebar on the left */}
      <div className="sidebar" >
        <Sidebar setDisplayItems={setDisplayItems} />
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* Centered Search Bar in the middle of the screen */}
        <div className="flex justify-center"  >
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Display Items below the search bar */}
        <div className="flex justify-center" >
          <DisplayItems items={displayItems} />
        </div>
      </div>
    </div>
  );
};

export default Home;
