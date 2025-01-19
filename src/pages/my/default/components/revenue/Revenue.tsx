import Image from "@/components/image/Image";
import styles from "./Revenue.module.scss";
import { chevronRight } from "@/assets/assets";
import RevenueCard from "@/pages/my/components/revenue-card/RevenueCard";

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

      <div className={styles.revenue_card}>
        <RevenueCard
          progressCurrent={1720000}
          progressTotal={3220000}
          leftText="예상 수익금"
          rightText="현재 수익금"
        />
      </div>
    </div>
  );
}
