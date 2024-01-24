import {
  AdminFavListPage,
  AdminTrainingCreate,
  AdminTrainingDetail,
  AdminTrainingListPage,
  AdminTrainingModify,
  FavListPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  TrainingDetailPage,
  TrainingListPage,
} from "./pages";

import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Layout = () => {
  const [context, setContext] = useContext(authContext);
  useEffect(() => {
    const getRole = async () => {
      try {
        const req = await fetch("http://localhost:3001/verify", {
          headers: { Authorization: `Bearer ${context?.token}` },
        });
        const body = await req.json();
        const role = await body.rol;

        setContext({ ...context, role });
      } catch (error) {
        console.error("Token no válido");
      }
    };

    if (context.token && !context.role) {
      getRole();
    }
  }, [context, setContext]);

  const routes = [...routesWithoutAuth];

  if (context?.token && context?.role !== "admin") {
    routes.push(...routesWithAuth);
  } else if (context?.role === "admin") {
    routes.push(...routesAdmin);
  } else {
    routes.push(...loginRoutes);
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
};


const routesAdmin = [
  {
    path: "/admin/entrenos",
    element: <AdminTrainingListPage />,
  },
  {
    path: "/admin/entreno/:trainingId",
    element: <AdminTrainingDetail />,
  },
  {
    path: "/admin/favoritos",
    element: <AdminFavListPage />,
  },
  {
    path: "/admin/modificar/:trainingId",
    element: <AdminTrainingModify />,
  },
  {
    path: "/admin/añadir",
    element: <AdminTrainingCreate />,
  },
 

];

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
    path: "/entreno/:trainingId",
    element: <TrainingDetailPage />,
  },
];

const routesWithoutAuth = [
  {
    path: "*",
    element: <NotFoundPage />,
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
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:temp",
    element: <ResetPasswordPage />,
  },
];

export default Layout;
