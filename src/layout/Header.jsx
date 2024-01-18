import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import Menu from "../components/Menu";
// import "./Header.scss";

const Header = () => {
  const [context] = useContext(authContext);
  return (
    <div className="header">
      <Menu />
      <div className="welcome">
        {context?.token && <p>Hola {context?.name}!</p>}
      </div>
    </div>
  );
};

export default Header;
