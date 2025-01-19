import styles from "./AccountActions.module.scss";

export default function AccountActions() {
  return (
    <div className={styles.container}>
      <button className={styles.action_button}>로그아웃</button>
      <button className={styles.action_button}>탈퇴</button>
    </div>
  );
}
