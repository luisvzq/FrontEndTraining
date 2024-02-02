import { useState } from "react";
import { useQuery } from "react-query";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

import Training from "../../components/Training/Training.jsx";

import "./AdminTrainingListPage.scss";
import Add from "../../assets/Add.svg";

import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";
import Next from "../../assets/Next.svg";
import Prev from "../../assets/Prev.svg";

const AdminTrainingListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    ["trainingList", "training", currentPage],
    () => hookGetFetch("training", { page: currentPage, pageSize }),
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
        <Link to="/admin/crear" className="linkList">
          <button className="buttonAdd">
            <img src={Add} alt="Añadir" className="add" />
          </button>
        </Link>

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
              <img src={Prev} alt="Anterior" className="prev" />
            </button>
            <span className="pages">Página {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={allTraining.length < pageSize}
              className="button"
            >
              <img src={Next} alt="Siguiente" className="next" />
            </button>
          </div>
        )}
      </div>
    
  );
};

export default AdminTrainingListPage;
