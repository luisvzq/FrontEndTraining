const UseValidate = (
  name,
  typology,
  description,
  muscular,
  setStatusMessage,
) => {
  if (name === "" || description === "" || muscular === "" || typology === "") {
    setStatusMessage("Debes cubir todos los campos");
    

    return false;
  } else {
    if (name.length > 50) {
      setStatusMessage("El campo nombre tiene un máximo de 50 caracteres");

      return false;
    }
    if (typology.length > 50) {
      setStatusMessage("El campo tipología tiene un máximo de 50 caracteres");

      return false;
    }
    if (muscular.length > 50) {
      setStatusMessage(
        "El campo grupo muscular tiene un máximo de 50 caracteres",
      );

      return false;
    }
    return true;
  }
};

export default UseValidate;
