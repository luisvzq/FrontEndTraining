import "./AdminUserSetting.scss";
import ChangeRol from "../../components/ChangeRol/ChangeRol";
import UserForm from "../../components/UserForm/UserForm";
import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";
import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail/FormRemoveUserByEmail";

const AdminUserSetting = () => {
  return (
    <>
      <div className="main-conintainer">
        <div className="container-modify-user">
          <UserForm />
        </div>
        <div className="second-container">
          <ChangeRol />
          <FormRemoveUserByEmail />
        </div>
        <ButtonDeleteUser />

      </div>
    </>
  );
};

export default AdminUserSetting;
