import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProperties, deleteProperty } from "../../api/property.api";
import Loader from "../../components/ui/Loader";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getMyProperties();
      setProperties(response.data.properties || response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await deleteProperty(id);
      setProperties(properties.filter((p) => p._id !== id));
      alert("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  };

  const getFilteredProperties = () => {
    if (filter === "ALL") return properties;
    if (filter === "APPROVED")
      return properties.filter((p) => p.isApproved === true);
    if (filter === "PENDING")
      return properties.filter(
        (p) => p.isApproved === null || p.isApproved === undefined,
      );
    if (filter === "REJECTED")
      return properties.filter((p) => p.isApproved === false);
    return properties;
  };

  const filteredProperties = getFilteredProperties();

  if (loading) return <Loader />;

  return (
    <div className="my-properties-page">
      <div className="container">
        <div className="page-header">
          <h1>My Properties</h1>
          <Link to="/user/add-property" className="btn btn-primary">
            Add New Property
          </Link>
        </div>

        <div className="filter-tabs">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            All ({properties.length})
          </button>
          <button
            className={filter === "APPROVED" ? "active" : ""}
            onClick={() => setFilter("APPROVED")}
          >
            Approved ({properties.filter((p) => p.isApproved === true).length})
          </button>
          <button
            className={filter === "PENDING" ? "active" : ""}
            onClick={() => setFilter("PENDING")}
          >
            Pending (
            {
              properties.filter(
                (p) => p.isApproved === null || p.isApproved === undefined,
              ).length
            }
            )
          </button>
          <button
            className={filter === "REJECTED" ? "active" : ""}
            onClick={() => setFilter("REJECTED")}
          >
            Rejected ({properties.filter((p) => p.isApproved === false).length})
          </button>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="empty-state">
            <p>No properties found</p>
            <Link to="/user/add-property" className="btn btn-primary">
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="properties-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property._id}>
                    <td>
                      <div className="property-title">
                        <strong>{property.title}</strong>
                        <small>
                          {property.description?.substring(0, 50)}...
                        </small>
                      </div>
                    </td>
                    <td>₹{property.price?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`status-badge status-${property.isApproved === true ? "approved" : property.isApproved === false ? "rejected" : "pending"}`}
                      >
                        {property.isApproved === true
                          ? "Approved"
                          : property.isApproved === false
                            ? "Rejected"
                            : "Pending"}
                      </span>
                      {property.rejectionReason && (
                        <div className="rejection-reason">
                          Reason: {property.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/properties/${property._id}`}
                        className="btn btn-small btn-secondary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
