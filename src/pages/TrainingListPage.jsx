import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Training from "../components/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining";

const TrainingListPage = () => {
  const [allTraining, setAllTraining] = useState([]);

  const getTrainingFetch = async () => {
    try {
      const res = await fetch("http://localhost:8000/training/");
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();

      setAllTraining(body.data);
    } catch (error) {
      console.error("Error:", error.menssage);
    }
  };

  useEffect(() => {
    getTrainingFetch();
  }, []);

  return (
    <>
      <Menu />
      <OrderAndSearchInputTraining
        setAllTraining={setAllTraining}
      ></OrderAndSearchInputTraining>
      <h2>Todos los entrenamientos</h2>
      <Training data={allTraining} />
    </>
  );
};

export default TrainingListPage;
