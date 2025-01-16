import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/default.tsx";
import About from "@/pages/about";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in/SignIn";
import Redirect from "@/pages/redirect/Redirect";

import PATH from "./path";
import SignUpTerms from "@/pages/sign-up-terms/SignUpTerms";
import SignUpName from "@/pages/sign-up-name/SignUpName";
import FindCenters from "@/pages/find-centers/FindCenters";

const router = createBrowserRouter(
  [
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
          path: PATH.SIGN_UP_TERMS,
          element: <SignUpTerms />,
        },
        {
          path: PATH.SIGN_UP_NAME,
          element: <SignUpName />,
        },
        {
          path: PATH.FIND_CENTERS,
          element: <FindCenters />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_PATH as string }
);

export default router;
