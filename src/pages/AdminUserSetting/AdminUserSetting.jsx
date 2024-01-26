import { Link } from "react-router-dom";

import RegisterPage from "../Register/RegisterPage";

const AdminUserSetting = () => {
  return (
    <>
      <RegisterPage />
      <Link to="/admin/ajustes/rol">Cambio de Rol</Link>
      <Link to="/admin/ajustes/borrar-usuario">Borrado de Usarios</Link>
    </>
  );
};

export default AdminUserSetting;
