import { useState } from "react";
import Menu from "../components/Menu";

const ForgotPasswordPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState();
  const fetchForgotPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8000/loginForgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const body = await response.json();

      setStatusMessage(body.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Menu />
      <div>Pagina Reset Clave</div>
      {statusMessage ? <p>{statusMessage}</p> : <p>Introduce tu Email</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchForgotPassword();
          setMail("");
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default ForgotPasswordPage;
