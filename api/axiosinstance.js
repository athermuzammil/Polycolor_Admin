import axios from "axios";
import { BACKEND_URL } from "./variables";
const instance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
