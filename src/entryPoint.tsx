import { FC, Fragment, ReactNode } from "react";
import dayjs from "dayjs";

import useAuthRouting from "./hooks/useAuthRouting";
import PATH from "./router/path";
import useSplash from "./hooks/useSplash";
import Image from "./components/image/Image";
import { useGetUserInfo } from "./api/generated/유저/유저";
import {
  useGetUserReservationColors,
  useGetUserReservations,
} from "./api/generated/수업/수업";
import useCalendarStore from "./store/calendar";
import { useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const EntryPoint: FC<IProps> = ({ children }) => {
  useAuthRouting();
  const location = useLocation();
  const { splashImgUrl } = useSplash();

  return (
    <>
      {location.pathname === PATH.ROOT && splashImgUrl && (
        <div style={{ width: "100dvw", height: "100dvh" }}>
          <Image
            src={splashImgUrl}
            alt="splash"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <AuthDataProvider>{children}</AuthDataProvider>
    </>
  );
};

// 인증된 사용자의 데이터만 관리하는 컴포넌트
const AuthDataProvider = ({ children }: IProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <>{children}</>; // 인증되지 않은 경우 데이터 로딩 없이 children만 렌더링
  }

  return <Authorized>{children}</Authorized>;
};

const Authorized = ({ children }: IProps) => {
  const currentMonthStart = dayjs().startOf("month").format("YYYYMMDD");
  const currentMonthEnd = dayjs().endOf("month").format("YYYYMMDD");
  const currentWeekStart = dayjs().startOf("week").format("YYYYMMDD");
  const currentWeekEnd = dayjs().endOf("week").format("YYYYMMDD");

  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setSelectedCenter = useUserStore((state) => state.setSelectedCenter);
  const setReservationColors = useUserStore(
    (state) => state.setReservationColors
  );
  const setLessons = useCalendarStore((state) => state.setLessons);
  const setWeeklyLessons = useCalendarStore((state) => state.setWeeklyLessons);
  const { data } = useGetUserInfo();
  const { data: reservations } = useGetUserReservations({
    //@ts-ignore
    reservationStartDate: currentMonthStart,
    reservationEndDate: currentMonthEnd,
  });
  const { data: reservationColors } = useGetUserReservationColors();
  const { data: weeklyReservations } = useGetUserReservations({
    //@ts-ignore
    reservationStartDate: currentWeekStart,
    reservationEndDate: currentWeekEnd,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data.result?.defaultInfo || {});
      setSelectedCenter(data.result?.centerInfo?.[0] || {});
    }
  }, [data]);

  useEffect(() => {
    if (reservationColors) {
      setReservationColors(reservationColors.result || {});
    }
  }, [reservationColors]);

  useEffect(() => {
    if (reservations) {
      setLessons(reservations.result || []);
    }
  }, [reservations]);

  useEffect(() => {
    if (weeklyReservations) {
      setWeeklyLessons(weeklyReservations.result || []);
    }
  }, [weeklyReservations]);

  return <Fragment>{children}</Fragment>;
};

//로딩인디케이터, 모달 레이어 처리 등 전역적인 처리가 필요한경우 이곳에서
//기타 Provider적용이 필요한경우 이곳에서

export default EntryPoint;
