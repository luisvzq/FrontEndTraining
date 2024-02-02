import { useState } from "react";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import PropTypes from "prop-types";
import Training from "../../components/Training/Training.jsx";
import "./TrainingListPage.scss";
import Next from "../../assets/Next.svg";
import Prev from "../../assets/Prev.svg";

import Loading from "../../components/Loading/Loading.jsx";
// import { authContext } from "../../context/AuthContext.jsx";
import { useQuery } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";

const TrainingListPage = () => {
  const [allTraining, setAllTraining] = useState([]);

  const { hookGetFetch } = useFetchHooks();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { isLoading, isError, error, isSuccess, refetch } = useQuery(
    ["trainingInfo", "trainingInfo", currentPage],
    () => hookGetFetch("trainingInfo", { page: currentPage, pageSize }),
    {
      onSuccess: (data) => {
        setAllTraining(data);
      },
    }
  );

  const renderizar = () => {
    refetch();
  };

  return (
    <div className="training-list">
      <h1>Todos los entrenamientos</h1>
      <OrderAndSearchInputTraining setAllTraining={setAllTraining} />

      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? (
        <Training data={allTraining} renderizar={renderizar} />
      ) : null}
      <div>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
          className="button"
        >
          <img src={Prev} alt="Anterior" className="prev" />
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={allTraining.length < pageSize}
          className="button"
        >
          <img src={Next} alt="Siguiente" className="next" />
        </button>
      </div>
    </div>
  );
};
TrainingListPage.propTypes = {
  data: PropTypes.array,
  renderizar: PropTypes.func,
};

export default TrainingListPage;
