import Menu from "../components/Menu";
import "./Header.scss";
import DropDown from "../components/DropDown/DropDown";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

const Header = () => {
  const [context] = useContext(authContext);
  return (
    <div className="header">
      <Menu />
      {context?.token && <DropDown />}
    </div>
  );
};

export default Header;
