import styles from "./SignIn.module.scss";
import { logo, google, apple, kakao } from "@/assets/assets";

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
            <Image width={9} height={2.1} src={logo} alt="logo" />
          </section>

          <section className={styles.login_section}>
            <p className={styles.login_text}>
              국내 1위 <br /> 업무관리 & 자동화 핏트너
            </p>
            <div className={styles.login_button_container}>
              <button
                className={classNames(styles.login_button, styles.kakao_button)}
                onClick={() => initSocialLogin({ socialType: "KAKAO" })}
              >
                <Image width={2} height={2} src={kakao} alt="kakao" />
                <p className={styles.login_button_text}>카카오로 시작하기</p>
              </button>
              <button
                className={classNames(
                  styles.login_button,
                  styles.google_button
                )}
                onClick={() => initSocialLogin({ socialType: "GOOGLE" })}
              >
                <Image width={2} height={2} src={google} alt="google" />
                <p className={styles.login_button_text}>Google로 시작하기</p>
              </button>
              <button
                className={classNames(styles.login_button, styles.apple_button)}
                onClick={() => initSocialLogin({ socialType: "APPLE" })}
              >
                <Image width={2} height={2} src={apple} alt="apple" />
                <p className={styles.login_button_text}>Apple로 시작하기</p>
              </button>
            </div>
            <p className={styles.forgot_password_text}>계정을 잊으셨나요?</p>
          </section>
        </div>
      </PaddingContainer>
    </BackgroundContainer>
  );
}

export default SignIn;
