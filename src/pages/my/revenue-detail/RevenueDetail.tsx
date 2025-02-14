import dayjs from "dayjs";
import Revenue from "../components/revenue/Revenue";
import styles from "./RevenueDetail.module.scss";
import { chevronRightGrey } from "@/assets/assets";
import Image from "@/components/image/Image";

export default function RevenueDetail() {
  const generateDateArray = () => {
    const dates = [];
    const currentDate = dayjs();

    for (let i = 0; i < 60; i++) {
      dates.push(currentDate.subtract(i, "month").format("YYYYMM"));
    }

    return dates.reverse();
  };

  const dateArray = useMemo(() => generateDateArray(), []);
  const [activeDate, setActiveDate] = useState<string>(
    dateArray[dateArray.length - 1]
  );

  return (
    <div className={styles.container}>
      <Revenue
        type="detail"
        dateArray={dateArray}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />

      <div className={styles.trainee_list}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.trainee}>
            <div className={styles.trainee_left}>
              <p className={styles.trainee_name}>김영재 회원님</p>
              <p className={styles.product_name}>프리미엄PT20</p>
              <p className={styles.trainee_date}>2024.10.01-2025.01.01</p>
            </div>
            <div className={styles.trainee_right}>
              <div className={styles.round}>
                <p className={styles.round_date}>이번 달</p>
                <div className={styles.round_count}>3회차</div>
                <Image
                  src={chevronRightGrey}
                  alt="chevronRightGrey"
                  width={2.8}
                  height={2.8}
                />
              </div>

              <p className={styles.price}>{"150000".toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
