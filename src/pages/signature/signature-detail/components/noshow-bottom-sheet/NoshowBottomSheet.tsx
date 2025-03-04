import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./NoshowBottomSheet.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import BottomSheetUserSection from "../bottom-sheet-user-section/BottomSheetUserSection";
import Button from "@/components/button/Button";
import { useForm } from "react-hook-form";
import Image from "@/components/image/Image";
import { gallery, imageClose } from "@/assets/assets";
import {
  getUserSignReservationsTicketId,
  usePostUserSign,
} from "@/api/generated/서명/서명";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { closeBottomSheet } from "@/utils/bottomSheet";
import useFileUpload from "@/hooks/useFileUpload";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { uniqueId } from "lodash";
import { openImageViewer } from "@/utils/imageViewer";
interface NoshowBottomSheetProps {
  activeSignature: SignResrvationForMemberResDto | null;
}

interface ImagePreview {
  file: File;
  preview: string;
}

export default function NoshowBottomSheet({
  activeSignature,
}: NoshowBottomSheetProps) {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const { register, watch } = useForm();
  const noshowReason = watch("noshowReason");
  const queryClient = useQueryClient();
  const { ticketId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles, isUploadingImage } = useFileUpload();
  const [isTouching, setIsTouching] = useState(false);
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
            successMessage: "노쇼처리가 \n 완료 되었습니다.",
            onCloseComplete: () => {
              closeBottomSheet();
            },
          },
        });
      },
    },
  });

  const handleImageAdd = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= 5) {
      alert("최대 5개의 이미지만 추가할 수 있습니다.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setImages([...images, { file, preview }]);

    e.target.value = "";
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, []);
  const isLoading = isUploadingImage || isSigning;

  return (
    <BottomSheet disableDrag={isTouching}>
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
            <input
              disabled={images.length >= 5}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageAdd}
            />
            <Image
              onClick={() => fileInputRef.current?.click()}
              src={gallery}
              alt="gallery"
              width={2.8}
              height={2.8}
            />
            <p>{images.length}/5</p>
          </div>

          <div className={styles.preview_container}>
            <Swiper
              slidesOffsetAfter={26}
              onTouchStart={() => {
                setIsTouching(true);
              }}
              onTouchEnd={() => {
                setIsTouching(false);
              }}
              slidesPerView={"auto"}
              spaceBetween={8}
              freeMode
              modules={[FreeMode]}
              className={styles.swiper}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  style={{
                    width: "6.4rem",
                    backgroundImage: `url(${image.preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  key={uniqueId()}
                  className={styles.preview_item}
                  onPointerUp={() => {
                    openImageViewer({ imageUrl: image.preview });
                  }}
                >
                  <button
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      handleImageRemove(index);
                    }}
                    className={styles.remove_button}
                  >
                    <Image
                      src={imageClose}
                      alt="imageClose"
                      width={1.6}
                      height={1.6}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <Button
          onClick={async () => {
            if (images.length > 0) {
              const files = images.map((img) => img.file);
              const { result } = await uploadFiles(files);
              const fileGroupId = result[0].fileGroupId;

              signature({
                data: {
                  memberId: activeSignature?.memberId ?? "",
                  reservationId: activeSignature?.reservationId ?? "",
                  signType: "NOSHOW",
                  fileGroupId: fileGroupId ?? "",
                  signMemo: noshowReason,
                },
              });
            } else {
              signature({
                data: {
                  memberId: activeSignature?.memberId ?? "",
                  reservationId: activeSignature?.reservationId ?? "",
                  signType: "NOSHOW",
                  signMemo: noshowReason,
                },
              });
            }
          }}
          disabled={(!noshowReason && images.length === 0) || isLoading}
          fullWidth
          backgroundColor="primary_1"
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
