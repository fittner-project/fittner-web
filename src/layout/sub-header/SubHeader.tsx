import { chevronLeft } from "@/assets/assets";
import Image from "@/components/image/Image";

import { useNavigate } from "react-router-dom";
import styles from "./SubHeader.module.scss";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";

import useAuthStore from "@/store/auth";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "@/pages/center-list/components/approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";
import PATH from "@/router/path";
interface SubHeaderProps {
  fallback: string | "none";
}

export const SubHeader = ({ fallback }: SubHeaderProps) => {
  const { currentRoute } = useGetCurrentRoute();
  const rightSection = currentRoute?.subHeaderConfig?.rightSection;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleBack = () => {
    if (fallback === "none") navigate(-1);
    else navigate(fallback);
  };

  const handleRightSectionClick = () => {
    switch (rightSection?.actionType) {
      case "add-center":
        if (isAuthenticated) {
          return navigate(PATH.FIND_CENTERS);
        }
        if (!isAuthenticated) {
          return openBottomSheet({
            component: ApprovalNoticeBottomSheet,
          });
        }
        break;

      default:
        break;
    }
  };

  let showBackButton = true;
  if (currentRoute?.name === "center-list" && !isAuthenticated) {
    showBackButton = false;
  }

  return (
    <header className={styles.container}>
      {showBackButton && (
        <button onClick={handleBack} className={styles.back_button}>
          <Image src={chevronLeft} />
        </button>
      )}

      {rightSection && (
        <div onClick={handleRightSectionClick} className={styles.right_section}>
          {rightSection.type === "text" && (
            <p className={styles.right_section_text}>
              {rightSection.textContent}
            </p>
          )}
          {rightSection.type === "image" && rightSection.src && (
            <Image
              src={rightSection.src}
              width={rightSection.imageWidth}
              height={rightSection.imageHeight}
              className={styles.right_section_image}
            />
          )}
        </div>
      )}
    </header>
  );
};
