
const UseValidateUser = (name, email, rol, setStatusMessage, setShakeAnimation) => {
    if (
         name==="" ||
        email ==="" ||
        rol ===""    
      ){        
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
        if(email.length>50){
            // alert ("El campo descriccion tiene un maximo de 200 caracteres")
            setStatusMessage("El campo email tiene un maximo de 200 caracteres")
            setShakeAnimation(true);
            return false
        }
        if(rol.length>50){
            // alert ("El campo tipologia tiene un maximo de 50 caracteres")
            setStatusMessage("El campo rol tiene un maximo de 50 caracteres")
            setShakeAnimation(true);
            return false
        }
        
        return true
      }

    

}

export default UseValidateUser;