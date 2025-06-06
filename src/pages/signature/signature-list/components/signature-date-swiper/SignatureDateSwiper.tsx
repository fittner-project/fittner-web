import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SignatureDateSwiper.module.scss";
import "swiper/css";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import classNames from "classnames";

dayjs.locale("ko");

interface SignatureDateSwiperProps {
  dateArray: string[];
  activeDate: string;
  setActiveDate: (activeDate: string) => void;
}

export default function SignatureDateSwiper({
  dateArray,
  activeDate,
  setActiveDate,
}: SignatureDateSwiperProps) {
  return (
    <div className={styles.container}>
      <Swiper
        slideToClickedSlide
        slidesPerView={3}
        centeredSlides={true}
        onSlideChange={(swiper) => setActiveDate(dateArray[swiper.activeIndex])}
        initialSlide={
          dateArray.findIndex((date) => date === activeDate) ||
          dateArray.length - 1
        }
      >
        {dateArray.map((date) => (
          <SwiperSlide key={date}>
            <p
              className={classNames(styles.date, {
                [styles.active]: activeDate === date,
              })}
            >
              {dayjs(date).format("M월 D일 (ddd)")}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
