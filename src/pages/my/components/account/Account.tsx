import Image from "@/components/image/Image";
import styles from "./Account.module.scss";
import { storage } from "@/utils/storage";
import { storageKeys } from "@/constants/storage";
import { apple, google, kakao } from "@/assets/assets";
import MyTitle from "../common/my-title/MyTitle";

export default function Account() {
  const social = storage.get({
    key: storageKeys.trainerSnsKind,
  }) as string;

  const email = storage.get({
    key: storageKeys.trainerEmail,
  }) as string;

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
