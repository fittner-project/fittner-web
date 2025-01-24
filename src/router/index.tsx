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

const queryClient = new QueryClient();

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
        path: PATH.SIGN_UP.TERMS,
        element: <SignUpTerms />,
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
    ],
  },
]);

export default router;
