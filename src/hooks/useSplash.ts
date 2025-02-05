import { useGetUserCommonSplash } from "@/api/generated/공통/공통";

export default function useSplash() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data: splashData } = useGetUserCommonSplash({
    ...(accessToken && { accessToken }),
  });
  const splashImgUrl = splashData?.result?.splashImgUrl;

  return { splashImgUrl };
}
