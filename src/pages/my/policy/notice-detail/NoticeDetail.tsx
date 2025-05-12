import PolicyLink from "../components/policy-link/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./NoticeDetail.module.scss";

export default function NoticeDetail() {
  const { title } = useParams() as { title: string };
  const [searchParams] = useSearchParams();
  const content = searchParams.get("content") as string;
  const date = searchParams.get("date") as string;

  return (
    <PaddingContainer>
      <PolicyLink title={title} date={date} to={content} type="notice-detail" />
      <p className={styles.content}>{content}</p>
    </PaddingContainer>
  );
}
