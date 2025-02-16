import { SalesInfoDetailResDto } from "@/api/generated/models";
import styles from "./TraineeRevenueList.module.scss";
import dayjs from "dayjs";
import { uniqueId } from "lodash";

interface TraineeRevenueListProps {
  revenueTrainee: SalesInfoDetailResDto;
}

export default function TraineeRevenueList({
  revenueTrainee,
}: TraineeRevenueListProps) {
  const formatTime = (time: string) => `${time.slice(0, 2)}:${time.slice(2)}`;

  return (
    <div className={styles.container}>
      <p className={styles.date}>
        {dayjs(revenueTrainee.reservationMonth).format("YYYY.MM")}
      </p>
      {revenueTrainee.reservationListList?.map((reservation) => (
        <div className={styles.trainee_revenue_item} key={uniqueId()}>
          <div className={styles.left}>
            <section className={styles.left_top}>
              <p className={styles.trainee_name}>{reservation.memberName}</p>
              <p className={styles.round}>
                {reservation.reservationStatus === "SIGN"
                  ? `${reservation.ticketUseCnt}회차`
                  : "노쇼"}
              </p>
            </section>
            <section className={styles.left_bottom}>
              <p>
                {dayjs(reservation.reservationStartDate).format("YYYY.MM.DD")}
              </p>
              <div />
              <p>
                {formatTime(reservation.reservationStartTime ?? "")}-
                {formatTime(reservation.reservationEndTime ?? "")}
              </p>
            </section>
          </div>

          <p className={styles.revenue}>
            +{`${Number(reservation.salesPrice).toLocaleString()}원`}
          </p>
        </div>
      ))}
    </div>
  );
}
