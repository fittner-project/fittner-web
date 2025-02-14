import styles from "./TraineeRevenueList.module.scss";

export default function TraineeRevenueList() {
  return (
    <div className={styles.container}>
      <p className={styles.date}>2024.11</p>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className={styles.trainee_revenue_item} key={index}>
          <div className={styles.left}>
            <section className={styles.left_top}>
              <p className={styles.trainee_name}>홍길동</p>
              <p className={styles.round}>3회차</p>
            </section>
            <section className={styles.left_bottom}>
              <p>2024.10.01</p>
              <div />
              <p>14:00-14:50</p>
            </section>
          </div>

          <p className={styles.revenue}>+{`${"35000".toLocaleString()}원`}</p>
        </div>
      ))}
    </div>
  );
}
