import MyLink from "../common/my-link/MyLink";
import MyTitle from "../../../components/my-title/MyTitle";
import styles from "./MyInfo.module.scss";
import PATH from "@/router/path";

export default function MyInfo() {
  return (
    <div className={styles.container}>
      <MyTitle>정보 관리</MyTitle>

      <div className={styles.link_container}>
        <MyLink to="" title="회원 목록" />
        <MyLink to={PATH.CENTER_LIST} title="센터 목록" />
        <MyLink to="" title="이용권 목록" />
      </div>
    </div>
  );
}
