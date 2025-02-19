import dayjs from "dayjs";
import SignatureDateSwiper from "./components/signature-date-swiper/SignatureDateSwiper";
import styles from "./SignatureList.module.scss";

export default function SignatureList() {
  const generateDateArray = () => {
    const dates = [];
    const currentDate = dayjs();

    for (let i = 0; i < 120; i++) {
      dates.push(currentDate.subtract(i, "day").format("YYYYMMDD"));
    }

    return dates.reverse();
  };
  const dateArray = useMemo(() => generateDateArray(), []);
  const [activeDate, setActiveDate] = useState<string>(
    dateArray[dateArray.length - 1]
  );

  return (
    <div className={styles.container}>
      <SignatureDateSwiper
        dateArray={dateArray}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
    </div>
  );
}
