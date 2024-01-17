import Menu from "../components/Menu";
import { useState } from "react";
import './RegisterPage.css'

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState(""); // la opcion tipica de escribir 2 veces la contraseña
  const [statusMessage, setStatusMessage] = useState(""); // mensaje para el cliente sin necesidad de ver la consola

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
      const res = await fetch("http://localhost:3001/register", {
        body: JSON.stringify(postBody),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatusMessage("El registro ha sido completado con exito ✌️");
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
    <div></div>
  );

  return (
    <>
      <Menu />

     
      <div className="signupFrm">
        <div className="wrapper">
          <form onSubmit={registerUser} className="form">
          <h1 className="title">Sign up</h1>
          {messageForUser}
            <div className="inputContainer">
              <label htmlFor="name" className="label">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="input"
                onChange={(e) => setName(e.target.value)}
                placeholder="Escriba su nombre"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Escriba su correo electrónico"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escriba su contraseña"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="passwordRepeat" className="label">Repetir Password</label>
              <input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                value={passwordRepeat}
                className="input"
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Repita su contraseña"
              />
            </div>
            <div>
              <input type="submit" className="submitBtn"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
