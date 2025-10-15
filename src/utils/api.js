import axios from "axios";
import { notifyError } from "./toast";

export const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || "API error";
    notifyError(msg);
    return Promise.reject(err);
  }
);
