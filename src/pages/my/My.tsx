import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import Account from "./components/account/Account";
import Revenue from "./components/revenue/Revenue";
import styles from "./My.module.scss";

export default function My() {
  return (
    <BackgroundContainer>
      <div className={styles.container}>
        <Revenue />
        <div className={styles.user_section}>
          <Account />
        </div>
      </div>
    </BackgroundContainer>
  );
}
