import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { CenterListResDto, TermsResDto } from "@/api/generated/models";
import styles from "./SelectCenterBottomSheet.module.scss";
import Image from "@/components/image/Image";
import { infoCircle } from "@/assets/assets";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import PATH from "@/router/path";
import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/utils/storage";
import { SocialType } from "@/auth/socialType";
import useAuthStore from "@/store/auth";
import { usePostUserCenter, usePostUserJoin } from "@/api/generated/유저/유저";

interface SelectCenterBottomSheetProps {
  center: CenterListResDto;
}

function SelectCenterBottomSheet({ center }: SelectCenterBottomSheetProps) {
  const navigate = useNavigate();
  const { isAuthenticated, setApprovalStatus } = useAuthStore();
  const { mutate: registerCenter } = usePostUserCenter({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "센터 등록 신청이\n 완료 되었습니다",
          },
        });
      },
    },
  });
  const { mutate: signUp } = usePostUserJoin({
    mutation: {
      onSuccess: () => {
        setApprovalStatus("INACTIVE");

        openModal({
          component: SuccessModal,
          props: {
            successMessage: "센터 등록 신청이\n 완료 되었습니다",
            onCloseComplete: () => {
              navigate(PATH.SIGN_UP.COMPLETE);
            },
          },
        });
      },
    },
  });
  const trainerSnsKind = storage.get({
    key: storageKeys.trainerSnsKind,
    type: "local",
  });
  const trainerName = storage.get({
    key: storageKeys.trainerName,
    type: "local",
  });
  const trainerEmail = storage.get({
    key: storageKeys.trainerEmail,
    type: "local",
  });
  const trainerPhone = storage.get({
    key: storageKeys.trainerPhone,
    type: "local",
  });
  const userAgreedTerms = storage.get<TermsResDto[]>({
    key: storageKeys.termsAgreement,
    type: "local",
  });
  const terms = storage.get<TermsResDto[]>({
    key: storageKeys.terms,
    type: "local",
  });

  const handleRegisterCenter = () => {
    if (isAuthenticated) {
      registerCenter({ data: { centerId: center.centerId } });
      return;
    }

    if (!isAuthenticated) {
      storage.set({
        key: storageKeys.initialCenter,
        value: center,
        type: "local",
      });

      const agreements = terms?.map((term) => ({
        termsId: term.termsId,
        agreed: userAgreedTerms?.some(
          (agreedTerm) => agreedTerm.termsId === term.termsId
        )
          ? "Y"
          : "N",
      }));

      signUp({
        data: {
          agreements: agreements,
          trainerPhone: trainerPhone as string,
          trainerName: trainerName as string,
          trainerEmail: trainerEmail as string,
          trainerSnsKind: trainerSnsKind as SocialType,
          centerId: center.centerId,
        },
      });
      return;
    }
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.center_name_section}>
          <span className={styles.center_name}>{center.centerName}</span>
          <br />
          센터 등록 하시겠습니까?
        </p>
        <p className={styles.description_1}>
          연동 신청 시 트레이너님의 <br />
          성함과 연락처가 전달됩니다.
        </p>
        <div className={styles.description_2_section}>
          <Image src={infoCircle} alt="info" width={2} height={2} />
          <p className={styles.description_2}>
            최종 관리자 승인 후 센터등록이 완료 됩니다.
          </p>
        </div>
        <div className={styles.button_section}>
          <Button
            backgroundColor="grey_1"
            fullWidth
            onClick={() => closeBottomSheet()}
          >
            취소
          </Button>
          <Button
            backgroundColor="primary_1"
            fullWidth
            onClick={handleRegisterCenter}
          >
            신청
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default SelectCenterBottomSheet;
