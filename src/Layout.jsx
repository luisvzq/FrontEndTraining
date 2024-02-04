import {
  AdminTrainingCreate,
  AdminTrainingDetail,
  AdminTrainingListPage,
  AdminTrainingModify,
  AdminUserSetting,
  FavListPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  RoutinePage,
  SettingsPage,
  TrainingDetailPage,
  TrainingListPage,
} from "./pages";

import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ChangeRol from "./components/ChangeRol/ChangeRol";
import FormRemoveUserByEmail from "./components/FormRemoveUserByEmail/FormRemoveUserByEmail";
import FormAddRoutine from "./components/FormAddRoutine/FormAddRoutine";

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
    element: <FavListPage />,
  },
  {
    path: "/admin/modificar/:trainingId",
    element: <AdminTrainingModify />,
  },
  {
    path: "/admin/crear",
    element: <AdminTrainingCreate />,
  },
  {
    path: "/admin/ajustes",
    element: <AdminUserSetting />,
  },
  {
    path: "/admin/ajustes/rol",
    element: <ChangeRol />,
  },
  {
    path: "/admin/ajustes/borrar-usuario",
    element: <FormRemoveUserByEmail />,
  },
  {
    path: "/admin/rutinas",
    element: <RoutinePage />,
  },
  {
    path: "/crear-rutinas",
    element: <FormAddRoutine />,
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
  {
    path: "/ajustes",
    element: <SettingsPage />,
  },
  {
    path: "/rutinas",
    element: <RoutinePage />,
  },
  {
    path: "/crear-rutinas",
    element: <FormAddRoutine />,
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
