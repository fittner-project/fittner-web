import { PropsWithChildren } from "react";
import styles from "./PaddingContainer.module.scss";

function PaddingContainer({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

export default PaddingContainer;
