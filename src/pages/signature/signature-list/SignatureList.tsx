import dayjs from "dayjs";
import SignatureDateSwiper from "./components/signature-date-swiper/SignatureDateSwiper";
import styles from "./SignatureList.module.scss";
import { getUserSignReservations } from "@/api/generated/서명/서명";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SignatureReservationList from "./components/signature-reservation-list/SignatureReservationList";
import { MotionDiv } from "@/components/animation/Motion";
import { useSignatureActiveDateStore } from "./stores/signatureActiveDate";

export default function SignatureList() {
  const selectedCenter = useUserStore((state) => state.selectedCenter);
  const generateDateArray = () => {
    const dates = [];
    const currentDate = dayjs();

    for (let i = 0; i < 120; i++) {
      dates.push(currentDate.subtract(i, "day").format("YYYYMMDD"));
    }

    return dates.reverse();
  };
  const dateArray = useMemo(() => generateDateArray(), []);
  const activeDate = useSignatureActiveDateStore((state) => state.activeDate);
  const setActiveDate = useSignatureActiveDateStore(
    (state) => state.setActiveDate
  );

  const {
    data: signatureReservationsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKeys.SIGNATURE_RESERVATION(activeDate),
    queryFn: ({ pageParam = 1 }) =>
      getUserSignReservations({
        centerId: selectedCenter.centerId ?? "",
        reservationStartDate: activeDate,
        currentPageNo: pageParam.toString(),
        recordsPerPage: "10",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.result?.reservationList?.length ?? 0;
      return totalCount === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const signatureReservations = signatureReservationsPages?.pages.flatMap(
    (page) => page.result?.reservationList ?? []
  );

  return (
    <div className={styles.container}>
      <MotionDiv
        className={styles.dumbbell_container}
        transition={{ duration: 0.4, delay: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SignatureDateSwiper
          dateArray={dateArray}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
        />
      </MotionDiv>

      <MotionDiv
        className={styles.calendar_container}
        transition={{ duration: 0.4, delay: 0.6 }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <SignatureReservationList
          signatureReservations={signatureReservations}
          isLoading={isLoading}
        />
      </MotionDiv>

      {!isFetching && <div ref={ref} />}
    </div>
  );
}
