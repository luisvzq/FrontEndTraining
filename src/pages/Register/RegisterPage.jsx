// RegisterPage.jsx
import { useState } from "react";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading.jsx";
import UseValidateUser from "../../hooks/UseValidateUser.js";

const RegisterPage = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [, setShakeAnimation] = useState(false);

  const navigate = useNavigate();

  const postBody = {
    name,
    email,
    password: passwordRepeat,
  };
  const mutation = useMutation(hookPostPatchFetch);

  const handleRegisterButton = (e) => {
    e.preventDefault();
    const validated = UseValidateUser(name, email, setStatusMessage);
    if (validated) {
      if (password !== passwordRepeat) {
        setStatusMessage("Las contraseñas no coinciden");

        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
          setStatusMessage("");
        }, 5000);
        return;
      }
      if (password.length < 6) {
        setStatusMessage("Contraseña debe tener al menos 6 caracteres");

        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
          setStatusMessage("");
        }, 5000);
        return;
      }

      mutation.mutate(
        { endpoint: "register", method: "POST", user: postBody },
        {
          onError: (error) => {
            setStatusMessage(error);

            setTimeout(() => {
              setStatusMessage("");
            }, 4000);
          },
          onSuccess: () => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Registro completado con éxito!`,
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: "rounded-popup",
              },
            });
            navigate("/login");

            setName("");
            setEmail("");
            setPassword("");
            setPasswordRepeat("");
          },
        }
      );
    }
  };

  return (
    <>
      <section className="register-page">
        {mutation.isLoading && <Loading />}
        <h1>Registro</h1>

        <ErrorMessage message={statusMessage} />

        <form onSubmit={handleRegisterButton} className="register-container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="passwordRepeat">Repetir Password</label>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />

          <input type="submit" className="submit-btn" />
        </form>
      </section>
    </>
  );
};

export default RegisterPage;
