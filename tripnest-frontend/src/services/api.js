import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://tripnest-fird.onrender.com/api",
  timeout: 15000
});

export default API;