import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SecessionBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";
import useAuthStore from "@/store/auth";
import { usePostUserDrop } from "@/api/generated/유저/유저";
import PATH from "@/router/path";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";

export default function SecessionBottomSheet() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: postUserDrop } = usePostUserDrop({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "탈퇴가 \n 완료되었습니다.",
            onCloseComplete: () => {
              logout();
              navigate(PATH.SIGN_IN);
            },
          },
        });
      },
    },
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.secession}>탈퇴</span> 하시겠습니까?
        </p>
        <div className={styles.button_container}>
          <Button
            onClick={() => closeBottomSheet()}
            backgroundColor="grey_1"
            fullWidth
          >
            취소
          </Button>
          <Button
            onClick={() => postUserDrop()}
            backgroundColor="primary_1"
            fullWidth
          >
            탈퇴
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
