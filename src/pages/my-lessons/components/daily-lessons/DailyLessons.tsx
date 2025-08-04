import styles from "./DailyLessons.module.scss";
import useLessonStore from "@/stores/lessons";

function DailyLessons() {
  const dailyLessons = useLessonStore((state) => state.dailyLessons);
  console.log("dailyLessons", dailyLessons);
  return (
    <div className={styles.container}>
      {dailyLessons.length === 0 && (
        <div className={styles.empty}>수업이 없습니다.</div>
      )}
    </div>
  );
}

export default DailyLessons;
