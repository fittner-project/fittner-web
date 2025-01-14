import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layout/default.tsx";
import About from "@/pages/about";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in/SignIn";
import Redirect from "@/pages/redirect/Redirect";
import AppleRedirect from "@/pages/apple-redirect/AppleRedirect";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/redirect",
          element: <Redirect />,
        },
        {
          path: "/apple-redirect",
          element: <AppleRedirect />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_PATH as string }
);

export default router;
