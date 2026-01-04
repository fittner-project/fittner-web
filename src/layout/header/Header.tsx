import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { ReactNode } from "react";
import { bell, chevron_down } from "@/assets/assets";
import Image from "@/components/image/Image";
import useAppStore from "@/stores/app";
import { openBottomSheet } from "@/utils/bottomSheet";
import ChangeCenterBottomSheet from "./change-center-bottom-sheet/ChangeCenterBottomSheet";
import PATH from "@/router/path";

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

    openBottomSheet({ component: ChangeCenterBottomSheet });
  };

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
        <button
          onClick={() => navigate(PATH.NOTIFICATION_HISTORY)}
          className={styles.bell_button}
        >
          <Image src={bell} width={2.4} height={2.4} />
        </button>
      </div>
    </div>
  );
}
