import { FC, Fragment, ReactNode } from "react";
import dayjs from "dayjs";
import { useIsFetching } from "@tanstack/react-query";

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
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
import { useGetUserCommonBrandColor } from "./api/generated/공통/공통";
import BrandColorProvider from "./components/brand-color-provider/BrandColorProvider";

interface IProps {
  children: ReactNode;
}

const EntryPoint: FC<IProps> = ({ children }) => {
  useAuthRouting();
  const location = useLocation();
  const { splashImgUrl } = useSplash();
  // const isFetching = useIsFetching();

  return (
    <Authorized>
      <BrandColorProvider>
        {/* {isFetching > 0 && <LoadingIndicator />} */}
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
        {children}
      </BrandColorProvider>
    </Authorized>
  );
};

export default EntryPoint;

const Authorized = ({ children }: IProps) => {
  const currentMonthStart = dayjs().startOf("month").format("YYYYMMDD");
  const currentMonthEnd = dayjs().endOf("month").format("YYYYMMDD");
  const currentWeekStart = dayjs().startOf("week").format("YYYYMMDD");
  const currentWeekEnd = dayjs().endOf("week").format("YYYYMMDD");

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setSelectedCenter = useUserStore((state) => state.setSelectedCenter);
  const setReservationColors = useUserStore(
    (state) => state.setReservationColors
  );
  const setLessons = useCalendarStore((state) => state.setLessons);
  const setWeeklyLessons = useCalendarStore((state) => state.setWeeklyLessons);
  const setBrandColors = useUserStore((state) => state.setBrandColors);
  const { data } = useGetUserInfo({ query: { enabled: !!isAuthenticated } });
  const { data: reservations } = useGetUserReservations(
    {
      //@ts-ignore
      reservationStartDate: currentMonthStart,
      reservationEndDate: currentMonthEnd,
    },
    {
      query: {
        enabled: !!isAuthenticated,
      },
    }
  );
  const { data: reservationColors } = useGetUserReservationColors({
    query: {
      enabled: !!isAuthenticated,
    },
  });
  const { data: brandColors } = useGetUserCommonBrandColor({
    query: {
      enabled: !!isAuthenticated,
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7일 동안 캐시 유지
    },
  });
  const { data: weeklyReservations } = useGetUserReservations(
    {
      //@ts-ignore
      reservationStartDate: currentWeekStart,
      reservationEndDate: currentWeekEnd,
    },
    {
      query: {
        enabled: !!isAuthenticated,
      },
    }
  );

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

  useEffect(() => {
    if (brandColors) {
      setBrandColors(brandColors.result || {});
    }
  }, [brandColors]);
  //인증이 된 이후 앱 전체 적용 로직들

  //브랜드별 컬러 API 작업이 끝나면 인증 후 여기서 받은 뒤 zustand에 저장하고 사용
  return <Fragment>{children}</Fragment>;
};

//로딩인디케이터, 모달 레이어 처리 등 전역적인 처리가 필요한경우 이곳에서
//기타 Provider적용이 필요한경우 이곳에서
