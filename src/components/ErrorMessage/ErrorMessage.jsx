import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.scss";

const ErrorMessage = ({ message }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (message) {
      setShake(true);

      const timeoutId = setTimeout(() => {
        setShake(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <>
      {!message ? (
        <p>Introduce los datos</p>
      ) : (
        <p className={`status-message ${shake ? "shake" : ""}`}>
          {message && "⚠️ "}
          {message}
          {message && " ⚠️"}
        </p>
      )}
    </>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
