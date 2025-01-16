import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/default.tsx";
import About from "@/pages/about";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in/SignIn";
import Redirect from "@/pages/redirect/Redirect";
import SignUp from "@/pages/sign-up/SignUp";
import PATH from "./path";

const { HOME, ABOUT, SIGN_IN, SIGN_UP, REDIRECT } = PATH;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: HOME,
          element: <Home />,
        },
        {
          path: ABOUT,
          element: <About />,
        },
        {
          path: SIGN_IN,
          element: <SignIn />,
        },
        {
          path: REDIRECT,
          element: <Redirect />,
        },
        {
          path: SIGN_UP,
          element: <SignUp />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_PATH as string }
);

export default router;
