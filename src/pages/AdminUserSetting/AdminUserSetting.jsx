import { Link } from "react-router-dom";


import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail";

import "./AdminUserSetting.scss";
import ChangeRol from "../../components/ChangeRol/ChangeRol";
import RegisterPage from "../Register/RegisterPage";

const AdminUserSetting = () => {
  return (
    <>
      <div className="main-conintainer">
        <RegisterPage/>
        {/* <Link to="/admin/ajustes/rol">Cambio de Rol</Link>
      <Link to="/admin/ajustes/borrar-usuario">Borrado de Usarios</Link> */}
        <div className="second-container">
          <ChangeRol />
          <FormRemoveUserByEmail  />
        </div>
      </div>
    </>
  );
};

export default AdminUserSetting;
