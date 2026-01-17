import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div className="profile-info">
            <div className="info-item">
              <label>Name</label>
              <p>{user?.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Role</label>
              <p>{user?.role}</p>
            </div>
            <div className="info-item">
              <label>Account Status</label>
              <p>{user?.isActive ? "Active" : "Inactive"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
