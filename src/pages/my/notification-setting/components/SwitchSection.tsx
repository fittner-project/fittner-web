import Switch from "@/components/switch/Switch";
import styles from "./SwitchSection.module.scss";
import { PushResDto } from "@/api/generated/models";

interface SwitchSectionProps {
  notification: PushResDto;
}

export default function SwitchSection({ notification }: SwitchSectionProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{notification.pushTitle}</p>
      <Switch
        isSwitchOn={notification.pushReadYn === "Y"}
        onChange={() => {}}
      />
    </div>
  );
}
