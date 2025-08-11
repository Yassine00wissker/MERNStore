import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend URL is different
});

export default Api;