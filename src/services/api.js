import axios from "axios";

const valida = localStorage.getItem("valida");

const api = axios.create({
  baseURL: "http://localhost:3334",
  // baseURL: "https://omnistack07-backend.herokuapp.com/",
  headers: {
    authorization: valida,
  },
});

export default api;
