import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const defaultImage = "https://via.placeholder.com/400x300?text=No+Image";
  const imageUrl = property.images?.[0]?.url || defaultImage;

  return (
    <div className="property-card">
      <Link to={`/properties/${property._id}`}>
        <div className="property-image">
          <img src={imageUrl} alt={property.title} />
          {property.isFeatured && (
            <span className="featured-badge">Featured</span>
          )}
        </div>
        <div className="property-info">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-price">₹{property.price?.toLocaleString()}</p>
          <p className="property-description">
            {property.description?.substring(0, 100)}...
          </p>
          <div className="property-details">
            {property.bedrooms && <span>🛏️ {property.bedrooms} Beds</span>}
            {property.bathrooms && <span>🚿 {property.bathrooms} Baths</span>}
            {property.area && <span>📏 {property.area} sq.ft</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
