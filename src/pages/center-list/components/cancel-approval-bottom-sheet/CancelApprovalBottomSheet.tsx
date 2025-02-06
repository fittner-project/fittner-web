import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./CancelApprovalBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UserCenterListResDto } from "@/api/generated/models";
import {
  getGetUserCentersQueryKey,
  useDeleteUserCenter,
} from "@/api/generated/유저/유저";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";

interface CancelApprovalBottomSheetProps {
  center: UserCenterListResDto;
}

export default function CancelApprovalBottomSheet({
  center,
}: CancelApprovalBottomSheetProps) {
  const queryClient = useQueryClient();
  const trainerEmail = useUserStore((state) => state.userInfo.trainerEmail);
  const { mutate: deleteUserCenter } = useDeleteUserCenter({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetUserCentersQueryKey(trainerEmail as string),
        });
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "승인취소가 \n 완료 되었습니다",
            onCloseComplete: () => closeBottomSheet(),
          },
        });
      },
    },
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.title_highlight}>{center.centerName}</span>
          <br />
          승인취소 하시겠습니까?
        </p>

        <div className={styles.button_container}>
          <Button
            onClick={() => closeBottomSheet()}
            backgroundColor="grey_1"
            fullWidth
            className={styles.button}
          >
            취소
          </Button>
          <Button
            onClick={() =>
              deleteUserCenter({ data: { centerJoinId: center.centerJoinId } })
            }
            backgroundColor="primary_1"
            fullWidth
            className={styles.button}
          >
            확인
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
