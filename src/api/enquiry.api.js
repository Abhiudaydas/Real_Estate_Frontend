import axios from "./axios";

export const createEnquiry = async (data) => {
  return axios.post("/enquiries", data);
};

export const getMyEnquiries = async () => {
  return axios.get("/enquiries/my-enquiries");
};

export const deleteEnquiry = async (id) => {
  return axios.delete(`/enquiries/${id}`);
};
