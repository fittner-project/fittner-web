import { openBottomSheet } from "@/utils/bottomSheet";
import styles from "./AccountActions.module.scss";
import SignOutBottomSheet from "./sign-out-bottom-sheet/SignOutBottomSheet";
import SecessionBottomSheet from "./secession-bottom-sheet/SecessionBottomSheet";

export default function AccountActions() {
  const handleLogout = () => {
    openBottomSheet({
      component: SignOutBottomSheet,
    });
  };

  const handleSecession = () => {
    openBottomSheet({
      component: SecessionBottomSheet,
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={handleLogout} className={styles.action_button}>
        로그아웃
      </button>
      <button onClick={handleSecession} className={styles.action_button}>
        탈퇴
      </button>
    </div>
  );
}
