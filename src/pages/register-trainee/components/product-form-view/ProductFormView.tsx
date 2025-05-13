import { UseFormReturn } from "react-hook-form";
import styles from "./ProductFormView.module.scss";
import { RegisterTraineeForm } from "../../RegisterTrainee";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Picker from "react-mobile-picker";
import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { chevronDownGrey } from "@/assets/assets";
import Image from "@/components/image/Image";
import { openBottomSheet } from "@/utils/bottomSheet";
import RegistrationPathBottomSheet from "../registration-path-bottom-sheet/RegistrationPathBottomSheet";
import { useNavigate } from "react-router-dom";
import TraineeConfirmBottomSheet from "../trainee-confirm-bottom-sheet/TraineeConfirmBottomSheet";

interface IProductFormViewProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

const createDateOptions = () => {
  const currentYear = dayjs().year();
  const years = Array.from(
    { length: currentYear - 2020 + 10 },
    (_, i) => `${2020 + i}`
  );
  const months = Array.from(
    { length: 12 },
    (_, i) => `${(i + 1).toString().padStart(2, "0")}`
  );
  const days = Array.from(
    { length: 31 },
    (_, i) => `${(i + 1).toString().padStart(2, "0")}`
  );

  return { years, months, days };
};

export default function ProductFormView({ form }: IProductFormViewProps) {
  const dateOptions = useMemo(() => createDateOptions(), []);

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
    const startDate = `${startPickerValue.year}${startPickerValue.month}${startPickerValue.day}`;
    const endDate = `${endPickerValue.year}${endPickerValue.month}${endPickerValue.day}`;

    form.setValue("productStartDate", startDate);
    form.setValue("productEndDate", endDate);
  };

  useEffect(() => {
    updateFormDates();
  }, [startPickerValue, endPickerValue]);

  const handleRegistrationPathSelect = (path: string) => {
    form.setValue("memberJoinPath", path);
  };

  const { watch } = form;

  const values = watch();

  const isFormComplete =
    values.productName?.trim() &&
    values.productStartDate?.trim() &&
    values.productEndDate?.trim() &&
    values.productCount &&
    values.productPrice;

  const handleProductConfirm = () => {
    openBottomSheet({
      component: TraineeConfirmBottomSheet,
      props: {
        form,
      },
    });
  };

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
            required: true,
          })}
          placeholder="회원 메모를 입력해주세요"
        />
      </div>

      <div
        className={styles.field}
        onClick={() => {
          openBottomSheet({
            component: RegistrationPathBottomSheet,
            props: {
              onSelect: handleRegistrationPathSelect,
            },
          });
        }}
      >
        <p className={styles.title}>가입 경로</p>
        <Input
          inputType="line"
          maxLength={0}
          readOnly
          className={styles.name_input}
          {...form.register("memberJoinPath", {
            required: true,
          })}
          placeholder="가입 경로를 선택해주세요"
          endAdornment={
            <div>
              <Image
                src={chevronDownGrey}
                alt="arrow"
                width={2.8}
                height={2.8}
                className={styles.arrow}
              />
            </div>
          }
        />
      </div>

      <div className={styles.button_container}>
        <Button
          type="button"
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={!isFormComplete}
          onClick={handleProductConfirm}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
