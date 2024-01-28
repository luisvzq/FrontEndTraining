import { useState } from "react";
import { useMutation } from "react-query";

import useFetchHooks from "../hooks/useFetchHooks";

const FormRemoveUserByEmail = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);

  return (
    <>
      <section
        className="forgot-password-page
      "
      >
        <h1>Eliminacion de Usarios</h1>

        {statusMessage ? (
          <p className={`status-message ${shakeAnimation ? "shake" : ""}`}>
            {statusMessage}
          </p>
        ) : (
          <p className="intro-text">
            Introduce Email del usario que desea eliminar
          </p>
        )}
        <form className="forgot-password-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(
                {
                  endpoint: `removeUserByEmail`,
                  method: "DELETE",
                  user: postBody,
                },
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
            }}
          >
            Eliminar
          </button>
        </form>
      </section>
    </>
  );
};

export default FormRemoveUserByEmail;
