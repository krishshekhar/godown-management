import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import godownsData from './../../components/godowns.json'; // Import the godowns list
import './displayItems.css';

const DisplayItems = ({ items }) => {
  const [isSingleItemView, setIsSingleItemView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [godownName, setGodownName] = useState('');

  useEffect(() => {
    // Fetch the godown name when the current item changes
    if (isSingleItemView && items[currentIndex]) {
      const godown = godownsData.find(g => g.id === items[currentIndex].godown_id);
      setGodownName(godown ? godown.name : 'Unknown');
    }
  }, [currentIndex, isSingleItemView, items]);

  // Handle click on a single item to switch to the single item view
  const handleItemClick = (index) => {
    setCurrentIndex(index);
    setIsSingleItemView(true); // Switch to single item view
  };

  // Handle exiting the single item view
  const handleExitSingleView = () => {
    setIsSingleItemView(false); // Switch back to grid view
  };

  if (isSingleItemView) {
    const currentItem = items[currentIndex];
    return (
      <div className="single-item-view-container">
        {/* Close Button to Exit Single Item View */}
        <button onClick={handleExitSingleView} className="exit-button">
          <IoMdClose size={24} />
        </button>
        {currentIndex > 0 && (
          <div className="grid-item-ex" onClick={() => handleItemClick(currentIndex - 1)}>
            <img src={items[currentIndex - 1].image_url} alt={items[currentIndex - 1].name} className="grid-item-image-ex" />
            <div className="grid-item-details-ex">
              <p>{items[currentIndex - 1].name}</p>
              <p>Price: ${items[currentIndex - 1].price}</p>
            </div>
          </div>
        )}

        {/* Current Item */}
        <div className="item-card">
          {currentItem.status==="out_of_stock"?<><div className="outOfStock">OUT OF STOCK</div>
          <img src={currentItem.image_url} alt={currentItem.name} className="transparent item-image" /></>:
          <img src={currentItem.image_url} alt={currentItem.name} className="item-image" />}
          <div className="item-details">
            <div>
              <p><strong>Name:</strong> {currentItem.name}</p>
              <p><strong>Price:</strong> ${currentItem.price}</p>
              <p><strong>Quantity:</strong> {currentItem.quantity}</p>
              <p><strong>Brand:</strong> {currentItem.brand}</p>
            </div>
            <div>
              <p><strong>Size:</strong> {currentItem.attributes.size}</p>
              <p><strong>Material:</strong> {currentItem.attributes.material}</p>
              <p><strong>Color:</strong> {currentItem.attributes.color}</p>
              <p><strong>Godown:</strong> {godownName}</p> {/* Display godown name */}
            </div>
           
          </div>
          <div><p>{currentItem.status}</p></div>
        </div>

        {/* Display Previous Item */}
        

        {/* Display Next Item */}
        {currentIndex < items.length - 1 && (
          <div className="grid-item-ex" onClick={() => handleItemClick(currentIndex + 1)}>
            <img src={items[currentIndex + 1].image_url} alt={items[currentIndex + 1].name} className="grid-item-image-ex" />
            <div className="grid-item-details-ex">
              <p>{items[currentIndex + 1].name}</p>
              <p>Price: ${items[currentIndex + 1].price}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Grid view: Display 3 items per row
  return (
    <div className="grid-container">
      <div className="items-grid">
        {items.map((item, index) => (
          <div key={item.item_id} className="grid-item" onClick={() => handleItemClick(index)}>
            {item.status==="out_of_stock"?<><div className="outOfstock">OUT OF STOCK</div>
            <img src={item.image_url} alt={item.name} className="transparent grid-item-image" /></>:
            <img src={item.image_url} alt={item.name} className="grid-item-image" />}
            <div className="grid-item-details">
              <p>{item.name}</p>
              <p><strong>Godown:</strong> {godownName}</p> 
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
