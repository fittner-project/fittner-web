import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./NoshowBottomSheet.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import BottomSheetUserSection from "../bottom-sheet-user-section/BottomSheetUserSection";
import Button from "@/components/button/Button";
import { useForm } from "react-hook-form";
import Image from "@/components/image/Image";
import { gallery } from "@/assets/assets";

interface NoshowBottomSheetProps {
  activeSignature: SignResrvationForMemberResDto | null;
}

export default function NoshowBottomSheet({
  activeSignature,
}: NoshowBottomSheetProps) {
  const { register, watch } = useForm();
  const noshowReason = watch("noshowReason");

  return (
    <BottomSheet>
      <div className={styles.container}>
        <BottomSheetUserSection
          signatureReservation={
            activeSignature as SignResrvationForMemberResDto
          }
        />

        <div className={styles.noshow_reason_container}>
          <textarea
            className={styles.noshow_reason_textarea}
            placeholder="노쇼 사유를 입력해주세요."
            onInput={(e) => {
              const input = e.target as HTMLTextAreaElement;
              if (input.value.length > 100) {
                input.value = input.value.slice(0, 100);
              }
            }}
            {...register("noshowReason", {
              maxLength: 100,
            })}
          />

          <div className={styles.noshow_reason_length}>
            {`${noshowReason?.length ?? 0}/100`}
          </div>
        </div>

        <div className={styles.image_container}>
          <div className={styles.add_image}>
            <Image src={gallery} alt="gallery" width={2.8} height={2.8} />
            <p>0/5</p>
          </div>
        </div>

        <Button fullWidth backgroundColor="primary_1">
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
