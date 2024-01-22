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
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return <p className={`status-message ${shake ? "shake" : ""}`}>{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
