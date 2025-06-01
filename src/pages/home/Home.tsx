import { useNavigate } from "react-router-dom";
import Image from "@/components/image/Image";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import useCalendarStore from "@/store/calendar";

import styles from "./Home.module.scss";
import BackgroundContainer from "@/layout/containers/background-container/BackgroundContainer";

import {
  chevronRightGrey,
  dumbbell,
  main_calendar,
  main_registration,
  main_search,
  main_sign,
} from "@/assets/assets";
import Training from "@/components/training/Training";
import { MotionDiv } from "@/components/animation/Motion";
import PATH from "@/router/path";
import WeeklyCalendar from "./components/weekly-calendar/WeeklyCalendar";

function Home() {
  const navigate = useNavigate();
  const weeklyLessons = useCalendarStore((state) => state.weeklyLessons);

  // 오늘의 가장 가까운 수업 찾기
  const findNearestLesson = () => {
    const today = dayjs();
    const todayStr = today.format("DD"); // 오늘 날짜의 일자
    const currentTime = today.format("HHmm"); // 현재 시각 (예: "1430")

    // 오늘 날짜의 수업들 찾기
    const todayLessons =
      weeklyLessons.find((day) => day.lastTwoDigits === todayStr)
        ?.reservations || [];

    // 현재 시각 이후의 수업들만 필터링하고, 시작 시간이 가장 가까운 수업 찾기
    return todayLessons
      .filter((lesson) => (lesson?.reservationStartTime ?? 0) >= currentTime)
      .sort(
        (a, b) =>
          Number(a.reservationStartTime) - Number(b.reservationStartTime)
      )[0];
  };

  const nearestLesson = findNearestLesson();
  const today = dayjs().format("M월 D일");

  return (
    <BackgroundContainer>
      <MotionDiv className={styles.container}>
        <MotionDiv
          className={styles.dumbbell_container}
          transition={{ duration: 0.4, delay: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Image
            src={dumbbell}
            width={13.3}
            height={19}
            className={styles.dumbbell}
          />
        </MotionDiv>

        <MotionDiv
          className={styles.class_info}
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.day}>{today}</div>
          <div className={styles.guide}>
            {!nearestLesson ? (
              <>
                <span>등록된 수업</span>이 없어요!
              </>
            ) : (
              <>
                <span>{nearestLesson.ptnCnt}번째 </span>&nbsp; 수업이에요!
              </>
            )}
          </div>

          <Training lesson={nearestLesson} />
        </MotionDiv>

        <MotionDiv
          className={styles.calendar_container}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <WeeklyCalendar />
        </MotionDiv>

        <MotionDiv
          className={styles.menu_container}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div
            className={styles.my_class}
            onClick={() => navigate(PATH.MY_LESSONS)}
          >
            <div className={styles.menu_title}>
              나의 수업
              <Image src={chevronRightGrey} width={2} height={2} />
            </div>
            <div className={styles.menu_desc}>
              나의 수업을 등록해 <br />
              쉽게 관리해요!
            </div>
            <Image src={main_calendar} width={3.5} height={4} />
          </div>

          <div className={styles.registration_sign_container}>
            <div
              onClick={() => navigate(PATH.REGISTER_TRAINEE)}
              className={styles.registration}
            >
              <Image src={main_registration} width={3.5} height={3.2} />
              <div className={styles.menu_title}>
                회원 등록
                <Image src={chevronRightGrey} width={2} height={2} />
              </div>
            </div>

            <div
              onClick={() => navigate(PATH.SIGNATURE.LIST)}
              className={styles.sign}
            >
              <Image src={main_sign} width={4} height={4} />
              <div className={styles.menu_title}>
                서명 요청
                <Image src={chevronRightGrey} width={2} height={2} />
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          className={styles.search}
          transition={{ duration: 0.4, delay: 0.6 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate(PATH.MY.TRAINEE)}
        >
          <Image src={main_search} width={4.3} height={4.3} />
          <div className={styles.search_content}>
            <div className={styles.search_title}>회원정보</div>

            <div className={styles.search_desc}>
              내 회원 정보를 확인해보세요!
            </div>
          </div>

          <Image
            src={chevronRightGrey}
            width={2}
            height={2}
            className={styles.search_icon}
          />
        </MotionDiv>
      </MotionDiv>
    </BackgroundContainer>
  );
}

export default Home;
