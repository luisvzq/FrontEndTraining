// ErrorMessage.jsx

import PropTypes from "prop-types";
import './ErrorMessage.scss';


const ErrorMessage = ({ message, shakeAnimation }) => {
  return (
    <div className={`error-container ${shakeAnimation ? "shake" : ""}`}>
      <p className="error-message">{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  shakeAnimation: PropTypes.bool.isRequired,
};

export default ErrorMessage;

