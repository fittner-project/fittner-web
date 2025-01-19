import classNames from "classnames";
import Image from "@/components/image/Image";
import styles from "./Revenue.module.scss";
import { chevronRight } from "@/assets/assets";
import Progress from "@/components/progress/Progress";

export default function Revenue() {
  return (
    <div className={styles.container}>
      <section className={styles.top_section}>
        <p className={styles.title}>수익관리</p>
        <Link to="" className={styles.detail_section}>
          <p>상세내역</p>{" "}
          <Image src={chevronRight} alt="상세내역" width={1.6} height={1.6} />
        </Link>
      </section>

      <div className={styles.revenue_section}>
        <div className={styles.revenue_item_container}>
          <div className={styles.revenue_item}>
            <p className={styles.revenue_item_title}>예상 수익금</p>
            <div
              className={classNames(styles.revenue_item_value, styles.expected)}
            >
              {`${Number(3220000).toLocaleString()}원`}
            </div>
          </div>
          <div className={styles.revenue_item_divider} />
          <div className={styles.revenue_item}>
            <p className={styles.revenue_item_title}>현재 수익금</p>
            <div
              className={classNames(styles.revenue_item_value, styles.current)}
            >
              {`${Number(1720000).toLocaleString()}원`}
            </div>
          </div>
        </div>

        <Progress current={1720000} total={3220000} fullWidth height={0.9} />
      </div>
    </div>
  );
}
