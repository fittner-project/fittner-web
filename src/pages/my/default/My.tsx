import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";
import Account from "./components/account/Account";
import Revenue from "../components/revenue/Revenue";
import styles from "./My.module.scss";
import MyInfo from "./components/my-info/MyInfo";
import Setting from "./components/setting/Setting";
import AccountActions from "./components/account-actions/AccountActions";
import { MotionDiv } from "@/components/animation/Motion";

export default function My() {
  return (
    <BackgroundContainer>
      <div className={styles.container}>
        <MotionDiv
          className={styles.dumbbell_container}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Revenue type="main" />
        </MotionDiv>

        <MotionDiv
          className={styles.calendar_container}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className={styles.user_section}>
            <Account />
            <MyInfo />
            <Setting />
            <AccountActions />
          </div>
        </MotionDiv>
      </div>
    </BackgroundContainer>
  );
}
