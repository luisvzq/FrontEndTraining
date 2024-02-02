import { useContext, useEffect, useState } from "react";
import "./TrainingListPage.scss";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import Training from "../../components/Training/Training.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Next from "../../assets/Next.svg"
import Prev from "../../assets/Prev.svg"
import { authContext } from "../../context/AuthContext.jsx";
const TrainingListPage = () => {

  const [allTraining, setAllTraining] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [context] = useContext(authContext);
  const [render, setRender] =useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/trainingInfo`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();        
          setAllTraining(body.data);
          setIsLoading(false);
          setRender(false)
          // console.log("Info array:", body.data);
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [context,render]);




  return (
    <div className="training-list">
      <h1>Todos los entrenamientos</h1>

      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
    
      ></OrderAndSearchInputTraining>

      {isLoading ? <Loading /> :<Training data={allTraining} setRender={setRender}/> }
    
       
    
        <div>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
            className="button"
          >
          <img src={Prev} alt="Anterior"className="prev"/>
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={allTraining.length < pageSize}
            className="button"
          >
          <img src={Next} alt="Siguiente"className="next"/>
          </button>
        </div>
      
    </div>
  );
};

export default TrainingListPage;
