import api from "./axios";

export const submitEnquiry = (payload) => api.post("/enquiries", payload);
