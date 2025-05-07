import { MemberDetailResDto } from "@/api/generated/models";
import styles from "./TraineeTicketContent.module.scss";
import dayjs from "dayjs";
import classNames from "classnames";

interface TraineeTicketContentProps {
  trainee: MemberDetailResDto;
}

export default function TraineeTicketContent({
  trainee,
}: TraineeTicketContentProps) {
  return (
    <div className={styles.container}>
      {trainee.ticketCode === "AFTER" && (
        <div
          className={classNames(styles.ticket_after_badge, {
            [styles.ticket_after_badge_after]: trainee.ticketCode === "AFTER",
          })}
        >
          기간 만료
        </div>
      )}
      <p className={styles.ticket_name}>{trainee.productName}</p>
      <p className={styles.ticket_period}>
        {dayjs(trainee.ticketStartDate).format("YYYY.MM.DD")} -{" "}
        {dayjs(trainee.ticketEndDate).format("YYYY.MM.DD")}
      </p>
      <div className={styles.ticket_bottom_section}>
        <div className={styles.ticket_remaining_count}>
          <p className={styles.ticket_remaining_count_title}>잔여횟수</p>
          <p className={styles.ticket_remaining_count_value}>
            <span>{trainee.productRemainCnt}회</span> 총{" "}
            <span>{trainee.productTotalCnt}회</span>
          </p>
        </div>

        <div className={styles.ticket_attendance_count}>
          <div>출석 {trainee.attendanceCnt}회</div>
          <div>결석 {trainee.absenceCnt}회</div>
        </div>
      </div>
    </div>
  );
}
