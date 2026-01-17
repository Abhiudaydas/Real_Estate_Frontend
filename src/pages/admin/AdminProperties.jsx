import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPropertiesAdmin,
  approveProperty,
  rejectProperty,
  deletePropertyAdmin,
} from "../../api/admin.api";

const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Rejection modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, statusFilter, searchTerm]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getAllPropertiesAdmin();
      setProperties(response.data.properties || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((prop) => {
        if (statusFilter === "PENDING") {
          return prop.isApproved === null || prop.isApproved === undefined;
        }
        if (statusFilter === "APPROVED") {
          return prop.isApproved === true;
        }
        if (statusFilter === "REJECTED") {
          return prop.isApproved === false;
        }
        return true;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (prop) =>
          prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProperties(filtered);
  };

  const handleApprove = async (propertyId) => {
    // Optimistic update
    setProperties((prev) =>
      prev.map((p) => (p._id === propertyId ? { ...p, isApproved: true } : p)),
    );

    try {
      await approveProperty(propertyId);
      alert("Property approved successfully!");
    } catch (err) {
      console.error("Approve error:", err);
      alert(err.response?.data?.message || "Failed to approve");
      // Revert on error
      fetchProperties();
    }
  };

  const openRejectModal = (property) => {
    setSelectedProperty(property);
    setShowRejectModal(true);
    setRejectionReason("");
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    const propertyId = selectedProperty._id;

    // Optimistic update
    setProperties((prev) =>
      prev.map((p) =>
        p._id === propertyId ? { ...p, isApproved: false, rejectionReason } : p,
      ),
    );

    setShowRejectModal(false);

    try {
      await rejectProperty(propertyId, { reason: rejectionReason });
      alert("Property rejected successfully!");
    } catch (err) {
      console.error("Reject error:", err);
      alert(err.response?.data?.message || "Failed to reject");
      // Revert on error
      fetchProperties();
    }
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    // Optimistic update
    setProperties((prev) => prev.filter((p) => p._id !== propertyId));

    try {
      await deletePropertyAdmin(propertyId);
      alert("Property deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete");
      // Revert on error
      fetchProperties();
    }
  };

  const getStatusDisplay = (property) => {
    if (property.isApproved === true) return "APPROVED";
    if (property.isApproved === false) return "REJECTED";
    return "PENDING";
  };

  const getStatusClass = (property) => {
    if (property.isApproved === true) return "status-approved";
    if (property.isApproved === false) return "status-rejected";
    return "status-pending";
  };

  const getStatusCounts = () => {
    return {
      all: properties.length,
      pending: properties.filter(
        (p) => p.isApproved === null || p.isApproved === undefined,
      ).length,
      approved: properties.filter((p) => p.isApproved === true).length,
      rejected: properties.filter((p) => p.isApproved === false).length,
    };
  };

  const counts = getStatusCounts();

  if (loading) return <div className="loading">Loading properties...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-properties">
      <div className="container">
        <div className="header">
          <h1>Manage Properties</h1>
          <div className="stats">
            <span>Total: {counts.all}</span>
            <span>Pending: {counts.pending}</span>
            <span>Approved: {counts.approved}</span>
            <span>Rejected: {counts.rejected}</span>
          </div>
        </div>

        <div className="filters">
          <div className="filter-tabs">
            <button
              className={statusFilter === "ALL" ? "active" : ""}
              onClick={() => setStatusFilter("ALL")}
            >
              All ({counts.all})
            </button>
            <button
              className={statusFilter === "PENDING" ? "active" : ""}
              onClick={() => setStatusFilter("PENDING")}
            >
              Pending ({counts.pending})
            </button>
            <button
              className={statusFilter === "APPROVED" ? "active" : ""}
              onClick={() => setStatusFilter("APPROVED")}
            >
              Approved ({counts.approved})
            </button>
            <button
              className={statusFilter === "REJECTED" ? "active" : ""}
              onClick={() => setStatusFilter("REJECTED")}
            >
              Rejected ({counts.rejected})
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <p className="no-data">No properties found.</p>
        ) : (
          <div className="table-container">
            <table className="properties-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Owner</th>
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
                    <td>{property.owner?.name || "Unknown"}</td>
                    <td>₹{property.price?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(property)}`}
                      >
                        {getStatusDisplay(property)}
                      </span>
                      {property.rejectionReason && (
                        <div className="rejection-reason">
                          Reason: {property.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="actions-cell">
                      {(property.isApproved === null ||
                        property.isApproved === undefined) && (
                        <>
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="btn btn-approve"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(property)}
                            className="btn btn-reject"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {property.isApproved === true && (
                        <button
                          onClick={() => openRejectModal(property)}
                          className="btn btn-reject"
                        >
                          Reject
                        </button>
                      )}

                      {property.isApproved === false && (
                        <button
                          onClick={() => handleApprove(property._id)}
                          className="btn btn-approve"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/properties/${property._id}`)}
                        className="btn btn-view"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-delete"
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

        {/* Rejection Modal */}
        {showRejectModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowRejectModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Reject Property</h2>
              <p>
                <strong>{selectedProperty?.title}</strong>
              </p>
              <textarea
                placeholder="Please provide a reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
              <div className="modal-actions">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
                <button onClick={handleRejectSubmit} className="btn btn-reject">
                  Reject Property
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
