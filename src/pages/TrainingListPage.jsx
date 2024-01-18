import { useState, useContext, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Training from "../components/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining";
import useFetchHooks from "../hooks/useFetchHooks.js";
import { authContext } from "../context/AuthContext.jsx";

const TrainingListPage = () => {
  const [context] = useContext(authContext);
  const { getTrainingFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);

  useEffect(() => {
    getTrainingFetch(`Bearer ${context.token}`, setAllTraining);
  }, []);

  return (
    <>
      <Header />
      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
        allTraining={allTraining}
      ></OrderAndSearchInputTraining>
      <h2>Todos los entrenamientos</h2>
      <Training data={allTraining} />
      <Footer />
    </>
  );
};

export default TrainingListPage;
