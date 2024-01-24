
const UseValidate = (name, description, typology,muscular, setStatusMessage, setShakeAnimation) => {
    if (
         name==="" ||
        description ==="" ||
        muscular ==="" ||
        typology ===""
      ){
        // alert("Debes cubir todos los campos")
        setStatusMessage("Debes cubir todos los campos ✌️")
        setShakeAnimation(true);
        return false
      }
      else{
        if(name.length>50){
            // alert ("El campo nombre tiene un maximo de 50 caracteres")
            setStatusMessage("El campo nombre tiene un maximo de 50 caracteres")
            setShakeAnimation(true);
            return false
        }
        if(description.length>200){
            // alert ("El campo descriccion tiene un maximo de 200 caracteres")
            setStatusMessage("El campo descriccion tiene un maximo de 200 caracteres")
            setShakeAnimation(true);
            return false
        }
        if(typology.length>50){
            // alert ("El campo tipologia tiene un maximo de 50 caracteres")
            setStatusMessage("El tipologia nombre tiene un maximo de 50 caracteres")
            setShakeAnimation(true);
            return false
        }
        if(muscular.length>50){
            // alert ("El campo grupo muscular tiene un maximo de 50 caracteres")
            setStatusMessage("El campo grupo muscular tiene un maximo de 50 caracteres")
            setShakeAnimation(true);
            return false
        }
        return true
      }

    

}

export default UseValidate;