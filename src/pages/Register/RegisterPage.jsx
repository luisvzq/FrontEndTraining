import { useState } from "react";
import "./RegisterPage.scss";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";

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
      }, 500);
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
       // setStatusMessage("El registro ha sido completado con exito ✌️");
       alert("El registro ha sido completado con exito ✌️");
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordRepeat("");
      } else {
        const body = await res.json();     
        setStatusMessage(body.error); 
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 500);

      }
    } catch (error) {
      setStatusMessage("Error al conectar con la Db");
      setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, 500);
      console.error(error);
    }
  };

  const userFetchResponse = statusMessage;



  return (
    <>
      <Header />
      <section className="register-page">
        <h1>Registro</h1>
        {statusMessage ? (
          <p className={`status-message ${shakeAnimation ? "shake" : ""}`}>
            {userFetchResponse}
          </p>
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
