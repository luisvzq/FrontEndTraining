import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [, setContext] = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setContext({ name: "", token: "", role: "" });
    navigate("/login");
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default Logout;
