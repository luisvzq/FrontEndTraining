import { useState } from "react";
import "./RegisterPage.scss";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ErrorMessage from "../../components/ErrorMessage";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); // mensaje para el cliente sin necesidad de ver la consola
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setStatusMessage("Las contraseñas no coinciden");
      setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, 1000);
      return;
    }

    const postBody = {
      name,
      email,
      password: passwordRepeat,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/register`,
        {
          body: JSON.stringify(postBody),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Registro completado con exito!`,
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
      } else {
        const body = await res.json();

        setShakeAnimation(true);

        if (body.error) {
          setStatusMessage(body.error);
          setTimeout(() => {
            setShakeAnimation(false);
          }, 1000);
        } else {
          setStatusMessage("Se ha producido un error desconocido");
        }
      }
    } catch (error) {
      setShakeAnimation(true);
      setStatusMessage("Error al conectar con la base de datos");
      console.error("Error al conectar con la base de datos:", error);
    }
  };
  //const userFetchResponse = statusMessage;

  return (
    <>
      <Header />
      <section className="register-page">
        <h1>Registro</h1>
        {shakeAnimation ? (
          <ErrorMessage
            message={statusMessage}
            shakeAnimation={shakeAnimation}
          />
        ) : (
          <p className="intro-text">Introduce los datos</p>
        )}

        <form onSubmit={registerUser} className="register-container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escriba su nombre"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escriba su correo electrónico"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escriba su contraseña"
          />

          <label htmlFor="passwordRepeat">Repetir Password</label>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            placeholder="Repita su contraseña"
          />

          <input type="submit" className="submit-btn" />
        </form>
      </section>

      <Footer />
    </>
  );
};

export default RegisterPage;
