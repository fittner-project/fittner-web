import PATH from "./path";

export type HeaderType = "default" | "sub" | "sub-search" | "sub-my" | "none";

export type NavigationType = "default" | "none";

export type RouteSpec = {
  name: string;
  path: string;
  headerName?: string;
  headerType: HeaderType;
  navType?: NavigationType;
  fallback: string | "none";
  subHeaderConfig?: SubHeaderConfig;
};

export type SubHeaderConfig = {
  rightSection?: SubHeaderRightSection;
  searchConfig?: {
    placeholder?: string;
  };
};

export type SubHeaderRightSection = {
  type: "text" | "image" | "none";
  textContent?: string;
  src?: string;
  actionType?: string | "none";
};

type RouteKeys =
  | "sign-in"
  | "lobby"
  | "sign-up-terms"
  | "sign-up-name"
  | "find-centers"
  | "sign-up-phone-number"
  | "sign-up-complete"
  | "my";

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

  "sign-up-terms": {
    name: "sign-up-terms",
    path: PATH.SIGN_UP.TERMS,
    fallback: "none",
    headerType: "sub",
    navType: "none",
    subHeaderConfig: {
      rightSection: {
        type: "none",
      },
    },
  },

  "sign-up-phone-number": {
    name: "sign-up-phone-number",
    path: PATH.SIGN_UP.PHONE_NUMBER,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "sign-up-name": {
    name: "sign-up-name",
    path: PATH.SIGN_UP.NAME,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "find-centers": {
    name: "find-centers",
    path: PATH.FIND_CENTERS,
    fallback: "none",
    headerType: "sub-search",
    navType: "none",
    subHeaderConfig: {
      searchConfig: {
        placeholder: "센터명, 주소를 입력해주세요",
      },
    },
  },

  "sign-up-complete": {
    name: "sign-up-complete",
    path: PATH.SIGN_UP.COMPLETE,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  my: {
    name: "my",
    path: PATH.MY,
    fallback: "none",
    headerType: "sub-my",
    navType: "none",
  },
};
