import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./TraineeTicketSettingBottomSheet.module.scss";

export default function TraineeTicketSettingBottomSheet() {
  const settings = ["이용권 추가 등록", "회원권 양도", "환불", "회원 삭제"];

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>설정</p>

        <div className={styles.setting_list}>
          {settings.map((setting) => (
            <div className={styles.setting}>{setting}</div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
