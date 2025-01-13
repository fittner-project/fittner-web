import { PropsWithChildren } from "react";
import styles from "./index.module.scss";

function index({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

export default index;
