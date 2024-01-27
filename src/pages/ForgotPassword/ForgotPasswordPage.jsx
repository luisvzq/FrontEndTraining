import { useState } from "react";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./ForgotPasswordPage.scss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

const ForgotPasswordPage = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");


  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);
  const handleForgotButton = (e) => {
    e.preventDefault();
    mutation.mutate(
      { endpoint: "loginForgot", method: "POST", user: postBody },
      {
        onError: (error) => {
          setStatusMessage(error);
          setTimeout(() => {
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

        <ErrorMessage message={statusMessage} />

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
