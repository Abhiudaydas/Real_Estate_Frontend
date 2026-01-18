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
    type: "sell",
    category: "house",
    address: "",
    city: "",
    state: "",
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
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    setImages(files);
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

      // Append basic fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("type", formData.type);
      data.append("category", formData.category);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      // Append location fields
      data.append("location[address]", formData.address);
      data.append("location[city]", formData.city);
      data.append("location[state]", formData.state);

      // Append images
      images.forEach((image) => {
        data.append("images", image);
      });

      console.log("Submitting property:", Object.fromEntries(data));

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
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="sell">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="house">House</option>
                  <option value="flat">Flat</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
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
            </div>

            <div className="map-picker-container">
              <label>Select Location on Map</label>
              <MapPicker onLocationSelect={handleLocationSelect} />
              {formData.latitude && formData.longitude && (
                <p className="location-info">
                  Selected: {formData.latitude.toFixed(6)},{" "}
                  {formData.longitude.toFixed(6)}
                </p>
              )}
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
