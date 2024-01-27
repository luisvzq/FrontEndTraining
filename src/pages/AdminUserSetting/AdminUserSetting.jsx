import { Link } from "react-router-dom";


import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail";
import UserForm from "../../components/UserForm/UserForm";
import "./AdminUserSetting.scss";
import ChangeRol from "../../components/ChangeRol/ChangeRol";

const AdminUserSetting = () => {
  return (
    <>
      <div className="main-conintainer">
        <UserForm />
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
