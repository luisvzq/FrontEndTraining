import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link, useParams } from "react-router-dom";

const TrainingDetail = () => {
  
const [dataTraining, setDataTraining] = useState( 
  {
  "name": "Sentadillas",
  "description": "5 series de 12 repeticiones",
  "photo": "defaultAvatar.jpg",
  "typology": "Fuerza",
  "muscle_group": "Pierna",
  "created_at": "2024-01-14T16:04:31.000Z"
}

)
  const  {trainingId}  = useParams();

  console.log("Foto: ",dataTraining.photo);



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
          <Link to={`/entreno/${Number(trainingId) - 1}`}>Anterior</Link>
            {" | "}
          <Link to={`/entreno/${Number(trainingId) + 1}`}>Siguiente</Link>
      </div>
      <img src={`http://localhost:3001/${dataTraining.photo}`} alt="Foto de entreno" />
      <p>Description: {dataTraining.description}</p>
      <button>Typology: {dataTraining.typology}</button>
      <button>Muscle group: {dataTraining.muscle_group}</button>
      <p>Likes: {dataTraining.allLikes}</p>
      
    
    </>
  );
};

export default TrainingDetail;
