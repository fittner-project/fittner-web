import { FC, Fragment, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const EntryPoint: FC<IProps> = ({ children }) => {
  return <Authorized>{children}</Authorized>;
};

export default EntryPoint;

const Authorized = ({ children }: IProps) => {
  //인증이 된 이후 앱 전체 적용 로직들

  //브랜드별 컬러 API 작업이 끝나면 인증 후 여기서 받은 뒤 zustand에 저장하고 사용
  return <Fragment>{children}</Fragment>;
};

//로딩인디케이터, 모달 레이어 처리 등 전역적인 처리가 필요한경우 이곳에서
//기타 Provider적용이 필요한경우 이곳에서
