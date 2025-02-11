import dayjs from "dayjs";
import Revenue from "../components/revenue/Revenue";

export default function RevenueDetail() {
  const generateDateArray = () => {
    console.log("함수 호출!");
    const dates = [];
    const currentDate = dayjs();

    for (let i = 0; i < 60; i++) {
      dates.push(currentDate.subtract(i, "month").format("YYYY년 MM월"));
    }

    return dates.reverse();
  };

  const dateArray = useMemo(() => generateDateArray(), []);
  const [activeDate, setActiveDate] = useState<string>(
    dateArray[dateArray.length - 1]
  );

  return (
    <div>
      <Revenue
        type="detail"
        dateArray={dateArray}
        setActiveDate={setActiveDate}
      />
    </div>
  );
}
