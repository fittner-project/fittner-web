import PolicyLink from "../components/policy-link/PolicyLink";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./TermsDetail.module.scss";
import useSelectedTermStore from "../store/selected-term";

export default function TermsDetail() {
  const { title } = useParams() as { title: string };
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get("date") as string;
  const selectedTerm = useSelectedTermStore((state) => state.selectedTerm);
  const selectedTermDate = useSelectedTermStore(
    (state) => state.selectedTermDate
  );
  const selectedTermUrl = useSelectedTermStore(
    (state) => state.selectedTermUrl
  );
  const initialTermUrl = selectedTerm?.totalTermList?.find(
    (term) => term.termsStartDate === initialDate
  )?.termsUrl;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <PolicyLink
          title={title}
          date={selectedTermDate || initialDate}
          type="term-detail"
        />
        <div className={styles.content}>
          <iframe
            key={selectedTermUrl || initialTermUrl}
            src={selectedTermUrl || initialTermUrl}
            allowFullScreen
            frameBorder="0"
            style={{
              width: "100%",
              height: "calc(100vh - 16.8rem)",
              WebkitOverflowScrolling: "touch",
              overflow: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </PaddingContainer>
  );
}
