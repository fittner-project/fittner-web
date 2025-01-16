import PATH from "./path";

export type HeaderType = "default" | "sub" | "none";

export type NavigationType = "default" | "none";

export type RouteSpec = {
  name: string;
  path: string;
  headerName?: string;
  headerType: HeaderType;
  navType?: NavigationType;
  fallback?: string | "none";
  subHeaderConfig?: SubHeaderConfig;
};

export type SubHeaderConfig = {
  rightSection?: SubHeaderRightSection;
};

export type SubHeaderRightSection = {
  type: "text" | "image";
  textContent?: string;
  src?: string;
  actionType?: string | "none";
};

type RouteKeys = "sign-in" | "lobby" | "sign-up";

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
    headerType: "none",
    navType: "none",
  },

  "sign-up": {
    name: "sign-up",
    path: PATH.SIGN_UP,
    fallback: "none",
    headerType: "sub",
    navType: "none",
    subHeaderConfig: {
      rightSection: {
        type: "text",
        textContent: "회원가입",
        actionType: "none",
      },
    },
  },
};
