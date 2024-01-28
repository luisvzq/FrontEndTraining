import { useState } from "react";
import { useMutation } from "react-query";
import "./ChangeRol.scss";

import useFetchHooks from "../../hooks/useFetchHooks";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ChangeRol = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const [setShakeAnimation] = useState(false);

  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);

  return (
    <>
      <section
        className="rol-page
      "
      >
        <h1>Cambio de Rol de Usario</h1>

        <ErrorMessage message={statusMessage} />

        <form className="rol-container">
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
                { endpoint: `rolToAdmin`, method: "PATCH", user: postBody },
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
            Cambiar a Admin
          </button>
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(
                { endpoint: `rolToNormal`, method: "PATCH", user: postBody },
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
            Cambiar a Normal
          </button>
        </form>
      </section>
    </>
  );
};

export default ChangeRol;
