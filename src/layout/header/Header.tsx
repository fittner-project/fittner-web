import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { ReactNode } from "react";
import { bell, chevron_down } from "@/assets/assets";
import Image from "@/components/image/Image";
import { storage } from "@/utils/storage";
import { storageKeys } from "@/constants/storageKeys";

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
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);

  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  useEffect(() => {
    // 메인 헤더에서 선택된 centerId 여기서 스토리지에 넣어주세용.
    // 이건 그냥 예시로 1로 넣었음.

    storage.set({
      key: storageKeys.activeCenterId,
      value: "1",
      type: "local",
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {/* Todo:회원가입 시 선택한 디폴트 센터로 초기값, 전역 관리 + 선택한 센터 바꿀때마다 해당 센터로 변경, 전역 관리 */}
        <p>
          {type === "center"
            ? (userInfo?.centerInfo?.[0]?.centerName ?? "센터 정보 없음")
            : (userInfo?.defaultInfo?.trainerName ?? "트레이너 정보 없음")}
        </p>

        <Image src={chevron_down} width={2.7} height={2.7} />
      </div>

      <div className={styles.ico}>
        <Image src={bell} width={2.4} height={2.4} />
      </div>
    </div>
  );
}
