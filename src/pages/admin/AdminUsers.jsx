import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../../api/admin.api";
import Loader from "../../components/ui/Loader";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data.users || response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await updateUserStatus(userId, !currentStatus);
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, isActive: !currentStatus } : u,
        ),
      );
      alert("User status updated");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-users">
      <div className="container">
        <h1>Manage Users</h1>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge role-${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${user.isActive ? "status-active" : "status-inactive"}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleToggleStatus(user._id, user.isActive)
                      }
                      className={`btn btn-small ${user.isActive ? "btn-danger" : "btn-success"}`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
