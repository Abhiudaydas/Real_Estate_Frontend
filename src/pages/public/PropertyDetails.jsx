import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../../api/property.api";
import PropertyGallery from "../../components/property/PropertyGallery";
import EnquiryForm from "../../components/enquiry/EnquiryForm";
import Loader from "../../components/ui/Loader";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await getPropertyById(id);
      setProperty(response.data.property || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching property:", err);
      setError("Property not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  if (!property)
    return (
      <div className="container">
        <p>Property not found</p>
      </div>
    );

  return (
    <div className="property-details-page">
      <div className="container">
        <PropertyGallery images={property.images} />

        <div className="property-content">
          <div className="property-main">
            <div className="property-header">
              <h1>{property.title}</h1>
              <p className="property-price">
                ₹{property.price?.toLocaleString()}
              </p>
            </div>

            <div className="property-info">
              <div className="info-item">
                <span className="label">Type:</span>
                <span className="value">{property.propertyType}</span>
              </div>
              <div className="info-item">
                <span className="label">Area:</span>
                <span className="value">{property.area} sq.ft</span>
              </div>
              <div className="info-item">
                <span className="label">Bedrooms:</span>
                <span className="value">{property.bedrooms}</span>
              </div>
              <div className="info-item">
                <span className="label">Bathrooms:</span>
                <span className="value">{property.bathrooms}</span>
              </div>
            </div>

            <div className="property-description">
              <h2>Description</h2>
              <p>{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="property-amenities">
                <h2>Amenities</h2>
                <ul>
                  {property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="property-location">
              <h2>Location</h2>
              <p>{property.location?.address}</p>
            </div>
          </div>

          <div className="property-sidebar">
            <div className="contact-card">
              <h3>Interested?</h3>
              <button
                className="btn btn-primary btn-block"
                onClick={() => setShowEnquiryForm(true)}
              >
                Send Enquiry
              </button>
            </div>

            <div className="owner-card">
              <h3>Property Owner</h3>
              <p>{property.owner?.name}</p>
            </div>
          </div>
        </div>

        {showEnquiryForm && (
          <EnquiryForm
            propertyId={property._id}
            onClose={() => setShowEnquiryForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
