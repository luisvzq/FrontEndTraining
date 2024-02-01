import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";
import UserForm from "../../components/UserForm/UserForm";

const SettingsPage = () => {
  return (
    <>
    <div className="main-conintainer">
    <UserForm />
    <ButtonDeleteUser/>
    </div>
    </>
  );
};

export default SettingsPage;
