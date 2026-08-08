import axios from "axios";

const API = axios.create({
  baseURL: "https://tripnest-fird.onrender.com/api"
});

export default API;