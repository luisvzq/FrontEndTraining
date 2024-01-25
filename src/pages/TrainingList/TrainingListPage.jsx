import { useState, useContext } from "react";
import { useQuery } from "react-query";

import "./TrainingListPage.scss";

import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import { authContext } from "../../context/AuthContext.jsx";
import Training from "../../components/Training/Training.jsx";

const TrainingListPage = () => {
  const [context] = useContext(authContext);
  const { hookGetFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);

  const { isLoading,data, isError, isSuccess, error } = useQuery(
    ["trainingList", "training", `Bearer ${context.token}`],
    () => hookGetFetch("training", `Bearer ${context.token}`),
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

      {isLoading ? <p>Loading.....</p> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Training data={allTraining} /> : null}
    </div>
  );
};

export default TrainingListPage;
