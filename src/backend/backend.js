import axios from "axios";

export default axios.create({
  baseURL: "https://backend-so-staging-dot-flatten-staging-271921.appspot.com",
  withCredentials: true,
});
