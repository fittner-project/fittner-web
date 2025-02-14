import Image from "@/components/image/Image";
import styles from "./Revenue.module.scss";
import { chevronLeftGrey, chevronRightGrey } from "@/assets/assets";
import RevenueCard from "@/pages/my/components/revenue/revenue-card/RevenueCard";
import { Link } from "react-router-dom";
import PATH from "@/router/path";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetUserMyPageSales } from "@/api/generated/마이페이지/마이페이지";
import dayjs from "dayjs";

interface RevenueProps {
  type: "main" | "detail";
  dateArray?: string[];
  activeDate?: string;
  setActiveDate?: (date: string) => void;
}

export default function Revenue({
  type,
  dateArray,
  setActiveDate,
  activeDate,
}: RevenueProps) {
  const swiperRef = useRef<SwiperRef>(null);
  const center = useUserStore((state) => state.selectedCenter);
  const date =
    type === "main"
      ? dayjs().format("YYYYMM")
      : dayjs(activeDate).format("YYYYMM");

  const { data: revenueData, isLoading } = useGetUserMyPageSales({
    centerId: center.centerId ?? "",
    reservationStartMonth: date,
  });

  const revenue = revenueData?.result;

  return (
    <div className={styles.container}>
      {type === "main" && (
        <section className={styles.top_section_main}>
          <p className={styles.title}>수익관리</p>
          <Link to={PATH.MY.REVENUE_DETAIL} className={styles.detail_section}>
            <p>상세내역</p>{" "}
            <Image
              src={chevronRightGrey}
              alt="상세내역"
              width={1.6}
              height={1.6}
            />
          </Link>
        </section>
      )}

      {type === "detail" && dateArray && setActiveDate && (
        <section className={styles.top_section_detail}>
          <div className={styles.date_section}>
            <Image
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              src={chevronLeftGrey}
              alt="이전"
              width={2.8}
              height={2.8}
            />

            <div className={styles.swiper_container}>
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                spaceBetween={20}
                onSlideChange={(swiper) =>
                  setActiveDate(dateArray[swiper.activeIndex])
                }
                initialSlide={dateArray.length - 1}
              >
                {dateArray.map((date, index) => (
                  <SwiperSlide key={index}>
                    <span className={styles.active_date}>
                      {dayjs(date).format("YYYY년 MM월")}
                    </span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Image
              onClick={() => swiperRef.current?.swiper.slideNext()}
              src={chevronRightGrey}
              alt="다음"
              width={2.8}
              height={2.8}
            />
          </div>
        </section>
      )}

      <RevenueCard
        isLoading={isLoading}
        nowSalesPrice={Number(revenue?.nowSalesPrice) || 0}
        projectionSalesPrice={Number(revenue?.projectionSalesPrice) || 0}
        leftText="예상 수익금"
        rightText="현재 수익금"
      />
    </div>
  );
}
