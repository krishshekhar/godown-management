import React, { useState, useEffect } from 'react';
import godownsData from '../godowns.json'; // Import godowns data
import itemsData from '../items.json'; // Import items data
import './sidebar.css'; // Import the styles

const Sidebar = ({ setDisplayItems }) => {
  const [godowns, setGodowns] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedParents, setExpandedParents] = useState({});
  const [expandedChildren, setExpandedChildren] = useState({});

  useEffect(() => {
    // Set the godowns and items from the imported data
    setGodowns(godownsData);
    setItems(itemsData);
  }, []);

  // Toggle expand/collapse of parent godowns
  const toggleExpandParent = (parentId) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  // Toggle expand/collapse of child godowns
  const toggleExpandChild = (childId) => {
    setExpandedChildren((prev) => ({
      ...prev,
      [childId]: !prev[childId],
    }));
  };

  // Get items that belong to a particular godown
  const getItemsForGodown = (godownId) => {
    return items.filter((item) => item.godown_id === godownId);
  };

  // Render the sidebar with dropdown logic
  const renderGodowns = () => {
    const parentGodowns = godowns.filter((g) => g.parent_godown === null);
    const childGodowns = godowns.filter((g) => g.parent_godown !== null);

    return parentGodowns.map((parent) => {
      const children = childGodowns.filter((g) => g.parent_godown === parent.id);
      const isExpandedParent = expandedParents[parent.id] || false;
      const itemsInParentGodown = getItemsForGodown(parent.id);

      return (
        <div key={parent.id} className="parent-godown">
          {/* Parent Godown with Arrow */}
          <div className="parent-title" onClick={() => toggleExpandParent(parent.id)}>
            {children.length > 0 && (
              <span className={`arrow ${isExpandedParent ? 'down' : 'right'}`} />
            )}
            <h3>{parent.name}</h3>
          </div>

          {/* Dropdown for items and child godowns */}
          {isExpandedParent && (
            <div className="dropdown-content">
              {/* Items in the Parent Godown */}
              {itemsInParentGodown.length > 0 && (
                <ul className="items-list">
                  {itemsInParentGodown.map((item) => (
                    <li key={item.item_id} className="item">
                      <img src={item.image_url} alt={item.name} className="item-image" />
                      <div>
                        <button onClick={() => setDisplayItems([item])}>
                          {item.name}
                        </button>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Children Godowns */}
              {children.length > 0 && (
                <div className="child-godowns">
                  {children.map((child) => {
                    const isExpandedChild = expandedChildren[child.id] || false;
                    const itemsInChildGodown = getItemsForGodown(child.id);

                    return (
                      <div key={child.id}>
                        {/* Child Godown with Arrow */}
                        <div className="child-title" onClick={() => toggleExpandChild(child.id)}>
                          <span className={`arrow ${isExpandedChild ? 'down' : 'right'}`} />
                          <h4>{child.name}</h4>
                        </div>

                        {/* Items in the Child Godown */}
                        {isExpandedChild && itemsInChildGodown.length > 0 && (
                          <ul className="items-list">
                            {itemsInChildGodown.map((item) => (
                              <li key={item.item_id} className="item">
                                <img src={item.image_url} alt={item.name} className="item-image" />
                                <div>
                                  <button onClick={() => setDisplayItems([item])}>
                                    {item.name}
                                  </button>
                                  <p>Price: ${item.price}</p>
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
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
