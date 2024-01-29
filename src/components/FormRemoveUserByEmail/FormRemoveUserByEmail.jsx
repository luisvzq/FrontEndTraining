import { useState } from "react";
import { useMutation } from "react-query";

import useFetchHooks from "../../hooks/useFetchHooks";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./FormRemoveUserByEmail.scss";

const FormRemoveUserByEmail = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");

  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);
  const handleAdminDeleteUserButton = (e) => {
    e.preventDefault();
    if (!mail) {
      setStatusMessage("Debe de facilitar algun dato");
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);
    }
    if (mail) {
      mutation.mutate(
        {
          endpoint: `removeUserByEmail`,
          method: "DELETE",
          user: postBody,
        },
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
    }
  };

  return (
    <>
      <section
        className="remove-user-page
      "
      >
        <h1>Eliminacion de Usarios</h1>
        <ErrorMessage message={statusMessage} />

        <form className="remove-user-container">
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
            onClick={handleAdminDeleteUserButton}
          >
            Eliminar
          </button>
        </form>
      </section>
    </>
  );
};

export default FormRemoveUserByEmail;
