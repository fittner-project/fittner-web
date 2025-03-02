import dayjs from "dayjs";
import styles from "./BottomSheetUserSection.module.scss";
import { SignResrvationForMemberResDto } from "@/api/generated/models";

interface BottomSheetUserSectionProps {
  signatureReservation: SignResrvationForMemberResDto;
}

export default function BottomSheetUserSection({
  signatureReservation,
}: BottomSheetUserSectionProps) {
  const formatTime = (time: string) => `${time.slice(0, 2)}:${time.slice(2)}`;

  return (
    <section className={styles.container}>
      <div className={styles.color_bar} />

      <div className={styles.user_info}>
        <div className={styles.user_info_top}>
          <p className={styles.user_name}>
            <span>{signatureReservation.memberName}</span>
            {` `} 회원님
          </p>
          <div className={styles.count}>
            {signatureReservation.reservationUseCnt}회차
          </div>
        </div>
        <p className={styles.date}>
          {dayjs(signatureReservation.reservationStartDate).format("M월 D일")}{" "}
          {formatTime(signatureReservation.reservationStartTime ?? "")} -{" "}
          {formatTime(signatureReservation.reservationEndTime ?? "")}
        </p>
      </div>
    </section>
  );
}
