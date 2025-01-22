import EntryPoint from "@/entryPoint";

import { Outlet } from "react-router-dom";
import ModalManager from "@/components/modal/modal-manager/ModalManager";

import Header from "./header/Header";
import { SubHeader } from "./sub-header/SubHeader";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";
import BottomSheetManager from "@/components/bottom-sheet/bottom-sheet-manager/BottomSheetManager";
import SubSearchHeader from "./sub-search-header/SubSearchHeader";
import SubMyHeader from "./sub-my-header/SubMyHeader";
import Navigation from "./navigation/Navigation";
import useSplash from "@/hooks/useSplash";
import Image from "@/components/image/Image";
import PATH from "@/router/path";

export default function RootLayout() {
  const { currentRoute } = useGetCurrentRoute();
  const { splashImgUrl } = useSplash();
  const location = useLocation();

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

  return (
    <>
      <EntryPoint>
        {renderHeader()}
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
        <div
          style={{
            paddingBottom: currentRoute?.navType !== "none" ? "7rem" : "0",
          }}
        >
          <Outlet />
        </div>
        {renderNav()}
        <ModalManager />
        <BottomSheetManager />
      </EntryPoint>
    </>
  );
}
