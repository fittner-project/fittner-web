import Button from "@/components/button/Button";
import styles from "./SignatureDetail.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import { getUserSignReservationsTicketId } from "@/api/generated/서명/서명";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SignatureDetailItem from "./components/signature-detail-item/SignatureDetailItem";

import SignatureDetailSkeleton from "./components/signature-detail-skeleton/SignatureDetailSkeleton";
import { SignResrvationForMemberResDto } from "@/api/generated/models";
import { openBottomSheet } from "@/utils/bottomSheet";
import SignatureBottomSheet from "./components/signature-bottom-sheet/SignatureBottomSheet";
import NoshowBottomSheet from "./components/noshow-bottom-sheet/NoshowBottomSheet";

export default function SignatureDetail() {
  const { ticketId } = useParams();
  const [activeSignature, setActiveSignature] =
    useState<SignResrvationForMemberResDto | null>(null);

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

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.signature_reservation_detail_list}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SignatureDetailSkeleton key={index} />
              ))
            : signatureReservationDetail?.map((signatureReservation) => (
                <SignatureDetailItem
                  key={signatureReservation.reservationId}
                  signatureReservation={signatureReservation}
                  activeSignature={activeSignature}
                  setActiveSignature={setActiveSignature}
                />
              ))}
          {!isFetching && <div ref={ref} />}
        </div>
        <div className={styles.button_container}>
          <Button
            onClick={() => {
              if (!activeSignature) return;

              openBottomSheet({
                component: NoshowBottomSheet,
                props: {
                  activeSignature,
                },
              });
            }}
            fullWidth
            backgroundColor="grey_1"
          >
            노쇼
          </Button>
          <Button
            onClick={() => {
              if (!activeSignature) return;

              openBottomSheet({
                component: SignatureBottomSheet,
                props: {
                  activeSignature,
                },
              });
            }}
            fullWidth
            backgroundColor="primary_1"
          >
            서명
          </Button>
        </div>
      </div>
    </PaddingContainer>
  );
}
