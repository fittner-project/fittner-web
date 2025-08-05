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
  imageClose,
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
import { usePostUserReservation } from "@/api/generated/수업/수업";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterLesson() {
  const getPeriod = (hour: number) => (hour < 12 ? "오전" : "오후");
  const get12Hour = (hour: number) => {
    const h = hour % 12;
    return h === 0 ? "12" : h.toString().padStart(2, "0");
  };
  const nowHour = dayjs().hour();
  const nowMinute = dayjs().minute();
  const nowPeriod = getPeriod(nowHour);
  const nowHour12 = get12Hour(nowHour);
  const nowMinuteStr = nowMinute.toString().padStart(2, "0");

  const queryClient = useQueryClient();

  const { mutate: registerLesson } = usePostUserReservation({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/api/v1/user/reservations"],
        });

        openModal({
          component: SuccessModal,
          props: {
            successMessage: "수업등록이 \n 완료 되었습니다",
            onCloseComplete: () => {
              navigate(-1);
            },
          },
        });
      },
    },
  });

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
      const currentDate = dayjs().format("YYYY-MM-DD");
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
      <div className={styles.container}>
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
            {registerLessonValues.reservationMemo ? (
              <Image
                onClick={(e) => {
                  e.stopPropagation();
                  setRegisterLessonValues({ reservationMemo: "" });
                }}
                src={imageClose}
                width={2}
                height={2}
              />
            ) : (
              <Image src={plus} width={2.8} height={2.8} />
            )}
          </Row>

          {registerLessonValues.reservationMemo && (
            <p className={styles.memo}>
              {registerLessonValues.reservationMemo}
            </p>
          )}
        </div>
        <Button
          onClick={() => {
            const formatDate = (dateStr: string) => {
              return dayjs(dateStr).format("YYYYMMDD");
            };

            const formatTime = (timeStr: string) => {
              const [period, time] = timeStr.split(" ");
              const [hour, minute] = time.split(":");

              let hour24 = parseInt(hour);
              if (period === "오후" && hour24 !== 12) {
                hour24 += 12;
              } else if (period === "오전" && hour24 === 12) {
                hour24 = 0;
              }

              return `${hour24.toString().padStart(2, "0")}${minute}`;
            };

            registerLesson({
              data: {
                memberId: registerLessonValues.memberInfo?.memberId,
                reservationStartDate: formatDate(
                  registerLessonValues.reservationStartDate
                ),
                reservationEndDate: formatDate(
                  registerLessonValues.reservationEndDate
                ),
                reservationStartTime: formatTime(
                  registerLessonValues.reservationStartTime
                ),
                reservationEndTime: formatTime(
                  registerLessonValues.reservationEndTime
                ),
                reservationColor:
                  registerLessonValues.reservationColor?.colorHex,
                reservationPush: registerLessonValues.reservationPushTime,
                reservationMemo: registerLessonValues.reservationMemo,
              },
            });
          }}
          disabled={
            !registerLessonValues.memberInfo ||
            !registerLessonValues.reservationColor ||
            !registerLessonValues.reservationPushTime
          }
          fullWidth
          backgroundColor={"primary_1"}
        >
          등록
        </Button>
      </div>
    </PaddingContainer>
  );
}
