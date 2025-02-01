import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { ReactNode } from "react";
import { bell } from "@/assets/assets";
import Image from "@/components/image/Image";
import { storage } from "@/utils/storage";
import { storageKeys } from "@/constants/storageKeys";

interface HeaderProps {
  fallback: string | "none";
  title?: string | ReactNode;
}

export default function Header({ fallback, title }: HeaderProps) {
  const navigate = useNavigate();

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
      <div className={styles.title}>{title ?? "아워피트니스 1호점"}</div>

      <div className={styles.ico}>
        <Image src={bell} width={2.4} height={2.4} />
      </div>
    </div>
  );
}
