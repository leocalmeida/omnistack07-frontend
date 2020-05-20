import axios from "axios";

const api = axios.create({
  baseURL: "https://omnistack07-backend.herokuapp.com/",
  // baseURL: "http://localhost:3334",
});

export default api;
