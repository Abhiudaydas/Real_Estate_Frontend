import api from "./axios";

export const getProperties = (params = {}) =>
  api.get("/properties", { params });

export const getPropertyById = (id) => api.get(`/properties/${id}`);
