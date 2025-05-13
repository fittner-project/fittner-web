import { useForm, UseFormReturn } from "react-hook-form";
import styles from "./ExtraRegisterTicketFormView.module.scss";
// import { RegisterTraineeForm } from "../../RegisterTrainee";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Picker from "react-mobile-picker";
import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import classNames from "classnames";

import { MotionDiv } from "@/components/animation/Motion";
import { openBottomSheet } from "@/utils/bottomSheet";
import ExtraTicketConfirmBottomSheet from "./extra-ticket-confirm--bottom-sheet/ExtraTicketConfirmBottomSheet";
import { createDatePickerDates } from "@/utils/datePicker";

export type ExtraRegisterTicketForm = {
  productName: string;
  productStartDate: string;
  productEndDate: string;
  productCount: number;
  productPrice: number;
  memberMemo: string;
};

export default function ExtraRegisterTicketFormView() {
  const form = useForm<ExtraRegisterTicketForm>({
    mode: "onChange",
  });
  const dateOptions = useMemo(() => createDatePickerDates(), []);

  const today = dayjs();
  const [startPickerValue, setStartPickerValue] = useState({
    year: today.format("YYYY"),
    month: today.format("MM"),
    day: today.format("DD"),
  });

  const [endPickerValue, setEndPickerValue] = useState({
    year: today.format("YYYY"),
    month: today.format("MM"),
    day: today.format("DD"),
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const updateFormDates = () => {
    const startDate = `${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}`;
    const endDate = `${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}`;

    form.setValue("productStartDate", startDate);
    form.setValue("productEndDate", endDate);
  };

  useEffect(() => {
    updateFormDates();
  }, [startPickerValue, endPickerValue]);

  const { watch } = form;

  const values = watch();

  const isFormComplete =
    values.productName?.trim() &&
    values.productStartDate?.trim() &&
    values.productEndDate?.trim() &&
    values.productCount &&
    values.productPrice;

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.title}>상품명</p>
        <Input
          inputType="line"
          maxLength={30}
          className={styles.name_input}
          {...form.register("productName", {
            required: true,
          })}
          placeholder="상품명을 입력해주세요"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>기간</p>
        <div className={styles.period}>
          <div
            className={classNames(styles.date_selector, {
              [styles.active]: showStartPicker,
            })}
            onClick={() => {
              setShowStartPicker(true);
              setShowEndPicker(false);
            }}
          >
            {`${startPickerValue.year}.${startPickerValue.month}.${startPickerValue.day}`}
          </div>
          <div className={styles.date_separator}>-</div>
          <div
            className={classNames(styles.date_selector, {
              [styles.active]: showEndPicker,
            })}
            onClick={() => {
              setShowStartPicker(false);
              setShowEndPicker(true);
            }}
          >
            {`${endPickerValue.year}.${endPickerValue.month}.${endPickerValue.day}`}
          </div>
        </div>

        {showStartPicker && (
          <div className={styles.picker_container}>
            <Picker
              value={startPickerValue}
              onChange={setStartPickerValue}
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
                      <div
                        className={classNames(styles.year, {
                          [styles.selected]: selected,
                        })}
                      >
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
                      <div
                        className={classNames(styles.day, {
                          [styles.selected]: selected,
                        })}
                      >
                        {day}일
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </div>
        )}

        {showEndPicker && (
          <div className={styles.picker_container}>
            <Picker
              value={endPickerValue}
              onChange={setEndPickerValue}
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
                      <div
                        className={classNames(styles.year, {
                          [styles.selected]: selected,
                        })}
                      >
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
                      <div
                        className={classNames(styles.day, {
                          [styles.selected]: selected,
                        })}
                      >
                        {day}일
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </div>
        )}
      </div>

      <div className={styles.field}>
        <p className={styles.title}>수업횟수</p>
        <Input
          inputType="line"
          maxLength={3}
          className={styles.name_input}
          {...form.register("productCount", {
            required: true,
          })}
          placeholder="수업횟수를 입력해주세요 (회)"
          type="number"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>금액</p>
        <Input
          inputType="line"
          maxLength={10}
          className={styles.name_input}
          {...form.register("productPrice", {
            required: true,
          })}
          placeholder="금액을 입력해주세요 (원)"
          type="number"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>메모</p>
        <Input
          inputType="line"
          maxLength={100}
          className={styles.name_input}
          {...form.register("memberMemo", {
            required: false,
          })}
          placeholder="회원 메모를 입력해주세요"
        />
      </div>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className={styles.button_container}
      >
        <Button
          type="button"
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={!isFormComplete}
          onClick={() => {
            openBottomSheet({
              component: ExtraTicketConfirmBottomSheet,
              props: {
                form,
              },
            });
          }}
        >
          등록
        </Button>
      </MotionDiv>
    </div>
  );
}
