// Axios instance for backend
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5550", // backend port
});

export default api;