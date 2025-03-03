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

interface IProps {
  children: ReactNode;
}

const EntryPoint: FC<IProps> = ({ children }) => {
  useAuthRouting();
  const location = useLocation();
  const { splashImgUrl } = useSplash();

  return (
    <Authorized>
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
    </Authorized>
  );
};

export default EntryPoint;

const Authorized = ({ children }: IProps) => {
  const currentMonthStart = dayjs().startOf("month").format("YYYY-MM-DD");
  const currentMonthEnd = dayjs().endOf("month").format("YYYY-MM-DD");

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setSelectedCenter = useUserStore((state) => state.setSelectedCenter);
  const setReservationColors = useUserStore(
    (state) => state.setReservationColors
  );
  const setCurrentMonthReservations = useUserStore(
    (state) => state.setCurrentMonthReservations
  );
  const { data } = useGetUserInfo({ query: { enabled: !!isAuthenticated } });
  const { data: reservations } = useGetUserReservations({
    //@ts-ignore
    reservationStartDate: currentMonthStart,
    reservationEndDate: currentMonthEnd,
  });
  const { data: reservationColors } = useGetUserReservationColors();

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
      setCurrentMonthReservations(reservations.result || []);
    }
  }, [reservations]);
  //인증이 된 이후 앱 전체 적용 로직들

  //브랜드별 컬러 API 작업이 끝나면 인증 후 여기서 받은 뒤 zustand에 저장하고 사용
  return <Fragment>{children}</Fragment>;
};

//로딩인디케이터, 모달 레이어 처리 등 전역적인 처리가 필요한경우 이곳에서
//기타 Provider적용이 필요한경우 이곳에서
