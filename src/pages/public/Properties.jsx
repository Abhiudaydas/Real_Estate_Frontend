import React, { useEffect, useState } from "react";
import { getProperties } from "../../api/property.api";
import PropertyCard from "../../components/property/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getProperties();

        console.log("FULL RESPONSE:", res.data);

        const list = res.data?.properties || [];
        setProperties(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to load properties", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (properties.length === 0) return <p>No properties available</p>;

  return (
    <div className="container">
      <h1>Available Properties</h1>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
