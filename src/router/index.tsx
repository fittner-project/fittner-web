import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/default.tsx";
import About from "@/pages/about";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in/SignIn";
import Redirect from "@/pages/redirect/Redirect";

import PATH from "./path";
import SignUpTerms from "@/pages/sign-up/sign-up-terms/SignUpTerms";
import SignUpName from "@/pages/sign-up/sign-up-name/SignUpName";
import FindCenters from "@/pages/find-centers/FindCenters";
import SignUpPhoneNumber from "@/pages/sign-up/sign-up-phone-number/SignUpPhoneNumber";
import SignUpComplete from "@/pages/sign-up/sign-up-complete/SignUpComplete";
import My from "@/pages/my/My";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.ABOUT,
        element: <About />,
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
        path: PATH.MY,
        element: <My />,
      },
    ],
  },
]);

export default router;
