import { Link } from "react-router-dom";

import RegisterPage from "../Register/RegisterPage";
import ChangeRol from "../../components/ChangeRol";
import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail";

const AdminUserSetting = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RegisterPage />
        {/* <Link to="/admin/ajustes/rol">Cambio de Rol</Link>
      <Link to="/admin/ajustes/borrar-usuario">Borrado de Usarios</Link> */}
        <div style={{ display: "inline-flex" }}>
          <ChangeRol />
          <FormRemoveUserByEmail />
        </div>
      </div>
    </>
  );
};

export default AdminUserSetting;
