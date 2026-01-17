import axios from "./axios";

// Properties
export const getAllPropertiesAdmin = async (params) => {
  return axios.get("/admin/properties", { params });
};

export const approveProperty = async (propertyId) => {
  return axios.patch(`/admin/properties/${propertyId}/approve`);
};

export const rejectProperty = async (propertyId, data) => {
  return axios.patch(`/admin/properties/${propertyId}/reject`, data);
};

export const deletePropertyAdmin = async (propertyId) => {
  return axios.delete(`/admin/properties/${propertyId}`);
};

export const toggleFeaturedProperty = async (propertyId) => {
  return axios.patch(`/admin/properties/${propertyId}/feature`);
};

// Users
export const getAllUsers = async () => {
  return axios.get("/admin/users");
};

export const updateUserStatus = async (userId, isActive) => {
  return axios.patch(`/admin/users/${userId}`, { isActive });
};

export const deleteUser = async (userId) => {
  return axios.delete(`/admin/users/${userId}`);
};

// Stats
export const getAdminStats = async () => {
  return axios.get("/admin/stats");
};

// Enquiries
export const getAllEnquiries = async () => {
  return axios.get("/admin/enquiries");
};

export const updateEnquiryStatus = async (enquiryId, status) => {
  return axios.patch(`/admin/enquiries/${enquiryId}`, { status });
};
