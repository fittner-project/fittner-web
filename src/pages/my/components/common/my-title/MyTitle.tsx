import { PropsWithChildren } from "react";
import styles from "./MyTitle.module.scss";

export default function MyTitle({ children }: PropsWithChildren) {
  return <div className={styles.title}>{children}</div>;
}
