import { useState } from "react";
import { useQuery } from "react-query";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

import Training from "../../components/Training/Training.jsx";

import "./AdminTrainingListPage.scss";
import Add from "../../assets/Add.svg"

import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";

const AdminTrainingListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    ["trainingList", "training"],
    () => hookGetFetch("training"),
    {
      onSuccess: (data) => {
        setAllTraining(data);
      },
    }
  );

  return (
    <>
      <div className="training-list">
        <h1>Todos los entrenamientos</h1>
        <OrderAndSearchInputTraining
          setAllTraining={setAllTraining}
          allTraining={data}
        ></OrderAndSearchInputTraining>
        <Link to="/admin/crear" className="linkList">
        <button className="buttonAdd"><img src={Add} alt="Añadir"className="add"/></button>
        </Link>

        {isLoading ? <Loading /> : null}
        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={allTraining} /> : null}
      </div>
    </>
  );
};

export default AdminTrainingListPage;
