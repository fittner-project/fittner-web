import styles from "./Setting.module.scss";
import MyTitle from "../common/my-title/MyTitle";
import MyLink from "../common/my-link/MyLink";

export default function Setting() {
  return (
    <div className={styles.container}>
      <MyTitle>설정</MyTitle>

      <div className={styles.link_container}>
        <MyLink to="" title="알림설정" />
        <MyLink to="" title="공지사항" />
        <MyLink to="" title="약관" />
      </div>
    </div>
  );
}
