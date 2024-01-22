import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.scss";

const ErrorMessage = ({ message, resetError }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        resetError(); // Llamar a la función para reiniciar el estado de error
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message, resetError]);

  return isVisible ? (
    <div className={`error-container visible`}>
      <p className="error-message">{message}</p>
    </div>
  ) : null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired,
};

export default ErrorMessage;
