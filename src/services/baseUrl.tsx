import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "https://events.campusroot.com",

});
export default api;