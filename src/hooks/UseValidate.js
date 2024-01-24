
const UseValidate = (name, description, typology,muscular) => {
    if (
         name==="" ||
        description ==="" ||
        muscular ==="" ||
        typology ===""
      ){
        alert("Debes cubir todos los campos")
        return false
      }
      else{
        if(name.length>50){
            alert ("El campo nombre tiene un maximo de 50 caracteres")
            return false
        }
        if(description.length>200){
            alert ("El campo nombre tiene un maximo de 50 caracteres")
            return false
        }
        if(typology.length>50){
            alert ("El campo nombre tiene un maximo de 50 caracteres")
            return false
        }
        if(muscular.length>50){
            alert ("El campo nombre tiene un maximo de 50 caracteres")
            return false
        }
        return true
      }

    

}

export default UseValidate;