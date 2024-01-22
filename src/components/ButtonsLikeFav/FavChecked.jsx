
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";


const FavChecked = ({trainingId}) => {

    const [context] = useContext(authContext);
    const [fav, setFav] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/favChecked/${trainingId}`,
              {
                 method: "GET",
                headers: {
                  Authorization: `Bearer ${context.token}`,
                },
              }
            );
    
            if (response.ok) {
              const body = await response.json();
               console.log("respuesta like marcado:", body.data.favCheck);
                setFav(body.data.favCheck)
          
            } else {
              throw new Error("Error al hacer fetch al entreno favorito ");
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, [trainingId, context]);






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
              const bodyButton = await response.json();
              console.log("response Button Like", bodyButton);
            
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
        <div>
            {fav ?
                <button onClick={() => { handleButton("favorites", "DELETE")}}>Fav rojo</button>
        
            :   <button onClick={() => { handleButton("favorites", "POST")}}>Fav Blanco</button>
            }
        </div>
    

    )
}
FavChecked.propTypes = {

    trainingId: PropTypes.string,
    token: PropTypes.string,
    setRender: PropTypes.func
  };




export default FavChecked;