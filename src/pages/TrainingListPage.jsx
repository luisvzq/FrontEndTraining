import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Training from "../components/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining";

const TrainingListPage = () => {
  const [allTraining, setAllTraining] = useState([]);
  const tokenHardcoded =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sIjoibm9ybWFsIiwiaWF0IjoxNzA1NDI3MTMzLCJleHAiOjE3MDgwMTkxMzN9.0v2wqt3G2sanwdrr4z0wBuwWr9yB7IL606j4X1YlO5Y";

  const getTrainingFetch = async () => {
    try {
      const res = await fetch("http://localhost:8000/training", {
        headers: {
          Authorization: tokenHardcoded,
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();
      console.log(body);

      setAllTraining(body.data);
    } catch (error) {
      console.error("Error:", error.message);
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
