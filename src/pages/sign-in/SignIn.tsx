import styles from "./SignIn.module.scss";
import logo from "@/assets/logo/logo.svg";

import google from "@/assets/social/google.png";
import apple from "@/assets/social/apple.png";
import kakao from "@/assets/social/kakao.png";
import classNames from "classnames";
import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import { useSocialAuth } from "./hooks/useSocialAuth";
import Image from "@/components/image/Image";

function SignIn() {
  const { initSocialLogin } = useSocialAuth();

  return (
    <BackgroundContainer>
      <PaddingContainer>
        <div className={styles.container}>
          <section className={styles.logo_section}>
            <Image width={17.9} height={4.1} src={logo} alt="logo" />

            <p className={styles.logo_text}>쉬운 트레이너 업무관리, 핏트너</p>
          </section>

          <section className={styles.login_section}>
            <button
              className={classNames(styles.login_button, styles.kakao_button)}
              onClick={() => initSocialLogin({ socialType: "kakao" })}
            >
              <Image width={2.4} height={2.4} src={kakao} alt="kakao" />
              <p className={styles.login_button_text}>카카오로 시작하기</p>
            </button>
            <button
              className={classNames(styles.login_button, styles.google_button)}
            >
              <Image width={2.4} height={2.4} src={google} alt="google" />
              <p className={styles.login_button_text}>구글로 시작하기</p>
            </button>
            <button
              className={classNames(styles.login_button, styles.apple_button)}
            >
              <Image width={2.4} height={2.4} src={apple} alt="apple" />
              <p className={styles.login_button_text}>애플로 시작하기</p>
            </button>
          </section>
        </div>
      </PaddingContainer>
    </BackgroundContainer>
  );
}

export default SignIn;
