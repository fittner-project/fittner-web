import { useForm } from "react-hook-form";
import styles from "./RegisterLesson.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Row from "@/components/flex/Row";
import Image from "@/components/image/Image";
import {
  alaram,
  chevronRightGrey,
  tag,
  user,
  memo,
  plus,
} from "@/assets/assets";

import dayjs from "dayjs";
import PATH from "@/router/path";
import RegisterLessonDateTimePicker from "./components/register-lesson-date-time-picker/RegisterLessonDateTimePicker";
import { openBottomSheet } from "@/utils/bottomSheet";
import ColorTagBottomSheet from "./components/color-tag-bottom-sheet/ColorTagBottomSheet";
import AlarmBottomSheet from "./components/alarm-bottom-sheet/AlarmBottomSheet";
import MemoBottomSheet from "./components/memo-bottom-sheet/MemoBottomSheet";

export type RegisterLessonForm = {
  //   memberName: string;
  //   memberPhone: string;
  //   memberGender: "M" | "F";
  //   memberBirth: string;
  //   memberAddress: string;
};

export default function RegisterLesson() {
  const now = dayjs();
  const getPeriod = (hour: number) => (hour < 12 ? "오전" : "오후");
  const get12Hour = (hour: number) => {
    const h = hour % 12;
    return h === 0 ? "12" : h.toString().padStart(2, "0");
  };
  const nowHour = now.hour();
  const nowMinute = now.minute();
  const nowPeriod = getPeriod(nowHour);
  const nowHour12 = get12Hour(nowHour);
  const nowMinuteStr = nowMinute.toString().padStart(2, "0");

  const [start, setStart] = useState({
    date: {
      year: now.format("YYYY"),
      month: now.format("MM"),
      day: now.format("DD"),
    },
    time: {
      period: nowPeriod,
      hour: nowHour12,
      minute: nowMinuteStr,
    },
    showDatePicker: false,
    showTimePicker: false,
  });

  const [end, setEnd] = useState({
    date: {
      year: now.format("YYYY"),
      month: now.format("MM"),
      day: now.format("DD"),
    },
    time: {
      period: nowPeriod,
      hour: nowHour12,
      minute: nowMinuteStr,
    },
    showDatePicker: false,
    showTimePicker: false,
  });

  const navigate = useNavigate();
  const form = useForm<RegisterLessonForm>({
    mode: "onChange",
  });

  return (
    <PaddingContainer>
      <form className={styles.container}>
        <div className={styles.menu_container}>
          <Row
            onClick={() => {
              navigate({
                pathname: PATH.MY.TRAINEE_OR_TRAINER,
                search: `?select=trainee&select-type=register-lesson`,
              });
            }}
            className={styles.category}
            justifyContent="space-between"
          >
            <Row gap={"1.3rem"}>
              <Image src={user} width={2.3} height={2.3} />
              <p>회원 선택</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <RegisterLessonDateTimePicker
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
          />

          <Row
            onClick={() => {
              openBottomSheet({
                component: ColorTagBottomSheet,
              });
            }}
            className={styles.category}
            justifyContent="space-between"
          >
            <Row gap={"1.3rem"}>
              <Image src={tag} width={2.3} height={2.3} />
              <p>색상 태그</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <Row
            onClick={() => {
              openBottomSheet({
                component: AlarmBottomSheet,
              });
            }}
            className={styles.category}
            justifyContent="space-between"
          >
            <Row gap={"1.3rem"}>
              <Image src={alaram} width={2.3} height={2.3} />
              <p>일정 알림</p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <Row
            onClick={() => {
              openBottomSheet({
                component: MemoBottomSheet,
              });
            }}
            className={styles.category}
            justifyContent="space-between"
          >
            <Row gap={"1.3rem"}>
              <Image src={memo} width={2.3} height={2.3} />
              <p>메모</p>
            </Row>
            <Image src={plus} width={2.8} height={2.8} />
          </Row>
        </div>
      </form>
    </PaddingContainer>
  );
}
