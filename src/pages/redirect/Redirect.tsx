import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SocialType } from "@/auth/socialType";
import { useSocialAuth } from "../sign-in/hooks/useSocialAuth";
import SignIn from "../sign-in/SignIn";

function SocialCallback() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const { handleSocialCallback } = useSocialAuth();

  useEffect(() => {
    if (state && code) {
      console.log("소셜 콜백 요청");
      handleSocialCallback({ socialType: state as SocialType, code });
    }
  }, [state, code]);

  console.log("리렌더링");

  return <SignIn />;
}

export default SocialCallback;
