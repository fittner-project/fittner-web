import Image from "@/components/image/Image";
import styles from "./SubMyHeader.module.scss";
import { bell } from "@/assets/assets";

export default function SubMyHeader() {
  const trainerName = useUserStore((state) => state.userInfo.trainerName);

  return (
    <div className={styles.container}>
      <p className={styles.trainer_name}>{String(trainerName)} 트레이너</p>
      <button className={styles.bell_button}>
        <Image width={2.4} height={2.4} src={bell} alt="알림" />
      </button>
    </div>
  );
}
