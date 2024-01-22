import { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
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

  // const getTrainingFetch = async (token, setAllTraining) => {
  //   try {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_HOST_BACK}:${
  //         import.meta.env.VITE_PORT_BACK
  //       }/training`,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok " + res.statusText);
  //     }

  //     const body = await res.json();

  //     setAllTraining(body.data);
  //     console.log(body.data);
  //     console.log("Total de entrenos: ", body.data.length);
  //     return body.data;
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };
  // useEffect(() => {
  //   const { isLoading, error, data } = useQuery(
  //     ["allTraiings"],
  //     getTrainingFetch(`Bearer ${context.token}`, setAllTraining)
  //   );
  // }, []);

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <div className="training-list">
      <Header />
      <h1>Todos los entrenamientos</h1>
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
