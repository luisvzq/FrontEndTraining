import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';  // Asegúrate de importar tu archivo CSS

const ErrorMessage = ({ message }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (message) {
      setShake(true);

      // Desactivar la clase de temblor después de 3 segundos
      const timeoutId = setTimeout(() => {
        setShake(false);
      }, 3000);

      // Limpiar el timeout al desmontar el componente
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div className={`error-container ${shake ? 'shake' : ''}`} key={message}>
      {/* <h1>Error Message Component</h1> */}
      {message && <p>{message}</p>}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
