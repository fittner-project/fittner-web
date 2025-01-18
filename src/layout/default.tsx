import EntryPoint from "@/entryPoint";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import ModalManager from "@/components/modal/modal-manager/ModalManager";
import { useMemo } from "react";

import Header from "./header/Header";
import { SubHeader } from "./sub-header/SubHeader";
import useGetCurrentRoute from "@/hooks/useGetCurrentRoute";
import BottomSheetManager from "@/components/bottom-sheet/bottom-sheet-manager/BottomSheetManager";
import SubSearchHeader from "./sub-search-header/SubSearchHeader";

export default function RootLayout() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const { currentRoute } = useGetCurrentRoute();

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
  };

  return (
    <QueryClientProvider client={queryClient}>
      <EntryPoint>
        {renderHeader()}
        <Outlet />
        <ModalManager />
        <BottomSheetManager />
      </EntryPoint>
    </QueryClientProvider>
  );
}
