import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SignatureBottomSheet.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import BottomSheetUserSection from "../bottom-sheet-user-section/BottomSheetUserSection";
import Button from "@/components/button/Button";
import SignatureCanvas from "react-signature-canvas";
import { usePostCommonFileUpload } from "@/api/generated/파일/파일";
import {
  getUserSignReservationsTicketId,
  usePostUserSign,
} from "@/api/generated/서명/서명";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { useQueryClient } from "@tanstack/react-query";

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
  const { mutateAsync: uploadFile, isPending: isUploadingImage } =
    usePostCommonFileUpload();
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

  const handleSignature = async () => {
    if (!sigCanvas.current) return;

    const signatureData = sigCanvas.current.toDataURL("image/png");

    const blob = await fetch(signatureData).then((res) => res.blob());

    const formData = new FormData();
    const file = new File([blob], "signature.png", { type: "image/png" });
    formData.append("files", file);

    const { result } = await uploadFile({ data: { files: [file] } });

    const fileGroupId = result?.[0].fileGroupId;

    signature({
      data: {
        fileGroupId: fileGroupId ?? "",
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
