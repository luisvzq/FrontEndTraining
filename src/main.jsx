import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  FavListPage,
  HomePage,
  LoginPage,
  RegisterPage,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
