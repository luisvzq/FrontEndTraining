const UseValidateUser = (name, email, setStatusMessage) => {
  if (name === "" || email === "") {
    setStatusMessage("Debes cubir todos los campos ✌️");
    return false;
  } else {
    if (name.length > 50) {
      setStatusMessage("El campo nombre tiene un maximo de 50 caracteres");
      return false;
    }
    if (email.length > 50) {
      setStatusMessage("El campo email tiene un maximo de 50 caracteres");
      return false;
    }

    return true;
  }
};

export default UseValidateUser;
