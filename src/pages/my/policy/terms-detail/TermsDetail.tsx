import PolicyLink from "../components/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./TermsDetail.module.scss";

export default function TermsDetail() {
  const { title } = useParams() as { title: string };
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") as string;
  const urls = searchParams.get("urls")?.split(",") ?? [];

  return (
    <PaddingContainer>
      <PolicyLink title={title} date={date} type="detail" />
      <div className={styles.content}>
        {urls.map((url, index) => (
          <iframe
            key={`${url}-${index}`}
            src={url}
            frameBorder="0"
            width="100%"
            height="100%"
            style={{
              marginBottom: index < urls.length - 1 ? "20px" : "0",
            }}
          />
        ))}
      </div>
    </PaddingContainer>
  );
}
