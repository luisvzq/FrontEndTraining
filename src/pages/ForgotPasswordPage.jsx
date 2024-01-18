import { useState } from "react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ForgotPasswordPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const fetchForgotPassword = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/loginForgot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
          }),
        }
      );

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
      <Header />
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
      <Footer/>
    </>
  );
};

export default ForgotPasswordPage;
