import { useState } from "react";
import "./RegisterPage.scss";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState(""); // la opcion tipica de escribir 2 veces la contraseña
  const [statusMessage, setStatusMessage] = useState(""); // mensaje para el cliente sin necesidad de ver la consola
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setStatusMessage("Las contraseñas no coinciden");
      return;
    }

    const postBody = {
      name,
      email,
      password: passwordRepeat, // Solo guardo passwordRepeat
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
        setStatusMessage("El registro ha sido completado con exito ✌️");
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordRepeat("");
      } else {
        const body = await res.json();
        console.log("Error de datos: ", body.error); // se puede borrar es para pruebas
        setStatusMessage(body.error); // para que muestre al usuario cual es el error p.e ya existe usuario con ese email
      }
    } catch (error) {
      setStatusMessage("Error al conectar con la Db"); // se le comunicaria esta info al cliente, si el problema es en el fetch??
      console.error(error);
    }
  };

  const messageForUser = statusMessage ? (
    //borrar luego este estilo es solo para pruebas en registro y q salga rojo o verde
    <div style={{ color: statusMessage.includes("exito") ? "green" : "red" }}>
      {statusMessage}
    </div>
  ) : (
    <div>Introduzca sus datos</div>
  );

  return (
    <>
      <Header />
      <section className="register-page">
        <h1>Registro</h1>
        <div className="status-message">{messageForUser}</div>

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
