import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchHooks from "../../hooks/useFetchHooks";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { authContext } from "../../context/AuthContext";

const TrainingDetailPage = () => {
  // Harcodeado despues se recojera del useContex------------------------------------------------------
  // const token =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjA5MDEsImV4cCI6MTcwNzkxMjkwMX0.t2k1Q48DTpCtrZteDJ9lx_q8SRsnVGifFwg4FJig3XE";
  const { trainingId } = useParams();
  const [context] = useContext(authContext);
  const { getTrainingFetch } = useFetchHooks();
  const [dataTraining, setDataTraining] = useState([]);

  const [allTrainig, setAllTraining] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training/${trainingId}`,
          {
            // method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();

          setDataTraining(body.data);
          setRender(false);
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, render]);

  // useEffect(() => {
  //   getTrainingFetch(`Bearer ${context.token}`, setAllTraining);
  // }, []);

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
          console.log("response bodyButton", bodyButton);
          setRender(true);
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
    <>
      <Header />

      <div>Pagina Training Detail</div>
      <h1>{dataTraining.name}</h1>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {trainingId > 1 && (
          <Link to={`/entreno/${Number(trainingId) - 1}`}>Anterior</Link>
        )}
        {" | "}

        {trainingId < allTrainig.length && (
          <Link to={`/entreno/${Number(trainingId) + 1}`}>Siguiente</Link>
        )}
      </div>

      <img
        src={`${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${dataTraining.photo}`}
        alt="Foto de entreno"
      />
      <p>Description: {dataTraining.description}</p>
      <button>Typology: {dataTraining.typology}</button>
      <button>Muscle group: {dataTraining.muscle_group}</button>
      <p>Likes: {dataTraining.allLikes}</p>

      <div>
        {/* {dataTraining.LikeTrue ? 
              <img src="http://localhost:3001/logos/like_rojo.webp" alt="rojo" />
            : <img src="http://localhost:3001/logos/like_blanco.webp" alt="blanco" /> } */}
        {dataTraining.likeTrue ? (
          <button
            onClick={() => {
              handleButton("like", "DELETE");
            }}
          >
            Like rojo
          </button>
        ) : (
          <button
            onClick={() => {
              handleButton("like", "POST");
            }}
          >
            Like blanca
          </button>
        )}
        {dataTraining.favTrue ? (
          <button
            onClick={() => {
              handleButton("fav", "DELETE");
            }}
          >
            Fav rojo
          </button>
        ) : (
          <button
            onClick={() => {
              handleButton("fav", "POST");
            }}
          >
            Fav blanca
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrainingDetailPage;
