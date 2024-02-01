import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";

import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./Training.scss";


const Training = ({ data }) => {
  const [context] = useContext(authContext);
  const [like, setLike] = useState();
  const [fav, setFav] = useState();
  const navigate = useNavigate();

  const handleButton = (table, method, entreno) => {
    console.log(`Metodo: ${method} para la tabla: ${table}`);
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/${table}/${entreno}`,
          {
            method: method,
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const bodyButton = await response.json();
          console.log("response Button", bodyButton);
          setLike(!like);
          setFav(!fav);
          navigate(`/entrenos`);
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


  return (
    <ul className="listTraining">
      {data.map((training) => {
        return (
          <li key={training.id}>
            <button
              onClick={() => {
                handleButton("like", like ? "DELETE" : "POST", training.id);
              }}
            >
              Like
            </button>
            <button              
              onClick={() => {
                handleButton("fav", fav ? "DELETE" : "POST", training.id);
              }}
            ></button>
        
            <Link
              to={
                context.role === "admin"
                  ? `/admin/entreno/${training.id}`
                  : `/entreno/${training.id}`
              }
            >
              <h2>{training.name}</h2>
              <p>Likes:{training.allLikes}</p>

              <img
                src={`${import.meta.env.VITE_HOST_BACK}:${
                  import.meta.env.VITE_PORT_BACK
                }/${training.photo}`}
                alt="Imagen del entreno seleccionado"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Training.propTypes = {
  data: PropTypes.array,
};

export default Training;
