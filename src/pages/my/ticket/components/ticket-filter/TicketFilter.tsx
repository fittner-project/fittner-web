import styles from "./TicketFilter.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FreeMode } from "swiper/modules";
import classNames from "classnames";

interface TicketFilterProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (activeFilter: string) => void;
}

function TicketFilter({
  filters,
  activeFilter,
  setActiveFilter,
}: TicketFilterProps) {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={9}
        freeMode
        modules={[FreeMode]}
        style={{ padding: "0 1.8rem" }}
        initialSlide={filters.findIndex((filter) => filter === activeFilter)}
      >
        {filters.map((filter) => (
          <SwiperSlide
            onClick={() => setActiveFilter(filter)}
            key={filter}
            className={classNames(styles.filter, {
              [styles.active]: activeFilter === filter,
            })}
          >
            {filter}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TicketFilter;
