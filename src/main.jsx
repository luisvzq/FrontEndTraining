import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  FavListPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  TrainingDetail,
  TrainingListPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "*",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registro",
    element: <RegisterPage />,
  },
  {
    path: "/entrenos",
    element: <TrainingListPage />,
  },
  {
    path: "/favoritos",
    element: <FavListPage />,
  },
  {
    path: "/entreno/:id",
    element: <TrainingDetail />,
  },
  { path: "/resetPassword/:temp", element: <ResetPasswordPage /> },
  { path: "/forgotPassword/", element: <ForgotPasswordPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
