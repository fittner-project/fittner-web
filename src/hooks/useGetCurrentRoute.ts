import { Routes } from "@/router/route";
import { useLocation } from "react-router-dom";

function useGetCurrentRoute() {
  const location = useLocation();
  const currentRoute = Object.values(Routes).find(
    (route) => route.path === location.pathname
  );

  return { currentRoute };
}

export default useGetCurrentRoute;
