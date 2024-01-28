import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail";

import "./AdminUserSetting.scss";
import ChangeRol from "../../components/ChangeRol/ChangeRol";

import UserForm from "../../components/UserForm/UserForm";
import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";

const AdminUserSetting = () => {
  return (
    <>
      <div className="main-conintainer">
      <div className="container-modify-user">
      <ButtonDeleteUser />
        <UserForm />
        </div>
        {/* <Link to="/admin/ajustes/rol">Cambio de Rol</Link>
      <Link to="/admin/ajustes/borrar-usuario">Borrado de Usarios</Link> */}
        <div className="second-container">
          <ChangeRol />
          <FormRemoveUserByEmail />
        </div>
      </div>
    </>
  );
};

export default AdminUserSetting;
