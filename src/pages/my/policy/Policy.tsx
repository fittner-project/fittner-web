import {
  useGetUserMyPageNotices,
  useGetUserMyPageTerms,
} from "@/api/generated/마이페이지/마이페이지";
import styles from "./Policy.module.scss";
import PolicyLink from "./components/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";

interface PolicyProps {
  type: "terms" | "notice";
}

export default function Policy({ type }: PolicyProps) {
  const { data: termsData } = useGetUserMyPageTerms({
    query: { enabled: type === "terms" },
  });
  const terms = termsData?.result;

  const { data: noticeData } = useGetUserMyPageNotices(
    {
      centerId: "1",
      pageable: {
        currentPageNo: 1,
      },
    },
    { query: { enabled: type === "notice" } }
  );

  const notice = noticeData?.result;

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
          notice?.map((notice) => (
            <PolicyLink
              key={notice.noticeTitle}
              date={notice.noticeDate ?? ""}
              title={notice.noticeTitle ?? ""}
              to={notice.noticeTitle ?? ""}
            />
          ))}
      </div>
    </PaddingContainer>
  );
}
