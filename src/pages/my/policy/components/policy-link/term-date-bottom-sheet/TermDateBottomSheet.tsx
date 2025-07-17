import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./TermDateBottomSheet.module.scss";
import useSelectedTermStore from "../../../stores/selected-term";
import { uniqueId } from "lodash";
import classNames from "classnames";

export default function TermDateBottomSheet() {
  const selectedTerm = useSelectedTermStore((state) => state.selectedTerm);
  const selectedTermDate = useSelectedTermStore(
    (state) => state.selectedTermDate
  );
  const setSelectedTermUrl = useSelectedTermStore(
    (state) => state.setSelectedTermUrl
  );
  const setSelectedTermDate = useSelectedTermStore(
    (state) => state.setSelectedTermDate
  );
  const dates = selectedTerm?.totalTermList?.map((term) => term.termsStartDate);

  const handleClickDate = (date: string) => {
    const term = selectedTerm?.totalTermList?.find(
      (term) => term.termsStartDate === date
    );

    if (term?.termsUrl) {
      setSelectedTermUrl(term.termsUrl);
      setSelectedTermDate(date);
    }
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>업데이트 내역</p>
        <div className={styles.date_container}>
          {dates?.map((date) => (
            <div
              key={uniqueId()}
              onClick={() => {
                if (date) {
                  handleClickDate(date);
                }
              }}
              className={classNames(styles.date, {
                [styles.active]: date === selectedTermDate,
              })}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
