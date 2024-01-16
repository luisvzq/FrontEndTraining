import Menu from "../components/Menu";
import { useState } from "react";


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
        console.log("Error de datos: ", body.error);// se puede borrar es para pruebas
        setStatusMessage(body.error);// para que muestre al usuario cual es el error p.e ya existe usuario con ese email
      }
    } catch (error) {
      setStatusMessage("Error al conectar con la Db"); // se le comunicaria esta info al cliente, si el problema es en el fetch??
      console.error(error);
      
    }
  };

  const messageForUser  = statusMessage ? (
    //borrar luego este estilo es solo para pruebas en registro y q salga rojo o verde
    <div style={{ color: statusMessage.includes("exito") ? "green" : "red" }}> 
      {statusMessage}
    </div>
  ) : (
    <div>Introduce los datos</div>
  );

  return (
    <>
      <Menu />
      <div>Pagina Register</div>
    

      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escriba su nombre"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escriba su correo electrónico"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escriba su contraseña"
          />
        </div>
        <div>
          <label htmlFor="passwordRepeat">Repetir Password</label>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            placeholder="Repita su contraseña"
          />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      {messageForUser }
    </>
  );
};

export default RegisterPage;
