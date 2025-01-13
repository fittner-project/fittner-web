import EntryPoint from "@/entryPoint";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {}, []);
  return (
    <EntryPoint>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </EntryPoint>
  );
}
