import { CenterListResDto } from "@/api/generated/models";
import styles from "./Center.module.scss";

interface CenterProps {
  center: CenterListResDto;
  handleCenterClick?: () => void;
}

export default function Center({ center, handleCenterClick }: CenterProps) {
  return (
    <div onClick={handleCenterClick} className={styles.container}>
      <div
        className={styles.center_image}
        style={{
          backgroundImage: `url(${center.centerImage?.[0]?.fileUrl || "/default-image.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className={styles.center_info}>
        <div className={styles.center_name}>{center.centerName}</div>
        <div className={styles.center_address}>{center.centerAddress}</div>
      </div>
    </div>
  );
}
