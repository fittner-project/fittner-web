import AlertModal from "@/components/modal/system-modal/alert-modal/AlertModal";

import useAuthStore from "@/store/auth";
import { openModal } from "@/utils/modal";
import axios, { AxiosError } from "axios";

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
// 토큰을 전송하면 안되는 API 목록
const skipTokenUrls = [
  "/api/v1/auth/login",
  "/api/v1/auth/refresh-token",
  "/api/v1/user/common/splash",
  "/api/v1/user/common/status-chk",
];

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 후 대기중인 요청들을 처리하는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 요청을 구독하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

interface ErrorResponse {
  errorMessage?: string;
  message?: string;
}

instance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken && config.url && !skipTokenUrls.includes(config.url)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

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
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 401 에러이고 토큰 갱신 요청이 아닐 경우
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes("/api/v1/auth/refresh-token")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        const { accessToken, refreshToken } = useAuthStore.getState();

        try {
          // 토큰 갱신 요청
          const response = await instance.post("/api/v1/auth/refresh-token", {
            accessToken,
            refreshTokenId: refreshToken,
          });

          const {
            accessToken: newAccessToken,
            refreshTokenId: newRefreshToken,
          } = response.data.result;

          // 새 토큰 저장
          const { setAccessToken, setRefreshToken } = useAuthStore.getState();
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          // 원래 요청의 헤더 업데이트
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // 대기중인 요청들 처리
          onRefreshed(newAccessToken);
          isRefreshing = false;

          // 원래 요청 재시도
          return instance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패시 로그아웃 처리 로직 필요

          return Promise.reject(refreshError);
        }
      }

      // 토큰 갱신 중일 경우 대기
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          resolve(instance(originalRequest));
        });
      });
    }

    // 기타 에러 처리
    const shouldSkipErrorHandling = skipErrorHandlingUrls.some((url) =>
      error.config?.url?.includes(url)
    );

    if (!shouldSkipErrorHandling) {
      const alertMessage = (error.response?.data as ErrorResponse)
        ? (error.response?.data as ErrorResponse).errorMessage ||
          (error.response?.data as ErrorResponse).message ||
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
