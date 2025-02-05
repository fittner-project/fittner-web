import {
  getUserMyPageNotices,
  useGetUserMyPageTerms,
} from "@/api/generated/마이페이지/마이페이지";
import styles from "./Policy.module.scss";
import PolicyLink from "./components/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";

import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryKeys } from "@/constants/infinite-query-keys";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface PolicyProps {
  type: "terms" | "notice";
}

export default function Policy({ type }: PolicyProps) {
  const { selectedCenter } = useUserStore();
  const { data: termsData } = useGetUserMyPageTerms({
    query: { enabled: type === "terms" },
  });
  const terms = termsData?.result;

  const {
    data: noticePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
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

  return (
    <PaddingContainer>
      <div className={styles.container}>
        {type === "terms" &&
          terms?.map((term) => (
            <PolicyLink
              key={term.ingTermsTitle}
              date={term.intTermsStartDate ?? ""}
              title={term.ingTermsTitle ?? ""}
              to={term.totalTermList?.[0]?.termsUrl ?? ""}
            />
          ))}

        {type === "notice" &&
          allNotices.map((notice) => (
            <PolicyLink
              key={notice.noticeTitle}
              date={notice.noticeDate ?? ""}
              title={notice.noticeTitle ?? ""}
              to={notice.noticeTitle ?? ""}
            />
          ))}

        {type === "notice" && !isFetching && <div ref={ref} />}
      </div>
    </PaddingContainer>
  );
}
