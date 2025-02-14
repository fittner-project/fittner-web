import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./RevenueTraineeDetail.module.scss";
import classNames from "classnames";
import TraineeRevenueList from "./components/trainee-revenue-list/TraineeRevenueList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { getUserMyPageSalesInfoDetail } from "@/api/generated/마이페이지/마이페이지";
import dayjs from "dayjs";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function RevenueTraineeDetail() {
  const filterButtonsArr = ["이번 달", "전체"];
  const [activeFilter, setActiveFilter] = useState(filterButtonsArr[0]);
  const { ticketId } = useParams();

  const {
    data: revenueTraineesPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading: isNoticeLoading,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKeys.REVENUE_TRAINEE_DETAIL(activeFilter),
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPageSalesInfoDetail({
        ticketId: ticketId ?? "",
        reservationStartMonth:
          activeFilter === "이번 달" ? dayjs().format("YYYYMM") : "TOTAL",
        currentPageNo: pageParam.toString(),
        recordsPerPage: "10",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.result?.length ?? 0;
      return totalCount === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!ticketId,
  });

  const revenueTrainees = revenueTraineesPage?.pages.flatMap(
    (page) => page.result ?? []
  );

  console.log(revenueTrainees);

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.filter}>
          <p className={styles.title}>수익금 내역</p>
          <div className={styles.filter_buttons}>
            {filterButtonsArr.map((button) => (
              <button
                onClick={() => setActiveFilter(button)}
                key={button}
                className={classNames(styles.filter_button, {
                  [styles.active]: activeFilter === button,
                })}
              >
                {button}
              </button>
            ))}
          </div>
        </div>

        <TraineeRevenueList />
        <TraineeRevenueList />
        {!isFetching && <div ref={ref} />}
      </div>
    </PaddingContainer>
  );
}
