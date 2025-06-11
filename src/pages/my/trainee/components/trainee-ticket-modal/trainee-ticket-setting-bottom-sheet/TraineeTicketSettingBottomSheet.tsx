import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./TraineeTicketSettingBottomSheet.module.scss";
import PATH from "@/router/path";
import DeleteTraineeModal from "./delete-trainee-modal/DeleteTraineeModal";
import { openModal } from "@/utils/modal";
import { closeBottomSheet, openBottomSheet } from "@/utils/bottomSheet";
import RefundBlockBottomSheet from "./refund-block-bottom-sheet/RefundBlockBottomSheet";
import { WaitForSeconds } from "@/utils/coroutine";
import AssignTicketSettingBottomSheet from "./assign-ticket-setting-bottom-sheet/AssignTicketSettingBottomSheet";

interface TraineeTicketSettingBottomSheetProps {
  memberId: string;
  memberName: string;
  hasReservedClass: boolean;
  ticketId: string;
}

export default function TraineeTicketSettingBottomSheet({
  memberId,
  memberName,
  hasReservedClass,
  ticketId,
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
        search: `?member-id=${memberId}`,
      });
    }

    if (setting === "회원권 양도") {
      closeBottomSheet();
      WaitForSeconds(300).then(() => {
        openBottomSheet({
          component: AssignTicketSettingBottomSheet,
          props: { memberId, ticketId },
        });
      });
    }

    if (setting === "환불") {
      if (hasReservedClass) {
        closeBottomSheet();
        WaitForSeconds(300).then(() => {
          openBottomSheet({
            component: RefundBlockBottomSheet,
          });
        });
      } else {
        navigate({
          pathname: PATH.CONFIRM_INFO,
          search: `?type=refund&ticket-id=${encodeURIComponent(ticketId)}`,
        });
      }
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
