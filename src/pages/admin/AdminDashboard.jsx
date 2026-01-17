import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../../api/admin.api";
import Loader from "../../components/ui/Loader";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    approvedProperties: 0,
    pendingProperties: 0,
    rejectedProperties: 0,
    totalUsers: 0,
    totalEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getAdminStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">
          <Link to="/admin/properties?filter=all" className="stat-card">
            <div className="stat-value">{stats.totalProperties}</div>
            <div className="stat-label">Total Properties</div>
          </Link>

          <Link
            to="/admin/properties?filter=pending"
            className="stat-card stat-warning"
          >
            <div className="stat-value">{stats.pendingProperties}</div>
            <div className="stat-label">Pending Approval</div>
          </Link>

          <Link
            to="/admin/properties?filter=approved"
            className="stat-card stat-success"
          >
            <div className="stat-value">{stats.approvedProperties}</div>
            <div className="stat-label">Approved</div>
          </Link>

          <Link
            to="/admin/properties?filter=rejected"
            className="stat-card stat-danger"
          >
            <div className="stat-value">{stats.rejectedProperties}</div>
            <div className="stat-label">Rejected</div>
          </Link>

          <Link to="/admin/users" className="stat-card">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </Link>

          <Link to="/admin/enquiries" className="stat-card">
            <div className="stat-value">{stats.totalEnquiries}</div>
            <div className="stat-label">Total Enquiries</div>
          </Link>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/properties" className="action-card">
              <h3>Manage Properties</h3>
              <p>Review and approve property listings</p>
            </Link>
            <Link to="/admin/users" className="action-card">
              <h3>Manage Users</h3>
              <p>View and manage user accounts</p>
            </Link>
            <Link to="/admin/enquiries" className="action-card">
              <h3>View Enquiries</h3>
              <p>Check customer enquiries</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
