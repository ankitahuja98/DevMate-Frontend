import axios from "axios";

const callApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // use only if you store JWT in cookies
});

export default callApi;
