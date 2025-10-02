import { useGetUserMemberMemberId } from "@/api/generated/유저/유저";
import Modal from "@/components/modal/Modal";
import styles from "./TraineeTicketModal.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TraineeTicketContent from "./trainee-ticket-content/TraineeTicketContent";
import Button from "@/components/button/Button";
import Image from "@/components/image/Image";
import { pause, caretRight, infoCircle } from "@/assets/assets";
import { closeModal } from "@/utils/modal";
import { openBottomSheet } from "@/utils/bottomSheet";
import TraineeTicketSettingBottomSheet from "./trainee-ticket-setting-bottom-sheet/TraineeTicketSettingBottomSheet";
import TraineeTicketSkeleton from "./trainee-ticket-skeleton/TraineeTicketSkeleton";
import { Pagination } from "swiper/modules";
import { MemberDetailResDto } from "@/api/generated/models";

interface TraineeTicketModalProps {
  memberId: string;
  memberName: string;
  hasReservedClass: boolean;
}

export default function TraineeTicketModal({
  memberId,
  memberName,
  hasReservedClass,
}: TraineeTicketModalProps) {
  const { data: traineeData, isLoading } = useGetUserMemberMemberId(memberId);
  const trainees = traineeData?.result;
  const buttonColor: any = {
    ING: "primary_1",
    STOP: "sub_1",
  };
  const [ticket, setTicket] = useState<MemberDetailResDto | null>(null);
  const navigate = useNavigate();

  const handleClickTicketStatusButton = ({
    ticketId,
    ticketCode,
  }: {
    ticketId: string;
    ticketCode: string;
  }) => {
    if (ticketCode === "ING") {
      closeModal();
      navigate(`/pause-ticket/${ticketId}`);
    }
  };

  const handleClickSettingButton = () => {
    closeModal();
    if (ticket) {
      openBottomSheet({
        component: TraineeTicketSettingBottomSheet,
        props: {
          memberId,
          memberName,
          hasReservedClass,
          ticket: ticket,
        },
      });
    }
  };

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.member_name}>{memberName} 회원님</p>
          <button
            onClick={() => {
              handleClickSettingButton();
            }}
            className={styles.setting_button}
          >
            설정
          </button>
        </div>

        <div className={styles.ticket_content_container}>
          {isLoading ? (
            <TraineeTicketSkeleton />
          ) : (
            <Swiper
              spaceBetween={15}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop
              autoHeight
              onSlideChange={(swiper) => {
                const idx = swiper.activeIndex;
                if (trainees && trainees[idx]) {
                  setTicket(trainees[idx]);
                }
              }}
            >
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
                        onClick={() => {
                          if (trainee.ticketCode && trainee.ticketId) {
                            handleClickTicketStatusButton({
                              ticketId: trainee.ticketId,
                              ticketCode: trainee.ticketCode,
                            });
                          }
                        }}
                        height={5.4}
                      >
                        {trainee.ticketCode === "ING"
                          ? "이용 정지 신청"
                          : "이용 정지 신청 취소"}
                        <Image
                          src={
                            trainee.ticketCode === "ING" ? pause : caretRight
                          }
                          width={2.4}
                          height={2.4}
                          className={styles.button_icon}
                        />
                      </Button>
                      {trainee.ticketCode !== "STOP" && (
                        <div className={styles.description_container}>
                          <Image src={infoCircle} width={2} height={2} />
                          <p>정지시킨 기간 만큼 자동 연장됩니다</p>
                        </div>
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </Modal>
  );
}
