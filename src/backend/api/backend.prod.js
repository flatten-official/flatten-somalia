import axios from "axios";

export default axios.create({
  baseURL: "https://api.flatten.org/",
  withCredentials: true,
});
