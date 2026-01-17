import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProperties } from "../../api/property.api";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/ui/Loader";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getMyProperties();
      const props = response.data.properties || response.data;
      setProperties(props);

      // Calculate stats
      setStats({
        total: props.length,
        approved: props.filter((p) => p.isApproved === true).length,
        pending: props.filter(
          (p) => p.isApproved === null || p.isApproved === undefined,
        ).length,
        rejected: props.filter((p) => p.isApproved === false).length,
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <Link to="/user/add-property" className="btn btn-primary">
            Add New Property
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Properties</div>
          </div>
          <div className="stat-card stat-success">
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card stat-warning">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card stat-danger">
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="recent-properties">
            <h2>Recent Properties</h2>
            {properties.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any properties yet.</p>
                <Link to="/user/add-property" className="btn btn-primary">
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="properties-list">
                {properties.slice(0, 5).map((property) => (
                  <div key={property._id} className="property-item">
                    <div className="property-info">
                      <h3>{property.title}</h3>
                      <p>₹{property.price?.toLocaleString()}</p>
                    </div>
                    <span
                      className={`status-badge status-${property.isApproved === true ? "approved" : property.isApproved === false ? "rejected" : "pending"}`}
                    >
                      {property.isApproved === true
                        ? "Approved"
                        : property.isApproved === false
                          ? "Rejected"
                          : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {properties.length > 5 && (
              <Link to="/user/my-properties" className="btn btn-secondary">
                View All Properties
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
