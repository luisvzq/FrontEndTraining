import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";
import UserForm from "../../components/UserForm/UserForm";

const AdminSettingsPage = () => {
  return (
    <>
      <div className="container-modify-user">
      <ButtonDeleteUser />
      <UserForm />
      </div>
    </>
  );
};

export default AdminSettingsPage;
