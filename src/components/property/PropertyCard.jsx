import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img
        src={property.images?.[0]?.url || "/placeholder.jpg"}
        alt={property.title}
        className="property-card__image"
      />

      <div className="property-card__body">
        <h3>{property.title}</h3>
        <p>
          {property.location?.city}, {property.location?.state}
        </p>
        <p className="property-card__price">₹ {property.price}</p>

        <Link
          to={`/properties/${property._id}`}
          className="property-card__link"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
