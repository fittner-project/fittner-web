import { CenterListResDto } from "@/api/generated/models";
import styles from "./Center.module.scss";

interface CenterProps {
  center: CenterListResDto;
}

export default function Center({ center }: CenterProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.center_image}
        style={{ backgroundImage: `url(${center.centerImage})` }}
      />
      <div className={styles.center_info}>
        <div className={styles.center_name}>{center.centerName}</div>
        <div className={styles.center_address}>{center.centerAddress}</div>
      </div>
    </div>
  );
}
