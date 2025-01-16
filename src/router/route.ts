import PATH from "./path";

export type HeaderType = "default" | "sub" | "none";

export type NavigatorType = "default" | "none";

export type RouteSpec = {
  name: string;
  path: string;
  headerName: string;
  headerType: HeaderType;
  navType?: NavigatorType;
  fallback?: string | "none";
};

type RouteKeys = "sign-in" | "lobby";

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

  "sign-in": {
    name: "sign-in",
    path: PATH.SIGN_IN,
    fallback: "none",
    headerName: "",
    headerType: "none",
    navType: "none",
  },
};
