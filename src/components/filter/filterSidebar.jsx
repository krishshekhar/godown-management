import React, { useState, useEffect } from 'react';
import godownsData from './../../components/godowns.json'; // Import the godowns list
import './filterSidebar.css';

const FilterSidebar = ({ items, setFilteredItems }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGodown, setSelectedGodown] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [priceRange, setPriceRange] = useState({ lower: '', upper: '' });

  // Extract unique values for the filter options based on the displayed items
  const brands = [...new Set(items.map(item => item.brand))];
  
  // Map godown_id to godown names for filtering
  const godowns = [...new Set(items.map(item => {
    const godown = godownsData.find(g => g.id === item.godown_id);
    return godown ? godown.name : 'Unknown';
  }))];

  const sizes = [...new Set(items.map(item => item.attributes.size).filter(Boolean))];
  const materials = [...new Set(items.map(item => item.attributes.material).filter(Boolean))];

  // Apply filters to the items based on selected filter options
  useEffect(() => {
    const filtered = items.filter(item => {
      const price = item.price;
      const lower = priceRange.lower === '' || price >= parseFloat(priceRange.lower);
      const upper = priceRange.upper === '' || price <= parseFloat(priceRange.upper);

      // Get the godown name for the current item
      const godown = godownsData.find(g => g.id === item.godown_id);
      const godownName = godown ? godown.name : 'Unknown';

      return (
        lower &&
        upper &&
        (selectedBrand === '' || item.brand === selectedBrand) &&
        (selectedGodown === '' || godownName === selectedGodown) && // Compare godown name
        (selectedSize === '' || item.attributes.size === selectedSize) &&
        (selectedMaterial === '' || item.attributes.material === selectedMaterial)
      );
    });
    setFilteredItems(filtered);
  }, [selectedBrand, selectedGodown, selectedSize, selectedMaterial, priceRange, items, setFilteredItems]);

  // Handle price range input changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  // Reset all filters to initial state
  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedGodown('');
    setSelectedSize('');
    setSelectedMaterial('');
    setPriceRange({ lower: '', upper: '' });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      {/* Brand Filter */}
      <div className="filter-section">
        <h4>Brand</h4>
        <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            name="lower"
            placeholder="Min Price"
            value={priceRange.lower}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="upper"
            placeholder="Max Price"
            value={priceRange.upper}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Godown Filter */}
      <div className="filter-section">
        <h4>Godown</h4>
        <select onChange={(e) => setSelectedGodown(e.target.value)} value={selectedGodown}>
          <option value="">All Godowns</option>
          {godowns.map(godown => (
            <option key={godown} value={godown}>{godown}</option>
          ))}
        </select>
      </div>

      {/* Size Filter (if applicable) */}
      {/* {sizes.length > 0 && (
        <div className="filter-section">
          <h4>Size</h4>
          <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
            <option value="">All Sizes</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )} */}

      {/* Material Filter (if applicable) */}
      {materials.length > 0 && (
        <div className="filter-section">
          <h4>Material</h4>
          <select onChange={(e) => setSelectedMaterial(e.target.value)} value={selectedMaterial}>
            <option value="">All Materials</option>
            {materials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>
      )}

      {/* Reset Filters Button */}
      <div className="filter-section reset-button">
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
