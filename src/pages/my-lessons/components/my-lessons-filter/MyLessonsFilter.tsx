import classNames from "classnames";
import styles from "./MyLessonsFilter.module.scss";
import { Dispatch, SetStateAction } from "react";

interface MyLessonsFilterProps {
  tabArray: ("today" | "weekly")[];
  activeFilter: "today" | "weekly";
  setActiveFilter: Dispatch<SetStateAction<"today" | "weekly">>;
}

function MyLessonsFilter({
  tabArray,
  activeFilter,
  setActiveFilter,
}: MyLessonsFilterProps) {
  const renderFilterText = (tab: "today" | "weekly") => {
    if (tab === "today") return "오늘";
    if (tab === "weekly") return "주별";
  };

  return (
    <div className={styles.container}>
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
  );
}

export default MyLessonsFilter;
