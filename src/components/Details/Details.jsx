import "./Details.scss";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import PropTypes from "prop-types";
import FavChecked from "../ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../ButtonsLikeFav/CountLikeChecked";

const Details = ({ trainingId }) => {
  const [context] = useContext(authContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training/${trainingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();
          console.log("respuesta entreno:", body.data);
          setDetails(body.data);
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
    <div className="CONTENEDOR">
      {details.name && (
        <>
          <h1 className="title">{details.name}</h1>
          <div className="details">
            <p className="tag">Tipologia: {details.typology}</p>
            <p className="tag">Grupo muscular: {details.muscle_group}</p>
            <div className="photo-container">
            <img
              className="photo"
              src={`${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/${details.photo}`}
              alt="Foto de entreno"
            /></div>{" "}
            <div className="LOGOS">
              <CountLikeChecked trainingId={trainingId} />
              <FavChecked trainingId={trainingId} />
            </div>
            <div className="information">
              <p className="description">Descripción: {details.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Details.propTypes = {
  trainingId: PropTypes.string,
};

export default Details;
