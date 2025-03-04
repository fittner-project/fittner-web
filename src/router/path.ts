const PATH = {
  ROOT: "/",
  HOME: "/home",
  SIGN_IN: "/sign-in",
  SIGN_UP: {
    TERMS: "/sign-up-terms",
    PHONE_NUMBER: "/sign-up-phone-number",
    NAME: "/sign-up-name",
    COMPLETE: "/sign-up-complete",
  },
  REDIRECT: "/redirect",
  FIND_CENTERS: "/find-centers",
  CENTER_LIST: "/center-list",
  MY: {
    DEFAULT: "/my",
    POLICY: {
      TERMS: "/my/terms",
      NOTICE: "/my/notice",
      NOTICE_DETAIL: "/my/notice/:title",
      TERMS_DETAIL: "/my/terms/:title",
    },
    TRAINEE: "/my/trainee",
    NOTIFICATION_SETTING: "/my/notification-setting",
    REVENUE_DETAIL: "/my/revenue-detail",
    REVENUE_TRAINEE_DETAIL: "/my/revenue-detail/:ticketId",
    TICKET: {
      DEFAULT: "/my/ticket",
      DETAIL: "/my/ticket/:ticketId",
    },
  },
  REGISTER_TRAINEE: "/register-trainee",
  MY_LESSONS: "/my-lessons",
  SIGNATURE: {
    LIST: "/signature/list",
    DETAIL: "/signature/list/:ticketId",
  },
};

export default PATH;
