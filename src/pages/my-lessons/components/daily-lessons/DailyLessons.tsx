import { uniqueId } from "lodash";
import styles from "./DailyLessons.module.scss";
import useLessonStore from "@/stores/lessons";
import Image from "@/components/image/Image";
import { chevronRightGrey } from "@/assets/assets";

function DailyLessons() {
  const dailyLessons = useLessonStore((state) => state.dailyLessons);

  const formatTime = (timeStr: string | undefined) => {
    if (!timeStr) return "";
    const hour = parseInt(timeStr.slice(0, 2));
    const minute = timeStr.slice(2, 4);
    const period = hour < 12 ? "오전" : "오후";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${hour12}:${minute}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.daily_lessons_container}>
        {dailyLessons[0].reservations?.map((reservation) => (
          <div key={uniqueId()} className={styles.lesson}>
            <p
              className={styles.time}
            >{`${reservation.reservationStartTime?.slice(0, 2)}:${reservation.reservationStartTime?.slice(2, 4)}`}</p>
            <div
              className={styles.lesson_card}
              style={{
                backgroundColor: `rgba(${parseInt(reservation.reservationColor?.slice(6, 8) || "0", 16)}, ${parseInt(reservation.reservationColor?.slice(8, 10) || "0", 16)}, ${parseInt(reservation.reservationColor?.slice(10, 12) || "0", 16)}, 0.1)`,
              }}
            >
              <section className={styles.lesson_left_section}>
                <div
                  style={{
                    backgroundColor: `#${reservation.reservationColor?.slice(6)}`,
                    width: "0.6rem",
                    borderRadius: "1rem",
                  }}
                />

                <div className={styles.lesson_info}>
                  <div className={styles.lesson_detail_section}>
                    <div>
                      <section className={styles.lesson_top_section}>
                        <p className={styles.member_name}>
                          <span>{reservation.memberName}</span> 회원님
                        </p>

                        <div
                          style={{
                            backgroundColor: `rgba(${parseInt(reservation.reservationColor?.slice(6, 8) || "0", 16)}, ${parseInt(reservation.reservationColor?.slice(8, 10) || "0", 16)}, ${parseInt(reservation.reservationColor?.slice(10, 12) || "0", 16)}, 0.2)`,
                            borderRadius: "0.6rem",
                            color: `#${reservation.reservationColor?.slice(6)}`,
                            padding: "0.9rem 0.3rem",
                            fontSize: "1.6rem",
                          }}
                        >
                          {reservation.ptnCnt}회차
                        </div>
                      </section>
                      <p className={styles.lesson_time}>
                        {formatTime(reservation.reservationStartTime)} -{" "}
                        {formatTime(reservation.reservationEndTime)}
                      </p>
                    </div>
                    <Image
                      src={chevronRightGrey}
                      alt={"chevron-right"}
                      width={2.8}
                      height={2.8}
                    />
                  </div>

                  {reservation.reservationMemo && (
                    <div className={styles.lesson_memo}>
                      {reservation.reservationMemo}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
      {dailyLessons.length === 0 && (
        <div className={styles.empty}>수업이 없습니다.</div>
      )}
    </div>
  );
}

export default DailyLessons;
