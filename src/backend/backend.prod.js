import axios from "axios";

export default axios.create({
  baseURL: "https://backend-so-dot-flatten-271620.appspot.com/",
  withCredentials: true,
});