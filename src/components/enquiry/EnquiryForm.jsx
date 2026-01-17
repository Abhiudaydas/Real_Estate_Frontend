import React, { useState } from "react";
import { createEnquiry } from "../../api/enquiry.api";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const EnquiryForm = ({ propertyId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createEnquiry({
        ...formData,
        property: propertyId,
      });
      alert("Enquiry submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setError(err.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Send Enquiry">
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Submit Enquiry
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EnquiryForm;
