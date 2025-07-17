import {
  getUserMyPageNotices,
  useGetUserMyPageTerms,
} from "@/api/generated/마이페이지/마이페이지";
import styles from "./Policy.module.scss";
import PolicyLink from "./components/policy-link/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";

import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import PolicyLinkSkeleton from "./components/policy-link-skeleton/PolicyLinkSkeleton";
import useSelectedTermStore from "./stores/selected-term";

interface PolicyProps {
  type: "terms" | "notice";
}

export default function Policy({ type }: PolicyProps) {
  const selectedCenter = useUserStore((state) => state.selectedCenter);
  const { data: termsData, isLoading: isTermsLoading } = useGetUserMyPageTerms({
    query: { enabled: type === "terms" },
  });
  const terms = termsData?.result;
  const setSelectedTerm = useSelectedTermStore(
    (state) => state.setSelectedTerm
  );
  const setSelectedTermDate = useSelectedTermStore(
    (state) => state.setSelectedTermDate
  );

  const {
    data: noticePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading: isNoticeLoading,
  } = useInfiniteQuery({
    queryKey: infiniteQueryKeys.NOTICES(),
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPageNotices({
        centerId: selectedCenter.centerId ?? "",
        currentPageNo: pageParam.toString(),
        recordsPerPage: "10",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage?.result?.length ?? 0;
      return totalCount === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: type === "notice" && !!selectedCenter,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const allNotices =
    noticePages?.pages.flatMap((page) => page.result ?? []) ?? [];

  const isLoading = isTermsLoading || isNoticeLoading;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        {type === "terms" &&
          terms?.map((term) => (
            <PolicyLink
              onClick={() => {
                if (term && term.intTermsStartDate) {
                  setSelectedTerm(term);
                  setSelectedTermDate(term.intTermsStartDate);
                }
              }}
              date={term.intTermsStartDate ?? ""}
              title={term.ingTermsTitle ?? ""}
              to={`${encodeURIComponent(term.ingTermsTitle ?? "")}?date=${encodeURIComponent(term.intTermsStartDate ?? "")}&urls=${term.totalTermList?.map((t) => encodeURIComponent(t.termsUrl ?? "")).join(",")}`}
              type="main"
            />
          ))}

        {type === "notice" &&
          allNotices.map((notice) => (
            <PolicyLink
              key={notice.noticeTitle}
              date={notice.noticeDate ?? ""}
              title={notice.noticeTitle ?? ""}
              to={`${encodeURIComponent(notice.noticeTitle ?? "")}?content=${encodeURIComponent(notice.noticeContent ?? "")}&date=${encodeURIComponent(notice.noticeDate ?? "")}`}
              type="main"
            />
          ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <PolicyLinkSkeleton key={index} />
          ))}

        {type === "notice" && !isFetching && <div ref={ref} />}
      </div>
    </PaddingContainer>
  );
}
