import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link, useParams } from "react-router-dom";

const TrainingDetail = () => {
  
const [dataTraining, setDataTraining] = useState({})
  const  {trainingId}  = useParams();

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3001/training/${trainingId}`);
        
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
  }, [trainingId]);


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
            {trainingId < 10 && <Link to={`/entreno/${Number(trainingId) + 1}`}>Siguiente</Link>} 
        
      </div>
      <img src={`http://localhost:3001/${dataTraining.photo}`} alt="Foto de entreno" />
      <p>Description: {dataTraining.description}</p>
      <button>Typology: {dataTraining.typology}</button>
      <button>Muscle group: {dataTraining.muscle_group}</button>
      <p>Likes: {dataTraining.allLikes}</p>

      <div className="logo" style={{ maxWidth: 30,  maxHeight: 30}}>
        {/* {dataTraining.LikeTrue ? 
              <img src="http://localhost:3001/logos/like_rojo.webp" alt="rojo" />
            : <img src="http://localhost:3001/logos/like_blanco.webp" alt="blanco" /> } */}

        {dataTraining.LikeTrue ? <button>Like rojo</button> : <button>Like blanca</button> } 
        {dataTraining.FavTrue ? <button>Fav rojo</button> : <button>Fav blanca</button> }
       </div>
      
    
    </>
  );
};

export default TrainingDetail;
