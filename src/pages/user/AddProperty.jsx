import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../api/property.api";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import MapPicker from "../../components/map/MapPicker";

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "RESIDENTIAL",
    area: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: "",
    longitude: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append images
      images.forEach((image) => {
        data.append("images", image);
      });

      await createProperty(data);
      alert("Property added successfully! Waiting for admin approval.");
      navigate("/user/my-properties");
    } catch (err) {
      console.error("Error adding property:", err);
      setError(err.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="container">
        <div className="page-header">
          <h1>Add New Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-section">
            <h2>Basic Information</h2>

            <Input
              label="Property Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Beautiful 3BHK Apartment"
              required
            />

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                rows={5}
                required
              />
            </div>

            <div className="form-row">
              <Input
                label="Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="5000000"
                required
              />

              <div className="form-group">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <Input
                label="Area (sq.ft)"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleChange}
                placeholder="1500"
                required
              />

              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="3"
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              required
            />

            <div className="form-row">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />

              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="123456"
                required
              />
            </div>

            <div className="map-picker-container">
              <label>Select Location on Map</label>
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          <div className="form-section">
            <h2>Images</h2>
            <div className="form-group">
              <label>Upload Images (Max 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                max={5}
              />
              <small>You can select up to 5 images</small>
            </div>

            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <div key={index} className="preview-item">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/user/my-properties")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
