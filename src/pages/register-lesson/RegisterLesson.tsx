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
import Button from "@/components/button/Button";
import useRegisterLessonValuesStore from "./stores/registerLessonValues";

export type RegisterLessonForm = {
  // memberId: "1";
  // ticketId: "1";
  // reservationStartDate: "20250105";
  // reservationEndDate: "20250106";
  // reservationStartTime: "2030";
  // reservationEndTime: "2130";
  // reservationColor: "007AFF";
  // reservationPush: "before_5m";
  // reservationMemo: "예약 메모입니다.";
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

  const registerLessonValues = useRegisterLessonValuesStore(
    (state) => state.registerLessonValues
  );
  const setRegisterLessonValues = useRegisterLessonValuesStore(
    (state) => state.setRegisterLessonValues
  );
  const reset = useRegisterLessonValuesStore((state) => state.reset);

  useEffect(() => {
    if (
      !registerLessonValues.reservationStartDate ||
      !registerLessonValues.reservationEndDate
    ) {
      const currentDate = now.format("YYYY-MM-DD");
      const currentTime = `${nowPeriod} ${nowHour12}:${nowMinuteStr}`;

      setRegisterLessonValues({
        reservationStartDate: currentDate,
        reservationEndDate: currentDate,
        reservationStartTime: currentTime,
        reservationEndTime: currentTime,
      });
    }
  }, []);

  const navigate = useNavigate();
  const form = useForm<RegisterLessonForm>({
    mode: "onChange",
  });

  useEffect(() => {
    const handlePopState = () => {
      reset();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const pushTimeMap = {
    before_reservation: "시작 전",
    before_5m: "5분 전",
    before_10m: "10분 전",
    before_15m: "15분 전",
  };

  return (
    <PaddingContainer>
      <form className={styles.container}>
        <div className={styles.menu_container}>
          <Row
            onClick={() => {
              navigate({
                pathname: PATH.MY.TRAINEE_OR_TRAINER,
                search: `?type=trainee&select-type=select-member-register-lesson`,
              });
            }}
            className={styles.category}
            justifyContent="space-between"
          >
            <Row gap={"1.3rem"}>
              <Image src={user} width={2.3} height={2.3} />
              <p>
                {registerLessonValues.memberInfo?.memberName
                  ? registerLessonValues.memberInfo?.memberName
                  : "회원 선택"}
              </p>
            </Row>
            <Image src={chevronRightGrey} width={2.8} height={2.8} />
          </Row>

          <RegisterLessonDateTimePicker
            registerLessonValues={registerLessonValues}
            setRegisterLessonValues={setRegisterLessonValues}
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
              <p>
                {registerLessonValues.reservationColor?.colorName
                  ? registerLessonValues.reservationColor?.colorName
                  : "색상 태그"}
              </p>
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
              <p>
                {pushTimeMap[
                  registerLessonValues.reservationPushTime as keyof typeof pushTimeMap
                ] || "일정 알림"}
              </p>
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
        <Button fullWidth backgroundColor={"primary_1"}>
          등록
        </Button>
      </form>
    </PaddingContainer>
  );
}
