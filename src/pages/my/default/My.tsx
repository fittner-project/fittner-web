import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import Account from "./components/account/Account";
import Revenue from "../components/revenue/Revenue";
import styles from "./My.module.scss";
import MyInfo from "./components/my-info/MyInfo";
import Setting from "./components/setting/Setting";
import AccountActions from "./components/account-actions/AccountActions";

export default function My() {
  return (
    <BackgroundContainer>
      <div className={styles.container}>
        <div className={styles.dumbbell_container}>
          <Revenue type="main" />
        </div>

        <div className={styles.calendar_container}>
          <div className={styles.user_section}>
            <Account />
            <MyInfo />
            <Setting />
            <AccountActions />
          </div>
        </div>
      </div>
    </BackgroundContainer>
  );
}
