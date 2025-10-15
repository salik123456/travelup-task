// src/utils/toast.js
import { toast } from "react-toastify";
export const notifySuccess = (m) => toast.success(m);
export const notifyError = (m) => toast.error(m);
export const notifyInfo = (m) => toast.info(m);
