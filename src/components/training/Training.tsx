import { ReservationMemberResDto } from "@/api/generated/models";
import styles from "./Training.module.scss";
import Row from "../flex/Row";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ko";

dayjs.extend(customParseFormat);
dayjs.locale("ko");

const Training = ({ lesson }: { lesson: ReservationMemberResDto }) => {
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const parsed = dayjs(timeStr, "HHmm", true);
    if (!parsed.isValid()) return "";
    return parsed.format("A h:mm");
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.member_color}
        style={{ backgroundColor: "#B0B8C1" }}
      />
      <div className={styles.member_info}>
        <div className={styles.member_name}>
          {!lesson ? (
            <span>예정된 수업이 있다면</span>
          ) : (
            <Row>
              <div>{lesson.memberName}</div>
              <div>
                <span>{lesson.ptnCnt ?? 1}회차</span>/10회차
              </div>
            </Row>
          )}
        </div>

        {!lesson ? (
          <div className={styles.time}>나의 수업에서 등록해주세요</div>
        ) : (
          <div className={styles.time}>
            {formatTime(lesson.reservationStartTime ?? "")} -{" "}
            {formatTime(lesson.reservationEndTime ?? "")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;
