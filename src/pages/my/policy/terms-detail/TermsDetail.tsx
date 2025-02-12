import PolicyLink from "../components/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./TermsDetail.module.scss";

export default function TermsDetail() {
  const { title } = useParams() as { title: string };
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") as string;
  const url = searchParams.get("url") as string;

  return (
    <PaddingContainer>
      <PolicyLink title={title} date={date} type="detail" />
      <p className={styles.content}>
        <iframe src={url} frameBorder="0" width="100%" />
      </p>
    </PaddingContainer>
  );
}
