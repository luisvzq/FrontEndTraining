import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";


const ButtonDelete = ()=> {
    const [context] = useContext(authContext);
    const navigate = useNavigate();

    const  {trainingId}= useParams();

    const handleButton = (table, method) => {
        console.log(`Metodo: ${method} para la tabla: ${table}`);
        async function fetchButton() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/${table}/${trainingId}`,
              {
                method: method,
                headers: {
                  Authorization: `Bearer ${context.token}`,
                },
              }
            );
    
            if (response.ok) {
              const bodyButtonDel = await response.json();
              console.log("Respuesta a Button Delete", bodyButtonDel);
                navigate('/entrenos');
            
            } else {
              const body = await response.json();
              console.error("ERROR fetchButton", body.message);
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchButton();
      }; //final del manejador

    
    return(
<button className="buttons-delete" onClick={() => { handleButton("training", "DELETE")}}>Eliminar</button>
    )
}


export default ButtonDelete;