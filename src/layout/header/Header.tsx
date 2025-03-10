import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { ReactNode } from "react";
import { bell, chevron_down } from "@/assets/assets";
import Image from "@/components/image/Image";
import { storage } from "@/utils/storage";
import { storageKeys } from "@/constants/storageKeys";
import PATH from "@/router/path";
import useAppStore from "@/store/app";
interface HeaderProps {
  fallback: string | "none";
  title?: string | ReactNode;
  type?: "center" | "trainer";
}

export default function Header({
  fallback,
  title,
  type = "center",
}: HeaderProps) {
  const injectedBackFunction = useAppStore(
    (state) => state.injectedBackFunction
  );

  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const selectedCenter = useUserStore((state) => state.selectedCenter);
  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  const handleNavigateCenterList = () => {
    if (injectedBackFunction) {
      injectedBackFunction();
      return;
    }
    navigate(PATH.CENTER_LIST);
  };

  console.log(selectedCenter);

  return (
    <div className={styles.container}>
      <div onClick={handleNavigateCenterList} className={styles.title}>
        {/* Todo:회원가입 시 선택한 디폴트 센터로 초기값, 전역 관리 + 선택한 센터 바꿀때마다 해당 센터로 변경, 전역 관리 */}
        <p>
          {type === "center"
            ? (selectedCenter.centerName ?? "센터 정보 없음")
            : (userInfo?.trainerName ?? "트레이너 정보 없음")}
        </p>

        <Image src={chevron_down} width={2.7} height={2.7} />
      </div>

      <div className={styles.ico}>
        <Image src={bell} width={2.4} height={2.4} />
      </div>
    </div>
  );
}
