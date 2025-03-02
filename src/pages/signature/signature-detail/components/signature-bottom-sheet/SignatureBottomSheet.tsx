import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SignatureBottomSheet.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import BottomSheetUserSection from "../bottom-sheet-user-section/BottomSheetUserSection";
import Button from "@/components/button/Button";
import SignatureCanvas from "react-signature-canvas";

interface SignatureBottomSheetProps {
  activeSignature: SignResrvationForMemberResDto | null;
}

export default function SignatureBottomSheet({
  activeSignature,
}: SignatureBottomSheetProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

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

        <Button disabled={!isSigned} fullWidth backgroundColor="primary_1">
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
