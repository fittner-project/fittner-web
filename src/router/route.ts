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
  | "my-terms"
  | "my-notice"
  | "my-notification-setting"
  | "my-revenue-detail"
  | "redirect"
  | "root"
  | "register-trainee"
  | "my-notice-detail"
  | "my-terms-detail";

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

  "register-trainee": {
    name: "register-trainee",
    path: PATH.REGISTER_TRAINEE,
    fallback: "none",
    headerType: "sub",
    navType: "none",
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

  "my-terms": {
    name: "my-terms",
    path: PATH.MY.POLICY.TERMS,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "my-notice": {
    name: "my-notice",
    path: PATH.MY.POLICY.NOTICE,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "my-notification-setting": {
    name: "my-notification-setting",
    path: PATH.MY.NOTIFICATION_SETTING,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "my-revenue-detail": {
    name: "my-revenue-detail",
    path: PATH.MY.REVENUE_DETAIL,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "my-notice-detail": {
    name: "my-notice-detail",
    path: PATH.MY.POLICY.NOTICE_DETAIL,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },

  "my-terms-detail": {
    name: "my-terms-detail",
    path: PATH.MY.POLICY.TERMS_DETAIL,
    fallback: "none",
    headerType: "sub",
    navType: "none",
  },
};
