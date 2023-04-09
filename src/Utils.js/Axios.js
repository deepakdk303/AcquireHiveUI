import axios from "axios";
import { mainStoreSlice, store } from "../Store/Store";

const axiosInstance = axios.create({
  baseURL: "http://ec2-13-53-137-36.eu-north-1.compute.amazonaws.com:8081/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    // config.header["access-control-allow-origin"] = "*";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("store.dispatch(mainStoreSlice.actions.closeLoader());");
    store.dispatch(mainStoreSlice.actions.closeLoader());
    Promise.reject(error);
  }
);

export default axiosInstance;
