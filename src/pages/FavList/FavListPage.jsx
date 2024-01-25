import { useState, useContext } from "react";
import { useQuery } from "react-query";
import Training from "../../components/Training/Training.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import { authContext } from "../../context/AuthContext.jsx";

const TrainingListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allFavs, setAllFavs] = useState([]);
  const [context] = useContext(authContext);

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    ["favList", "fav", `Bearer ${context.token}`],
    () => hookGetFetch("fav", `Bearer ${context.token}`),
    {
      onSuccess: (data) => {
        setAllFavs(data);
      },
    }
  );

  return (
    <>
      <div className="training-list">
        <h2>Entranamientos Favoritos</h2>
        {/* <OrderAndSearchInputTraining
          setAllTraining={setAllFavs}
        ></OrderAndSearchInputTraining> */}
        {isLoading ? <p>Loading.....</p> : null}
        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={allFavs} /> : null}
      </div>
    </>
  );
};

export default TrainingListPage;
