import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import EntryPoint from "@/entryPoint";
import router from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/global.scss";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
