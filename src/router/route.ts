import { registration } from "@/assets/assets";
import PATH from "./path";

export type HeaderType = "default" | "sub" | "sub-search" | "sub-my" | "none";

export type NavigationType = "default" | "none";

export type RouteSpec = {
  name: RouteKeys;
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
  imageWidth?: number;
  imageHeight?: number;
  actionType?: "add-center" | "none";
};

type RouteKeys =
  | "sign-in"
  | "lobby"
  | "sign-up-terms"
  | "sign-up-name"
  | "find-centers"
  | "sign-up-phone-number"
  | "sign-up-complete"
  | "my"
  | "center-list"
  | "redirect"
  | "root";

type Routes = {
  [K in RouteKeys]: RouteSpec;
};

export const Routes: Routes = {
  root: {
    name: "root",
    path: PATH.ROOT,
    fallback: PATH.ROOT,
    headerName: "",
    headerType: "none",
    navType: "none",
  },

  lobby: {
    name: "lobby",
    path: PATH.HOME,
    fallback: PATH.HOME,
    headerName: "",
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

  redirect: {
    name: "redirect",
    path: PATH.REDIRECT,
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
    path: PATH.MY.DEFAULT,
    fallback: "none",
    headerType: "sub-my",
    navType: "default",
  },

  "center-list": {
    name: "center-list",
    path: PATH.CENTER_LIST,
    fallback: "none",
    headerType: "sub",
    navType: "none",
    subHeaderConfig: {
      rightSection: {
        type: "image",
        src: registration,
        imageWidth: 2.4,
        imageHeight: 2.4,
        actionType: "add-center",
      },
    },
  },
};
