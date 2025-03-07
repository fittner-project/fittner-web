import Switch from "@/components/switch/Switch";
import styles from "./SwitchSection.module.scss";
import { PushSetResDto } from "@/api/generated/models";

interface SwitchSectionProps {
  notification: PushSetResDto;
}

export default function SwitchSection({ notification }: SwitchSectionProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{notification.pushKind}</p>
      <Switch isSwitchOn={notification.pushSetYn === "Y"} onChange={() => {}} />
    </div>
  );
}
