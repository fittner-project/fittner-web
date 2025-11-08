const PATH = {
  ROOT: "/",
  HOME: "/home",
  SIGN_IN: "/sign-in",
  SIGN_UP: {
    DEFAULT: "/sign-up",
    TERMS: {
      DEFAULT: "/sign-up-terms",
      DETAIL: "/sign-up-terms/:termUrl",
    },
    PHONE_NUMBER: "/sign-up-phone-number",
    NAME: "/sign-up-name",
    COMPLETE: "/sign-up-complete",
  },
  REDIRECT: "/redirect",
  FIND_CENTERS: "/find-centers",
  CENTER_LIST: "/center-list",
  PAUSE_TICKET: "/pause-ticket/:ticketId",
  MY: {
    DEFAULT: "/my",
    POLICY: {
      TERMS: "/my/terms",
      NOTICE: "/my/notice",
      NOTICE_DETAIL: "/my/notice/:title",
      TERMS_DETAIL: "/my/terms/:title",
    },
    TRAINEE_OR_TRAINER: "/my/trainee-or-trainer",
    NOTIFICATION_SETTING: "/my/notification-setting",
    REVENUE_DETAIL: "/my/revenue-detail",
    REVENUE_TRAINEE_DETAIL: "/my/revenue-detail/:ticketId",
    TICKET: {
      DEFAULT: "/my/ticket",
      DETAIL: "/my/ticket/:ticketId",
    },
  },
  REGISTER_TRAINEE: "/register-trainee",
  REGISTER_LESSON: "/register-lesson",
  EXTRA_REGISTER_TICKET: "/extra-register-ticket",
  MY_LESSONS: "/my-lessons",
  SIGNATURE: {
    LIST: "/signature/list",
    DETAIL: "/signature/list/:ticketId",
  },
  CONFIRM_INFO: "/confirm-info",
  ASSIGN_NEW_TRAINEE: "/assign-new-trainee",
  NOTIFICATION_HISTORY: "/notification-history",
};

export default PATH;
