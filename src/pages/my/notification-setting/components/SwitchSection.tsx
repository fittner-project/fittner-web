import Switch from "@/components/switch/Switch";
import styles from "./SwitchSection.module.scss";

interface SwitchSectionProps {
  notification: {
    title: string;
    isSwitchOn: boolean;
  };
}

export default function SwitchSection({ notification }: SwitchSectionProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{notification.title}</p>
      <Switch isSwitchOn={notification.isSwitchOn} onChange={() => {}} />
    </div>
  );
}
