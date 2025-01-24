import { useGetUserCommonSplash } from "@/api/generated/공통/공통";
import useAuthStore from "@/store/auth";

export default function useSplash() {
  const { accessToken } = useAuthStore();
  const { data: splashData } = useGetUserCommonSplash({
    ...(accessToken && { accessToken }),
  });
  const splashImgUrl = splashData?.result?.splashImgUrl;

  return { splashImgUrl };
}
