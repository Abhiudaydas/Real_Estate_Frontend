import React, { useState } from "react";
import { submitEnquiry } from "../../api/enquiry.api";

const EnquiryForm = ({ propertyId }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitEnquiry({
        ...form,
        property: propertyId,
      });

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p className="enquiry-success">Enquiry sent successfully!</p>;
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <h3>Contact Owner</h3>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Enquiry"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default EnquiryForm;
