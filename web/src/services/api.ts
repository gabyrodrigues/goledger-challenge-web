import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-44-204-53-62.compute-1.amazonaws.com/api/"
});

export default api;
