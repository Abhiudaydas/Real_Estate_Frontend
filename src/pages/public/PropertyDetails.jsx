import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../../api/property.api";
import EnquiryForm from "../../components/enquiry/EnquiryForm";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to load property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading property...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="container page-property-details">
      <h1>{property.title}</h1>
      <p>
        {property.location.city}, {property.location.state}
      </p>
      <p>
        <strong>₹ {property.price}</strong>
      </p>

      <p>{property.description}</p>

      <EnquiryForm propertyId={property._id} />
    </div>
  );
};

export default PropertyDetails;
