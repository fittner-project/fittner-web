import EntryPoint from "@/entryPoint";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import ModalManager from "@/components/modal/modal-manager/ModalManager";
import { useMemo } from "react";

export default function RootLayout() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <EntryPoint>
        <Outlet />
        <ModalManager />
      </EntryPoint>
    </QueryClientProvider>
  );
}
