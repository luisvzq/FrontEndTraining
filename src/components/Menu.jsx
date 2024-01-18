import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import Logout from "./Logout";

export const Menu = () => {
  const [context] = useContext(authContext);

  return (
    <>
      <header>
        {!context?.token && (
          <>
            <NavLink to="/">Home</NavLink>
            {" | "}
            <NavLink to="/login">Login</NavLink>
            {" | "}
            <NavLink to="/registro">Registro</NavLink>
            {" | "}
          </>
        )}
        {context?.role === "admin" && (
          <>
            <NavLink to="/">Home</NavLink>
            {" | "}
            <NavLink to="/admin/entrenos">Admin Entrenos</NavLink>
            {" | "}
            <NavLink to="/admin/favoritos">Admin Favoritos</NavLink>
            {" | "}
          </>
        )}
        {context?.role === "normal" && (
          <>
            <NavLink to="/">Home</NavLink>
            {" | "}
            <NavLink to="/entrenos">Entrenos</NavLink>
            {" | "}
            <NavLink to="/favoritos">Favoritos</NavLink>
            {" | "}
          </>
        )}

        {context?.token && <Logout />}
      </header>
    </>
  );
};
export default Menu;
