import styles from "./RevenueCard.module.scss";
import classNames from "classnames";
import Progress from "@/components/progress/Progress";

interface RevenueCardProps {
  progressCurrent: number;
  progressTotal: number;
  leftText: string;
  rightText: string;
}

export default function RevenueCard({
  progressCurrent,
  progressTotal,
  leftText,
  rightText,
}: RevenueCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.revenue_item_container}>
        <div className={styles.revenue_item}>
          <p className={styles.revenue_item_title}>{leftText}</p>
          <div
            className={classNames(styles.revenue_item_value, styles.expected)}
          >
            {`${Number(3220000).toLocaleString()}원`}
          </div>
        </div>
        <div className={styles.revenue_item_divider} />
        <div className={styles.revenue_item}>
          <p className={styles.revenue_item_title}>{rightText}</p>
          <div
            className={classNames(styles.revenue_item_value, styles.current)}
          >
            {`${Number(1720000).toLocaleString()}원`}
          </div>
        </div>
      </div>

      <Progress
        current={progressCurrent}
        total={progressTotal}
        fullWidth
        height={0.9}
      />
    </div>
  );
}
