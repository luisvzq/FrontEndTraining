import { useState } from "react";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const { hookPostFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const postBody = { email: mail };
  const mutation = useMutation(hookPostFetch);
  const handleForgotButton = (e) => {
    e.preventDefault();
    mutation.mutate(
      { endpoint: "loginForgot", method: "POST", user: postBody },
      {
        onError: (error) => {
          setStatusMessage(error);

          setShakeAnimation(true);
          setTimeout(() => {
            setShakeAnimation(false);
            setStatusMessage("");
          }, 5000);
        },
        onSuccess: (data) => {
          setStatusMessage(data.message);
          setMail("");
        },
      }
    );
  };

  return (
    <>
      <section
        className="forgot-password-page
      "
      >
        <h1>Recuperar Contraseña</h1>

        {statusMessage ? (
          <p className={`status-message ${shakeAnimation ? "shake" : ""}`}>
            {statusMessage}
          </p>
        ) : (
          <p className="intro-text">Introduce tu Email</p>
        )}
        <form
          className="forgot-password-container"
          onSubmit={handleForgotButton}
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
    </>
  );
};

export default ForgotPasswordPage;
