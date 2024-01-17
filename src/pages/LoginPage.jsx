import { useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import Menu from "../components/Menu";

const LoginPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [, setContext] = useContext(authContext);

  const authUser = async (e) => {
    e.preventDefault();
    const loginBody = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    try {
      const res = await fetch("http://localhost:3001/login", {
        body: JSON.stringify(loginBody),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const body = await res.json();
        setStatusMessage(body.token);
        setContext({ token: body.token, role: body.rol });
      } else {
        const body = await res.json();
        console.log("Error de datos", body);
        setStatusMessage(body.message);
      }
    } catch (error) {
      console.error("Error al acceder");
      console.error(error);
    }
  };

  const userFetchResponse = `La respuesta del servidor es: ${statusMessage}`;

  return (
    <>
      <Menu />
      <section>
        <h1>Login</h1>
        {statusMessage ? (
          <p>{userFetchResponse}</p>
        ) : (
          <p>Introduce los datos</p>
        )}
        <form onSubmit={authUser}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <input type="submit"></input>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
