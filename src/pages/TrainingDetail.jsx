import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link, useParams } from "react-router-dom";

const TrainingDetail = () => {
// Harcodeado despues se recojera del useContex------------------------------------------------------
  const token ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjA5MDEsImV4cCI6MTcwNzkxMjkwMX0.t2k1Q48DTpCtrZteDJ9lx_q8SRsnVGifFwg4FJig3XE';

const [dataTraining, setDataTraining] = useState([])
  const  {trainingId}  = useParams();

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3001/training/${trainingId}`,{
          method:'GET',
          headers: {
            Authorization:token
          },
        });
        
        if (response.ok) {
          const body = await response.json();
          console.log("response body", body);
          setDataTraining(body.data);
        } else {
          const body = await response.json();
          console.error("ERROR",body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, token]);


  return (
    <>
      <Menu />
    
      <div>Pagina Training Detail</div>
      <h1>{dataTraining.name}</h1>
      <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'}}>
            {trainingId>1 && <Link to={`/entreno/${Number(trainingId) - 1}`}>Anterior</Link>}
          
            {" | "}
            {/* Harcodeado hasta saber cual es el ultimo entreno--------------------------------------------------------- */}
            {trainingId < 10 && <Link to={`/entreno/${Number(trainingId) + 1}`}>Siguiente</Link>} 
        
      </div>
      <img src={`http://localhost:3001/${dataTraining.photo}`} alt="Foto de entreno" />
      <p>Description: {dataTraining.description}</p>
      <button>Typology: {dataTraining.typology}</button>
      <button>Muscle group: {dataTraining.muscle_group}</button>
      <p>Likes: {dataTraining.allLikes}</p>

      <div>
        {/* {dataTraining.LikeTrue ? 
              <img src="http://localhost:3001/logos/like_rojo.webp" alt="rojo" />
            : <img src="http://localhost:3001/logos/like_blanco.webp" alt="blanco" /> } */}

        {dataTraining.likeTrue ? <button>Like rojo</button> : <button>Like blanca</button> } 
        {dataTraining.favTrue ? <button>Fav rojo</button> : <button>Fav blanca</button> }
       </div>
      
    
    </>
  );
};

export default TrainingDetail;
