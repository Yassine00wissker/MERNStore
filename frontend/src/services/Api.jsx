import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// attach token automatically if exists
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;