import { PropsWithChildren } from "react";
import styles from "./TicketDetailTitle.module.scss";

export default function TicketDetailTitle({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{children}</p>
    </div>
  );
}
