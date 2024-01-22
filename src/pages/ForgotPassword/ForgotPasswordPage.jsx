import { useState } from "react";
import "./ForgotPasswordPage.scss";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const ForgotPasswordPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const [shakeAnimation, setShakeAnimation] = useState(false);
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

      if (response.ok) {
        const body = await response.json();
        setStatusMessage(body.message);
      } else {
        const body = await response.json();
        setStatusMessage(body.error);
        console.log(body.error);
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Header />
      <section
        className="forgot-password-page
      "
      >
        <h1>Pagina Reset Clave</h1>

        {statusMessage ? (
          <p className={`status-message ${shakeAnimation ? "shake" : ""}`}>
            {statusMessage}
          </p>
        ) : (
          <p className="intro-text">Introduce tu Email</p>
        )}
        <form
          className="forgot-password-container"
          onSubmit={(e) => {
            e.preventDefault();
            fetchForgotPassword();
            setMail("");
            setShakeAnimation(true);
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
          <input type="submit" className="submit-btn" />
        </form>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
