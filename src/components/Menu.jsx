import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        {" | "}
        <NavLink to="/login">Login</NavLink>
        {" | "}
        <NavLink to="/registro">Registro</NavLink>
        {" | "}
        <NavLink to="/entrenos">Entrenos</NavLink>
        {" | "}
        <NavLink to="/favoritos">Favoritos</NavLink>
      </header>
    </>
  );
};
export default Menu;
