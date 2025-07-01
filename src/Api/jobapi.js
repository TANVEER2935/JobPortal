import axios from "axios";

const API = axios.create({
  baseURL: "https://686389e088359a373e953dc8.mockapi.io/", 
});

export const getjob = () => API.get("/job");
export const createjob = (data) => API.post("/job", data);
export const deletejob = (id) => API.delete(`/job/${id}`);
