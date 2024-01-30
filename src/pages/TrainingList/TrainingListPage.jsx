import { useState } from "react";
import { useQuery } from "react-query";

import "./TrainingListPage.scss";

import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

import Training from "../../components/Training/Training.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { useLocation } from "react-router-dom";

const TrainingListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Acceder a un parámetro específico
  const tagTypology = searchParams.get("typology");
  const tagMuscleGroup = searchParams.get("muscle_group");

  // Imprimir todos los parámetros de consulta
  let endpoint;
  if (searchParams) {
    endpoint = ``;
  }

  if (tagTypology) {
    endpoint = `?typology=${tagTypology}`;
  }
  if (tagMuscleGroup) {
    endpoint = `?muscle_group=${tagMuscleGroup}`;
  }

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    [`trainingList?${endpoint}`, "training", currentPage],
    () => hookGetFetch(`training${endpoint}`, { page: currentPage, pageSize }),
    {
      onSuccess: (data) => {
        setAllTraining(data);
      },
    }
  );

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
          >
            Página anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={allTraining.length < pageSize}
          >
            Siguiente página
          </button>
        </div>
      )}
    </div>
  );
};

export default TrainingListPage;
