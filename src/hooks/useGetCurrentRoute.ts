import { Routes } from "@/router/route";
import { useLocation, matchPath } from "react-router-dom";

function useGetCurrentRoute() {
  const location = useLocation();

  const currentRoute = Object.values(Routes).find((route) => {
    return matchPath(
      {
        path: route.path,
        end: true,
      },
      location.pathname
    );
  });

  return { currentRoute };
}

export default useGetCurrentRoute;
