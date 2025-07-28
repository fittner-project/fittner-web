import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AlarmBottomSheet.module.scss";
import { uniqueId } from "lodash";

import classNames from "classnames";
import useRegisterLessonValuesStore from "../../stores/registerLessonValues";
import { closeBottomSheet } from "@/utils/bottomSheet";

function AlarmBottomSheet() {
  const registerLessonValues = useRegisterLessonValuesStore(
    (state) => state.registerLessonValues
  );
  const setRegisterLessonValues = useRegisterLessonValuesStore(
    (state) => state.setRegisterLessonValues
  );
  const alarmList = [
    {
      text: "시작 전",
      value: "before_reservation",
    },
    {
      text: "5분 전",
      value: "before_5m",
    },
    {
      text: "10분 전",
      value: "before_10m",
    },
    {
      text: "15분 전",
      value: "before_15m",
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
              onClick={() => {
                setRegisterLessonValues({
                  reservationPushTime: alarm.value,
                });
              }}
              className={classNames(styles.alarm, {
                [styles.selected]:
                  registerLessonValues.reservationPushTime === alarm.value,
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
