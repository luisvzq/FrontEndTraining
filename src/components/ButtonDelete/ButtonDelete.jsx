import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ButtonDelete = ()=> {
    const [context] = useContext(authContext);
    const navigate = useNavigate();

    const  {trainingId}= useParams();

    const handleButton = () => {
      
        async function fetchButton() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/training/${trainingId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${context.token}`,
                },
              }
            );
    
            if (response.ok) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `El entreno se ha borrado con exito!`,
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: "rounded-popup",
                },
              });
              const bodyButtonDel = await response.json();
              console.log("Respuesta a Button Delete", bodyButtonDel);
                navigate('/admin/entrenos');
            
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
          <button className="buttons-delete" onClick={handleButton}>Eliminar</button>
    )
}


export default ButtonDelete;