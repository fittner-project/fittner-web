import axios from "axios";

if (!import.meta.env.VITE_API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const customInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.status === "FAIL") {
      const alertMessage = response.data.errorMessage || response.data.message;

      return Promise.reject(new Error(alertMessage));
    }
    return response;
  },
  (error) => {
    if (error.response?.data) {
      const alertMessage =
        error.response.data.errorMessage ||
        error.response.data.message ||
        "오류가 발생했습니다.";
      alert(alertMessage);
    } else {
      alert(error.message || "오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);
