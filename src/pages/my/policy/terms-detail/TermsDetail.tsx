import PolicyLink from "../components/policy-link/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./TermsDetail.module.scss";

export default function TermsDetail() {
  const { title } = useParams() as { title: string };
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") as string;
  const urls = searchParams.get("urls")?.split(",") ?? [];

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <PolicyLink title={title} date={date} type="detail" />
        <div className={styles.content}>
          {urls.map((url, index) => (
            <iframe
              key={`${url}-${index}`}
              src={url}
              allowFullScreen
              frameBorder="0"
              style={{
                width: "100%",
                height: "50rem",
                marginBottom: index === urls.length - 1 ? "0" : "20px",
              }}
            />
          ))}
        </div>
      </div>
    </PaddingContainer>
  );
}
