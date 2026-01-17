import React, { useEffect, useState } from "react";
import { getAllEnquiries } from "../../api/admin.api";
import Loader from "../../components/ui/Loader";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await getAllEnquiries();
      setEnquiries(response.data.enquiries || response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-enquiries">
      <div className="container">
        <h1>Customer Enquiries</h1>

        {enquiries.length === 0 ? (
          <p>No enquiries found</p>
        ) : (
          <div className="enquiries-list">
            {enquiries.map((enquiry) => (
              <div key={enquiry._id} className="enquiry-card">
                <div className="enquiry-header">
                  <h3>{enquiry.name}</h3>
                  <span className="enquiry-date">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="enquiry-details">
                  <p>
                    <strong>Email:</strong> {enquiry.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {enquiry.phone}
                  </p>
                  <p>
                    <strong>Property:</strong> {enquiry.property?.title}
                  </p>
                  <p>
                    <strong>Message:</strong> {enquiry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
