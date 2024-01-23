import "./Details.scss";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";

import { useParams } from "react-router-dom";

const Details = () => {
  const [context] = useContext(authContext);
  const [details, setDetails] = useState({});
  const  {trainingId}= useParams();

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
            
              <button className="button-tm">Typology: {details.typology}</button>
              <button className="button-tm">Muscle group: {details.muscle_group}</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};



export default Details;