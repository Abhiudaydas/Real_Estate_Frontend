import React, { useEffect, useState } from "react";
import { getAllProperties } from "../../api/property.api";
import PropertyCard from "../../components/property/PropertyCard";
import PropertyFilters from "../../components/property/PropertyFilters";
import Loader from "../../components/ui/Loader";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    sortBy: "newest",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getAllProperties();
      setProperties(response.data.properties || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (prop) =>
          prop.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          prop.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()),
      );
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(
        (prop) => prop.price >= Number(filters.minPrice),
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (prop) => prop.price <= Number(filters.maxPrice),
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(
        (prop) => prop.propertyType === filters.propertyType,
      );
    }

    // Sorting
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (loading) return <Loader />;

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Properties</h1>
          <p>Find your perfect property from our collection</p>
        </div>

        <PropertyFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="properties-results">
          <p className="results-count">
            Showing {filteredProperties.length} of {properties.length}{" "}
            properties
          </p>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties found matching your criteria</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
