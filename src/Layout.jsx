import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  FavListPage,
  HomePage,
  LoginPage,
  RegisterPage,
  TrainingDetail,
  TrainingListPage,
} from "./pages";
import { authContext } from "./context/AuthContext";
import { useContext } from "react";

const Layout = () => {
  const routes = [...routesWithoutAuth];

  const [token] = useContext(authContext);
  if (token) {
    routes.push(...routesWithAuth);
  } else {
    routes.push(...loginRoutes);
  }

  const browserRoutes = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={browserRoutes} />
    </>
  );
};

const routesWithAuth = [
  {
    path: "/entrenos",
    element: <TrainingListPage />,
  },
  {
    path: "/favoritos",
    element: <FavListPage />,
  },
  {
    path: "/entreno/:idtraining",
    element: <TrainingDetail />,
  },
];

const routesWithoutAuth = [
  {
    path: "*",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
];

const loginRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registro",
    element: <RegisterPage />,
  },
];

export default Layout;
