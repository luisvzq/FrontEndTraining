import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
  const { temp } = useParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const fetchResetPassword = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/loginReset/${temp}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: pass,
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
      <div className="reset-password-page">
        <h1 className="reset-password-heading">Reset Password</h1>
        {statusMessage ? (
          <p className="reset-password-text">{statusMessage}</p>
        ) : (
          <p className="reset-password-text">Introduce la nueva contraseña</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pass === repeatPass
              ? fetchResetPassword()
              : alert("No coinciden las contraseñas");
          }}
          className="reset-password-container"
        >
          <div>
            <label htmlFor="pass" className="reset-password-label">
              Contraseña
            </label>
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <div>
            <label htmlFor="repeatPass" className="reset-password-label">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="repeatPass"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <input type="submit" className="reset-password-submit-btn" />
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
