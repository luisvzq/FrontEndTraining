import "./Details.scss";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

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
    <>
      {details.name && (
        <>
          <h1 className="title">{details.name}</h1>
          <div className="details">
            <img
              className="photo"
              src={`${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/${details.photo}`}
              alt="Foto de entreno"
            />
            <div className="information">
              <p className="description">Description: {details.description}</p>
              <p>Creado: {details.created_at}</p>
              <button>Typology: {details.typology}</button>
              <button>Muscle group: {details.muscle_group}</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Details.propTypes = {
  trainingId: PropTypes.string,
};

export default Details;
