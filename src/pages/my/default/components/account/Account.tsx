import Image from "@/components/image/Image";
import styles from "./Account.module.scss";
import { apple, google, kakao } from "@/assets/assets";
import MyTitle from "../../../components/my-title/MyTitle";

export default function Account() {
  const email = useUserStore((state) => state.userInfo.trainerEmail);
  const social = useUserStore((state) => state.userInfo.trainerSnsKind);

  const getSocialIcon = (social: string) => {
    switch (social) {
      case "KAKAO":
        return {
          icon: kakao,
          alt: "kakao",
        };
      case "GOOGLE":
        return {
          icon: google,
          alt: "google",
        };
      case "APPLE":
        return {
          icon: apple,
          alt: "apple",
        };
    }
  };

  return (
    <div className={styles.container}>
      <MyTitle>계정관리</MyTitle>
      <div className={styles.email_container}>
        <p className={styles.email_title}>이메일</p>
        <div className={styles.email_section}>
          {social && getSocialIcon(social) && (
            <Image
              width={1.5}
              height={1.5}
              src={getSocialIcon(social)?.icon ?? ""}
              alt={getSocialIcon(social)?.alt ?? ""}
            />
          )}
          <p className={styles.email}>{email}</p>
        </div>
      </div>
    </div>
  );
}
