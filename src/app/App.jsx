import { useEffect, useState } from "react";
import Header from "../components/header";
import MainContent from "../dashboard/main-content.jsx";
import { supabase } from "../supabaseClient";
import CheckEmail from "../auth/check-your-email";
import HomePage from "../pages/HomePage.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import CompleteProfile from "../auth/complete-profile";
import Auth from "../auth/auth.jsx";
import SignIn from "../auth/sign-in.jsx";
import SignUp from "../auth/sign-up.jsx";
import PublicLayout from "../layouts/publiclayout.jsx";
import ProtectedLayout from "../layouts/protectedlayout.jsx";
import { LeadsProvider } from "../context/LeadsContext.jsx";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/auth",
        element: <Auth />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: "login", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "setup-profile", element: <CompleteProfile /> },
          { path: "check-your-email", element: <CheckEmail /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    path: "/dashboard",
    children: [
      {
        index: true,
        element: <MainContent />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
