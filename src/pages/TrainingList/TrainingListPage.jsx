import { useState } from "react";
import { useQuery } from "react-query";

import "./TrainingListPage.scss";

import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

import Training from "../../components/Training/Training.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Next from "../../assets/Next.svg"
import Prev from "../../assets/Prev.svg"
const TrainingListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    ["trainingInfo", "trainingInfo", currentPage],
    () => hookGetFetch("trainingInfo", { page: currentPage, pageSize }),
    {
      onSuccess: (data) => {
        setAllTraining(data);
    
      },
    }
  );
console.log(data);
  return (
    <div className="training-list">
      <h1>Todos los entrenamientos</h1>

      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
        allTraining={data}
      ></OrderAndSearchInputTraining>

      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Training data={allTraining} /> : null}
      {isSuccess && (
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
      )}
    </div>
  );
};

export default TrainingListPage;
