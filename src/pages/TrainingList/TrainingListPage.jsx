import { useState, useContext, useEffect } from "react";
import { useQuery, QueryCache } from "react-query";
import Header from "../../layout/Header.jsx";
import Footer from "../../layout/Footer.jsx";

import "./TrainingListPage.scss";

import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import { authContext } from "../../context/AuthContext.jsx";
import Training from "../../components/Training/Training.jsx";

const TrainingListPage = () => {
  const [context] = useContext(authContext);
  const { getTrainingFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);

  const { isLoading, error, data } = useQuery(
    ["trainingList", `Bearer ${context.token}`, setAllTraining],
    () => getTrainingFetch(`Bearer ${context.token}`, setAllTraining)
  );

  return (
    <div className="training-list">
      <Header />
      <h1>Todos los entrenamientos</h1>
      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
        allTraining={data}
      ></OrderAndSearchInputTraining>

      {isLoading ? <p>Loading.....</p> : <Training data={allTraining} />}

      <Footer />
    </div>
  );
};

export default TrainingListPage;
