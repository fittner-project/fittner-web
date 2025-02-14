import styles from "./RevenueCard.module.scss";
import classNames from "classnames";
import Progress from "@/components/progress/Progress";
import Skeleton from "@/components/skeleton/Skeleton";

interface RevenueCardProps {
  nowSalesPrice: number;
  projectionSalesPrice: number;
  leftText: string;
  rightText: string;
  isLoading: boolean;
}

export default function RevenueCard({
  nowSalesPrice,
  projectionSalesPrice,
  leftText,
  rightText,
  isLoading,
}: RevenueCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.revenue_item_container}>
        <div className={styles.revenue_item}>
          <p className={styles.revenue_item_title}>{leftText}</p>

          {isLoading ? (
            <div className={styles.revenue_item_value}>
              <Skeleton width={12} height={2.2} borderRadius={0.5} />
            </div>
          ) : (
            <div
              className={classNames(styles.revenue_item_value, styles.expected)}
            >
              {`${Number(projectionSalesPrice).toLocaleString()}원`}
            </div>
          )}
        </div>
        <div className={styles.revenue_item_divider} />
        <div className={styles.revenue_item}>
          <p className={styles.revenue_item_title}>{rightText}</p>
          {isLoading ? (
            <div className={styles.revenue_item_value}>
              <Skeleton width={12} height={2.2} borderRadius={0.5} />
            </div>
          ) : (
            <div
              className={classNames(styles.revenue_item_value, styles.current)}
            >
              {`${Number(nowSalesPrice).toLocaleString()}원`}
            </div>
          )}
        </div>
      </div>

      <Progress
        current={nowSalesPrice}
        total={projectionSalesPrice}
        fullWidth
        height={0.9}
      />
    </div>
  );
}
