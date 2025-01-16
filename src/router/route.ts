export type HeaderType = "default" | "sub" | "none";

export type NavigatorType = "default" | "none";

export type RouteSpec = {
  name: string;
  path: string;
  headerName: string;
  headerType: HeaderType;
  navType?: NavigatorType;
  fallback?: string;
};

type RouteKeys = "signin" | "lobby";

type Routes = {
  [K in RouteKeys]: RouteSpec;
};

export const Routes: Routes = {
  lobby: {
    name: "lobby",
    path: "/",
    fallback: "/",
    headerName: "Fittner",
    headerType: "default",
    navType: "default",
  },

  signin: {
    name: "signin",
    path: "/",
    fallback: "/",
    headerName: "",
    headerType: "none",
    navType: "none",
  },
};
