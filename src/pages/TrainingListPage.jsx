import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Training from "../components/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining";
import useFetchHooks from "../hooks/useFetchHooks.js";

const TrainingListPage = () => {
  const { getTrainingFetch } = useFetchHooks();
  const [allTraining, setAllTraining] = useState([]);
  const tokenHardcoded =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sIjoibm9ybWFsIiwiaWF0IjoxNzA1NDI3MTMzLCJleHAiOjE3MDgwMTkxMzN9.0v2wqt3G2sanwdrr4z0wBuwWr9yB7IL606j4X1YlO5Y";

  useEffect(() => {
    getTrainingFetch(tokenHardcoded, setAllTraining);
  }, []);

  return (
    <>
      <Menu />
      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
        allTraining={allTraining}
      ></OrderAndSearchInputTraining>
      <h2>Todos los entrenamientos</h2>
      <Training data={allTraining} />
    </>
  );
};

export default TrainingListPage;
