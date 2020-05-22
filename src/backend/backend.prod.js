import axios from "axios";

export default axios.create({
  baseURL: "https://api.flatten.so/",
  withCredentials: true,
});