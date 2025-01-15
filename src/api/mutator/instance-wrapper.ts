import { customInstance } from "./custom-instance";
import type { AxiosRequestConfig } from "axios";

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return customInstance(config).then((response) => response.data);
};
