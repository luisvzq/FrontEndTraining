import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

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
        }/${temp}`,
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
      <Header />
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
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
