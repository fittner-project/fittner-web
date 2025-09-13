import { CenterListResDto } from "@/api/generated/models";
import styles from "./CenterCard.module.scss";
import Image from "@/components/image/Image";
import { chevronRightGrey, defaultCenter } from "@/assets/assets";

interface CenterProps {
  center: CenterListResDto;
  handleCenterClick?: () => void;
}

export default function CenterCard({ center, handleCenterClick }: CenterProps) {
  return (
    <div onClick={handleCenterClick} className={styles.container}>
      <Image
        src={center.centerImage?.[0]?.fileUrl || defaultCenter}
        alt={center.centerName}
        className={styles.center_image}
      />
      <div className={styles.center_info}>
        <div className={styles.center_info_left}>
          <div className={styles.center_name}>{center.centerName}</div>
          <div className={styles.center_address}>{center.centerAddress}</div>
        </div>
        <Image
          src={chevronRightGrey}
          width={2.8}
          height={2.8}
          style={{ marginRight: "-1.2rem" }}
        />
      </div>
    </div>
  );
}
