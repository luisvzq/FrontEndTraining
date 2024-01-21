import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

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
