
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { authContext } from "../../context/AuthContext";
import BackNext from "../../components/BackNext/BackNext";
import Details from "../../components/Details/Details";
import ButtonsLikeFav from "../../components/ButtonsLikeFav/ButtonsLikeFav";

const TrainingDetailPage = () => {

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
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();      
          setDataTraining(body.data);
          setRender(false);
          const [result] = body.data.filter((item)=> item.id===Number(trainingId));  
          setDetails(result)
      
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, context.token, render]);

  return (
    <>
      <Header />  
          
      <BackNext dataTraining={dataTraining} trainingId={trainingId} setRender={setRender}/>    

      {/* {
          console.log("Detalles a mostrar", typeof details,  typeof dataTraining, typeof trainingId)  
      } */}
      <Details details={details}/>
      <ButtonsLikeFav details={details} trainingId={trainingId} token={context.token} setRender={setRender}/>

    


      <Footer />
  
  
    </>
  );
};

TrainingDetailPage.propTypes = {
  details: PropTypes.object,
  dataTraining: PropTypes.object,
  trainingId: PropTypes.string,
  token: PropTypes.string,
  setRender: PropTypes.func
};

export default TrainingDetailPage;