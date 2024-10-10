import React, { useState, useEffect } from 'react';
import godownsData from '../godowns.json'; // Import godowns data
import itemsData from '../items.json'; // Import items data
import './sidebar.css'; // Import the styles

const Sidebar = ({ setDisplayItems }) => {
  const [godowns, setGodowns] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedGodowns, setExpandedGodowns] = useState({});
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded items
  const [selectedItemId, setSelectedItemId] = useState(null); // State to track clicked item

  useEffect(() => {
    // Set the godowns and items from the imported data
    setGodowns(godownsData);
    setItems(itemsData);
  }, []);

  // Toggle expand/collapse of godowns
  const toggleExpandGodown = (godownId) => {
    setExpandedGodowns((prev) => ({
      ...prev,
      [godownId]: !prev[godownId],
    }));
  };

  // Toggle expand/collapse of items
  const toggleExpandItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Get items that belong to a particular godown
  const getItemsForGodown = (godownId) => {
    return items.filter((item) => item.godown_id === godownId);
  };

  // Get child godowns for a given godown
  const getChildGodowns = (parentGodownId) => {
    return godowns.filter((g) => g.parent_godown === parentGodownId);
  };

  // Handle item click and set selected item
  const handleItemClick = (item) => {
    setDisplayItems([item]);
    setSelectedItemId(item.item_id); // Set the clicked item
  };

  // Handle godown button click to display items of that godown
  const handleGodownButtonClick = (godownId) => {
    const itemsInGodown = getItemsForGodown(godownId);
    setDisplayItems(itemsInGodown);
  };

  // Recursive function to render items (supports nested items)
  const renderItems = (itemsList) => {
    return itemsList.map((item) => {
      const hasChildren = item.children && item.children.length > 0; // Check if item has children
      const isExpanded = expandedItems[item.item_id] || false;

      return (
        <li key={item.item_id} className={`item ${selectedItemId === item.item_id ? 'selected' : ''}`}>
          {/* Item Row */}
          <div className="item-row" onClick={() => handleItemClick(item)}>
            <img src={item.image_url} alt={item.name} className="item-image" />
            <div>
              <button>{item.name}</button>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            {/* Arrow if item has children */}
            {hasChildren && (
              <span
                className={`arrow ${isExpanded ? 'down' : 'right'}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent click
                  toggleExpandItem(item.item_id);
                }}
              />
            )}
          </div>

          {/* Render sub-items if expanded */}
          {isExpanded && hasChildren && (
            <ul className="items-list child-items">
              {renderItems(item.children)} {/* Recursive call for child items */}
            </ul>
          )}
        </li>
      );
    });
  };

  // Recursive function to render godowns and their child godowns
  const renderGodowns = (parentGodownId = null) => {
    const currentGodowns = godowns.filter((g) => g.parent_godown === parentGodownId);

    return currentGodowns.map((godown) => {
      const isExpanded = expandedGodowns[godown.id] || false;
      const childGodowns = getChildGodowns(godown.id);
      const itemsInGodown = getItemsForGodown(godown.id);

      return (
        <div key={godown.id} className="godown">
          {/* Godown Title */}
          <div className="godown-title" onClick={() => toggleExpandGodown(godown.id)}>
            <div className="flex"> <h4>{godown.name}</h4>
            {(childGodowns.length > 0||itemsInGodown.length > 0) && (
              <span className={`arrow ${isExpanded ? 'down' : 'right'}`} />
            )}</div>
            
            {/* Button to display all items of this godown */}
            {itemsInGodown.length > 0 && (
              <button onClick={() => handleGodownButtonClick(godown.id)} className="view-items-button">
                View Items
              </button>
            )}
          </div>

          {/* Expand items and child godowns */}
          {isExpanded && (
            <div className="dropdown-content">
              {/* Items in the Godown */}
              {itemsInGodown.length > 0 && (
                <ul className="items-list">
                  {renderItems(itemsInGodown)} {/* Render items with sub-items */}
                </ul>
              )}

              {/* Recursive call to render child godowns */}
              {childGodowns.length > 0 && (
                <div className="child-godowns">
                  {renderGodowns(godown.id)} {/* Recursion for child godowns */}
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="sidebar">
      <h2>Godowns</h2>
      <div>{renderGodowns()}</div>
    </div>
  );
};

export default Sidebar;
