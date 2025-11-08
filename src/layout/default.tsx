import EntryPoint from "@/entryPoint";
import { AnimatePresence, motion } from "framer-motion";

import { Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/user";
import ModalManager from "@/components/modal/modal-manager/ModalManager";

import Header from "./header/Header";
import { SubHeader } from "./sub-header/SubHeader";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";
import BottomSheetManager from "@/components/bottom-sheet/bottom-sheet-manager/BottomSheetManager";
import SubSearchHeader from "./sub-search-header/SubSearchHeader";
import SubMyHeader from "./sub-my-header/SubMyHeader";
import Navigation from "./navigation/Navigation";
import ImageViewerManager from "@/components/image-viewer/image-viewer-manager/ImageViewerManager";

import usePullToRefresh from "@/hooks/usePullToRefresh";
import useFcmToken from "@/hooks/useFcmToken";
import { useFcmTokenStore } from "@/stores/fcmToken";
import useFcmNavigation from "@/hooks/useFcmNavigation";

export default function RootLayout() {
  const { currentRoute } = useGetCurrentRoute();
  const brandColors = useUserStore((state) => state.brandColors);
  const { isRefreshing, pullDistance, containerRef, isPulling } =
    usePullToRefresh();
  const fcmToken = useFcmTokenStore((state) => state.fcmToken);
  useFcmToken();
  const location = useLocation();

  // FCM 푸시 메시지 네비게이션 처리
  useFcmNavigation();

  // useEffect(() => {
  //   if (fcmToken) alert(`fcmToken: ${fcmToken}`);
  // }, [fcmToken]);

  const renderHeader = () => {
    if (!currentRoute || currentRoute.headerType === "none") {
      return;
    }

    if (currentRoute.headerType === "default")
      return <Header fallback={currentRoute.fallback} />;
    if (currentRoute.headerType === "sub")
      return <SubHeader fallback={currentRoute.fallback} />;
    if (currentRoute.headerType === "sub-search")
      return <SubSearchHeader fallback={currentRoute.fallback} />;
    if (currentRoute.headerType === "sub-my") return <SubMyHeader />;
  };

  const renderNav = () => {
    if (!currentRoute || currentRoute.navType === "none") {
      return;
    }
    if (currentRoute.navType === "default") return <Navigation />;
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      transform: "translateY(2rem)",
      transition: {
        duration: 0.3,
      },
    },
    in: {
      opacity: 1,
      transform: "translateY(0)",
      transition: {
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      transform: "translateY(-2rem)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <EntryPoint>
        {renderHeader()}
        <div
          ref={containerRef}
          style={{
            paddingBottom: currentRoute?.navType !== "none" ? "7rem" : "0",
            transform: isPulling.current
              ? `translateY(${pullDistance}px)`
              : "none",
            transition: isRefreshing ? "transform 0.3s ease" : "none",
          }}
        >
          {isPulling.current && (
            <div
              style={{
                position: "absolute",
                top: "-5.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                color: brandColors.primary,
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              당겨서 새로고침
            </div>
          )}
              <Outlet />
        </div>
        {renderNav()}
        <ModalManager />
        <BottomSheetManager />
        <ImageViewerManager />
      </EntryPoint>
    </>
  );
}
