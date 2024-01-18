import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { useState } from "react";

const ResetPasswordPage = () => {
  const { temp } = useParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  

  const fetchResetPassword = async () => {
    try {
      const response = await fetch(`http://localhost:3001/loginReset/${temp}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: pass,
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
      <div>Pagina Reset Password</div>
      {statusMessage ? (
        <p>{statusMessage}</p>
      ) : (
        <p>Introduce la nueva contrasseña</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          {
            pass === repeatPass
              ? fetchResetPassword()
              : alert("No coinciden las contraseñas");
          }
        }}
      >
        <div>
          <label htmlFor="pass">Contraseña</label>
          <input
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="repeatPass">Repetir Contraseña</label>
          <input
            type="password"
            id="repeatPass"
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default ResetPasswordPage;
