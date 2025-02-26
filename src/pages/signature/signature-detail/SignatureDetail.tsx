import Button from "@/components/button/Button";
import styles from "./SignatureDetail.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import { getUserSignReservationsTicketId } from "@/api/generated/서명/서명";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import dayjs from "dayjs";
import Image from "@/components/image/Image";
import { checkNor, checkSel } from "@/assets/assets";
import classNames from "classnames";

export default function SignatureDetail() {
  const { ticketId } = useParams();

  const {
    data: signatureReservationDetailPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKeys.SIGNATURE_RESERVATION_DETAIL(
      ticketId as string
    ),
    queryFn: ({ pageParam = 1 }) =>
      getUserSignReservationsTicketId(ticketId as string, {
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

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const signatureReservationDetail =
    signatureReservationDetailPages?.pages.flatMap((page) => page.result ?? []);

  console.log(signatureReservationDetail);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.signature_reservation_detail_list}>
          {signatureReservationDetail?.map((item) => (
            <div
              className={classNames(styles.signature_reservation_detail_item, {
                [styles.waiting]: item.reservationStatus === "WAITING",
              })}
            >
              <div className={styles.left_section}>
                <div>
                  {item.reservationStatus === "NOSHOW" && (
                    <p className={styles.noshow}>노쇼</p>
                  )}
                  {item.reservationStatus === "SIGN" && (
                    <Image
                      src={checkSel}
                      alt="checkSel"
                      width={2.5}
                      height={2.5}
                    />
                  )}
                  {item.reservationStatus === "WAITING" && (
                    <Image
                      src={checkNor}
                      alt="checkNor"
                      width={2.5}
                      height={2.5}
                    />
                  )}
                </div>
                <p className={styles.time}>
                  {dayjs(item.reservationStartDate).format("MM월 DD일")}{" "}
                  {`${item.reservationStartTime?.slice(0, 2)}:${item.reservationStartTime?.slice(2)}`}
                  -
                  {`${item.reservationEndTime?.slice(0, 2)}:${item.reservationEndTime?.slice(2)}`}
                </p>
              </div>
              <p className={styles.count}>{item.reservationUseCnt}회차</p>
            </div>
          ))}
        </div>
        <div className={styles.button_container}>
          <Button fullWidth backgroundColor="grey_1">
            노쇼
          </Button>
          <Button fullWidth backgroundColor="primary_1">
            서명
          </Button>
        </div>
      </div>
    </PaddingContainer>
  );
}
