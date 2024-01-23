

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import './ButtonsLikeFav.scss'
import { useParams } from "react-router-dom";

const FavChecked = () => {

    const [context] = useContext(authContext);
    const [fav, setFav] = useState();
    const  {trainingId}= useParams();

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
               console.log("respuesta favorito marcado:", body.data.FavCheck);
                setFav(body.data.FavCheck)

        
          
            } else {
                throw new Error("Error al hacer fetch al entreno favorito ");
            }
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, [trainingId, context, fav]);






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
              const bodyButtonFav = await response.json();
              console.log("Respuesta a Button Favorite", bodyButtonFav);
              setFav(!fav)
            
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
        <div className="content-lf">
            {fav ?
                <button className="buttons-lf red" onClick={() => { handleButton("fav", "DELETE")}}>Fav</button>
        
            :   <button className="buttons-lf" onClick={() => { handleButton("fav", "POST")}}>Fav</button>
            }
        </div>
    

    )
}


export default FavChecked;