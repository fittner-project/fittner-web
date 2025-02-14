import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./RevenueTraineeDetail.module.scss";
import classNames from "classnames";
import TraineeRevenueList from "./components/trainee-revenue-list/TraineeRevenueList";

export default function RevenueTraineeDetail() {
  const filterButtonsArr = ["이번 달", "전체"];
  const [activeFilter, setActiveFilter] = useState(filterButtonsArr[0]);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.filter}>
          <p className={styles.title}>수익금 내역</p>
          <div className={styles.filter_buttons}>
            {filterButtonsArr.map((button) => (
              <button
                onClick={() => setActiveFilter(button)}
                key={button}
                className={classNames(styles.filter_button, {
                  [styles.active]: activeFilter === button,
                })}
              >
                {button}
              </button>
            ))}
          </div>
        </div>

        <TraineeRevenueList />
        <TraineeRevenueList />
      </div>
    </PaddingContainer>
  );
}
