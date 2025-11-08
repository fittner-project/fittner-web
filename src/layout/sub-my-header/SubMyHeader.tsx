import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";
import styles from "./SubMyHeader.module.scss";
import { bell } from "@/assets/assets";
import PATH from "@/router/path";

export default function SubMyHeader() {
  const trainerName = useUserStore((state) => state.userInfo.trainerName);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.trainer_name}>{String(trainerName)} 트레이너</p>
      <button
        className={styles.bell_button}
        onClick={() => navigate(PATH.NOTIFICATION_HISTORY)}
      >
        <Image width={2.4} height={2.4} src={bell} alt="알림" />
      </button>
    </div>
  );
}
