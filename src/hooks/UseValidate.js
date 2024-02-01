const UseValidate = (
  name,
  typology,
  muscular,
  setStatusMessage  
) => {
  if (name === "" || muscular === "" || typology === "") {
    setStatusMessage("Debes cubir todos los campos ✌️");

    return false;
  } else {
    if (name.length > 50) {
      setStatusMessage("El campo nombre tiene un maximo de 50 caracteres");

      return false;
    }
    if (typology.length > 50) {
      setStatusMessage("El tipologia nombre tiene un maximo de 50 caracteres");

      return false;
    }
    if (muscular.length > 50) {
      setStatusMessage(
        "El campo grupo muscular tiene un maximo de 50 caracteres"
      );

      return false;
    }
    return true;
  }
};

export default UseValidate;
