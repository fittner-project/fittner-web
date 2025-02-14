import dayjs from "dayjs";
import Revenue from "../components/revenue/Revenue";
import styles from "./RevenueDetail.module.scss";
import { chevronRightGrey } from "@/assets/assets";
import Image from "@/components/image/Image";
import { getUserMyPageSalesInfo } from "@/api/generated/마이페이지/마이페이지";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { uniqueId } from "lodash";
import PATH from "@/router/path";

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
  const center = useUserStore((state) => state.selectedCenter);

  const {
    data: revenueTraineesPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKeys.REVENUE_TRAINEE_ALL(),
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPageSalesInfo({
        centerId: center.centerId ?? "",
        reservationStartMonth: activeDate,
        currentPageNo: pageParam.toString(),
        recordsPerPage: "10",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.result?.length ?? 0;
      return totalCount === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const revenueTrainees = revenueTraineesPage?.pages.flatMap(
    (page) => page.result ?? []
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
        {revenueTrainees?.map((trainee) => (
          <Link
            to={`${PATH.MY.REVENUE_DETAIL}/${trainee.ticketId}`}
            key={uniqueId()}
            className={styles.trainee}
          >
            <div className={styles.trainee_left}>
              <p className={styles.trainee_name}>{trainee.memberName} 회원님</p>
              <p className={styles.ticket_name}>{trainee.ticketName}</p>
              <p className={styles.trainee_date}>
                {dayjs(trainee.ticketStartDate).format("YYYY.MM.DD")} -{" "}
                {dayjs(trainee.ticketEndDate).format("YYYY.MM.DD")}
              </p>
            </div>
            <div className={styles.trainee_right}>
              <div className={styles.round}>
                <p className={styles.round_date}>이번 달</p>
                <div className={styles.round_count}>
                  {trainee.ticketUseCnt}회차
                </div>
                <Image
                  src={chevronRightGrey}
                  alt="chevronRightGrey"
                  width={2.8}
                  height={2.8}
                />
              </div>

              <p className={styles.price}>
                {trainee.nowSalesPrice?.toLocaleString()}원
              </p>
            </div>
          </Link>
        ))}
        {!isFetching && <div ref={ref} />}
      </div>
    </div>
  );
}
