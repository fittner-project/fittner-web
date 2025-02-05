import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SignOutBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

import { usePostAuthLogout } from "@/api/generated/권한/권한";

import PATH from "@/router/path";

export default function SignOutBottomSheet() {
  const logoutWithStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { mutate: logout } = usePostAuthLogout({
    mutation: {
      onSuccess: () => {
        logoutWithStore();
        navigate(PATH.SIGN_IN);
      },
    },
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.sign_out}>로그아웃</span> 하시겠습니까?
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
            onClick={() => logout()}
            backgroundColor="primary_1"
            fullWidth
          >
            로그아웃
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
