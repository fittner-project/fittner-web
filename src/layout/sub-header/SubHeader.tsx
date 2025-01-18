import { chevronLeft } from "@/assets/assets";
import Image from "@/components/image/Image";

import { useNavigate } from "react-router-dom";
import styles from "./SubHeader.module.scss";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";

interface SubHeaderProps {
  fallback: string | "none";
}

export const SubHeader = ({ fallback }: SubHeaderProps) => {
  const { currentRoute } = useGetCurrentRoute();
  const rightSection = currentRoute?.subHeaderConfig?.rightSection;
  const navigate = useNavigate();

  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  const handleRightSectionClick = () => {
    switch (rightSection?.actionType) {
      case "exam1":
        // 예시 1 (actionType에 따른 기능 구현)
        break;

      default:
        break;
    }
  };

  return (
    <header className={styles.container}>
      <button onClick={handleBack} className={styles.back_button}>
        <Image src={chevronLeft} />
      </button>

      {rightSection && (
        <div className={styles.right_section}>
          {rightSection.type === "text" && (
            <p
              onClick={handleRightSectionClick}
              className={styles.right_section_text}
            >
              {rightSection.textContent}
            </p>
          )}
          {rightSection.type === "image" && rightSection.src && (
            <Image
              src={rightSection.src}
              onClick={handleRightSectionClick}
              className={styles.right_section_image}
            />
          )}
        </div>
      )}
    </header>
  );
};
