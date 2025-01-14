import AlertModal from "@/components/modal/system-modal/alert-modal/AlertModal";
import { openModal } from "@/utils/modal";
import axios from "axios";

if (!import.meta.env.VITE_API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 기본 에러 모달을 스킵할 API 목록
const skipErrorHandlingUrls = ["/api/v1/auth/login"];

instance.interceptors.response.use(
  (response) => {
    if (response.data?.status === "FAIL") {
      const alertMessage = response.data.errorMessage || response.data.message;

      const shouldSkipErrorHandling = skipErrorHandlingUrls.some((url) =>
        response.config.url?.includes(url)
      );

      if (!shouldSkipErrorHandling) {
        openModal({
          component: AlertModal,
          props: { errorMessage: alertMessage },
        });
      }

      return Promise.reject(new Error(alertMessage));
    }
    return response;
  },
  (error) => {
    const shouldSkipErrorHandling = skipErrorHandlingUrls.some((url) =>
      error.config.url?.includes(url)
    );

    if (!shouldSkipErrorHandling) {
      const alertMessage = error.response?.data
        ? error.response.data.errorMessage ||
          error.response.data.message ||
          "오류가 발생했습니다."
        : error.message || "오류가 발생했습니다.";

      openModal({
        component: AlertModal,
        props: { errorMessage: alertMessage },
      });
    }

    return Promise.reject(error);
  }
);

export const customInstance = instance;
