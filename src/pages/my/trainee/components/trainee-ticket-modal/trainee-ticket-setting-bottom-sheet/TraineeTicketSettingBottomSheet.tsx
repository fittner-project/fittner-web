import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./TraineeTicketSettingBottomSheet.module.scss";
import PATH from "@/router/path";
import DeleteTraineeModal from "./delete-trainee-modal/DeleteTraineeModal";
import { openModal } from "@/utils/modal";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface TraineeTicketSettingBottomSheetProps {
  memberId: string;
  memberName: string;
}

export default function TraineeTicketSettingBottomSheet({
  memberId,
  memberName,
}: TraineeTicketSettingBottomSheetProps) {
  type Setting = "이용권 추가 등록" | "회원권 양도" | "환불" | "회원 삭제";
  const settings: Setting[] = [
    "이용권 추가 등록",
    "회원권 양도",
    "환불",
    "회원 삭제",
  ];
  const navigate = useNavigate();

  const handleClickSetting = (setting: Setting) => {
    if (setting === "이용권 추가 등록") {
      navigate({
        pathname: PATH.EXTRA_REGISTER_TICKET,
        search: `?memberId=${memberId}`,
      });
    }

    if (setting === "회원 삭제") {
      openModal({
        component: DeleteTraineeModal,
        props: { memberId, memberName },
      });
      closeBottomSheet();
    }
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>설정</p>

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
