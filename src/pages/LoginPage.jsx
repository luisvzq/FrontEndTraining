import { useState, useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

const LoginPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [context, setContext] = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      if (context?.token) {
        console.log("Usuario autenticado:", context);
        alert(`Loggeado correctamente, bienvenid@ ${context?.name}!`);
        navigate("/");
      }
    };

    handleLogin();
  }, [context, navigate]);

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
        const updatedContext = {
          name: body.name,
          token: body.token,
          role: body.rol,
        };
        setContext(updatedContext);

        if (updatedContext.token) {
          alert(`Loggeado correctamente, bienvenid@ ${updatedContext.name}!`);
          navigate("/");
        }
      } else {
        const body = await res.json();
        setStatusMessage(body.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userFetchResponse = statusMessage;

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
          <input type="submit" />
        </form>
      </section>
    </>
  );
};

export default LoginPage;
