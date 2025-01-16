import EntryPoint from "@/entryPoint";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import ModalManager from "@/components/modal/modal-manager/ModalManager";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <EntryPoint>
        <Outlet />
        <ModalManager />
      </EntryPoint>
    </QueryClientProvider>
  );
}
