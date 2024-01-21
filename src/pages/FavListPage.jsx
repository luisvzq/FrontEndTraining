import { useState, useContext, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Training from "../components/Training/Training";

import OrderAndSearchInputTraining from "../components/OrderTraining/OrderTraining";
import { authContext } from "../context/AuthContext";

const TrainingListPage = () => {
  const [allFavs, setAllFavs] = useState([]);
  const [context] = useContext(authContext);

  const getTrainingFavFetch = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/fav`,
        {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        }
      );
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
      <h2>Todos los entrenamientos</h2>
      <OrderAndSearchInputTraining
        setAllTraining={setAllFavs}
      ></OrderAndSearchInputTraining> 
      <Training data={allFavs} />
      <Footer />
    </>
  );
};

export default TrainingListPage;
