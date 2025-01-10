import axios from "axios";

if (process.env.VITE_API_BASE_URL != null ) {
  console.log("apiUrl" + process.env.VITE_API_BASE_URL);
}

export const customInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
