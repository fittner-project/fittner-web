import classNames from "classnames";
import { clock } from "@/assets/assets";
import Column from "@/components/flex/Column";
import Picker from "react-mobile-picker";
import { useState } from "react";
import dayjs from "dayjs";

import styles from "./RegisterLessonDateTimePicker.module.scss";
import Row from "@/components/flex/Row";
import Image from "@/components/image/Image";
import { createDatePickerDates } from "@/utils/datePicker";
import { RegisterLessonValues } from "../../stores/registerLessonValues";

interface DateTimeState {
  date: { year: string; month: string; day: string };
  time: { period: string; hour: string; minute: string };
  showDatePicker: boolean;
  showTimePicker: boolean;
}

interface RegisterLessonDateTimePickerProps {
  registerLessonValues: RegisterLessonValues;
  setRegisterLessonValues: (values: Partial<RegisterLessonValues>) => void;
}

function RegisterLessonDateTimePicker({
  registerLessonValues,
  setRegisterLessonValues,
}: RegisterLessonDateTimePickerProps) {
  const dateOptions = createDatePickerDates();

  const timeOptions = {
    periods: ["오전", "오후"],
    hours: Array.from(
      { length: 12 },
      (_, i) => `${(i + 1).toString().padStart(2, "0")}`
    ),
    minutes: Array.from(
      { length: 60 },
      (_, i) => `${i.toString().padStart(2, "0")}`
    ),
  };

  const parseStoreDate = (dateStr: string) => {
    const date = dayjs(dateStr);
    return {
      year: date.format("YYYY"),
      month: date.format("MM"),
      day: date.format("DD"),
    };
  };

  const parseStoreTime = (timeStr: string) => {
    // "오전 09:30" 형식을 파싱
    const [period, time] = timeStr.split(" ");
    const [hour, minute] = time.split(":");
    return {
      period,
      hour,
      minute,
    };
  };

  // picker 형식을 스토어 형식으로 변환
  const formatStoreDate = (date: {
    year: string;
    month: string;
    day: string;
  }) => {
    return `${date.year}-${date.month}-${date.day}`;
  };

  const formatStoreTime = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    return `${time.period} ${time.hour}:${time.minute}`;
  };

  // 로컬 상태 (picker 표시용)
  const [start, setStart] = useState<DateTimeState>({
    date: parseStoreDate(
      registerLessonValues.reservationStartDate || dayjs().format("YYYY-MM-DD")
    ),
    time: parseStoreTime(
      registerLessonValues.reservationStartTime || "오전 09:00"
    ),
    showDatePicker: false,
    showTimePicker: false,
  });

  const [end, setEnd] = useState<DateTimeState>({
    date: parseStoreDate(
      registerLessonValues.reservationEndDate || dayjs().format("YYYY-MM-DD")
    ),
    time: parseStoreTime(
      registerLessonValues.reservationEndTime || "오전 09:00"
    ),
    showDatePicker: false,
    showTimePicker: false,
  });

  // 시간 표시 형식
  const formatTimeDisplay = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    return `${time.period} ${time.hour}:${time.minute}`;
  };

  // 스토어 업데이트 함수들
  const updateStartDate = (date: {
    year: string;
    month: string;
    day: string;
  }) => {
    setStart((prev) => ({ ...prev, date }));
    setRegisterLessonValues({
      reservationStartDate: formatStoreDate(date),
    });
  };

  const updateStartTime = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    setStart((prev) => ({ ...prev, time }));
    setRegisterLessonValues({
      reservationStartTime: formatStoreTime(time),
    });
  };

  const updateEndDate = (date: {
    year: string;
    month: string;
    day: string;
  }) => {
    setEnd((prev) => ({ ...prev, date }));
    setRegisterLessonValues({
      reservationEndDate: formatStoreDate(date),
    });
  };

  const updateEndTime = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    setEnd((prev) => ({ ...prev, time }));
    setRegisterLessonValues({
      reservationEndTime: formatStoreTime(time),
    });
  };

  return (
    <div className={styles.container}>
      <Column
        className={classNames(styles.category, styles.time)}
        justifyContent="space-between"
      >
        <Row
          gap={"1.3rem"}
          justifyContent="space-between"
          className={styles.time_row}
        >
          <Row gap={"1.3rem"}>
            <Image src={clock} width={2.3} height={2.3} />
            <p>시작</p>
          </Row>
          <Row className={styles.period} gap={"0.8rem"}>
            <div
              className={classNames(styles.date_selector, {
                [styles.active]: start.showDatePicker,
              })}
              onClick={() => {
                setStart((prev) => ({
                  ...prev,
                  showDatePicker: !prev.showDatePicker,
                  showTimePicker: false,
                }));
                setEnd((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: false,
                }));
              }}
            >
              {`${start.date.year}.${start.date.month}.${start.date.day}`}
            </div>
            <div
              className={classNames(styles.time_selector, {
                [styles.active]: start.showTimePicker,
              })}
              onClick={() => {
                setStart((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: !prev.showTimePicker,
                }));
                setEnd((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: false,
                }));
              }}
            >
              {formatTimeDisplay(start.time)}
            </div>
          </Row>
        </Row>
        <Row
          gap={"1.3rem"}
          className={styles.time_row}
          justifyContent="space-between"
        >
          <Row gap={"1.3rem"}>
            <p>종료</p>
          </Row>
          <Row className={styles.period} gap={"0.8rem"}>
            <div
              className={classNames(styles.date_selector, {
                [styles.active]: end.showDatePicker,
              })}
              onClick={() => {
                setEnd((prev) => ({
                  ...prev,
                  showDatePicker: !prev.showDatePicker,
                  showTimePicker: false,
                }));
                setStart((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: false,
                }));
              }}
            >
              {`${end.date.year}.${end.date.month}.${end.date.day}`}
            </div>
            <div
              className={classNames(styles.time_selector, {
                [styles.active]: end.showTimePicker,
              })}
              onClick={() => {
                setEnd((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: !prev.showTimePicker,
                }));
                setStart((prev) => ({
                  ...prev,
                  showDatePicker: false,
                  showTimePicker: false,
                }));
              }}
            >
              {formatTimeDisplay(end.time)}
            </div>
          </Row>
        </Row>
      </Column>

      {/* 시작 날짜 선택기 */}
      {start.showDatePicker && (
        <div className={styles.picker_container}>
          <Picker
            value={start.date}
            onChange={updateStartDate}
            height={120}
            itemHeight={40}
            className={styles.picker}
          >
            <Picker.Column name="year" className={styles.picker_column}>
              {dateOptions.years.map((year) => (
                <Picker.Item
                  key={year}
                  value={year}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {year}년
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="month" className={styles.picker_column}>
              {dateOptions.months.map((month) => (
                <Picker.Item
                  key={month}
                  value={month}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {month}월
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="day" className={styles.picker_column}>
              {dateOptions.days.map((day) => (
                <Picker.Item
                  key={day}
                  value={day}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {day}일
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}

      {/* 종료 날짜 선택기 */}
      {end.showDatePicker && (
        <div className={styles.picker_container}>
          <Picker
            value={end.date}
            onChange={updateEndDate}
            height={120}
            itemHeight={40}
            className={styles.picker}
          >
            <Picker.Column name="year" className={styles.picker_column}>
              {dateOptions.years.map((year) => (
                <Picker.Item
                  key={year}
                  value={year}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {year}년
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="month" className={styles.picker_column}>
              {dateOptions.months.map((month) => (
                <Picker.Item
                  key={month}
                  value={month}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {month}월
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="day" className={styles.picker_column}>
              {dateOptions.days.map((day) => (
                <Picker.Item
                  key={day}
                  value={day}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {day}일
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}

      {/* 시작 시간 선택기 */}
      {start.showTimePicker && (
        <div className={styles.picker_container}>
          <Picker
            value={start.time}
            onChange={updateStartTime}
            height={120}
            itemHeight={40}
            className={styles.picker}
          >
            <Picker.Column name="period" className={styles.picker_column}>
              {timeOptions.periods.map((period) => (
                <Picker.Item
                  key={period}
                  value={period}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {period}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="hour" className={styles.picker_column}>
              {timeOptions.hours.map((hour) => (
                <Picker.Item
                  key={hour}
                  value={hour}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {hour}시
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minute" className={styles.picker_column}>
              {timeOptions.minutes.map((minute) => (
                <Picker.Item
                  key={minute}
                  value={minute}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {minute}분
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}

      {/* 종료 시간 선택기 */}
      {end.showTimePicker && (
        <div className={styles.picker_container}>
          <Picker
            value={end.time}
            onChange={updateEndTime}
            height={120}
            itemHeight={40}
            className={styles.picker}
          >
            <Picker.Column name="period" className={styles.picker_column}>
              {timeOptions.periods.map((period) => (
                <Picker.Item
                  key={period}
                  value={period}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {period}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="hour" className={styles.picker_column}>
              {timeOptions.hours.map((hour) => (
                <Picker.Item
                  key={hour}
                  value={hour}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {hour}시
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minute" className={styles.picker_column}>
              {timeOptions.minutes.map((minute) => (
                <Picker.Item
                  key={minute}
                  value={minute}
                  className={styles.picker_item}
                >
                  {({ selected }) => (
                    <div className={selected ? styles.selected : ""}>
                      {minute}분
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}
    </div>
  );
}

export default RegisterLessonDateTimePicker;
