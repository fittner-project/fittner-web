import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// process.env 사용 (CJS 호환)
const API_BASE_URL =
  process.env.VITE_API_BASE_URL || "http://your-default-url.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// orval이 기대하는 형식의 customInstance 함수
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosInstance({ ...config, cancelToken: source.token }).then(
    ({ data }: AxiosResponse<T>) => data
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
