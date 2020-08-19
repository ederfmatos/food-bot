import axios from "axios";

const api = axios.create({
  baseURL: "http://167.71.255.6:8080",
});

export default api;
