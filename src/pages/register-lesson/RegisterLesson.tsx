import { useForm } from "react-hook-form";
import styles from "./RegisterLesson.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import { MotionDiv } from "@/components/animation/Motion";
import Row from "@/components/flex/Row";
import Image from "@/components/image/Image";
import {
  alaram,
  chevronRightGrey,
  clock,
  tag,
  user,
  memo,
  plus,
} from "@/assets/assets";
import classNames from "classnames";
import Column from "@/components/flex/Column";
import dayjs from "dayjs";

export type RegisterLessonForm = {
  //   memberName: string;
  //   memberPhone: string;
  //   memberGender: "M" | "F";
  //   memberBirth: string;
  //   memberAddress: string;
};

export default function RegisterLesson() {
  const today = dayjs();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
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

  const navigate = useNavigate();
  const form = useForm<RegisterLessonForm>({
    mode: "onChange",
  });

  return (
    <PaddingContainer>
      <form className={styles.container}>
        <MotionDiv
          className={styles.menu_container}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Row className={styles.category} justifyContent="space-between">
            <Row gap={"1.3rem"}>
              <Image src={user} width={2.3} height={2.3} />
              <p>회원 선택</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

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
                    [styles.active]: showStartPicker,
                  })}
                  onClick={() => {
                    setShowStartPicker(true);
                    setShowEndPicker(false);
                  }}
                >
                  {`${startPickerValue.year}.${startPickerValue.month}.${startPickerValue.day}`}
                </div>
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
                    [styles.active]: showStartPicker,
                  })}
                  onClick={() => {
                    setShowStartPicker(true);
                    setShowEndPicker(false);
                  }}
                >
                  {`${startPickerValue.year}.${startPickerValue.month}.${startPickerValue.day}`}
                </div>
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
              </Row>
            </Row>
          </Column>

          <Row className={styles.category} justifyContent="space-between">
            <Row gap={"1.3rem"}>
              <Image src={tag} width={2.3} height={2.3} />
              <p>색상 태그</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <Row className={styles.category} justifyContent="space-between">
            <Row gap={"1.3rem"}>
              <Image src={alaram} width={2.3} height={2.3} />
              <p>일정 알림</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <Row className={styles.category} justifyContent="space-between">
            <Row gap={"1.3rem"}>
              <Image src={memo} width={2.3} height={2.3} />
              <p>메모</p>
            </Row>
            <Image src={plus} width={2.8} height={2.8} />
          </Row>
        </MotionDiv>
      </form>
    </PaddingContainer>
  );
}
