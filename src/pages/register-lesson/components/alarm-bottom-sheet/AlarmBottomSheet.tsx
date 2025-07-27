import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AlarmBottomSheet.module.scss";
import { uniqueId } from "lodash";
import { useState } from "react";
import classNames from "classnames";

function AlarmBottomSheet() {
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");
  const alarmList = [
    {
      text: "시작 전",
    },
    {
      text: "5분 전",
    },
    {
      text: "10분 전",
    },
    {
      text: "15분 전",
    },
  ];

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>일정 알림</p>
        <div className={styles.alarm_container}>
          {alarmList.map((alarm) => (
            <div
              key={uniqueId()}
              onClick={() => setSelectedAlarm(alarm.text)}
              className={classNames(styles.alarm, {
                [styles.selected]: selectedAlarm === alarm.text,
              })}
            >
              {alarm.text}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

export default AlarmBottomSheet;
