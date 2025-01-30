import { storage } from "@/utils/storage";
import styles from "./Training.module.scss";
import { storageKeys } from "@/constants/storageKeys";

const Training = () => {
  const trainerName = storage.get<string>({ key: storageKeys.trainerName });

  return (
    <div className={styles.container}>
      <div
        className={styles.member_color}
        style={{ backgroundColor: "purple" }}
      />
      <div className={styles.member_info}>
        <div className={styles.member_name}>
          <span>{trainerName}</span> 회원님
        </div>

        <div className={styles.time}>나의 수업에서 등록해주세요</div>
      </div>
    </div>
  );
};

export default Training;
