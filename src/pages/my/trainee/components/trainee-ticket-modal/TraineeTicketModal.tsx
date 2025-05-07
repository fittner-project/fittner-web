import { useGetUserMemberMemberId } from "@/api/generated/유저/유저";
import Modal from "@/components/modal/Modal";
import styles from "./TraineeTicketModal.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TraineeTicketContent from "./trainee-ticket-content/TraineeTicketContent";
import Button from "@/components/button/Button";
import Image from "@/components/image/Image";
import { pause, caretRight, infoCircle } from "@/assets/assets";
import { closeModal } from "@/utils/modal";
import { openBottomSheet } from "@/utils/bottomSheet";
import TraineeTicketSettingBottomSheet from "./trainee-ticket-setting-bottom-sheet/TraineeTicketSettingBottomSheet";

interface TraineeTicketModalProps {
  memberId: string;
  memberName: string;
}

export default function TraineeTicketModal({
  memberId,
  memberName,
}: TraineeTicketModalProps) {
  const { data: traineeData } = useGetUserMemberMemberId(memberId);
  const trainees = traineeData?.result;
  const buttonColor: any = {
    ING: "sub_1",
    STOP: "primary_1",
  };

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.member_name}>{memberName} 회원님</p>
          <button
            onClick={() => {
              closeModal();
              openBottomSheet({ component: TraineeTicketSettingBottomSheet });
            }}
            className={styles.setting_button}
          >
            설정
          </button>
        </div>

        <div className={styles.ticket_content_container}>
          <Swiper>
            {trainees?.map((trainee) => (
              <SwiperSlide key={trainee.ticketId}>
                <TraineeTicketContent trainee={trainee} />
                {(trainee.ticketCode === "ING" ||
                  trainee.ticketCode === "STOP") && (
                  <div className={styles.button_container}>
                    <Button
                      fullWidth
                      backgroundColor={
                        buttonColor[trainee.ticketCode as string]
                      }
                      height={5.4}
                    >
                      {trainee.ticketCode === "ING" ? "기간 정지" : "기간 만료"}
                      <Image
                        src={trainee.ticketCode === "ING" ? pause : caretRight}
                        width={2.4}
                        height={2.4}
                        className={styles.button_icon}
                      />
                    </Button>
                    <div className={styles.description_container}>
                      <Image src={infoCircle} width={2} height={2} />
                      <p>정지시킨 기간 만큼 자동 연장됩니다</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Modal>
  );
}
