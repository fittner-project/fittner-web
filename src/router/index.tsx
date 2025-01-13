import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/layout/default.tsx";
import About from "@/views/About";
import Home from "@/views/Home";
import SignIn from "@/views/SignIn";
import EntryPoint from "@/entryPoint";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <EntryPoint>
          <QueryClientProvider client={queryClient}>
            <RootLayout />
          </QueryClientProvider>
        </EntryPoint>
      ),
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
      ],
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_PATH as string }
);

export default router;
