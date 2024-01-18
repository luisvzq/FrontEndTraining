import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useEffect, useState } from "react";
import Training from "../components/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining";

const TrainingListPage = () => {
  const [allFavs, setAllFavs] = useState([]);

  const getTrainingFavFetch = async () => {
    try {
      const res = await fetch("http://localhost:3001/fav", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sIjoibm9ybWFsIiwiaWF0IjoxNzA1MzYzMDYzLCJleHAiOjE3MDc5NTUwNjN9.bU1rDps_pwTdYDrIA2ZIPWSJx6HD_I_-qn29TSDtyT0",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();
      console.log(body);

      setAllFavs(body.fav_list);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getTrainingFavFetch();
  }, []);

  return (
    <>
      <Header />
      <OrderAndSearchInputTraining
        setAllTraining={setAllFavs}
      ></OrderAndSearchInputTraining>
      <h2>Todos los entrenamientos</h2>
      <Training data={allFavs} />
      <Footer />
    </>
  );
};

export default TrainingListPage;
