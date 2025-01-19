import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { ReactNode } from "react";
import { bell } from "@/assets/assets";
import Image from "@/components/image/Image";

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

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title ?? "아워피트니스 1호점"}</div>

      <div className={styles.ico}>
        <Image src={bell} width={2.3} height={2.3} />
      </div>
    </div>
  );
}
