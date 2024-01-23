

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import './ButtonsLikeFav.scss'
import { useParams } from "react-router-dom";


const CountLikeChecked = () => {

    const [context] = useContext(authContext);
    const [like, setLike] = useState();
    const [countLikes, setCountLikes] = useState();
    const  {trainingId}= useParams();


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/likeChecked/${trainingId}`,
              {
                 method: "GET",
                headers: {
                  Authorization: `Bearer ${context.token}`,
                },
              }
            );
    
            if (response.ok) {
              const body = await response.json();
               console.log("respuesta like marcado:", body.data.likeCheck);
                setLike(body.data.likeCheck)          
            } else {
              throw new Error("Error al hacer fetch al like del entreno ");
            }


          //----------------------------------------------------------------------------------------------------------------------
            const responseCount = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/allLikes/${trainingId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${context.token}`,
                },
              }
            );
    
            if (responseCount.ok) {
              const bodyCount = await responseCount.json();      
                console.log("Cuenta de likes", bodyCount.data);
              setCountLikes(bodyCount.data)
            } else {
                throw new Error("Error al hacer fetch al recuento de likes del entreno");
            }

          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, [trainingId, context, like]);






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
              setLike(!like)
            
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
        <div className="count-content">
          <p className="count-likes">Likes: {countLikes}</p>
          <div className="content-lf">
            {like ?
                <button className="buttons-lf red" onClick={() => { handleButton("like", "DELETE")}}>Like</button>
        
            :   <button className="buttons-lf"onClick={() => { handleButton("like", "POST")}}>Like</button>
            }
        </div>
        </div>
        
    

    )
}




export default CountLikeChecked;