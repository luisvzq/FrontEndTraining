import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { authContext } from "../../context/AuthContext";
import BackNext from "../../components/BackNext";

const TrainingDetailPage = () => {
  // Harcodeado despues se recojera del useContex------------------------------------------------------
  // const token =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjA5MDEsImV4cCI6MTcwNzkxMjkwMX0.t2k1Q48DTpCtrZteDJ9lx_q8SRsnVGifFwg4FJig3XE";
  const { trainingId } = useParams('1');
  const [context] = useContext(authContext);
  const [details, setDetails] = useState([])
  const [dataTraining, setDataTraining] = useState([]);


  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/trainingDetails`,
          {
            // method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();
          // console.log("respuesta entreno:", body.data);
          setDataTraining(body.data);
          setRender(false);
          const result = body.data.filter((item)=> item.id===Number(trainingId));
          console.log("filtrado", result);
          setDetails(body.data[trainingId-1])
          // console.log("respuesta detail:", body.data[trainingId-1]);
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, render]);



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
      <BackNext dataTraining={dataTraining} trainingId={trainingId}/>    

      <h1>{details.name}</h1>
      <img
        src={`${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${details.photo}`}
        alt="Foto de entreno"
      />
      <p>Description: {details.description}</p>
      <button>Typology: {details.typology}</button>
      <button>Muscle group: {details.muscle_group}</button>
      <p>Likes: {details.allLikes}</p>

      <div>
        {/* {dataTraining.LikeTrue ? 
              <img src="http://localhost:3001/logos/like_rojo.webp" alt="rojo" />
            : <img src="http://localhost:3001/logos/like_blanco.webp" alt="blanco" /> } */}
        {details.likeTrue ? (
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
        {details.favTrue ? (
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
