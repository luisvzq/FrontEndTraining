
import PropTypes from "prop-types";
import "./ButtonsLikeFav.scss"
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";


const CountLikes = ({trainingId}) => {
  const [context] = useContext(authContext);
const [likes, setLikes] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
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

        if (response.ok) {
          const body = await response.json();      
           console.log("Cuenta de likes", body.data);
          setLikes(body.data)
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, context]);

    return (
      <div>
          <p>Likes: {likes}</p>

      </div>
        
    

    )
}
CountLikes.propTypes = {
    details: PropTypes.object,
    trainingId: PropTypes.string,
    token: PropTypes.string,

  };

export default CountLikes;