import styles from "./Center.module.scss";

interface CenterProps {
  isConnected: boolean;
}

export default function Center({ isConnected }: CenterProps) {
  return (
    <div className={styles.container}>
      <section className={styles.center_info}>
        <p className={styles.center_name}>고길동피트니스 방배점</p>
        <p className={styles.center_address}>서울시 관악구 신림동 111-22</p>
      </section>
      <button className={styles.action_button}>
        {isConnected ? "연동해제" : "승인취소"}
      </button>
    </div>
  );
}
