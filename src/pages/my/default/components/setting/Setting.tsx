import styles from "./Setting.module.scss";
import MyTitle from "../../../components/my-title/MyTitle";
import MyLink from "../common/my-link/MyLink";
import PATH from "@/router/path";

export default function Setting() {
  return (
    <div className={styles.container}>
      <MyTitle>설정</MyTitle>

      <div className={styles.link_container}>
        <MyLink to={""} title="알림설정" />
        <MyLink to={PATH.MY.POLICY.NOTICE} title="공지사항" />
        <MyLink to={PATH.MY.POLICY.TERMS} title="약관" />
      </div>
    </div>
  );
}
