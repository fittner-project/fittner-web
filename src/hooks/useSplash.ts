import { useGetUserCommonSplash } from "@/api/generated/공통/공통";

export default function useSplash() {
  const { data: splashData } = useGetUserCommonSplash();
  const splashImgUrl = splashData?.result?.splashImgUrl;

  return { splashImgUrl };
}
