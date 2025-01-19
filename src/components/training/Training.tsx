import styles from "./Training.module.scss";

const Training = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.member_color}
        style={{ backgroundColor: "purple" }}
      />
      <div className={styles.member_info}>
        <div className={styles.member_name}>
          <span>김영재</span> 회원님
        </div>

        <div className={styles.time}>나의 수업에서 등록해주세요</div>
      </div>
    </div>
  );
};

export default Training;
