import { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    getTrainingFetch(`Bearer ${context.token}`, setAllTraining);
  }, []);

  return (
    <div className="">
      <Header />
      <h2>Todos los entrenamientos</h2>
      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
        allTraining={allTraining}
      ></OrderAndSearchInputTraining>
      <Training data={allTraining} />
      <Footer />
    </div>
  );
};

export default TrainingListPage;
