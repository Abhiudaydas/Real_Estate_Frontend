import axios from "./axios";

// Get all properties (public)
export const getAllProperties = async (params) => {
  return axios.get("/properties", { params });
};

// Get single property
export const getPropertyById = async (id) => {
  return axios.get(`/properties/${id}`);
};

// Get user's properties
export const getMyProperties = async () => {
  return axios.get("/properties/my-properties");
};

// Create property
export const createProperty = async (data) => {
  return axios.post("/properties", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update property
export const updateProperty = async (id, data) => {
  return axios.patch(`/properties/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete property
export const deleteProperty = async (id) => {
  return axios.delete(`/properties/${id}`);
};

// Toggle favorite
export const toggleFavorite = async (id) => {
  return axios.post(`/properties/${id}/favorite`);
};

// Get favorites
export const getFavorites = async () => {
  return axios.get("/properties/favorites");
};
