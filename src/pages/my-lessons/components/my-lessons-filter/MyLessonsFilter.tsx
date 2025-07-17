import classNames from "classnames";
import styles from "./MyLessonsFilter.module.scss";
import Image from "@/components/image/Image";
import { registration } from "@/assets/assets";
import PATH from "@/router/path";

interface MyLessonsFilterProps {
  tabArray: ("today" | "weekly")[];
  activeFilter: "today" | "weekly";
  setActiveFilter: (activeFilter: "today" | "weekly") => void;
}

function MyLessonsFilter({
  tabArray,
  activeFilter,
  setActiveFilter,
}: MyLessonsFilterProps) {
  const navigate = useNavigate();
  const renderFilterText = (tab: "today" | "weekly") => {
    if (tab === "today") return "오늘";
    if (tab === "weekly") return "주별";
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter_container}>
        {tabArray.map((tab) => (
          <div
            onClick={() => setActiveFilter(tab)}
            className={classNames(styles.filter, {
              [styles.active]: activeFilter === tab,
            })}
          >
            {renderFilterText(tab)}
          </div>
        ))}
      </div>
      <Image
        src={registration}
        width={2.6}
        height={2.6}
        onClick={() => navigate(PATH.REGISTER_LESSON)}
      />
    </div>
  );
}

export default MyLessonsFilter;
