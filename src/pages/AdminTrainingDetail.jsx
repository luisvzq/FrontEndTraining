
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import Header from "../layout/Header";
import BackNext from "../components/BackNext/BackNext";
import Details from "../components/Details/Details";
import ButtonsLikeFav from "../components/ButtonsLikeFav/ButtonsLikeFav";
import ButtonDeleteTraining from "../components/ButtonDeleteTraining/ButtonDeleteTraining";






const AdminTrainingDetail = () => {

  const { trainingId } = useParams();
  const [context] = useContext(authContext);
  const [details, setDetails] = useState({})
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
      
          setDetails(result);
          console.log(body.data);
          console.log(result);
      
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
          
    <BackNext dataTraining={dataTraining} trainingId={trainingId} setRender={setRender} />   
    <Details details={details}/>
    <ButtonsLikeFav details={details} trainingId={trainingId} token={context.token} setRender={setRender}/>    
    <ButtonDeleteTraining trainingId={trainingId} token={context.token} setRender={setRender}/>
  
    </>
  );
};

AdminTrainingDetail.propTypes = {
  details: PropTypes.object,
  dataTraining: PropTypes.array,
  trainingId: PropTypes.string,
  token: PropTypes.string,
  setRender: PropTypes.func
};

export default AdminTrainingDetail;