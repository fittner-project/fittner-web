import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/default.tsx";
import Home from "@/pages/home/Home";
import SignIn from "@/pages/sign-in/SignIn";
import Redirect from "@/pages/redirect/Redirect";

import PATH from "./path";
import SignUpTerms from "@/pages/sign-up/sign-up-terms/SignUpTerms";
import SignUpName from "@/pages/sign-up/sign-up-name/SignUpName";
import FindCenters from "@/pages/find-centers/FindCenters";
import SignUpPhoneNumber from "@/pages/sign-up/sign-up-phone-number/SignUpPhoneNumber";
import SignUpComplete from "@/pages/sign-up/sign-up-complete/SignUpComplete";
import My from "@/pages/my/default/My";
import CenterList from "@/pages/center-list/CenterList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Policy from "@/pages/my/policy/Policy";
import NotificationSetting from "@/pages/my/notification-setting/NotificationSetting";
import RegisterTrainee from "@/pages/register-trainee/RegisterTrainee";
import RevenueDetail from "@/pages/my/revenue-detail/RevenueDetail";
import NoticeDetail from "@/pages/my/policy/notice-detail/NoticeDetail";
import TermsDetail from "@/pages/my/policy/terms-detail/TermsDetail";
import RevenueTraineeDetail from "@/pages/my/revenue-detail/revenue-trainee-detail/RevenueTraineeDetail";
import Ticket from "@/pages/my/ticket/Ticket";
import TicketDetail from "@/pages/my/ticket/ticket-detail/TicketDetail";
import SignatureList from "@/pages/signature/signature-list/SignatureList";
import SignatureDetail from "@/pages/signature/signature-detail/SignatureDetail";
import MyLessons from "@/pages/my-lessons/MyLessons";
import RegisterLesson from "@/pages/register-lesson/RegisterLesson";
import ExtraRegisterTicket from "@/pages/extra-register-ticket/ExtraRegisterTicket";
import SignUpTermDetail from "@/pages/sign-up/sign-up-terms/sign-up-term-detail/SignUpTermDetail";
import ConfirmInfo from "@/pages/confirm-info/ConfirmInfo";
import AssignNewTrainee from "@/pages/assign-new-trainee/AssignNewTrainee";
import TraineeOrTrainer from "@/pages/my/trainee-or-trainer/TraineeOrTrainer";
import PauseTicket from "@/pages/pause-ticket/PauseTicket";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    ),
    children: [
      {
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PATH.REDIRECT,
        element: <Redirect />,
      },
      {
        path: PATH.SIGN_UP.TERMS.DEFAULT,
        element: <SignUpTerms />,
      },
      {
        path: PATH.SIGN_UP.TERMS.DETAIL,
        element: <SignUpTermDetail />,
      },
      {
        path: PATH.SIGN_UP.PHONE_NUMBER,
        element: <SignUpPhoneNumber />,
      },
      {
        path: PATH.SIGN_UP.NAME,
        element: <SignUpName />,
      },
      {
        path: PATH.FIND_CENTERS,
        element: <FindCenters />,
      },
      {
        path: PATH.SIGN_UP.COMPLETE,
        element: <SignUpComplete />,
      },
      {
        path: PATH.MY.DEFAULT,
        element: <My />,
      },
      {
        path: PATH.CENTER_LIST,
        element: <CenterList />,
      },
      {
        path: PATH.MY.POLICY.TERMS,
        element: <Policy type="terms" />,
      },
      {
        path: PATH.MY.POLICY.NOTICE,
        element: <Policy type="notice" />,
      },
      {
        path: PATH.MY.NOTIFICATION_SETTING,
        element: <NotificationSetting />,
      },
      {
        path: PATH.REGISTER_TRAINEE,
        element: <RegisterTrainee />,
      },
      {
        path: PATH.MY.REVENUE_DETAIL,
        element: <RevenueDetail />,
      },
      {
        path: PATH.MY.POLICY.NOTICE_DETAIL,
        element: <NoticeDetail />,
      },
      {
        path: PATH.MY.POLICY.TERMS_DETAIL,
        element: <TermsDetail />,
      },
      {
        path: PATH.MY.REVENUE_TRAINEE_DETAIL,
        element: <RevenueTraineeDetail />,
      },
      {
        path: PATH.MY.TRAINEE_OR_TRAINER,
        element: <TraineeOrTrainer />,
      },
      {
        path: PATH.MY.TICKET.DEFAULT,
        element: <Ticket />,
      },
      {
        path: PATH.MY.TICKET.DETAIL,
        element: <TicketDetail />,
      },
      {
        path: PATH.SIGNATURE.LIST,
        element: <SignatureList />,
      },
      {
        path: PATH.SIGNATURE.DETAIL,
        element: <SignatureDetail />,
      },
      {
        path: PATH.MY_LESSONS,
        element: <MyLessons />,
      },
      {
        path: PATH.REGISTER_LESSON,
        element: <RegisterLesson />,
      },
      {
        path: PATH.EXTRA_REGISTER_TICKET,
        element: <ExtraRegisterTicket />,
      },
      {
        path: PATH.CONFIRM_INFO,
        element: <ConfirmInfo />,
      },
      {
        path: PATH.ASSIGN_NEW_TRAINEE,
        element: <AssignNewTrainee />,
      },
      {
        path: PATH.PAUSE_TICKET,
        element: <PauseTicket />,
      },
    ],
  },
]);

export default router;
