import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AssignTicketSettingBottomSheet.module.scss";
import PATH from "@/router/path";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface AssignTicketSettingBottomSheetProps {
  memberId: string;
  ticketId: string;
}

export default function AssignTicketSettingBottomSheet({
  memberId,
  ticketId,
}: AssignTicketSettingBottomSheetProps) {
  type Setting = "기존 회원" | "신규 회원";
  const settings: Setting[] = ["기존 회원", "신규 회원"];
  const navigate = useNavigate();

  const handleClickSetting = (setting: Setting) => {
    if (setting === "기존 회원") {
      closeBottomSheet();
      navigate({
        pathname: PATH.MY.TRAINEE_OR_TRAINER,
        search: `?type=trainee&select-type=select-member-assign-old&member-id=${memberId}&ticket-id=${ticketId}`,
      });
    }

    if (setting === "신규 회원") {
      navigate({
        pathname: PATH.ASSIGN_NEW_TRAINEE,
      });
    }
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>양도 받을 회원 선택</p>

        <div className={styles.setting_list}>
          {settings.map((setting) => (
            <div
              className={styles.setting}
              onClick={() => handleClickSetting(setting)}
            >
              {setting}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
