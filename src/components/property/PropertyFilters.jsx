import React from "react";

const PropertyFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="property-filters">
      <div className="filter-group">
        <input
          type="text"
          name="search"
          placeholder="Search properties..."
          value={filters.search}
          onChange={handleChange}
          className="filter-input"
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label>Min Price</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="LAND">Land</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
