import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SignatureBottomSheet.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import BottomSheetUserSection from "../bottom-sheet-user-section/BottomSheetUserSection";
import Button from "@/components/button/Button";
import SignatureCanvas from "react-signature-canvas";
import {
  getUserSignReservationsTicketId,
  usePostUserSign,
} from "@/api/generated/서명/서명";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { useQueryClient } from "@tanstack/react-query";
import useFileUpload from "@/hooks/useFileUpload";
import { base64ToFile } from "@/utils/base64ToFile";

interface SignatureBottomSheetProps {
  activeSignature: SignResrvationForMemberResDto | null;
}

export default function SignatureBottomSheet({
  activeSignature,
}: SignatureBottomSheetProps) {
  const queryClient = useQueryClient();
  const { ticketId } = useParams();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const { mutateAsync: signature, isPending: isSigning } = usePostUserSign({
    mutation: {
      onSuccess: () => {
        if (!ticketId) return;
        queryClient.invalidateQueries({
          queryKey: getUserSignReservationsTicketId(ticketId),
        });
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "서명처리가 \n 완료 되었습니다.",
            onCloseComplete: () => {
              closeBottomSheet();
            },
          },
        });
      },
    },
  });
  const { uploadFiles, isUploadingImage } = useFileUpload();

  const handleSignature = async () => {
    if (!sigCanvas.current) return;

    const signatureData = sigCanvas.current.toDataURL("image/png");
    const signatureFile = await base64ToFile(signatureData, "signature.png");

    const { result } = await uploadFiles(signatureFile);

    signature({
      data: {
        fileGroupId: result[0].fileGroupId ?? "",
        memberId: activeSignature?.memberId ?? "",
        reservationId: activeSignature?.reservationId ?? "",
        signType: "SIGN",
      },
    });
  };
  const isLoading = isUploadingImage || isSigning;

  return (
    <BottomSheet disableDrag={isDragging}>
      <div className={styles.container}>
        <BottomSheetUserSection
          signatureReservation={
            activeSignature as SignResrvationForMemberResDto
          }
        />

        <div className={styles.signature_container}>
          {!isSigned && (
            <p className={styles.signature_text}>
              해당 수업에 참여하였다면 <br /> 서명해주세요
            </p>
          )}
          <SignatureCanvas
            penColor="black"
            onBegin={() => {
              setIsSigned(true);
              setIsDragging(true);
            }}
            onEnd={() => {
              setIsDragging(false);
            }}
            ref={sigCanvas}
            canvasProps={{
              className: styles.signature,
              width: "full",
              height: "300px",
            }}
            clearOnResize={false}
          />
        </div>

        <Button
          disabled={!isSigned || isLoading}
          fullWidth
          backgroundColor="primary_1"
          onClick={handleSignature}
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
