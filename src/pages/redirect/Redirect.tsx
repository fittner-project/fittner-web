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
  console.log("code", code);

  useEffect(() => {
    if (state && code) {
      handleSocialCallback({ socialType: state as SocialType, code });
    }
  }, [state, code]);

  return <SignIn />;
}

export default SocialCallback;
